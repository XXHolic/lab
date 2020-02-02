var page = {
  canvasEle:null,
  canvasContext:null,
  canvasWidth: 300,
  canvasHeight: 150,
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
      // context.fillRect(45,30,10,2);
      // var imgData = context.getImageData(45*2,30*2,10*2,2*2);
      // var imgData = context.getImageData(45*2,30*2,10*2,2);
      // console.info('imgData',imgData.data);
      document.body.appendChild(canvasObj);
    }

  },
  rollCircle: function() {
    var drawTimeOut = null;
    var context = this.canvasContext;
    var xCenterPos = 61;
    var xClearPos = 52;


    var drawFrame = function() {
      context.clearRect(xClearPos,33,18,18); // 使用这个方法后，像素数据会清除，透明度也是0，后面要判断这个
      xCenterPos +=1;
      xClearPos +=1;
      var circleParams = {
        context:context,x: xCenterPos, y: 42, radius:8, startAngle:0, endAngle:2 * Math.PI,fillStyle:'#2e1bdd',strokeStyle:'#2e1bdd'
      };
      Util.CANVAS.drawArc(circleParams);
      var isCollision = false;
      var imgData = context.getImageData(xClearPos*2,66,19*2,19*2);
      var pixels = imgData.data;
      for (var index = 0, len = pixels.length; index < len; index+=4) {
        var red = pixels[index];
        var green = pixels[index+1];
        var blue = pixels[index+2];
        var alpha = pixels[index+3];
        if (red === 0 && green === 0 && blue ===0 && alpha!==0) {
          isCollision = true;
          break;
        }

      }
      console.info('isCollision',isCollision);
      if (isCollision) {
        clearTimeout(drawTimeOut);
      } else {
        drawTimeOut = setTimeout(function() {
          drawFrame();
        }, 10);
      }

    };

    drawFrame();

  },
  pageEvent: function() {
    var that = this;
    document.querySelector('.arrow-right').onclick = function() {
      that.rollCircle.bind(that)();
    };
  }
}


window.onload = function() {
  Util.loading.show();
  page.init();
  Util.loading.hide();
}
