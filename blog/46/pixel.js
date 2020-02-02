var page = {
  canvasEle:null,
  canvasContext:null,
  canvasWidth: 300,
  canvasHeight: 150,
  circleCenterXPos: 61,
  circleCenterYPos: 42,
  xClearPos:52,
  yClearPos:33,
  xGetImageDataPos: 53,
  yGetImageDataPos: 34,
  getImageDataBaseWidth: 16,
  isCollision:false,
  drawTimeOut:null,
  init: function() {
    this.createCanvas();
    this.pageEvent();
  },
  createCanvas: function() {
    var canvasWidth = this.canvasWidth;
    var canvasHeight = this.canvasHeight;
    var canvasObj = Util.CANVAS.createElement(canvasWidth,canvasHeight);
    this.canvasEle = canvasObj;
    // canvasObj.setAttribute('class','canvas-part');
    var context = this.canvasContext = canvasObj.getContext('2d');
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = './pixel.png';
    img.onload = function() {
      context.drawImage(img,0,0,canvasWidth,canvasHeight);
      var circleParams = {
        context:context,x: 61, y: 42, radius: 8, startAngle:0, endAngle:2 * Math.PI,fillStyle:'#2e1bdd',strokeStyle:'#2e1bdd'
      };
      Util.CANVAS.drawArc(circleParams);

      // context.fillStyle = '#333';
      // context.fillRect(53,34,16,16);
      // var imgData = context.getImageData(45*2,30*2,10*2,2*2);
      // var imgData = context.getImageData(45*2,30*2,10*2,2);
      // console.info('imgData',imgData.data);
      document.querySelector('#canvasContainer').appendChild(canvasObj);
    }

  },
  rollCircle: function(type) {
    var that = this;
    var context = this.canvasContext;
    that.drawTimeOut && clearTimeout(that.drawTimeOut);
    const isUp = type === 'up';
    const isRight = type === 'right';
    const isLeft = type === 'left';
    const isDown = type === 'down';

    var drawFrame = function() {
      var imageDataWidth = that.getImageDataBaseWidth;
      var imageXPos = that.xGetImageDataPos;
      var imageYPos = that.yGetImageDataPos;
      if (isRight) {
        imageXPos +=3;
      }
      if (isLeft) {
        imageXPos -=2;
      }
      if (isUp) {
        imageYPos -=2;
      }
      if (isDown) {
        imageYPos +=3;
      }

      var imgData = context.getImageData(imageXPos*2,imageYPos*2,imageDataWidth*2,imageDataWidth*2);
      var pixels = imgData.data;
      for (var index = 0, len = pixels.length; index < len; index+=4) {
        var red = pixels[index];
        var green = pixels[index+1];
        var blue = pixels[index+2];
        var alpha = pixels[index+3];
        if (red === 0 && green === 0 && blue ===0 && alpha!==0) {
          that.isCollision = true;
          break;
        }

      }
      if (that.isCollision) {
        that.isCollision = false;
        clearTimeout(that.drawTimeOut);
      } else {
        context.clearRect(that.xClearPos,that.yClearPos,18,18); // 使用这个方法后，像素数据会清除，透明度也是0，要判断这个
        if (isRight) {
          that.circleCenterXPos +=1;
          that.xClearPos +=1;
          that.xGetImageDataPos +=1;
        }
        if (isLeft) {
          that.circleCenterXPos -=1;
          that.xClearPos -=1;
          that.xGetImageDataPos -=1;
        }
        if (isUp) {
          that.circleCenterYPos -=1;
          that.yClearPos -=1;
          that.yGetImageDataPos -=1;
        }
        if (isDown) {
          that.circleCenterYPos +=1;
          that.yClearPos +=1;
          that.yGetImageDataPos +=1;
        }

        var circleParams = {
          context:context,x: that.circleCenterXPos, y: that.circleCenterYPos, radius:8, startAngle:0, endAngle:2 * Math.PI,fillStyle:'#2e1bdd',strokeStyle:'#2e1bdd'
        };
        Util.CANVAS.drawArc(circleParams);
        that.drawTimeOut = setTimeout(function() {
          drawFrame();
        }, 10);
      }

    };

    drawFrame();

  },
  pageEvent: function() {
    var that = this;
    document.querySelector('.arrow-right').onclick = function() {
      that.rollCircle.bind(that)('right');
    };
    document.querySelector('.arrow-up').onclick = function() {
      that.rollCircle.bind(that)('up');
    };
    document.querySelector('.arrow-down').onclick = function() {
      that.rollCircle.bind(that)('down');
    };
    document.querySelector('.arrow-left').onclick = function() {
      that.rollCircle.bind(that)('left');
    };
  }
}


window.onload = function() {
  Util.loading.show();
  page.init();
  Util.loading.hide();
}
