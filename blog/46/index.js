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

    this.canvasEventInit();
  },
  canvasEventInit: function() {

  }
}


window.onload = function() {
  Util.loading.show();
  // insertLink({title:'Canvas 橡皮擦效果',linkIndex: 75});
  page.init();
  Util.loading.hide();
}
