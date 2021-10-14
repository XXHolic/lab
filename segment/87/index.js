window.onload = function () {
  const page = {
    initAngle: 0.1,
    a: 100,
    accelerationAngle: 0.1,
    circleNum: 20,
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
      this.pageEvent();
    },
    draw: function () {
      let a = this.a,
        angle = this.initAngle;
      let points = [],
        x = 0,
        y = 0;
      const acceleration = this.accelerationAngle,
        circleNum = this.circleNum;
      const { lineAttrs, canvasObj } = this;
      let { width, height, translate, line, clear, resetTransform } = canvasObj;
      while (angle <= circleNum * 2 * Math.PI) {
        const angleSqrt = Math.sqrt(angle);
        x = (a / angleSqrt) * Math.cos(angle);
        y = (a / angleSqrt) * Math.sin(angle);
        points.push([x, y]);
        angle = MathLab.plus(angle, acceleration);
      }
      // console.info("points", points);
      clear();
      translate(width / 4, height / 2);
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
        const initAngle = formObj.initAngle.value;
        const accelerationAngle = formObj.accelerationAngle.value;
        const circleNum = formObj.circleNum.value;
        if ([a, initAngle, circleNum, accelerationAngle].includes("")) {
          alert("所有值不能为空");
          return;
        }
        if (a == 0) {
          alert("a 值无效 ");
          return;
        }
        if (initAngle == 0) {
          alert("初始角度 值无效 ");
          return;
        }
        if (accelerationAngle == 0) {
          alert("递增角度 值无效 ");
          return;
        }
        if (circleNum < 1) {
          alert("圈数 值无效");
          return;
        }
        this.a = Number(a);
        // this.b = Number(b);
        this.initAngle = Number(initAngle);
        this.accelerationAngle = Number(accelerationAngle);
        this.circleNum = Number(circleNum);
        this.draw();
      };
    },
  };

  page.init();
  insertLink({ title: "JavaScript 数学曲线—连锁螺线", linkIndex: 104 });
};
