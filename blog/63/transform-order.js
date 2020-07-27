const page = {
  canvasEle:null,
  canvasContext:null,
  canvasWidth: 300,
  canvasHeight: 150,
  drawDynamicTimeout:null,
  angle:0,
  moveAttr:{points:[[-20,-20],[20,-20],[20,20],[-20,20]],isClose:true,strokeStyle:"#0094ff",fillStyle:"#0094ff"},
  fixAttr:{points:[[-20,-20],[20,-20],[20,20],[-20,20]],isClose:true,strokeStyle:"#333",fillStyle:"#333"},
  init: function() {
    this.createCanvas();
    // this.pageEvent();
  },
  // 创建画布
  createCanvas: function() {
    let {canvasWidth,canvasHeight} = this;
    let canvasObj = Util.CANVAS.createElement(canvasWidth,canvasHeight);
    this.canvasEle = canvasObj;
    canvasObj.setAttribute('class','canvas-part');
    canvasObj.setAttribute('id','canvasEle');
    this.canvasContext = canvasObj.getContext('2d');
    // this.drawDynamic();
    this.drawInit();
    document.body.appendChild(canvasObj);
  },
  // 画布状态
  drawInit: function() {
    const {canvasContext:context,fixAttr,moveAttr} = this;

    this.angle = 45;

    const calculateAngle = this.angle * Math.PI / 180
    let transformData = []

    Util.CANVAS.translate(context,100,75);
    Util.CANVAS.rotate(context,calculateAngle);
    const fixNewPoints = this.getPosition(fixAttr);
    console.info('translate-rotate',fixNewPoints);

    let fixParams = { context,...fixAttr };
    Util.CANVAS.drawLine(fixParams);

    Util.CANVAS.resetTransform(context)

    Util.CANVAS.rotate(context,calculateAngle);
    Util.CANVAS.translate(context,100,75);
    const moveNewPoints = this.getPosition(moveAttr);
    console.info('rotate-translate',moveNewPoints);
    let moveParams = { context,...moveAttr };
    Util.CANVAS.drawLine(moveParams);
    Util.CANVAS.resetTransform(context)
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
  calculateLen: function(point1,point2) {
    const [x1,y1] = point1;
    const [x2,y2] = point2;
    const distX = x1-x2;
    const distY = y1-y2;
    const len = Math.sqrt(distX*distX + distY*distY);
    return len;
  },
  checkLineLine:function(params) {
    const {points} = params;
    const [p1,p2,p3,p4] = points;
    const [x1,y1] = p1;
    const [x2,y2] = p2;
    const [x3,y3] = p3;
    const [x4,y4] = p4;
    const t1 = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3))/((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    const t2 = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

    if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
      return true
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
    const {movePoints,fixPoints} = params;
    // const rx = moveX,ry=moveY;
    const pointsLen = fixPoints.length;
    for (let index = 0; index < pointsLen; index++) {
      const currentPoint = fixPoints[index];
      const next = index === pointsLen-1 ? 0:index+1;
      const nextPoint = fixPoints[next];
      const collision = this.checkPolygonLine({linePoints:[currentPoint,nextPoint],points:movePoints});
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
  // Util.insertLink({title:'Collision Detection ：Line',linkIndex: 61, type: 'blog'});
  Util.loading.show();
  page.init();
  // try {
  // } catch (error) {
  //   alert('Page Error')
  // }

  Util.loading.hide();
}
