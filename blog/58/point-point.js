var page = {
  canvasEle:null,
  canvasContext:null,
  canvasWidth: 300,
  canvasHeight: 150,
  drawDynamicTimeout:null,
  circleMoveAttr:{x: 0, y: 0, radius:6, startAngle:0,endAngle: Math.PI*2,strokeStyle:"rgb(240, 59, 47)",fillStyle:"rgb(240, 59, 47)"},
  circleFixAttr:{x: 150, y: 75, radius:6, startAngle:0,endAngle: Math.PI*2,strokeStyle:"#0094ff",fillStyle:"#0094ff"},
  init: function() {
    this.createCanvas();
    this.pageEvent();
  },
  // 创建画布
  createCanvas: function() {
    let {canvasWidth,canvasHeight} = this;
    var canvasObj = Util.CANVAS.createElement(canvasWidth,canvasHeight);
    this.canvasEle = canvasObj;
    canvasObj.setAttribute('class','canvas-part');
    canvasObj.setAttribute('id','canvasEle');
    this.canvasContext = canvasObj.getContext('2d');
    this.drawInit();
    document.body.appendChild(canvasObj);
  },
  // 画布中初始状态
  drawInit: function() {
    const {canvasContext:context,circleFixAttr} = this;
    var circleFixParams = { context,...circleFixAttr };
    Util.CANVAS.drawArc(circleFixParams);
  },
  drawDynamic: function(event,isPc) {
    var that = this;
    that.drawDynamicTimeout && clearTimeout(that.drawDynamicTimeout);

    that.drawDynamicTimeout = setTimeout(function() {
      const {canvasContext:context,canvasWidth,canvasHeight,circleMoveAttr,circleFixAttr} = that;
      const point = isPc ? event:event.touches[0];
      const {offsetLeft,offsetTop} = this.canvasEle
      // 手指移动时，为了在移动端方便查看，偏移了一些像素。
      const touchPosX = parseInt(point.pageX - offsetLeft-5);
      const touchPosY = parseInt(point.pageY - offsetTop-5);
      var xPos = isPc ? point.layerX:touchPosX;
      var yPos = isPc ? point.layerY:touchPosY;
      var circleParams = { context,...circleMoveAttr,...{x: xPos, y: yPos} };
      var circleFixParams = { context,...circleFixAttr };
      const {x,y} = circleFixAttr;
      var isCollision = that.checkCollision({moveX:xPos,moveY:yPos,targetX:x,targetY:y});
      if (isCollision) {
        that.canvasEle.setAttribute('class','canvas-collision')
      } else {
        that.canvasEle.setAttribute('class','canvas-part')
      }

      context.clearRect(0,0,canvasWidth,canvasHeight);
      Util.CANVAS.drawArc(circleFixParams);
      Util.CANVAS.drawArc(circleParams);
    }, 4);
  },
  // 碰撞检测
  checkCollision:function(params) {
    const {moveX,moveY,targetX,targetY} = params;
    if (moveX == targetX && moveY == targetY) {
      return true;
    }
    return false;
  },
  // 页面事件
  pageEvent: function() {
    var that = this;
    var isPc = Util.getDeviceType() === "pc";
    var eventType = isPc ? 'onmousemove' : 'ontouchmove';
    this.canvasEle[eventType] = function(e) {
      that.drawDynamic.bind(that)(e,isPc);
    }
  }
}


window.onload = function() {
  Util.loading.show();
  page.init();
  Util.loading.hide();
}
