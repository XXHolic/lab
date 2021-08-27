window.onload = function () {
  let globalData = [];
  // 创建图表
  function createChart({
    d3,
    html,
    svg,
    line,
    data,
    width,
    height,
    Tooltip,
    x,
    xAxis,
    yAxis,
  }) {
    const tooltip = new Tooltip();
    const result = html`<svg viewBox="0 0 ${width} ${height}">
      <path
        d="${line(data)}"
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
      <g fill="none" pointer-events="all">
        ${d3.pairs(data, (a, b) =>
          Object.assign(
            svg`<rect x="${x(a.date)}" height="${height}" width="${
              x(b.date) - x(a.date)
            }"></rect>`,
            {
              onmouseover: () => tooltip.show(a),
              onmouseout: () => tooltip.hide(),
            }
          )
        )}
      </g>
      ${tooltip.node}
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

  function getWidth() {
    return window.innerWidth - 20;
  }

  function getHeight() {
    return 240;
  }

  function getMargin() {
    return { top: 30, right: 30, bottom: 30, left: 30 };
  }

  function formatDate({ d3 }) {
    return d3.utcFormat("%b %-d, ’%y");
  }

  function formatClose({ d3 }) {
    return d3.format("$.2f");
  }

  function getTooltip({ svg, x, y, formatDate, formatClose }) {
    return class Tooltip {
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
    };
  }

  function getData() {
    fetch("https://xxholic.github.io/lab/blog/91/data.json")
      .then((response) => response.json())
      .then((res) => {
        const format = res.map((ele) => {
          const { date, close, lower, middle, upper } = ele;
          return {
            date: new Date(date),
            close: Number(close),
            lower: Number(lower),
            middle: Number(middle),
            upper: Number(upper),
          };
        });
        // console.info(format);
        format.columns = ["date", "close", "lower", "middle", "upper"];
        globalData = format;
        // creteButton();
        initChart(format);
      });
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
    const lineObj = line({ d3: globalD3, x, y });
    const formatDateFun = formatDate({ d3: globalD3 });
    const formatCloseFun = formatClose({ d3: globalD3 });
    const tooltipClass = getTooltip({
      svg: globalSvg,
      x,
      y,
      formatDate: formatDateFun,
      formatClose: formatCloseFun,
    });
    const ele = createChart({
      d3: globalD3,
      html: globalHtml,
      svg: globalSvg,
      data: useData,
      width,
      height,
      line: lineObj,
      Tooltip: tooltipClass,
      formatDate: formatDateFun,
      formatClose: formatCloseFun,
      x,
      xAxis,
      yAxis,
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
