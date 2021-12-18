window.onload = function () {
  var canvas = document.getElementById("particles");

  const pxRatio = Math.max(Math.floor(window.devicePixelRatio) || 1, 2);
  canvas.width = canvas.clientWidth * pxRatio;
  canvas.height = canvas.clientHeight * pxRatio;

  const gl = canvas.getContext("webgl", { antialiasing: false });

  const wind = new WindGL(gl);
  wind.numParticles = 65536;

  function getWindData() {
    fetch("./2021113000.json")
      .then((response) => response.json())
      .then((windData) => {
        const windImage = new Image();
        windData.image = windImage;
        windImage.src = "./2021113000.png";
        windImage.onload = function () {
          wind.setWind(windData);
        };
      });
  }

  let count = 0;

  getWindData();

  function frame() {
    if (wind.windData) {
      wind.draw();
    }
    if (count < 10) {
      requestAnimationFrame(frame);
      count++;
    }
  }
  frame();

  insertLink({ title: "绘制粒子", linkIndex: 104 });

};
