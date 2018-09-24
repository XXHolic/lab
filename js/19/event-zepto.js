function pageInit() {
  $(document).tap(function() {
    console.info('doucment tap');
  });

  // $(document).click(function() {
  //   console.info('doucment click');
  // });

  $('#clickButton').tap(function () {
    var clickEle = document.getElementById('clickButton');
    clickEle.innerText = '已点击，参照：' + Util.getRandomNum(4);
    console.info('target tap');
  });

  $('#clickButton').doubleTap(function () {
    // var clickEle = document.getElementById('clickButton');
    // clickEle.innerText = '已点击，参照：' + Util.getRandomNum(4);
    console.info('target doubleTap');
  });
  // $('#clickButton').click(function () {
  //   console.info('target click');
  // });
}

window.onload = function() {
  pageInit();
}
