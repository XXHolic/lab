function pageInit() {
  // var square = document.querySelector('#clickButton');
  var square = document.getElementById('clickButton');

  var hammer = new Hammer(square);

  hammer.on('tap', function(e) {
    alert('11')
    console.log("You're pressing me!");
    console.log(e);
  });
}

window.onload = function() {
  pageInit();
}
