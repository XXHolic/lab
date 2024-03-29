window.onload = function () {
  let globalData = [];
  const totalCount = 300;
  // 创建图表
  function* chartGenerators({
    d3,
    html,
    svg,
    line,
    data,
    lineLength,
    width,
    height,
    xAxis,
    yAxis,
  }) {
    const pathD = line(data);
    const path = svg`<path d="${pathD}" fill="none" stroke="steelblue" stroke-width="1.5" stroke-miterlimit="1">`;

    const chart = html`<svg viewBox="0 0 ${width} ${height}">
      ${path}
      ${d3
        .select(svg`<g>`)
        .call(xAxis)
        .node()}
      ${d3
        .select(svg`<g>`)
        .call(yAxis)
        .node()}
    </svg>`;

    for (let i = 0, n = totalCount; i < n; ++i) {
      const t = (i + 1) / n;
      path.setAttribute("stroke-dasharray", `${t * lineLength},${lineLength}`);
      yield chart;
    }
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
        createButton(format);
        // initChart(format);
      });
  }

  function* numberGenerators() {
    for (let i = 0, n = totalCount; i < n; ++i) {
      yield i;
    }
  }

  function excuteGenerator(generator, fun) {
    const nextValue = generator.next();
    if (nextValue.done) {
      return;
    }
    fun && fun(nextValue.value);
    window.requestAnimationFrame(excuteGenerator.bind(this, generator, fun));
  }

  function initNumberCount() {
    const numContainer = document.querySelector("#num");
    const numberGenerator = numberGenerators();
    const numFun = (value) => {
      numContainer.innerHTML = value;
    };
    window.requestAnimationFrame(
      excuteGenerator.bind(this, numberGenerator, numFun)
    );
  }

  function createButton(data) {
    const globalHtml = window.htl.html;
    let ele = globalHtml`<button>Replay`;
    ele.onclick = () => {
      initNumberCount();
      initChart(data);
    };
    const container = document.querySelector("#btn");
    container.innerHTML = "";
    container.appendChild(ele);
    initNumberCount();
    initChart(data);
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
    const lineObj = line({ d3: globalD3, x, y });
    const lineLengthObj = lineLength({
      svg: globalSvg,
      line: lineObj,
      data: useData,
    });
    const generator = chartGenerators({
      d3: globalD3,
      html: globalHtml,
      svg: globalSvg,
      data: useData,
      width,
      height,
      line: lineObj,
      lineLength: lineLengthObj,
      xAxis,
      yAxis,
    });
    const chartContainer = document.querySelector("#chart");
    const chartFun = (value) => {
      chartContainer.innerHTML = "";
      chartContainer.appendChild(value);
    };
    window.requestAnimationFrame(
      excuteGenerator.bind(this, generator, chartFun)
    );
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
      initNumberCount();
      initChart(globalData);
    }, 500);
  };
};
