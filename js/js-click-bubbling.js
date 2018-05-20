window.onload = function() {
  var bubblingEle = document.getElementById('clickBubbling');
  var bubblingParentEle = document.getElementById('clickBubblingParent');
  var bodyEle = document.getElementById('body');
  var HtmlEle = document.getElementById('html');
  var showBubblingEle = document.getElementById('showBubblingEle');

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

  function createShowEle(text) {
    var divEle = document.createElement('div');
    divEle.innerText = text;
    showBubblingEle.appendChild(divEle);
  }

  showDeviceType();

  Util.Event.addHandler(bubblingEle, 'click', function(e) {
    bubblingEle.innerText = '已点击，参照数：'+getRandomNum(8);
    showBubblingEle.innerHTML='';
    var showText = '点击元素 bubbling ，参照数：'+getRandomNum(8);
    createShowEle(showText);
  });

  Util.Event.addHandler(bubblingParentEle, 'click', function(e) {
    var showText = 'bubbling 到父元素 ，参照数：'+getRandomNum(8);
    createShowEle(showText);
  });

  Util.Event.addHandler(bodyEle, 'click', function(e) {
    var showText = 'bubbling 到 body 元素，参照数：'+getRandomNum(8);
    createShowEle(showText);
  });

  Util.Event.addHandler(HtmlEle, 'click', function(e) {
    var showText = 'bubbling 到 html 元素 ，参照数：'+getRandomNum(8);
    createShowEle(showText);
  });

  Util.Event.addHandler(window, 'click', function(e) {
    var showText = 'bubbling 到 window，参照数：'+getRandomNum(8);
    createShowEle(showText);
  });

}

