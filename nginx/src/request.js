const xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:6677/index");
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      console.info('success')
    } else {
      console.info('xhr error：',xhr)
    }
  }
};
xhr.send();

fetch("http://localhost:6677/index").then((res) => {
  if (!res.ok) {
    throw res;
  }
}).catch((e) => {
  console.info(e)
  console.info('fetch error：',e);
})
