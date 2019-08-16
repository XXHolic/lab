window.onload = function() {
  /* */
  let charAtStr = "charAt method";
  console.info(charAtStr.charAt(3));

  let judgeStr = "judge method";
  console.info(judgeStr.endsWith("hod"));
  console.info(judgeStr.startsWith("jud"));
  console.info(judgeStr.includes("me"));

  let indexOfStr = "dsafdsa";
  console.info(indexOfStr.indexOf("d")); //
  console.info(indexOfStr.indexOf("d", 3)); //
  console.info(indexOfStr.lastIndexOf("d")); //
  console.info(indexOfStr.lastIndexOf("d", 3)); //

  let matchStr = "fdafADfdsRT";
  console.info(matchStr.match(/[A-Z]/g)); // ["A", "D", "R", "T"]
  console.info(matchStr.match("z")); // null
  console.info(matchStr.match()); // ["", index: 0, input: "fdafADfdsRT", groups: undefined]

  console.info(matchStr.search(/[A-Z]/g)); // 4
  console.info(matchStr.search("z")); // -1
  console.info(matchStr.search()); // 0

  let sliceStr = "abcdefg";
  console.info("sliceStr"); //
  console.info(sliceStr.slice(0)); //
  console.info(sliceStr.slice(0, 1)); //
  console.info(sliceStr.slice()); //

  console.info("substringStr"); //
  console.info(sliceStr.substring(0)); //
  console.info(sliceStr.substring(0, 1)); //
  console.info(sliceStr.substring()); //

  let transferStr = "aBcD";
  console.info("transferStr"); //
  console.info(transferStr.replace(/a/g, "Z")); // ZBcD
  console.info(transferStr.split("c")); //  ["aB", "D"]
  console.info(transferStr.toLowerCase()); // abcd
  console.info(transferStr.toUpperCase()); // ABCD

  let padStr = "ab";
  console.info("padStr"); //
  console.info(padStr.padEnd(4)); // "ab  "
  console.info(padStr.padEnd(5, "cd")); //  abcdc
  console.info(padStr.padEnd(4, "cde")); //  abcd

  console.info(padStr.padStart(4)); // "  ab"
  console.info(padStr.padStart(5, "cd")); //  cdcab
  console.info(padStr.padStart(4, "cde")); //  cdab

  /**
   *
   * @param {*} a
   * @param {*} b
   */
  function aa(a, b) {}
};
