function pageInit() {
  var clickEle1 = document.getElementById('clickButton1');
  Util.Event.addHandler(clickEle1, 'click', function () {
    clickEle1.innerText = '已点击，参照：' + Util.getRandomNum(4);
  });
  var shadowEle = document.getElementById('shadowEle');
  Util.Event.addHandler(shadowEle, 'touchstart', function () {
    shadowEle.style.display="none";
  });

  var shadow2Ele = document.getElementById('shadowEle2');
  Util.Event.addHandler(shadow2Ele, 'click', function () {
    shadow2Ele.style.display="none";
  });

  var clickEle2 = document.getElementById('clickButton2');
  Util.Event.addHandler(clickEle2, 'click', function () {
    clickEle2.innerText = '已点击，参照：' + Util.getRandomNum(4);
  });
}

pageInit();