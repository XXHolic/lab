window.onload = function() {
  var array = [1,5,7,8,9,2,3,4,13,14,15,10];

  var sum = 0;

  var quickSort = function(array) {
    var arrayLen = array.length;
    if(!arrayLen) {
      return;
    }

    sum = sum + array[arrayLen-1];
    array.length = arrayLen-1;
    quickSort(array);
  };

  function bubble(arr) {
    var arrLen = arr.length;
    for (var n = 0; n < arrLen-1; n++) {
      for (let m = 0; m < arrLen-n-1; m++) {
        if (arr[m]>arr[m+1]) {
          var temp = arr[m];
          arr[m] = arr[m+1];
          arr[m+1] = temp;
        }

      }

    }

    console.info(arr);
  }

  bubble(array);

};