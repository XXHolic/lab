window.onload = function () {
  let globalGeo = [];
  const page = {
    canvasObj: {},
    init: function () {
      this.canvasObj = Canvas.setTarget("#coastline");
      this.getData();
    },
    getData: function () {
      const _this = this;
      fetch("https://xxholic.github.io/lab/blog/98/geo.json")
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
      context.strokeStyle = "rgba(0,148,255,1)";
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
    pageEvent: function () {},
  };

  page.init();
  let timeoutHandler = null;
  window.onresize = function () {
    if (timeoutHandler) {
      clearTimeout(timeoutHandler);
    }
    timeoutHandler = setTimeout(() => {
      page.resize();
    }, 500);
  };
  insertLink({ title: "绘制粒子", linkIndex: 104, type: "blog" });
};
