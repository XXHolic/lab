/*! TenVideoPlayer_V2 - v2.0.0 - 2016-02-19 16:19:33
 * Copyright (c) 2016
 * Powered by Tencent-Video Web Front End Team 
 */
! function(a, b) { a.html5lang = { errMsg: { "default": "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5", 0: "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25", 68: "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5", "-1": "\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5", "-2": "\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5", "-3": "\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5", "-4": "\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5", "-6": "\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5", "-7": "\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5", 50: "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5", 52: "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u6682\u65e0\u6cd5\u89c2\u770b", 64: "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u6682\u65e0\u6cd5\u89c2\u770b", 51: "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u6682\u65e0\u6cd5\u89c2\u770b", 61: "\u5f53\u524d\u89c6\u9891\u5df2\u4e0b\u67b6\uff0c\u6682\u65e0\u6cd5\u89c2\u770b", 62: "\u5f53\u524d\u89c6\u9891\u4e0d\u5b58\u5728\uff0c\u6682\u65e0\u6cd5\u89c2\u770b", 63: "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u6682\u65e0\u6cd5\u89c2\u770b", 65: "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u6682\u65e0\u6cd5\u89c2\u770b", 67: "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u6682\u65e0\u6cd5\u89c2\u770b", 69: "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u6682\u65e0\u6cd5\u89c2\u770b", 71: "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u6682\u65e0\u6cd5\u89c2\u770b", 73: "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u6682\u65e0\u6cd5\u89c2\u770b", 74: "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u6682\u65e0\u6cd5\u89c2\u770b", 76: "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5", 77: "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5", 80: { 0: "\u56e0\u7248\u6743\u9650\u5236,\u8bf7\u5230\u817e\u8baf\u89c6\u9891\u89c2\u770b", 1: "\u5f88\u62b1\u6b49\uff0c\u5f53\u524dIP\u5730\u5740\u6240\u5728\u5730\u533a\u6682\u4e0d\u652f\u6301\u64ad\u653e", 2: "\u56e0\u7248\u6743\u9650\u5236\uff0c\u6682\u4e0d\u652f\u6301\u64ad\u653e", callback: function(b, c, d) {
                    if (0 == parseInt(c) && a.app && d && d.vid) {
                        var e = a.html5skin.errorDownloader;
                        a.app.check(d).done(function(a) {
                            if (a.url) {
                                var c = b.find(".tvp_player_error_content");
                                c = b;
                                var d = b.find(".text").html();
                                d = d.substr(0, d.indexOf("(")), e ? (d = e.replace("${errorMsg}", d), d = d.replace("${url}", a.url)) : d = '<a href="' + a.url + '">' + d + "</a>", c.length && c.html(d) } }) } } }, 81: "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u6682\u65e0\u6cd5\u89c2\u770b", 82: "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u6682\u65e0\u6cd5\u89c2\u770b", 83: { main: "\u8be5\u7247\u4e3a\u4ed8\u8d39\u89c6\u9891\uff0c\u8bf7\u524d\u5f80\u817e\u8baf\u89c6\u9891\u89c2\u770b", "-2": "\u8bf7\u767b\u5f55\u540e\u89c2\u770b", "-1": "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u6682\u65e0\u6cd5\u89c2\u770b", "-3": "\u8be5\u7247\u4e3a\u6570\u5b57\u97f3\u4e50\u4e13\u8f91\u72ec\u5bb6\u89c6\u9891\uff0c\u8bf7\u524d\u5f80QQ\u97f3\u4e50\u652f\u6301\u8d2d\u4e70\u540e\u67e5\u770b" }, 84: "\u5f88\u62b1\u6b49\uff0c\u6839\u636e\u60a8\u7684IP\u5730\u5740\uff0c\u6682\u65e0\u6cd5\u64ad\u653e", 85: { main: "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5", "-1": "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5", "-2": "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5", "-3": "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5", "-4": "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5", "-5": "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5", "-6": "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5" }, 86: "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5", 500: { main: "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5", 1: "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5", 2: "\u89c6\u9891\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u5237\u65b0\u9875\u9762\u91cd\u8bd5" } }, getErrMsg: function(c, d) {
            if (isNaN(c)) return "";
            if (c in a.html5lang.errMsg) {
                var e = a.html5lang.errMsg[c];
                if (0 === c && "-" + d in a.html5lang.errMsg && (e += "\uff0c" + a.html5lang.errMsg["-" + d]), b.isString(e)) return e;
                if (b.isPlainObject(e)) {
                    var f;
                    return f = d in e ? e[d] : e.main, f || a.html5lang.errMsg["default"] } }
            return a.html5lang.errMsg["default"] }, definition: { mp4: "\u9ad8\u6e05", msd: "\u6d41\u7545" }, srtLang: { 50001: { srclang: "zh-cn", desc: "\u7b80\u4f53\u4e2d\u6587" }, 50002: { srclang: "zh-cn", desc: "\u7b80\u4f53\u4e2d\u6587" }, 50003: { srclang: "zh-tw", desc: "\u7e41\u4f53\u4e2d\u6587" }, 50004: { srclang: "en", desc: "\u82f1\u6587" }, 50005: { srclang: "zh-cn,en", desc: "\u7b80\u4f53\u4e2d\u6587&\u82f1\u6587" }, 50006: { srclang: "zh-tw,en", desc: "\u7e41\u4f53\u4e2d\u6587&\u82f1\u6587" } }, durationLimit: { msg: "5\u5206\u949f\u770b\u7684\u4e0d\u591f\u723d\uff1f\u817e\u8baf\u89c6\u9891\u6709\u9ad8\u6e05\u5b8c\u6574\u7248\uff0c\u7b49\u4f60\u6765\u770b~", padMsg: "\u672c\u8282\u76ee\u53ea\u63d0\u4f9b5\u5206\u949f\u9884\u89c8\u3002\u817e\u8baf\u89c6\u9891\u5ba2\u6237\u7aef\u53ef\u4ee5\u89c2\u770b\u9ad8\u6e05\u5b8c\u6574\u7248\uff0c\u7b49\u4f60\u5594~", download: "\u4e0b\u8f7dAPP", padPlay: "\u7acb\u5373\u64ad\u653e", play: "\u7ee7\u7eed\u64ad\u653e", replay: "\u91cd\u65b0\u64ad\u653e", open: "\u53bb\u770b\u5b8c\u6574\u7248" }, liveDownloader: { downloadText: "\u4e0b\u8f7d\u817e\u8baf\u89c6\u9891\uff0c\u89c2\u770b\u89c6\u9891\u76f4\u64ad", openText: "\u6253\u5f00\u817e\u8baf\u89c6\u9891\uff0c\u89c2\u770b\u89c6\u9891\u76f4\u64ad" }, getDefiName: function(b) {
            return b in a.defaultConfig.definition ? a.defaultConfig.definition[b] : "" }, getSrtName: function(b) {
            return b in a.html5lang.srtLang ? a.html5lang.srtLang[b].desc : "" } } }(tvp, tvp.$), tvp.html5skin = { defaultError: function() {
            return [' <div class="tvp_player_error" id="$ERROR-TIPS-INNER$">', '   <div class="tvp_error_inner">', '     <div class="tvp_error_title">$ERROR-MSG$</div>', '     <div class="tvp_error_desc">$ERROR-DETAIL$</div>', '     <a href="javascript:;" data-role="error-refresh" class="tvp_btn_simple tvp_none">\u5237\u65b0</a>', "  </div>", " </div>"].join("") }(), errorDownloader: function() {
            return ['<div class="tvp_live_download_app">', '  <a class="tvp_download_app_inner" href="${url}">', '    <i class="tpv_icon_download"></i>', '   <span class="tvp_icon_text">${errorMsg}</span>', "  </a>", "</div>"].join("") }(), durationLimit: function() {
            return ['<div style="display:none" class="tvp_limit_tips" data-role="durationLimit">', '   <div class="tvp_limit_tips_inner">', '   <div class="tvp_tips_content">', '      <p class="tvp_tips_text">${msg}</p>', "   </div>", '    <div class="tvp_btn_line">', '      <span data-role="durationLimit-play" class="tvp_btn tvp_btn_try">${play}</span>', '     <span  data-role="durationLimit-replay" class="tvp_btn tvp_btn_try">${replay}</span>', '      <a data-action="applink" ${iframe} href="${url}" data-url="" data-role="durationLimit-download" class="tvp_btn tvp_btn_download">${download}</a>', '      <a data-action="applink" href="" data-url="" data-role="durationLimit-open" class="tvp_btn tvp_btn_download">${open}</a>', "    </div>", "  </div>", "</div>"].join("") }(), durationLimit_v2_case1: function() {
            return ['<div data-role="tvp-limit-case1" class="tvp_none">', '<div class="tvp_layer_replay tvp_none" data-role="tvp-limit-replay">', '<div class="tvp_overlay_replay">', '<span class="tvp_button_replay"></span>', '<span class="tvp_text" data-role="tvp-limit-replay-text">${replayText}</span>', "</div>", "</div>", '<div class="tvp_overlay_play_try tvp_none" data-role="tvp-limit-play">', '<span class="tvp_button_play"></span>', '<span class="tvp_text" data-role="tvp-limit-play-text">${playText}</span>', "</div>", '<div class="tvp_app_banner tvp_none" data-role="tvp-limit-download">', '<a data-role="tvp-limit-download-btn" href="javascript:;" class="tvp_app_btn" data-status="down">', '<span class="tvp_progress">', '<span class="tvp_progress_current"></span>', "</span>", '<span data-role="tvp-limit-download-text" class="tvp_text" data-text="${download}"></span>', "</a>", "</div>", '<div class="tvp_app_badge tvp_none" data-role="tvp-limit-timing">', '<a href="javascript:;" data-role="tvp-limit-timing-btn" class="tvp_app_btn" data-status="down">', '<span class="tvp_progress"><span class="tvp_progress_current"></span></span>', '<span class="tvp_text" data-text="\u8fd8\u5269" data-role="tvp-limit-timing-text"></span>', "</a>", "</div>", "</div>"].join("") }(), durationLimit_v2_case2: function() {
            return ['<div class="tvp_external_layer tvp_none" data-role="tvp-limit-case2">', '<div class="tvp_external_inner">', '<div class="tvp_overlay_play_try" data-role="tvp-limit-play">', '<span class="tvp_button_play"></span>', '<span class="tvp_text" data-role="tvp-limit-play-text">${playText}</span>', "</div>", '<div class="tvp_layer_replay tvp_none" data-role="tvp-limit-replay">', '<div class="tvp_overlay_replay">', '<span class="tvp_button_replay"></span>', '<span class="tvp_text" data-role="tvp-limit-replay-text">${replayText}</span>', "</div>", "</div>", '<div class="tvp_app_banner tvp_none" data-role="tvp-limit-download">', '<a href="javascript:;" class="tvp_app_btn" data-status="down" data-role="tvp-limit-download-btn">', '<span class="tvp_progress"><span class="tvp_progress_current"></span></span>', '<span data-role="tvp-limit-download-text" class="tvp_btn_text" data-text="${download}"></span>', "</a>", "</div>", "</div>", "</div>", '<div class="tvp_app_badge tvp_none" data-role="tvp-limit-timing">', '<a data-role="tvp-limit-timing-btn" href="javascript:;" class="tvp_app_btn" data-status="down">', '<span class="tvp_text" data-text="\u8fd8\u5269" data-role="tvp-limit-timing-text"></span>', "</a>", "</div>"].join("") }(), durationLimit_v2_case3: function() {
            return ['<div class="tvp_app_badge tvp_none" data-role="tvp-limit-case3">', '<a data-role="tvp-limit-timing-btn" href="javascript:;" class="tvp_app_btn" data-status="down">', '<span class="tvp_progress"><span class="tvp_progress_current"></span></span>', '<span data-role="tvp-limit-timing-text" class="tvp_text" data-text="${timingText}"></span>', "</a>", "</div>"].join("") }(), liveDownloader: function() {
            return ['<div  data-role="liveDownloader" style="z-index:10;display:none"  class="tvp_live_download_app">', '<a data-action="applink" href="${url}" data-url="${liveOpenUrl}" ${iframe} data-role="liveDownloader-btn" class="tvp_download_app_inner">', '<i class="tpv_icon_download"></i>', '<span data-role="liveDownloader-text" class="tvp_icon_text">${downloadText}</span>', "</a>", "</div>"].join("") }(), follow: function() {
            return ['<a class="tvp_follow" data-role="appfollow_followbtn" data-follow="follow">', '<span class="tvp_icon_follow"></span>', '<span class="tvp_icon_text" data-role="appfollow_followtext">\u5173\u6ce8</span>', "</a>", '<div class="tvp_follow_hint">', '<div class="tvp_hint_title">\u5173\u6ce8\u6210\u529f\uff01</div>', '<div class="tvp_hint_desc" data-role="bannerText">{FOLLOWTEXT}</div>', "</div>"].join("") }() },
    function(a, b) { a.BaseHtml5 || (a.BaseHtml5 = function() { this.protectedFn = {}, this.h5EvtAdapter = {}, this.eventList = this.eventList.concat(["html5error"]), this.html5AttrList = { autoplay: "autoplay", "x-webkit-airplay": "isHtml5UseAirPlay", "webkit-playsinline": "isiPhoneShowPlaysinline", preload: "html5Preload", loop: "html5loop" }, this.$videomod = null }, a.BaseHtml5.fn = a.BaseHtml5.prototype = new a.BasePlayer, b.extend(a.BaseHtml5.fn, { getPlayer: function() {
                return this.videoTag }, getPlayerType: function() {
                return "html5" }, createVideoHtml: function() { this.playerid = this.config.playerid, this.playerid || (this.playerid = "tenvideo_video_player_" + a.BaseHtml5.maxId++);
                var c = ['<video id="', this.playerid, '" width="100%" height="100%" '].join(""),
                    d = this;
                this.config.isHtml5UseUI && (b.os.iphone || b.os.ipod) && this.config.isIOSVideoOffset && !this.config.isiPhoneShowPlaysinline && (c += 'style="position:absolute;top:-200%;left:-200%"'), this.config.isHtml5UseUI && this.config.isHtml5ShowPosterOnStart && b.os.android && (c += b.browser.UC ? 'style="position:absolute;left:-200%;"' : 'style="position:absolute;top:-200%;"', setTimeout(function() {
                    if (d.videoTag && 1 == d.$video.size()) {
                        var a = !1;
                        d.$video.one("playing", function() { a || (a = !0, d.videoTag.style.cssText = "") }).one("tvp:h5ui:playbtn:click", function() { a || (a = !0, d.videoTag.style.cssText = "") }) } }, 100));
                for (var e in this.html5AttrList) { c += " ";
                    var f = this.html5AttrList[e],
                        g = "";
                    if ("" == f) g = "";
                    else {
                        if (!(f in this.config)) continue;
                        g = this.config[f] }
                    g !== !1 && "disabled" != g && 0 !== g && ("autoplay" == e && this.config.isHtml5ShowLoadingAdOnStart || (c += e, "autoplay" != e || 1 != g ? "" != g && (c += ["=", g].join("")) : c += '="autoplay"')) }
                if (!this.isUseControl && b.os.iphone && !this.config.isiPhoneShowPlaysinline) {
                    var h = this.config.html5ForbiddenUIFeature.join("-");
                    h.indexOf("controlbar") > -1 && (this.isUseControl = !0) }
                this.isUseControl && (c += " controls ");
                var i = this.curVideo.getPoster();
                return b.isString(i) && i.length > 0 && -1 == b.inArray("posterlayer", this.config.html5VodUIFeature) && (c += " poster='" + i + "'"), i || !this.config.pic || this.config.isHtml5UseUI || (c += " poster='" + this.config.pic + "'"), c += "></video>" }, write: function(c) {
                var d = null;
                if ("object" == b.type(c) && 1 == c.nodeType ? (d = c, this.$mod = b(c), this.modId = this.$mod.attr("id") || "") : (d = a.$.getByID(c), this.modId = c, this.$mod = b("#" + c)), d) {
                    var e = this.createVideoHtml(),
                        f = "mod_" + this.playerid;
                    d.innerHTML = '<div id="' + f + '" class="tenvideo_player">' + e + "</div>", this.videomod = b.getByID(f), this.$videomod = b(this.videomod), this.$videomod.width(b.formatSize(this.config.width)).height(b.formatSize(this.config.height)), this.videoTag = b.getByID(this.playerid), this.$video = b(this.videoTag), this.registerMonitor(), this.bindEventAdapt(), this.checkPlayerSize() } }, checkPlayerSize: function() {
                function a() { b.isFullScreen || setTimeout(function() {
                        var a = b.config.width,
                            d = b.config.height,
                            e = parseInt(c.width(), 10),
                            f = parseInt(c.height(), 10);
                        d.toString().indexOf("%") > -1 || f > e && (f = parseInt(9 * e / 16, 10), e = a, b.resize(e, f)) }, 100) }
                var b = this,
                    c = this.$videomod ? this.$videomod : this.$elements;
                this.config.isCheckPlayerSize && c && (a(), window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() { a() }, !1)) }, resize: function(a, c) { this.config.width = a, this.config.height = c;
                var d = this.$videomod ? this.$videomod : this.$elements;
                d && (d.width(b.formatSize(a)).height(b.formatSize(c)), d && d.trigger && d.trigger("tvp:resize")) }, showError: function(c, d, e) {
                var f = this;
                setTimeout(function() {
                    if (!f.videoTag || f.videoTag.paused) {
                        var g = f.getCBEvent("showError");
                        if (b.isFunction(g) && g != f.showError) g.call(f, c, d, e);
                        else if (b.isFunction(f.config.showError)) f.config.showError.call(f, c, d, e);
                        else {
                            var h = a.html5skin.defaultError,
                                i = f.playerid + "_errtips_inner",
                                j = "\u9519\u8bef\u7801:" + c,
                                k = d || 0 == d ? "_" + d : "";
                            a.html5lang.errMsg[c] && a.html5lang.errMsg[c].nocode && (k = ""), e = e || a.html5lang.getErrMsg(c, d), h = h.replace("$ERROR-TIPS-INNER$", i).replace("$ERROR-MSG$", e).replace("$ERROR-DETAIL$", "(" + j + k + ")");
                            var l = b(f.$UILayer),
                                m = b(b.trim(h)).appendTo(l).show();
                            l && 0 !== l.length || (l = b(f.videomod), l.html('<div class="tvp_container tvp_controls_hide"></div>'), l = l.find(".tvp_container")), m.appendTo(l), e.indexOf("\u5237\u65b0") > -1 && l.find('[data-role="error-refresh"]').removeClass("tvp_none").on("click touchend", function() { window.location.reload() });
                            try { a.html5lang.errMsg[c] && a.html5lang.errMsg[c].callback && a.html5lang.errMsg[c].callback(m, d, { vid: f.curVideo.getVid() }) } catch (n) {} } } }, 250), this.callCBEvent("onerror", c, d) }, isUseH5UIFeature: function(a) {
                return b.inArray(a, this.config.html5VodUIFeature) >= 0 }, isForbiddenH5UIFeature: function(a) {
                return b.inArray(a, this.config.html5ForbiddenUIFeature) >= 0 }, callProtectFn: function(a) { b.isFunction(this.protectedFn[a]) && this.protectedFn[a].call(this) }, registerMonitor: function() { b.isFunction(this.buildmonitor) && this.buildmonitor.call(this) }, bindEventAdapt: function() {
                var a = ["-empty", "-abort", "-loadstart", "-can-play", "-can-play-through", "-loaded-data", "-loaded-metadata", "-abort", "-error", "-pause", "-paused", "-waiting", "-stalled", "-suspend", "-play", "-volume-change", "-playing", "-seeked", "-seeking", "-duration-change", "-progress", "-rate-change", "-timeupdate", "-ended"],
                    c = this;
                b.each(a, function(a, d) {
                    var e = "on" + b.camelCase(d),
                        f = c.h5EvtAdapter[e];
                    (window.DEBUG || b.isFunction(f)) && c.$video.on(d.replace(/-/g, ""), function(a) {
                        var d = c.h5EvtAdapter[e];
                        b.isFunction(d) && d.call(c, this, a) }) }) } }), a.BaseHtml5.maxId = 0) }(tvp, tvp.$),
    function(a, b) {
        function c() {
            return b.os.android && !h && !b.os.HTC && !b.os.VIVO && b.os.version >= "4.0" && !(b.browser.AndriodBrowser && b.browser.version < "30") && 0 !== navigator.userAgent.indexOf("ZTE U930") }

        function d(c, d) {
            var e = c.currentTime,
                f = 0,
                g = !1,
                i = null;
            h = !0, c.play(), c.addEventListener("playing", function() { clearTimeout(i), i = setTimeout(n, 320) }, !1);
            var j = function(c, e) {
                    var f = { cmd: 3547, val: c };
                    d && d.config && (f.contentId = d.config.contentId, f.appId = d.config.appid || d.config.appId), e = e || {}, f = b.extend(f, e), a.report(f) },
                k = !1,
                l = !1,
                m = 1e4,
                n = function() { c.currentTime != e || g ? (g = !0, k && !l && (j(f, { int5: 1 }), l = !0)) : (f++, c.play(), f % 10 === 0 && c.currentTime === e && (c.load(), c.play(), k || (j(f), k = !0), i = setTimeout(n, m))) } }

        function e(c, d) { this.videoTag = null, this.$video = null, this.config.width = a.$.filterXSS(c), this.config.height = a.$.filterXSS(d), this.protectedFn = {}, this.isUseControl = !0, b.extend(this.h5EvtAdapter, { onEnded: function() {
                    if (!this.isPlayingLoadingAd() && !this.isPlayingSplit) { this.$video && this.$video.trigger && this.$video.trigger("tvp:player:ended"), this.callCBEvent("onended", f);
                        var c = "",
                            d = this.curVideo.getVidList().split("|"),
                            e = b.inArray(f, d);
                        if (e > -1 && e < d.length - 1 && (c = d[e + 1]), "" !== c) return void this.play(c);
                        this.callCBEvent("onallended"), this.$video && this.$video.trigger && this.$video.trigger("tvp:player:allended"), this.config.isHtml5ShowPosterOnEnd && this.setPoster();
                        var g = this.callCBEvent("ongetnext", f, this.curVideo);
                        g && g instanceof a.VideoInfo && this.play(g) } }, onError: function(c, d) {
                    var e = this;
                    if (a.report({ cmd: 3525, appId: this.config.appid, contentId: this.config.contentId, vid: this.curVideo.lastQueryVid, str4: navigator.userAgent }), d.target.currentSrc.indexOf(".m3u8") > 0 && (a.debug("play hls error,reload play mp4..."), e.dataset.hlsIndex || (e.dataset.hlsIndex = 1), e.curVideo.dataHls && "array" === b.type(e.curVideo.dataHls) && e.curVideo.dataHls.length > 1 && e.curVideo.dataHls[e.dataset.hlsIndex] && 0 === e.curVideo.dataHls[e.dataset.hlsIndex].indexOf("http") && e.$video && (e.$video.attr("src", e.curVideo.dataHls[e.dataset.hlsIndex]), e.$video[0] && e.$video[0].load))) return e.$video[0].load(), void e.$video[0].play();
                    var f = -1;
                    d.target && d.target.error && (f = d.target.error.code), 4 == f && this.showError(0, f) }, onPlaying: function() {
                    var a = this;
                    this.callCBEvent("onplaying", f, this.curVideo), this.isShowingDurationLimit() && this.pause(), setTimeout(function() { a.isPlayingLoadingAd() || a.isPlayingSplit || a.goOnPlaying() }, 50) }, onTimeupdate: function() { this.callCBEvent("ontimeupdate", f, this.$video), b.isFunction(this.setGoOnPlayingTime) && this.setGoOnPlayingTime() }, onPause: function() { b.os.android && this.config.isHtml5UseUI && this.$video.addClass("tvp_video_with_skin"), this.callCBEvent("onpause", f, this.$video), a.bossReport.user_action_report({ actions: "pause", vid: f }) } }) }
        if (!a.Html5Tiny) {
            var f = "",
                g = null,
                h = !1;
            e.fn = e.prototype = new a.BaseHtml5, b.extend(e.prototype, { registerPlugins: function() {
                    var c = this,
                        d = [];
                    b.each(d, function(d, e) {
                        try {
                            var f = "build" + e;
                            b.isFunction(c[f]) && c[f](c) } catch (g) { a.debug("[registerPlugins]:" + g.message) } }) }, write: function(e) { a.BaseHtml5.prototype.write.call(this, e);
                    var f = this,
                        g = a.$("#" + e);
                    g && window === top && g.height() === window.innerHeight && g.width() === window.innerWidth && window.innerHeight >= window.innerWidth && b("#" + e + " .tvp_overlay_poster").addClass("tvp_overlay_poster_auto"), this.config.specialVideoFileDomain && a.h5Helper && b.isFunction(a.h5Helper.setSpecialVideoFileDomain) && a.h5Helper.setSpecialVideoFileDomain(this.config.specialVideoFileDomain), this.registerPlugins(), this.callProtectFn("onwrite"), this.play(this.curVideo, this.config.autoplay), this.$video.one("timeupdate", function() { c() && d(f.videoTag, f) }), b.os.android && b.browser.WeChat && this.$video.one("click", function() { this.load() }), this.init_report_playtime() }, init_report_playtime: function() {
                    if (!this.has_report_playtime && !this.isPlayingSplit) { this.has_report_playtime = !0;
                        var a, c, d, e, f = 0,
                            g = this,
                            h = "tvp_report_h5_playtime",
                            i = b.getData(h),
                            j = this.$video[0],
                            k = this.curVideo.getVid(),
                            l = function() {
                                return b.isFunction(g.isPlayingLoadingAd) && g.isPlayingLoadingAd() ? !0 : !1 };
                        this.$video.on("pause", function() { l() || n() }).on("playing", function() { setTimeout(function() { l() || (n(), m()) }, 100) }).on("ended", function() {
                            if (!l()) {
                                var a = parseInt(j.currentTime);
                                o(k, f, a), n() } });
                        var m = function() { n(), e = setInterval(function() { f += 5;
                                    var a = k + "|" + f,
                                        c = parseInt(j.currentTime);
                                    c && (a += "|" + c), b.setData(h, a) }, 5e3) },
                            n = function() { e && clearInterval(e), e = null },
                            o = function(a, c, d) { g.report_playtime({ vid: a, ptime: c, currentTime: d }), b.setData(h, 0) };
                        i && i.indexOf("|") > -1 && (i = i.split("|"), a = i[0], c = i[1], d = i[2], o(a, c, d)) } }, report_playtime: function(c) {
                    var d = { ptime: c.ptime, url: c.url || top.location.href, platform: a.common.getDeviceId(), ctime: c.currentTime, vid: c.vid, pagetype: a.app && a.app.pageType ? a.app.pageType : 0, host: top.location && top.location.hostname ? top.location.hostname : window.location.hostname },
                        e = new Image,
                        f = "http://btrace.video.qq.com/kvcollect?BossId=2803&Pwd=524422958&_dc=" + Math.random();
                    f += "&" + b.param(d), e.src = f } }), b.extend(e.prototype, { pause: function() { this.videoTag.pause() }, getCurVid: function() {
                    return "" === f ? this.curVideo instanceof a.VideoInfo ? this.curVideo.getVid() : "" : f }, play: function(c, d, e) {
                    function g(e) { e = !!e, h.$video && h.$video.trigger && h.$video.trigger("tvp:video:ajaxstart", c instanceof a.VideoInfo ? c.getVid() : c, e);
                        var i, j, k = e ? h.curVideo.getHLS : h.curVideo.getMP4Url,
                            l = h.curVideo.getVid();
                        h.curVideo && l && (h.curVideo.defer_cache || (h.curVideo.defer_cache = { ad: {}, vd: {} }), !e && h.curVideo.callGetMp4UrlDefer && h.curVideo.callGetMp4UrlDefer.done(function(a) { a && b.isFunction(a.done) && (h.curVideo.defer_cache.vd[l] = a, h.curVideo.callGetMp4UrlDefer = null) }), h.curVideo.defer_cache.vd[l] || (h.curVideo.defer_cache.vd[l] = k.call(h.curVideo, c, h.isPlayingSplit)), h.curVideo.defer_cache.ad[l] || (h.curVideo.defer_cache.ad[l] = b.Deferred()), a.Html5UI && b.isFunction(a.Html5UI.fn.buildloadingAd) && h.config.isHtml5UseUI && (h.config.isHtml5ShowLoadingAdOnStart || h.config.isHtml5ShowLoadingAdOnChange) ? (h.$video.attr("tvp_loadingad_ended", 1), h.$video.off("tvp:loadingad:ended").on("tvp:loadingad:ended", function(a, c) {
                            var d = c.vid || "";
                            if (d) {
                                if (!h.curVideo.defer_cache.vd[d]) return void(i ? (h.videoTag.src = i, h.videoTag.load(), h.$video.trigger("overlay_ctrl_showloading"), h.videoTag.play()) : (h.curVideo.defer_cache.ad[d] = b.Deferred(), h.curVideo.defer_cache.ad[d].resolve()));
                                i && j(i, h.config.autoplayAfterLoadingad && !c.emptyAd), h.curVideo.defer_cache.ad[d] || (h.curVideo.defer_cache.ad[d] = b.Deferred()), h.curVideo.defer_cache.ad[d].resolve() } })) : h.curVideo.defer_cache.ad[l].resolve(), h.curVideo.defer_cache.vd[l].done(function(b) {
                            if (i = b, h.$video && h.$video.trigger && h.$video.trigger("tvp:video:ajaxsuc", b), h.config.isShowDurationLimit) try { a.html5DurationLimit.create(h) } catch (c) {}
                            var d = h.getCurVideo();
                            d.data && d.data.vl && d.data.vl.vi && d.data.vl.vi.length && d.data.vl.vi[0] && d.data.vl.vi[0].fs && h.$video.trigger("tvp:overlay:update:filesize", d.data.vl.vi[0].fs) }), j = function(a, c) { h.$UILayer && "function" === b.type(h.$UILayer.find) && h.$UILayer.find(".tvp_player_error").remove(), h.curVideo.defer_cache.vd[l] = null, h.curVideo.defer_cache.ad[l] = null, c = "undefined" == typeof c ? !1 : c, b.os.android && b.browser.wechat && (a += "&nocache=1&time=" + (new Date).getTime()), h.isGetingInfo = !1, !b.browser.WeChat && "setAttribute" in h.videoTag ? h.videoTag.setAttribute("src", a) : h.videoTag.src = a, h.$video && h.$video.trigger && h.$video.trigger("tvp:video:src"), h._isInited || (h._isInited = !0, h.callCBEvent("oninited")), h.callCBEvent("onplay", h.curVideo.lastQueryVid, h.curVideo), (d || c) && (h.videoTag.load(), h.$video.trigger("overlay_ctrl_showloading"), h.videoTag.play());
                            var e = h.curVideo.getTagStart() || h.curVideo.getHistoryStart() || 0;
                            e > 0 && h.seek(e) }, b.when(h.curVideo.defer_cache.vd[l], h.curVideo.defer_cache.ad[l]).done(function(a) { a = a || i, h.$UILayer && h.$UILayer.find(".tvp_player_error").remove(), j(a) }).fail(function(b, c) {
                            return e ? (a.debug("get hls url fail,reload mp4..."), void g(!1)) : (h._isInited || (h._isInited = !0, h.callCBEvent("oninited")), h.$video && h.$video.trigger && h.$video.trigger("tvp:video:ajaxerror"), h.$video && h.$video.trigger && h.$video.trigger("tvp:video:error", b, c), h.showError(b, c), void(h.isGetingInfo = !1)) }).always(function() { f = h.curVideo.lastQueryVid })) }
                    var h = this,
                        i = !1;
                    if (a.Html5Player && !(h instanceof a.Html5Player) && h.instance && h.instance instanceof a.Html5Player && (h = h.instance), b.isUndefined(d) && (d = !0), b.isUndefined(e) && (e = this.config.isHtml5UseHLS), b.isUndefined(c)) return h.videoTag.pause(), h.videoTag.load(), void h.videoTag.play();
                    if (c instanceof a.VideoInfo) {
                        if (i = h.curVideo._vidBeforeChange ? h.curVideo._vidBeforeChange === c.getVid() ? !1 : !0 : !1, h.isPlayingSplit && h._isInited && h.getCurVid() === c.getVid()) return;
                        if (h.dataset && (h.dataset.isVidChange = i), h.setCurVideo(c), h.curVideo._vidBeforeChange = c.getVid(), i && (h.callCBEvent("onchange", h.curVideo.getFullVid()), this.$video && this.$video.trigger && this.$video.trigger("tvp:player:videochange"), b.os.iphone)) try { h.videoTag.pause(), h.videoTag.play() } catch (j) {}
                        c.setPid(b.createGUID()), f = h.curVideo.getFullVid() }
                    h.config.isHtml5ShowPosterOnChange && h.setPoster(), h.isGetingInfo = !0;
                    try { h.videoTag.pause() } catch (j) {}
                    var k = !1; "auto" === e ? a.common.isUseHLS() ? a.h5Helper.loadIsUseHLS({ vid: f }).done(function(a) { k = 3 == a }).fail(function() { k = !1 }).always(function() { g.call(h, k) }) : (k = !1, g.call(h, k)) : (k = e, g.call(h, k)) }, goOnPlayingHandler: function(a, c, d) {
                    var e, f = "tvp_goonplaying_time",
                        g = 5,
                        h = {},
                        i = b.getData(f);
                    if (i) try { i = JSON.parse(i) } catch (j) {}
                    return "object" != typeof i && (i = []), i.length > g && i.shift(), b(i).each(function(a, c) {
                        if ("string" === b.type(c)) {
                            var d = c.split("|");
                            d && 2 === d.length && (h[d[0]] = d[1]) } }), i = h, h = null, e = function() { h = [];
                        for (var a in i) h.push(a + "|" + i[a]);
                        b.setData(f, JSON.stringify(h)) }, "get" === a ? i[c] : void("del" === a ? (i[c] = null, delete i[c], e()) : "set" === a && (i[c] = d, e())) }, setGoOnPlayingTime: function() {
                    if (!this.isPlayingSplit && this.config.isContinuePlay) {
                        var a = this.getCurTime(),
                            b = this.getDuration(),
                            c = this.getCurVid();
                        if (a = parseInt(a, 10), b = parseInt(b, 10), !(5 > a || this.isPlayingLoadingAd() || this._currentTime && this._currentTime === a)) return this._currentTime = a, 5 > b - a ? void this.goOnPlayingHandler("del", c) : void(0 !== a && a % 3 === 0 && this.goOnPlayingHandler("set", c, a)) } }, goOnPlaying: function() {
                    if (!this.isPlayingSplit && this.config.isContinuePlay && !(this.getCurTime() > 3 || this.hasShowGoOnPlaying)) {
                        var a = this.getCurVid(),
                            b = this,
                            c = this.goOnPlayingHandler("get", a),
                            d = this.$mod.find('[data-role="xubo-banner"]'),
                            e = this.$mod.find('[data-role="xubo-text"]'),
                            f = e.html(),
                            g = {};
                        if (c) { c = parseInt(c), this.seek(c);
                            var h = function() { f && (b.hasShowGoOnPlaying = !0, g.min = parseInt(c / 60), g.sec = parseInt(c % 60), f = 0 != g.min ? f.replace("{$min}", g.min + "\u5206") : f.replace("{$min}", ""), f = 0 != g.sec ? f.replace("{$sec}", g.sec + "\u79d2") : f.replace("{$sec}", ""), e.html(f), d.removeClass("tvp_none"), setTimeout(function() { d.addClass("tvp_none") }, 3e3)) };
                            h() } } }, seek: function(a) {
                    if (!isNaN(a)) { a = Math.min(a, this.getDuration() - 5), a = Math.max(a, 0);
                        var b = this,
                            c = null;
                        c && (clearTimeout(c), c = null);
                        var d = this.videoTag.seekable;
                        1 == d.length && a < d.end(0) ? this.seekTo(a) : c = setTimeout(function() { b.seek(a) }, 100) } }, seekTo: function(a) {
                    var b = this;
                    try { this.videoTag.currentTime = a, this.videoTag.paused && this.videoTag.play() } catch (c) { this.$video.one("canplay", function() { b.videoTag.currentTime = a, b.videoTag.paused && b.videoTag.play() }) } }, getCurTime: function() {
                    return this.videoTag.currentTime }, getPlaytime: function() {
                    return this.getCurTime() }, setPlaytime: function(a) { this.seek(a) }, checkIsPlayingLoop: function(a) { a = a || 0;
                    var b = this;
                    this.playinglooptimer && clearTimeout(this.playinglooptimer), 0 === this.videoTag.currentTime && 30 >= a && (this.videoTag.load(), this.videoTag.play(), this.playinglooptimer = setTimeout(function() { b.checkIsPlayingLoop(++a) }, 1e3)) }, setPoster: function() {
                    var a = this.curVideo.getPoster();
                    a || !this.config.pic || this.config.isHtml5UseUI || (a = this.config.pic), b.isString(a) && a.length > 0 ? this.videoTag.poster = a : this.hidePoster() }, hidePoster: function() { this.videoTag.removeAttribute("poster") }, getDuration: function() {
                    var a = this.curVideo.getDuration();
                    return !isNaN(a) && a > 0 ? a : this.videoTag.duration }, getFileSize: function() {
                    var a = "function" == typeof this.curVideo.getFileSize ? this.curVideo.getFileSize() : 0;
                    return !isNaN(a) && a > 0 ? a : 0 }, checkPause: function() {
                    var a = [],
                        b = this;
                    g = setInterval(function() { b.videoTag.paused || (a.push(b.videoTag.currentTime), a.length >= 2 && (0 == Math.abs(a[0] - a[1]) ? (g && clearInterval(g), a = [], b.videoTag.load(), b.videoTag.play()) : g && clearInterval(g), a = [])) }, 500) }, isPlayingLoadingAd: function() {
                    var a = 1 == this.$video.attr("data-playing-loadingad") || 1 == this.$video.attr("data-playing-adonend");
                    return a }, isPlayingFrontAd: function() {
                    return 1 == this.$video.attr("data-playing-loadingad") }, isPlayingEndAd: function() {
                    return 1 == this.$video.attr("data-playing-adonend") }, isShowingDurationLimit: function() {
                    return this.hasDurationLimit() && this.DurationLimitInstance.isShow }, hasDurationLimit: function() {
                    return this.DurationLimitInstance = this.DurationLimitInstance || this.instance && this.instance.DurationLimitInstance, this.config.isShowDurationLimit && this.DurationLimitInstance && this.DurationLimitInstance.enable } }), a.Html5Tiny = e } }(tvp, tvp.$),
    function(a, b) { b.extend(a.BaseHtml5.fn, { enterFullScreen: function() {
                var a = this,
                    b = this.$mod[0],
                    c = 0;
                if (b.webkitRequestFullScreen) return void b.webkitRequestFullScreen();
                if (this.videoTag.webkitSupportsFullscreen)
                    if (this.videoTag.readyState >= 1) this.videoTag.webkitEnterFullscreen();
                    else {
                        if (++c >= 30) return;
                        setTimeout(function() { a.enterFullScreen() }, 200) } } }) }(tvp, tvp.$),
    function(a, b) { b.extend(a.Html5Tiny.fn, { swtichDefinition: function(a) {
                if (this.curVideo.getFormat() != a) { this.pause();
                    var b = this.getCurTime(),
                        c = this,
                        d = null;
                    this.curVideo.setFormat(a), this.$video.one("canplay canplaythrough", function() { c.isDefinitionSwitching && (setTimeout(function() { c.seek(b) }, 500), d = setInterval(function() { c.videoTag.currentTime >= b && (clearInterval(d), d = null, c.isDefinitionSwitching = !1) }, 50)) }), this.isDefinitionSwitching = !0, this.play(this.curVideo) } } }) }(tvp, tvp.$),
    function(a, b) {
        function c() {}
        var d = { case1: { promotionId: 755, downloadUrl: "http://mcgi.v.qq.com/commdatav2?cmd=4&confid=755&platform=aphone", texts: { download: "\u4e0b\u8f7d\u817e\u8baf\u89c6\u9891${limitTips}", downloading: "\u6b63\u5728\u4e0b\u8f7d\u817e\u8baf\u89c6\u9891\uff0c\u9a6c\u4e0a\u5c31\u80fd\u770b\u54df", pause: "\u5df2\u6682\u505c\uff0c\u70b9\u51fb\u6062\u590d\u4e0b\u8f7d", install: "\u4e0b\u8f7d\u5df2\u5b8c\u6210\uff0c\u70b9\u51fb\u5b89\u88c5", afterInstall: "\u5b89\u88c5\u5df2\u5b8c\u6210\uff0c\u8bf7\u6253\u5f00\u817e\u8baf\u89c6\u9891\u770b\u5b8c\u6574\u7248", hasapp: "\u6253\u5f00\u817e\u8baf\u89c6\u9891${limitTips}", _downloading: "\u6b63\u5728\u4e0b\u8f7d", _pause: "\u70b9\u51fb\u6062\u590d", _install: "\u7acb\u5373\u5b89\u88c5", _afterInstall: "\u817e\u8baf\u89c6\u9891\u770b\u66f4\u591a", _afterInstall_1: "\u817e\u8baf\u89c6\u9891\u770b\u66f4\u591a", playText: "\u8bd5\u770b${limitTime}\u5206\u949f", replayText: "\u91cd\u65b0\u64ad\u653e", timingText: "\u817e\u8baf\u89c6\u9891\u770b\u66f4\u591a" } }, case2: { promotionId: 756, downloadUrl: "http://mcgi.v.qq.com/commdatav2?cmd=4&confid=756&platform=aphone", texts: { download: "\u4e0b\u8f7d\u817e\u8baf\u89c6\u9891\uff0c\u770b\u7cbe\u5f69\u5b8c\u6574\u7248", playText: "\u8bd5\u770b${limitTime}\u5206\u949f", replayText: "\u91cd\u65b0\u64ad\u653e", timingText: "\u817e\u8baf\u89c6\u9891\u770b\u66f4\u591a" } }, case3: { promotionId: 754, downloadUrl: "http://mcgi.v.qq.com/commdatav2?cmd=4&confid=754&platform=aphone", texts: { _download: "\u817e\u8baf\u89c6\u9891\u770b\u66f4\u591a", _downloading: "\u6b63\u5728\u4e0b\u8f7d", _pause: "\u70b9\u51fb\u6062\u590d", _install: "\u7acb\u5373\u5b89\u88c5", _afterInstall: "\u817e\u8baf\u89c6\u9891\u770b\u66f4\u591a", timingText: "\u817e\u8baf\u89c6\u9891\u770b\u66f4\u591a" }, per: 100, disable: [2, 3, 4, 5] } },
            e = { case_regx: [/MicroMessenger/i, /QQ\/(\d+\.(\d+)\.(\d+)\.(\d+))/i, /qqnews\/(\d+\.\d+\.\d+)/], name: "durationLimit_v2", downloader: !0, range: [1, 2] },
            f = {
                HIDE: "tvp_none"
            },
            g = { initEvent1: function() {
                    var a = this;
                    this.$video.off("play.limit").on("play.limit", function() { a.$limitPlay.addClass(f.HIDE), a.$limitRePlay.addClass(f.HIDE), a.downloaded || a.$banner.addClass(f.HIDE) }), this.$video.off("playing.limit").on("playing.limit", function() { a.showDownload && (a.updateCountDownTime(), a.$smallBtnBox.removeClass(f.HIDE)), a.$limitPlay.addClass(f.HIDE), a.$limitRePlay.addClass(f.HIDE), a.downloaded || a.$banner.addClass(f.HIDE), setTimeout(function() { a.player && a.player.isPlayingLoadingAd && a.player.isPlayingLoadingAd() && a.$smallBtnBox.addClass(f.HIDE) }, 100) }), this.$video.off("pause.limit").on("pause.limit", function() { a.player.isTouching || this.ended || (a.player.isTouching || a.$limitPlay.removeClass(f.HIDE), a.showDownload && a.showBanner && a.$banner.removeClass(f.HIDE), a.$smallBtnBox.addClass(f.HIDE), setTimeout(function() { a.hideControl() }, 500)) }), this.$video.off("ended.limit").on("ended.limit", function() { a.player && a.player.isPlayingLoadingAd && a.player.isPlayingLoadingAd() || (a.$limitRePlay.removeClass(f.HIDE), a.$limitPlay.addClass(f.HIDE), a.downloaded || a.$banner.addClass(f.HIDE), a.$smallBtnBox.addClass(f.HIDE)) }), this.$video.off("timeupdate.limit").on("timeupdate.limit", function() { a.showDownload && (a.remain = parseInt(this.duration - this.currentTime), a.updateCountDownTime()) }) }, initEvent2: function() {
                    var a = this;
                    this.$video.on("play", function() { a.$panel.addClass(f.HIDE) }), this.$video.on("playing", function() { a.showDownload && (a.updateCountDownTime(), a.$smallBtnBox.removeClass(f.HIDE)), setTimeout(function() { a.player && a.player.isPlayingLoadingAd && a.player.isPlayingLoadingAd() && a.$smallBtnBox.addClass(f.HIDE) }, 100) }), this.$video.on("pause", function() { a.player.isTouching || this.ended || (a.$panel.removeClass(f.HIDE), a.$limitPlay.removeClass(f.HIDE), a.$limitRePlay.addClass(f.HIDE), a.$smallBtnBox.addClass(f.HIDE)) }), this.$video.on("ended", function() { a.player && a.player.isPlayingLoadingAd && a.player.isPlayingLoadingAd() || (a.$limitRePlay.removeClass(f.HIDE), a.$limitPlay.addClass(f.HIDE), a.$panel.removeClass(f.HIDE), a.$smallBtnBox.addClass(f.HIDE)) }), this.$video.on("timeupdate", function() { a.showDownload && (a.remain = parseInt(this.duration - this.currentTime), a.updateCountDownTime()) }) }, initEvent3: function() {
                    var a = this,
                        b = this.$video.get(0);
                    b && this.$video.off("timeupdate.limit").on("timeupdate.limit", function() {
                        var b = parseInt(this.currentTime, 10);
                        b && a.showDownload && a.showSmallBtnOnTime(b) && (a.$panel.removeClass(f.HIDE), a.delayHideDOM()) }) }, playBtnEvent: function() {
                    var a = this,
                        b = this.$video.get(0);
                    b && (a.$video.trigger("tvp_durationlimit_show"), a.$limitPlay.on("click", function() { b.play() }), a.$limitRePlay.find(".tvp_overlay_replay").on("click", function() { b.load(), b.play() })) } },
            h = { update: function(a) {
                    var b, c, d = this; "afterInstall" === a || "hasapp" === a ? (d.downloaded = !1, b = d.conf.openUrl, c = "open") : (d.downloaded = !0, b = d.conf.downloadUrl, c = a), 1 === d.type && (d.$bannerBtn.attr({ "data-status": c, href: b }), d.$bannerTXT.attr({ "data-text": d.renderData[a] })), d.$smallBtn.attr({ "data-status": c, href: b }), d.$smallBtnTXT.attr({ "data-text": d.renderData["_" + a] }) }, onStatusChange: function() {
                    if (this.type && 2 !== this.type) {
                        var a = this;
                        this.$box.on("tvp:appdownload:complete", function() { h.update.call(a, "install") }).on("tvp:appdownload:downloading", function() { h.update.call(a, "downloading") }).on("tvp:appdownload:pause", function() { h.update.call(a, "pause") }).on("tvp:appdownload:afterInstall", function() { h.update.call(a, "afterInstall") }).on("tvp:appdownload:hasapp", function() { h.update.call(a, "hasapp") }) } }, clickReport: function() {
                    var a = this;
                    a.conf.hasApp ? (a.stepReport(6, 3), a.$btn.off("touchend.stepreport").on("touchend.stepreport", function() { a.stepReport(7, 3) })) : (b.os.ios || 2 === a.type) && (a.stepReport(1, 1), a.$btn.off("touchend.stepreport").on("touchend.stepreport", function() { a.stepReport(2, 1) })) }, setDownload1: function() {
                    var a = this;
                    this.$box = b([this.$banner.get(0), this.$smallBtnBox.get(0)]), this.$btn = b([this.$bannerBtn.get(0), this.$smallBtn.get(0)]), this.$btn.attr({ href: a.conf.url, "data-downloadUrl": a.conf.downloadUrl, "data-downloadmd5": a.conf.md5, "data-promotionid": a.conf.promotionId, "data-url": a.conf.openUrl }), this.bindDownloader(this.$box, this.$btn), h.onStatusChange.call(this) }, setDownload2: function() {
                    var c = this;
                    this.$btn = b([this.$bannerBtn.get(0), this.$smallBtn.get(0)]), this.$btn.attr({ href: c.conf.url, "data-downloadUrl": c.conf.downloadUrl, "data-downloadmd5": c.conf.md5, "data-promotionid": c.conf.promotionId, "data-url": c.conf.openUrl }), a.app.bindTryOpenAppBanner && a.app.bindTryOpenAppBanner({ $btn: c.$btn, rewriteText: a.$.noop }) }, setDownload3: function() {
                    var a = this;
                    this.$box = this.$panel, this.$btn = this.$smallBtn, this.$btn.attr({ href: a.conf.url, "data-downloadUrl": a.conf.downloadUrl, "data-downloadmd5": a.conf.md5, "data-promotionid": a.conf.promotionId, "data-url": a.conf.openUrl }), this.bindDownloader(this.$box, this.$btn), h.onStatusChange.call(this) } };
        c.prototype = { init: function(b) {
                return b && 1 != b.config.type && b.config.isHtml5UseUI && !b.config.isShortVideo ? (this.player = b, this.$video = b.$video, this.vid = b.curVideo.getVid(), this.enable = this.hasLimit(), this.type = this.getLimitCase(), this.conf = d["case" + this.type], a.app && a.app.config && (this.conf.appName = this.conf.appName || a.app.config.defaultName), this.updateUserConfig(), this.isUseCase1UI(), this.showBanner = !this.hasAppBanner(), this.whenToDisableCase3(), a.app && a.app.isSupportApp ? void(0 !== this.type && (this.enable && b.trigger && b.trigger("tvp.durationlimit.enable"), this.start())) : void(this.enable && this.macLimit())) : void 0 }, hide: function() {
                var a = this;
                a.$smallBtnBox && a.$smallBtnBox.addClass(f.HIDE), a.$limitPlay && a.$limitPlay.addClass(f.HIDE), a.$limitRePlay && a.$limitRePlay.addClass(f.HIDE), a.$limitRePlay && a.$limitRePlay.addClass(f.HIDE), a.$panel && a.$panel.addClass(f.HIDE) }, updateUserConfig: function() {
                var a = this.player.config.disableLimitBanner,
                    c = this.type + "",
                    f = this.player.config.caseSetting,
                    g = this.player.config.limitSetting;
                if (this.showDownload = !0, a && (a = a.split(","), a && a.length && b.inArray(c, a) > -1 && (this.showDownload = !1)), this.showDownload && 3 === this.type && (this.showDownload = this.randomShowSmallBtn()), f)
                    for (var h in f)
                        for (var i in f[h]) "object" === b.type(f[h][i]) ? b.extend(d[h][i], f[h][i]) : d[h][i] = f[h][i];
                g && b.extend(e, g), b.extend(this.conf, e) }, isUseCase1UI: function() { 2 === this.type && this.showDownload === !1 && this.player.config.useLimitCase1UI === !0 && (this.type = 1, this.conf = d["case" + this.type], this.conf.appName = this.conf.appName || a.app.config.defaultName) }, hasLimit: function() {
                var a = this.player.curVideo.data;
                return a && a.exem && a.preview ? (this.player.curVideo.setDuration(a.preview.toString()), this.preview = a.preview, this.remain = a.preview, !0) : !1 }, getLimitCase: function() {
                var a = navigator.userAgent.toLowerCase(),
                    c = e.case_regx,
                    d = !1;
                return b(c).each(function(b, c) {
                    return c.test(a) ? (d = !0, !1) : void 0 }), this.enable ? d ? 1 : 2 : d ? 3 : 0 }, start: function() {
                var a = this;
                this.getOnlineTipsText().done(function() {
                    try { a.showReport(), a.tipsSetting(), a.render(), a.initDOM(), a.initDisplay() } catch (c) {}
                    var d = g["initEvent" + a.type]; "function" === b.type(d) && d.call(a), a.showDownload && a.initDownload(), (1 === a.type || 2 === a.type) && g.playBtnEvent.call(a) }) }, tipsSetting: function() {
                var a = "\u770b\u7cbe\u5f69\u5b8c\u6574\u7248",
                    b = d["case" + this.type].texts,
                    c = "case" + this.type;
                a = this.bannerTips ? this.bannerTips : a;
                for (var e in b) d[c].texts[e] = (d[c].texts[e] + "").replace("${limitTips}", ", " + a) }, render: function() {
                var c = a.html5skin[e.name + "_case" + this.type],
                    f = d["case" + this.type],
                    g = f.texts,
                    h = this.preview - 29;
                g && (h = 0 > h ? 1 : Math.ceil(h / 60), g.limitTime = h, c = b.formatTpl(c, g), this.renderData = g, this.$mod = this.player.$UILayer || this.player.$videomod, this.$mod.addClass("tvp_container"), this.element = b(c).appendTo(this.$mod)) }, initDOM: function() { this.$mod && (1 === this.type ? (this.$panel = this.$mod.find('[data-role="tvp-limit-case1"]'), this.$limitRePlay = this.$mod.find('[data-role="tvp-limit-replay"]'), this.$limitPlay = this.$mod.find('[data-role="tvp-limit-play"]'), this.$banner = this.$mod.find('[data-role="tvp-limit-download"]'), this.$bannerBtn = this.$banner.find('[data-role="tvp-limit-download-btn"]'), this.$bannerTXT = this.$banner.find('[data-role="tvp-limit-download-text"]'), this.$smallBtnBox = this.$mod.find('[data-role="tvp-limit-timing"]'), this.$smallBtn = this.$smallBtnBox.find('[data-role="tvp-limit-timing-btn"]'), this.$smallBtnTXT = this.$smallBtnBox.find('[data-role="tvp-limit-timing-text"]'), this.$remain = this.$smallBtn.find('[data-role="tvp-limit-timing-text"]')) : 2 === this.type ? (this.$panel = this.$mod.find('[data-role="tvp-limit-case2"]'), this.$limitPlay = this.$mod.find('[data-role="tvp-limit-play"]'), this.$limitRePlay = this.$mod.find('[data-role="tvp-limit-replay"]'), this.$banner = this.$mod.find('[data-role="tvp-limit-download"]'), this.$bannerBtn = this.$banner.find('[data-role="tvp-limit-download-btn"]'), this.$smallBtnBox = this.$mod.find('[data-role="tvp-limit-timing"]'), this.$smallBtn = this.$smallBtnBox.find('[data-role="tvp-limit-timing-btn"]'), this.$replayText = this.$limitRePlay.find('[data-role="tvp-limit-replay-text"]'), this.$remain = this.$smallBtn.find('[data-role="tvp-limit-timing-text"]')) : 3 === this.type && (this.$panel = this.$mod.find('[data-role="tvp-limit-case3"]'), this.$smallBtn = this.$panel.find('[data-role="tvp-limit-timing-btn"]'), this.$smallBtnTXT = this.$panel.find('[data-role="tvp-limit-timing-text"]')), this.$play = this.$mod.find(a.html5skin.elements.overlay.play)) }, initDisplay: function() { this.$video && this.$video[0] && !this.$video[0].paused || (1 === this.type ? (this.showDownload && this.showBanner && this.$banner.removeClass(f.HIDE), this.$panel.removeClass(f.HIDE), this.$limitPlay.removeClass(f.HIDE), this.$play.addClass(f.HIDE)) : 2 === this.type ? (this.$panel.removeClass(f.HIDE), this.showDownload && this.showBanner && this.$banner.removeClass(f.HIDE), this.$play.addClass(f.HIDE)) : 3 === this.type && this.$panel.addClass(f.HIDE)) }, randomShowSmallBtn: function() {
                if (!this.conf || "undefined" === b.type(this.conf.per)) return !1;
                var a = parseInt(100 * Math.random(), 10) + 1;
                return a > 100 - this.conf.per ? !0 : !1 }, getOnlineTipsText: function() {
                var c = b.Deferred(),
                    d = a.common.recomdTextById(this.vid),
                    e = this;
                return 1 !== this.type ? (c.resolve(), c) : (d && "string" === b(d.rmdword) && d.rmdword ? (e.bannerTips = d.rmdword, e.reportData = d, c.resolve()) : d && "function" === b.type(d.done) ? d.done(function() {
                    var b = a.common.recomdText[e.vid];
                    b && b.rmdword && (e.bannerTips = b.rmdword), e.reportData = b, c.resolve() }) : c.resolve(), c) }, showSmallBtnOnTime: function(a) {
                return 3 !== this.type ? !1 : this.isPad() ? !0 : 1 === a ? !0 : a % 30 === 0 ? !0 : !1 }, isPad: function() {
                return b.os.ipad || b.os.tablet }, updateCountDownTime: function() {
                if (this.remain && !this.downloaded) {
                    var a, b = parseInt(this.remain / 60),
                        c = this.remain % 60;
                    c = 10 > c ? "0" + c : c, b = 10 > b ? "0" + b : b, a = b + ":" + c, this.$remain.attr("data-text", "\u8fd8\u5269 " + a) } }, delayHideDOM: function(a, b) { a = a || this.$panel, b = b || 1e4;
                var c = this;
                this.delayTimer || (this.delayTimer = setTimeout(function() { c.downloaded || a.addClass(f.HIDE), c.delayTimer = null }, b)) }, showReport: function() { this.reportData && this.reportData.tab_id && this.reportData.alginfo && a.bossReport.rcmdTextReport(1, this.reportData.tab_id, this.reportData.alginfo, 1) }, getMD5: function() {
                var c = b.Deferred(),
                    d = this,
                    e = this.conf.appName;
                return this.conf.promotionId ? this.conf.md5 ? (c.resolve(), c) : (a.app.getAppMd5(this.conf.promotionId, e).done(function(a) { a && a.md5 && (d.conf.md5 = a.md5), c.resolve() }).fail(function() { c.reject() }), c) : (c.reject(), c) }, check: function() {
                var c = b.Deferred(),
                    d = this;
                return this.conf.promotionId && d.conf.downloadUrl ? (this.getMD5().done(function() {
                    return d.conf.md5 ? void a.app.check({ vid: d.vid, promotionId: d.conf.promotionId, downloadUrl: d.conf.downloadUrl, md5: d.conf.md5 }).done(function(a) { a && a.openUrl && (d.conf.hasApp = a.hasApp, "undefined" === b.type(d.conf.openUrl) && (d.conf.openUrl = a.openUrl), d.conf.url = a.url), c.resolve() }) : void c.reject() }).fail(function() { c.reject() }), c) : (c.reject(), c) }, initDownload: function() {
                var a = this;
                this.check().done(function() {
                    if (a.conf && a.conf.openUrl && a.conf.url) {
                        var c = h["setDownload" + a.type]; "undefined" !== b.type(c) && (c.call(a), h.clickReport.call(a), a.conf.hasApp && a.$box && "function" === b.type(a.$box.trigger) && a.$box.trigger("tvp:appdownload:hasapp")) } }) }, bindDownloader: function(c, d) {
                var e = this,
                    f = "string" === b.type(this.player.config.downloaderCallback) ? this.player.config.downloaderCallback : !1,
                    g = { downloader: e.conf.downloader, downloadUrl: e.conf.downloadUrl, md5: e.conf.md5, range: e.conf.range };
                if (!this.hascheckDownloader) { this.hascheckDownloader = !0;
                    var h = { t: e.player, downloadInstance: e, downloadBox: c, downloadBtn: d, range: e.conf.range, appName: e.conf.appName, downloadMd5: e.conf.md5, downloaderCallback: f };
                    a.app.checkCanDownloader(e.conf.hasApp, g, h) } }, stepReport: function(c, d) {
                var e = this,
                    f = e.player,
                    g = { cmd: 3537, int5: c, str4: d, str8: b.getUrlParam("mmuin"), val: c };
                g.int6 = e.conf.promotionId, a.app.report(g, f) }, hasAppBanner: function() {
                var a = this;
                return b.createAppFollow || a.player && a.player.config && a.player.config.plugins && (a.player.config.plugins.AppBanner || a.player.config.plugins.AppFollow) ? !0 : !1 }, whenToDisableCase3: function() {
                if (3 === this.type) {
                    var c = this;
                    if ("all" === this.conf.disable) return void(this.showDownload = !1);
                    if (b.isArray(c.conf.disable)) {
                        var d = function() {
                            var b, c, d = a.app.pageType;
                            try { c = top.location.host } catch (e) { c = null }
                            return b = 1 === d ? "mp.weixin.qq.com" === c ? 1 : "view.inews.qq.com" === c ? 2 : 3 : 2 === d ? "view.inews.qq.com" === c ? 4 : 5 : 3 === d ? 6 : 7 };
                        b.inArray(d(), c.conf.disable) > -1 && (this.showDownload = !1) } } }, hideControl: function() { this.player && this.player.hideControl && this.player.hideControl() }, macLimit: function() {
                var c = a.common.isMac();
                if (c) {
                    var d, e, f, g, h = this.player.$UILayer,
                        i = this.player.$video,
                        j = i.parent().find("video"),
                        k = this;
                    if (e = h.find('[data-role="tvp_fn_tips_box"]')) { f = e.find('[data-role="tvp_fn_tips_text"]'), g = window.txv && txv.login && "function" === b.type(txv.login.openLogin), d = "v.qq.com" === window.location.hostname ? g ? '<span style="cursor: pointer;" class="tvp_link tvp_fn_openLogin">\u767b\u5f55</span>\u540e\u53ef\u89c2\u770b\u5b8c\u6574\u7248' : '<a class="tvp_link" href="http://v.qq.com/">\u767b\u5f55</a>\u540e\u53ef\u89c2\u770b\u5b8c\u6574\u7248' : '\u5728<a class="tvp_link" href="http://v.qq.com/">v.qq.com</a>\u767b\u5f55\u540e\u53ef\u89c2\u770b\u5b8c\u6574\u7248';
                        var l = function() { f.html(d), "v.qq.com" === window.location.hostname && a.$(".tvp_fn_openLogin").off("click").on("click", function() { window.txv && txv.login && txv.login.openLogin && (k.player && k.player.checkIsFullScreen && k.player.checkIsFullScreen() && k.player.cancelFullScreen(), txv.login.openLogin()) }), setTimeout(function() {
                                return "function" === b.type(k.player.isPlayingLoadingAd) && k.player.isPlayingLoadingAd() ? void e.addClass("tvp_none") : void e.removeClass("tvp_none") }, 300) };
                        j.on("playing", function() { l() }) } } }, clear: function() { this.$video.off("play.limit").off("playing.limit").off("pause.limit").off("timeupdate.limit").off("ended.limit"), 1 === this.type ? this.$panel.remove() : 2 === this.type ? (this.$panel.remove(), this.$smallBtnBox.remove()) : 3 === this.type && this.$panel.remove(), this.$video.trigger("tvp_durationlimit_hide") } }, a.html5DurationLimit = { create: function(b) { b.DurationLimitInstance && "function" === a.$.type(b.DurationLimitInstance.clear) && b.DurationLimitInstance.clear(), b.DurationLimitInstance = new c;
                try { b.DurationLimitInstance.init(b) } catch (d) {}
                return b.DurationLimitInstance } }
    }(tvp, tvp.$),
    function(a, b) {
        function c() { this.start = a.$.now(), this.end = 0 }

        function d(d, e) { this.vid = d || "", this.player = e, this.rid = e.curVideo.getRid() || b.createGUID(), this.pid = e.curVideo.getPid() || b.createGUID(), this.reportTimer = {};
            var f = b.isFunction(e.getPlayerType) ? e.getPlayerType().toUpperCase() : "",
                g = "http://rcgi.video.qq.com/report/play?",
                h = this.getplatform(),
                i = ["TenPlayer", f, "V2.0"].join(""),
                j = { version: i, vid: this.vid, rid: this.rid, pid: this.pid, url: window != top ? document.referrer : document.location.href, platform: h, ptag: b.cookie.get("ptag"), pfversion: b.os.version, appid: e.config.appid };
            this.getStepName = function(a) {
                return "report_" + a }, this.addStep = function(a) { this.reportTimer[this.getStepName(a)] = new c }, this.delStep = function(a) { delete this.reportTimer[this.getStepName(a)] }, this.report = function(c, d, f) {
                var h = [],
                    i = {},
                    k = {},
                    l = g;
                if (c) { b.extend(k, j), "object" == typeof f && b.extend(k, f);
                    try { i.vt = e.curVideo.data.vl.vi[0].ul.ui[0].vt } catch (m) { i.vt = 0 }
                    i.vurl = e.curVideo.url, i.bt = parseInt(e.getDuration(), 10), b.extend(k, i), k.step = c, k.ctime = b.getISOTimeFormat(), k.val = d, e && e.config && e.config.isShortVideo ? k.isshortvd = 1 : k.isshortvd = 0, k.opensource = { mqqcartoon: 1 }[a.$.getUrlParam("openS")], k.opensource || (k.opensource = 0), k.ua = navigator.userAgent;
                    for (var n in k) {
                        var o = k[n];
                        isNaN(o) && (o = encodeURIComponent("" + o)), h.push(n + "=" + o) }
                    l += h.join("&"), a.bossReport.play_report(h) } }, this.reportStep = function(b, d) {
                if (!(this.reportTimer[this.getStepName(b)] instanceof c)) return void a.debug("no timer " + b);
                var e = this.reportTimer[this.getStepName(b)].getTimelong();
                isNaN(e) || 0 >= e || e > 9e6 || (this.report(b, e, d), this.delStep(b)) } }
        c.prototype = { getTimelong: function() {
                if (this.end = a.$.now(), this.end <= 0 || this.start <= 0) return 0;
                var b = this.end - this.start;
                return 0 >= b ? 0 : b }, getSeconds: function() {
                return parseInt(this.getTimelong() / 1e3, 10) } }, d.fn = d.prototype = { getBusinessId: function() {
                if (b.browser.WeChat) return 6;
                if (b.browser.MQQClient) return 17;
                var a = "";
                if (document.location.href.indexOf("http://v.qq.com/iframe/") >= 0 && window != top) {
                    var c = document.referrer;
                    if ("" != c) {
                        var d = document.createElement("a");
                        d.href = c, a = d.hostname, d = null } } "" == a && (a = document.location.hostname || document.location.host);
                var e = [{ r: /(\w+\.)?weixin\.qq\.com$/i, v: 6 }, { r: /^(v|film)\.qq\.com$/i, v: 1 }, { r: /^news\.qq\.com$/i, v: 2 }, { r: /(\w+\.)?qzone\.qq\.com$/i, v: 3 }, { r: /(\w+\.)?t\.qq\.com$/i, v: 5 }, { r: /^3g\.v\.qq\.com$/i, v: 8 }, { r: /^m\.v\.qq\.com$/i, v: 10 }, { r: /3g\.qq\.com$/i, v: 12 }];
                a = a.toLowerCase();
                for (var f = 0, g = e.length; g > f; f++) {
                    var h = e[f];
                    if (h.r.test(a)) return h.v }
                return 7 }, getDeviceId: function() {
                var a = b.os,
                    c = navigator.userAgent;
                return a.ipad ? 1 : a.windows ? /Touch/i.test(c) ? 8 : /Phone/i.test(c) ? 7 : 2 : a.android ? a.tablet ? 5 : 3 : a.iphone ? 4 : a.Mac ? 9 : 10 }, getplatform: function() {
                var a = this.getBusinessId(),
                    b = this.getDeviceId();
                return 1e4 * a + 100 * b + 1 } }, a.H5Monitor = d }(tvp, tvp.$),
    function(a, b) { b.extend(a.Html5Tiny.fn, { buildmonitor: function() {
                var c = this,
                    d = null,
                    e = 0,
                    f = !1;
                this.$video.on("playing", function() { setTimeout(function() { c.isPlayingLoadingAd() && (c.hasAds = !0, d.reportStep(7, { val1: 1 })) }, 90) }), this.$video.on("tvp:video:ajaxstart", function(b, e, g) { f = g, d = null, d = new a.H5Monitor(e, c), d.addStep(f ? 1009 : 1011), d.addStep(7) }).on("tvp:video:ajaxsuc", function() { d.report(3, 1), d.reportStep(f ? 1009 : 1011, { val1: 1, val2: 0 }) }).on("tvp:video:src", function() { e = 0, d.report(4, 1, { val2: 1 }), d.addStep(6), d.addStep(30), c.$video.one("canplay", function() { d.reportStep(30, { val1: 0, val2: 2 }) }).one("error", function() { d.reportStep(30, { val1: 1, val2: 2 }), d.report(5, 0, { val1: 3 }) }).one("playing", function() { d.reportStep(6, { val1: c.hasAds ? 4 : 1 }), d.addStep(5), h({ itype: 1 }), c.$video.one("tvp:player:ended", function() { d.reportStep(5, { val1: 1 }), h({ itype: 2 }) }).one("tvp:player:videochange", function() { d.reportStep(5, { val1: 2 }), h({ itype: 3 }) }) }) }).on("waiting", function() { 1 != ++e && (c.isDefinitionSwitching || c.isTouching || (d.addStep(31), c.$video.one("timeupdate", g))) }).one("tvp:h5ui:playbtn:click", function() { h({ itype: 4 }) });
                var g = function() {
                        var a = d.reportTimer[d.getStepName(31)],
                            b = 0;
                        return a ? (b = a.getTimelong(), d.report(31, Math.min(1e4, b), { val1: b > 1e4 ? 1 : 0, val2: 2, "ptime ": c.videoTag.currentTime }), void c.$video.off("timeupdate", g)) : void c.$video.off("timeupdate", g) },
                    h = function(d) { d = d || {};
                        var e = { cmd: 3533, appId: c.config.appid || 0, contentId: c.config.contentId || "", vid: c.curVideo.getFullVid(), init5: c.hasDurationLimit() ? 1 : 0 };
                        e = b.extend(e, d), a.report(e) } } }) }(tvp, tvp.$),
    function(a, b) {
        function c(c, d) { this.isUseControl = !1, this.config = b.extend({}, this.config), this.config.width = a.$.filterXSS(c), this.config.height = a.$.filterXSS(d), this.control = null, this.$UILayer = null;
            var e = this;
            b.extend(this.protectedFn, { onwrite: function() {
                    var c = [];
                    c[0] = (new Date).getTime();
                    var d = a.html5skin.noSVGClassName;
                    b.isString(d) && d.length > 0 && !a.common.isSupportSVG() && this.videomod.classList.add(d), this.control = new a.Html5UI(e), this.control.init(), this.$UILayer = this.control.$UILayer, c[1] = (new Date).getTime(), a.report({ cmd: 3536, vid: this.getCurVid(), appId: this.config.appid, contentId: this.config.contentId, speed: c[1] - c[0] });
                    var f, g = navigator.userAgent.toLowerCase().indexOf("weibo") > -1,
                        h = this;
                    g && this.videoTag && this.videoTag.style && (f = setInterval(function() { h.videoTag.style.cssText = h.videoTag.style.cssText }, 100), setTimeout(function() { clearInterval(f) }, 6e3)) } }) }
        a.Html5Player || (c.fn = c.prototype = new a.Html5Tiny, b.extend(c.prototype, { createVideoHtml: function() {
                var b = a.Html5Tiny.prototype.createVideoHtml.call(this),
                    c = a.html5skin.getHtml(this.config);
                return c.replace("$VIDEO$", b) }, hideControl: function() { this.control.hide() }, showControl: function() { this.control.show() } }), a.Html5Player = c) }(tvp, tvp.$),
    function(a) {
        function b(a) {
            return "tagName" in a ? a : a.parentNode }

        function c(a, b, c, d) {
            var e = Math.abs(a - b),
                f = Math.abs(c - d);
            return e >= f ? a - b > 0 ? "Left" : "Right" : c - d > 0 ? "Up" : "Down" }

        function d() { j = null, k.last && (k.el.trigger("longTap"), k = {}) }

        function e() { j && clearTimeout(j), j = null }

        function f() { g && clearTimeout(g), h && clearTimeout(h), i && clearTimeout(i), j && clearTimeout(j), g = h = i = j = null, k = {} }
        if (!(a.browser.WeChat && a.browser.getNumVersion() < 5 || a.os.windows && a.browser.ie || a.isFunction(a.fn.tap))) {
            var g, h, i, j, k = {},
                l = 750;
            a(document).ready(function() {
                var m, n;
                a(document.body).bind("touchstart", function(c) { c.originalEvent && (c = c.originalEvent), m = Date.now(), n = m - (k.last || m), k.el = a(b(c.touches[0].target)), g && clearTimeout(g), k.x1 = c.touches[0].pageX, k.y1 = c.touches[0].pageY, n > 0 && 250 >= n && (k.isDoubleTap = !0), k.last = m, j = setTimeout(d, l) }).bind("touchmove", function(a) { a.originalEvent && (a = a.originalEvent), e(), k.x2 = a.touches[0].pageX, k.y2 = a.touches[0].pageY }).bind("touchend", function(b) { b.originalEvent && (b = b.originalEvent), e(), k.x2 && Math.abs(k.x1 - k.x2) > 30 || k.y2 && Math.abs(k.y1 - k.y2) > 30 ? i = setTimeout(function() { k.el && "function" == typeof k.el.trigger && (k.el.trigger("swipe"), k.el.trigger("swipe" + c(k.x1, k.x2, k.y1, k.y2)), k = {}) }, 0) : "last" in k && (h = setTimeout(function() {
                        if (k.el && "function" == typeof k.el.trigger) {
                            var b = a.Event("tap");
                            b.cancelTouch = f, k.el.trigger(b), k.isDoubleTap ? (k.el.trigger("doubleTap"), k = {}) : g = setTimeout(function() { g = null, k.el && k.el.trigger("singleTap"), k = {} }, 250) } }, 0)) }).bind("touchcancel", function() {
                    if (k.x2 && Math.abs(k.x1 - k.x2) > 30 || k.y2 && Math.abs(k.y1 - k.y2) > 30) try { i = setTimeout(function() { k.el && "function" == typeof k.el.trigger && (k.el.trigger("swipe"), k.el.trigger("swipe" + c(k.x1, k.x2, k.y1, k.y2)), k = {}) }, 0) } catch (a) { f() } else f() }), a(window).bind("scroll", f) }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(b) { a.fn[b] = function(a) {
                    return this.bind(b, a) } }) } }(tvp.$),
    function(a) {
        a.extend(tvp.html5skin, {
            html: function() {
                return ['<div class="tvp_container tvp_controls_hide">', "  <% if(!!feature.title) {%>", '    <div class="tvp_titles">', '      <strong class="tvp_title"><span></span></strong>', "    </div>", "  <% } %>", ' <div class="tvp_video">', "$VIDEO$", "</div>", "  <% if(!!feature.controlbar) {%>", ' <div class="tvp_controls">', "    <% if(!!feature.playpause) {%>", '    <div class="tvp_button tvp_playpause_button tvp_play">', '      <button type="button" title="\u64ad\u653e/\u6682\u505c"><span class="tvp_btn_value">\u64ad\u653e</span></button>', "    </div>", "    <% } %>", "   <% if(!!feature.progress) {%>", '   <div class="tvp_time_rail">', '     <span class="tvp_time_total" >', '        <span class="tvp_time_loaded" ></span>', '        <span class="tvp_time_current"><span class="tvp_time_handle"></span></span>', "     </span>", '     <span class="tvp_time_panel">', "       <% if(!!feature.timepanel) {%>", '        <span class="tvp_time_panel_current">00:00</span>', "       <% } %>", '       <span class="tvp_time_panel_split">/</span>', "       <% if(!!feature.timepanel) {%>", '        <span class="tvp_time_panel_total">00:00</span>', "       <% } %>", "      </span>", "    </div>", "    <% } %>", "    <% if(!!feature.bullet) {%>", '    <div class="tvp_barrage_switch tvp_none">', '<div class="tvp_btn_barrage" data-role="tvp-bullet-switch"><div class="tvp_btn_value">\u5f39</div></div>', "    </div>", "    <% } %>", "  <% if(!!feature.volume) {%>", '<div class="tvp_button tvp_volume tvp_none">', '<div class="tvp_btn_volume">', '<div class="tvp_icon_volume"></div>', "</div>", '<div class="tvp_volume_slider">', '<div class="tvp_volume_range">', '<div class="tvp_volume_range_current" style="height:50%">', '<div class="tvp_volume_handle"></div>', "</div>", "</div>", "</div>", "</div>", " <% } %>", "   <% if(!!feature.definition) {%>", '   <div class="tvp_button tvp_definition _tvp_definition_ tvp_none">', '     <div class="tvp_definition_button"><span>\u6e05\u6670\u5ea6</span></div>', '      <div class="tvp_definition_list"></div>', "   </div>", "    <% } %>", "   <% if(!!feature.fullscreen) {%>", '   <div class="tvp_button tvp_fullscreen_button tvp_fullscreen">', '     <button type="button" title="\u5207\u6362\u5168\u5c4f"><span class="tvp_btn_value">\u5168\u5c4f</span></button>', "   </div>", "    <% } %>", '   <span class="tvp_time_handel_hint" style="display:none"></span>', " </div>", "  <% } %>", " <% if(!!feature.overlay) {%>", '  <div class="tvp_overlay_loading tvp_none" style="z-index:5">', '    <span class="tvp_icon_loading"></span>', "  </div>", '  <div class="tvp_overlay_play">', '    <span class="tvp_button_play"></span>', '   <div class="tvp_fileszie"></div>', "  </div>", '  <div class="tvp_layer_replay tvp_none">', '   <div class="tvp_overlay_replay" data-role="tvp_replay_btn">', '     <span class="tvp_button_replay"></span><span class="tvp_text">\u91cd\u65b0\u64ad\u653e</span>', "   </div>", "  </div>", "  <% } %>", " <% if(!!feature.meta) {%>", ' <div class="tvp_meta_info">', '   <span class="tvp_meta_duration"></span>', '   <span class="tvp_meta_length"></span>', " </div>", "  <% } %>", " <% if(!!feature.bigben) {%>", ' <div class="tvp_overlay_bigben tvp_none">', '   <div class="tvp_overlay_content">', '     <i class="tvp_ico_ff_rw tvp_ico_ff"></i><span class="tvp_text tvp_overlay_bigben_text">0:00:00</span>', '     <span class="tvp_time_total_small"><span class="tvp_time_current_small"></span></span>', "    </div>", "  </div>", "  <% } %>", " <% if(!!feature.posterlayer) {%>", '  <div class="tvp_overlay_poster" style="display:none;">', '    <img class="tvp_poster_img"/>', " </div>", "  <% } %>", ' <div class="tvp_overlay_tips tvp_none" data-role="xubo-banner">', '   <div class="tvp_overlay_content">', '    <span class="tvp_text" data-role="xubo-text">\u4e0a\u6b21\u89c2\u770b\u81f3{$min}{$sec}\uff0c\u6b63\u5728\u4e3a\u60a8\u7eed\u64ad</span>', "   </div>", " </div>", " <% if(!!feature.tips) {%>", ' <div class="tvp_overlay_tips tvp_none" data-role="tvp_fn_tips_box">', '   <div class="tvp_overlay_content">', '     <span class="tvp_text" data-role="tvp_fn_tips_text"></span> ', "    </div>", "  </div>", "  <% } %>", " <% if(!!feature.loadingAd) {%>", '  <div class="tvp_ads tvp_none">', '    <div class="tvp_ads_inner" style="width:100%;height:100%;">', '     <div class="tvp_ads_content"><a href="javascript:;" class="tvp_ads_link"></a></div>', '     <div class="tvp_ads_control tvp_none">', '        <a href="javascript:;" class="tvp_ads_skip tvp_none">', '         <span class="tvp_ads_countdown"></span>', '         <span class="tvp_ads_skip_text">\u8df3\u8fc7\u5e7f\u544a</span>', '         <span class="tvp_btn_close tvp_none"></span>', "        </a>", '        <span data-role="tvp_mute_btn" class="tvp_voice_mute tvp_none"><span class="tvp_icon_voice"></span></span>', '      <div class="tvp_ads_skip_forbidden tvp_none">', '       <span class="tvp_ads_text tvp-ads-role-forbidden-title">\u5e94\u7248\u6743\u65b9\u7684\u8981\u6c42\uff0c\u597d\u83b1\u575e\u4f1a\u5458\u65e0\u6cd5\u8df3\u8fc7\u8be5\u5267\u5e7f\u544a</span>', '       <span class="tvp_ads_hint tvp-ads-role-forbidden-icon"></span>', '        <span class="tvp_ads_skip_text">\u5e7f\u544a\u5269\u4f59:</span>', '        <span class="tvp_ads_countdown">10</span> \u79d2', "      </div>", '        <div class="tvp_ads_qqvip_skip tvp_none">', '         <span class="tvp_ads_remain">\u3010\u5269\u4f59 <span class="_remain"></span> \u5219\u5e7f\u544a\u3011</span>', '         <span class="tvp_ads_desc">', '           \u60a8\u662f\u5c0a\u8d35\u7684<span class="_vipname">QQ\u4f1a\u5458</span> <span class="_remaintime"><em class="tvp_ads_num"></em>\u79d2\u540e</span>\u53ef', '           <a href="javascript:;" class="tvp_ads_skip_text">\u8df3\u8fc7\u6b64\u5e7f\u544a</a>', "         </span>", "       </div>", "      </div>", '      <a href="javascript:;" class="tvp_btn_ads_more tvp_none">', '       \u8be6\u60c5\u70b9\u51fb <i class="tvp_icon_arrow"></i>', "     </a>", '      <div class="tvp_ads_copyright tvp_none">', '        <div class="tvp_ads_text tvp-ads-role-forbidden-text">\u5e94\u7248\u6743\u65b9\u7684\u8981\u6c42\uff0c\u597d\u83b1\u575e\u4f1a\u5458\u65e0\u6cd5\u514d\u9664\u8be5\u90e8\u7535\u89c6\u5267\u7684\u5e7f\u544a\uff0c\u8bf7\u60a8\u8c05\u89e3\uff01</div>', '        <div class="tvp_ads_btn tvp-ads-role-forbidden-close">\u6211\u77e5\u9053\u4e86\uff01</div>', '        <span class="tvp_btn_close tvp-ads-role-forbidden-close">\u2715</span>', "      </div>", "    </div>", "  </div>", "  <% } %>", " <% if(!!feature.preview) {%>", '<div class="tvp_thumbs tvp_none">', '<div class="tvp_thumbs_pic">', "</div>", '<div class="tvp_thumbs_time"></div>', '<div class="tvp_thumbs_share tvp_none">\u5206\u4eab</div>', '<div class="tvp_thumbs_arrow"></div>', "</div>", " <% } %>", " <% if(!!feature.adonend) {%>", '    <a href="#" data-role="adonend-box" class="tvp_ads_go tvp_none">', '      <span class="tvp_ads_countdown" data-role="adonend-time">10</span><span class="tvp_ads_text">\u5e7f\u544a\u8be6\u60c5</span>', "    </a>", "  <% } %>", " <% if(!!feature.verticalbullet) {%>", '   <div class="tvp_barrage_grace tvp_none" data-role="tvp_vertical_bullet"></div>', "  <% } %>", "</div>"].join("") }(),
            definitionList: function() {
                return ["<% for(var i=0, len=data.list.length;i<len;i++) { %>", ' <div class="tvp_definition_item" data-fmt="<%=data.list[i].key%>">', "  <%=data.list[i].value%>", '  <% if (data.list[i].key=="fhd") { %><div class="tvp_icon_vip">\u4f1a\u5458</div><% } %>', " </div>", "<% }%>"].join("") }(),
            noSVGClassName: "tvp_no_svg",
            elements: { title: { main: ".tvp_titles", text: ".tvp_title span" }, meta: { main: ".tvp_meta_info", duration: ".tvp_meta_duration", filesize: ".tvp_meta_length" }, layer: ".tvp_container", control: ".tvp_controls", play: ".tvp_playpause_button", overlay: { play: ".tvp_overlay_play", loading: ".tvp_overlay_loading", replay: ".tvp_layer_replay", filesize: ".tvp_fileszie" }, progress: { main: ".tvp_time_rail", cur: ".tvp_time_current", loaded: ".tvp_time_loaded", total: ".tvp_time_total", handle: ".tvp_time_handle", tips: ".tvp_time_float", button: ".tvp_playpause_button" }, fullscreen: ".tvp_fullscreen_button", timePanel: { cur: ".tvp_time_panel_current", total: ".tvp_time_panel_total" }, bigben: { main: ".tvp_overlay_bigben", desc: ".tvp_overlay_bigben_text", ffrw: ".tvp_ico_ff_rw", bar: ".tvp_time_current_small" }, definition: { main: "._tvp_definition_", button: "._tvp_definition_ .tvp_definition_button > span", list: "._tvp_definition_ .tvp_definition_list" }, volume: { main: ".tvp_volume", btn: ".tvp_btn_volume", slider: ".tvp_volume_slider", total: ".tvp_volume_range", cur: ".tvp_volume_range_current" }, track: { main: "._tvp_track_", button: "._tvp_track_ .tvp_definition_button > span", list: "._tvp_track_ .tvp_definition_list" }, posterlayer: { main: ".tvp_overlay_poster", img: ".tvp_poster_img" }, tips: { main: ".tvp_overlay_tips", desc: " .tvp_overlay_tips .tvp_text" }, promotion: { main: ".tvp_promotion", link: ".tvp_promotion >a" }, loadingAd: { main: ".tvp_ads", control: ".tvp_ads_control", countdown: ".tvp_ads_countdown", skip: ".tvp_ads_skip", qqVipSkip: ".tvp_ads_qqvip_skip", forbiddenSkip: ".tvp_ads_skip_forbidden", forbiddenTitle: ".tvp-ads-role-forbidden-title", forbiddenText: ".tvp-ads-role-forbidden-text", forbiddenClose: ".tvp-ads-role-forbidden-close", forbiddenIcon: ".tvp-ads-role-forbidden-icon", more: ".tvp_btn_ads_more", adLink: ".tvp_ads_link", copyrightTips: ".tvp_ads_copyright", mutebtn: '[data-role="tvp_mute_btn"]' }, preview: { main: ".tvp_thumbs", pic: ".tvp_thumbs_pic", time: ".tvp_thumbs_time", share: ".tvp_thumbs_share", arrow: ".tvp_thumbs_arrow" } },
            getHtml: function(a) {
                var b = tvp.$.tmpl(tvp.html5skin.html),
                    c = {};
                return tvp.$.each(a.type == tvp.PLAYER_DEFINE.LIVE ? a.html5LiveUIFeature : a.html5VodUIFeature, function(a, b) { c[b] = !0 }), tvp.$.each(a.html5ForbiddenUIFeature, function(a, b) {
                    c[b] = !1
                }), b({ feature: c })
            }
        })
    }(tvp.$),
    function(a, b) {
        var c;
        a.Html5UI = function(a) { this.player = a, this.videoTag = a.getPlayer(), this.$video = a.$video, this.$mod = a.$mod, this.$UILayer = null, this.$control = null, this.feature = a.config.html5VodUIFeature, c = this, this.elements = {}, this.constvars = { progressWidth: 0 } }, a.Html5UI.fn = a.Html5UI.prototype = { getCurVideo: function() {
                return this.player.getCurVideo() }, init: function() { this.initDom(), this.controlReady() }, initDom: function() { this.$UILayer = this.$mod.find(a.html5skin.elements.layer), this.$control = this.$UILayer.find(a.html5skin.elements.control) }, controlReady: function() {
                function c(a) {
                    try {
                        var c = "build" + a;
                        b.isFunction(d[c]) && d[c](d.player, d.$video, d.$control, d.$UILayer) } catch (e) {} }
                var d = this;
                b.each(this.feature, function(e, f) {
                    if (!d.player.isForbiddenH5UIFeature(f))
                        if (f in d.player.config.html5FeatureExtJS) {
                            if ("adonend" === f && (d.player.config && !d.player.config.plugins || d.player.config && d.player.config.plugins && !d.player.config.plugins.adonend)) return;
                            var g = d.player.config.html5FeatureExtJS[f] + "?v=" + a.ts;
                            b.getScript(g, function() { c(f) }) } else c(f) }), this.player.isUseH5UIFeature("controlbar") && (this.player.config.isHtml5ControlAlwaysShow ? this.$UILayer.removeClass("tvp_controls_hide") : (this.$video.on(d.getClickName(), function(a) { d.isHidden() && (d.videoTag.currentTime || d.overlayPlayClicked) ? (d.show(), d.beginHide(3e3)) : d.hide(), a.preventDefault(), a.stopPropagation() }), this.hideControlTimer = 0, this.$video.on("play", function() { d.beginHide(3e3) }).on("pause paused", function() { d.beginHide(3e3) }))) }, beginHide: function(a) {
                var b = this;
                a = a || 3e3, this.stopHide(), this.hideControlTimer = setTimeout(function() { b.isTouching || b.hide() }, a) }, stopHide: function() { this.hideControlTimer && (clearTimeout(this.hideControlTimer), this.hideControlTimer = 0) }, hide: function() { this.$UILayer.addClass("tvp_controls_hide"), this.$control && this.$control.trigger && this.$control.trigger("tvp:control:hide"), this.$video && (this.$video.trigger("tvp:preview:hide"), this.$video.trigger("tvp:volume:hide")) }, show: function() {
                return 1 == this.$video.data("data-playing-loadingad") ? void this.hide() : (this.hideControlTimer && (clearTimeout(this.hideControlTimer), this.hideControlTimer = 0), this.$UILayer.removeClass("tvp_controls_hide"), void(this.$control && this.$control.trigger && this.$control.trigger("tvp:control:show"))) }, isHidden: function() {
                return this.$UILayer.hasClass("tvp_controls_hide") }, getDuration: function() {
                return this.player.getDuration() }, getClickName: function() {
                return b.os.hasTouch ? "touchend" : "click" } } }(tvp, tvp.$),
    function(a, b) { b.extend(a.Html5UI.fn, { buildbullet: function(b, c, d, e) { new a.Html5Bullet(b, c, d, e) } }) }(tvp, tvp.$),
    function(a, b) {
        var c = { speed: [5, 8], one_second_per_px: 65, start_postion: [50, 200], margin: 22, bullet_interval: 2, queue_wait: .5, filter: 1 / 3, full_nums: 50, ctrl_height: 120, null_tips: "\u522b\u7740\u6025\uff0c\u5f39\u5e55\u8981\u6765\u5566~_(:\u0437\u300d\u2220)_" };
        a.Html5Bullet = function(a, b, c) { this.player = a, this.$video = b, this.$UILayer = c, this.$videomod = this.player.$videomod, this.init() }, a.Html5Bullet.prototype = { init: function() {
                var a = this.player.config.html5LiveUIFeature,
                    c = this.player.config.h5LiveBullet,
                    d = this; - 1 !== a.indexOf("bullet") && c && this.player.config.isHtml5UseUI && (b(this.get_html()).appendTo(this.$videomod), this.setDomRole(), this.bulletId = this.player.curVideo.getH5BulletId(), this.bulletId && (this.check_bullet_db_switch().done(function() { d.init_events(), d.init_style(), d.set_top_values(), d.init_switch_status() }).fail(function() {}), this.player.sendMyBullet || (this.player.sendMyBullet = function(a) { d.sendMyBullet.call(d, a) }))) }, topValues: {}, bulletId: null, text_list: [], cgi_timer: null, cgi_interval: 5, cgi_timestamp: 0, bullet_timer: null, switch_open_cls: "tvp_open", switch_db_key: "tvp_switch_status", start: function() {
                var a = this;
                this.reset_animate_speed(), this.show(), a.text_list.unshift(c.null_tips), a.add_bullet(), this.text_list.length > 20 || a.request_live_cgi(), this.cgi_timer && clearInterval(this.cgi_timer), this.cgi_timer = setInterval(function() { a.request_live_cgi() }, 1e3 * this.cgi_interval), this.bullet_timer && clearInterval(this.bullet_timer), this.bullet_timer = setInterval(function() { a.add_bullet() }, 1e3 * c.bullet_interval) }, stop: function() { clearInterval(this.cgi_timer), clearInterval(this.bullet_timer), this.hide(), this.$bullet.empty() }, reset_animate_speed: function() {
                var a = this;
                setTimeout(function() { c.speed[0] = parseInt(a.$bullet.parent().width() / c.one_second_per_px), c.speed[1] = c.speed[0] + 3 }, 500) }, show: function() { this.$bullet.removeClass("tvp_none") }, hide: function() { this.$bullet.addClass("tvp_none") }, check_switch: function() {
                var a = this.$switch.hasClass(this.switch_open_cls);
                return a }, check_video: function() {
                var a, b = this.$video.get(0);
                return b ? a = b.paused ? !1 : b.ended ? !1 : !0 : !1 }, check_switch_pre_status: function() {
                var a = b.getData(this.switch_db_key);
                return "1" == a ? !0 : !1 }, update_switch_db_status: function(a) { a = "undefined" == typeof a ? 0 : 1, b.setData(this.switch_db_key, a) }, init_events: function() {
                var c = this,
                    d = "click";
                d = "fastclick", a.fastclick(this.$switch), this.$switch.off(d).on(d, function() {
                    var b = c.check_switch(),
                        d = b ? 0 : 1;
                    b ? (c.set_switch_close(), c.stop(), c.update_switch_db_status()) : (c.set_switch_open(), c.check_video() && c.start(), c.update_switch_db_status(1)), a.bossReport.report_bullet_switch({ user_action: d, lid: c.player.curVideo.getChannelId(), bulletid: c.bulletId }) });
                var e = function() { setTimeout(function() { c.reset_top_values() }, 200), c.reset_animate_speed() };
                b(window).off("orientationchange", e).on("orientationchange", e), this.player.$mod.off("tvp:bullet:enterfullscreen").on("tvp:bullet:enterfullscreen", e), this.player.$mod.off("tvp:bullet:cancelfullscreen").on("tvp:bullet:cancelfullscreen", e);
                var f = function() { c.check_switch() && c.start() },
                    g = function() { c.stop() },
                    h = function() { c.stop() };
                this.$video.off("playing.tvp_bullet").on("playing.tvp_bullet", f).off("pause.tvp_bullet").on("pause.tvp_bullet", g).off("ended.tvp_bullet").on("ended.tvp_bullet", h) }, init_style: function() { this.$videomod.css({ position: "relative" }) }, show_switch: function() { this.$switch.parent().removeClass("tvp_none") }, hide_switch: function() { this.$switch.parent().addClass("tvp_none") }, set_switch_open: function() { this.$switch.addClass(this.switch_open_cls) }, set_switch_close: function() { this.$switch.removeClass(this.switch_open_cls) }, init_switch_status: function() { this.check_switch_pre_status() ? this.set_switch_open() : this.set_switch_close() }, add_bullet: function() {
                var a = this;
                a.insert_bullet(a.text_list.shift()), a.insert_bullet(a.text_list.shift()), a.insert_bullet(a.text_list.shift()) }, sendMyBullet: function(b) {
                return (b = a.$.filterXSS(b)) ? (b = ['<span style="color:#fec800;">', b, "</span>"].join(""), this.text_list.unshift(b), !0) : !1 }, check_bullet_db_switch: function(a) {
                var c = a || b.Deferred(),
                    d = this;
                return this.request_live_cgi().done(function(a) {
                    return a && "45" == a.err_msg && !d.hasRetry ? (d.hasRetry = !0, void d.check_bullet_db_switch(c)) : (a && 1 == a.opened ? (d.show_switch(), c.resolve()) : (d.hide_switch(), c.reject()), void(a && a.comments && a.comments.length && b(a.comments).each(function(a, c) {
                        var e = b.filterXSS(c.content);
                        e && d.text_list.push(e) }))) }), c }, request_live_cgi: function() {
                if (!(this.text_list.length >= c.full_nums)) {
                    var a, d = "http://mfm.video.qq.com/live_danmu?callback=?",
                        e = b.Deferred(),
                        f = this; "https:" === location.protocol && (d = "https://sec.video.qq.com/p/mfm.video/live_danmu?callback=?");
                    var g = { last_stamp: f.cgi_timestamp, pid: f.bulletId };
                    return a = b.cookie.get("rtx_uin"), a || (a = b.cookie.get("uin")), a || (a = b.cookie.get("luin")), a && (g.uin = a), b.ajax({ url: d, cache: !1, data: g, dataType: "json", cache: !1, jsonpCallback: "tvp_request_bullet_callback_" + parseInt(1e6 * Math.random()) }).done(function(a) { a && a.loop_interval && (f.cgi_interval = parseInt(a.loop_interval)), a && a.last_stamp && (f.cgi_timestamp = a.last_stamp), a && a.comments && a.comments.length && b(a.comments).each(function(a, c) {
                            var d = b.filterXSS(c.content);
                            d && f.text_list.push(d) }), e.resolve(a) }), e } }, get_html: function() {
                var a = ['<div class="tvp_barrage_layer tvp_none" data-role="tvp-mod-bullet">', "</div>"];
                return a.join("") }, setDomRole: function() { this.$bullet = this.$videomod.find('[data-role="tvp-mod-bullet"]'), this.$switch = this.$videomod.find('[data-role="tvp-bullet-switch"]') }, reset_top_values: function() { this.topValues = {}, this.set_top_values() }, set_top_values: function() {
                for (var a = c.margin || 20, d = this.$bullet.parent().height(), d = d ? d : this.player.config.height, d = "string" == typeof d && d.indexOf("%") > -1 ? b("#" + this.player.config.modId).height() : d, e = d - c.ctrl_height, f = 3, g = f; e > g; g++) this.topValues[g] = 0, g += a }, get_one_top_value: function() {
                var a, b, c, d = [];
                for (var e in this.topValues) 0 === this.topValues[e] && d.push(e);
                return a = d.length, 0 === a ? !1 : this.filter_ctrl() ? !1 : (c = this.get_random(0, a - 1), b = d[c], this.topValues[b] = 1, b) }, get_topValue_count: function() {
                var a = [],
                    b = [];
                for (var c in this.topValues) a.push(c), 1 === this.topValues[c] && b.push(c);
                return { a: a, b: b } }, filter_ctrl: function() {
                var a = this.get_topValue_count(),
                    b = a.b.length,
                    d = a.a.length;
                return b >= d * c.filter ? 1 : 0 }, insert_bullet: function(a) {
                if (a) {
                    var d, e, f = this,
                        g = this.get_random(c.speed[0], c.speed[1]),
                        h = this.$bullet.width();
                    if (h || "number" !== b.type(this.player.config.width) || (h = this.player.config.width), e = this.get_one_top_value(), e === !1) return void f.text_list.unshift(a);
                    var i = document.createElement("div");
                    i.className = "tvp_bullet", i.style.position = "absolute", i.style.top = e + "px", i.style.right = "-" + h + "px", i.style.webkitTransform = "translate3d(0,0,0)", i.style.webkitTransition = "transform 0s linear", i.style.transition = "transform 0s linear", i.innerHTML = a, f.$bullet.get(0).appendChild(i), d = b(i).width(), i.style.right = "-" + d + "px", setTimeout(function() { f.move_bullet(i, { speed: g, width: d + h }) }, 10), setTimeout(function() { i.parentNode && i.parentNode.removeChild(i) }, 1e3 * g + 200), setTimeout(function() { "undefined" != typeof f.topValues[e] && (f.topValues[e] = 0) }, 1e3 * g * c.queue_wait) } }, move_bullet: function(a, b) {
                if (a) {
                    var c = a.style;
                    b = b || {}, b.speed = b.speed || 8, b.width = b.width || 800, c.webkitTransitionDuration = c.MozTransitionDuration = c.msTransitionDuration = c.OTransitionDuration = c.transitionDuration = b.speed + "s", c.transitionProperty = c.webkitTransitionProperty = c.MozTransitionProperty = c.msTransitionProperty = c.OTransitionProperty = "transform", c.transitionTimingFunction = c.MozTransitionTimingFunction = c.msTransitionTimingFunction = c.OTransitionTimingFunction = c.webkitTransitionTimingFunction = "linear", c.msTransform = c.MozTransform = c.OTransform = c.webkitTransform = "translate3d(-" + b.width + "px,0,0)" } }, get_random: function(a, b) {
                var c = parseInt(Math.random() * (b - a + 1) + a, 10);
                return c } } }(tvp, tvp.$),
    function(a, b) { b.extend(a.Html5UI.fn, { buildoverlay: function(c, d, e, f) {
                var g = d[0],
                    h = {},
                    i = d.parent().find("video"),
                    j = 2 === i.length ? !0 : !1,
                    k = this,
                    l = "tvp_none",
                    m = !1,
                    n = !1;
                b.each(a.html5skin.elements.overlay, function(a, b) { h[a] = f.find(b) }), c && c.config && c.config.isShortVideo && h.play.addClass("tvp_overlay_play_v2");
                var o = { showPlay: function() { h.play.removeClass(l) }, showReplay: function() { h.replay.removeClass(l) }, showLoading: function() { h.loading.removeClass(l) }, hidePlay: function() { h.play.addClass(l) }, hideReplay: function() { h.replay.addClass(l) }, hideLoading: function() { h.loading.addClass(l) } },
                    p = function() { j && "0" === b(this).attr("data-focus") || (o.hideLoading(), o.hidePlay(), o.hideReplay()) },
                    q = function() {
                        if (!(j && "0" === b(this).attr("data-focus") || !c.config.isHtml5ShowPlayBtnOnPause || k.isTouching || c.isDefinitionSwitching || m || "function" === b.type(c.isPlayingLoadingAd) && c.isPlayingLoadingAd() || c.isPlayingSplit)) {
                            var a = this.ended;
                            o.hideLoading(), a ? (o.hidePlay(), o.showReplay()) : (o.showPlay(), o.hideReplay()) } },
                    r = function() { j && "0" === b(this).attr("data-focus") || c.isDefinitionSwitching || (o.showLoading(), o.hidePlay(), o.hideReplay()) },
                    s = function() { j && "0" === b(this).attr("data-focus") || o.hideLoading() },
                    t = function() { j && "0" === b(this).attr("data-focus") || c.isDefinitionSwitching || (o.hideReplay(), o.hidePlay(), o.showLoading()) },
                    u = function() { o.hideLoading(), o.hidePlay(), o.showReplay() },
                    v = function() { m = !0 },
                    w = function() { m = !1 };
                i.on("overlay_ctrl_showplay", o.showPlay).on("overlay_ctrl_hideplay", o.hidePlay).on("overlay_ctrl_showreplay", o.showReplay).on("overlay_ctrl_hidereplay", o.hideReplay).on("overlay_ctrl_showloading", o.showLoading).on("overlay_ctrl_hideloading", o.hideLoading), i.on("tvp_durationlimit_show", v).on("tvp_durationlimit_hide", w), i.on("play", function() {}).on("canplay", function() {}).on("playing", p).on("pause", q).on("seeking", r).on("seeked", s).on("tvp_adonend_ended", u), d.on("tvp:overlay:update:filesize", function(a, b) { b && h.filesize && (b = parseInt(b / 1024), b > 1024 ? b = parseInt(b / 102.4) / 10 + "M" : b += "K", h.filesize.html(b)) }), b.os.ios ? setTimeout(function() { d.on("waiting", t) }, 50) : b.os.android && d.on("waiting", t);
                var x = function() {
                    if (c.isPlayingSplit) {
                        var b = i.filter('[data-focus="1"]');
                        return void(b && b[0] && b[0].play()) }
                    g.src && (d.trigger && d.trigger("tvp:h5ui:playbtn:click"), n || (n = !0, k.overlayPlayClicked = !0, g.currentTime || g.load()), g.paused && (g.play(), h.filesize && h.filesize.addClass("tvp_none"), o.hidePlay(), o.showLoading()), a.dataset.openLazy = !1, a.$(document).trigger("tvp:report:continue").trigger("tvp:loadingad:continue")) };
                h.play.on("click", x);
                var y = function() { o.hideReplay(), o.hidePlay(), o.showLoading(), c.seekVideoIndex(1, 0) },
                    z = function() {
                        return c.isPlayingSplit ? void y() : (d.trigger("tvp:player:videoreplay"), void(c.config.isHtml5ShowLoadingAdOnStart && c.config.isHtml5ShowLoadingAdOnReplay || (g.load(), g.play(), o.hideReplay(), o.hidePlay(), o.showLoading()))) };
                h.replay.find("[data-role=tvp_replay_btn]").on("click", z) } }) }(tvp, tvp.$),
    function(a, b) { b.extend(a.Html5UI.fn, { buildtips: function(c, d, e, f) {
                function g(a, c) { b.isUndefined(c) && (c = 5), h.main.addClass("tvp_show"), h.desc.text(a), 0 != c && setTimeout(function() { h.main.removeClass("tvp_show"), h.desc.text("") }, 1e3 * c) }
                var h = {};
                b.each(a.html5skin.elements.tips, function(a, b) { h[a] = f.find(b) }), b.extend(a.Html5Player.fn, { showTips: g }) } }) }(tvp, tvp.$),
    function(a, b) { b.extend(a.Html5UI.fn, { buildtitle: function(c, d, e, f) {
                var g = {};
                b.each(a.html5skin.elements.title, function(a, b) { g[a] = f.find(b) }), d.on("tvp:video:ajaxsuc", function() { g.text.text(c.curVideo.getTitle()) }) } }) }(tvp, tvp.$),
    function(a, b) { b.extend(a.Html5UI.fn, { buildmeta: function(c, d, e, f) {
                var g = {};
                b.each(a.html5skin.elements.meta, function(a, b) { g[a] = f.find(b) }), g.main.hide(), b.isUndefined(g.main) || 0 == g.main.length || (d.on("durationchange tvp:video:src", function() { g.duration.text(b.formatSecondsWithText(c.getDuration())), g.filesize.text(b.formatFileSize(c.getFileSize())) }), d.on("play playing", function() { g.main.hide() })) } }) }(tvp, tvp.$),
    function(a, b) { b.extend(a.Html5UI.fn, { buildplaypause: function(c, d, e, f) {
                var g = f.find(a.html5skin.elements.play),
                    h = d[0],
                    i = d.parent().find("video"),
                    j = 2 === i.length ? !0 : !1,
                    k = this,
                    l = !1;
                g.on(b.os.hasTouch && !b.os.Mac ? "touchend" : "click", function() {
                    if (j) {
                        var a = i.filter('[data-focus="1"]');
                        a && a.length && (h = a[0]) }
                    h.paused ? (l || (l = !0, h.currentTime || h.load()), h.play()) : h.pause() }), i.on("paused pause", function() { k.isTouching || g.addClass("tvp_play").removeClass("tvp_pause") }).on("play playing", function() { g.addClass("tvp_pause").removeClass("tvp_play") }) } }) }(tvp, tvp.$),
    function(a, b) { b.extend(a.Html5UI.fn, { buildtimepanel: function(c, d, e) {
                var f = {};
                b.each(a.html5skin.elements.timePanel, function(a, b) { f[a] = e.find(b) }), b.isUndefined(f.total) || 0 == f.total.length || d.on("durationchange tvp:video:src", function() { f.total.text(b.formatSeconds(c.getDuration())) }), b.isUndefined(f.cur) || 0 == f.cur.length || d.on("timeupdate", function() { f.cur.text(b.formatSeconds(this.currentTime)) }).on("tvp:player:videochange", function() { f.cur.text(b.formatSeconds(0)) }), e.bind("tvp:progress:touchstart", function(a, c) { f.cur.text(b.formatSeconds(c.time)) }) } }) }(tvp, tvp.$),
    function(a, b) { b.extend(a.Html5UI.fn, { buildprogress: function(c, d, e) {
                function f() {
                    var a, d, f, j, k, l, m = b.os.hasTouch,
                        n = { start: m ? "touchstart" : "mousedown", move: m ? "touchmove" : "mousemove", end: m ? "touchend" : "mouseup" };
                    e.find(".tvp_time_rail").on(n.start, function(b) {
                        if (b = b.originalEvent ? b.originalEvent : b, !m || b && b.touches && b.touches.length) {
                            var d;
                            d = m ? b.touches[0] : b, g.isRotate ? (a = d.pageY, j = i.cur.height()) : (a = d.pageX, j = i.cur.width()), c.isDefinitionSwitching = !1, g.isTouching = !0, g.player.isTouching = !0, h.pause(), b.preventDefault() } }).on(n.move, function(b) {
                        if (g.isTouching && (b = b.originalEvent ? b.originalEvent : b, !m || b && b.touches && b.touches.length)) {
                            var h, n, o;
                            h = m ? b.touches[0] : b, d = g.isRotate ? h.pageY : h.pageX, f = d - a, k = j + f, l = g.isRotate ? i.total.height() : i.total.width(), k = k > l ? l : 0 > k ? 0 : k, n = k / l, o = c.getDuration() * n, o = isNaN(o) ? 0 : o, g.setProgress(k, i), e.trigger && e.trigger("tvp:progress:touchstart", { pos: k, precent: n, time: o }), b.preventDefault() } }).on(n.end, function(a) {
                        if (g.isTouching) { l = g.isRotate ? i.total.height() : i.total.width();
                            var b = k / l,
                                d = c.getDuration() * b;
                            c.seek(d), e.trigger && e.trigger("tvp:progress:touchend"), g.isTouching = !1, g.player.isTouching = !1, a.preventDefault(), a.stopPropagation() } }) }
                var g = this,
                    h = d[0],
                    i = {};
                this.isTouching = !1, b.each(a.html5skin.elements.progress, function(a, b) { i[a] = e.find(b) }), (a.$.browser.qqnews || a.$.browser.kuaibao) && top.location.hostname && (top._jsBridgePageScroll_ = function() {
                    return g.isTouching ? 0 : 1 }), f(), d.bind("timeupdate", function(a) {
                    if (a = a.originalEvent ? a.originalEvent : a, !g.isHidden() && !c.isDefinitionSwitching && 4 == a.target.readyState) {
                        var b;
                        b = g.isRotate ? h.currentTime / c.getDuration() * i.total.height() : h.currentTime / c.getDuration() * i.total.width(), g.setProgress(b, i) } }), d.bind("progress", function() {
                    if (!c.isDefinitionSwitching) {
                        var a = 0;
                        h.buffered && h.buffered.length > 0 && h.buffered.end && c.getDuration() && (a = h.buffered.end(0) / c.getDuration(), a = parseInt(100 * a) + "%", i.loaded.css("width", a)) } }).bind("tvp:video:src", function() { c.isDefinitionSwitching || g.resetProgress() }), e.bind("tvp:control:show", function() {
                    var a = h.currentTime / c.getDuration() * i.total.width();
                    g.setProgress(a, i) }), b.extend(this, { resetProgress: function() { i.cur.css("width", "0px"), i.loaded.css("width", "0px") } }) }, setProgress: function(a, b) {
                var c, d = b.handle.width(),
                    e = a - d / 2;
                c = b.total.height(), c = this.isRotate ? b.total.height() : b.total.width(), e = Math.min(e, c - d), e = Math.max(e, 0), b.cur.css("width", a + "px") } }) }(tvp, tvp.$),
    function(a, b) {
        var c = null,
            d = 0,
            e = "",
            f = "",
            g = { calcTimer: null, times: 0, changeTimes: 0 };
        b.extend(a.Html5Player || {}, { isFullScreen: !1 }), b.extend(a.Html5UI.fn, { buildfullscreen: function(d, e, f, g) {
                var h = this;
                c = f.find(a.html5skin.elements.fullscreen), c.on("click", function() { b.os.android && h.player.config.isHtml5UseFakeFullScreen && e.removeClass("tvp_video_with_skin"), h.checkIsFullScreen() ? h.cancelFullScreen() : h.enterFullScreen() }), "onwebkitfullscreenchange" in g[0] ? document.addEventListener("webkitfullscreenchange", function() { document.webkitIsFullScreen ? h.enterFullScreen() : h.cancelFullScreen() }, !1) : e.bind("webkitendfullscreen ", function() { h.cancelFullScreen() }), b(document).on("keydown", function(a) { document.webkitIsFullScreen && 27 == a.keyCode && h.cancelFullScreen() });
                var i = { enterFullScreen: function() { h.enterFullScreen() }, cancelFullScreen: function() { h.cancelFullScreen() }, isFakeFullscreen: function() {
                        return h.checkIsFullScreen() } };
                a.Html5Player && a.Html5Player.fn && b.extend(a.Html5Player.fn, i), a.Html5Live && a.Html5Live.fn && b.extend(a.Html5Live.fn, i) }, fixClassName: function(a) { a ? c.removeClass("tvp_fullscreen").addClass("tvp_unfullscreen") : c.removeClass("tvp_unfullscreen").addClass("tvp_fullscreen") }, checkIsFullScreen: function() {
                return this.player && this.player.$UILayer && b.type(this.player.$UILayer.hasClass) && this.player.$UILayer.hasClass("tvp_fullscreen_mode") ? !0 : !1 }, enterFullScreen: function() { this.player.videoTag && 0 == this.player.videoTag.currentTime && b.os.ipad || (top === window || top.location.href || b.os.ios) && (this.player.config.isHtml5UseFakeFullScreen ? this.allEnterFullScreen() : this.enterRealFullScreen(), this.player.isFullScreen = !0, this.player.callCBEvent("onfullscreen", !0), a.bossReport.user_action_report({ actions: "fullscreen", vid: this.player.curVideo.getVid() })) }, cancelFullScreen: function() { this.player.config.isHtml5UseFakeFullScreen ? this.allCancelFullScreen() : this.cancelRealFullScreen(), this.player.isFullScreen = !1, this.player.callCBEvent("onfullscreen", !1), a.bossReport.user_action_report({ actions: "exitfullscreen", vid: this.player.curVideo.getVid() }) }, enterRealFullScreen: function() {
                var a = this,
                    c = a.$video,
                    d = c[0];
                d.webkitSupportsFullscreen ? d.webkitEnterFullscreen() : d.webkitRequestFullScreen && d.webkitRequestFullScreen(), (b.browser.WeChat || b.browser.MQQClient) && b.os.android || this.fixClassName(1) }, cancelRealFullScreen: function() {
                var a = this,
                    b = a.$video,
                    c = b[0];
                this.fixClassName(0), document.webkitExitFullscreen && c.webkitExitFullscreen() }, allCancelFullScreen: function() {
                var a = this.player.config.isHtml5UseFakeFullScreen,
                    c = b.os.android || b.os.ios && this.player.config.isiPhoneShowPlaysinline;
                if (a && c) try { frameElement && (frameElement.style.cssText = e), this.cancelFakeFullScreen() } catch (d) { this.player.config.isHtml5UseFakeFullScreen = !1, this.cancelRealFullScreen() } else this.cancelRealFullScreen() }, allEnterFullScreen: function() {
                var a = this.player.config.isHtml5UseFakeFullScreen,
                    c = b.os.android || b.os.ios && this.player.config.isiPhoneShowPlaysinline,
                    d = top.innerWidth;
                if (a && c) try { frameElement && (e = frameElement.style.cssText, b(frameElement).css({ position: "fixed !important", left: "0", top: "0", width: d + "px !important", height: "100%", "z-index": 1e3 })), this.enterFakeFullScreen() } catch (f) { this.player.config.isHtml5UseFakeFullScreen = !1, this.enterRealFullScreen() } else this.enterRealFullScreen() }, enterFakeFullScreen: function() {
                if (!this.checkIsFullScreen()) { this.fixClassName(1), this.$mod.trigger("tvp:bullet:enterfullscreen");
                    var a = top.innerWidth,
                        e = top.innerHeight,
                        g = (Math.ceil((e - a) / 2), this);
                    f = this.player.$videomod[0].style.cssText, this.player.$videomod.find("video").off("ended.recommendshow").on("ended.recommendshow", function() { g.$mod.trigger("tvp:recommend:showtip") }), this.player.$videomod.css({ position: "fixed !important", left: 0, top: 0, width: "100%", height: "100%", "z-index": 1e3 }), b(frameElement).css({ position: "fixed !important", width: a + "px !important", height: e + 1 + "px !important", top: "-1px", "background-color": "#000", left: 0 }), this.listenOrientationChange();
                    try { d = top.document.body.scrollTop } catch (h) {}
                    c.removeClass("tvp_fullscreen"), c.addClass("tvp_unfullscreen"), this.$UILayer.addClass("tvp_fullscreen_mode") } }, cancelFakeFullScreen: function() { this.fixClassName(0), this.$mod.trigger("tvp:bullet:cancelfullscreen");
                try { top.document.body.scrollTop = d } catch (a) {}
                f && (this.player.$videomod[0].style.cssText = f), c.removeClass("tvp_unfullscreen"), c.addClass("tvp_fullscreen"), this.$UILayer.removeClass("tvp_fullscreen_mode"), this.isRotate = !1, this.unbindOritationChange() }, listenOrientationChange: function() {
                var a = this.player,
                    c = this,
                    e = function() {
                        var e = top.innerWidth,
                            f = top.innerHeight;
                        g.s0 && g.s1 && (90 === Math.abs(top.orientation) ? (e = g.s1.width, f = g.s1.height) : (e = g.s0.width, f = g.s0.height)), window !== top && b(frameElement).css({ position: "fixed !important", width: e + "px !important", height: f + "px !important", top: 0, "background-color": "#000", left: 0 }), a.$videomod.css({ position: "fixed !important", width: e + "px !important", height: f + "px !important", top: 0, left: 0 }), c.isRotate = !1, top.document.body.scrollTop = d + 30, setTimeout(function() { top.document.body.scrollTop = d - 30 }, 10), c.$mod && c.$mod.trigger && c.$mod.trigger("tvp:recommend:orientationchange"), c.$video && c.$video.trigger && setTimeout(function() { c.$video.trigger("timeupdate"), c.$video.trigger("progress") }, 100) };
                try { c.setCalcValue(), b(top).off("orientationchange.fullscreen").on("orientationchange.fullscreen", function() {
                        return b.os.ipod ? void e() : void(g.s0 && g.s1 ? e() : c.androidScreenCalc(e)) }), b(top.document.body).on("touchmove", function(a) { a.preventDefault() }), b(document.body).on("touchmove", function(a) { a.preventDefault() }) } catch (f) {} }, androidScreenCalc: function(a) {
                var c = this;
                a = a || function() {}, g.times >= 2 || (g.times += 1, g.calcTimer = setInterval(function() { c.setCalcValue(), g.changeTimes >= 1 && (clearInterval(g.calcTimer), g.calcTimer = null, setTimeout(function() { c.setCalcValue(), a() }, 100)) }, 50), b.os.iphone && setTimeout(function() { c.setCalcValue(), a() }, 100), setTimeout(function() { g.calcTimer && clearInterval(g.calcTimer), c.setCalcValue(), a() }, 2e3)) }, setCalcValue: function() {
                var a = { width: top.innerWidth, height: top.innerHeight };
                90 === Math.abs(top.orientation) ? (g.s1 && g.s1.width !== a.width && g.changeTimes++, g.s1 = a) : (g.s0 && g.s0.width !== a.width && g.changeTimes++, g.s0 = a) }, unbindOritationChange: function() {
                try { b(top).off("orientationchange"), b(top.document.body).off("touchmove"), b(document.body).off("touchmove") } catch (a) {} } }) }(tvp, tvp.$),
    function(a, b) { b.extend(a.Html5UI.fn, { buildbigben: function(c, d, e, f) {
                var g = {},
                    h = 0;
                b.each(a.html5skin.elements.bigben, function(a, b) { g[a] = f.find(b) }), e.on("tvp:progress:touchstart", function(a, d) { g.main.show(), g.desc.text(b.formatSeconds(d.time)), g.bar.width(d.time / c.getDuration() * 100 + "%"), d.time < h ? g.ffrw.addClass("tvp_ico_rw") : g.ffrw.removeClass("tvp_ico_rw"), h = d.time }).on("tvp:progress:touchend", function() { g.main.hide(), g.desc.text("") }) } }) }(tvp, tvp.$),
    function(a, b) { b.extend(a.Html5UI.fn, { buildposterlayer: function(c, d, e, f) {
                var g = f.find(a.html5skin.elements.posterlayer.main),
                    h = g.find(a.html5skin.elements.posterlayer.img),
                    i = this,
                    j = function(a) {
                        if (a = a || c.curVideo.getPoster() || c.config.pic, 0 == a.length) {
                            var e = h.attr("src"); "" != e && (a = e) }
                        b.isString(a) && a.length > 0 ? (a = b.filterXSS(a), h.attr("src", a), (!b.os.ios || b.os.ios && b.compareVersion(b.os.version, "8.0") > -1) && d.attr("poster", a), k()) : l(), a && (d.trigger("tvp:video:setposter"), h.off("load.tvp_video_showposter").one("load.tvp_video_showposter", function() { d.trigger("tvp:video:setposter:suc") }), h.off("error.tvp_video_showposter").one("error.tvp_video_showposter", function(a, b, c) { d.trigger("tvp:video:setposter:error") })) },
                    k = function() { c && c.control && c.control.checkIsFullScreen && !c.control.checkIsFullScreen() && g.show(), d.one("play playing", l) },
                    l = function() { g.hide() };
                c.config.isHtml5ShowPosterOnStart && j(), b.extend(this, { setPoster: j, showPoster: k, hidePoster: l }), b.extend(c, { setPoster: j }), (b.os.iphone || b.os.ipod) && c.config.isiPhoneShowPosterOnPause && d.on("pause paused", function() { i.isTouching || i.setPoster() }) } }) }(tvp, tvp.$),
    function(a, b) { b.extend(a.Html5UI.fn, { buildshadow: function(a, c, d, e) {
                var f = b('<div class="tvp_shadow"></div>').appendTo(e.find(".tvp_video")),
                    g = this;
                a.config.isHtml5ControlAlwaysShow || f.bind(g.getClickName(), function(c) {
                    if (a.config && a.config.isShortVideo && a.config.html5ForbiddenUIFeature.indexOf("controlbar") > -1) {
                        var d = a.$video && a.$video[0];
                        return d && d.pause && d.play && (d.paused ? d.play() : a.config.disableShortVideoPause === !1 && d.pause()), !1 }
                    if (g.isHidden() && (g.videoTag.currentTime || g.overlayPlayClicked)) {
                        var e = b(g.videoTag); "1" != e.attr("data-playing-adonend") && (g.show(), g.beginHide(3e3)) } else g.hide();
                    c.preventDefault(), c.stopPropagation() }) } }) }(tvp, tvp.$),
    function(a, b) { b.extend(a.Html5UI.fn, { buildpromotion: function(c, d, e, f) {
                function g(c) {
                    var d = { cmd: 3526, val: c, itype: function() {
                            return b.os.iPad ? 2 : b.os.iPhone || b.os.ipod ? 1 : b.os.android ? 3 : 4 }(), url: window != top ? document.referrer : document.location.href };
                    a.report(d) }
                if (b.os.ipad) {
                    var h = {};
                    b.each(a.html5skin.elements.promotion, function(a, b) { h[a] = f.find(b) }), h.link.bind("click", function() { g(2) }), b.isString(c.config.iPadPromotionText) && c.config.iPadPromotionText.length > 0 && h.link.text(c.config.iPadPromotionText), h.main.show(), g(1) } } }) }(tvp, tvp.$),
    function(a, b) {
        function c(b, c, d, e) {
            var f = new a.Html5LoaingAd,
                g = e.find(a.html5skin.elements.loadingAd.main),
                d = g.find(a.html5skin.elements.loadingAd.control),
                h = g.find(a.html5skin.elements.loadingAd.countdown),
                i = g.find(a.html5skin.elements.loadingAd.skip),
                j = g.find(a.html5skin.elements.loadingAd.more),
                k = g.find(a.html5skin.elements.loadingAd.adLink);
            c.on("tvp:player:videochange", function() { b.config.isHtml5ShowLoadingAdOnChange && (c.attr("data-playing-loadingad", "1"), f.getAdData()) }), c.on("tvp:player:videoreplay", function() { b.config.isHtml5ShowLoadingAdOnStart && b.config.isHtml5ShowLoadingAdOnReplay && (c.attr("data-playing-loadingad", "1"), f.getAdData()) }), f.onEnd = function(a) { a = a || {}, g.addClass("tvp_none"), c.attr("data-playing-loadingad", "0");
                var d, e = function() {
                    var f = "1" === c.attr("tvp_loadingad_ended");
                    f ? c.trigger && c.trigger("tvp:loadingad:ended", { vid: b.curVideo.getVid(), emptyAd: !(!a || !a.noOrder) }) : d = setTimeout(function() { e() }, 100) };
                setTimeout(function() { clearTimeout(d) }, 6e3), e(), b.callCBEvent("onh5loadingadend") }, f.onStart = function() { c.attr("data-playing-loadingad", "1"), g.removeClass("tvp_none"), b.callCBEvent("onh5loadingadstart") }, f.create(b, { $container: g, $control: d, $countdownContainer: h, $skipLink: i, $moreLink: j, $adLink: k, $copyrightTips: g.find(a.html5skin.elements.loadingAd.copyrightTips), $qqvipSkip: g.find(a.html5skin.elements.loadingAd.qqVipSkip) }) }
        b.extend(a.Html5UI.fn, { buildloadingAd: function(d, e, f, g) {
                function h() {
                    if (!d.loadingadInited) {
                        if (d.loadingadInited = !0, !d.config.isHtml5ShowLoadingAdOnStart || d.curVideo.getPay()) return e.trigger && e.trigger("tvp:loadingad:ended", d.curVideo.getVid()), void(d.curVideo.getPay() && (d.config.isHtml5ShowLoadingAdOnStart = !1, d.config.isHtml5ShowLoadingAdOnChange = !1));
                        if ("function" != typeof a.Html5LoaingAd) {
                            var h = "//imgcache.qq.com/tencentvideo_v1/tvp/js/plugins/loadingad.js?max_age=86400";
                            return h += "&t=" + a.ts, void b.getScript(h, function() { "function" != typeof a.Html5LoaingAd ? (e.attr("data-playing-loadingad", "0"), e.trigger && e.trigger("tvp:loadingad:ended", d.curVideo.getVid())) : c(d, e, f, g) }) }
                        c(d, e, f, g) } }
                b.browser.WeChat ? (a.common.afterWeChatReady({ timeout: 5e3 }).done(function() { h() }), b(document).off("tvp:loadingad:continue").on("tvp:loadingad:continue", h)) : h() } }) }(tvp, tvp.$),
    function(a, b) { b.extend(a.Html5UI.fn, { buildverticalbullet: function(b, c, d, e) { b && b.config && b.config.useHtml5VerticalBullet && b.config.isHtml5UseUI && (!b.config.isShortVideo || b.config.longVideoID) && (b._verticalbullet = new a.VerticalBullet(b, c, d, e)) } }) }(tvp, tvp.$),
    function(a, b) {
        function c(a, c, e, f) { this.player = a, this.$video = c, this.$control = e, this.$UILayer = f, this.config = {}, b.extend(this.config, d), a.config.verticalBulletID ? this.vid = a.config.verticalBulletID : a.config.isShortVideo && a.config.longVideoID ? this.vid = a.config.longVideoID : this.vid = a.curVideo.getVid(), this.isShortVideo = a.config.isShortVideo, this.init() }
        var d = { max: 1, index: 0, speed: 1e3, maxCount: 50 };
        c.prototype = {
            init: function() { this.initRole(), this.initEvents() },
            initRole: function() { this.$bullet = this.$UILayer.find('[data-role="tvp_vertical_bullet"]') },
            initEvents: function() {
                var a = this;
                this.$video.on("playing.v_bullet", function() { a.hasInit ? a.isPlayingAd() || (a.needReInit && (a.initHTML(), a.needReInit = !1), a.show(), a.startMove()) : a.initData() }), this.$video.on("pause.v_bullet", function() { a.isPlayingAd() || (a.hide(), a.stopMove()) }), this.$video.on("ended.v_bullet", function() { a.index = 0, a.needReInit = !0 }) },
            initData: function() {
                var a = this;
                this.hasInit || (this.hasInit = !0, this.requestData().done(function() { a.initHTML(), a.isPlayingAd() || (a.show(), a.startMove()) }).fail(function() { a.player.dataset && (a.player.dataset.noShortVideoData = !0) })) },
            initHTML: function() {
                if (this.data && this.data.length) {
                    var a = this.blankData.concat(this.data.slice(0, this.config.max)),
                        b = this.renderHTML(a);
                    this.index = this.config.max - 1, this.$bullet.html(b) } },
            startMove: function() {
                var a = this;
                this.stopMove(), !this.data || this.data.length < 1 || (this.timer = setInterval(function() { a.addNext() }, this.config.speed)) },
            stopMove: function() { this.timer && clearInterval(this.timer), this.timer = null },
            show: function() { this.$bullet.removeClass("tvp_none") },
            hide: function() { this.$bullet.addClass("tvp_none") },
            addNext: function() {
                var a = this;!this.data || this.data.length < 1 || (this.$bullet.find(".tvp_out").remove(), setTimeout(function() { a.$bullet.find(".tvp_barrage_item:nth-child(1)").addClass("tvp_out"), a.$bullet.find(".tvp_barrage_item:nth-child(2)").addClass("tvp_fadeout"), a.index++;
                    var b = a.$bullet.find(".tvp_barrage_item");
                    if (a.index > a.data.length) return void(b && b.length || (a.stopMove(), a.hide()));
                    var c = a.renderHTML(a.data.slice(a.index, a.index + 1));
                    a.$bullet.append(c) }, 50)) },
            renderHTML: function(a) {
                return a && a.length ? b.tmpl(this.htmlStr, { data: a }) : "" },
            isPlayingAd: function() {
                var a = !1;
                return "1" === this.$video.attr("data-playing-loadingad") && (a = !0), "1" === this.$video.attr("data-playing-adonend") && (a = !0), a },
            blankData: [{ content: "" }, { content: "" }],
            htmlStr: ["<% for(var i=0,len = data.length;i<len; i++) { %>", ' <div class="tvp_barrage_item">', "   <% if(data[i].content) {%>", '     <span class="tvp_text"><%=tvp.$.filterXSS(data[i].content)%></span>', "   <% }%>", " </div>", "<% } %>"].join(""),
            requestData: function() {
                var a = b.Deferred(),
                    c = this;
                if (this.data && this.data.length > 0) return a.resolve(), a;
                var d = "http://bullet.video.qq.com/fcgi-bin/comment/news_hotlist?vid=" + c.vid;
                return "https:" === location.protocol && (d = "https://sec.video.qq.com/p/bullet.video/fcgi-bin/comment/news_hotlist?vid=" + c.vid), b.Ajax({ url: d, beforeSend: function(a) { a.withCredentials = !0 }, xhrFields: { withCredentials: !0 }, dataType: "html", data: { otype: "json", num: c.isShortVideo ? 20 : 50 }, cache: !1, timeout: 8e3 }).done(function(b) {
                    try { b = b && 0 === b.indexOf("QZOutputJson=") ? b.replace(/^QZOutputJson=/, "").replace(/\;$/, "") : b.replace(/^[\w_]+\(/, "").replace(/\)$/, ""), b = JSON.parse(b) } catch (d) { b = "" }
                    return "string" == typeof b ? void a.reject() : void(b && b.hotcomments && b.hotcomments.length ? (c.data = b.hotcomments.slice(0, c.config.maxCount), a.resolve()) : a.reject()) }).fail(function() { a.reject() }), a }
        }, a.VerticalBullet = c
    }(tvp, tvp.$);