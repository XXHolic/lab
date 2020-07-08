function checkIntoView() {
  var scrollEle = document.querySelector('.list');
  var scrollEleHeight = scrollEle.offsetHeight;
  var itemHeight = -document.querySelector('.item').offsetHeight;
  var intoViewEle = [];
    var scrollTopDis = scrollEle.scrollTop;
    document.querySelectorAll('.item').forEach(function(ele,index) {
      var top = ele.offsetTop;
      var gap = top - scrollTopDis;
      if (gap>itemHeight && gap <=scrollEleHeight) {
        if (intoViewEle.indexOf(index)<0) {
          var indexNum = index + 1;
          intoViewEle.push('元素 '+indexNum)
        }
      }
    })
    var showMsg = intoViewEle.join('，');
    document.querySelector('#result').innerHTML = '部分或全部已在可视区的元素有：<br />'+showMsg;
}

function testIntoView() {
  checkIntoView();
  var scrollTimeout = null;
  var scrollEle = document.querySelector('.list');
  scrollEle.onscroll = function() {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(function() {
      checkIntoView();
    },500)

  }

}

testIntoView()