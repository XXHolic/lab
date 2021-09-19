var shapeConfig = [
  {
    type: "bgColor", // 绘制背景色
  },
  {
    type: "circle", // 第 1 个圆
    attributes: {
      cx: 126,
      cy: 46,
      r: 23,
      fill: "url(#circle1)",
    },
    gradient: {
      type: "radialGradient",
      id: "circle1",
      stopEle: [
        { offset: "20%", "stop-color": "#ca9c24" },
        { offset: "21%", "stop-color": "#d9d04d" },
        { offset: "79%", "stop-color": "#d5cd7a" },
        { offset: "80%", "stop-color": "#95a423" },
      ],
    },
  },
  {
    type: "circleGap",
    attributes: {
      cx: 126,
      cy: 46,
      r: 23,
      fill: "transparent",
    },
    // gradient: {
    //   type: "linearGradient",
    //   id: "circleGap1",
    //   stopEle: [
    //     { offset: "10%", "stop-color": "#ff75c3" },
    //     { offset: "100%", "stop-color": "#ffa647" },
    //   ],
    // },
    config: [
      {
        gap: 9,
        stroke: "#a7ba82",
        "stroke-width": "1",
        // "stroke-dasharray": 5,
      },
      {
        gap: 15,
        stroke: "#83a79d",
        "stroke-width": "1",
        // "stroke-dasharray": 6,
      },
      {
        gap: 21,
        stroke: "#d4d4de",
        "stroke-width": "1",
        // stroke: "url(#circleGap1)",
        // "stroke-dasharray": 10,
      },
      {
        gap: 27,
        stroke: "#b9cb65",
        "stroke-width": "1",
        // "stroke-dasharray": 10,
      },
      {
        gap: 33,
        stroke: "#a3c4e3",
        "stroke-width": "1",
        // "stroke-dasharray": 10,
      },
      {
        gap: 39,
        stroke: "#bac3ca",
        "stroke-width": "1",
        // "stroke-dasharray": 17,
      },
    ],
  },
  {
    type: "circle", // 第 2 个圆
    attributes: {
      cx: 293,
      cy: 34,
      r: 10,
      fill: "#c68e15",
    },
  },
  {
    type: "circleGap",
    attributes: {
      cx: 293,
      cy: 34,
      r: 10,
      fill: "transparent",
    },
    config: [
      {
        gap: 7,
        stroke: "#9f6406",
        "stroke-width": "1",
        // "stroke-dasharray": 5,
      },
      {
        gap: 12,
        stroke: "#79a7bf",
        "stroke-width": "1",
        // "stroke-dasharray": 6,
      },
      {
        gap: 17,
        stroke: "#577376",
        "stroke-width": "1",
        // stroke: "url(#circleGap1)",
        // "stroke-dasharray": 10,
      },
      {
        gap: 22,
        stroke: "#adc6c3",
        "stroke-width": "1",
        // "stroke-dasharray": 17,
      },
    ],
  },
  {
    type: "bgImage", // 绘制背景图像
    attributes: {
      href: "./images/bg1-24.png",
      x: 0,
      y: 42,
      width: "1300px",
      height: "1000px",
    },
  },
];