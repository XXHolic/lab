const promiseReturn = new Promise(function(resolve, reject) {
  return resolve("ok");
  resolve("yes");
});

promiseReturn.then((data)=>{
  console.info('first then data:',data);
}).then((data)=>{
  console.info('second then data:',data);
  return 'second data';
}).then((data)=>{
  console.info('third then data:',data);
});


// const promiseReject = new Promise(function(resolve, reject) {
//   reject("reject value");
// });

// promiseReject.then((data)=>{
//   console.info('first then data:',data);
// },(reject) => {
//   console.info('first then reject:',reject);
// }).then((data)=>{
//   console.info('second then data:',data);
// }, (reject) => {
//   console.info('second then reject:',reject);

// }).then((data)=>{
//   console.info('third then data:',data);
// }, (reject) => {
//   console.info('third then reject:',reject);
// }).catch((err) => {
//   console.info('catch:',err);
// })
