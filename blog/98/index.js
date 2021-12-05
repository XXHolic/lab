window.onload = function () {
  const page = {
    canvasObj: {},
    lineAttrs: {
      points: [],
      lineWidth: 1,
      lineCap: "round",
      strokeStyle: "rgba(0,148,255,1)",
      fillStyle: "rgba(0,148,255,1)",
    },
    init: function () {
      const canvasObj = new Canvas(360, 180);
      // canvasObj.attrs({ class: "demo-canvas" });
      document.querySelector("#container").appendChild(canvasObj.node);
      this.canvasObj = canvasObj;
      this.getData();
    },
    getData: function () {
      const _this = this;
      fetch("https://xxholic.github.io/lab/blog/98/geo.json")
        .then((response) => response.json())
        .then((res) => {
          _this.draw(res.features || []);
        });
    },
    draw: function (data) {
      const { lineAttrs, canvasObj } = this;
      let { width, height, translate, line, clear, node, resetTransform } =
        canvasObj;
      const len = data.length;
      for (let i = 0; i < len; i++) {
        const coordinates = data[i].geometry.coordinates;
        let points = [];
        for (let j = 0; j < line.length; j++) {
          points.push([
            ((coordinates[j][0] + 180) * node.width) / width,
            ((-coordinates[j][1] + 90) * node.height) / height,
          ]);
        }
        line({
          ...lineAttrs,
          points: points,
        });
      }
    },
    pageEvent: function () {},
  };

  page.init();
  // insertLink({ title: "JavaScript 数学曲线—星形线(Astroid)", linkIndex: 105 });
};
