const promiseReturn = new Promise(function(resolve, reject) {
  return resolve("ok");
  resolve("yes");
});

promiseReturn.then((data)=>{
  // return new Promise(function(resolve,reject) {
  //   resolve('dddd');
  // });
}).then((data)=>{
  console.info('second then data:',data);
  return 'second data';
}).then((data)=>{
  console.info('third then data:',data);
});
