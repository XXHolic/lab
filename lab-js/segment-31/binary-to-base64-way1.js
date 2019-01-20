window.onload = function() {
  var showImageObj = document.getElementById('showImage');

  var xhr = new XMLHttpRequest();
  xhr.open('get','https://xxholic.github.io/lab/images/logo.jpg');
  xhr.responseType = 'blob'; // 安卓4.3的不支持
  // xhr.responseType = 'arraybuffer';
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      showImageObj.src = URL.createObjectURL(xhr.response);
    }
  }
  xhr.send();
};