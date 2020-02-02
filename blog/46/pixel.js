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
        context:context,x: 7, y: 8, radius: 4, startAngle:0, endAngle:2 * Math.PI,fillStyle:'#2e1bdd',strokeStyle:'#2e1bdd'
      };
      Util.CANVAS.drawArc(circleParams);
      document.body.appendChild(canvasObj);
    }

  },
  rollCircle: function() {
    var drawTimeOut = null;
    var context = this.canvasContext;
    var xCenterPos = 7;
    var xPos = 3;
    // context.fillStyle = '#333';
    // context.fillRect(120,2,20,2);
    // var imgData = context.getImageData(120,2,20,2);
    // console.info('imgData',imgData.data);
    var drawFrame = function() {
      // context.clearRect(xPos,3,10,8);
      xCenterPos +=1;
      xPos +=1;
      var circleParams = {
        context:context,x: xCenterPos, y: 8, radius:4, startAngle:0, endAngle:2 * Math.PI,fillStyle:'#2e1bdd',strokeStyle:'#2e1bdd'
      };
      Util.CANVAS.drawArc(circleParams);
      var isCollision = false;
      var imgData = context.getImageData(xPos,3,10,8);
      var pixels = imgData.data;
      console.info('pixels',pixels);
      for (var index = 0, len = pixels.length; index < len; index+=4) {
        var red = pixels[index];
        var green = pixels[index+1];
        var blue = pixels[index+2];
        if (red === 0 && green === 0 && blue ===0) {
          isCollision = true;
          break;
        }

        if (red === 64 && green === 64 && blue === 64) {
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
    document.querySelector('#btn').onclick = function() {
      that.rollCircle.bind(that)();
    };
  }
}


window.onload = function() {
  Util.loading.show();
  page.init();
  Util.loading.hide();
}
