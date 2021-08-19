window.onload = function () {
  let globalData = null;
  // 创建图表
  function createChart({ html, svg, pieArcData, arcPie, width, height }) {
    const result = html`<svg
      viewBox="-320 -320 ${width} ${height}"
      style="max-width: 640px;"
      text-anchor="middle"
      font-family="sans-serif"
    >
      ${pieArcData.map(
        (d) => svg`
    <path fill="steelblue" d="${arcPie(d)}"></path>
    <text fill="white" transform="translate(${arcPie.centroid(d).join(",")})">
      <tspan x="0" font-size="24">${d.data.name}</tspan>
      <tspan x="0" font-size="12" dy="1.3em">${d.value.toLocaleString(
        "en"
      )}</tspan>
    </text>
  `
      )}
    </svg>`;

    return result;
  }

  function arcPie({ d3 }) {
    return d3
      .arc()
      .innerRadius(210)
      .outerRadius(310)
      .padRadius(300)
      .padAngle(2 / 300)
      .cornerRadius(8);
  }

  function pieArcData({ d3, data }) {
    return d3.pie().value((d) => d.count)(data);
  }

  function getWidth() {
    return 640;
  }
  function getHeight() {
    return 640;
  }

  function getMargin() {
    return { top: 30, right: 30, bottom: 30, left: 30 };
  }

  function getData() {
    // fetch("https://xxholic.github.io/lab/blog/90/data.json")
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
    //     // console.info(format);
    //     format.columns = ["date", "close", "lower", "middle", "upper"];
    //     globalData = format;
    //     initChart(format);
    //   });
    const format = [
      { name: "🍊", count: 21 },
      { name: "🍇", count: 13 },
      { name: "🍏", count: 8 },
      { name: "🍌", count: 5 },
      { name: "🍐", count: 3 },
      { name: "🍋", count: 2 },
      { name: "🍎", count: 1 },
      { name: "🍉", count: 1 },
    ];
    initChart(format);
  }

  function initChart(data) {
    const globalD3 = window.d3;
    const globalHtml = window.htl.html;
    const globalSvg = window.htl.svg;
    const useData = data;
    const width = getWidth();
    const height = getHeight();
    const pieArcDataObj = pieArcData({ d3: globalD3, data: useData });
    const arcPieObj = arcPie({ d3: globalD3 });
    const ele = createChart({
      d3: globalD3,
      html: globalHtml,
      svg: globalSvg,
      pieArcData: pieArcDataObj,
      arcPie: arcPieObj,
      width,
      height,
    });
    const chartContainer = document.querySelector("#chart");
    chartContainer.innerHTML = "";
    chartContainer.appendChild(ele);
  }
  Util.loading.show();
  getData();
  Util.loading.hide();
};
