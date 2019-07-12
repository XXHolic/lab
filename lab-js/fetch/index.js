window.onload = function() {


  var getJSONData = function(url) {

    const promise = new Promise(function(resolve, reject) {
      fetch(url,{
        body:JSON.stringify(data),
        cache: 'no-cache',
        method:'POST'
      }).then((response => {
        resolve(response.json());
      })).catch(error => {
        reject(error);
      });
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
