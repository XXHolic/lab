window.onload = function() {
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

  showDeviceType();

  var bubblingEle = document.getElementById('clickBubbing');
  var bubblingParentEle = document.getElementById('clickBubbingParent');
  var bodyEle = document.getElementById('body');
  var HtmlEle = document.getElementById('html');

  var parentState = document.getElementById('parentState');
  var bodyState = document.getElementById('bodyState');
  var htmlState = document.getElementById('htmlState');
  var windowState = document.getElementById('windowState');

  Util.Event.addHandler(bubblingEle, 'click', function(e) {
    bubblingEle.innerText = '已点击，参考数：'+getRandomNum();
  });

  Util.Event.addHandler(bubblingParentEle, 'click', function(e) {
    parentState.innerText = 'bubbling，参考数：'+getRandomNum(8);
  });

  Util.Event.addHandler(bodyEle, 'click', function(e) {
    bodyState.innerText = 'bubbling，参考数：'+getRandomNum(8);
  });

  Util.Event.addHandler(HtmlEle, 'click', function(e) {
    htmlState.innerText = 'bubbling，参考数：'+getRandomNum(8);
  });

  Util.Event.addHandler(window, 'click', function(e) {
    windowState.innerText = 'bubbling，参考数：'+getRandomNum(8);
  });

}

