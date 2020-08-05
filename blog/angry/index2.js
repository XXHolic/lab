const page = {
  canvasEle:null,
  canvasContext:null,
  pathCanvasEle:null,
  pathCanvasContext:null,
  canvasWidth: 600,
  canvasHeight: 300,
  drawDynamicTimeout:null,
  angle:0,
  accelerate:0.5, // 模拟加速度
  isPause:false,
  isCollision:false,
  initSpeed:10,
  freshTime:0, // 刷新时间统一控制，这里单位是毫秒
  isHit:false, // 鼠标是否命中圆
  originPoint:[100, 240],
  moveAttr:{x: 100, y: 240, radius:10, startAngle:0,endAngle: Math.PI*2,strokeStyle:"#333",fillStyle:"#333"},
  fixAttr:{points:[[-20,-20],[20,-20],[20,20],[-20,20]],isClose:true,strokeStyle:"#0094ff",fillStyle:"#0094ff"},
  tipAttr:{x: 100, y: 240, radius:10,startAngle:0,endAngle: Math.PI*2,strokeStyle:"#333",fillStyle:"#333"},
  init: function() {
    this.createCanvas();
    this.createPathCanvas();

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
    this.drawInit();
    document.querySelector('.canvas-section').appendChild(canvasObj);
  },
  // 画布初始状态
  drawInit: function() {
    this.render();
    // this.testParabola();
  },
  // 创建显示路径的画布
  createPathCanvas: function() {
    let {canvasWidth,canvasHeight} = this;
    let canvasObj = Util.CANVAS.createElement(canvasWidth,canvasHeight);
    this.pathCanvasEle = canvasObj;
    canvasObj.setAttribute('class','canvas-path-part');
    canvasObj.setAttribute('id','canvasPathEle');
    this.pathCanvasContext = canvasObj.getContext('2d');
    this.drawPath(60,1);
    document.querySelector('.canvas-section').appendChild(canvasObj);
  },
  // 路径初始状态
  drawPath: function(speed,slope) {
    const that = this;
    const {pathCanvasContext:context,canvasWidth,canvasHeight,tipAttr,freshTime,originPoint} = this;
    const moveAttr = tipAttr;
    const [originX,originY] = originPoint;
    const initSpeed = speed;
    const k = slope;
    //   计时
    let t = 0;
    // 水平方向的速度
    const cal1 = (initSpeed*initSpeed)/(k*k+1);
    const vx = Math.sqrt(cal1);
    const vy = Math.abs(vx * k);

    const g = 9.8;
    const acc = 0.03;

    // 选取 10 个坐标
    let pathPoints = [];
    let calcPoints = {x:0,y:0};
    // const loopJudge = calcPoints.x < 400 && calcPoints.y<300;
    while (calcPoints.x < 400 && calcPoints.y<300) {
      t = t + acc;
      calcPoints.x = originX + vx*t;
      const h = vy*t-0.5*g*t*t;
      calcPoints.y = originY - h;
      const newPoints = [calcPoints.x,calcPoints.y];
      const pointIndex = pathPoints.length-1;
      const calculatePoint = pointIndex>-1? pathPoints[pointIndex]:originPoint;
      const dist = this.calculateLen(calculatePoint,newPoints);
      if (dist > (moveAttr.radius*2)) {
        pathPoints.push(newPoints)
      }
    }
    console.info('pathPoints',pathPoints)
    // const pointsNum = pathPoints.length;
    // const radiusDesc = tipAttr.radius/pointsNum;

    // console.info('pathPoints',pathPoints)
    // const firstEle = pathPoints[0];
    // const firstEle = pathPoints[0];

    // let index = 0;

    const uniformInterval = () => {
      // if (loopJudge) {
        // window.requestAnimationFrame(uniformInterval);
      // }


      // t = t + acc;
      // const moveX = originX + vx*t;
      // const h = vy*t-0.5*g*t*t;
      // const moveY = originY - h;
      // context.clearRect(0,0,canvasWidth,canvasHeight);
      // const newPoints = [moveX,moveY];
      // const pointIndex = pathPoints.length-1;
      // const calculatePoint = pointIndex>-1 ? pathPoints[pointIndex]:originPoint;
      // const dist = this.calculateLen(calculatePoint,newPoints);

      // const boundaryJudge = moveX < 400 && moveY<300;
      // if (dist > (moveAttr.radius*2) && boundaryJudge) {
      //   pathPoints.push(newPoints);

      // }

      const {x,y,radius,...others} = moveAttr;

      pathPoints.map(ele => {
        const [x,y] = ele;
        let moveParams = { context,x,y,radius:5,...others };
        Util.CANVAS.drawArc(moveParams);
      })

    };


    window.requestAnimationFrame(uniformInterval);
    // setInterval(() => uniformInterval(),500)
    // setInterval(() => uniformInterval(),1000)
  },
  testParabola:function() {
    // y = -0.1*x*x + x + 1.5
    // this.paintParabola(10,1);
    // this.paintParabola(10,0.5);
    // this.paintParabola(10,0.3);
    this.paintParabola(10,1);
    this.paintParabola(8,1);
    this.paintParabola(5,1);
  },
  // 渲染
  render: function() {
    const {canvasContext:context,canvasWidth,canvasHeight,fixAttr,moveAttr,isPause} = this;
    context.clearRect(0,0,canvasWidth,canvasHeight);
    let moveParams = { context,...moveAttr };
    Util.CANVAS.drawArc(moveParams);
  },
  calculateLen: function(point1,point2) {
    const [x1,y1] = point1;
    const [x2,y2] = point2;
    const distX = x1-x2;
    const distY = y1-y2;
    const len = Math.sqrt(distX*distX + distY*distY);
    return len;
  },
  // 检测点是否在直线上
  linePoint:function(params) {
    const {closestX,closestY,points} = params;
    const [point1,point2] = points;
    const buffer = 0.1;
    const movePoint = [closestX,closestY];
    const lineLen = this.calculateLen(point1,point2);
    const d1 = this.calculateLen(movePoint,point1);
    const d2 = this.calculateLen(movePoint,point2);

    if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
      return true;
    }
    return false;
  },
  getClosestPoint:function(params){
    const {moveX,moveY,points} = params;
    const [point1,point2] = points;
    const [x1,y1] = point1;
    const [x2,y2] = point2;
    const pointVectorX = x1 - x2;
    const pointVectorY = y1 - y2;
    const t = (pointVectorX*(moveX - x1) + pointVectorY*(moveY-y1))/(pointVectorX*pointVectorX+pointVectorY*pointVectorY);
    const closestX = x1 + t*pointVectorX;
    const closestY = y1 + t*pointVectorY;
    const isOnLine = this.linePoint({points,closestX,closestY});
    if(!isOnLine) {
      return false;
    }
    return [closestX,closestY];
  },
  // 直线与圆的碰撞
  checkLineCircle:function(params) {
    const {moveX,moveY,radius} = params;
    const movePoint = [moveX,moveY];
    const closestPoint = this.getClosestPoint(params);
    if (!closestPoint) {
      return false;
    }
    const distance = this.calculateLen(closestPoint,movePoint);

    if (distance<=radius) {
      return closestPoint;
    }
    return false;
  },
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
  checkPolygonPolygon:function(params) {
    const {moveX,moveY,radius,points} = params;
    // const px = moveX, py = moveY;
    const pointsLen = points.length;
    for (let index = 0; index < pointsLen; index++) {
      const currentPoint = points[index];
      const next = index === pointsLen-1 ? 0:index+1;
      const nextPoint = points[next];
      const [cx,cy] = currentPoint;
      const [nx,ny] = nextPoint;
      const checkParams = {moveX,moveY,radius,points:[[cx,cy],[nx,ny]]}
      const collision = this.checkLineCircle(checkParams);
      if (collision) {
        this.isCollision = true;
        return true;
      }
    }
    this.isCollision = false;
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
  // 鼠标移动
  handleMouseMove: function(event) {
    let that = this;
    that.drawDynamicTimeout && clearTimeout(that.drawDynamicTimeout)
    that.drawDynamicTimeout = setTimeout(function() {
      let {canvasContext:context,canvasEle,canvasWidth,canvasHeight,originPoint,moveAttr,fixAttr} = that;
      const points = Util.getPointCoordinate(event,canvasEle);
      const {xPos,yPos} = points;
      moveAttr.x = xPos;
      moveAttr.y = yPos;
      let moveParams = { context,...moveAttr };
      let lineParams = {context,points:[[xPos,yPos],originPoint],strokeStyle:'#333'}
      context.clearRect(0,0,canvasWidth,canvasHeight);
      Util.CANVAS.drawArc(moveParams);
      Util.CANVAS.drawLine(lineParams);
    }, 4);
  },
  // 鼠标松开
  handleMouseUp: function(event) {
    let that = this;
    const {canvasEle,originPoint,moveAttr} = this;
    const points = Util.getPointCoordinate(event,canvasEle);
    const [x,y] = originPoint;
    const {xPos,yPos} = points;
    if (xPos>x) {
      moveAttr.x = x;
      moveAttr.y = y;
      this.render();
      return;
    }
    moveAttr.x = xPos;
    moveAttr.y = yPos;

    const k = (y-yPos)/(x-xPos);
    console.info('k',k)
    this.lineK = k;
    //直线方程：y = k(x-m)+n
    let inc = 1;
    // 记录每次绘制开始时间和结束时间
    let startTime = 0;
    let endTime = 0

    const loop = () => {
      let {canvasContext:context,canvasWidth,canvasHeight,freshTime,fixAttr} = that;
      if (moveAttr.y>=300-10 || moveAttr.x>600-10) {
        return;
      }
      that.paintParabola(10,k)
      startTime = window.performance.now();
      // if (moveAttr.x<=x || k>0) {
        // window.requestAnimationFrame(loop);
      // } else {
      // }
      // const gapTime = startTime - endTime;
      // // 没有达到间隔时间要求，就不刷新屏幕
      // if ( gapTime < freshTime && endTime!==0) {
      //   return;
      // }
      moveAttr.x = moveAttr.x + inc;
      moveAttr.y = k*(moveAttr.x-x) + y
      let moveParams = { context,...moveAttr };
      // let lineParams = {context,points:[[moveAttr.x,moveAttr.y],originPoint],strokeStyle:'#333'}
      // context.clearRect(0,0,canvasWidth,canvasHeight);
      // Util.CANVAS.drawLine(lineParams);
      // Util.CANVAS.drawArc(moveParams);
      endTime = window.performance.now();
    };
    try {
      window.requestAnimationFrame(loop);
    } catch (error) {
      console.info(error);
    }
  },
    /**
   * 抛物线函数 f(x) = a x*x + bx + c
   *
   */
  paintParabola:function(speed,slope) {
    // const {canvasContext:context,fixAttr,originPoint,lineK,moveAttr,isCollision,initSpeed} = this;
    const {canvasContext:context,canvasEle,canvasWidth,canvasHeight,originPoint,moveAttr:originMoveAttr,freshTime} = this;
    // const [x,y] = originPoint;
    // const moveAttr = {...originMoveAttr};
    const moveAttr = originMoveAttr;
    const initSpeed = speed;
    const k = slope;
    //   计时
    let t = 0;
    // 水平方向的速度
    const cal1 = (initSpeed*initSpeed)/(k*k+1);
    const vx = Math.sqrt(cal1);
    const vy = Math.abs(vx * k);
    // const vx = 5;
    // const vy = 0;
    const g = 9.8;
    const acc = 0.01;

    // 记录每次绘制开始时间和结束时间
    let startTime = 0;
    let endTime = 0

    const uniformInterval = () => {
      // console.info('DOMHighResTimeStamp',DOMHighResTimeStamp)
      startTime = window.performance.now();
      if (moveAttr.y<300-10 && moveAttr.x<600-10) {
        window.requestAnimationFrame(uniformInterval);
      }
      // const gapTime = startTime - endTime;
      // // 没有达到间隔时间要求，就不刷新屏幕
      // if ( gapTime < freshTime && endTime!==0) {
      //   return;
      // }
      t = t + acc;
      moveAttr.x = moveAttr.x + vx*t;
      const h = vy*t-0.5*g*t*t
      moveAttr.y = moveAttr.y - h;
      let moveParams = { context,...moveAttr };
      context.clearRect(0,0,canvasWidth,canvasHeight);
      Util.CANVAS.drawArc(moveParams);
      endTime = window.performance.now();
    };


    window.requestAnimationFrame(uniformInterval);
  },
  // 页面事件
  pageEvent: function() {
    const {moveAttr} = this;
    let that = this;
    let isPc = Util.getDeviceType() === "pc";
    let eventType = isPc ? 'onmousemove' : 'ontouchmove';
    this.canvasEle[eventType] = function(e) {
      if (that.isHit) {
        that.handleMouseMove.bind(that)(e);
      }
    }
    this.canvasEle.onmousedown = function(e) {
      // that.drawDynamic.bind(that)(e);
      const points = Util.getPointCoordinate(e,that.canvasEle);
      const {xPos,yPos} = points;
      const dist = that.calculateLen([xPos,yPos],[moveAttr.x,moveAttr.y]);
      if (dist<moveAttr.radius) {
        that.isHit = true;
      }
    }
    this.canvasEle.onmouseup = function(e) {
      that.isHit = false;
      that.handleMouseUp.bind(that)(e);;
    }

    // document.querySelector('#uniform').onclick = function(e) {
    //   that.handleUniform.bind(that)(e);
    // }
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
