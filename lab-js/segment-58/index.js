window.onload = function () {

  function isSupportCSS() {

    console.info(typeof document.body.style.width)
    console.info(typeof document.body.style.test)

    console.info(CSS.supports("display: flex"));
    console.info(CSS.supports("display: test"));
    console.info(CSS.supports("display", "flex"));
    console.info(CSS.supports("display", "test"));
  }



  function isSupportEvent(eventName) {
    if (typeof eventName !== 'string') {
      console.log('Event name is not legal !');
      return;
    }
    var element = document.createElement('div');
    eventName = 'on' + eventName;
    var isSupport = Boolean(eventName in element);
    return isSupport;
  }

  var isSupportClick = isSupportEvent('click');
  var isSupportCustom = isSupportEvent('custom');
  console.info('isSupportClick:',isSupportClick);
  console.info('isSupportCustom:',isSupportCustom);

  function isSupportObject(objName) {
    if (typeof objName !== 'string') {
      console.log('Object name is not legal !');
      return;
    }
    return Boolean(window[objName]);
  }

  var isSupportLocalStorage = isSupportObject('localStorage');
  console.info('isSupportLocalStorage:',isSupportLocalStorage);
  var isSupportIndexedDB = isSupportObject('indexedDB');
  console.info('isSupportIndexedDB:',isSupportIndexedDB);
  var isSupportWorker = isSupportObject('Worker');
  console.info('isSupportWorker:',isSupportWorker);

//   var isSupportFontFamily = function (f) {
//     if (typeof f != "string") {
//         return false
//     }
//     var h = "Arial";
//     if (f.toLowerCase() == h.toLowerCase()) {
//         return true
//     }
//     var e = "a";
//     var d = 100;
//     var a = 100,
//         i = 100;
//     var c = document.createElement("canvas");
//     var b = c.getContext("2d");
//     c.width = a;
//     c.height = i;
//     b.textAlign = "center";
//     b.fillStyle = "black";
//     b.textBaseline = "middle";
//     var g = function (j) {
//         b.clearRect(0, 0, a, i);
//         b.font = d + "px " + j + ", " + h;
//         b.fillText(e, a / 2, i / 2);
//         var k = b.getImageData(0, 0, a, i).data;
//         return [].slice.call(k).filter(function (l) {
//             return l != 0
//         })
//     };
//     return g(h).join("") !== g(f).join("")
// }

  function isSupportFontFamily(font) {
    if (typeof font !== 'string') {
      console.log('Font name is not legal !');
      return;
    }

    var width;
    var body = document.body;

    var container = document.createElement('span');
    container.innerHTML = Array(10).join('wi');
    container.style.cssText = [
      'position:absolute',
      'width:auto',
      'font-size:128px',
      'left:-99999px'
    ].join(' !important;');

    var getWidth = function (fontFamily) {
      container.style.fontFamily = fontFamily;
      body.appendChild(container);
      width = container.clientWidth;
      body.removeChild(container);

      return width;
    };

    var monoWidth  = getWidth('monospace');
    var serifWidth = getWidth('serif');
    var sansWidth  = getWidth('sans-serif');

    return monoWidth !== getWidth(font + ',monospace') || sansWidth !== getWidth(font + ',sans-serif') || serifWidth !== getWidth(font + ',serif');
  }


  console.info('isSupport PingFangSC-Regular', isSupportFontFamily('PingFangSC-Regular'));
  console.info('isSupport Microsoft Yahei', isSupportFontFamily('Microsoft Yahei'));







};
