function pageInit() {
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);

      var clickEle = document.getElementById('clickButton');
      Util.Event.addHandler(clickEle,'click',function() {
        clickEle.innerText = '已点击，参照：'+Util.getRandomNum(4);
        console.info('target onClick');
      });
    }, false);
  };


}

pageInit();