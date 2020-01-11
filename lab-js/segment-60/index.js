
  var scrollObj = document.querySelector('body');
  var targetHolderEle = document.querySelector('#titleHolder');
  var targetEle = document.querySelector('#title');
  var scrollMark = null;
  function dealScroll() {
    if (scrollMark) {
      clearTimeout(scrollMark);
    }

    scrollMark = setTimeout(() => {
        var topDistance = 0;
        // getBoundingClientRect 有些浏览器不支持
        if (targetHolderEle.getBoundingClientRect) {
          var pos = targetHolderEle.getBoundingClientRect();
          topDistance = pos.top;
        } else {
          var eleTop = targetHolderEle.offsetTop;
          topDistance = eleTop - scrollObj.scrollTop;
        }
        if (topDistance < 1) {
          targetHolderEle.setAttribute('class','title-holder');
          targetEle.style.position = 'fixed';
        } else {
          targetHolderEle.setAttribute('class','');
          targetEle.style.position = 'static';
        }
    }, 10);
  }

  function listenScroll() {
    scrollObj.addEventListener('scroll', dealScroll);
  }




window.onload = function () {
  listenScroll();
};

window.onunload = function () {
  var scrollObj = document.querySelector('body');
  scrollObj.removeEventListener('scroll', dealScroll);
}
