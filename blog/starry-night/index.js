window.onload = function () {
  let globalData = [];
  // 创建图表
  function createChart({ d3, line, data, width, height }) {
    const svg = d3
      .create("svg")
      // .attr("viewBox", "0 0 100 100")
      .attr("width", "500")
      .attr("height", "300");
    svg
      .append("path")
      .attr("d", line(data))
      .attr("stroke-dasharray", 314)
      .attr("stroke-dashoffset", 314)
      .attr("fill", "transparent")
      .attr("stroke", "red")
      .attr("stroke-width", "2")
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);
    // const g = svg.append("g").attr("stroke-width", "0").attr("stroke", "green");
    // const rect = g.append("rect").attr("width", "200").attr("height", "200");

      // .duration(1000)
      // .attr("stroke-dashoffset", 0);

    return svg.node();
  }

  function line({ d3 }) {
    // return d3.lineRadial();
    return () => "M10 50 Q 77.5 10, 145 50 T 280 50";
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
    initChart([]);
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
    const useData = [
      [10, 60],
      [40, 90],
    ];
    const margin = getMargin();
    const width = getWidth();
    const height = getHeight();
    // const color = getColor({ d3: globalD3, data: useData });
    const lineObj = line({ d3: globalD3 });
    const ele = createChart({
      d3: globalD3,
      data: useData,
      line: lineObj,
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
  // let timeoutHandler = null;
  // window.onresize = function () {
  //   if (timeoutHandler) {
  //     clearTimeout(timeoutHandler);
  //   }
  //   timeoutHandler = setTimeout(() => {
  //     initChart(globalData);
  //   }, 500);
  // };
};;
