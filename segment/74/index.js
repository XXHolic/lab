
window.onload = function() {
  // insertLink({title:'Canvas 图像灰度处理',linkIndex: 74});


  function init() {
    var canvasEle = Util.CANVAS.createElement(200,100);
    var context = canvasEle.getContext('2d');
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle='#333';
    const linkStartPointX = 30;
    const linkStartPointY = 30;
    context.moveTo(linkStartPointX,linkStartPointY);
    context.lineTo(linkStartPointX+20,linkStartPointY);
    context.lineTo(linkStartPointX-20.5,linkStartPointY+30);
    context.lineTo(linkStartPointX-20.5,linkStartPointY+60);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle='#333';
    const linkStartPointX2 = 60;
    const linkStartPointY2 = 30.5;
    context.moveTo(linkStartPointX2,linkStartPointY2);
    context.lineTo(linkStartPointX2+20.5,linkStartPointY2);
    context.lineTo(linkStartPointX2-20.5,linkStartPointY2+30);
    context.lineTo(linkStartPointX2-20.5,linkStartPointY2+60);
    context.stroke();
    context.closePath();

    document.querySelector('#container').appendChild(canvasEle);




  }

  init();
}