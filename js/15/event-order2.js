var page = {
  init: function() {
    var _self = this;
    _self.initClickBtn();
    _self.initClearBtn();
  },
  initClickBtn: function() {
    var _self = this;
    var clickButtonEle = document.getElementById('clickButton');


    Util.Event.addHandler(clickButtonEle,'click',function(){
      // _self.clickCount = _self.clickCount + 1;
      _self.appendRecord('onClick','click');
      clickButtonEle.innerText = '已单击，参照：'+Util.getRandomNum(6);
      console.info('触发事件：onClick');
    });

    Util.Event.addHandler(clickButtonEle,'dblclick',function(){
      // _self.dblClickCount = _self.dblClickCount + 1;
      _self.appendRecord('onDblClick','dblclick');
      clickButtonEle.innerText = '已双击，参照：'+Util.getRandomNum(6);
      console.info('触发事件：onDblClick');
    });

    Util.Event.addHandler(clickButtonEle,'touchstart',function(){
      _self.appendRecord('onTouchStart');
      console.info('触发事件：onTouchStart');
    });

    Util.Event.addHandler(clickButtonEle,'touchmove',function(){
      _self.appendRecord('onTouchMove');
      console.info('触发事件：onTouchMove');
    });

    Util.Event.addHandler(clickButtonEle,'touchend',function(){
      _self.appendRecord('onTouchEnd');
      console.info('触发事件：onTouchEnd');
    });

    Util.Event.addHandler(clickButtonEle,'touchcancel',function(){
      _self.appendRecord('onTouchCancel');
      console.info('触发事件：onTouchCancel');
    });
  },
  initClearBtn: function() {
    var _self = this;
    var recordEventEle = document.getElementById('clearRecord');
    Util.Event.addHandler(recordEventEle,'click', function() {
      var recordEventEle = document.getElementById('recordEvent');
      recordEventEle.innerHTML='';
    });
  },
  appendRecord: function(str) {
    var recordEventEle = document.getElementById('recordEvent');
    var tempEle = document.createElement('div');
    var showText = '触发：' + str;
    tempEle.innerText = showText;
    recordEventEle.appendChild(tempEle);
  }
};
page.init();