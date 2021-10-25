window.onload = function () {
  function pageEvent() {
    document.querySelector("#stop").onclick = () => {
      window.cancelAnimationFrame(requestAnimationFrameMark);
    };
    document.querySelector("#start").onclick = () => {
      requestAnimationFrameMark = requestAnimationFrame(draw);
    };
  }
};
