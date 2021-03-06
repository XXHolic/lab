var page = {
  canvasEle:null,
  canvasContext:null,
  canvasWidth: 248,
  canvasHeight: 415,
  init: function() {
    this.createCanvas();
  },
  createCanvas: function() {
    var canvasObj = Util.CANVAS.createElement(this.canvasWidth,this.canvasHeight);
    this.canvasEle = canvasObj;
    canvasObj.setAttribute('class','bg-canvas');
    this.canvasContext = canvasObj.getContext('2d');

    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = './poster.jpeg';
    img.onload = this.afterImageLoad.bind(this,img);

    this.canvasEventInit();
  },
  afterImageLoad: function(img) {
    var context = this.canvasContext;
    context.drawImage(img,0,0,this.canvasWidth,this.canvasHeight);
    Util.CANVAS.toGray(context,0,0,this.canvasWidth*2,this.canvasHeight*2);
    context.globalCompositeOperation = "destination-out";
    document.body.appendChild(this.canvasEle);
  },
  canvasEventInit: function() {
    var deviceType = Util.getDeviceType();
    var isStartClear = false; // 是否开始擦出，PC 上要按一下才算开始
    var isClearAll = false; // 是否全部以清除了
    var canvasEle = this.canvasEle;
    var canvasContext = this.canvasContext;

    var startEventFun = function() {
      console.info('erase start');
      isStartClear = true;
    }

    var endEventFun = function() {
      console.info('erase end');
      if (isClearAll) return;
      isStartClear = false;
    }

    var clearFun = function(event) {
      if (!isStartClear || isClearAll) return;
      //清空像素,根据当前所在点
      // console.info('event',event);
      // 模拟器中 判断是 phone，但返回的 event 没有 touches 属性，所以加了 event.touches 条件判断
      var clearPosX = deviceType === 'phone'&& event.touches ? event.touches[0].clientX:event.clientX;
      var clearPosY = deviceType === 'phone'&& event.touches ? event.touches[0].clientY:event.clientY;
      var centerX = clearPosX - canvasEle.offsetLeft;
      var centerY = clearPosY - canvasEle.offsetTop;
      var radius = 10;
      canvasContext.beginPath();
      canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2);
      canvasContext.fill();
      canvasContext.closePath();
    }


    if (deviceType === 'phone') {
      canvasEle.ontouchstart = startEventFun;
      canvasEle.ontouchend = endEventFun;
      canvasEle.ontouchmove = function(event) {
        clearFun(event);
      }
    }
    if (deviceType === 'pc') {
      canvasEle.onmousedown = startEventFun;
      canvasEle.onmouseup = endEventFun;
      canvasEle.onmousemove = function (event) {
        clearFun(event);
      }
    }
  },
}


window.onload = function() {
  Util.loading.show();
  insertLink({title:'Canvas 橡皮擦效果',linkIndex: 75});
  page.init();
  Util.loading.hide();
}
