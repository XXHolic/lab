window.onload = function() {
  var array = [1,2,3,4,5,6,7,8,9,10,13,14,15];
  var findNum = -1;
  var hight = array.length;
  var low = 0;

  // return;
  while (low < hight) {
    var middle = Math.floor((low+hight)/2);
    var arrayValue = array[middle];
    if (arrayValue > findNum) {
      hight = middle-1;
    }

    if (arrayValue < findNum) {
      low = middle+1;
    }

    if (arrayValue === findNum) {
      console.info('position:'+middle);
      return;
    }

  }
  console.info('no match data');

};