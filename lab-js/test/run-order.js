setTimeout(() => {
  console.log("11");
});
new Promise(resolve => {
  console.log("22");
  for (var i = 1; i < 100; i++) {
    if (i == 99) resolve();
  }
  console.log("33");
}).then(() => {
  console.log("44");
});

process.nextTick(function() {
  console.log('66');
});

console.log("55");
