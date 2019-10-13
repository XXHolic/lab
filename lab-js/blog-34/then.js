
// const promiseResolve = new Promise(function(resolve, reject) {
//   resolve("resolve value");
// });

// promiseResolve.then((data)=>{
//   console.info('first then data:',data);
// }).then((data)=>{
//   console.info('second then data:',data);
// }).then((data)=>{
//   console.info('third then data:',data);
// });


const promiseReject = new Promise(function(resolve, reject) {
  reject("reject value");
});

promiseReject.then((data)=>{
  console.info('first then data:',data);
},(reject) => {
  console.info('first then reject:',reject);
}).then((data)=>{
  return ('second data');
  console.info('second then data:',data);
}, (reject) => {
  console.info('second then reject:',reject);

}).then((data)=>{
  console.info('third then data:',data);
}, (reject) => {
  console.info('third then reject:',reject);
}).catch((err) => {
  console.info('catch:',err);
})



// const promiseBreak = new Promise(function(resolve, reject) {
//   resolve('ok');
// });

// promiseBreak.then(() => {
//   throw new Error('first then error');
// }).then(() => {
//   throw new Error('second then error');
// }).catch((err) => {
//   console.info('err',err);
// });