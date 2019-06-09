window.onload = function() {
  const promise = new Promise(function(resolve, reject) {
    if (true) {
      resolve("resolve value");
    } else {
      reject("reject value");
    }
  });

  console.info("promise:", promise);

  var getJSONData = function(url) {
    const promise = new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(xhr.statusText));
        }
      };

      xhr.open("GET", url);
      xhr.send();
    });

    return promise;
  };

  var thenResult = getJSONData("./data.json").then(
    function(json) {
      console.info("jsonData:", json);
    },
    function(error) {
      console.error("出错了", error);
    }
  );

  console.info("thenResult:", thenResult);

  const doAsyncThing = function() {
    return new Promise(function(resolve, rejected) {
      resolve(x);
    });
  };

  doAsyncThing().then(function(value) {
    console.info(value);
  });

  setTimeout(() => {
    console.info(222);
  }, 1000);


};
