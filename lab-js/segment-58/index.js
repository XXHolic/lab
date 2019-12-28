window.onload = function () {
  // console.info(typeof document.body.style.width);
  // console.info(typeof document.body.style.aa);

  function testCSS() {

    console.info(typeof document.body.style.width)
    console.info(typeof document.body.style.test)

    console.info(CSS.supports("display: flex"));
    console.info(CSS.supports("display: test"));
    console.info(CSS.supports("display", "flex"));
    console.info(CSS.supports("display", "test"));
  }

  function testEvent(eventName) {
    var element = document.createElement('div');
    eventName = 'on' + eventName;
    var isSupport = eventName in element;
    console.info('isSupport', isSupport);
  }

  function testWindowObject() {
    console.info('isSupport localStorage', window.localStorage);


    console.info('isSupport formData', window.FormData);

    console.info('isSupport indexedDB', window.indexedDB);
    console.info('isSupport Worker', new Worker());
  }

  function testApi() {
    if (window.FormData) {
      var myForm = document.getElementById('myForm');
      var formData = new FormData(myForm);
      console.info('isSupport formData.has', formData.has);
    }

  }

  function checkFont1(strFamily) {
    var objDiv = document.createElement('div');

    objDiv.style.fontFamily = strFamily;
    objDiv.appendChild(document.createTextNode('FONT TEST'));

    if (window.getComputedStyle) {
      return window.getComputedStyle(objDiv, null).getPropertyValue('font-family') === strFamily;
    }

    return objDiv.currentStyle.fontFamily === strFamily;
  }

  var isSupportFontFamily = function (f) {
    if (typeof f != "string") {
        return false
    }
    var h = "Arial";
    if (f.toLowerCase() == h.toLowerCase()) {
        return true
    }
    var e = "a";
    var d = 100;
    var a = 100,
        i = 100;
    var c = document.createElement("canvas");
    var b = c.getContext("2d");
    c.width = a;
    c.height = i;
    b.textAlign = "center";
    b.fillStyle = "black";
    b.textBaseline = "middle";
    var g = function (j) {
        b.clearRect(0, 0, a, i);
        b.font = d + "px " + j + ", " + h;
        b.fillText(e, a / 2, i / 2);
        var k = b.getImageData(0, 0, a, i).data;
        return [].slice.call(k).filter(function (l) {
            return l != 0
        })
    };
    return g(h).join("") !== g(f).join("")
}

function isSupportFontFamily2(font) {
  var width;
  var body = document.body;

  var container = document.createElement('span');
  container.innerHTML = Array(100).join('wi');
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

  return monoWidth !== getWidth(font + ',monospace') ||
      sansWidth !== getWidth(font + ',sans-serif') ||
      serifWidth !== getWidth(font + ',serif');
}

  // testCSS()

  // testEvent('click')
  // testEvent('none')

  // testWindowObject()

  // testApi

  console.info('check font', isSupportFontFamily('PingFangSC-Regular'));
  console.info('check font', isSupportFontFamily('Microsoft Yahei'));
  console.info('check font', isSupportFontFamily2('PingFangSC-Regular'));
  console.info('check font', isSupportFontFamily2('Microsoft Yahei'));







};
