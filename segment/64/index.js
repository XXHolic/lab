
window.onload = function() {
  // insertLink({title:'h5 穿透滚动',linkIndex: 72})；

  var canvasEle = Util.CANVAS.createElement(248,415);
  canvasEle.setAttribute('class','bg-canvas');
  var canvasContext = canvasEle.getContext('2d');


  var img  = document.querySelector('#image');
  canvasContext.drawImage(img,0,0,248,415);
    var imageData = canvasContext.getImageData(0,0,248,415);
    var colorDataArr = imageData.data;
    var colorDataArrLen = colorDataArr.length;
    for(var i = 0; i < colorDataArrLen; i ++) {
      // 大于 128 置为 1，反之置为0
      if (i%4) {
        if(colorDataArr[i] < 128) {
          colorDataArr[i] = 0;
        } else {
          colorDataArr[i] = 1;
        }
      }

    }
    canvasContext.putImageData(imageData,0,0,248,415);


  document.body.appendChild(canvasEle);

  // document.querySelector('#clear').onclick = function() {


  // }
}