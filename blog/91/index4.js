window.onload = function () {
  let globalData = [];
  let globalChart = null;
  // 创建图表
  function createChart({ d3, data, width, height, x, y, xAxis, yAxis }) {
    const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

    const zx = x.copy(); // x, but with a new domain.

    const line = d3
      .line()
      .x((d) => zx(d.date))
      .y((d) => y(d.close));

    const path = svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-miterlimit", 1)
      .attr("d", line(data));

    const gx = svg.append("g").call(xAxis, zx);

    const gy = svg.append("g").call(yAxis, y);

    return Object.assign(svg.node(), {
      update(domain) {
        const t = svg.transition().duration(750);
        zx.domain(domain);
        gx.transition(t).call(xAxis, zx);
        path.transition(t).attr("d", line(data));
      },
    });
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
        initChart(format);
      });
  }

  function creteButton(data) {
    const globalD3 = window.d3;
    const globalHtml = window.htl.html;

    const form = globalHtml`<form
      style="font: 12px var(--sans-serif); display: flex; height: 33px; align-items: center;"
    >
      <label
        style="margin-right: 1em; display: inline-flex; align-items: center;"
      >
        <input
          type="radio"
          name="radio"
          value="all"
          style="margin-right: 0.5em;"
          checked
        />
        All
      </label>
      <label
        style="margin-right: 1em; display: inline-flex; align-items: center;"
      >
        <input
          type="radio"
          name="radio"
          value="2009"
          style="margin-right: 0.5em;"
        />
        2009
      </label>
      <label
        style="margin-right: 1em; display: inline-flex; align-items: center;"
      >
        <input
          type="radio"
          name="radio"
          value="2010"
          style="margin-right: 0.5em;"
        />
        2010
      </label>
      <label
        style="margin-right: 1em; display: inline-flex; align-items: center;"
      >
        <input
          type="radio"
          name="radio"
          value="2011"
          style="margin-right: 0.5em;"
        />
        2011
      </label>
    </form>`;
    form.onchange = () => form.dispatchEvent(new CustomEvent("input")); // Safari
    form.oninput = (event) => {
      switch (form.radio.value) {
        case "2009":
          form.value = [new Date("2009-01-01"), new Date("2010-01-01")];
          break;
        case "2010":
          form.value = [new Date("2010-01-01"), new Date("2011-01-01")];
          break;
        case "2011":
          form.value = [new Date("2011-01-01"), new Date("2012-01-01")];
          break;
        default:
          form.value = globalD3.extent(data, (d) => d.date);
          break;
      }
      globalChart.update(form.value);
    };
    // form.oninput();
    const container = document.querySelector("#btn");
    container.innerHTML = "";
    container.appendChild(form);
  }

  function initChart(data) {
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
    globalChart = createChart({
      d3: globalD3,
      data: useData,
      width,
      height,
      x,
      y,
      xAxis,
      yAxis,
    });
    const chartContainer = document.querySelector("#chart");
    chartContainer.innerHTML = "";
    chartContainer.appendChild(globalChart);
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
      initChart(globalData);
    }, 500);
  };
};
