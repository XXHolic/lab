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
    // 单元格矢量，weight 权重，绘制最大权重的一个
    this.defaultVector = {
      type: "horizontal",
      v: new Vector(r / 2, 0),
      weight: 1,
    };

    for (let i = 0; i < this.rows; i++) {
      arr[i] = new Array(this.cols);
      for (let j = 0; j < this.cols; j++) {
        // 考虑重叠的情况，弄个数组，重叠的时候，需要增加权重，看那个权重打就用那个向量
        arr[i][j] = [];
      }
    }
    this.fields = arr;
    // this.init();
  }

  // 初始化类型
  init = (type = "horizontal") => {
    let { rows, cols, fields, resolution, defaultVector } = this;
    switch (type) {
      case "horizontal": // 水平流场
        {
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
              fields[i][j] = [defaultVector]; //每行有10列
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
      case "sin": // 有限区域的正弦流场
        {
          /**
           * 1 先确定想要的一条曲线基准，获取这一条曲线的左右坐标
           * 2 然后使用平移的特性，只需要 y 坐标上下加减值，得到一个区间
           * 3 最后再次用第 1 步的方式计算得到流场的向量，但 y 的值要在第 2 步中获取的区间里面
           * 注意第 1 步和第 3 步曲线的振幅/间隔/周期要一致
           */
          // 获取想要的曲线单个坐标点集合
          let basePoints = [];
          const amplitude = height / 3; // 振幅
          const angleVel = (2 * Math.PI) / cols; // 每次角度的递增
          let angle = 0;
          for (let x = 0; x <= width; x += resolution) {
            let y = Tool.map(Math.sin(angle), -1, 1, 0, amplitude);
            basePoints.push([x, y]);
            angle += angleVel;
          }
          // 获取 Y 区间范围坐标，注意这里是单个坐标点，但流程是以单元格为基本单位，要匹配
          const yStartOff = 50,
            yEndOff = 150; // 决定的范围
          const rangeY = basePoints.map((ele, index) => {
            const [x, y] = ele;
            const nexEle = basePoints[index + 1];
            if (!nexEle) {
              return "";
            }
            const [xN, yN] = nexEle;
            const yStart1 = y + yStartOff,
              yEnd1 = y + yEndOff;
            const yNStart1 = yN + yStartOff,
              yNEnd1 = yN + yEndOff;
            const arr = [yStart1, yEnd1, yNStart1, yNEnd1];
            const min = Math.min(...arr),
              max = Math.max(...arr);
            return [min, max];
          });
          // 初始化目标区间
          for (let i = 0; i < rows; i++) {
            let angle = 0; // 角度的递增跟 x 轴映射
            const cellStartY = i * resolution;
            const cellEndY = (i + 1) * resolution;
            for (let j = 0; j < cols; j++) {
              const targetCell = fields[i][j];
              if (!targetCell) {
                console.info("error", i, j);
              }
              // 判断是否在区间
              const [startY, endY] = rangeY[j];
              const isValidCell =
                (cellStartY > startY && cellStartY < endY) ||
                (cellEndY > startY && cellEndY < endY);
              if (!isValidCell) {
                angle = angle + angleVel;
                targetCell.push(defaultVector); // 默认水平方向
                continue;
              }
              // 取宽跨度的开始和结束两个点的坐标，然后相减得到方向向量
              const xStart = resolution * j;
              const yStart = Tool.map(Math.sin(angle), -1, 1, 0, height);
              const xEnd = xStart + resolution;
              const endAngle = angle + angleVel;
              angle = endAngle;
              const yEnd = Tool.map(Math.sin(endAngle), -1, 1, 0, height);
              const vX = xEnd - xStart,
                vY = yEnd - yStart;
              targetCell.push({
                v: new Vector(vX, vY),
                type: "sin",
                weight: 2,
              });
            }
          }
        }
        break;
    }

    console.info("fields", fields);
  };

  // 找到目标在流程中所处的位置
  lookup = (lookup) => {
    const { resolution, cols, rows, fields } = this;
    let column = Math.floor(Tool.constrain(lookup.x / resolution, 0, cols - 1));
    let row = Math.floor(Tool.constrain(lookup.y / resolution, 0, rows - 1));
    // console.info()
    const cell = fields[row][column];
    const last = cell[cell.length - 1];
    //println(lookup.x);
    return last.v.copy();
  };

  display = (canvas) => {
    let { rows, cols, fields, resolution } = this;
    // const { translate, rotate, line, triangle, resetTransform } = canvas;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = fields[i][j];
        const x = resolution * j; // x 轴坐标对应列的计算
        const y = resolution * i; // y 轴坐标对应行的计算
        cell.length && this.drawVector({ canvas, cell, x, y });
      }
    }
  };

  drawVector = ({ canvas, x, y, cell, scale = 1 }) => {
    const { resolution } = this;
    const { translate, rotate, line, triangle, resetTransform } = canvas;
    // 暂定为最最后一个为有效的矢量绘制
    const validData = cell[cell.length - 1];
    const vector = validData.v;
    translate(x, y);
    rotate(vector.heading());
    let len = vector.mag() * scale;
    line({
      points: [
        [0, 0],
        [len, 0],
      ],
      strokeStyle: "#fff",
      fillStyle: "#fff",
    });
    resetTransform();
  };
}

const flow = new FlowField(10);
// flow.init();
flow.init("sin");
flow.display(canvasObj);

// 粒子太少，可根本无法按曲线运动，也跟曲线边界的判定/加速度有联系
const move1 = new Mover(
  // Tool.random(width),
  // Tool.random(height),
  80,
  180,
  Tool.random(2, 5),
  Tool.random(1, 5)
);
let loop = 1;
function draw() {
  if (loop > 500) {
    console.info("stop");
    return;
  }
  loop++;
  move1.follow(flow);
  move1.run(canvasObj);
  requestAnimationFrame(draw);
}

draw();


