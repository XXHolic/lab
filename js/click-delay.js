window.onload = function() {
  var colorBoxTouchEle = document.getElementById("colorBoxTouch");
  var colorBoxClickEle = document.getElementById("colorBoxClick");

  Util.Event.addHandler(colorBoxTouchEle,'touchstart',function(){
    colorBoxTouchEle.style.backgroundColor = "#340";
    alert('touch');
  });

  Util.Event.addHandler(colorBoxClickEle,'click',function(){
    colorBoxClickEle.style.backgroundColor = "#340";
    alert('click');
  });

}

