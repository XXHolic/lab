// 获取一个随机数字符串，用来做对比
function getRandomNum(len) {
  var numString = String(Math.random());
  if (len) {
    return numString.substring(0,len);
  } else {
    return numString;
  }
}

// 插入文本
function appendText(ele, text) {
  var newELe = document.createElement('p');
  newELe.innerText = (text || '')+Util.getRandomNum(5);
  ele && ele.appendChild(newELe);
}

// 加载中提示
const Loading = {
  create: function() {
    var ele = document.createElement('div');
    var text = document.createTextNode('loading ~ ~ ~');
    ele.appendChild(text);
    this.loadingEle = ele;
  },
  show:function() {
    this.create.bind(this)();
    document.querySelector('body').appendChild(this.loadingEle);
  },
  hide: function() {
    document.querySelector('body').removeChild(this.loadingEle);
  }
}

window.onload = function() {
  var testObj = document.querySelector('#test');
  if (testObj) {
    testObj.addEventListener('click',function(){
      throw new Error('test');
    })
  }
}