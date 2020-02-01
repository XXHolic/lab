var page = {
  canvasEle:null,
  canvasContext:null,
  canvasWidth: 113,
  canvasHeight: 81,
  init: function() {
    this.createCanvas();
    this.pageEvent();
  },
  createCanvas: function() {
    var canvasObj = Util.CANVAS.createElement(this.canvasWidth,this.canvasHeight);
    this.canvasEle = canvasObj;
    // canvasObj.setAttribute('class','canvas-part');
    var context = this.canvasContext = canvasObj.getContext('2d');
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = './maze.png';
    img.onload = function() {
      context.drawImage(img,0,0,226,162);
    }

    // var circleParams = {
    //   context:context,x: 71, y: 79, radius:20, startAngle:0, endAngle:2 * Math.PI,fillStyle:'#2e1bdd',strokeStyle:'#2e1bdd'
    // };
    // Util.CANVAS.drawArc(circleParams);

    document.body.appendChild(canvasObj);
  },
  rollCircle: function() {
    var drawTimeOut = null;
    var context = this.canvasContext;
    var xCenterPos = 71;
    var xPos = 51;
    context.fillStyle = '#333';
    context.fillRect(xPos,59,41,20);
    var imgData = context.getImageData(xPos,59,41,20);
    console.info('imgData',imgData.data);
    var drawFrame = function() {
      xCenterPos +=1;
      xPos +=1;
      // context.clearRect(51,50,198,49);
      var circleParams = {
        context:context,x: xCenterPos, y: 79, radius:20, startAngle:0, endAngle:2 * Math.PI,fillStyle:'#2e1bdd',strokeStyle:'#2e1bdd'
      };
      Util.CANVAS.drawArc(circleParams);
      var isCollision = false;
      var imgData = context.getImageData(xPos,59,41,20);
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

    // drawFrame();

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
