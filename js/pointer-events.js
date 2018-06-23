window.onload = function() {
  if (!window.PointerEvent) {
    var container = document.getElementById('container');
    container.innerHTML="此设备不支持 PointerEvent";
    return false;
  }
  var btnELe = document.getElementById('testBtn');
  var clickTypeEle = document.getElementById('clickType');
  // var tipTextEle = document.getElementById('tipText');

  Util.Event.addHandler(btnELe,'pointerdown',function(event){
    clickTypeEle.innerText = event.pointerType;
    console.info('pointerType',event.pointerType);
  });

  // Util.Event.addHandler(clickTypeEle,'click',function(event){

  //   console.info('event',event);
  // });

  // Util.Event.addHandler(tipTextEle,'touchstart',function(event){

  //   console.info('event',event);
  // });
};