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
      const canvasObj = new Canvas(700, 300);
      document.querySelector("#archimedeanSpiral").appendChild(canvasObj.node);
      this.canvasObj = canvasObj;
      this.draw();
    },
    draw: function () {
      let a = 100,
        angle = 0.1;
      let points = [],
        x = 0,
        y = 0;
      const acceleration = 0.1,
        circleNum = 20;
      const { lineAttrs, canvasObj } = this;
      let { width, height, translate, line } = canvasObj;
      while (angle <= circleNum * 2 * Math.PI) {
        const angleSqrt = Math.sqrt(angle);
        x = (a / angleSqrt) * Math.cos(angle);
        y = (a / angleSqrt) * Math.sin(angle);
        points.push([x, y]);
        angle = MathLab.plus(angle, acceleration);
      }
      console.info("points", points);
      translate(width / 4, height / 2);
      line({
        ...lineAttrs,
        points: points,
      });
    },
  };

  page.init();
  insertLink({ title: "JavaScript 数学曲线—连锁螺线", linkIndex: 104 });
};
