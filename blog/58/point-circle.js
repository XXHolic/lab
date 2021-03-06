const page = {
  canvasEle:null,
  canvasContext:null,
  canvasWidth: 300,
  canvasHeight: 150,
  drawDynamicTimeout:null,
  circleMoveAttr:{x: 0, y: 0, radius:6, startAngle:0,endAngle: Math.PI*2,strokeStyle:"#333",fillStyle:"#333"},
  circleFixAttr:{x: 150, y: 75, radius:20, startAngle:0,endAngle: Math.PI*2,strokeStyle:"#0094ff",fillStyle:"#0094ff"},
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
    const {canvasContext:context,circleFixAttr} = this;
    var circleFixParams = { context,...circleFixAttr };
    Util.CANVAS.drawArc(circleFixParams);
  },
  // 鼠标移动时动态绘制
  drawDynamic: function(event) {
    let that = this;
    that.drawDynamicTimeout && clearTimeout(that.drawDynamicTimeout);

    that.drawDynamicTimeout = setTimeout(function() {
      const {canvasContext:context,canvasWidth,canvasHeight,circleMoveAttr,circleFixAttr} = that;
      const {xPos,yPos} = Util.getPointCoordinate(event,this.canvasEle,10);
      const circleParams = { context,...circleMoveAttr,...{x: xPos, y: yPos} };
      let circleFixParams = { context,...circleFixAttr };
      const {x,y,radius} = circleFixAttr;
      const isCollision = that.checkCollision({moveX:xPos,moveY:yPos,targetX:x,targetY:y,radius});
      if (isCollision) {
        const colorStyle = {strokeStyle:"#ff9600",fillStyle:"#ff9600"}
        circleFixParams = {...circleFixParams,...colorStyle}
      }

      context.clearRect(0,0,canvasWidth,canvasHeight);
      Util.CANVAS.drawArc(circleFixParams);
      Util.CANVAS.drawArc(circleParams);
    }, 4);
  },
  // 碰撞检测
  checkCollision:function(params) {
    const {moveX,moveY,targetX,targetY,radius} = params;
    const minusX = targetX-moveX;
    const compareRadius = radius * radius;
    const minusY = targetY-moveY;
    const len = minusX*minusX+minusY*minusY;
    if (len<=compareRadius) {
      return true;
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
  Util.insertLink({title:'Collision Detection ：Point',linkIndex: 59, type: 'blog'});
  Util.loading.show();
  page.init();

  Util.loading.hide();
}
