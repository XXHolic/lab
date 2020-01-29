var Util={};

/**
 * judge device type(pc or phone)
 * return string
 * blog link:http://www.cnblogs.com/babycool/p/3583114.html
 */
Util.getDeviceType = function() {
  var userAgent = navigator.userAgent.toLowerCase();
  var isIpad = userAgent.match(/ipad/i) == "ipad";
  var isIphoneOs = userAgent.match(/iphone os/i) == "iphone os";
  var isMidp = userAgent.match(/midp/i) == "midp";
  var isUc7 = userAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var isUc = userAgent.match(/ucweb/i) == "ucweb";
  var isAndroid = userAgent.match(/android/i) == "android";
  var isCE = userAgent.match(/windows ce/i) == "windows ce";
  var isWM = userAgent.match(/windows mobile/i) == "windows mobile";
  if (isIpad || isIphoneOs || isMidp || isUc7 || isUc || isAndroid || isCE || isWM) {
    return "phone";
  } else {
    return "pc";
  }
};

/**
 * 用于事件的处理
 * ie 不支持参数默认赋值，link:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters
 */
Util.Event = {
  addHandler: function(element, type, handler, useCapturing) {
    if(element.addEventListener) {
      // IE9、Firefox、Safari、Chrome 和Opera 支持DOM2 级事件处理程序。
      element.addEventListener(type, handler, useCapturing || false);
    } else if(element.attachEvent) {
      // IE<9
      element.attachEvent('on' + type, handler);
    } else {
      element['on' + type] = handler;
    }
  },
  removeHandler: function(element, type, handler,useCapturing) {
    if(element.removeEventListener) {
      // IE9、Firefox、Safari、Chrome 和Opera 支持DOM2 级事件处理程序。
      element.removeEventListener(type, handler, useCapturing || false);
    } else if(element.detachEvent) {
      // IEe<9
      element.detachEvent('on' + type, handler);
    } else {
      element['on' + type] = null;
    }
  },
  getEvent: function(event) {
    return event ? event : window.event;
  },
  // 阻止事件传播
  stopPropagation: function(event) {
    if (event.stopPropagation){
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },
  // 阻止默认行为
  stopDefault: function(event) {
    if (event.preventDefault){
      event.preventDefault();
    } else {
        event.returnValue = false;
    }
  }
}

// 获取一个随机数字符串，用来做对比
Util.getRandomNum = function(len) {
  var numString = String(Math.random());
  if (len) {
    return numString.substring(0,len);
  } else {
    return numString;
  }
}

// 插入文本
Util.appendText = function(ele, text) {
  var newELe = document.createElement('p');
  newELe.innerText = (text || '')+Util.getRandomNum(5);
  ele && ele.appendChild(newELe);
}

// canvas 各种处理
Util.CANVAS = {
  // 处理显示模糊问题
  createElement: function(w=300,h=150) {
    var ratio = window.devicePixelRatio || 1;
    var canvas = document.createElement('canvas');
    canvas.width = w * ratio; // 实际渲染像素
    canvas.height = h * ratio; // 实际渲染像素
    canvas.style.width = `${w}px`; // 控制显示大小
    canvas.style.height = `${h}px`; // 控制显示大小
    canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
    return canvas;
  },
  // 绘制矩形
  drawRect: function({context,x, y, width, height,fillStyle}){
    context.beginPath();
    if (fillStyle) {
      context.fillStyle = fillStyle;
      context.fill();
    }
    context.fillRect(x, y,width, height);
    context.closePath();
  },
  // 生成有圆角的矩形
  drawRoundedRect: function(context, x, y, width, height, radius) {
    context.beginPath();
    context.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
    context.lineTo(width - radius + x, y);
    context.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
    context.lineTo(width + x, height + y - radius);
    context.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
    context.lineTo(radius + x, height + y);
    context.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
    context.closePath();
  },
  // 文本换行处理，并返回实际文字所占据的高度
  textEllipsis: function(context, text, x, y, maxWidth, lineHeight, row) {
    if (typeof text != 'string' || typeof x != 'number' || typeof y != 'number') {
      return;
    }
    var canvas = context.canvas;

    if (typeof maxWidth == 'undefined') {
      maxWidth = canvas && canvas.width || 300;
    }

    if (typeof lineHeight == 'undefined') {
      // 有些情况取值结果是字符串，比如 normal。所以要判断一下
      var getLineHeight = window.getComputedStyle(canvas).lineHeight;
      var reg=/^[0-9]+.?[0-9]*$/;
      lineHeight = reg.test(getLineHeight)? getLineHeight:20;
    }

    // 字符分隔为数组
    var arrText = text.split('');
    // 文字最终占据的高度，放置在文字下面的内容排版，可能会根据这个来确定位置
    var textHeight = 0;
    // 每行显示的文字
    var showText = '';
    // 控制行数
    var limitRow = row;
    var rowCount = 0;

    for (var n = 0; n < arrText.length; n++) {
      var singleText = arrText[n];
      var connectShowText = showText + singleText;
      // 没有传控制的行数，那就一直换行
      var isLimitRow = limitRow ? rowCount === (limitRow - 1) : false;
      var measureText = isLimitRow ? (connectShowText+'……') : connectShowText;
      var metrics = context.measureText(measureText);
      var textWidth = metrics.width;

      if (textWidth > maxWidth && n > 0 && rowCount !== limitRow) {
        var canvasShowText = isLimitRow?measureText:showText;
        context.fillText(canvasShowText, x, y);
        showText = singleText;
        y += lineHeight;
        textHeight += lineHeight;
        rowCount++;
        if (isLimitRow) {
          break;
        }
      } else {
        showText = connectShowText;
      }
    }
    if (rowCount !== limitRow) {
      context.fillText(showText, x, y);
    }

    var textHeightValue = rowCount < limitRow ? (textHeight + lineHeight): textHeight;
    return textHeightValue;
  },
  /**
   * 图像灰度处理
   * @param {*} context canvas 上下文
   * @param {*} sx 提取图像数据矩形区域的左上角 x 坐标。
   * @param {*} sy 提取图像数据矩形区域的左上角 y 坐标。
   * @param {*} sw 提取图像数据矩形区域的宽度。这要注意一下，canvas 标签上 width 属性值，不是渲染后实际宽度值，否则在高清手机屏幕下且做了高清处理，只能获取到部分图像宽度。
   * @param {*} sh 提取图像数据矩形区域的高度。这要注意一下，canvas 标签上 height 属性值，不是渲染后实际高度值，否则在高清手机屏幕下且做了高清处理，只能获取到部分图像高度。
   */
  toGray: function(context,sx, sy, sw, sh) {
    var imageData = context.getImageData(sx, sy, sw, sh);
    var colorDataArr = imageData.data;
    var colorDataArrLen = colorDataArr.length;
    for(var i = 0; i < colorDataArrLen; i+=4) {
      var gray=(colorDataArr[i]+colorDataArr[i+1]+colorDataArr[i+2])/3;
      colorDataArr[i] = gray;
      colorDataArr[i+1] = gray;
      colorDataArr[i+2] = gray;
    }
    context.putImageData(imageData,0,0);
  },
  /**
   * 获取透明所占百分比，初始参考透明值是 128
   * @param {object} context canvas 上下文对象
   * @param {number} opacity 透明度参考值
   */
  getOpacityPercentage: function(context, opacity = 128) {
    var imageData = context.getImageData(0,0,248,415);
    var colorDataArr = imageData.data;
    // console.info('color data:',colorDataArr);
    var colorDataArrLen = colorDataArr.length;
    var eraseArea = [];
    for(var i = 0; i < colorDataArrLen; i += 4) {
      // 严格上来说，判断像素点是否透明需要判断该像素点的a值是否等于0，
      if(colorDataArr[i + 3] < opacity) {
        eraseArea.push(colorDataArr[i + 3]);
      }
    }
    var divResult = eraseArea.length / (colorDataArrLen/4);
    var pointIndex = String(divResult).indexOf('.');
    if (pointIndex>-1) {
      divResult = String(divResult).slice(0,pointIndex+5);
    }
    return Number(divResult).toFixed(2);

  },
  /**
   * 清除画布
   * @param {object} context canvas 上下文对象
   * @param {number} width 画布高度
   * @param {number} height 画布宽度
   */
  clear: function(context,width=0,height=0) {
    var centerX = width/2;
    var centerY = height/2;
    var maxRadius = Math.sqrt( Math.pow(centerX,2) + Math.pow(centerY,2) ) + 1;
    var radius = 10;
    context.beginPath();
    var count = setInterval(() => {
      if (radius>maxRadius) {
        clearInterval(count);
      }
      radius+=3;
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.fill();
    }, 10);
  }
}