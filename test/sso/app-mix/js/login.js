
var ua = navigator.userAgent;
var isWeixin = /MicroMessenger/i.test(ua);
var isDingding = /DingTalk/i.test(ua);
var sso = 'https://sso.dinghuo123.com';

// 安卓输入会弹起错位，验证码出现时也会出现滚动，因此动态设置链接的margin-top值
function setLinkPos() {
	var bodyObj = document.getElementsByTagName('body');
	var bodyHeight = bodyObj[0].clientHeight;
	var mainHeight = document.getElementById('main').clientHeight;
	document.getElementById("bottomBtn").style.marginTop=(bodyHeight-mainHeight-30)+'px';
}
setLinkPos();

//钉钉显示绑定
if(isDingding){
  $('.ptips').show();
  setLinkPos();
}

//获取公司信息
function getCompanyInfo(){
	var params = Public.getParam();
	var clientId = params.client;
	var url = sso + '/isv/'+clientId+'/certify'
	$.ajax({
			url: url,
			data: {
				ck: params.ck
			},
			success:function(res){
					if(res.code === 200){
							var companyName = res.data.companyName || '易订货';
							$('title').text(companyName + '在线订货平台');
							$('#companyNameSelector').text(companyName);
					}else{
						Public.tips({ content: res.message || '网络请求失败，请稍后再试！'});
					}
			},
			error:function(responseText){
				Public.tips({ content:responseText || '网络请求失败，请稍后再试！'});
			}
    })
}
getCompanyInfo();


// 先判断有没有dbid，若没有就不显示开放商城，有则再次请求判断是否开启了开放商城
function isShowReg() {
	var dbid = Public.getParam()['dbid'];

	if (dbid) {
		//请求判断是否开始开放商城
		$.ajax({
			url: "https://agent.dinghuo123.com/v2/share/openMall/store/register/setting",
			data: {"dbid":dbid},
			type: "get",
			dataType: "json",
			crossDomain: true,
			success:function(result){
				if (result.code==200) {
					var regObj = result.data.registerSetting;
					if (regObj.isOpen=="1") {
						$("#btnReg").attr("href",regObj.registerUrl);
						$("#bottomMargin").addClass("dib");
						$("#btnReg").addClass("dib");
					}
				}

			},
			error:function(){
			}
		});
	}
}
isShowReg();

var loginErrorCount = 0;
$('#login').click(function(e){
	e.preventDefault();
	var $_this = $(this);
	var username = $.trim($('.user-name').val());
	if(username === '') {
		$.pops.alert({
			content:'用户名不能为空！',
		});
		return false;
	};
	var password = $.trim($('.password').val());
	if(password === '') {
		$.pops.alert({
			content:'密码不能为空！',
		});
		return false;
	};
	var postData = {};
	postData.userName = username;
	postData.password = password;
	postData.verfCode = $.trim($("input[name=verifyCode]").val());

	$.ajax({
		url: sso + "/v2/app/token",
		data: postData,
		type: "POST",
		dataType: "json",
		beforeSend: function(){
			$_this.val("正在登录...").attr("disabled",true);
		},
		success:function(response){
			if(response.code === 200){
				locationTo(response.data.jwtToken);
				// $("input[name=lt]").val(responseText.split("OK_")[1]);
				// $_this.removeAttr("disabled").val("重新登录");
			}
			else{
				var message = response.message;
				if(message == "login_error"){
					loginErrorCount++;
					Public.tips({ content:'手机号码/账号或密码错误！'});
					$_this.removeAttr("disabled").val("重新登录");
					if(loginErrorCount >= 3){
						$(".verifyCode-box").show();
						setLinkPos();
					}
					ChangeFnCode();
				}else if(message == "need_verfCode"){
					Public.tips({ content:'请输入验证码！'});
					$(".verifyCode-box").show();
					$_this.removeAttr("disabled").val("重新登录");
					ChangeFnCode();
				}else if(message == "wrong_verfCode"){
					Public.tips({ content:'验证码输入错误！'});
					$_this.removeAttr("disabled").val("重新登录");
				}else if(message == "user_disabled"){
					Public.tips({ content:'账户已被禁用，请联系厂商（管理员）开通'});
					$(".verifyCode-box").show();
					$_this.removeAttr("disabled").val("重新登录");
					ChangeFnCode();
				}else if(message.indexOf("limit") != -1){
					Public.tips({ content:'连续输错密码五次,请30分钟后再试!'});
					$_this.removeAttr("disabled").val("重新登录");
				}else{
					Public.tips({ content:responseText.message});
					$_this.removeAttr("disabled").val("重新登录");
					ChangeFnCode();
				}
				$_this.removeAttr("disabled").val("重新登录");
			}
		},
		error:function(){
			Public.tips({ content:'网络请求失败，请稍后再试！'});
			$_this.removeAttr("disabled").val("重新登录");
		}
	});
});

//由后台确定跳转到哪里
function locationTo(jwt){
    var params = Public.getParam();
	var clientId = params.client;
    var url = sso + '/thirdparty/'+clientId+'/bind'+window.location.search;
    $.ajax({
        url:url,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", jwt);
        },
        success:function(res){
            if(res.code === 200){
                window.location.href = res.data.locationUrl;
            }else{
							Public.tips({ content: res.message});
						}
						$('#login').removeAttr("disabled").val("重新登录");
        },
        error:function(responseText){
					Public.tips({ content:responseText || '网络请求失败，请稍后再试！'});
					$('#login').removeAttr("disabled").val("重新登录");
        }
    })
}

//点击切换验证码
$('img','.verifyCode-box').on('click',function(e){
	ChangeFnCode();
});
function ChangeFnCode(){
	$_this = $('img','.verifyCode-box');
	var time = new Date();
	time = Date.parse(time);
	$_this.attr('src','/verifyCode?v='+time)
}
