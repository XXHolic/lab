window.onload = function() {
  console.log("sync1");

  setTimeout(function() {
    console.log("setTimeout1");
  }, 0);

  var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      console.log("setTimeoutPromise");
    }, 0);
    console.log("promise");
    resolve();
  });

  promise.then(() => {
    console.log("pro_then");
    setTimeout(() => {
      console.log("pro_timeout");
    }, 0);
  });

  setTimeout(function() {
    console.log("last_setTimeout");
  }, 0);
  console.log("sync2");

  // sync1  promise sync2
  // pro_then;
  // ;
  // setTimeout1;
  // setTimeoutPromise;
  // last_setTimeout
  // pro_timeout;
};
