const width = 640,
  height = 360;
const canvasObj = new Canvas(width, height);
canvasObj.attrs({ class: "flow-canvas" });
document.querySelector("#flow").appendChild(canvasObj.node);

class FlowField {
  constructor(r) {
    // 每一个单元流场大小，设定的每个单元是一个正方形
    this.resolution = r;
    this.rows = height / r; // 流场区域的行
    this.cols = width / r; // 流场区域的列
    let arr = new Array(this.rows);
    for (let i = 0; i < this.rows; i++) {
      arr[i] = new Array(this.cols).fill("");
    }
    this.fields = arr;
  }

  // 初始化类型
  init = (type = "horizontal") => {
    let { rows, cols, fields, resolution } = this;
    switch (type) {
      case "horizontal": // 水平流场
        {
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
              fields[i][j] = new Vector(1, 0);
            }
          }
        }
        break;
      case "vertical": // 垂直流场
        {
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
              fields[i][j] = new Vector(0, 1);
            }
          }
        }
        break;
      case "sin": // 正弦流场
        {
          /**
           * 参数化方程
           * x = x
           * y = sin(x)
           * 分别求导就可以得出每个点的切线
           * dx = 1
           * dy = cos(x)
           * 由于坐标 y 轴的方向跟数学坐标系不一样，取个反向
           */
          let angleGap = (4 * Math.PI) / cols; //周期
          for (let i = 0; i < rows; i++) {
            let angle = 0; // 角度的递增跟 x 轴映射
            for (let j = 0; j < cols; j++) {
              const dx = 1;
              const dy = -Math.cos(angle);
              angle = angle + angleGap;
              fields[i][j] = new Vector(dx, dy);
            }
          }
        }
        break;
      case "circle": // 圆流场
        {
          /**
           * 参数化方程
           * x = rcos(angle) + x
           * y = rsin(angle) + y
           * 分别求导就可以得出每个点的切线
           * dx = -sin(x)
           * dy = cos(x)
           */
          let r = 100,
            x = 200,
            y = 200; // 圆心和半径
          let circle = new Vector(x, y);
          for (let i = 0; i < rows; i++) {
            let pointY = i * resolution;
            for (let j = 0; j < cols; j++) {
              let pointX = j * resolution;
              const movePoint = new Vector(pointX, pointY);
              const minus = Vector.sub(circle, movePoint);
              const len = minus.mag();
              if (len <= r) {
                const angle = minus.heading();
                const dx = -Math.sin(angle);
                const dy = Math.cos(angle);
                fields[i][j] = new Vector(dx, dy);
              } else {
                fields[i][j] = "";
              }
            }
          }
        }
        break;
      case "archimedean": // 阿基米德螺线
        {
          // 参数方程
          // x = -(a + b * angle) * Math.sin(angle);
          // y = (a + b * angle) * Math.cos(angle);
          /**
           * 结合图形思考一下，这种螺线上每个点的切线肯定有相同的，
           * 所以在会只想要的矢量场时，以切线作为参考
           */
          let x = width / 2,
            y = height / 2; // 作为参考起始点
          let center = new Vector(x, y);
          // 获取曲线的点
          for (let i = 0; i < rows; i++) {
            let pointY = i * resolution;
            for (let j = 0; j < cols; j++) {
              let pointX = j * resolution;
              const movePoint = new Vector(pointX, pointY);
              // const minus = Vector.sub(movePoint, center); // 由中心点向外
              const minus = Vector.sub(center, movePoint); // 朝向中心点
              const angle = minus.heading();
              const dx = Math.cos(angle) - angle * Math.sin(angle);
              const dy = Math.sin(angle) + angle * Math.cos(angle);
              fields[i][j] = new Vector(dx, dy);
            }
          }
        }
        break;
      case "lituus": // 连锁螺线
        {
          let x = width / 2,
            y = height / 2; // 作为参考起始点
          let center = new Vector(x, y);
          // 获取曲线的点
          for (let i = 0; i < rows; i++) {
            let pointY = i * resolution;
            for (let j = 0; j < cols; j++) {
              let pointX = j * resolution;
              const movePoint = new Vector(pointX, pointY);
              // const minus = Vector.sub(movePoint, center); // 由中心点向外
              const minus = Vector.sub(center, movePoint); // 朝向中心点
              const angle = minus.heading();
              const cosValue = Math.cos(angle),
                sinValue = Math.sin(angle),
                sqrtValue = Math.sqrt(angle);
              const dx =
                -(2 * angle * sinValue + cosValue) / (2 * angle * sqrtValue);
              const dy =
                (2 * angle * cosValue - sinValue) / (2 * angle * sqrtValue);
              fields[i][j] = new Vector(dx, dy);
            }
          }
        }
        break;
      case "curve1": // 曲线 1
        {
          let x = width / 2,
            y = height / 2; // 作为参考起始点
          let center = new Vector(x, y);
          // 获取曲线的点
          for (let i = 0; i < rows; i++) {
            let pointY = i * resolution;
            for (let j = 0; j < cols; j++) {
              let pointX = j * resolution;
              // const movePoint = new Vector(pointX, pointY);
              // const minus = Vector.sub(movePoint, center); // 由中心点向外
              // const minus = Vector.sub(center, movePoint); // 朝向中心点
              const dx = pointY - 2 * pointX;
              const dy = pointX + 2 * pointY;
              fields[i][j] = new Vector(dx, dy);
            }
          }
        }
        break;
    }

    // console.info("fields", fields);
  };

  display = (canvas) => {
    let { rows, cols, fields, resolution } = this;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const vector = fields[i][j];
        const x = resolution * j; // x 轴坐标对应列的计算
        const y = resolution * i; // y 轴坐标对应行的计算
        vector && this.drawVector({ canvas, vector, x, y });
      }
    }
  };

  drawArrow = (canvas, len) => {
    const { line } = canvas;
    line({
      points: [
        [0, 0],
        [len, 0],
      ],
    });
    line({
      points: [
        [len, 0],
        [(len * 2) / 3, len / 3],
      ],
    });
    line({
      points: [
        [len, 0],
        [(len * 2) / 3, -len / 3],
      ],
    });
  };

  drawVector = ({ canvas, x, y, vector }) => {
    const { resolution } = this;
    const { translate, rotate, resetTransform } = canvas;
    translate(x, y);
    rotate(vector.heading());
    // let len = vector.mag() * scale; // 这种方式并不是必须的
    this.drawArrow(canvas, resolution / 2);
    resetTransform();
  };
}

const flow = new FlowField(20);
flow.init();
// flow.init("vertical");
// flow.init("sin");
// flow.init("circle");
// flow.init("archimedean");
// flow.init("lituus");
flow.init("curve1");
flow.display(canvasObj);
