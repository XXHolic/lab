window.onload = function() {
  var getJSONData = function(url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status === 200) {
        return JSON.parse(xhr.responseText);
      } else {
        new Error(xhr.statusText);
      }
    };

    xhr.open("GET", url);
    xhr.send();
  };

  function timeout() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("3 second delay");
      }, 3000);
    });
  }

  async function main() {
    var data = await timeout();
    console.info("data:", data);
    console.info("await result:", result);
  }

  var result = main();
  console.info("result:", result);

  async function helloAsync() {
    return "hello Async";
  }

  helloAsync().then(data => console.info(data));


  var obj1 = {
    then: resolve => {
      resolve("obj1.then");
    }
  };

  var obj2 = {
    then: resolve => {
      return "obj2.then";
    }
  };

  (async () => {
    var num = await 123;
    var str = await "string";
    var bool = await true;
    var obj = await {name:()=>{}}
    var arr = [1,2,3]

    // return num;
    // return str;
    // return bool;
    return obj;
    // return arr;
  })().then(data => {
    console.info("data", data);
  });

  (async () => {
    var obj1Data = await obj1;
    console.info("obj1Data:", obj1Data);
  })().then(data => {
    console.info("data", data);
  });
  (async () => {
    var obj2Data = await obj2;
    console.info("obj2Data:", obj2Data);
  })().then(data => {
    console.info("datadddd", data);
  });

  (async () => {
    // await Promise.reject('error');
    return await Promise.resolve('hello async');
  })().then(value => console.info('value',value));

  async function tryError() {
    await new Promise((resolve,reject)=>{
      throw new Error('error')
    });

    return await Promise.resolve("resolved");
  }

  tryError().then(v => console.info(v)).catch(e => {console.info(e)});

};
