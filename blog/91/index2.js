window.onload = function () {
  let globalData = [];
  let globalTick = 0.2;
  // 创建图表
  function createChart({
    d3,
    html,
    svg,
    line,
    data,
    lineLength,
    t,
    width,
    height,
    xAxis,
    yAxis,
  }) {
    const pathD = line(data);
    const result = html`<svg viewBox="0 0 ${width} ${height}">
      <path
        d="${pathD}"
        fill="none"
        stroke="steelblue"
        stroke-width="1.5"
        stroke-miterlimit="1"
        stroke-dasharray="${lineLength * t},${lineLength}"
      ></path>
      ${d3
        .select(svg`<g>`)
        .call(xAxis)
        .node()}
      ${d3
        .select(svg`<g>`)
        .call(yAxis)
        .node()}
    </svg>`;

    return result;
  }

  function line({ d3, x, y }) {
    return d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.close));
  }

  function lineLength({ svg, line, data }) {
    return svg`<path d="${line(data)}">`.getTotalLength();
  }

  function disposal(element) {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        const target = element.closest(".observablehq");
        if (!target) return resolve();
        const observer = new MutationObserver(() => {
          if (target.contains(element)) return;
          observer.disconnect(), resolve();
        });
        observer.observe(target, { childList: true });
      });
    });
  }

  function Scrubber(html, disposal) {
    return (
      values,
      {
        format = (value) => value,
        initial = 0,
        delay = null,
        autoplay = true,
        loop = true,
        loopDelay = null,
        alternate = false,
        onChange = () => {},
      } = {}
    ) => {
      values = Array.from(values);
      const form = html`<form
        style="font: 12px var(--sans-serif); font-variant-numeric: tabular-nums; display: flex; height: 33px; align-items: center;"
      >
        <button
          name="b"
          type="button"
          style="margin-right: 0.4em; width: 5em;"
        ></button>
        <label style="display: flex; align-items: center;">
          <input
            name="i"
            type="range"
            min="0"
            max=${values.length - 1}
            value=${initial}
            step="1"
            style="width: 180px;-webkit-appearance: auto;"
          />
          <output name="o" style="margin-left: 0.4em;"></output>
        </label>
      </form>`;
      let frame = null;
      let timer = null;
      let interval = null;
      let direction = 1;
      function start() {
        form.b.textContent = "Pause";
        if (delay === null) frame = requestAnimationFrame(tick);
        else interval = setInterval(tick, delay);
      }
      function stop() {
        form.b.textContent = "Play";
        if (frame !== null) cancelAnimationFrame(frame), (frame = null);
        if (timer !== null) clearTimeout(timer), (timer = null);
        if (interval !== null) clearInterval(interval), (interval = null);
      }
      function running() {
        return frame !== null || timer !== null || interval !== null;
      }
      function tick() {
        if (
          form.i.valueAsNumber ===
          (direction > 0 ? values.length - 1 : direction < 0 ? 0 : NaN)
        ) {
          if (!loop) return stop();
          if (alternate) direction = -direction;
          if (loopDelay !== null) {
            if (frame !== null) cancelAnimationFrame(frame), (frame = null);
            if (interval !== null) clearInterval(interval), (interval = null);
            timer = setTimeout(() => (step(), start()), loopDelay);
            return;
          }
        }
        if (delay === null) frame = requestAnimationFrame(tick);
        step();
      }
      function step() {
        form.i.valueAsNumber =
          (form.i.valueAsNumber + direction + values.length) % values.length;
        form.i.dispatchEvent(new CustomEvent("input", { bubbles: true }));
      }
      form.i.oninput = (event) => {
        if (event && event.isTrusted && running()) stop();
        form.value = values[form.i.valueAsNumber];
        form.o.value = format(form.value, form.i.valueAsNumber, values);
        // console.info("form.value", form.value);
        onChange && onChange(form.value);
      };
      form.b.onclick = () => {
        if (running()) return stop();
        direction =
          alternate && form.i.valueAsNumber === values.length - 1 ? -1 : 1;
        form.i.valueAsNumber =
          (form.i.valueAsNumber + direction) % values.length;
        form.i.dispatchEvent(new CustomEvent("input", { bubbles: true }));
        start();
      };
      form.i.oninput();
      if (autoplay) start();
      else stop();
      disposal(form).then(stop);
      return form;
    };
  }

  function getX({ d3, data, margin, width }) {
    return d3
      .scaleUtc()
      .domain(d3.extent(data, (d) => d.date))
      .range([margin.left, width - margin.right]);
  }

  function getY({ d3, data, margin, height }) {
    return d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.upper)])
      .range([height - margin.bottom, margin.top]);
  }

  function getxAxis({ height, margin, d3, x, width }) {
    return (g, scale = x) =>
      g.attr("transform", `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(scale)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );
  }

  function getyAxis({ margin, d3, y, height }) {
    return (g, scale = y) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(scale).ticks(height / 40))
        .call((g) => g.select(".domain").remove());
  }

  function getColor({ d3, data }) {
    return d3
      .scaleSequential()
      .domain([0, d3.max(data, (d) => d.count)])
      .interpolator(d3.interpolateBlues);
  }

  function getWidth() {
    return window.innerWidth - 20;
  }

  function getHeight() {
    return 240;
  }

  function getMargin() {
    return { top: 30, right: 30, bottom: 30, left: 30 };
  }

  function getData() {
    fetch("https://xxholic.github.io/lab/blog/91/data.json")
      .then((response) => response.json())
      .then((res) => {
        const format = res.map((ele) => {
          const { date, close, lower, middle, upper } = ele;
          return {
            date: new Date(date),
            close: Number(close),
            lower: Number(lower),
            middle: Number(middle),
            upper: Number(upper),
          };
        });
        // console.info(format);
        format.columns = ["date", "close", "lower", "middle", "upper"];
        globalData = format;
        creteButton(format);
        // initChart(format);
      });
  }

  function creteButton(data) {
    const globalD3 = window.d3;
    const globalHtml = window.htl.html;
    const localScrubber = Scrubber(globalHtml, disposal);
    const ele = localScrubber(globalD3.ticks(0, 1, 200), {
      autoplay: false,
      loop: false,
      initial: 50,
      format: (x) => `t = ${x.toFixed(3)}`,
      onChange: (tick) => {
        // console.info("tick");
        globalTick = tick;
        initChart(data, tick);
      },
    });
    const container = document.querySelector("#btn");
    container.innerHTML = "";
    container.appendChild(ele);
  }

  function initChart(data, tick) {
    const globalD3 = window.d3;
    const globalHtml = window.htl.html;
    const globalSvg = window.htl.svg;
    const useData = data;
    const margin = getMargin();
    const width = getWidth();
    const height = getHeight();
    // const color = getColor({ d3: globalD3, data: useData });
    const x = getX({ d3: globalD3, data: useData, margin, width });
    const y = getY({ d3: globalD3, data: useData, height, margin });
    const xAxis = getxAxis({ d3: globalD3, x, margin, width, height });
    const yAxis = getyAxis({ d3: globalD3, y, margin, height });
    const lineObj = line({ d3: globalD3, x, y });
    const lineLengthObj = lineLength({
      svg: globalSvg,
      line: lineObj,
      data: useData,
    });
    const ele = createChart({
      d3: globalD3,
      html: globalHtml,
      svg: globalSvg,
      data: useData,
      width,
      height,
      t: tick,
      line: lineObj,
      lineLength: lineLengthObj,
      xAxis,
      yAxis,
    });
    const chartContainer = document.querySelector("#chart");
    chartContainer.innerHTML = "";
    chartContainer.appendChild(ele);
  }
  Util.loading.show();
  getData();
  Util.loading.hide();
  let timeoutHandler = null;
  window.onresize = function () {
    if (timeoutHandler) {
      clearTimeout(timeoutHandler);
    }
    timeoutHandler = setTimeout(() => {
      initChart(globalData, globalTick);
    }, 500);
  };
};
