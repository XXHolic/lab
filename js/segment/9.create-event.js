window.onload = function () {

  function sendClickOldFashion() {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,false, false, false, false, 0, null);
    var  checkboxEle = document.getElementById('checkbox');
    checkboxEle.dispatchEvent(clickEvent);
  }

  function sendClickNewFashion() {
    var clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
      detail: 0,
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      button: 0,
      relatedTarget: null
    });
    var checkboxEle = document.getElementById('checkbox');
    checkboxEle.dispatchEvent(clickEvent);
  }

  var clickOldEle = document.getElementById('clickOld');
  Util.Event.addHandler(clickOldEle, 'click', function () {
    try {
      sendClickOldFashion();
    } catch (error) {
      alert("不支 document.createEvent() 的方式");
    }
  });

  var clickNewEle = document.getElementById('clickNew');
  Util.Event.addHandler(clickNewEle, 'click', function () {
    try {
      sendClickNewFashion();
    } catch (error) {
      alert("不支持构造函数的方式");
    }
  });

}