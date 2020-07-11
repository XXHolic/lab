window.onload = function() {
  Util.insertLink({title:'Read In Pieces',linkIndex: 57, type: 'blog'});
  Util.loading.show();
  function addClass(ele,className) {
    const eleObj = document.querySelector(ele)
    let classAttribute = eleObj.getAttribute('class');
    if (classAttribute.indexOf(className)===-1) {
      classAttribute = `${classAttribute} ${className}`;
    }
    classAttribute = classAttribute.replace(/\s+/g,' ')
    eleObj.setAttribute('class',classAttribute);
  }

  function removeClass(ele,className) {
    const eleObj = document.querySelector(ele)
    let classAttribute = eleObj.getAttribute('class');
    if (classAttribute.indexOf(className) > -1) {
      const reg = new RegExp(className,'g')
      classAttribute = classAttribute.replace(reg,'');
    }
    classAttribute = classAttribute.replace(/\s+/g,' ')
    eleObj.setAttribute('class',classAttribute);
  }

  function createPaintEle() {
    if (typeof document.body.style.clipPath !== 'string') {
      alert('Your browser does not support "clip-path" property');
      return;
    }
    const eleNum = 34;
    let str = '';
    for (let index = 0; index < eleNum; index++) {
      const count = index + 1;
      const ele = '<div class="wrap-piece wrap-piece'+ count +'"><div class="piece piece'+count+'"></div></div>';
      str +=ele;
    }

    document.querySelector('.painting').innerHTML = str;

  }

  function animalStatesShimmer() {

    setInterval(function(){
      setTimeout(function(){
        addClass('body','shimmer');
      }, 4000);
      setTimeout(function(){
        removeClass('body','shimmer')
      }, 6000);

    },7000);

  }

  function animal1(e) {

    setInterval(function(){

      setTimeout(function(){
        addClass('body','animation-state1');
      }, 1000);
      setTimeout(function(){
        removeClass('body','animation-state1');
      }, 1100);
      setTimeout(function(){
        addClass('body','animation-state1');
      }, 1400);
      setTimeout(function(){
        removeClass('body','animation-state1');
      }, 1500);


    },3000);

  }

  function animal2(e) {

    setInterval(function(){
      setTimeout(function(){
        addClass('body','animation-state2');
      }, 1000);
      setTimeout(function(){
        removeClass('body','animation-state2');
        addClass('body','animation-state3');
      }, 2000);
      setTimeout(function(){
        removeClass('body','animation-state3');
      }, 3000);

    },4000);

  }

  createPaintEle()
  animalStatesShimmer()
  animal1()
  animal2()
  Util.loading.hide();
}