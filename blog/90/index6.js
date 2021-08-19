window.onload = function () {
  let globalData = null;
  // 创建图表
  function createChart({ d3, html, svg, arc, n, width, height }) {
    const result = html`<svg
      viewBox="-320 -320 ${width} ${height}"
      style="max-width: 640px;"
    >
      ${Array.from(
        { length: n },
        (_, i) =>
          svg`<path stroke="black" fill="${d3.interpolateRainbow(
            i / n
          )}" d="${arc([
            (i / n) * 2 * Math.PI,
            ((i + 1) / n) * 2 * Math.PI,
          ])}"></path>`
      )}
    </svg>`;

    return result;
  }

  function arc({ d3 }) {
    return d3
      .arc()
      .innerRadius(210)
      .outerRadius(310)
      .startAngle(([startAngle, endAngle]) => startAngle)
      .endAngle(([startAngle, endAngle]) => endAngle);
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
    initRange();
    initChart(12);
  }

  function initRange() {
    const form = window.htl.html`<form
      style="font: 12px var(--sans-serif); display: flex; align-items: center; min-height: 33px;"
    >
      <label style="display: block;">
        <input
          name="input"
          type="range"
          min="1"
          max="50"
          value="12"
          step="1"
          style="width: 180px;-webkit-appearance:auto"
        />
        n = <output name="output"></output>
      </label>
    </form>`;
    form.oninput = () => {
      form.output.value = form.value = form.input.valueAsNumber;
      initChart(form.value);
    };
    form.oninput();
    const rangeContainer = document.querySelector("#range");
    rangeContainer.innerHTML = "";
    rangeContainer.appendChild(form);
  }

  function initChart(data) {
    const globalD3 = window.d3;
    const globalHtml = window.htl.html;
    const globalSvg = window.htl.svg;
    const useData = data;
    const width = getWidth();
    const height = getHeight();
    const shapeObj = arc({ d3: globalD3 });
    const ele = createChart({
      d3: globalD3,
      html: globalHtml,
      svg: globalSvg,
      n: useData,
      width,
      height,
      arc: shapeObj,
    });
    const chartContainer = document.querySelector("#chart");
    chartContainer.innerHTML = "";
    chartContainer.appendChild(ele);
  }
  Util.loading.show();
  initRange();
  Util.loading.hide();
};
