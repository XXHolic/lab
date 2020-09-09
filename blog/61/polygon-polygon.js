const page = {
  canvasEle:null,
  canvasContext:null,
  canvasWidth: 300,
  canvasHeight: 150,
  interSectionPoints:[],
  drawDynamicTimeout:null,
  moveAttr:{points:[],isClose:true,strokeStyle:"#333",fillStyle:"#333"},
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
    this.randomPolygon();
    var fixParams = { context,...fixAttr };
    var moveAttrParams = { context,...moveAttr };
    Util.CANVAS.drawLine(fixParams);
    Util.CANVAS.drawLine(moveAttrParams);
  },
  // 生成随机多边形
  randomPolygon:function() {
    // const pointNum = 6;
    const allPoints = [];

    let a = 0;
    let i = 0;
    while (a < 180) {
      const x = Math.cos(a) * Util.getRandom(10,30);
      const y = Math.sin(a) * Util.getRandom(10,30);
      allPoints[i] = [x,y];
      a += Util.getRandom(30, 40);
      i += 1;
    }
    // console.info(allPoints);
    this.moveAttr.points = allPoints;
  },
  // 随机多边形跟随鼠标
  updateRandomPolygon: function({mousePoint}) {
    const [mx,my] = mousePoint;
    const {moveAttr} = this;
    const {points} = moveAttr;
    const firstPoint = points[0];
    const [x,y] = firstPoint;
    const diffX = mx - x;
    const diffY = my - y;
    const formatPoints = points.map(ele => {
      const [x,y] = ele;
      return [x+diffX,y+diffY]
    });
    this.moveAttr.points = formatPoints;
  },
  // 鼠标移动时动态绘制
  drawDynamic: function(event) {
    let that = this;
    that.drawDynamicTimeout && clearTimeout(that.drawDynamicTimeout);

    that.drawDynamicTimeout = setTimeout(function() {
      const {canvasContext:context,canvasWidth,canvasHeight,moveAttr,fixAttr} = that;
      const {xPos,yPos} = Util.getPointCoordinate(event,that.canvasEle);
      that.updateRandomPolygon({mousePoint:[xPos,yPos]});
      const moveParams = { context,...moveAttr,...{x: xPos, y: yPos} };
      let fixParams = { context,...fixAttr };
      const {points} = fixAttr;
      const checkCollisionParams = {movePoints:moveAttr.points,fixPoints:points};
      const collisionResult = that.checkCollision(checkCollisionParams);
      context.clearRect(0,0,canvasWidth,canvasHeight);
      if (collisionResult) {
        const colorStyle = {strokeStyle:"#ff9600",fillStyle:"#ff9600"}
        fixParams = {...fixParams,...colorStyle}
      }

      Util.CANVAS.drawLine(fixParams);
      Util.CANVAS.drawLine(moveParams);
    }, 4);
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
  // 碰撞检测
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
  checkCollision:function(params) {
    const {movePoints,fixPoints} = params;
    // const rx = moveX,ry=moveY;
    const pointsLen = fixPoints.length;
    for (let index = 0; index < pointsLen; index++) {
      const currentPoint = fixPoints[index];
      const next = index === pointsLen-1 ? 0:index+1;
      const nextPoint = fixPoints[next];
      const collision = this.checkPolygonLine({linePoints:[currentPoint,nextPoint],points:movePoints});
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
  // Util.insertLink({title:'Collision Detection ：Polygon',linkIndex: 62, type: 'blog'});
  Util.loading.show();
  page.init();
  // try {
  // } catch (error) {
  //   alert('Page Error')
  // }

  Util.loading.hide();
}