window.onload = function() {
  function fun1() {
    for (var index = 0; index < 5; index++) {
      setTimeout(function() {
        console.info('in',new Date().getTime(),index);
      },1000);

    }

    console.info('out', new Date().getTime(),index);
  }

  fun1();
}
