class WebGL {
  constructor(w = 300, h = 150, options = {}) {
    const { mode = "create", target } = options;
    const ratio = window.devicePixelRatio || 1;
    this.width = w;
    this.height = h;
    this.ratio = ratio;
    if (mode === "set" && target) {
      this.node = target;
      this.context = target.getContext("webgl");
      return;
    }
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl");
    this.node = canvas;
    this.context = context;
    // 高清屏幕模糊问题处理
    canvas.width = w * ratio; // 实际渲染像素
    canvas.height = h * ratio; // 实际渲染像素
    canvas.style.width = `${w}px`; // 控制显示大小
    canvas.style.height = `${h}px`; // 控制显示大小
    context.viewport(0, 0, context.canvas.width, context.canvas.height);
  }

  // 设置属性
  attrs = (attributes = {}) => {
    const target = this.node;
    for (const key in attributes) {
      target.setAttribute(key, attributes[key]);
    }
  };

  /**
   * 清除画布
   * @param {object} context canvas 上下文对象
   */
  clear = () => {
    const { context } = this;
    // 使用透明的黑色清除所有图像
    context.clearColor(0.0, 0.0, 0.0, 0.0);
    // 用上面指定的颜色清除缓冲区
    context.clear(context.COLOR_BUFFER_BIT);
  };
}

WebGL.setTarget = (target) => {
  if (typeof target !== "string") {
    console.warn("Invalid Canvas Target");
    return;
  }
  const element = document.querySelector(target);
  if (!element) {
    console.warn("Invalid Canvas Target");
    return;
  }
  const renderStyles = window.getComputedStyle(element);
  return new Canvas(renderStyles.width, renderStyles.height, {
    mode: "set",
    target: element,
  });
};
