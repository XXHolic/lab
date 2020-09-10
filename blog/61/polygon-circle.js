const page = {
  canvasEle:null,
  canvasContext:null,
  canvasWidth: 300,
  canvasHeight: 150,
  drawDynamicTimeout:null,
  moveAttr:{x: 0, y: 0, radius:14, startAngle:0,endAngle: Math.PI*2,strokeStyle:"#333",fillStyle:"#333"},
  moveProjectAttr:{x: 0, y: 0, radius:6, startAngle:0,endAngle: Math.PI*2,strokeStyle:"#f13939",fillStyle:"#f13939"},
  fixAttr:{points:[[130,40],[180,40],[150,70],[180,100],[130,100],[100,70]],isClose:true,strokeStyle:"#0094ff",fillStyle:"#0094ff"},
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
  // 画布中初始状态
  drawInit: function() {
    const {canvasContext:context,fixAttr} = this;
    var fixParams = { context,...fixAttr };
    Util.CANVAS.drawLine(fixParams);
  },
  // 绘制投影的最近的点
  drawProjects: function({points}) {
    const {canvasContext:context,moveProjectAttr} = this;
    const pointsLen = points.length;
    for (let index = 0; index < pointsLen; index++) {
      const closestPoint = points[index];
      const [x,y] = closestPoint;
      const moveProjectParams = {context,...moveProjectAttr,...{x,y}}
      Util.CANVAS.drawArc(moveProjectParams);
    }
  },
  // 鼠标移动时动态绘制
  drawDynamic: function(event) {
    let that = this;
    that.drawDynamicTimeout && clearTimeout(that.drawDynamicTimeout);

    that.drawDynamicTimeout = setTimeout(function() {
      const {canvasContext:context,canvasWidth,canvasHeight,moveAttr,fixAttr,moveProjectAttr} = that;
      const {xPos,yPos} = Util.getPointCoordinate(event,this.canvasEle,10);
      const moveParams = { context,...moveAttr,...{x: xPos, y: yPos} };
      let fixParams = { context,...fixAttr };
      const {points} = fixAttr;
      const checkCollisionParams = {moveX:xPos,moveY:yPos,radius:moveAttr.radius,points:points};
      const isCollision = that.checkCollision(checkCollisionParams);
      if (isCollision) {
        const colorStyle = {strokeStyle:"rgba(255,155,0,.5)",fillStyle:"rgba(255,155,0,.5)"}
        fixParams = {...fixParams,...colorStyle}
      }
      const closestPoints = that.getAllClosestPoints(checkCollisionParams);
      context.clearRect(0,0,canvasWidth,canvasHeight);
      if (closestPoints.length) {
        that.drawProjects({points:closestPoints});
      }
      Util.CANVAS.drawLine(fixParams);
      Util.CANVAS.drawArc(moveParams);
    }, 4);
  },
  // 根据勾股定理计算实际长度
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
  // 使用点积，计算线上离圆心最近的点坐标
  getClosestPoint:function(params){
    const {moveX,moveY,points} = params;
    const [point1,point2] = points;
    const [x1,y1] = point1;
    const [x2,y2] = point2;
    const pointVectorX = x1 - x2;
    const pointVectorY = y1 - y2;
    const len = pointVectorX*pointVectorX + pointVectorY*pointVectorY;
    const dot = ((moveX-x1)*(x2-x1) + (moveY-y1)*(y2-y1))/len;
    const closestX = x1 + dot*(x2-x1);
    const closestY = y1 + dot*(y2-y1);
    const isOnLine = this.linePoint({points,closestX,closestY});
    if(!isOnLine) {
      return false;
    }
    return [closestX,closestY];
  },
  /**
   * 使用另外一种跟简单的点积计算方式，计算线上离圆心最近的点坐标
   * a 代表线的向量
   * t 系数
   * p1 直线上任意一点
   * p0 非直线上的一点
   * pt 直线上离 p0 最近的一点
   *
   * pt = p1 + t*a
   * (a.x,a.y)*(pt.x-p0.x,pt.y-p0.y) = 0 // 垂直的向量，点积为 0
   * (a.x,a.y)*( (p1+t*a).x-p0.x,(p1+t*a).y-p0.y) = 0 // 带入 pt
   * a.x *(p1.x + t*a.x - p0.x) + a.y *(p1.y + t*a.y - p0.y)  = 0
   * a.x*p1.x + a.x*t*a.x - a.x*p0.x + a.y*p1.y + a.y*t*a.y - a.y*p0.y = 0
   * t*(a.x*a.x + a.y*a.y) + a.x*p1.x - a.x*p0.x + a.y*p1.y- a.y*p0.y=0
   * t*(a.x*a.x + a.y*a.y) = a.x*(p0.x-p1.x)+a.y*(p0.y-p1.y)
   */
  getClosestPoint2:function(params){
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
  getAllClosestPoints:function(params){
    const {moveX,moveY,points} = params;
    const pointsLen = points.length;
    let allClosestPoints = [];
    for (let index = 0; index < pointsLen; index++) {
      const point1 = points[index];
      const next = index === pointsLen-1 ? 0:index+1;
      const point2 = points[next];

      const [x1,y1] = point1;
      const [x2,y2] = point2;
      const pointVectorX = x1 - x2;
      const pointVectorY = y1 - y2;
      const t = (pointVectorX*(moveX - x1) + pointVectorY*(moveY-y1))/(pointVectorX*pointVectorX+pointVectorY*pointVectorY);
      const closestX = x1 + t*pointVectorX;
      const closestY = y1 + t*pointVectorY;
      const isOnLine = this.linePoint({points:[point1,point2],closestX,closestY});
      if(isOnLine) {
        allClosestPoints.push([closestX,closestY])
      }
    }

    return allClosestPoints;

  },
  // 直线与圆的碰撞
  checkLineCircle:function(params) {
    const {moveX,moveY,radius} = params;
    const movePoint = [moveX,moveY];
    // const closestPoint = this.getClosestPoint(params);
    const closestPoint = this.getClosestPoint2(params);
    if (!closestPoint) {
      return false;
    }
    const distance = this.calculateLen(closestPoint,movePoint);

    if (distance<=radius) {
      return closestPoint;
    }
    return false;
  },
  // 碰撞检测
  checkCollision:function(params) {
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
        return true;
      }
    }

    return false;
  },
  // 页面事件
  pageEvent: function() {
    let that = this;
    let isPc = Util.getDeviceType() === "pc";
    let eventType = isPc ? 'onmousemove' : 'ontouchmove';
    this.canvasEle[eventType] = function(e) {
      that.drawDynamic.bind(that)(e);
    }
  }
}


window.onload = function() {
  Util.insertLink({title:'Collision Detection ：Polygon',linkIndex: 62, type: 'blog'});
  Util.loading.show();
  page.init();
  // try {
  // } catch (error) {
  //   alert('Page Error')
  // }

  Util.loading.hide();
}