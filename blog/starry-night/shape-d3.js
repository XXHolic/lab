// 用 d3 创建元素
function d3CreateEle({ d3, data }) {
  const circle = d3.create("svg:circle");
  for (const key in data) {
    switch (key) {
      default: {
        circle.attr(key, data[key]);
      }
    }
  }

  return circle.node();
}

// 用 d3 创建元素，特定逻辑通用
function createCircleGap({ d3, data }) {
  const { gradientId, cx, cy, r, config } = data;
  const g = d3.create("svg:g");

  for (const item of config) {
    const { gap, ...otherArr } = item;
    createCircle({ gradientId, cx, cy, r: r + gap, ...otherArr });
  }

  circle
    .attr("fill", () => {
      const value = gradientId ? `url(#${gradientId})` : "transparent";
      return value;
    })
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("r", r)
    .attr("transform-origin", `${cx} ${cy}`);

  return circle.node();
}
