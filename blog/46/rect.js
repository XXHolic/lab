var page = {
  canvasEle:null,
  canvasContext:null,
  canvasWidth: 300,
  canvasHeight: 150,
  isCollision:false,
  drawTimeOut:null,
  rect1Attr:{x: 20, y: 70, width:30, height:30},
  rect2Attr:{x: 230, y: 50, width:50, height:50},
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
    this.drawRect();

    document.body.appendChild(canvasObj);
  },
  drawRect: function() {
    var context = this.canvasContext;
    var rect1 = this.rect1Attr;
    var rect2 = this.rect2Attr;
    var rect1Params = {
      context:context,x: rect1.x, y: rect1.y, width:rect1.width, height:rect1.height,strokeStyle:'#333'
    };
    Util.CANVAS.drawRect(rect1Params);
    var rect2Params = {
      context:context,x: rect2.x, y: rect2.y, width:rect2.width, height:rect2.height,strokeStyle:'#333'
    };
    Util.CANVAS.drawRect(rect2Params);
  },
  start: function() {
    var that = this;
    var context = this.canvasContext;
    that.drawTimeOut && clearTimeout(that.drawTimeOut);
    var rect1 = this.rect1Attr;
    var rect2 = this.rect2Attr;
    var canvasWidth = this.canvasWidth;
    var canvasHeight = this.canvasHeight;
    var addRate = 1;
    var minRate = 6;

    var rebound = function() {
      rect1.x -=minRate;
      rect2.x +=minRate;
      minRate -=1 ;
      if (minRate>0) {
        context.clearRect(0,0,canvasWidth,canvasHeight);
        that.drawRect();
        that.drawTimeOut = setTimeout(function() {
          rebound();
        }, 50)
      } else {
        clearTimeout(that.drawTimeOut);
      }

    };

    var drawFrame = function() {
      if (rect1.x <= rect2.x + rect2.width &&
        rect1.x + rect1.width >= rect2.x &&
        rect1.y <= rect2.y + rect2.height &&
        rect1.height + rect1.y >= rect2.y) {
        // collision detected!
        that.isCollision = false;
        clearTimeout(that.drawTimeOut);
        rebound();
      } else {
        context.clearRect(0,0,canvasWidth,canvasHeight);
        rect1.x +=addRate;
        rect2.x -=addRate;
        addRate +=1 ;
        that.drawRect();
        that.drawTimeOut = setTimeout(function() {
          drawFrame();
        }, 10);
      }

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
