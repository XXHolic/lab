window.onload = function () {
  let globalData = [];
  // 创建图表
  function createChart({ d3, html, svg, data, width, height, margin, x, y }) {
    const result = html`<svg
      viewBox="0 0 ${width} ${height}"
      style="max-width: ${width}px; font: 10px sans-serif;"
    >
      <g fill="steelblue">
        ${data.map(
          (d) =>
            svg`<rect y="${y(d.name)}" x="${x(0)}" width="${
              x(d.count) - x(0)
            }" height="${y.bandwidth()}"></rect>`
        )}
      </g>
      <g
        fill="white"
        text-anchor="end"
        transform="translate(-6,${y.bandwidth() / 2})"
      >
        ${data.map(
          (d) =>
            svg`<text y="${y(d.name)}" x="${x(d.count)}" dy="0.35em">${
              d.count
            }</text>`
        )}
      </g>
      ${d3
        .select(svg`<g transform="translate(0,${margin.top})">`)
        .call(d3.axisTop(x))
        .call((g) => g.select(".domain").remove())
        .node()}
      ${d3
        .select(svg`<g transform="translate(${margin.left},0)">`)
        .call(d3.axisLeft(y))
        .call((g) => g.select(".domain").remove())
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
    return { top: 20, right: 20, bottom: 30, left: 40 };
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
    const globalHtml = window.htl.html;
    const globalSvg = window.htl.svg;
    const useData = data;
    const margin = getMargin();
    const width = getWidth();
    const height = getHeight();
    const x = getX({ d3: globalD3, data: useData, margin, width });
    const y = getY({ d3: globalD3, data: useData, height, margin });

    const ele = createChart({
      d3: globalD3,
      html: globalHtml,
      svg: globalSvg,
      data: useData,
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
};;
