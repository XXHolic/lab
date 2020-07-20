const page = {
  canvasEle:null,
  canvasContext:null,
  canvasWidth: 300,
  canvasHeight: 150,
  drawDynamicTimeout:null,
  moveAttr:{points:[[0,0],[20,20]],lineWidth:10,lineCap:'round',strokeStyle:"rgba(51,51,51,.5)",fillStyle:"rgba(51,51,51,.5)"},
  interSectionAttr:{x: 0, y: 0, radius:6, startAngle:0,endAngle: Math.PI*2,strokeStyle:"#f13939",fillStyle:"#f13939"},
  fixAttr:{points:[[110,90],[190,50]],lineWidth:10,lineCap:'round',strokeStyle:"rgba(0,148,255,.5)",fillStyle:"rgba(0,148,255,.5)"},
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
    Util.CANVAS.drawLine(moveAttrParams);
  },
  // 鼠标移动时动态绘制
  drawDynamic: function(event,isPc) {
    let that = this;
    that.drawDynamicTimeout && clearTimeout(that.drawDynamicTimeout);

    that.drawDynamicTimeout = setTimeout(function() {
      const {canvasContext:context,canvasWidth,canvasHeight,moveAttr,fixAttr,interSectionAttr} = that;
      const point = isPc ? event:event.touches[0];
      const {offsetLeft,offsetTop} = this.canvasEle
      // 手指移动时，为了在移动端方便查看，偏移了一些像素。
      const touchPosX = parseInt(point.pageX - offsetLeft);
      const touchPosY = parseInt(point.pageY - offsetTop);
      const xPos = isPc ? point.layerX:touchPosX;
      const yPos = isPc ? point.layerY:touchPosY;
      const moveParams = { context,...moveAttr,...{points:[[0,0],[xPos,yPos]]} };
      let fixParams = { context,...fixAttr };
      const {points} = fixAttr;
      const checkCollisionParams = {moveX:xPos,moveY:yPos,radius:moveAttr.radius,points:points};
      const collisionResult = that.checkCollision(checkCollisionParams);
      context.clearRect(0,0,canvasWidth,canvasHeight);
      if (collisionResult) {
        const colorStyle = {strokeStyle:"rgba(255,155,0,.5)",fillStyle:"rgba(255,155,0,.5)"}
        fixParams = {...fixParams,...colorStyle}
        const {x,y} = collisionResult.point;
        const interSectionParams = {context,...interSectionAttr,...{x,y}};
        Util.CANVAS.drawArc(interSectionParams);
      }

      Util.CANVAS.drawLine(fixParams);
      Util.CANVAS.drawLine(moveParams);
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
    const {moveX,moveY,points} = params;
    const x1 = 0,y1=0,x2=moveX,y2=moveY;
    const [p3,p4] = points;
    const [x3,y3] = p3;
    const [x4,y4] = p4;
    const t1 = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3))/((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    const t2 = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

    if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
      return {point:{x:t1*moveX,y:t1*moveY}}
    }
    return false;
  },
  // 碰撞检测
  checkCollision:function(params) {
    const {moveX,moveY,points} = params;
    const x1 = 0,y1=0,x2=moveX,y2=moveY;
    const [p3,p4] = points;
    const [x3,y3] = p3;
    const [x4,y4] = p4;
    const t1 = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3))/((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    const t2 = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

    if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
      return {point:{x:t1*moveX,y:t1*moveY}}
    }
    return false;
  },
  // 页面事件
  pageEvent: function() {
    let that = this;
    let isPc = Util.getDeviceType() === "pc";
    let eventType = isPc ? 'onmousemove' : 'ontouchmove';
    this.canvasEle[eventType] = function(e) {
      that.drawDynamic.bind(that)(e,isPc);
    }
  }
}


window.onload = function() {
  // Util.insertLink({title:'Collision Detection ：Rectangle',linkIndex: 60, type: 'blog'});
  Util.loading.show();
  page.init();
  // try {
  // } catch (error) {
  //   alert('Page Error')
  // }

  Util.loading.hide();
}