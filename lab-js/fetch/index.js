window.onload = function() {

  var getJSONData = function(url) {

    const promise = new Promise(function(resolve, reject) {
      fetch(url).then((response => {
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



};
