const page = {
  canvasEle:null,
  canvasContext:null,
  canvasWidth: 300,
  canvasHeight: 150,
  interSectionPoints:[],
  drawDynamicTimeout:null,
  moveAttr:{x: 0, y: 0, width:20, height:20,strokeStyle:"#333",fillStyle:"#333"},
  interSectionAttr:{x: 0, y: 0, radius:6, startAngle:0,endAngle: Math.PI*2,strokeStyle:"#f13939",fillStyle:"#f13939"},
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
    const {canvasContext:context,fixAttr,moveAttr} = this;
    var fixParams = { context,...fixAttr };
    var moveAttrParams = { context,...moveAttr };
    Util.CANVAS.drawLine(fixParams);
    Util.CANVAS.drawRect(moveAttrParams);
  },
  // 鼠标移动时动态绘制
  drawDynamic: function(event) {
    let that = this;
    that.drawDynamicTimeout && clearTimeout(that.drawDynamicTimeout);

    that.drawDynamicTimeout = setTimeout(function() {
      const {canvasContext:context,canvasWidth,canvasHeight,moveAttr,fixAttr} = that;
      const {xPos,yPos} = Util.getPointCoordinate(event,this.canvasEle);
      const moveParams = { context,...moveAttr,...{x: xPos, y: yPos} };
      let fixParams = { context,...fixAttr };
      const {points} = fixAttr;
      const checkCollisionParams = {moveX:xPos,moveY:yPos,rw:moveAttr.width,rh:moveAttr.height,points};
      const collisionResult = that.checkCollision(checkCollisionParams);
      context.clearRect(0,0,canvasWidth,canvasHeight);
      if (collisionResult) {
        const colorStyle = {strokeStyle:"#ff9600",fillStyle:"#ff9600"}
        fixParams = {...fixParams,...colorStyle}
      }

      Util.CANVAS.drawLine(fixParams);
      Util.CANVAS.drawRect(moveParams);
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
  /**
   *
   * P1 P2 直线 1 上的两个点
   * A1 代表直线 1 的向量
   * t1 直线 1 的系数
   *
   * P3 P4 直线 2 上的两个点
   * A2 代表直线 2 的向量
   * t2 直线 2 的系数
   *
   * Pa = P1 + t1*A1
   * Pb = P3 + t2*A2
   * 相交时，Pa = Pb
   * x1 + t1*(x2-x1) = x3 + t2*(x4-x3)
   * y1 + t1*(y2-y1) =y3 + t2*(y4-y3)
   * 二元一次方程
   * t1 = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3))/((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1))
   * t2 = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1))
   *
   */
  getInterSectionPoint:function(params) {
    const {points} = params;
    const [p1,p2,p3,p4] = points;
    const [x1,y1] = p1;
    const [x2,y2] = p2;
    const [x3,y3] = p3;
    const [x4,y4] = p4;
    const t1 = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3))/((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    const t2 = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

    if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
      return {point:{x:t1*x2,y:t1*y2}}
    }
    return false;
  },
  // 直线与矩形碰撞检测
  checkLineRectangle:function(params) {
    const {points,rx,ry,rw,rh} = params;
    const [linePoint1,linePoint2] = points;
    const left = this.getInterSectionPoint({points:[linePoint1,linePoint2,[rx,ry],[rx,ry+rh]]});
    const top = this.getInterSectionPoint({points:[linePoint1,linePoint2,[rx,ry],[rx+rw,ry]]});
    const right = this.getInterSectionPoint({points:[linePoint1,linePoint2,[rx+rw,ry],[rx+rw,ry+rh]]});
    const bottom = this.getInterSectionPoint({points:[linePoint1,linePoint2,[rx,ry+rh],[rx+rw,ry+rh]]});

    if (left || right || top || bottom) {
      return true;
    }
    return false;
  },
  // 碰撞检测
  checkCollision:function(params) {
    const {moveX,moveY,rw,rh,points} = params;
    const rx = moveX,ry=moveY;
    const pointsLen = points.length;
    for (let index = 0; index < pointsLen; index++) {
      const currentPoint = points[index];
      const next = index === pointsLen-1 ? 0:index+1;
      const nextPoint = points[next];
      const collision = this.checkLineRectangle({points:[currentPoint,nextPoint],rx,ry,rw,rh});
      if (collision) {
        return collision;
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