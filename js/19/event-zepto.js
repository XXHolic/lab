function pageInit() {
  $('#clickButton').tap(function () {
    var clickEle = document.getElementById('clickButton');
    clickEle.innerText = '已点击，参照：' + Util.getRandomNum(4);
  })
}

window.onload = function() {
  pageInit();
}
