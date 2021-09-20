var shapeConfig = [
  {
    type: "bgColor", // 绘制背景色
  },
  {
    type: "base", // 其它图形会引用的基础图形
    groupAttributes: {
      // 默认分组元素 g 的属性
      "role-explain": "base shape",
    },
    config: [
      {
        type: "path",
        attributes: {
          id: "circle6Moon",
          d: "M62,1c3.25.83,1.53-.49,3,2C45.71,15.55,33.17,56.24,50,81c13.75,20.23,43.86,29.27,79,25v1c-5.79,4.59-9,12.57-15,17-10,7.37-21.78,11.82-36,15-12.85,2.87-27.57-2.26-35-6-6.23-3.13-11.72-5.07-17-9C8.46,111-7.47,75.06,5,45A75,75,0,0,1,45,5Z",
        },
      },
    ],
  },
  {
    type: "circle",
    groupAttributes: {
      "role-explain": "circle 1",
    },
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
    concentric: {
      // 同心圆配置
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
  },
  {
    type: "circle",
    groupAttributes: {
      "role-explain": "circle 2",
    },
    attributes: {
      cx: 293,
      cy: 34,
      r: 10,
      fill: "#c68e15",
    },
    concentric: {
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
        },
        {
          gap: 12,
          stroke: "#79a7bf",
          "stroke-width": "1",
        },
        {
          gap: 17,
          stroke: "#577376",
          "stroke-width": "1",
        },
        {
          gap: 22,
          stroke: "#adc6c3",
          "stroke-width": "1",
        },
      ],
    },
  },
  {
    type: "circle", // 第 3 个圆
    groupAttributes: {
      "role-explain": "circle 3",
    },
    attributes: {
      cx: 442,
      cy: 41,
      r: 9,
      fill: "#b59b13",
    },
    concentric: {
      attributes: {
        cx: 442,
        cy: 41,
        r: 9,
        fill: "transparent",
      },
      config: [
        {
          gap: 6,
          stroke: "#9d900e",
          "stroke-width": "1",
        },
        {
          gap: 12,
          stroke: "#a0b678",
          "stroke-width": "1",
        },
        {
          gap: 18,
          stroke: "#bfccd4",
          "stroke-width": "1",
        },
        {
          gap: 24,
          stroke: "#afbc6c",
          "stroke-width": "1",
        },
        {
          gap: 30,
          stroke: "#cbceef",
          "stroke-width": "1",
        },
      ],
    },
  },
  {
    type: "circle", // 第 4 个圆
    groupAttributes: {
      "role-explain": "circle 4",
    },
    attributes: {
      cx: 531,
      cy: 68,
      r: 2,
      fill: "#96531e",
    },
    concentric: {
      attributes: {
        cx: 531,
        cy: 68,
        r: 2,
        fill: "transparent",
      },
      config: [
        {
          gap: 4,
          stroke: "#96531e",
          "stroke-width": "1",
        },
        {
          gap: 8,
          stroke: "#ceb60e",
          "stroke-width": "1",
        },
        {
          gap: 12,
          stroke: "#a59971",
          "stroke-width": "1",
        },
        {
          gap: 16,
          stroke: "#b8b9b3",
          "stroke-width": "1",
        },
        {
          gap: 20,
          stroke: "#8d9772",
          "stroke-width": "1",
        },
        {
          gap: 24,
          stroke: "#a59971",
          "stroke-width": "1",
        },
      ],
    },
  },
  {
    type: "circle", // 第 5 个圆
    groupAttributes: {
      "role-explain": "circle 5",
    },
    attributes: {
      cx: 794,
      cy: 89,
      r: 2,
      fill: "#c0ac39",
    },
    concentric: {
      attributes: {
        cx: 794,
        cy: 89,
        r: 2,
        fill: "transparent",
      },
      config: [
        {
          gap: 4,
          stroke: "#bcc4af",
          "stroke-width": "1",
        },
        {
          gap: 10,
          stroke: "#8f8b2a",
          "stroke-width": "1",
        },
        {
          gap: 14,
          stroke: "#9cac9f",
          "stroke-width": "1",
        },
        {
          gap: 20,
          stroke: "#c1ce72",
          "stroke-width": "1",
        },
        {
          gap: 24,
          stroke: "#a2b269",
          "stroke-width": "1",
        },
        {
          gap: 30,
          stroke: "#c9dc8b",
          "stroke-width": "1",
        },
        {
          gap: 34,
          stroke: "#7ea0ce",
          "stroke-width": "1",
        },
        {
          gap: 40,
          stroke: "#9ebbf7",
          "stroke-width": "1",
        },
        {
          gap: 44,
          stroke: "#c9dc8b",
          "stroke-width": "1",
        },
        {
          gap: 50,
          stroke: "#9ebbf7",
          "stroke-width": "1",
        },
      ],
    },
  },
  {
    type: "circle",
    groupAttributes: {
      "role-explain": "circle 6",
    },
    attributes: {
      cx: 1182,
      cy: 182,
      r: 69,
      fill: "#cacb8f",
      class: "circle-moon",
    },
    moon: {
      x: 1113,
      y: 113,
      href: "#circle6Moon",
      fill: "#e3c71e",
    },
    concentric: {
      attributes: {
        cx: 1182,
        cy: 182,
        r: 69,
        fill: "transparent",
      },
      config: [
        {
          gap: 10,
          stroke: "#b79f09",
          "stroke-width": "1",
        },
        {
          gap: 20,
          stroke: "#e1eba6",
          "stroke-width": "1",
        },
        {
          gap: 30,
          stroke: "#cdd29c",
          "stroke-width": "1",
        },
        {
          gap: 40,
          stroke: "#e0dea3",
          "stroke-width": "1",
        },
        {
          gap: 50,
          stroke: "#cbdcd2",
          "stroke-width": "1",
        },
        {
          gap: 60,
          stroke: "#dde5aa",
          "stroke-width": "1",
        },
        {
          gap: 70,
          stroke: "#c5d3b9",
          "stroke-width": "1",
        },
        {
          gap: 86,
          stroke: "#c7e2c3",
          "stroke-width": "1",
        },
      ],
    },
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