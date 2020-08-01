const page = {
  canvasEle:null,
  canvasContext:null,
  canvasWidth: 600,
  canvasHeight: 300,
  drawDynamicTimeout:null,
  angle:0,
  isPause:false,
  isCollision:false,
  initSpeed:5,
  isHit:false, // 鼠标是否命中圆
  originPoint:[100, 150],
  moveAttr:{x: 100, y: 150, radius:10, startAngle:0,endAngle: Math.PI*2,strokeStyle:"#333",fillStyle:"#333"},
  fixAttr:{points:[[-20,-20],[20,-20],[20,20],[-20,20]],isClose:true,strokeStyle:"#0094ff",fillStyle:"#0094ff"},
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
    this.drawInit();
    document.body.appendChild(canvasObj);
  },
  // 画布初始状态
  drawInit: function() {
    this.render();
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
    let inc = 0.4;
    // that.drawDynamicTimeout && clearTimeout(that.drawDynamicTimeout)
    const loop = () => {
      let {canvasContext:context,canvasWidth,canvasHeight,fixAttr} = that;
      moveAttr.x = moveAttr.x + inc;
      moveAttr.y = k*(moveAttr.x-x) + y
      let moveParams = { context,...moveAttr };
      let lineParams = {context,points:[[moveAttr.x,moveAttr.y],originPoint],strokeStyle:'#333'}
      context.clearRect(0,0,canvasWidth,canvasHeight);
      Util.CANVAS.drawArc(moveParams);
      Util.CANVAS.drawLine(lineParams);
      if (moveAttr.x<=x || k>0) {
        window.requestAnimationFrame(loop);
      } else {
        that.handleParabola()
      }
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
  handleParabola:function() {
    // const {canvasContext:context,fixAttr,originPoint,lineK,moveAttr,isCollision} = this;
    const {canvasContext:context,canvasEle,originPoint,moveAttr,lineK,initSpeed} = this;
    const [x,y] = originPoint;
    const k = lineK;
    //   计时
    let t = 0;
    // 水平方向的速度
    const cal1 = (initSpeed*initSpeed)/(k*k+1);
    const vx = Math.sqrt(cal1);
    const vy = Math.abs(vx * k);
    const g = 9.8;
    const acc = 0.01;

    const uniformInterval = () => {
      if (moveAttr.y<300-10 && moveAttr.x<600-10) {
        window.requestAnimationFrame(uniformInterval);
      }
      t = t + acc;
      moveAttr.x = moveAttr.x + vx*t;
      const h = vy*t-0.5*g*t*t
      moveAttr.y = moveAttr.y - h;
      let moveParams = { context,...moveAttr };
      Util.CANVAS.drawArc(moveParams);
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

    document.querySelector('#uniform').onclick = function(e) {
      that.handleUniform.bind(that)(e);
    }
    document.querySelector('#parabola').onclick = function(e) {
      that.handleParabola.bind(that)(e);
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
