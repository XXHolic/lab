// 包裹东西的实体
class Entity {
  constructor(x=0,y=0,width=8,height=10) {
    const moneyType = ['￥','$','€','￡','₣'];
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isCollision = false;
    const randomIndex = Util.getRandom(0,4);
    this.text = moneyType[randomIndex]
    this.type = randomIndex
  }



  fallMax = 300

  addContent(type) {

  }

  draw(context,fallSpeed=1) {
    const {x, y, width, height,text} = this;
    if (y>=this.fallMax) {
      this.isCollision = true
    }
    if (this.isCollision) {
      return;
    }
    this.y = y + fallSpeed;
    // strokeStyle:"#ff9600"
    Util.CANVAS.drawRect({context,x, y:this.y, width, height});
    context.font = '12px Arial,"Helvetica Neue",Helvetica,"Microsoft Yahei",STHeiTi,sans-serif';
    context.fillStyle = '#333';
    context.textBaseline = 'top';
    context.fillText(text,x,this.y);
  }

  getAllPosition() {
    const {x, y, width, height} = this;
    const points = [[x,y],[x+width,y],[x+width,y+width],[x,y+height]];
    return points;
  }

}

const page = {
  canvasEle:null,
  canvasContext:null,
  operateCanvasEle:null,
  operateCanvasContext:null,
  imageCanvasEle:null,
  imageCanvasContext:null,
  canvasWidth: 600,
  canvasHeight: 300,
  drawDynamicTimeout:null,
  requestAnimationFrameMark:null,
  angle:0,
  isCollision:false,
  fallArr:[],
  speed:1,
  moveMin:20,
  moveMax:580,
  randomNum:[30,50,90],
  collisionData:[],
  moveAttr:{x: 22, y: 50, radius:20, startAngle:0,endAngle: Math.PI*2,strokeStyle:"#333",fillStyle:"#333"},
  fixAttr:{x:280,y:280,width:20,height:20,strokeStyle:"#ff9600",fillStyle:"#ff9600"},
  init: function() {
    this.createCanvas();
    this.createOperateCanvas();
    this.createImageCanvas();
    this.pageEvent();
  },
  // 创建画布
  createCanvas: function() {
    let {canvasWidth,canvasHeight} = this;
    let canvasObj = Util.CANVAS.createElement(canvasWidth,canvasHeight);
    this.canvasEle = canvasObj;
    canvasObj.setAttribute('class','canvas-part');
    canvasObj.setAttribute('id','canvasEle');
    this.canvasContext = canvasObj.getContext('2d');
    // this.drawInit();
    this.engineLoop();
    document.querySelector('.canvas-section').appendChild(canvasObj);
  },
  // 创建用于用户交互的画布
  createOperateCanvas: function() {
    let {canvasWidth,canvasHeight} = this;
    let canvasObj = Util.CANVAS.createElement(canvasWidth,canvasHeight);
    this.operateCanvasEle = canvasObj;
    canvasObj.setAttribute('class','canvas-operate-part');
    canvasObj.setAttribute('id','canvasOperateEle');
    this.operateCanvasContext = canvasObj.getContext('2d');
    this.drawOperate();
    document.querySelector('.canvas-section').appendChild(canvasObj);
  },
  // 创建头像的画布
  createImageCanvas: function() {
    let {canvasWidth,canvasHeight} = this;
    let canvasObj = Util.CANVAS.createElement(canvasWidth,canvasHeight);
    this.imageCanvasEle = canvasObj;
    canvasObj.setAttribute('class','canvas-image-part');
    canvasObj.setAttribute('id','canvasImageEle');
    this.imageCanvasContext = canvasObj.getContext('2d');
    // this.drawImage();
    document.querySelector('.canvas-section').appendChild(canvasObj);
  },
  // 画布初始状态
  drawOperate: function() {
    const loop = () => {
      const {operateCanvasContext:context,canvasWidth,canvasHeight,fixAttr,moveAttr} = this;
      let fixParams = { context,...fixAttr };
      context.clearRect(0,0,canvasWidth,canvasHeight);
      Util.CANVAS.drawRect(fixParams);
      if (true) {
        window.requestAnimationFrame(loop);
      }
    }

    try {
      window.requestAnimationFrame(loop);
    } catch (error) {
      console.info(error);
    }
  },
  drawImage: function() {
    const img = new Image();
    img.src = './face.png';
    const loop2 = () => {
      const {imageCanvasContext:context,canvasWidth,canvasHeight,fixAttr,moveAttr} = this;
      const {x,y} = moveAttr;
      context.clearRect(0,0,canvasWidth,canvasHeight)
      context.drawImage(img,x-22,y-22,44,44);
      if (true) {
        window.requestAnimationFrame(loop2);
      }
    }

    img.onload = function() {
      try {
        window.requestAnimationFrame(loop2);
      } catch (error) {
        console.info(error);
      }
    }


  },
  getRectCoordinate: function(obj) {
    const {x,y,width,height} = obj;
    const points = [[x,y],[x+width,y],[x+width,y+height],[x,y+height]]
    return points;
  },
  //显示结果
  showResult: function(event) {
    let {collisionData} = this;
    if (!collisionData.length) {
      return;
    }
    const result = collisionData.reduce((acc,cur)=>{
      const indexNum = cur.type;
      if (acc[indexNum]) {
        acc[indexNum] = acc[indexNum] + 1;
      } else {
        acc[indexNum] = 1;
      }
      return acc;
    },[]);

    // console.info(result);

    document.querySelector('#num0').innerHTML = result[0] || 0;
    document.querySelector('#num1').innerHTML = result[1] || 0;
    document.querySelector('#num2').innerHTML = result[2] || 0;
    document.querySelector('#num3').innerHTML = result[3] || 0;
    document.querySelector('#num4').innerHTML = result[4] || 0;
  },
  // 引擎
  engineLoop: function() {
    const that = this;


    const engine = function () {
      let {canvasContext:context,canvasWidth,canvasHeight,fixAttr,moveAttr,randomNum,moveMin,moveMax,fallArr,collisionData} = that;

      // let fixParams = { context,...fixAttr };
      let moveParams = { context,...moveAttr };

      const {x,y} = moveAttr;
      const fixPoints = that.getRectCoordinate(fixAttr);

      for (let index = 0,len = fallArr.length; index < len; index++) {
        const element = fallArr[index];
        const movePoints = element.getAllPosition();
        const checkCollisionParams = {movePoints,fixPoints};
        const isCollision = that.checkCollision(checkCollisionParams);
        if (isCollision) {
          element.isCollision = true;
          if (!element.isSaved) {
            collisionData.push(element)
          }
          element.isSaved = true;
        }
      }
      // console.info('isCollision',isCollision)
      if (x<=moveMin) {
        that.speed = 1;
      }
      if (x>=moveMax) {
        that.speed = -1;
      }
      if (x>=moveMin && x<=moveMax) {
        moveAttr.x = x + that.speed;
      }
      const randomIndex = Util.getRandom(0,2);
      if (!(moveAttr.x%randomNum[randomIndex])) {
        const newEntity = new Entity(moveAttr.x,moveAttr.y+20);
        fallArr.push(newEntity)
      }
      context.clearRect(0,0,canvasWidth,canvasHeight);
      Util.CANVAS.drawArc(moveParams);

      // Util.CANVAS.drawRect(fixParams);
      for (const ele of fallArr) {
        ele.draw(context);
      }
      fallArr = fallArr.filter(ele => (!ele.isCollision));
      that.showResult();
      // console.info('collisionData',collisionData)

      if (true) {
        that.requestAnimationFrameMark = window.requestAnimationFrame(engine);
      }

    }




      try {
        that.requestAnimationFrameMark = window.requestAnimationFrame(engine);
      } catch (error) {
        console.info(error);
      }




  },
  calculateLen: function(point1,point2) {
    const [x1,y1] = point1;
    const [x2,y2] = point2;
    const distX = x1-x2;
    const distY = y1-y2;
    const len = Math.sqrt(distX*distX + distY*distY);
    return len;
  },
  checkLineLine:function(params) {
    const {points} = params;
    const [p1,p2,p3,p4] = points;
    const [x1,y1] = p1;
    const [x2,y2] = p2;
    const [x3,y3] = p3;
    const [x4,y4] = p4;
    const t1 = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3))/((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    const t2 = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

    if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
      return true
    }
    return false;
  },
  // 碰撞检测
  checkPolygonLine:function(params) {
    const {linePoints,points} = params;
    const pointsLen = points.length;
    for (let index = 0; index < pointsLen; index++) {
      const currentPoint = points[index];
      const next = index === pointsLen-1 ? 0:index+1;
      const nextPoint = points[next];
      const collision = this.checkLineLine({points:[...linePoints,currentPoint,nextPoint]});
      if (collision) {
        return collision;
      }
    }

    return false;
  },
  // 碰撞检测
  checkCollision:function(params) {
    const {movePoints,fixPoints} = params;
    // const rx = moveX,ry=moveY;
    const pointsLen = fixPoints.length;
    for (let index = 0; index < pointsLen; index++) {
      const currentPoint = fixPoints[index];
      const next = index === pointsLen-1 ? 0:index+1;
      const nextPoint = fixPoints[next];
      const collision = this.checkPolygonLine({linePoints:[currentPoint,nextPoint],points:movePoints});
      if (collision) {
        return collision;
      }
    }

    return false;

  },
  // 匀速运动
  handleUniform:function(params) {
    const {canvasContext:context,fixAttr,moveAttr,isCollision} = this;
    const uniformInterval = () => {
      if (!this.isCollision) {
        window.requestAnimationFrame(uniformInterval);
      }
      // 直线方程 f(x) = 8/45 * x + 1720/9
      const moveX = moveAttr.x + 1;
      const moveY = moveX * (8/45) + 1720/9;
      moveAttr.x = moveX;
      moveAttr.y = moveY;
      this.engineLoop();
    };

    window.requestAnimationFrame(uniformInterval);

  },
  /**
   * 抛物线函数 f(x) = a x*x + bx + c
   * 曲率 a 可以设定为常数，这里尝试 a = 0.0001
   * 根据两点坐标就可以计算出系数 b 和 c
   * 目前测试数据计算出 b = 0.1825 c = 18.15
   */
  handleParabola:function() {
    //
    const angle = 45; //  抛射角度

    const {canvasContext:context,fixAttr,moveAttr,isCollision} = this;
    const uniformInterval = () => {
      if (!this.isCollision) {
        // window.requestAnimationFrame(uniformInterval);
      }
      const moveX = moveAttr.x + 0.1;
      const moveY = 0.0001 * moveX*moveX + moveX*0.1825 + 18.15;
      console.info({moveX,moveY})
      moveAttr.x = moveX;
      moveAttr.y = moveY;
      this.engineLoop();
    };

    uniformInterval();

    // window.requestAnimationFrame(uniformInterval);
  },
  // 页面事件
  pageEvent: function() {
    let that = this;
    let isPc = Util.getDeviceType() === "pc";
    let eventType = isPc ? 'onmousemove' : 'ontouchmove';
    this.canvasEle[eventType] = function(e) {
      // that.drawDynamic.bind(that)(e);
    }
    let leftInterval = null,rightInterval = null;
    document.querySelector('#left').onclick = function(e) {
      let {fixAttr} = that;
      rightInterval && clearInterval(rightInterval)
      leftInterval = setInterval(() => {
        if (fixAttr.x>0&&fixAttr.x<=580) {
          fixAttr.x = fixAttr.x - 1;
        }
      },10)

    }
    document.querySelector('#right').onclick = function(e) {
      let {fixAttr} = that;
      leftInterval && clearInterval(leftInterval)
      rightInterval = setInterval(() => {
        if (fixAttr.x>=0&&fixAttr.x<580) {
          fixAttr.x = fixAttr.x + 1;
        }
      },10)
    }
    document.querySelector('#pause').onclick = function(e) {
      leftInterval && clearInterval(leftInterval);
      rightInterval && clearInterval(rightInterval);

    }
    document.querySelector('#pauseMoney').onclick = function(e) {
      window.cancelAnimationFrame(that.requestAnimationFrameMark);
    }
    document.querySelector('#start').onclick = function(e) {
      that.engineLoop();
    }
  }
}


window.onload = function() {
  // Util.insertLink({title:'Collision Detection ： Transformation',linkIndex: 64, type: 'blog'});
  Util.loading.show();
  page.init();
  // try {
  // } catch (error) {
  //   alert('Page Error')
  // }

  Util.loading.hide();
}
