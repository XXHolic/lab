



// try {
//   a.fun()
// } catch (error) {
//   // console.info({error})
//   console.info(error)
//   // TraceKit.report(error)
// }

document.querySelector('#local').onclick = function() {
  try {
    a.fun()
  } catch (error) {
    // throw error;
    console.info({error})
    // console.info(error)

    TraceKit.report(error)
  }
}