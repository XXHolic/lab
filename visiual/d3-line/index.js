window.onload = function() {

  class Tooltip {
    constructor() {
      this._date = svg`<text y="-22"></text>`;
      this._close = svg`<text y="-12"></text>`;
      this.node = svg`<g pointer-events="none" display="none" font-family="sans-serif" font-size="10" text-anchor="middle">
  <rect x="-27" width="54" y="-30" height="20" fill="white"></rect>
  ${this._date}
  ${this._close}
  <circle r="2.5"></circle>
</g>`;
    }
    show(d) {
      this.node.removeAttribute("display");
      this.node.setAttribute(
        "transform",
        `translate(${x(d.date)},${y(d.close)})`
      );
      this._date.textContent = formatDate(d.date);
      this._close.textContent = formatClose(d.close);
    }
    hide() {
      this.node.setAttribute("display", "none");
    }
  }

  const getLine = (x, y) => {
    return d3
      .line()
      .defined((d) => !isNaN(d.value))
      .x((d) => x(d.date))
      .y((d) => y(d.value));
  };

  const getX = (data, margin, width) => {
    return d3
      .scaleUtc()
      .domain(d3.extent(data, (d) => d.date))
      .range([margin.left, width - margin.right]);
  };

  const getY = (data, height, margin) => {
    return d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);
  };

  const getXAxis = (height, margin, x, width) => {
    return (g) =>
      g.attr("transform", `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );
  };

  const getYAxis = (margin, y, data) => {
    return (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .select(".tick:last-of-type text")
            .clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(data.y)
        );
  };

  const createChart = (width, height, xAxis, yAxis, data, line) => {
    // const tooltip = new Tooltip();

    const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

    svg.append("g").call(xAxis);

    svg.append("g").call(yAxis);

    svg.append("path").datum(data).attr("stroke", "#ccc").attr("d", line);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

    // svg
    //   .append("g")
    //   .attr("fill", "none")
    //   .attr("pointer-events", "all")
    //   .selectAll("rect")
    //   .data(d3.pairs(data))
    //   .join("rect")
    //   .attr("x", ([a, b]) => x(a.date))
    //   .attr("height", height)
    //   .attr("width", ([a, b]) => x(b.date) - x(a.date))
    //   .on("mouseover", (event, [a]) => tooltip.show(a))
    //   .on("mouseout", () => tooltip.hide());

    // svg.append(() => tooltip.node);
    return svg.node();
  };

  const formatData = (data) => {
    return data.map((ele) => {
      const { date, value } = ele;
      return {
        date: new Date(date),
        value,
      };
    });
  };

  const defaultConfig = {
    width: 1000,
    height: 500,
  };
  const marginData = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40,
  };
  const defaultData = [
    { date: "2021-07-15", value: 286 },
    { date: "2021-07-16", value: 285 },
    { date: "2021-07-19", value: 284 },
    { date: "2021-07-20", value: 287 },
    { date: "2021-07-24", value: 295 },
    { date: "2021-07-26", value: 296 },
    { date: "2021-07-27", value: 296 },
    { date: "2021-07-29", value: 295 },
    { date: "2021-08-02", value: 295 },
    { date: "2021-08-03", value: 296 },
    { date: "2021-08-04", value: 294 },
    { date: "2021-08-05", value: 294 },
    { date: "2021-08-09", value: 293 },
    { date: "2021-08-16", value: 296 },
    { date: "2021-08-23", value: 296 },
    { date: "2021-08-25", value: 294 },
    { date: "2021-08-26", value: 294 },
  ];
  const data = formatData(defaultData);
  const widthData = defaultConfig.width;
  const heightData = defaultConfig.height;
  const xData = getX(data, marginData, widthData);
  const yData = getY(data, heightData, marginData);
  const xAxisData = getXAxis(heightData, marginData, xData, widthData);
  const yAxisData = getYAxis(marginData, yData, data);
  const line = getLine(xData, yData);
  const ele = createChart(1000, 500, xAxisData, yAxisData, data, line);
  document.body.appendChild(ele);
  console.info("ele", ele);
}