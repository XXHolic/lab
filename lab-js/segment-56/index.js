window.onload = function() {
  var pObj = document.getElementById('pContent');
  var areaObj = document.getElementById('areaContent');
  var pBtnObj = document.getElementById('getPCon');
  var areaBtnObj = document.getElementById('getAreaCon');

  pBtnObj.onclick = function() {
    console.info('pCon',pObj.value);
    console.info('pCon',pObj.innerText);
    console.info('pCon',pObj.innerHTML);
  }

  areaBtnObj.onclick = function() {
    console.info('pCon',areaObj.value);
    const conValue = areaObj.value;
    console.info(conValue.replace(/\r\n/g,"<br />"))
    console.info(conValue.replace(/\n/g,"<br />"))

  }

};
