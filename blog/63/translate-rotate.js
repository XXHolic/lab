const page = {
  canvasEle:null,
  canvasContext:null,
  canvasWidth: 300,
  canvasHeight: 150,
  drawDynamicTimeout:null,
  angle:0,
  moveAttr:{points:[[-40,-40],[40,-40],[40,40],[-40,40]],isClose:true,strokeStyle:"#0094ff",fillStyle:"#0094ff"},
  fixAttr:{points:[[-30,-30],[30,-30],[30,30],[-30,30]],isClose:true,strokeStyle:"#333",fillStyle:"#333"},
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
    this.drawDynamic();
    document.body.appendChild(canvasObj);
  },
  /**
   * 获取点在实际画布中的位置坐标 αβ
   * 圆心坐标 O（0，0），假设点 A（x,y）顺时针旋转角度 β 后达到点 B(m,n)，下面来推导一下 B 点坐标
   * A 到圆心的距离： dist1 = |OA| = y/sin(α)=x/cos(α)
   * B 到圆心的距离： dist2 = |OB| = n/sin(α-β)=m/cos(α-β)
   * 只是旋转 所以 dist1 = dist2，建设旋转的半径为 r ：
   * r = y/sin(α)=x/cos(α)=n/sin(α-β)=m/cons(α-β)
   *
   * y/(sin(α)cos(β)+cos(α)sin(β)) = x/(cos(α)cos(β)-sin(α)sin(β))
   * x * (sin(α)cos(β)+cos(α)sin(β)) = y * (cos(α)cos(β)-sin(α)sin(β))
   * x *sin(α)cos(β) + x*cos(α)sin(β) = y*cos(α)cos(β) - y*sin(α)sin(β)
   * x *sin(α)cos(β) - y*cos(α)cos(β) = - y*sin(α)sin(β) - x*cos(α)sin(β)
   * cos(β) * (y*cos(α) - x *sin(α)) = sin(β) (y*sin(α) + x*cos(α))
   *
   *
   * 三角函数公式知：
   * sin(α+β)=sin(α)cos(β)+cos(α)sin(β)
   * sin(α-β)=sin(α)cos(β)-cos(α)sin(β)
   * cos(α+β)=cos(α)cos(β)-sin(α)sin(β)
   * cos(α-β)=cos(α)cos(β)+sin(α)sin(β)
   *
   * 可以得出：
   * m = r*cos(α-β) = r * cos(α)cos(β) + r * sin(α)sin(β) =  x * cos(β) + y * sin(β)
   * n = r*sin(α-β) = r * sin(α)cos(β) - r * cos(α)sin(β) =  y * cos(β) - x * sin(β)
   *
   * 逆时针则相反：
   * m =  x * cos(β) - y * sin(β)
   * n =  y * cos(β) + x * sin(β)
   *
   */
  getPosition: function(obj) {
    const {canvasContext:context} = this;
    const {points} = obj;
    const newPoints = points.map(ele => {
      let [x,y] = ele;
      return Util.CANVAS.getPosition(context,x,y);
    })
    return newPoints;
  },
  // 画布状态
  draw: function() {
    const {canvasContext:context,fixAttr,moveAttr} = this;
    this.angle += 1
    // this.angle = 45
    const calculateAngle = this.angle * Math.PI / 180
    Util.CANVAS.resetTransform(context)
    let fixParams = { context,...fixAttr };
    Util.CANVAS.translate(context,80,75);
    Util.CANVAS.rotate(context,calculateAngle);
    const fixNewPoints = this.getPosition(fixAttr);
    Util.CANVAS.drawLine(fixParams);

    Util.CANVAS.resetTransform(context)

    let moveParams = { context,...moveAttr };
    Util.CANVAS.translate(context,170,75);
    Util.CANVAS.rotate(context,calculateAngle);
    const moveNewPoints = this.getPosition(moveAttr);
    const isCollision = this.checkPolygonPolygon({movePoints:moveNewPoints,fixPoints:fixNewPoints})
    // console.info({fixNewPoints,moveNewPoints,isCollision})
      if (isCollision) {
        const colorStyle = {strokeStyle:"#ff9600",fillStyle:"#ff9600"}
        moveParams = {...moveParams,...colorStyle}
      }

    Util.CANVAS.drawLine(moveParams);
    Util.CANVAS.resetTransform(context)
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
