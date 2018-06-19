window.onload = function() {
  if (!window.PointerEvent) {
    var container = document.getElementById('container');
    container.innerHTML="此设备不支持 PointerEvent";
    return false;
  }
  var btnELe = document.getElementById('testBtn');
  Util.Event.addHandler(btnELe,'pointerdown',function(){
    console.info('PointerDown');
  });
};