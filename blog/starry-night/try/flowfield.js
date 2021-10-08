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
    this.init();
  }

  init = () => {
    let { rows, cols, fields } = this;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        fields[i][j] = new Vector(1, 0); //每行有10列
      }
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
        this.drawVector({ canvas, vector, x, y });
      }
    }
  };

  drawVector = ({ canvas, x, y, vector, scale = 8 }) => {
    const { translate, rotate, line, triangle, resetTransform } = canvas;
    translate(x, y);
    rotate(vector.heading());
    let len = vector.mag() * scale;
    triangle({
      points: [
        [5, 7],
        [5, 13],
        [15, 10],
      ],
      strokeStyle: "#900",
      fillStyle: "#900",
    });
    resetTransform();
  };
}

const flow = new FlowField(20);
flow.display(canvasObj);
