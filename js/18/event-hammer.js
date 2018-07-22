function pageInit() {
  var square = document.querySelector('#clickButton');

  // Create an instance of Hammer with the reference.
  var manager = new Hammer(square);

  // Create a recognizer
  var Tap = new Hammer.Tap({
    taps: 1
  });

  // Add the recognizer to the manager
  manager.add(Tap);

  // Subscribe to the desired event
  manager.on('tap', function(e) {
    // e.target.classList.toggle('expand');
    console.info('ddd');
    square.innerText = 'clicked,参照数：'+Util.getRandomNum(8);
  });

}

pageInit();