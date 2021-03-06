window.onload = function() {
  var showImageObj = document.getElementById('showImage');

  var xhr = new XMLHttpRequest();
  xhr.open('get','https://xxholic.github.io/lab/images/logo.jpg');
  xhr.responseType = 'blob'; // 安卓4.3的不支持
  // xhr.responseType = 'arraybuffer';
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var blobData = new Blob([xhr.response]);
      var reader = new FileReader();
      reader.readAsDataURL(blobData);
      reader.onload = function (e) {
          console.info(reader.result);
          showImageObj.src = reader.result;
      }

    }
  }
  xhr.send();
};