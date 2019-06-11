window.onload = function() {
  var getJSONData = function(url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status === 200) {
        init.next(JSON.parse(xhr.responseText));
      } else {
        new Error(xhr.statusText);
      }
    };

    xhr.open("GET", url);
    xhr.send();
  };

  async function main() {
    var data = await getJSONData("./data.json");
    console.info("data:", data);
  }

  var result = main();
  console.info("result:",result);
};
