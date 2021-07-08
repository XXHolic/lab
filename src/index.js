console.info('6688 js')

var config = {
  level1Type: 1, // 1 -或，2 - 与
  config: [
    {
      level2Type: 1,
      config: [
        {
          level3Type: 0,
          config: [
            {
              levelType: 0,
              config: [],
            },
          ],
        },
      ],
    },
  ],
};

var config2 = {
  level1Type: 1, // 1 -或，2 - 与
  level2Type: [0],
  level3Type: [1],
  config: [
    [
      {
        type: "label",
        labelType: "",
        judgeType: 1, // 等于 不等于的值
        labelValue: "",
      },
    ],
    [
      {
        type: "label",
        labelType: "",
        judgeType: 1, // 等于 不等于的值
        labelValue: "",
      },
    ],
  ],
};