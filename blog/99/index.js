window.onload = function () {
  let globalGeo = [];

  const map = {
    canvasObj: {},
    init: function () {
      this.canvasObj = Canvas.setTarget("#coastline");
      this.getData();
    },
    getData: function () {
      const _this = this;
      fetch("./geo.json")
        .then((response) => response.json())
        .then((res) => {
          const backData = res.features || [];
          globalGeo = backData;
          _this.draw(backData);
        });
    },
    draw: function (data) {
      const { context, node, clear } = this.canvasObj;
      const len = data.length;
      clear();
      context.lineWidth = 1;
      context.lineJoin = context.lineCap = "round";
      context.strokeStyle = "white";
      context.beginPath();
      for (let i = 0; i < len; i++) {
        const coordinates = data[i].geometry.coordinates || [];
        const coordinatesNum = coordinates.length;
        for (let j = 0; j < coordinatesNum; j++) {
          context[j ? "lineTo" : "moveTo"](
            ((coordinates[j][0] + 180) * node.width) / 360,
            ((-coordinates[j][1] + 90) * node.height) / 180
          );
        }
      }
      context.stroke();
    },
    resize: function () {
      const ele = document.querySelector("#coastline");
      ele.style.width = `${window.innerWidth}px`; // 控制显示大小
      ele.style.height = `${window.innerHeight}px`; // 控制显示大小
      this.canvasObj = Canvas.setTarget("#coastline");
      this.draw(globalGeo);
    },
  };

  var canvas = document.getElementById("particles");

  const pxRatio = Math.max(Math.floor(window.devicePixelRatio) || 1, 2);
  canvas.width = canvas.clientWidth * pxRatio;
  canvas.height = canvas.clientHeight * pxRatio;

  const gl = canvas.getContext("webgl", { antialiasing: false });

  const wind = new WindGL(gl);
  wind.numParticles = 100;

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

  map.init();

  let count = 0;

  getWindData();

  function frame() {
    if (wind.windData) {
      wind.draw();
    }
    // if (count < 1000) {
    requestAnimationFrame(frame);
    //   count++;
    // }
  }
  frame();

  // insertLink({ title: "绘制粒子", linkIndex: 104 });
};
