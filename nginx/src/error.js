



// fetch("http://localhost:6677/index",{method:'GET'}).then((res) => {
//   if (!res.ok) {
//     throw res;
//   }
// })
// .catch((e) => {
//   throw e;
//   // console.info('fetch error1：',e);
// })

fetch("http://localhost:6677/data.json",{method:'GET'}).then((res) => {
  if (res.ok) {
    throw res;
  }
})
.catch((e) => {
  console.info('fetch error：',e);
  throw e;
})