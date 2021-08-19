window.onload = function () {
  let globalData = [];

  // 创建图表
  function createChart({ d3, svg, width, height, margin, x, y }) {
    const barId = { id: "123" };
    const arrowId = { id: "456" };
    const result = svg`<svg viewBox="0 0 ${width} ${height}" style="max-width: ${width}px; font: 10px sans-serif; overflow: visible;">
  <defs>
    <marker id="${
      barId.id
    }" viewBox="-5 -5 10 10" markerWidth="6" markerHeight="6" orient="auto">
      <path fill="none" stroke="black" stroke-width="1.5" d="M0,5v-10"></path>
    </marker>
    <marker id="${
      arrowId.id
    }" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0,0L10,5L0,10z"></path>
    </marker>
  </defs>
  <rect fill="none" stroke="#000" stroke-dasharray="1,2" width="${width}" height="${height}"></rect>
  <rect fill="#eee" stroke="#000" x="${margin.left}" y="${margin.top}" width="${
      width - margin.left - margin.right
    }" height="${height - margin.top - margin.bottom}"></rect>

  <g fill="none" stroke="#000" marker-start="${barId}" marker-end="${arrowId}">
    <path d="M0,${height / 2}h${margin.left}"></path>
    <path d="M${width},${height / 2}h${-margin.right}"></path>
    <path d="M${width / 2},0v${margin.top}"></path>
    <path d="M${width / 2},${height}v${-margin.bottom}"></path>
  </g>

  <circle r="2.5"></circle>

  <text x="${margin.left + 6}" y="${height / 2}" dy="0.35em">margin.left</text>
  <text x="${width - margin.right - 6}" y="${
      height / 2
    }" dy="0.35em" text-anchor="end">margin.right</text>
  <text x="${width / 2}" y="${
      margin.top + 6
    }" dy="0.71em" text-anchor="middle">margin.top</text>
  <text x="${width / 2}" y="${
      height - margin.bottom - 6
    }" text-anchor="middle">margin.bottom</text>
  <text x="6" dy="0.35em" fill="none" stroke="white" stroke-linejoin="round" stroke-width="4">origin</text>
  <text x="6" dy="0.35em">origin</text>

  ${d3
    .create("svg:g")
    .call(d3.axisTop(x.copy().range([margin.left, width - margin.right])))
    .call((g) => g.select(".domain").remove())
    .attr("transform", `translate(0,${margin.top})`)
    .node()}

  ${d3
    .create("svg:g")
    .call(d3.axisLeft(y.copy().range([margin.top, height - margin.bottom])))
    .call((g) => g.select(".domain").remove())
    .attr("transform", `translate(${margin.left},0)`)
    .node()}
</svg>`;

    return result;
  }

  function getX({ d3, data, margin, width }) {
    return d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)])
      .range([margin.left, width - margin.right])
      .interpolate(d3.interpolateRound);
  }

  function getY({ d3, data, height, margin }) {
    return d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([margin.top, height - margin.bottom])
      .padding(0.1)
      .round(true);
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
    return 200;
  }

  function getMargin() {
    return { top: 30, right: 30, bottom: 30, left: 30 };
  }

  function getData() {
    // fetch("./data.json")
    //   .then((response) => response.json())
    //   .then((res) => {
    //     console.info(res);
    //     initChart(res);
    //   });
    const testData = [
      { name: "🍊", count: 21 },
      { name: "🍇", count: 13 },
      { name: "🍏", count: 8 },
      { name: "🍌", count: 5 },
      { name: "🍐", count: 3 },
      { name: "🍋", count: 2 },
      { name: "🍎", count: 1 },
      { name: "🍉", count: 1 },
    ];
    globalData = testData;
    initChart(testData);
  }

  function initChart(data) {
    const globalD3 = window.d3;
    const globalSvg = window.htl.svg;
    const useData = data;
    const margin = getMargin();
    const width = getWidth();
    const height = getHeight();
    const x = getX({ d3: globalD3, data: useData, margin, width });
    const y = getY({ d3: globalD3, data: useData, height, margin });

    const ele = createChart({
      d3: globalD3,
      svg: globalSvg,
      width,
      height,
      x,
      y,
      margin,
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
