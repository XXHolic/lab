const page = {
  canvasEle:null,
  canvasContext:null,
  canvasWidth: 300,
  canvasHeight: 150,
  drawDynamicTimeout:null,
  moveAttr:{x: 0, y: 0, radius:10, startAngle:0,endAngle: Math.PI*2,strokeStyle:"#333",fillStyle:"#333"},
  fixAttr:{x: 120, y: 45, width:60, height:60,strokeStyle:"#0094ff",fillStyle:"#0094ff"},
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
    Util.CANVAS.drawRect(fixParams);
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
      const {x,y,width,height} = fixAttr;
      const isCollision = that.checkCollision({moveX:xPos,moveY:yPos,radius:moveAttr.radius,rX:x,rY:y,rW:width,rH:height});
      if (isCollision) {
        const colorStyle = {strokeStyle:"#ff9600",fillStyle:"#ff9600"}
        fixParams = {...fixParams,...colorStyle}
      }

      context.clearRect(0,0,canvasWidth,canvasHeight);
      Util.CANVAS.drawRect(fixParams);
      Util.CANVAS.drawArc(moveParams);
    }, 4);
  },
  // 碰撞检测
  checkCollision:function(params) {
    const {moveX,moveY,radius,rX,rY,rW,rH} = params;
    const rEndX = rX+rW;
    const rEndY = rY+rH;
    let nearestX=moveX, nearestY=moveY;
    if (moveX<rX) {
      nearestX = rX
    } else if(moveX>rEndX) {
      nearestX = rEndX
    }

    if (moveY<rY) {
      nearestY = rY
    } else if(moveY>rEndY) {
      nearestY = rEndY
    }
    const distX = nearestX-moveX;
    const distY = nearestY-moveY;
    const distance = distX*distX + distY*distY;
    if (distance<=radius*radius) {
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
  Util.insertLink({title:'Collision Detection ：Rectangle',linkIndex: 60, type: 'blog'});
  Util.loading.show();
  page.init();

  Util.loading.hide();
}
