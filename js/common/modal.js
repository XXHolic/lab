function modal() {
  var ele = document.createElement('div');
  // 遮罩层
  var maskEle = document.createElement('div');
  maskEle.setAttribute('class','modal-mask');

  // 内容
  var containerEle = document.createElement('div');
  var btnEle = document.createElement('button');
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