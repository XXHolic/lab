// 用 d3 创建元素
function createCircle({ data }) {
  const { type, attributes } = data;
  return createEle({ namesapce: svgNamespace, tag: type, attributes });
}

// 用 d3 创建元素，特定逻辑通用
function createCircleGap({ data }) {
  const { type, attributes, config } = data;
  const g = createEle({ namesapce: svgNamespace, tag: "g" });
  const circleEle = [];
  for (const item of config) {
    const { gap, ...otherArr } = item;
    const newAttributes = { ...attributes, ...otherArr, r: attributes.r + gap };
    const ele = createEle({
      namesapce: svgNamespace,
      tag: "circle",
      attributes: newAttributes,
    });
    circleEle.push(ele);
  }
  appendEle(g, circleEle);
  return g;
}
