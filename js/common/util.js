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
}