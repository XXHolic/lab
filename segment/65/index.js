
window.onload = function() {
  insertLink({title:'Canvas 图像灰度处理',linkIndex: 74});



  document.querySelector('#transform').onclick = function() {
    var canvasEle = Util.CANVAS.createElement(248,415);
    var canvasContext = canvasEle.getContext('2d');
    var img  = document.querySelector('#image');
    canvasContext.drawImage(img,0,0,248,415);
    Util.CANVAS.toGray(canvasContext,0,0,248*2,415*2)
    document.querySelector('#transformContainer').appendChild(canvasEle);
  }
}