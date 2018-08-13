window.onload = function () {
  var btn = document.getElementById('click');
  Util.Event.addHandler(btn, 'click', function () {
    alert('clicked');
  });

  var clickEvent = document.createEvent('MouseEvents');
  clickEvent.initMouseEvent("click", true, true, document.defaultView, 0, 0, 0, 0, 0,false, false, false, false, 0, null);
  btn.dispatchEvent(clickEvent);
}