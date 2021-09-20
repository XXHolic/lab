function createBgColor() {
  const bgEle = createEle({
    namesapce: svgNamespace,
    tag: "rect",
    attributes: {
      width: "1300",
      height: "1042",
      fill: "#000",
      "role-explain": "background color",
    },
  });

  return bgEle;
}

function creatBase({ data }) {
  const { groupAttributes, config } = data;
  const g = createEle({
    namesapce: svgNamespace,
    tag: "g",
    attributes: groupAttributes,
  }); // 用于分组包裹
  const eleArr = config.map((ele) => {
    const { type, attributes } = ele;
    switch (type) {
      case "path": {
        return createEle({
          namesapce: svgNamespace,
          tag: "path",
          attributes,
        });
      }
    }
  });
  appendEle(g, eleArr);
  return g;
}

// 原生绘制特定图形
function createCircle({ data }) {
  const { type, groupAttributes, attributes, gradient, moon, concentric } =
    data;
  const g = createEle({
    namesapce: svgNamespace,
    tag: "g",
    attributes: groupAttributes,
  }); // 用于分组包裹
  let eleArr = [];
  if (gradient) {
    eleArr = eleArr.concat(paintGradient({ data: gradient }));
  }
  const circleEle = createEle({
    namesapce: svgNamespace,
    tag: type,
    attributes,
  });
  eleArr = eleArr.concat(circleEle);

  if (moon) {
    eleArr = eleArr.concat(createMoon({ data: moon }));
  }
  if (concentric) {
    eleArr = eleArr.concat(createConcentricCircle({ data: concentric }));
  }
  appendEle(g, eleArr);
  return g;
}

// 原生绘制特定图形
function createConcentricCircle({ data }) {
  const { type, attributes, config } = data;
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
  return circleEle;
}

// 原生绘制特定图形
function createMoon({ data }) {
  // const { attributes } = data;
  const attributes = data;
  const bg = createEle({ namesapce: svgNamespace, tag: "use", attributes });
  return bg;
}

// 原生绘制特定图形
function createBg({ data }) {
  const { type, attributes } = data;
  const bg = createEle({ namesapce: svgNamespace, tag: "image", attributes });
  return bg;
}
