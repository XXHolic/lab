window.onload = function() {
  var clickEle = document.getElementById('clickEle');
  var clickEle2 = document.getElementById('clickEle2');
  var showEle = document.getElementById('showEle');
  var showEle2 = document.getElementById('showEle2');

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
    var deviceShowEle2 = document.getElementById('deviceShow2');
    var deviceType = Util.getDeviceType();
    var deviceTypeTxt = deviceType==='pc'?'PC端':'手机端';
    deviceShowEle.innerText = deviceTypeTxt;
    deviceShowEle2.innerText = deviceTypeTxt;
  }

  function createShowEle(target,text) {
    var divEle = document.createElement('div');
    divEle.innerText = text;
    target&&target.appendChild(divEle);
  }

  showDeviceType();

  // 先冒泡绑定，再捕获绑定
  Util.Event.addHandler(clickEle, 'click', function(e) {
    clickEle.innerText = '已点击，bubbling参照数：'+getRandomNum(8);
    var showText = '点击元素 bubbling ，参照数：'+getRandomNum(8);
    createShowEle(showEle,showText);
  });

  Util.Event.addHandler(clickEle, 'click', function(e) {
    clickEle.innerText = '已点击，capturing参照数：'+getRandomNum(8);
    var showText = '点击元素 capturing ，参照数：'+getRandomNum(8);
    createShowEle(showEle,showText);
  },true);

  // 先捕获绑定，再冒泡绑定
  Util.Event.addHandler(clickEle2, 'click', function(e) {
    clickEle2.innerText = '已点击，capturing参照数：'+getRandomNum(8);
    var showText = '点击元素 capturing ，参照数：'+getRandomNum(8);
    createShowEle(showEle2,showText);
  },true);

  Util.Event.addHandler(clickEle2, 'click', function(e) {
    clickEle2.innerText = '已点击，bubbling参照数：'+getRandomNum(8);
    var showText = '点击元素 bubbling ，参照数：'+getRandomNum(8);
    createShowEle(showEle2,showText);
  });

}

