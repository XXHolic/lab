
// 以下方法是基于滚动区域是 body
function fixedEle() {
  var scrollEle = document.body;
  // 有可能出现浮层内切换的情况，已经设置了就用重复设置了。
  if (scrollEle.style.position !== 'fixed') {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    scrollEle.style.cssText += 'position:fixed;top:-'+scrollTop+'px;';
  }
}

function recoverEle() {
  var scrollEle = document.body;
  var top = scrollEle.style.top;
  scrollEle.style.position = '';
  scrollEle.style.top = '';
  document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
}

