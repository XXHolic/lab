window.onload = function() {
  var showDataObj = document.getElementById('showData');

  var xhr = new XMLHttpRequest();
  xhr.open('post','https://xxholic.github.io/lab/images/html5-rocks.png');
  xhr.responseType = 'blob';
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      showDataObj.innerText = String(xhr.response);
    }
  }
  xhr.send();
};