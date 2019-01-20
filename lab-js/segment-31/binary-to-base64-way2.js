window.onload = function() {
  var showImageObj = document.getElementById('showImage');

  var xhr = new XMLHttpRequest();
  xhr.open('get','https://xxholic.github.io/lab/images/logo.jpg');
  xhr.responseType = 'blob'; // 安卓4.3的不支持
  // xhr.responseType = 'arraybuffer';
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      // showImageObj.src = URL.createObjectURL(xhr.response);
      var reader = new FileReader();
      reader.readAsText(xhr.response, 'utf-8');
      reader.onload = function (e) {
          console.info(reader.result);
          showImageObj.src = "data:image/jpg;base64,"+window.btoa(reader.result);
      }

    }
  }
  xhr.send();
};