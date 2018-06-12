var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
var bodyEle = document.getElementById('body');
var clickButtonEle = document.getElementById('clickButton');
var htmlEle = document.getElementById('html');
var bodyEle = document.getElementById('body');
// Util.Event.addHandler(htmlEle, 'click', onHtmlClick,false);
// Util.Event.addHandler(bodyEle, 'click', onBodyClick, false);
function onHtmlClick() {
  console.info('给html绑定click事件')
}
// function onBodyClick() {
//   console.info('给body绑定click事件')
// }

if (deviceIsAndroid) {
  // Util.Event.addHandler(bodyEle,'mouseover', onMouse, true);
  // Util.Event.addHandler(bodyEle,'mousedown', onMouse, true);
  // Util.Event.addHandler(bodyEle,'mouseup', onMouse, true);
}

// Util.Event.addHandler(bodyEle,'click',onClick,true);
// Util.Event.addHandler(bodyEle,'touchstart',onTouchStart,false);
// Util.Event.addHandler(bodyEle,'touchmove',onTouchMove,false);
// Util.Event.addHandler(bodyEle,'touchend',onTouchEnd,false);
// Util.Event.addHandler(bodyEle,'touchcancel',onTouchCancel,false);

// onmouseenter 不支持冒泡
Util.Event.addHandler(clickButtonEle,'mouseenter', onMouseEnter, false);
// onmouseleave 不支持冒泡
Util.Event.addHandler(clickButtonEle,'mouseleave', onMouseLeave, false);
Util.Event.addHandler(clickButtonEle,'mousedown', onMouseDown, false);
Util.Event.addHandler(clickButtonEle,'mousemove', onMouseMove, false);
Util.Event.addHandler(clickButtonEle,'mouseover', onMouseOver, false);
Util.Event.addHandler(clickButtonEle,'mouseout', onMouseOut, false);
Util.Event.addHandler(clickButtonEle,'mouseup', onMouseUp, false);
Util.Event.addHandler(clickButtonEle,'click',onClick,false);
Util.Event.addHandler(clickButtonEle,'dbclick',onClick,false);
Util.Event.addHandler(clickButtonEle,'touchstart',onTouchStart,false);
Util.Event.addHandler(clickButtonEle,'touchmove',onTouchMove,false);
Util.Event.addHandler(clickButtonEle,'touchend',onTouchEnd,false);
Util.Event.addHandler(clickButtonEle,'touchcancel',onTouchCancel,false);

function onMouseEnter() {
  console.info('onMouseEnter');
}
function onMouseLeave() {
  console.info('onMouseLeave');
}
function onMouseDown() {
  console.info('onMouseDown');
}
function onMouseMove() {
  console.info('onMouseMove');
}
function onMouseOver() {
  console.info('onMouseOver');
}
function onMouseOut() {
  console.info('onMouseOut');
}
function onMouseUp() {
  console.info('onMouseUp');
}

function onTouchStart() {
  console.info('onTouchStart');
  // return true;
}
function onTouchMove() {
  console.info('onTouchmove');
  // return true;
}
function onTouchEnd() {
  console.info('onTouchEnd');
  // return false;
}
function onTouchCancel() {
  console.info('onTouchcancel');
}
function onMouse() {
  console.info('onMouse');
  // return true;
}
function onClick() {
  console.info('onClick');
  // return true;
}


Util.Event.addHandler(clickButtonEle,'click',onButtonClick);

function onButtonClick() {
  console.info('target onClick');
  clickButtonEle.innerHTML = '已点击，参照：'+Util.getRandomNum(6);
}