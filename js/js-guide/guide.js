/**
 * guide.js v1.0.0
 * author: thy
 */

(function(f){
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
    module.exports.guide = function () {
      console.warn('Deprecated: please use require("guide.js") directly, instead of the guide method of the function');
      return f().apply(this, arguments);
    };
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
        g = window;
    } else if (typeof global !== "undefined") {
        g = global;
    } else if (typeof self !== "undefined") {
        g = self;
    } else {
        g = this;
    }
    g.guide = f();
  }

})(function() {

  var VERSION = '1.0.0';

  function Guide(obj) {
    this.targetElement = obj;
    this.allGuideItems = [];
    this.currentStep = 0;

    this.options = {
      prevText: 'Pre',
      nextText: 'Next',
      skipText: 'Skip',
      doneText: 'Done',
      tipPositon: 'bottom',
      tipClass: '',
      // 下面2个参数功能实现先不管
      scrollToElement: true,
      scrollTo: 'element',
    };
  }

  /**
   * 为一组类似的元素，用同一方法的处理
   * @param {Array} arr
   * @param {Function} fuc
   */
  function functionForEach(arr, fuc) {
    if (arr) {
      for (var i = 0, len = arr.length; i < len; i++) {
        fuc(arr[i], i);
      }
    }
  }

  /**
   * 获取元素的位置
   * @param {Object} element
   */
  function getOffset(element) {
    var eleAttribute = element.getBoundingClientRect();
    return {
      top: eleAttribute.top,
      width: eleAttribute.width,
      height: eleAttribute.height,
      left: eleAttribute.left
    };
  }

  /**
   * 引导初始化
   * @param {Object} targetEle
   */
  function guideInit(targetEle) {
    var allGuideSteps = targetEle.querySelectorAll('*[data-intro]'),
        guideItems = [];
    var eleLen = allGuideSteps.length;
    // 没有引导元素，就停止执行
    if (eleLen < 1) {
      return false;
    }

    functionForEach(allGuideSteps,function (currentEle){
      var step = parseInt(currentEle.getAttribute('data-step'),10);

      if (step > 0) {
        guideItems[step-1] = {
          element: currentEle,
          intro: currentEle.getAttribute('data-intro'),
          step: step,
          tipClass: currentEle.getAttribute('data-tipClass'),
          tipPositon: currentEle.getAttribute('data-tipPositon')
        };
      }
    }.bind(this));

    guideItems.sort(function (a, b){
      return a.step - b.step;
    });

    this.allGuideItems = guideItems;

    showElement.call(this,guideItems[0]);

  }

  /**
   * 显示引导
   * @param {Object} targetEle
   */
  function showElement(targetEle) {
    console.info("targetEle",targetEle);
    var self = this,
        guideContainer = document.querySelector('.guide-container'),
        nextButton,
        prevButton,
        skipButton;

    if (guideContainer !== null) {
      var guideTipEle = guideContainer.querySelector('.guide-tip');
      var guideTipTextEle = guideContainer.querySelector('.guide-tip-text');

      guideTipEle.style.opacity = 0;
      // guideTipEle.style.display = 'none';

      guideTipTextEle.innerText = targetEle.intro;

      setGuideLayerPosition.call(self,guideContainer);

      guideTipEle.style.opacity = 1;

    } else {
      var guideLayer = document.createElement('div');
      var guideTipLayer = document.createElement('div');
      var guideTipTextLayer = document.createElement('div');
      var guideTipBtnLayer = document.createElement('div');

      guideLayer.className = 'guide-container';
      guideTipLayer.className = 'guide-tip';
      guideTipTextLayer.className = 'guide-tip-text';

      //提示文字显示的元素
      guideTipTextLayer.innerText = targetEle.intro;

      // 创建按钮
      guideTipBtnLayer.className = 'guide-tip-btns';
      skipButton = document.createElement('button');
      skipButton.innerText = this.options.skipText;
      skipButton.onclick = function() {
        exitGuide.call(self);
      };
      guideTipBtnLayer.appendChild(skipButton);

      preButton = document.createElement('button');
      preButton.innerText = this.options.prevText;
      preButton.onclick = function() {
        if (self.currentStep !== 0) {
          previousStep.call(self);
        }
        
      };
      guideTipBtnLayer.appendChild(preButton);

      nextButton = document.createElement('button');
      nextButton.innerText = this.options.nextText;
      nextButton.onclick = function() {
        console.info('next');
        if (self.allGuideItems.length-1 !== self.currentStep) {
          nextStep.call(self);
        }
        
      };
      guideTipBtnLayer.appendChild(nextButton);

      // 前面各子元素组装好后，组合到一起
      guideTipLayer.appendChild(guideTipTextLayer);
      guideTipLayer.appendChild(guideTipBtnLayer);
      guideLayer.appendChild(guideTipLayer);
      
      // 对提示进行定位
      setGuideLayerPosition.call(self,guideLayer);
      this.targetElement.appendChild(guideLayer);

    }

  }

  // 设置引导层阴影的位置
  function setGuideLayerPosition(guideLayer) {
    if (guideLayer) {
      var currentGuideItem = this.allGuideItems[this.currentStep];
      if (!currentGuideItem) {
        return;
      }
      var elementPosition = getOffset(currentGuideItem.element);
      var windowsWidth = document.documentElement.clientWidth;
      var windowsHeight = document.documentElement.clientHeight;
      var borderRightWidth = windowsWidth - elementPosition.width - elementPosition.left;
      var borderBottomWidth = windowsHeight - elementPosition.height - elementPosition.top;
      guideLayer.style.cssText = 
        'width:' + elementPosition.width + 'px;' + 
        'height:' + elementPosition.height + 'px;' + 
        'border-width:' + elementPosition.top + 'px ' + borderRightWidth + 'px ' + borderBottomWidth + 'px ' + elementPosition.left + 'px;'
        ;
    }
  }

  // 下面是事件触发的方法
  // 下一步
  function nextStep() {
    this.direction = 'forward';

    // if (this.currentStep !== 0) {
    ++this.currentStep;
    // }

    var nextStepItem = this.allGuideItems[this.currentStep];
    // var continueStep = true;

    // 最后一步
    if (this.allGuideItems.length <= this.currentStep) {
      return;
    }

    showElement.call(this,nextStepItem);
  }

  // 上一步
  function previousStep() {
    this.direction = 'backward';
    
    if (this.currentStep === 0) {
      return;
    }

    --this.currentStep;
    var preStepItem = this.allGuideItems[this.currentStep];

    showElement.call(this,preStepItem);

  }

  // 跳过和完成
  function exitGuide() {
    var guideContainer = document.querySelector('.guide-container');
    document.body.removeChild(guideContainer);
    // document.removeChild(guideContainer);
    this.currentStep = 0;
  }



  // 这个是对外暴露的对象
  var guide = function (targetEle) {
    var instance = null;

    if (typeof (targetEle) === 'object') {
      instance = new Guide(targetEle);
    } else if (typeof (targetEle) === 'string') {
      var targetElement = document.querySelector(targetEle);

      if (targetElement) {
        instance = new Guide(targetElement);
      } else {
        throw new Error('There is no element with given selector.');
      }
    } else {
      instance = new Guide(document.body);
    }

    return instance;
  }

  // guide是一个函数，也是对象，所以这么来做是没什么问题的。
  guide.version = VERSION;

  // 这个fn是为了方便理解才存在的，其实没有什么作用
  guide.fn = Guide.prototype = {
    start: function() {
      guideInit.call(this,this.targetElement);
      console.info("test is success");
    }
  };

  return guide;
});