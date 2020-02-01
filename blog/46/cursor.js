var page = {
  canvasEle:null,
  canvasContext:null,
  canvasWidth: 300,
  canvasHeight: 150,
  shapeArr:[{type:'rect',x: 50, y: 50, width:80, height:60,strokeStyle:'#333'},{type:'circle',x: 130, y: 100, radius:40, startAngle:0, endAngle:2 * Math.PI,strokeStyle:'#333',fillStyle:'rgba(0,0,0,.5)'}],
  init: function() {
    this.createCanvas();
  },
  createCanvas: function() {
    var canvasObj = Util.CANVAS.createElement(this.canvasWidth,this.canvasHeight);
    this.canvasEle = canvasObj;
    canvasObj.setAttribute('class','canvas-part');
    var context = this.canvasContext = canvasObj.getContext('2d');
    var shapeArr = this.shapeArr;
    var shapeNum = shapeArr.length;
    for (var index = 0; index < shapeNum; index++) {
      var element = shapeArr[index];
      if (element.type === 'rect') {
        var rectParams = {
          context:context,x: element.x, y: element.y, width:element.width, height:element.height,strokeStyle:element.strokeStyle
        };
        Util.CANVAS.drawRect(rectParams);
      }
      if (element.type === 'circle') {
        var circleParams = {
          context:context,x: element.x, y: element.y, radius:element.radius, startAngle:element.startAngle, endAngle:element.endAngle,strokeStyle:element.strokeStyle,fillStyle:element.fillStyle
        };
        Util.CANVAS.drawArc(circleParams);
      }

    }


    document.body.appendChild(canvasObj);


    this.canvasEventInit();
  },
  canvasEventInit: function() {
    var shapeArr = this.shapeArr;
    var shapeNum = shapeArr.length;
    var canvasEle = this.canvasEle;
    var deviceType = Util.getDeviceType();
    var resultEle = document.querySelector('#result');

    this.canvasEle.onclick = function(event) {
      // 点击的坐标点
      var clickPosX = (deviceType === 'phone'?event.touches[0].clientX:event.clientX)-canvasEle.offsetLeft;
      var clickPosY = (deviceType === 'phone'?event.touches[0].clientY:event.clientY)-canvasEle.offsetTop;

      for(var i = shapeNum-1;i>=0;i-- ) {
        var element = shapeArr[i];
        if (element.type === 'rect') {
          // 计算顶点的坐标
          var leftTopXPos = element.x;
          var leftTopYPos = element.y;
          var rightBottomXPos = element.x + element.width;
          var rightBottomYPos = element.y + element.height;
          var isInXPos = clickPosX >= leftTopXPos && clickPosX<= rightBottomXPos;
          var isInYPos = clickPosY >= leftTopYPos && clickPosY<= rightBottomYPos;
          if (isInXPos && isInYPos) {
            resultEle.innerHTML = '点击了方形';
            break;
          }
        }

        if (element.type === 'circle') {
          var distanceFromCenter = Math.sqrt(Math.pow(clickPosX-element.x,2),Math.pow(clickPosY-element.y,2));
          if (distanceFromCenter <=element.radius) {
            resultEle.innerHTML = '点击了圆形';
            break;
          }
        }
        resultEle.innerHTML = '没有点中形状';
      }
    }
  }
}


window.onload = function() {
  Util.loading.show();
  page.init();
  Util.loading.hide();
}
