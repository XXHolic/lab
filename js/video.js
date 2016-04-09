/*

*  测试功能：自动播放
*  测试机型：苹果 华为 红米
*  结果结果：苹果有效果  华为 红米无效果

*/
 var video1 = new tvp.VideoInfo();
  video1.setVid('l0169ya0xfv');
  var player1 = new tvp.Player();
  player1.create({
    width  : "100%",
    height: 210,
    pic: tvp.common.getVideoSnapMobile('l0169ya0xfv'),
    video  : video1,
    playerType: 'html5',
    modId  : "mod_player1",
    // 正片是否自动播放
    autoplay: false,
    html5loop: true,
    // 前贴广告播完是否自动播放正片
    autoplayAfterLoadingad: true,
    // 前贴广告是否自动播放
    loadingadAutoplay: false,
    isSkipLoadingAd: true,
    // isHtml5ShowLoadingAdOnStart: true,
    // isHtml5ShowLoadingAdOnChange: true,
    isiPhoneShowPosterOnPause: false,
    isContinuePlay: false,
    plugins: {
      AppRecommend: true,
      // adonend: true
    },
    useHtml5VerticalBullet: true,
    onwrite: function(){
      var self = this;
      tvp.$('#btn1').on('click', function(){
        self.$mod.find('.tvp_overlay_play').trigger('click');
      });
    }
  });

  var video2 = new tvp.VideoInfo();
  video2.setVid('u1628ojrkb1');
  var player2 = new tvp.Player();
  player2.create({
    width  : "100%",
    height: 210,
    pic: tvp.common.getVideoSnapMobile('u1628ojrkb1'),
    video  : video2,
    playerType: 'html5',
    modId  : "mod_player2",
    // isHtml5UseUI:false,
    autoplay: false,
    //  标记是短视频
    isShortVideo: true,
    disableShortVideoPause: true,
    shortVideoBtnTitle: '12345678901234567',
    // shortVideoOpenUrl: 'tenvideo2://?action=1&cover_id=1l9ixpa8r05qcnm',
    shortVideoOpenUrl: 'tenvideo2://?action=6&topic_id=11681&callback=weixin%3A%2F%2F&sender=weixin',
    // 短视频对应的长视频ID
    longVideoID: 'p00172bh2gc',
    // coverId: 'xfxd9mej2luhfoz',
    // 禁用控制栏
    html5ForbiddenUIFeature: ['controlbar', 'title','definition'],
    // 是否虚播
    isContinuePlay: false,
    plugins: {
      AppRecommend: true,
      // AppBanner: true,
      AppFollow: {
        openFollow: 1,
        isHideBannerTips: true
      }
    },
    isHtml5UseFakeFullScreen: true,
    isiPhoneShowPosterOnPause: false,
    isHtml5ShowLoadingAdOnStart: false,
    isHtml5ShowLoadingAdOnChange: false,
    useHtml5VerticalBullet: true
  });

  var video3 = new tvp.VideoInfo();
  video3.setVid('e0018z5qjp2');
  var player3 = new tvp.Player();
  player3.create({
    width  : "100%",
    height: 210,
    pic: tvp.common.getVideoSnapMobile('e0018z5qjp2'),
    video  : video3,
    playerType: 'html5',
    modId  : "mod_player3",
    autoplay: false,
    //  标记是短视频
    // isShortVideo: true,
    // 短视频对应的长视频ID
    // longVideoID: 'h0018p9ihom',
    // 禁用控制栏
    // html5ForbiddenUIFeature: ['controlbar', 'title','definition'],
    // 是否虚播
    isContinuePlay: false,
    plugins: {
      AppRecommend: true,
      AppFollow: {
        openFollow: 1,
        isHideBannerTips: true
      },
      adonend: true
    },
    isHtml5UseFakeFullScreen: true,
    isiPhoneShowPosterOnPause: false,
    // isHtml5ShowLoadingAdOnStart: true,
    // isHtml5ShowLoadingAdOnChange: true,
    autoplayAfterLoadingad: true,
    useHtml5VerticalBullet: true
  });
/*

*  测试功能：获取视频截图
*  功能方法：getVideoSnap()
    方法返回值：返回一个数组，里面包含了三种尺寸的图片
                第一张 jpg 160*90，
                第二张 jpg 120*90 
                都三张 png 宽度是根据视窗的宽度，高度比例自适应
                第一张和第二张是相同的，第三张是新的截图
*  测试机型：苹果 华为
*  结果结果：苹果有效果  华为 红米无效果

*/