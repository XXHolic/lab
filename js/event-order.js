var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
var bodyEle = document.getElementById('body');
var clickButtonEle = document.getElementById('clickButton');

if (deviceIsAndroid) {
  Util.Event.addHandler(bodyEle,'mouseover', onMouse, true);
  Util.Event.addHandler(bodyEle,'mousedown', onMouse, true);
  Util.Event.addHandler(bodyEle,'mouseup', onMouse, true);
}

Util.Event.addHandler(bodyEle,'click',onClick,true);
Util.Event.addHandler(bodyEle,'touchstart',onTouchStart,false);
Util.Event.addHandler(bodyEle,'touchmove',onTouchMove,false);
Util.Event.addHandler(bodyEle,'touchend',onTouchEnd,false);
Util.Event.addHandler(bodyEle,'touchcancel',onTouchCancel,false);

function onTouchStart() {
  console.info('onTouchStart');
  return true;
}
function onTouchMove() {
  console.info('onTouchmove');
  return true;
}
function onTouchEnd() {
  console.info('onTouchEnd');
  return false;
}
function onTouchCancel() {
  console.info('onTouchcancel');
}
function onMouse() {
  console.info('onMouse');
  return true;
}
function onClick() {
  console.info('onClick');
  return true;
}


Util.Event.addHandler(clickButtonEle,'click',onButtonClick);

function onButtonClick() {
  console.info('target onClick');
  clickButtonEle.innerHTML = '已点击，参照：'+Util.getRandomNum(6);
}