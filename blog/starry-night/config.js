var shapeConfig = [
  {
    type: "circle",
    attributes: {
      cx: 78,
      cy: 29,
      r: 12,
      fill: "url(#circle1)",
    },
    gradient: {
      type: "radialGradient",
      id: "circle1",
      stopEle: [
        { offset: "20%", "stop-color": "#d49100" },
        { offset: "21%", "stop-color": "#d5cd55" },
        { offset: "79%", "stop-color": "#d5cd55" },
        { offset: "80%", "stop-color": "#abb511" },
      ],
    },
  },
  {
    type: "circleGap",
    attributes: {
      cx: 78,
      cy: 29,
      r: 12,
      fill: "transparent",
    },
    gradient: {
      type: "linearGradient",
      id: "circleGap1",
      stopEle: [
        { offset: "10%", "stop-color": "#ff75c3" },
        { offset: "100%", "stop-color": "#ffa647" },
      ],
    },
    config: [
      {
        gap: 4,
        stroke: "url(#circleGap1)",
        "stroke-width": "1",
        // "stroke-dasharray": 5,
      },
      {
        gap: 8,
        stroke: "url(#circleGap1)",
        "stroke-width": "1",
        // "stroke-dasharray": 6,
      },
      {
        gap: 12,
        stroke: "url(#circleGap1)",
        "stroke-width": "1",
        // "stroke-dasharray": 10,
      },
      {
        gap: 16,
        stroke: "url(#circleGap1)",
        "stroke-width": "1",
        // "stroke-dasharray": 10,
      },
      {
        gap: 20,
        stroke: "url(#circleGap1)",
        "stroke-width": "1",
        // "stroke-dasharray": 10,
      },
      {
        gap: 24,
        stroke: "url(#circleGap1)",
        "stroke-width": "1",
        // "stroke-dasharray": 17,
      },
    ],
  },
  {
    type: "circle",
    attributes: {
      cx: 179,
      cy: 20,
      r: 5,
      fill: "url(#circle1)",
    },
    gradient: {
      type: "radialGradient",
      id: "circle1",
      stopEle: [
        { offset: "20%", "stop-color": "#d49100" },
        { offset: "21%", "stop-color": "#d5cd55" },
        { offset: "79%", "stop-color": "#d5cd55" },
        { offset: "80%", "stop-color": "#abb511" },
      ],
    },
  },
  {
    type: "bg", // 绘制背景图像
    attributes: {
      href: './bg-24.png',
      x:0,
      y:522,
      width: '1300px',
      height: '520px',
    },
  }
]