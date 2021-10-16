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
      this.drawArchimedeanSpiral();
    },
    drawArchimedeanSpiral: function () {
      let a = this.a,
        start = this.initStart;
      let points = [],
        x = 0,
        y = 0;
      const acceleration = this.acceleration,
        max = this.max;
      const { lineAttrs, canvasObj } = this;
      let { width, height, translate, line, clear, resetTransform } = canvasObj;
      while (start <= max) {
        x = a * Math.pow(Math.cos(start), 3);
        y = a * Math.pow(Math.sin(start), 3);
        points.push([x, y]);
        start = MathLab.plus(start, acceleration);
      }
      // console.info("points", points);
      clear();
      translate(width / 2, height / 2);
      line({
        ...lineAttrs,
        points: points,
      });
      resetTransform();
    },
  };

  page.init();
};
