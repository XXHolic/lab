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
    /**
     * 阿基米德螺线的极坐标方程式为 ： r = a + b*θ
     *
     * 参数含义：
     *   r - 旋转半径。
     *   a - 实数，起始点与极坐标中心的距离，影响螺旋线的旋转。
     *   b - 实数，影响相邻两条曲线之间的距离。
     *   θ - 角度，影响了螺线的大小。
     *
     * 从极坐标系到笛卡尔坐标系的变换方法
     * r*r = x*x + y*y
     * x = r * cos(θ)
     * y = r * sin(θ)
     * θ = arctan(y/x)
     *
     * 代入上面的转换后可得：
     * x = (a + b*θ) * cos(θ)
     * y = (a + b*θ) * sin(θ)
     *
     * 从线速度和角速度的概念出发，可以这样替换：
     * r = vt // 匀速 v 乘以时间 t ，就得出了一个距离
     * θ = wt // 匀角速速 w 乘以时间 t ，就得到一个角度
     * x = vt * cos(wt)
     * y = vt * sin(wt)
     *
     */
    draw: function () {
      let a = 0,
        b = 10,
        angle = 0;
      let points = [],
        x = 0,
        y = 0;
      const acceleration = 0.1,
        circleNum = 2;
      const { lineAttrs, canvasObj } = this;
      let { width, height, translate, line } = canvasObj;
      // 注意这里角度的递增，以 2 * Math.PI 为基准进行比较，控制画多少圈
      while (angle <= circleNum * 2 * Math.PI) {
        // while (y <= height) {
        // 调用函数的时候转换成弧度 这样绘制出来不对
        // const angleRadius = (angle * Math.PI) / 180;
        x = (a + b * angle) * Math.cos(angle);
        y = (a + b * angle) * Math.sin(angle);
        points.push([x, y]);
        angle = MathLab.plus(angle, acceleration); // 注意这里是角度的递增,如果要换成弧度，记得递增的也要换成弧度
      }
      console.info("points", points);
      translate(width / 2, height / 2);
      line({
        ...lineAttrs,
        points: points,
      });
    },
  };

  page.init();
  insertLink({ title: "JavaScript 数学曲线—阿基米德螺线", linkIndex: 102 });
};
