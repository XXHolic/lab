const page = {
  canvasEle:null,
  canvasContext:null,
  canvasWidth: 300,
  canvasHeight: 150,
  drawDynamicTimeout:null,
  moveAttr:{x: 0, y: 0, radius:6, startAngle:0,endAngle: Math.PI*2,strokeStyle:"#333",fillStyle:"#333"},
  fixAttr:{points:[[150,50],[200,100],[100,100]],isClose:true,strokeStyle:"#0094ff",fillStyle:"#0094ff"},
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
  // 鼠标移动时动态绘制
  drawDynamic: function(event) {
    let that = this;
    that.drawDynamicTimeout && clearTimeout(that.drawDynamicTimeout);

    that.drawDynamicTimeout = setTimeout(function() {
      const {canvasContext:context,canvasWidth,canvasHeight,moveAttr,fixAttr} = that;
      const {xPos,yPos} = Util.getPointCoordinate(event,this.canvasEle,10);
      const moveParams = { context,...moveAttr,...{x: xPos, y: yPos} };
      let fixParams = { context,...fixAttr };
      const {points} = fixAttr;
      const isCollision = that.checkCollision({moveX:xPos,moveY:yPos,points:points});
      if (isCollision) {
        const colorStyle = {strokeStyle:"#ff9600",fillStyle:"#ff9600"}
        fixParams = {...fixParams,...colorStyle}
      }

      context.clearRect(0,0,canvasWidth,canvasHeight);
      Util.CANVAS.drawLine(fixParams);
      Util.CANVAS.drawArc(moveParams);
    }, 4);
  },
  calculateLen: function(point1,point2) {
    const [x1,y1] = point1;
    const [x2,y2] = point2;
    const distX = x1-x2;
    const distY = y1-y2;
    const len = Math.sqrt(distX*distX + distY*distY);
    return len;
  },
  // 碰撞检测
  checkCollision:function(params) {
    const {moveX,moveY,points} = params;
    const px = moveX, py = moveY;
    const [point1,point2,point3] = points;
    const [x1,y1] = point1;
    const [x2,y2] = point2;
    const [x3,y3] = point3;
    const areaOrig = Math.abs( (x2-x1)*(y3-y1) - (x3-x1)*(y2-y1) );
    const area1 = Math.abs( (x1-px)*(y2-py) - (x2-px)*(y1-py) );
    const area2 = Math.abs( (x2-px)*(y3-py) - (x3-px)*(y2-py) );
    const area3 = Math.abs( (x3-px)*(y1-py) - (x1-px)*(y3-py) );
    const areaTotal = area1 + area2 + area3;

    const buffer = 0.1;

    if (areaTotal >= areaOrig-buffer && areaTotal<= areaOrig+buffer) {
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
  Util.insertLink({title:'Collision Detection ：Line',linkIndex: 61, type: 'blog'});
  Util.loading.show();
  page.init();
  // try {
  // } catch (error) {
  //   alert('Page Error')
  // }

  Util.loading.hide();
}
