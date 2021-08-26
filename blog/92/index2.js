window.onload = function () {
  let globalData = [];
  let globalChart = null;
  let globalSelected = null;
  // 创建图表
  function createChart({
    d3,
    width,
    height,
    initData,
    margin,
    data,
    xAxis,
    yAxis,
  }) {
    const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

    // For the initial render, reference the current age non-reactively.
    const agedata = initData;

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(agedata, (d) => d.value)])
      .rangeRound([margin.left, width - margin.right]);

    const y = d3
      .scaleBand()
      .domain(agedata.map((d) => d.name))
      .rangeRound([margin.top, margin.top + 20 * data.names.length]);

    let bar = svg
      .append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(agedata, (d) => d.name)
      .join("rect")
      .style("mix-blend-mode", "multiply")
      .attr("x", x(0))
      .attr("y", (d) => y(d.name))
      .attr("width", (d) => x(d.value) - x(0))
      .attr("height", y.bandwidth() - 1);

    const gx = svg.append("g").call(xAxis, x);

    const gy = svg.append("g").call(yAxis, y);

    return Object.assign(svg.node(), {
      update(agedata) {
        const t = svg.transition().duration(750);

        gx.transition(t).call(
          xAxis,
          x.domain([0, d3.max(agedata, (d) => d.value)])
        );

        gy.transition(t).call(yAxis, y.domain(agedata.map((d) => d.name)));

        bar = bar
          .data(agedata, (d) => d.name)
          .call((bar) =>
            bar
              .transition(t)
              .attr("width", (d) => x(d.value) - x(0))
              .attr("y", (d) => y(d.name))
          );
      },
    });
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

  function getxAxis({ margin, d3, width }) {
    return (g, x) =>
      g
        .attr("transform", `translate(0,${margin.top})`)
        .call(d3.axisTop(x).ticks(width / 80, "%"))
        .call((g) =>
          (g.selection ? g.selection() : g).select(".domain").remove()
        );
  }

  function getyAxis({ margin, d3 }) {
    return (g, y) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickSizeOuter(0));
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
    return 230;
  }

  function getMargin() {
    return { top: 20, right: 20, bottom: 0, left: 30 };
  }

  function getData() {
    fetch("https://xxholic.github.io/lab/blog/92/data.json")
      .then((response) => response.json())
      .then((res) => {
        const { list, ages, names } = res;
        let format = list;
        format.ages = ages;
        format.names = names;
        globalData = format;
        creteButton(format);
        initChart(format);
      });
  }

  function creteButton(data) {
    const globalD3 = window.d3;
    const globalHtml = window.htl.html;

    const form = globalHtml`<form
      style="display: flex; align-items: center; min-height: 33px; font: 12px var(--sans-serif);"
    >
      <select name="i">
        ${data.ages.map((age) =>
          Object.assign(globalHtml`<option></option>`, { textContent: age })
        )}
      </select>
      <div style="margin-left: 0.5em;">Age group</div>
    </form>`;
    form.i.onchange = () => form.dispatchEvent(new CustomEvent("input"));
    form.oninput = () => {
      form.value = data
        .filter((d) => d.age === form.i.value)
        .sort((a, b) => d3.descending(a.value, b.value));
      globalSelected = form.value;
      globalChart.update(form.value);
    };
    // form.oninput();
    const container = document.querySelector("#btn");
    container.innerHTML = "";
    container.appendChild(form);
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
    // const x = getX({ d3: globalD3, data: useData, margin, width });
    // const y = getY({ d3: globalD3, data: useData, height, margin });
    const xAxis = getxAxis({ d3: globalD3, margin, width });
    const yAxis = getyAxis({ d3: globalD3, margin });

    const initData = globalSelected
      ? globalSelected
      : data
          .filter((d) => d.age === "<10")
          .sort((a, b) => d3.descending(a.value, b.value));
    const ele = createChart({
      d3: globalD3,
      data: useData,
      initData,
      width,
      height,
      margin,
      xAxis,
      yAxis,
    });
    globalChart = ele;
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
