window.onload = function () {
  let globalData = null;
  // 创建图表
  function createChart({
    d3,
    html,
    svg,
    shape,
    data,
    width,
    height,
    xAxis,
    yAxis,
  }) {
    const pathD = shape(data);
    const result = html`<svg viewBox="0 0 ${width} ${height}">
      <path fill="steelblue" d="${pathD}"></path>
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

  function area({ d3, x, y }) {
    return d3
      .area()
      .x((d) => x(d.date))
      .y0(y(0))
      .y1((d) => y(d.close));
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
    // fetch("./data.json")
    //   .then((response) => response.json())
    //   .then((res) => {
    //     const format = res.map((ele) => {
    //       const { date, close, lower, middle, upper } = ele;
    //       return {
    //         date: new Date(date),
    //         close: Number(close),
    //         lower: Number(lower),
    //         middle: Number(middle),
    //         upper: Number(upper),
    //       };
    //     });
    //     console.info(format);
    //     format.columns = ["date", "close", "lower", "middle", "upper"];
    //     initChart(format);
    //   });
    const testData = [
      {
        date: "2007-05-20",
        close: 111.98,
        lower: 93.21,
        middle: 103.79,
        upper: 114.38,
      },
      {
        date: "2007-05-21",
        close: 113.54,
        lower: 94.59,
        middle: 104.81,
        upper: 115.02,
      },
      {
        date: "2007-05-22",
        close: 112.89,
        lower: 95.89,
        middle: 105.68,
        upper: 115.48,
      },
      {
        date: "2007-05-23",
        close: 110.69,
        lower: 96.79,
        middle: 106.28,
        upper: 115.76,
      },
      {
        date: "2007-05-24",
        close: 113.62,
        lower: 97.43,
        middle: 106.96,
        upper: 116.49,
      },
      {
        date: "2007-05-28",
        close: 114.35,
        lower: 98.24,
        middle: 107.69,
        upper: 117.14,
      },
      {
        date: "2007-05-29",
        close: 118.77,
        lower: 98.81,
        middle: 108.65,
        upper: 118.5,
      },
      {
        date: "2007-05-30",
        close: 121.19,
        lower: 99.15,
        middle: 109.69,
        upper: 120.23,
      },
      {
        date: "2007-06-01",
        close: 118.4,
        lower: 100.32,
        middle: 110.59,
        upper: 120.86,
      },
      {
        date: "2007-06-04",
        close: 121.33,
        lower: 101.36,
        middle: 111.62,
        upper: 121.88,
      },
      {
        date: "2007-06-05",
        close: 122.67,
        lower: 101.85,
        middle: 112.56,
        upper: 123.27,
      },
    ];
    let format = testData.map((ele) => {
      const { date, close, lower, middle, upper } = ele;
      return {
        date: new Date(date),
        close: Number(close),
        lower: Number(lower),
        middle: Number(middle),
        upper: Number(upper),
      };
    });
    format.columns = ["date", "close", "lower", "middle", "upper"];
    globalData = format;
    initChart(format);
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
    const shopeObj = area({ d3: globalD3, x, y });
    const ele = createChart({
      d3: globalD3,
      html: globalHtml,
      svg: globalSvg,
      data: useData,
      width,
      height,
      shape: shopeObj,
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
  let timeoutHandler = null;
  window.onresize = function () {
    if (timeoutHandler) {
      clearTimeout(timeoutHandler);
    }
    timeoutHandler = setTimeout(() => {
      initChart(globalData);
    }, 1000);
  };
  Util.loading.hide();
};
