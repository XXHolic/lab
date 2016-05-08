// function chageColor() {
//   var pBg=document.getElementById("test-p");
//   changeText();
//   pBg.style.backgroundColor="#900";
//   pBg.style.color="#000";
// }
// function changeText() {
//   var pBg=document.getElementById("test-p");
//   pBg.innerHTML="这个是改过的文字";
// }
// var x = [];

// function createSomeNodes() {
//     var div,
//         i = 100,
//         frag = document.createDocumentFragment();
//     for (;i > 0; i--) {
//         div = document.createElement("div");
//         div.appendChild(document.createTextNode(i + " - "+ new Date().toTimeString()));
//         frag.appendChild(div);
//     }
//     document.getElementById("nodes").appendChild(frag);
// }
// function grow() {
//     x.push(new Array(1000).join('x'));
//     createSomeNodes();
//     // setTimeout(grow,1000);
// }
var intervalId = null, params;

function createChunks() {
    var div, foo, i, str;
    for (i = 0; i < 20; i++) {
        div = document.createElement("div");
        str = new Array(1000000).join('x');
        foo = {
            str: str,
            div: div
        };
        div.foo = foo;
    }
}

function start() {
    if (intervalId) {
        return;
    }
    intervalId = setInterval(createChunks, 1000);
}

function stop() {
    if (intervalId) {
        clearInterval(intervalId);
    }
    intervalId = null;
}

/**
 * 从一定连续范围数值中选取一个随机数
 * @param  {number} lowerValue [选取范围中最小的数值]
 * @param  {number} upperValue [选取范围中最大的数值]
 * @return {number}            [返回的给定范围中的一个随机数，包含最小值和最大值]
 */
function selectFrom(lowerValue,upperValue) {
    var choices=upperValue-lowerValue+1;
    return Math.floor(Math.random()*choices+lowerValue);
}