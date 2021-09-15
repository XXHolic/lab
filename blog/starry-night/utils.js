const svgNamespace = "http://www.w3.org/2000/svg";
const htmlNamespace = "http://www.w3.org/1999/xhtml";

function createEle({ namesapce = htmlNamespace, tag = "", attributes = {} }) {
  if (!tag || typeof tag !== "string") {
    console.warn("Invalid Tag");
    return;
  }
  const ele = document.createElementNS(namesapce, tag);
  for (const key in attributes) {
    ele.setAttribute(key, attributes[key]);
  }

  return ele;
}

function appendEle(parent, children) {
  children.map((ele) => {
    parent.append(ele);
  });
}

function paintRadialGradient({ data }) {
  const { radialGradientId = "", stopEle = [] } = data;
  const defsEle = createEle({ namesapce: svgNamespace, tag: "defs" });
  const radialGradientEle = createEle({
    namesapce: svgNamespace,
    tag: "radialGradient",
    attributes: {
      id: radialGradientId,
    },
  });

  const stopArr = stopEle.map((ele) => {
    return createEle({
      namesapce: svgNamespace,
      tag: "stop",
      attributes: ele,
    });
  });
  if (stopArr && stopArr.length) {
    appendEle(radialGradientEle, stopArr);
  }
  appendEle(defsEle, [radialGradientEle]);
  return defsEle;
}

function transformAnimation({
  translateX = 0,
  translateY = 0,
  scaleX = 1,
  scaleY = 1,
}) {
  return `
      translate(${translateX}, ${translateY})
      scale(${scaleX}, ${scaleY})
    `;
}
