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
    // this.init();
  }

  // 初始化类型
  init = (type = "horizontal") => {
    let { rows, cols, fields, resolution } = this;
    switch (type) {
      case "horizontal": // 水平流场
        {
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
              fields[i][j] = new Vector(1, 0); //每行有10列
            }
          }
        }
        break;
      case "sin": // 正弦流场
        {
          // 划分的单元格跨越曲线的角度范围
          let angleGap = (2 * Math.PI) / cols;
          const rangeHeight = height;
          for (let i = 0; i < rows; i++) {
            let angle = 0; // 角度的递增跟 x 轴映射
            for (let j = 0; j < cols; j++) {
              // 取宽跨度的开始和结束两个点的坐标，然后相减得到方向向量
              const xStart = resolution * j;
              const yStart = Tool.map(Math.sin(angle), -1, 1, 0, rangeHeight);
              const xEnd = xStart + resolution;
              const yEnd = Tool.map(
                Math.sin(angle + angleGap),
                -1,
                1,
                0,
                rangeHeight
              );
              const vX = xEnd - xStart,
                vY = yEnd - yStart;
              angle = angle + angleGap;
              fields[i][j] = new Vector(vX, vY);
            }
          }
        }
        break;
      case "archimedean": // 阿基米德螺线-未完成
        {
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
              fields[i][j] = new Vector(1, 0); //每行有10列
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

  drawVector = ({ canvas, x, y, vector, scale = 1 }) => {
    const { resolution } = this;
    const { translate, rotate, line, triangle, resetTransform } = canvas;
    translate(x, y);
    rotate(vector.heading());
    let len = vector.mag() * scale;
    line({
      points: [
        [0, resolution / 2],
        [len, resolution / 2],
        // [5, 7], 三角形
        // [5, 13],
        // [15, 10],
      ],
      strokeStyle: "#fff",
      fillStyle: "#fff",
    });
    resetTransform();
  };
}

const flow = new FlowField(10);
flow.init("horizontal");
// flow.init("sin");
flow.display(canvasObj);
