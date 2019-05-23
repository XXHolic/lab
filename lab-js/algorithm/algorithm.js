window.onload = function() {
  /**
   * 对数组去重，然后返回去重后数组的长度
   * @param {[]} nums
   * @returns {num}
   */
  var removeDuplicates = function(nums) {
    var arrLen = nums.length || 0;
    for (var i = 0; i < arrLen; i++) {
      var item = nums[i];
      var lastIndex = nums.lastIndexOf(item);
      var startIndex = nums.indexOf(item);
      while (lastIndex !== startIndex) {
        nums.splice(lastIndex, 1);
        lastIndex = nums.lastIndexOf(item);
      }
    }

    return nums.length;
  };

  var result = removeDuplicates([1, 1, 2, 2, 3, 3, 3, 3, 3]);

  // console.info("array length：", result);

  /**
   * 旋转数组，例如 [1,2,3,4] 向右移动 1 位，[4，1，2，3]
   * @param {number []} nums
   * @param {number} k
   * @returns {void}
   */
  var rotate = function(nums, k) {
    var numsLen = nums.length;
    var factStep = k % numsLen;

    for (let index = numsLen - 1; index >= 0; index--) {
      nums[index + factStep] = nums[index];
    }

    var spliceArray = nums.splice(nums.length - factStep, factStep);
    nums.splice(0, factStep);
    spliceArray.reverse().forEach(function(item) {
      nums.unshift(item);
    });

    console.info("rotate array:", nums);
  };

  // rotate([1, 2, 3, 4], 4);
};
