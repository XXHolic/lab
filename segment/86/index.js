window.onload = function () {
  const page = {
    canvasObj: {},
    lineAttrs: {
      points: [],
      lineWidth: 1,
      lineCap: "round",
      strokeStyle: "rgba(0,148,255,1)",
      fillStyle: "rgba(0,148,255,1)",
    },
    init: function () {
      const canvasObj = new Canvas(400, 300);
      document.querySelector("#archimedeanSpiral").appendChild(canvasObj.node);
      this.canvasObj = canvasObj;
      this.draw();
    },
    draw: function () {
      let a = 0.1,
        b = 0.3,
        angle = 0;
      let points = [],
        x = 0,
        y = 0;
      const acceleration = 0.1,
        circleNum = 4;
      const { lineAttrs, canvasObj } = this;
      let { width, height, translate, line } = canvasObj;
      // 注意这里角度的递增，以 2 * Math.PI 为基准进行比较，控制画多少圈
      while (angle <= circleNum * 2 * Math.PI) {
        const anglePow = Math.pow(Math.E, b * angle);
        x = a * anglePow * Math.cos(angle);
        y = a * anglePow * Math.sin(angle);
        points.push([x, y]);
        angle = MathLab.plus(angle, acceleration); // 注意这里是角度的递增,如果要换成弧度，记得递增的也要换成弧度
      }
      // console.info("points", points);
      translate(width / 2, height / 2);
      line({
        ...lineAttrs,
        points: points,
      });
    },
  };

  page.init();
  insertLink({ title: "JavaScript 数学曲线—等角螺线", linkIndex: 103 });
};
