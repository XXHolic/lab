
window.onload = function() {
  // insertLink({title:'h5 穿透滚动',linkIndex: 72})；

  var canvasEle = Util.CANVAS.createElement(248,415);
  canvasEle.setAttribute('class','bg-canvas');
  var canvasContext = canvasEle.getContext('2d');

  // var img = new Image();
  // img.crossOrigin = "Anonymous";
  // img.src = './poster.jpeg';
  // img.onload = function() {
  //   canvasEle.drawImage(img,0,0);
  // }

  // var img  = document.querySelector('#image');
  // canvasContext.drawImage(img,0,0,248,415);
  var rectProperty = {context:canvasContext,x:0, y:0, width:248, height:415,fillStyle:'rgba(0,0,0,0.5)'}
  Util.CANVAS.drawRect(rectProperty);

  canvasContext.globalCompositeOperation = "destination-out";
  var deviceType = Util.getDeviceType();
  // console.info('deviceType',deviceType);
  function getErasePercentage() {
    var imageData = canvasContext.getImageData(0,0,248,415);
    var colorDataArr = imageData.data;
    var colorDataArrLen = colorDataArr.length;
    var eraseArea = [];
    for(var i = 0; i < colorDataArrLen; i += 4) {
      // 严格上来说，判断像素点是否透明需要判断该像素点的a值是否等于0，
      if(colorDataArr[i + 3] < 64) {
        eraseArea.push(colorDataArr[i + 3]);
      }
    }
    var divResult = eraseArea.length / (colorDataArrLen/4);
    var pointIndex = String(divResult).indexOf('.');
    if (pointIndex>-1) {
      divResult = String(divResult).slice(0,pointIndex+5);
    }
    return (Number(divResult)*100).toFixed(2);

  }
  var isStartClear = false;
  if (deviceType === 'phone') {

  }
  if (deviceType === 'pc') {
    canvasEle.onmousedown = function (ev) {
      console.info('onmousedown');
      isStartClear = true;
    }
    canvasEle.onmouseup = function () {
      console.info('onmouseup');
      console.info('像素百分比：',getErasePercentage());
      isStartClear = false;
    }
    canvasEle.onmousemove = function (event) {
      event.stopPropagation();
      if (isStartClear == false) return;
      //清空像素,根据当前所在点
      var centerX = event.clientX - canvasEle.offsetLeft;
      var centerY = event.clientY - canvasEle.offsetTop;
      var radius = 8;
      canvasContext.beginPath();
      canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2);
      canvasContext.fill();
    }
  }

  document.body.appendChild(canvasEle);

  // var canvasEle2 = Util.CANVAS.createElement();
  // var canvasContext2 = canvasEle2.getContext('2d');
  // var centerX = 100;
  // var centerY = 50;
  // var radius = 10;
  // var startAngle = 0;
  // var endAngle = 2*Math.PI;
  // canvasContext2.beginPath()
  // canvasContext2.arc(centerX,centerY,radius,startAngle,endAngle);
  // canvasContext2.fillStyle = '#900';
  // canvasContext2.fill();
  // canvasContext2.closePath();
  // document.body.appendChild(canvasEle2);
}