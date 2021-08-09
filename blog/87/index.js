window.onload = function () {
  // 创建图表
  function createChart({ d3, width, height, color, bins, x, y, xAxis, yAxis }) {
    const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

    svg
      .append("g")
      .attr("fill", color)
      .selectAll("rect")
      .data(bins)
      .join("rect")
      .attr("x", (d) => x(d.x0) + 1)
      .attr("width", (d) => Math.max(0, x(d.x1) - x(d.x0) - 1))
      .attr("y", (d) => y(d.length))
      .attr("height", (d) => y(0) - y(d.length));

    svg.append("g").call(xAxis);

    svg.append("g").call(yAxis);

    return svg.node();
  }

  function getBins(d3, data) {
    return d3.bin().thresholds(40)(data);
  }

  function getX({ d3, bins, margin, width }) {
    return d3
      .scaleLinear()
      .domain([bins[0].x0, bins[bins.length - 1].x1])
      .range([margin.left, width - margin.right]);
  }

  function getY({ d3, bins, height, margin }) {
    return d3
      .scaleLinear()
      .domain([0, d3.max(bins, (d) => d.length)])
      .nice()
      .range([height - margin.bottom, margin.top]);
  }

  function getxAxis({ height, margin, d3, x, width, data }) {
    return (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(width / 80)
            .tickSizeOuter(0)
        )
        .call((g) =>
          g
            .append("text")
            .attr("x", width - margin.right)
            .attr("y", -4)
            .attr("fill", "currentColor")
            .attr("font-weight", "bold")
            .attr("text-anchor", "end")
            .text(data.x)
        );
  }

  function getyAxis({ margin, d3, y, height, data }) {
    return (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(height / 40))
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .select(".tick:last-of-type text")
            .clone()
            .attr("x", 4)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(data.y)
        );
  }

  function getColor() {
    return "steelblue";
  }

  function getHeight() {
    return 500;
  }

  function getMargin() {
    return { top: 20, right: 20, bottom: 30, left: 40 };
  }

  function getData() {
    fetch("./data.json")
      .then((response) => response.json())
      .then((res) => {
        console.info(res);
        initChart(res);
      });
  }

  function initChart(data) {
    const globalD3 = d3;
    const useData = data;
    const margin = getMargin();
    const width = 1000;
    const height = getHeight();
    const color = getColor();
    const bins = getBins(globalD3, useData);
    const x = getX({ d3: globalD3, bins, margin, width });
    const y = getY({ d3: globalD3, bins, height, margin });
    const xAxis = getxAxis({
      height,
      margin,
      d3: globalD3,
      x,
      width,
      data: useData,
    });
    const yAxis = getyAxis({ margin, d3: globalD3, y, height, data: useData });
    const ele = createChart({
      d3: globalD3,
      width,
      height,
      color,
      bins,
      x,
      y,
      xAxis,
      yAxis,
    });
    document.body.appendChild(ele);
  }
  Util.insertLink({
    title: "Learn D3: By Example",
    linkIndex: 92,
    type: "blog",
  });
  Util.loading.show();
  getData();
  Util.loading.hide();
};
