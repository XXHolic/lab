window.onload = function() {
// console.info(typeof document.body.style.width);
// console.info(typeof document.body.style.aa);

console.info(CSS.supports("display: flex"));
console.info(CSS.supports("display", "flex"));
console.info(CSS.supports("display", "test"));
};
