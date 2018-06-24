window.onload = function() {
  var clickBox1Ele = document.getElementById("clickBox1");
  var clickBox2Ele = document.getElementById("clickBox2");

  Util.Event.addHandler(clickBox1Ele,'click',function(){
    alert('没有加 touch-action:none');
  });

  Util.Event.addHandler(clickBox2Ele,'click',function(){
    alert('有加 touch-action:none');
  });

}

