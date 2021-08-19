window.onload = function () {
  let globalData = [];
  // 创建图表
  function createChart({
    d3,
    html,
    svg,
    data,
    width,
    height,
    margin,
    x,
    y,
    color,
  }) {
    const result = html`<svg
      viewBox="0 ${margin.top} ${width} ${height - margin.top}"
      style="max-width: ${width}px; font: 10px sans-serif;"
    >
      <g>
        ${data.map(
          (d) =>
            svg`<rect fill="${color(d.count)}" y="${y(d.name)}" x="${x(
              0
            )}" width="${x(d.count) - x(0)}" height="${y.bandwidth()}"></rect>`
        )}
      </g>
      <g text-anchor="end" transform="translate(-6,${y.bandwidth() / 2})">
        ${data.map(
          (d) =>
            svg`<text fill="${
              d3.lab(color(d.count)).l < 60 ? "white" : "black"
            }" y="${y(d.name)}" x="${x(d.count)}" dy="0.35em">${d.count}</text>`
        )}
      </g>
      ${d3
        .select(svg`<g transform="translate(${margin.left},0)">`)
        .call(d3.axisLeft(y))
        .call((g) => g.select(".domain").remove())
        .node()}
    </svg>`;

    return result;
  }
  // 图例
  function legend({
    color,
    title,
    tickSize = 6,
    width = 320,
    height = 44 + tickSize,
    marginTop = 18,
    marginRight = 0,
    marginBottom = 16 + tickSize,
    marginLeft = 30,
    ticks = width / 64,
    tickFormat,
    tickValues,
  }) {
    const svg = d3
      .create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .style("overflow", "visible")
      .style("display", "block");

    let tickAdjust = (g) =>
      g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height);
    let x;

    x = Object.assign(
      color
        .copy()
        .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
      {
        range() {
          return [marginLeft, width - marginRight];
        },
      }
    );

    svg
      .append("image")
      .attr("x", marginLeft)
      .attr("y", marginTop)
      .attr("width", width - marginLeft - marginRight)
      .attr("height", height - marginTop - marginBottom)
      .attr("preserveAspectRatio", "none")
      .attr("xlink:href", ramp(color.interpolator()).toDataURL());

    // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
    if (!x.ticks) {
      if (tickValues === undefined) {
        const n = Math.round(ticks + 1);
        tickValues = d3
          .range(n)
          .map((i) => d3.quantile(color.domain(), i / (n - 1)));
      }
      if (typeof tickFormat !== "function") {
        tickFormat = d3.format(tickFormat === undefined ? ",f" : tickFormat);
      }
    }

    svg
      .append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
          .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
          .tickSize(tickSize)
          .tickValues(tickValues)
      )
      .call(tickAdjust)
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g
          .append("text")
          .attr("x", marginLeft)
          .attr("y", marginTop + marginBottom - height - 6)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .attr("class", "title")
          .text(title)
      );
    return svg.node();
  }

  function createCanvas(width, height) {
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

  function ramp(color, n = 256) {
    const canvas = createCanvas(n, 1);
    const context = canvas.getContext("2d");
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    return canvas;
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
    const color = getColor({ d3: globalD3, data: useData });
    const x = getX({ d3: globalD3, data: useData, margin, width });
    const y = getY({ d3: globalD3, data: useData, height, margin });

    const legendLEle = legend({ color, title: "Number of fruit" });

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
      color,
    });
    const chartContainer = document.querySelector("#chart");
    chartContainer.innerHTML = "";
    chartContainer.appendChild(legendLEle);
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
