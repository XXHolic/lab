var page = {
  count:0,
  clickCount:0,
  clickDownCount:0,
  clickUpCount:0,
  dblClickCount:0,
  mouseMoveCount:0,
  init: function() {
    var _self = this;
    _self.initClickBtn();
    _self.initClearBtn();
  },
  initClickBtn: function() {
    var _self = this;
    var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
    var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
    var clickButtonEle = document.getElementById('clickButton');

    if (deviceIsAndroid) {
      // Util.Event.addHandler(bodyEle,'mouseover', onMouse, true);
      // Util.Event.addHandler(bodyEle,'mousedown', onMouse, true);
      // Util.Event.addHandler(bodyEle,'mouseup', onMouse, true);
    }

    Util.Event.addHandler(clickButtonEle,'mouseover', function() {
      // _self.count = _self.count + 1;
      _self.appendRecord('onMouseOver');
      console.info('触发事件：onMouseOver');
    });
    // onmouseenter 不支持冒泡
    Util.Event.addHandler(clickButtonEle,'mouseenter', function(){
      _self.appendRecord('onMouseEnter');
      console.info('触发事件：onMouseEnter');
    });

    Util.Event.addHandler(clickButtonEle,'mouseout', function(){
      _self.appendRecord('onMouseOut');
      console.info('触发事件：onMouseOut');
    });
    // onmouseleave 不支持冒泡
    Util.Event.addHandler(clickButtonEle,'mouseleave', function(){
      _self.mouseMoveCount = 0;
      _self.appendRecord('onMouseLeave');
      console.info('触发事件：onMouseLeave');
    });

    Util.Event.addHandler(clickButtonEle,'mousedown', function(){
      // _self.clickDownCount = _self.clickDownCount + 1;
      _self.appendRecord('onMouseDown','mousedown');
      console.info('触发事件：onMouseDown');
    });
    Util.Event.addHandler(clickButtonEle,'mouseup', function(){
      // _self.clickUpCount = _self.clickUpCount + 1;
      _self.appendRecord('onMouseUp','mouseup');
      console.info('触发事件：onMouseUp');
    });

    Util.Event.addHandler(clickButtonEle,'mousemove', function(){
      _self.mouseMoveCount = _self.mouseMoveCount + 1;
      _self.appendRecord('onMouseMove');
      console.info('触发事件：onMouseMove');
    });

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
      // _self.count = 0;
      // _self.clickCount = 0;
      // _self.dblClickCount = 0;
      // _self.clickDownCount = 0;
      // _self.clickUpCount = 0;
      // _self.mouseMoveCount = 0;
      var recordEventEle = document.getElementById('recordEvent');
      recordEventEle.innerHTML='';
    });
  },
  appendRecord: function(str,type) {
    // var typeMap = {count:'count',click:'clickCount',dblclick:'dblClickCount',mousedown:'clickDownCount',mouseup:'clickUpCount'};
    // var typeStr = type ? type:'count';
    // var _self = this;
    var recordEventEle = document.getElementById('recordEvent');
    var tempEle = document.createElement('div');
    // var showText = '第' + _self[typeMap[typeStr]] + '次触发：' + str;
    var showText = '触发：' + str;
    tempEle.innerText = showText;

    // var mouseEleId = 'mouseMove'+_self.count;
    // var mouseMoveRecord = document.getElementById(mouseEleId);
    // if (str === 'onMouseMove') {
    //   showText = '触发：'+str;
    // }
    // if (str === 'onMouseMove' && !mouseMoveRecord) {
    //   tempEle.setAttribute('id',mouseEleId);
    // }
    // if (str === 'onMouseMove' && mouseMoveRecord) {
    //   mouseMoveRecord.innerText = showText + '*' + _self.mouseMoveCount;
    //   return false;
    // }
    recordEventEle.appendChild(tempEle);
  }
};
page.init();