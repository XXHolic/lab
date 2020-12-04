



// try {
//   a.fun()
// } catch (error) {
//   // console.info({error})
//   console.info(error)
//   // TraceKit.report(error)
// }

document.querySelector('#local').onclick = function() {
  try {
    a.fun()
  } catch (error) {
    // throw error;
    console.info(Object.prototype.toString.call(error))
    console.info({error})
    // console.info(error)

    // TraceKit.report(error)
  }
}

// var node = document.getElementsByTagName('h1').item(0);
var node = document.querySelector('#demo');
var refnode = node.nextSibling;
var newnode = document.createTextNode('这就是为何你挂了！');
node.insertBefore(newnode, refnode);

document.querySelector('test').innerHTML = ''