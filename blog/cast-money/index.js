// 包裹东西的实体
class Entity {
  constructor(x=0,y=0,height=10,width=10) {
    const moneyType = ['￥','$','€','￡','₣'];
    this.x = x;
    this.y = y;
    this.width = height;
    this.height = width;
    this.isCollision = false;
    const randomIndex = Util.getRandom(0,4);
    this.text = moneyType[randomIndex]
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
    context.font = '12px Arial,"Helvetica Neue",Helvetica,"Microsoft Yahei",STHeiTi,sans-serif';
    context.fillStyle = '#333';
    context.fillText(text,x,this.y);
    Util.CANVAS.drawRect({context,x, y:this.y, width, height,strokeStyle:"#ff9600"});
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
  canvasWidth: 600,
  canvasHeight: 300,
  drawDynamicTimeout:null,
  angle:0,
  isCollision:false,
  moveAttr:{x: 22, y: 50, radius:20, startAngle:0,endAngle: Math.PI*2,strokeStyle:"#333",fillStyle:"#333"},
  fixAttr:{x:280,y:280,width:20,height:20,strokeStyle:"#ff9600",fillStyle:"#ff9600"},
  init: function() {
    this.createCanvas();
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
    document.body.appendChild(canvasObj);
  },
  // 画布初始状态
  drawInit: function() {
    const {canvasContext:context,fixAttr,moveAttr} = this;

    let fixParams = { context,...fixAttr };
    // Util.CANVAS.translate(context,500,280);
    // Util.CANVAS.drawLine(fixParams);
    // Util.CANVAS.resetTransform(context);


    // const moveNewPoints = this.getPosition(moveAttr);
    // console.info('rotate-translate',moveNewPoints);
    let moveParams = { context,...moveAttr };
    Util.CANVAS.drawArc(moveParams);
  },
  getRectCoordinate: function(obj) {
    const {x,y,width,height} = obj;
    const points = [[x,y],[x+width,y],[x+width,y+height],[x,y+height]]
    return points;
  },
  //动态绘制
  drawDynamic: function(event) {
    let that = this;

    that.drawDynamicTimeout = setInterval(function() {
      const {canvasContext:context,canvasWidth,canvasHeight,moveAttr,fixAttr} = that;
      context.clearRect(0,0,canvasWidth,canvasHeight);
      that.draw(context);
    }, 10);
  },
  // 引擎
  engineLoop: function() {
    const moveMin = 20,moveMax=580;
    const fallMin = 70,fallMax = 300;
    // const newEntity = new Entity();
    // console.info({newEntity})
    let speed = 1;
    let fallArr = [];
    const that = this;
    const engine = function () {
      const {canvasContext:context,canvasWidth,canvasHeight,fixAttr,moveAttr} = that;

      let fixParams = { context,...fixAttr };
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
        }
      }
      // console.info('isCollision',isCollision)
      if (x<=moveMin) {
        speed = 1;
      }
      if (x>=moveMax) {
        speed = -1;
      }
      if (x>=moveMin && x<=moveMax) {
        moveAttr.x = x + speed;
      }

      if (!(moveAttr.x%40)) {
        const newEntity = new Entity(moveAttr.x,moveAttr.y+20);
        fallArr.push(newEntity)
      }
      context.clearRect(0,0,canvasWidth,canvasHeight);
      Util.CANVAS.drawArc(moveParams);
      Util.CANVAS.drawRect(fixParams);
      for (const ele of fallArr) {
        ele.draw(context);
      }
      fallArr = fallArr.filter(ele => (!ele.isCollision));
      if (true) {
        window.requestAnimationFrame(engine);
      }

    }

    try {
      window.requestAnimationFrame(engine);
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

    document.querySelector('#left').onclick = function(e) {
      let {fixAttr} = that;
      fixAttr.x = fixAttr.x - 2;
    }
    document.querySelector('#right').onclick = function(e) {
      let {fixAttr} = that;
      fixAttr.x = fixAttr.x + 2;
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
