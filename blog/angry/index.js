const page = {
  canvasEle:null,
  canvasContext:null,
  canvasWidth: 600,
  canvasHeight: 300,
  drawDynamicTimeout:null,
  angle:0,
  isCollision:false,
  moveAttr:{x: 30, y: 280, radius:20, startAngle:0,endAngle: Math.PI*2,strokeStyle:"#333",fillStyle:"#333"},
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
    const {canvasContext:context,fixAttr,moveAttr} = this;

    let fixParams = { context,...fixAttr };
    Util.CANVAS.translate(context,500,280);
    Util.CANVAS.drawLine(fixParams);
    Util.CANVAS.resetTransform(context)

    // const moveNewPoints = this.getPosition(moveAttr);
    // console.info('rotate-translate',moveNewPoints);
    let moveParams = { context,...moveAttr };
    Util.CANVAS.drawArc(moveParams);
  },
  getPosition: function(obj) {
    const {canvasContext:context} = this;
    const {points} = obj;
    const newPoints = points.map(ele => {
      let [x,y] = ele;
      return Util.CANVAS.getPosition(context,x,y);
    })
    return newPoints;
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
    const that = this;
    // const engine = function () {
      const {canvasContext:context,canvasWidth,canvasHeight,fixAttr,moveAttr} = that;

      let fixParams = { context,...fixAttr };


      context.clearRect(0,0,canvasWidth,canvasHeight);
      Util.CANVAS.translate(context,500,280);
      Util.CANVAS.drawLine(fixParams);
      const fixNewPoints = that.getPosition(fixAttr);
      Util.CANVAS.resetTransform(context);

      let moveParams = { context,...moveAttr };
      // console.info('fixNewPoints',fixNewPoints,moveAttr)
      // const moveNewPoints = that.getPosition(moveAttr);
      // const [x,y] = moveNewPoints;
      // const {points} = fixAttr;
      const {x,y,radius} = moveAttr;
      const checkCollisionParams = {moveX:x,moveY:y,radius:radius,points:fixNewPoints};
      that.checkPolygonPolygon(checkCollisionParams);
      // console.info('isCollision',isCollision)
      Util.CANVAS.drawArc(moveParams);

    // }

    // try {
    //   window.requestAnimationFrame(engine);
    // } catch (error) {
    //   console.info(error);
    // }


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
      const moveX = moveAttr.x + 1;
      moveAttr.x = moveX;
      this.engineLoop();
    };

    window.requestAnimationFrame(uniformInterval);


  },
  // 页面事件
  pageEvent: function() {
    let that = this;
    let isPc = Util.getDeviceType() === "pc";
    let eventType = isPc ? 'onmousemove' : 'ontouchmove';
    this.canvasEle[eventType] = function(e) {
      // that.drawDynamic.bind(that)(e);
    }

    document.querySelector('#uniform').onclick = function(e) {
      that.handleUniform.bind(that)(e);
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
