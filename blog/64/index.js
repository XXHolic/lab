window.onload = function() {

  //  将坐标转换为对象结构
  function transformDots(data) {
    const format = data.map(ele => {
      const eleSplit = ele.split(',');
      const [xData,yData] = eleSplit;
      const x = Number(xData.substring(1));
      const y = Number(yData.substring(0,yData.length-1));
      return {x,y}
    })
    return format;
  }

  // 获取各个边向量的代数表示
  function getVector(dot1,dot2) {
    const {x:x1,y:y1} = dot1;
    const {x:x2,y:y2} = dot2;
    const vector = {x:x2-x1,y:y2-y1};
    return vector;
  }

  // 获取分轴
  function getSeparateAxis(data) {
    const len = data.length;
    let axes = [];
    for (let i = 0; i < len; i++) {
      const p1 = data[i];
      const p2 = data[i + 1 == len ? 0 : i + 1];
      const edge = getVector(p1,p2);
      const {x,y} = edge;
      const xVector = y == 0 ? y:-y;
      const normal = {x:xVector,y:x};
      axes.push(normal);
    }

    return axes;
  }

  // 获取在分轴上投影的最大值和最小值
  function getProject(axis,polygon) {
    const len = polygon.length;
    const {x:xBase,y:yBase} = axis;
    let min = max = null;
    for (let index = 0; index < len; index++) {
      const element = polygon[index];
      const {x,y} = element;
      let dot = x*xBase + y*yBase;
      if (min === null || dot < min) {
        min = dot;
      }
      if (max === null || dot > max) {
        max = dot;
      }
    }

    return {min,max};

  }

  // 检测是否重叠
  function checkOverlap(axes,polygon1,polygon2,ele) {
    const showEle = document.querySelector(ele);
    let htmlStr = '';
    const len = axes.length;
    for (let index = 0; index < len; index++) {
      const ele = axes[index];
      const projectA = getProject(ele,polygon1);
      const aMin = projectA.min;
      const aMax = projectA.max;
      const projectB = getProject(ele,polygon2);
      const bMin = projectB.min;
      const bMax = projectB.max;
      if (showEle) {
        htmlStr +=`<tr> <td>${index+1} (${ele.x},${ele.y})</td> <td>${aMin}</td> <td>${aMax}</td> <td>${bMin}</td> <td>${bMax}</td></tr>`
      }

      console.info(`潜在分轴${index+1} (${ele.x},${ele.y})`)
      console.info(`多边形1 投影： min ${aMin} , max ${aMax}`)
      console.info(`多边形2 投影： min ${bMin} , max ${bMax}`)
      // 边界重叠了，也包含其中
      if ( (aMin <= bMax && aMin >= bMin) || (bMin <= aMax && bMin >= aMin) ) {
        if (index === len-1) {
          showEle.innerHTML = htmlStr;
          return true;
        }
        continue;
      } else {
        showEle.innerHTML = htmlStr;
        return false;
      }
    }
  }


  function isCollision(convex1,convex2,ele) {
    let polygon1 = [];
    let polygon2 = [];
    let separateAxes = []

    polygon1 = transformDots(convex1);
    polygon2 = transformDots(convex2);
    polygon1SeparateAxes = getSeparateAxis(polygon1);
    polygon2SeparateAxes = getSeparateAxis(polygon2);
    separateAxes = [...polygon1SeparateAxes,...polygon2SeparateAxes];
    // console.info({polygon1,polygon2,separateAxes})
    return checkOverlap(separateAxes,polygon1,polygon2,ele)
  }

  // 坐标顶点
  const rect1Dots = ['(10,50)', '(70,50)', '(70,100)', '(10,100)'];
  const triangle1Dots = ['(120,50)','(120,90)','(80,70)'];

  const result1 = isCollision(rect1Dots,triangle1Dots,'#result1')

  console.info({result1})

  const rect2Dots = ['(10,130)', '(70,130)', '(70,180)', '(10,180)'];
  const triangle2Dots = ['(90,130)','(90,170)','(50,150)'];

  const result2 = isCollision(rect2Dots,triangle2Dots,'#result2')
  console.info({result2})


  // Util.insertLink({title:'Read In Pieces',linkIndex: 57, type: 'blog'});
  Util.loading.show();

  Util.loading.hide();
}