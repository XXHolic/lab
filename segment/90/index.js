window.onload = function () {
  const page = {
    initStart: 0,
    a: 40,
    acceleration: 0.1,
    max: 40,
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
      canvasObj.attrs({ class: "demo-canvas" });
      document.querySelector("#bicorn").appendChild(canvasObj.node);
      this.canvasObj = canvasObj;
      this.draw();
      this.pageEvent();
    },
    draw: function () {
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
        const cal = 2 * start;
        x = a * (2 * Math.cos(start) - Math.cos(cal));
        y = a * (2 * Math.sin(start) - Math.sin(cal));
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
    pageEvent: function () {
      document.querySelector("#apply").onclick = () => {
        const formObj = document.mathAttr;
        const a = formObj.attrA.value;
        // const b = formObj.attrB.value;
        // const initStart = formObj.initStart.value;
        const acceleration = formObj.acceleration.value;
        const max = formObj.max.value;
        if ([a, max, acceleration].includes("")) {
          alert("所有值不能为空");
          return;
        }
        if (a == 0) {
          alert("a 值无效 ");
          return;
        }
        if (acceleration == 0) {
          alert("递增值 值无效 ");
          return;
        }
        if (max < 1) {
          alert("变化最大值 值无效");
          return;
        }
        this.a = Number(a);
        this.acceleration = Number(acceleration);
        this.max = Number(max);
        this.draw();
      };
    },
  };

  page.init();
  insertLink({ title: "JavaScript 数学曲线—心形线(Cardioid)", linkIndex: 107 });
};
