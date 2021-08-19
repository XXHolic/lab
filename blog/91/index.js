window.onload = function () {
  let globalData = [];
  // 创建图表
  function createChart({
    d3,
    html,
    svg,
    line,
    data,
    reveal,
    width,
    height,
    xAxis,
    yAxis,
  }) {
    const pathD = line(data);
    const result = html`<svg viewBox="0 0 ${width} ${height}">
      ${d3
        .select(
          svg`<path d="${pathD}" fill="none" stroke="steelblue" stroke-width="1.5" stroke-miterlimit="1" stroke-dasharray="0,1"></path>`
        )
        .call(reveal)
        .node()}
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

  function reveal({ d3 }) {
    return (path) =>
      path
        .transition()
        .duration(5000)
        .ease(d3.easeLinear)
        .attrTween("stroke-dasharray", function () {
          const length = this.getTotalLength();
          return d3.interpolate(`0,${length}`, `${length},${length}`);
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
    fetch("https://xxholic.github.io/lab/blog/90/data.json")
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
        creteButton();
        initChart(format);
      });
  }

  function creteButton() {
    const ele = window.htl.html`<button>Replay</button>`;
    ele.onclick = () => {
      // console.info("clicked");
      initChart(globalData);
    };
    const container = document.querySelector("#btn");
    container.innerHTML = "";
    container.appendChild(ele);
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
    const revealObj = reveal({ d3: globalD3 });
    const ele = createChart({
      d3: globalD3,
      html: globalHtml,
      svg: globalSvg,
      data: useData,
      width,
      height,
      line: lineObj,
      reveal: revealObj,
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
      initChart(globalData);
    }, 500);
  };
};
