window.onload = function() {

  var getData = function () {
    var xhr = new XMLHttpRequest();

    xhr.open('GET','./data.json');

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        console.info(xhr.responseText);
      }
    }

    xhr.send();
  }

  getData();

}