var page = {
  canvasEle:null,
  canvasContext:null,
  canvasWidth: 300,
  canvasHeight: 150,
  isCollision:false,
  drawTimeOut:null,
  circle1Attr:{x: 60, y: 20, radius:10, startAngle:0,endAngle: Math.PI*2,dxGap:1,dyGap:1},
  circle2Attr:{x: 230, y: 25, radius:10, startAngle:0,endAngle: Math.PI*2,dxGap:1,dyGap:1},
  init: function() {
    this.createCanvas();
    this.pageEvent();
  },
  createCanvas: function() {
    var canvasWidth = this.canvasWidth;
    var canvasHeight = this.canvasHeight;
    var canvasObj = Util.CANVAS.createElement(canvasWidth,canvasHeight);
    this.canvasEle = canvasObj;
    canvasObj.setAttribute('class','canvas-part');
    this.canvasContext = canvasObj.getContext('2d');
    this.drawCircle();

    document.body.appendChild(canvasObj);
  },
  drawCircle: function() {
    var context = this.canvasContext;
    var circle1 = this.circle1Attr;
    var circle2 = this.circle2Attr;
    var circle1Params = {
      context:context,x: circle1.x, y: circle1.y, radius:circle1.radius, startAngle:circle1.startAngle,endAngle:circle1.endAngle,strokeStyle:"rgb(240, 59, 47)",fillStyle:"rgb(240, 59, 47)"
    };
    Util.CANVAS.drawArc(circle1Params);
    var circle2Params = {
      context:context,x: circle2.x, y: circle2.y, radius:circle2.radius, startAngle:circle2.startAngle,endAngle:circle2.endAngle,strokeStyle:"#333",fillStyle:"#333"
    };
    Util.CANVAS.drawArc(circle2Params);
  },
  imitate: function() {
    var circle1 = this.circle1Attr;
    var circle2 = this.circle2Attr;
    var canvasWidth = this.canvasWidth;
    var canvasHeight = this.canvasHeight;

    circle1.y +=circle1.dyGap;
    circle2.y +=circle2.dyGap;

    // 模拟重力加速度
    if (circle1.dyGap < canvasHeight) {
      circle1.dyGap +=0.22;
    }
    if (circle2.dyGap < canvasHeight) {
      circle2.dyGap +=0.22;
    }

    // 模拟空气摩擦
    circle1.dxGap = circle1.dxGap*0.99;
    circle2.dxGap = circle2.dxGap*0.99;

    // 反弹
    if (circle1.x + circle1.radius > canvasWidth || circle1.x-circle1.radius<0) {
      circle1.dxGap = 2;
    }
    if (circle2.x + circle2.radius > canvasWidth || circle2.x-circle2.radius<0) {
      circle2.dxGap = 2;
    }
    if (circle1.y + circle1.radius > canvasHeight || circle1.y-circle1.radius<0) {
      circle1.dyGap = -circle1.dyGap*0.96
    }
    if (circle2.y + circle2.radius > canvasHeight || circle2.y-circle2.radius<0) {
      circle2.dyGap = -circle2.dyGap*0.96
    }
  },
  start: function() {
    var that = this;
    var context = this.canvasContext;
    that.drawTimeOut && clearTimeout(that.drawTimeOut);
    var circle1 = this.circle1Attr;
    var circle2 = this.circle2Attr;
    var circleRadiusTotal = circle1.radius + circle2.radius;
    var canvasWidth = this.canvasWidth;
    var canvasHeight = this.canvasHeight;

    var drawFrame = function() {
      var dx = circle1.x - circle2.x;
      var dy = circle1.y - circle2.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      context.clearRect(0,0,canvasWidth,canvasHeight);
      if (distance <= circleRadiusTotal) {
        // collision detected!
        circle1.dxGap = -2;
        circle2.dxGap = -2;
      } else {
        circle1.x +=circle1.dxGap;
        circle2.x -=circle2.dxGap;
      }


      that.imitate();
      that.drawCircle();
      that.drawTimeOut = setTimeout(function() {
        drawFrame();
      }, 15);

    };

    drawFrame();

  },
  pageEvent: function() {
    var that = this;
    document.querySelector('#start').onclick = function() {
      that.start.bind(that)();
    };

  }
}


window.onload = function() {
  Util.loading.show();
  page.init();
  Util.loading.hide();
}
