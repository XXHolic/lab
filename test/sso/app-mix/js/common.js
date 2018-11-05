/*
 *公共提示
 *示例：Public.tips({ content:'会话已过期，请重新登录！'});
*/
var Public = {};

/*根据当前URL或者传入URL获取参数值*/
Public.getParam = function(url) {
	// return $.uriAnchor.makeAnchorMap();
	var param, theRequest = {};	//url = str,
	!url && (url = window.location.search);
		if (url.indexOf("?") != -1) {
			var str = url.split('?')[1];
			strs = str.split("&");
			for(var i = 0, len = strs.length; i < len; i ++) {
				param = strs[i].split("=");
				theRequest[param[0]]=decodeURIComponent(param[1]);
			}
		}
	return theRequest;
};

Public.tips = function(options){ return new Public.Tips(options); }
Public.Tips = function(options){
	var defaults = {
		renderTo: 'body',
		removeOthers : true,
		autoClose: true,
		time : undefined
	}
	this.options = $.extend({},defaults,options);
	this._init();

	!Public.Tips._collection ?  Public.Tips._collection = [this] : Public.Tips._collection.push(this);

}

Public.Tips.removeAll = function(){
	try {
		for(var i=Public.Tips._collection.length-1; i>=0; i--){
			Public.Tips._collection[i].remove();
		}
	}catch(e){}
}

Public.Tips.prototype = {
	_init : function(){
		var self = this,opts = this.options,time;
		if(opts.removeOthers){
			Public.Tips.removeAll();
		}

		this._create();

		if(opts.autoClose){
			time = opts.time || 2000;
			window.setTimeout(function(){
				self.remove();
			},time);
		}

	},

	_create : function(){
		var opts = this.options, self = this;
		this.obj = $('<div class="ui-tips"><span></span></div>');
		this.obj.find('span').append(opts.content);
		//$('body').append('<div class="ui-tips"><span>' + opts.content + '</span></div>');
		this.obj.appendTo('body').show();
	},

	remove : function(){
		var opts = this.options;
		this.obj.remove();
	}
};

Public.getDeviceType = function () {
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
