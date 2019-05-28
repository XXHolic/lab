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

  // var result = removeDuplicates([1, 1, 2, 2, 3, 3, 3, 3, 3]);

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

  /**
   * 判断数组中是否有重复的数字
   * @param {number []} nums
   * @returns {boolean}
   */
  var containsDuplicate = function(nums) {
    var numsLen = nums.length || 0;

    for (var index = 0; index < numsLen; index++) {
      var data = nums[index];
      var startIndex = nums.indexOf(data);
      var endIndex = nums.lastIndexOf(data);
      if (endIndex !== startIndex) {
        return true;
      }
    }

    return false;
  };

  // var result = containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]);

  // console.info("result:", result);

  /**
   *
   * @param {number []} nums1
   * @param {number []} nums2
   * @returns {number []}
   */
  var intersect = function(nums1, nums2) {
    var compare = function(x, y) {
      return x - y;
    };

    nums1.sort(compare);
    nums2.sort(compare);

    var pos1 = 0;
    var pos2 = 0;
    var nums1Len = nums1.length || 0;
    var nums2Len = nums2.length || 0;
    var intersection = [];

    while (pos1 < nums1Len && pos2 < nums2Len) {
      var nums1Data = nums1[pos1];
      var nums2Data = nums2[pos2];
      if (nums1Data === nums2Data) {
        intersection.push(nums1Data);
        pos1++;
        pos2++;
      } else if (nums1Data > nums2Data) {
        pos2++;
      } else {
        pos1++;
      }
    }

    return intersection;
  };

  // var result = intersect([1, 2, 2, 1], [4, 5, 9]);

  /**
   * @param {number[]} digits
   * @return {number[]}
   */
  var plusOne = function(digits) {
    var digitsLen = digits.length;
    var plusResult = 0;
    var index = digitsLen - 1;

    do {
      plusResult = digits[index] + 1;


      if (plusResult === 10 ) {
        digits[index] = 0;

        if (index === 0) {
          digits.unshift(1);
        }
      } else {
        digits[index] = plusResult;
      }
      index--;
    } while (plusResult === 10 && index >= 0);

    return digits;
  };

  // var result = plusOne([9, 9, 9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9]);

  var moveZeroes = function(nums) {
    var numsLen = nums.length;
    var zeroCount = 0;
    var point = 0;

    while (point<numsLen) {
      if (nums[point] === 0) {
        zeroCount++;
        nums.splice(point, 1);
        numsLen--;
      } else {
        point++;
      }
    }

    while (zeroCount>0) {
      nums.push(0);
      zeroCount--;
    }

    console.info("result:", nums);
  };

  moveZeroes([0,0,1]);
  // console.info("result:", result);
};
