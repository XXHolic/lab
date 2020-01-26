function modal() {
  var ele = document.createElement('div');
  ele.setAttribute('class','modal');
  // 遮罩层
  var maskEle = document.createElement('div');
  maskEle.setAttribute('class','modal-mask');

  // 内容
  var containerEle = document.createElement('div');
  containerEle.setAttribute('class','modal-container');
  var btnEle = document.createElement('button');
  btnEle.setAttribute('class','btn');
  var btnTextNode = document.createTextNode('close');
  btnEle.appendChild(btnTextNode);
  containerEle.appendChild(btnEle);

  // 组装
  ele.appendChild(maskEle);
  ele.appendChild(containerEle);
  document.body.appendChild(ele);
  btnEle.onclick = function() {
    document.body.removeChild(ele);
  }

}

window.onload = function() {
  // insertLink({title:'z-index',linkIndex: 71})
  var arr = Array(30);
  var container = document.querySelector('#container');
  for (let index = 0; index < arr.length; index++) {
    var ele = document.createElement('p');
    ele.setAttribute('class','scroll-content');
    var textNode = document.createTextNode('scroll content');
    ele.appendChild(textNode);
    container.appendChild(ele);
  }
}