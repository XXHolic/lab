window.onload = function() {
  var areaObj = document.getElementById('areaContent');
  var btnPre = document.getElementById('btnPre');
  var btnReplace = document.getElementById('btnReplace');

  var preEle = document.getElementById('preEle');
  var normalEle = document.getElementById('normalEle');

  btnPre.onclick = function() {
    const conValue = areaObj.value;
    if (!conValue) {
      alert('内容为空');
      return;
    }
    preEle.innerHTML = conValue;
  }

  btnReplace.onclick = function() {
    let conValue = areaObj.value;
    console.info('pCon',conValue);
    if (!conValue) {
      alert('内容为空');
      return;
    }
    normalEle.innerHTML = conValue.replace(/[\r\n]/g,"<br />");

  }

};
