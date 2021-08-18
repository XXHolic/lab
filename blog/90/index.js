window.onload = function () {
  // 创建图表
  function createChart({
    d3,
    html,
    svg,
    line,
    data,
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
    return (g) =>
      g.attr("transform", `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );
  }

  function getyAxis({ margin, d3, y, height }) {
    return (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(height / 40))
        .call((g) => g.select(".domain").remove());
  }

  function getColor({ d3, data }) {
    return d3
      .scaleSequential()
      .domain([0, d3.max(data, (d) => d.count)])
      .interpolator(d3.interpolateBlues);
  }

  function getHeight() {
    return 240;
  }

  function getMargin() {
    return { top: 30, right: 30, bottom: 30, left: 30 };
  }

  function getData() {
    fetch("./data.json")
      .then((response) => response.json())
      .then((res) => {
        console.info(res);
        const format = res.map((ele) => {
          const { date, close, lower, middle, upper } = ele;
          return {
            date: new Date(date),
            close,
            lower,
            middle,
            upper,
          };
        });
        format.columns = ["date", "close", "lower", "middle", "upper"];
        initChart(format);
      });
  }

  function initChart(data) {
    const globalD3 = window.d3;
    const globalHtml = window.htl.html;
    const globalSvg = window.htl.svg;
    const useData = data;
    const margin = getMargin();
    const width = 1000;
    const height = getHeight();
    // const color = getColor({ d3: globalD3, data: useData });
    const x = getX({ d3: globalD3, data: useData, margin, width });
    const y = getY({ d3: globalD3, data: useData, height, margin });
    const xAxis = getxAxis({ d3: globalD3, x, margin, width, height });
    const yAxis = getyAxis({ d3: globalD3, y, margin, height });
    const lineObj = line({ d3: globalD3, x, y });
    const ele = createChart({
      d3: globalD3,
      html: globalHtml,
      svg: globalSvg,
      data: useData,
      width,
      height,
      line: lineObj,
      xAxis,
      yAxis,
    });
    document.body.appendChild(ele);
  }
  // Util.insertLink({
  //   title: "Learn D3: Scales",
  //   linkIndex: 92,
  //   type: "blog",
  // });
  Util.loading.show();
  getData();
  Util.loading.hide();
};
