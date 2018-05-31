window.onload = function() {
  var capturingEle = document.getElementById('clickCapturing');
  var capturingParentEle = document.getElementById('clickCapturingParent');
  var bodyEle = document.getElementById('body');
  var HtmlEle = document.getElementById('html');
  var showCapturingEle = document.getElementById('showCapturingEle');

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
    showCapturingEle.appendChild(divEle);
  }

  showDeviceType();

  Util.Event.addHandler(capturingEle, 'click', function(e) {
    capturingEle.innerText = '已点击，参照数：'+getRandomNum(8);
    var showText = '点击元素 capturing，参照数：'+getRandomNum(8);
    createShowEle(showText);
  },true);

  Util.Event.addHandler(capturingParentEle, 'click', function(e) {
    var showText = '父元素 capturing，参照数：'+getRandomNum(8);
    createShowEle(showText);
  },true);

  Util.Event.addHandler(bodyEle, 'click', function(e) {
    Util.stopPropagation(e);
    var showText = 'body 元素 capturing，参照数：'+getRandomNum(8);
    capturingEle.innerText = '已点击，body开始没有捕获了';
    createShowEle(showText);
  },true);

  Util.Event.addHandler(HtmlEle, 'click', function(e) {
    var showText = 'html 元素 capturing，参照数：'+getRandomNum(8);
    createShowEle(showText);
  },true);

  Util.Event.addHandler(document, 'click', function (e) {
    var showText = 'document capturing ，参照数：' + getRandomNum(8);
    createShowEle(showText);
  }, true);

  Util.Event.addHandler(window, 'click', function(e) {
    var showText = 'window capturing，参照数：'+getRandomNum(8);
    createShowEle(showText);
  },true);

}

