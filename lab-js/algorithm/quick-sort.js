window.onload = function() {
  for (var index = 0; index < 5; index++) {
    (function(param) {
      var j = index;
      setTimeout(function timer() {
        console.info(param);
      }, param * 1000);
    })(index);
  }

  var array = [1, 5, 7, 8, 9, 2, 3, 4, 13, 14, 15, 10];

  const quickSort = array => {
    if (array.length < 2) {
      return array;
    }
    const pivot = array[0];
    const keysAreLessPivot = array.slice(1).filter(key => key <= pivot);
    const keysAreMorePivot = array.slice(1).filter(key => key > pivot);
    return [
      ...quickSort(keysAreLessPivot),
      pivot,
      ...quickSort(keysAreMorePivot)
    ];
  };

  console.log(quickSort([10, 5, 2, 3])); // [2, 3, 5, 10]

  function bubble(arr) {
    var arrLen = arr.length;
    for (var n = 0; n < arrLen - 1; n++) {
      for (let m = 0; m < arrLen - n - 1; m++) {
        if (arr[m] > arr[m + 1]) {
          var temp = arr[m];
          arr[m] = arr[m + 1];
          arr[m + 1] = temp;
        }
      }
    }

    console.info(arr);
  }

  bubble(array);
};;