
/**
 *
 * @param {*} data
 */
  function getImgMark(data) {
    const reg = new RegExp("\\<img.*?>");
    const result = data.match(reg);
    console.info("result", result);
    return 'dd'
  }