window.onload = function () {
  let globalData = [];
  // 创建图表
  function createChart({ d3, width, alphabet }) {
    const svg = d3
      .create("svg")
      .attr("viewBox", [0, 0, width, 33])
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .style("display", "block");

    svg
      .selectAll("text")
      .data(alphabet)
      .join("text")
      .attr("x", (d, i) => i * 17)
      .attr("y", 17)
      .attr("dy", "0.35em")
      .text((d) => d);

    return svg.node();
  }

  function createChart2({ d3, width }) {
    const svg = d3
      .create("svg")
      .attr("viewBox", [0, 0, width, 33])
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .style("display", "block");

    let text = svg.selectAll("text");

    return Object.assign(svg.node(), {
      update(letters) {
        text = text
          .data(letters)
          .join("text")
          .attr("x", (d, i) => i * 17)
          .attr("y", 17)
          .attr("dy", "0.35em")
          .text((d) => d);
      },
    });
  }

  function createChart3({ d3, width }) {
    const svg = d3
      .create("svg")
      .attr("viewBox", [0, 0, width, 33])
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .style("display", "block");

    let text = svg.selectAll("text");

    return Object.assign(svg.node(), {
      update(letters) {
        text = text
          .data(letters, (d) => d)
          .join(
            (enter) =>
              enter
                .append("text")
                .attr("y", 17)
                .attr("dy", "0.35em")
                .text((d) => d),
            (update) => update,
            (exit) => exit.remove()
          )
          .attr("x", (d, i) => i * 17);
      },
    });
  }

  function createChart4({ d3, width }) {
    const svg = d3
      .create("svg")
      .attr("viewBox", [0, 0, width, 33])
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .style("display", "block");

    let text = svg.selectAll("text");

    return Object.assign(svg.node(), {
      update(letters) {
        const t = svg.transition().duration(750);

        text = text
          .data(letters, (d) => d)
          .join(
            (enter) =>
              enter
                .append("text")
                .attr("y", -7)
                .attr("dy", "0.35em")
                .attr("x", (d, i) => i * 17)
                .text((d) => d),
            (update) => update,
            (exit) =>
              exit.call((text) => text.transition(t).remove().attr("y", 41))
          )
          .call((text) =>
            text
              .transition(t)
              .attr("y", 17)
              .attr("x", (d, i) => i * 17)
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

  function getxAxis({ height, margin, d3, x, width }) {
    return (g, scale = x) =>
      g.attr("transform", `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(scale)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );
  }

  function getyAxis({ margin, d3, y, height }) {
    return (g, scale = y) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(scale).ticks(height / 40))
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

  function excuteGenerator(generator, fun) {
    const nextStep = generator.next();
    nextStep.then((res) => {
      // console.info("res", res);
      const nextValue = res;
      if (nextValue.done) {
        return;
      }
      fun && fun(nextValue.value);
      window.requestAnimationFrame(excuteGenerator.bind(this, generator, fun));
    });
  }

  function getAlphabet() {
    return [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  }

  function promiseDelay(duration, value = "") {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(value);
      }, duration);
    });
  }

  async function* randomLetters({ d3 }) {
    let i = 0;
    const alphabet = getAlphabet();
    while (i < 300) {
      yield d3
        .shuffle(alphabet.slice())
        .slice(Math.floor(Math.random() * 10) + 5)
        .sort(d3.ascending);
      i++;
      await promiseDelay(3000);
    }
  }

  function getData() {
    // fetch("https://xxholic.github.io/lab/blog/91/data.json")
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
    //     initChart2()
    //   });
    initChart();
    initChart2();
    initChart3();
    initChart4();
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
    // const xAxis = getxAxis({ d3: globalD3, x, margin, width, height });
    // const yAxis = getyAxis({ d3: globalD3, y, margin, height });
    const alphabet = getAlphabet();
    const ele = createChart({
      d3: globalD3,
      width,
      alphabet,
    });
    const chartContainer = document.querySelector("#chart");
    chartContainer.innerHTML = "";
    chartContainer.appendChild(ele);
  }

  function initChart2(data) {
    const globalD3 = window.d3;
    const width = getWidth();

    const chart = createChart2({
      d3: globalD3,
      width,
    });
    const chartContainer = document.querySelector("#chart2");
    chartContainer.innerHTML = "";
    chartContainer.appendChild(chart);

    const generator = randomLetters({ d3: globalD3 });
    const updateFun = (value) => {
      chart.update(value);
    };
    window.requestAnimationFrame(
      excuteGenerator.bind(this, generator, updateFun)
    );
  }

  function initChart3(data) {
    const globalD3 = window.d3;
    const width = getWidth();

    const chart = createChart3({
      d3: globalD3,
      width,
    });
    const chartContainer = document.querySelector("#chart3");
    chartContainer.innerHTML = "";
    chartContainer.appendChild(chart);

    const generator = randomLetters({ d3: globalD3 });
    const updateFun = (value) => {
      chart.update(value);
    };
    window.requestAnimationFrame(
      excuteGenerator.bind(this, generator, updateFun)
    );
  }

  function initChart4(data) {
    const globalD3 = window.d3;
    const width = getWidth();

    const chart = createChart4({
      d3: globalD3,
      width,
    });
    const chartContainer = document.querySelector("#chart4");
    chartContainer.innerHTML = "";
    chartContainer.appendChild(chart);

    const generator = randomLetters({ d3: globalD3 });
    const updateFun = (value) => {
      chart.update(value);
    };
    window.requestAnimationFrame(
      excuteGenerator.bind(this, generator, updateFun)
    );
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
      initChart();
      initChart2();
      initChart3();
      initChart4();
    }, 500);
  };
};
