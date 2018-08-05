window.onload = function() {
  var clickEle = document.getElementById('clickEle');
  var showEle = document.getElementById('showEle');

  function getRandomNum(len) {
    var numString = String(Math.random());
    if (len) {
      return numString.substring(0,len);
    } else {
      return numString;
    }
  }

  function showDeviceType() {
    var deviceShowEle = document.getElementById('deviceShow');
    var deviceType = Util.getDeviceType();
    var deviceTypeTxt = deviceType==='pc'?'PC端':'手机端';
    deviceShowEle.innerText = deviceTypeTxt;
  }

  function createShowEle(target,text) {
    var divEle = document.createElement('div');
    divEle.innerText = text;
    target&&target.appendChild(divEle);
  }

  showDeviceType();

  Util.Event.addHandler(clickEle, 'click', function(e) {
    var showText = 'capturing click，参照数：'+getRandomNum(8);
    createShowEle(showEle,showText);
  },true);

  Util.Event.addHandler(clickEle, 'mouseup', function(e) {
    var showText = 'bubbling mouseup ，参照数：'+getRandomNum(8);
    createShowEle(showEle,showText);
  });

  Util.Event.addHandler(clickEle, 'mouseup', function(e) {
    var showText = 'capturing mouseup ，参照数：'+getRandomNum(8);
    createShowEle(showEle,showText);
  },true);

}

