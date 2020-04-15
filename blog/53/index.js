window.onload = function() {
  const pageInit = {
    init: function () {
      this.initEvent();
    },
    initEvent:function () {
      this.tryCatchEvent();
      this.windowErrorEvent();
    },
    tryCatchEvent: function () {
      const tryCatchEle = document.querySelector("#tryCatch");
      const tryCatchEle1 = document.querySelector("#tryCatch1");
      tryCatchEle.onclick = this.tryCatch;
      tryCatchEle1.onclick = this.tryCatchInvalid1;
    },
    windowErrorEvent: function() {
      window.onerror = function(message, source, lineno, colno, error) {
        console.info('DOM0 onerror：',message, source, lineno, colno, error);
        return true;
      }

      window.addEventListener('error',function(event) {
        console.info('DOM2 error：',event);
        event.preventDefault();
      },true);

      const ele = document.querySelector("#onerror");
      const ele1 = document.querySelector("#onerror1");
      ele.onclick = this.causeError;
      ele1.onclick = this.getSrcError;

    },
    tryCatch: function () {
      try {
        var name = 'Tom';
        console.info(age);
      } catch(error) {
        console.info('try-catch：', error);
      }
    },
    tryCatchInvalid2: function () {
      try {
        // 语法错误
        // var name = 'Tom;
      } catch(error) {
        console.info('try-catch：', error);
      }
    },
    tryCatchInvalid1: function () {
      try {
        setTimeout(() => {
          name.forEach(() => {});
        },1000)
      } catch(error) {
        console.info('try-catch：', error);
      }
    },
    causeError:function() {
      name.forEach(() => {});
    },
    getSrcError:function() {
      const ele = document.createElement('script');
      ele.setAttribute('src','./test.js');
      document.body.appendChild(ele);
    }
  }

  pageInit.init.call(pageInit);

}