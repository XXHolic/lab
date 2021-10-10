var Tool = {};

/**
 * judge device type(pc or phone)
 * return string
 * blog link:http://www.cnblogs.com/babycool/p/3583114.html
 */
Tool.getDeviceType = function () {
  var userAgent = navigator.userAgent.toLowerCase();
  var isIpad = userAgent.match(/ipad/i) == "ipad";
  var isIphoneOs = userAgent.match(/iphone os/i) == "iphone os";
  var isMidp = userAgent.match(/midp/i) == "midp";
  var isUc7 = userAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var isUc = userAgent.match(/ucweb/i) == "ucweb";
  var isAndroid = userAgent.match(/android/i) == "android";
  var isCE = userAgent.match(/windows ce/i) == "windows ce";
  var isWM = userAgent.match(/windows mobile/i) == "windows mobile";
  if (
    isIpad ||
    isIphoneOs ||
    isMidp ||
    isUc7 ||
    isUc ||
    isAndroid ||
    isCE ||
    isWM
  ) {
    return "phone";
  } else {
    return "pc";
  }
};

// 获取一个随机数字符串，用来做对比
Tool.getRandomNum = function (len) {
  var numString = String(Math.random());
  if (len) {
    return numString.substring(0, len);
  } else {
    return numString;
  }
};

// 插入文本
Tool.appendText = function (ele, text) {
  var newELe = document.createElement("p");
  newELe.innerText = (text || "") + Tool.getRandomNum(5);
  ele && ele.appendChild(newELe);
};

// 加载中提示
Tool.loading = {
  create: function () {
    var ele = document.createElement("div");
    var text = document.createTextNode("loading ~ ~ ~");
    ele.appendChild(text);
    this.loadingEle = ele;
  },
  show: function () {
    this.create.bind(this)();
    document.querySelector("body").appendChild(this.loadingEle);
  },
  hide: function () {
    document.querySelector("body").removeChild(this.loadingEle);
  },
};

/**
 * 插入原文链接
 * @param {object} params
 */
Tool.insertLink = function (params) {
  var linkType = params.type || "segment";
  var eleClass = params.className || "fix-header tc";
  var linkIndex = params.linkIndex;
  var title = params.title;
  var url = "";

  if (!linkIndex) {
    return;
  }
  switch (linkType) {
    case "segment":
      url = "https://github.com/XXHolic/segment/issues/" + linkIndex;
      break;
    case "blog":
      url = "https://github.com/XXHolic/blog/issues/" + linkIndex;
      break;
  }

  var insertEle = document.createElement("h2");
  insertEle.setAttribute("class", eleClass);
  var linkEle = document.createElement("a");
  linkEle.setAttribute("href", url);
  linkEle.setAttribute("target", "_blank");
  var textNode = document.createTextNode("对应文：" + title);
  linkEle.appendChild(textNode);
  insertEle.appendChild(linkEle);
  var bodyEle = document.body;
  bodyEle.insertBefore(insertEle, bodyEle.firstElementChild);
};

/**
 * 获取焦点坐标
 * @param {object} event 事件对象
 * @param {object} element 焦点所在的元素
 * @param {object} buffer 偏移量，在手机上点击可能看不到，为了方便查看偏移一些距离
 */
Tool.getPointCoordinate = function (event, element, buffer = 0) {
  let isPc = Tool.getDeviceType() === "pc";
  const point = isPc ? event : event.touches[0];
  const { offsetLeft, offsetTop } = element;
  let xPos = parseInt(point.pageX - offsetLeft);
  let yPos = parseInt(point.pageY - offsetTop);
  // 手指移动时，为了在移动端方便查看，偏移了一些像素。
  if (!isPc) {
    xPos = xPos - buffer;
    yPos = yPos - buffer;
  }

  return { xPos, yPos };
};

/**
 * 获取随机数，包含最大值和最小值
 * @param {*} min
 * @param {*} max
 */
Tool.getRandom = function (min, max) {
  let minValue = min;
  let maxValue = max;
  if (minValue > maxValue) {
    minValue = max;
    maxValue = min;
  }
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

/**
 * n 是 start1 到 stop1 之间的值，映射到 start2 和 stop2 之间的值
 * 相当于缩放了 n 的值
 * @param {*} n
 * @param {*} start1
 * @param {*} stop1
 * @param {*} start2
 * @param {*} stop2
 * @returns
 */
Tool.map = (n, start1, stop1, start2, stop2) => {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

/**
 * 将值限制在最小值和最大值之间
 * @param {*} n
 * @param {*} low
 * @param {*} high
 * @returns
 */
Tool.constrain = (n, low, high) => {
  return Math.max(Math.min(n, high), low);
};

Tool.random = function (min, max) {
  let rand = Math.random();

  if (typeof min === "undefined") {
    return rand;
  } else if (typeof max === "undefined") {
    if (min instanceof Array) {
      return min[Math.floor(rand * min.length)];
    } else {
      return rand * min;
    }
  } else {
    if (min > max) {
      const tmp = min;
      min = max;
      max = tmp;
    }

    return rand * (max - min) + min;
  }
};
