window.onload = function () {
  let globalData = [];
  // const d3.scaleSequential().domain([200, 100]);
  // 创建图表
  function createChart({ d3, line, width, height }) {
    const svg = d3.create("svg").attr("width", "500").attr("height", "600");
    const shapeData = line();
    for (let index = 0, len = shapeData.length; index < len; index++) {
      const ele = shapeData[index];
      switch (ele.type) {
        case "circle":
          {
            const radialGradientEle = paintRadialGradient({ data: ele });
            svg.append(() => radialGradientEle);
            svg
              .append("circle")
              .attr("fill", () => {
                const value = ele.radialGradientId
                  ? `url(#${ele.radialGradientId})`
                  : "transparent";
                return value;
              })
              .attr("cx", ele.cx)
              .attr("cy", ele.cy)
              .attr("r", ele.r)
              .attr("transform-origin", `${ele.cx} ${ele.cy}`)
              // .transition()
              // .duration(750)
              .style(
                "animation",
                "circleZoom 2s ease-in-out alternate infinite"
              );
            // .attrTween("transform", () => {
            //   return (t) => {
            //     const scaleValue = d3.scaleSequential(t).domain([1, 1.5]);
            //     console.info("scaleValue", scaleValue);
            //     return `scale(${scaleValue}, ${scaleValue})`;
            //   };
            // });
          }
          break;
      }
    }

    // svg
    //   .append("path")
    //   .attr("d", line(data))
    //   .attr("fill", "transparent")
    //   .attr("stroke", "red")
    //   .attr("stroke-width", "2");
    // .attr("stroke-dasharray", 40)
    // .attr("stroke-dashoffset", 314)
    // .transition()
    // .duration(1000)
    // .ease(d3.easeLinear)
    // .attr("stroke-dashoffset", 0);

    return svg.node();
  }

  function line({ d3 }) {
    // return d3.lineRadial();
    return () => [
      {
        type: "circle",
        cx: 50,
        cy: 50,
        r: 15,
        radialGradientId: "circle1",
        stopEle: [
          { offset: "20%", "stop-color": "#d49100" },
          { offset: "21%", "stop-color": "#d5cd55" },
          { offset: "79%", "stop-color": "#d5cd55" },
          { offset: "80%", "stop-color": "#abb511" },
        ],
      },
    ];
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
};
