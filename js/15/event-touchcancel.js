var page = {
  init: function() {
    var _self = this;
    _self.initClickBtn();
  },
  initClickBtn: function() {
    var clickButtonEle = document.getElementById('clickButton');
    var recordTouchMoveEventEle = document.getElementById('recordTouchMoveEvent');
    var recordTouchCancelEventEle = document.getElementById('recordTouchCancelEvent');

    Util.Event.addHandler(clickButtonEle,'touchstart', function() {
      alert('touchstart');
    });

    Util.Event.addHandler(clickButtonEle, 'touchmove', function () {
      recordTouchMoveEventEle.innerText = 'touchmove' + Util.getRandomNum(5);
    });

    Util.Event.addHandler(clickButtonEle,'touchcancel', function() {
      recordTouchCancelEventEle.innerText = 'touchcancel' + Util.getRandomNum(5);
    });

  }
};

window.onload = function() {
  page.init();
}
