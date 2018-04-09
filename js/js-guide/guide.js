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
        fnc(arr[i], i);
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
    var allGuideSteps = targetEle.querySelector('*[data-intro]'),
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
    console.info("创建元素");
    var self = this,
        guideContainer = document.querySelector('.guide-container');

    if (guideContainer !== null) {

    } else {
      var guideLayer = document.createElement('div');
      var guideTipLayer = document.createElement('div');
      var guideTipTextLayer = document.createElement('div');
      var guideTipBtnLayer = document.createElement('div');

      guideLayer.className = 'guide-container';
      guideTipLayer.className = 'guide-tip';
      guideTipTextLayer.className = 'guide-tip-text';
      guideTipBtnLayer.className = 'guide-tip-btns';

      guideLayer.appendChild(guideTipLayer);
      guideTipLayer.appendChild(guideTipTextLayer);
      guideTipLayer.appendChild(guideTipBtnLayer);

      setGuideLayerPosition.call(self,guideLayer);
      this.targetElement.appendChild(guideLayer);

    }

  }

  // 设置引导层阴影的位置
  function setGuideLayerPosition(guideLayer) {
    if (guideLayer) {
      var elementPosition = getOffset();
      guideLayer.style.cssText = '';
    }
  }

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
      console.info("test is success");
    }
  };

  return guide;
});