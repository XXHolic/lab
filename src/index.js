// console.info('6688 js')

// var config = {
//   level1Type: 1, // 1 -或，2 - 与
//   config: [
//     {
//       level2Type: 1,
//       config: [
//         {
//           level3Type: 0,
//           config: [
//             {
//               levelType: 0,
//               config: [],
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

// var config2 = {
//   level1Type: 1, // 1 -或，2 - 与
//   level2Type: [0],
//   level3Type: [1],
//   config: [
//     [
//       {
//         type: "label",
//         labelType: "",
//         judgeType: 1, // 等于 不等于的值
//         labelValue: "",
//       },
//     ],
//     [
//       {
//         type: "label",
//         labelType: "",
//         judgeType: 1, // 等于 不等于的值
//         labelValue: "",
//       },
//     ],
//   ],
// };
const categoryTestData = [
  {
    title: "Health and Fitness",
    value: "1",
    key: "1",
    children: [
      {
        title: "Dispensary",
        value: "1001",
        key: "1001",
        children: [
          {
            title: "Gast. & Hepat Sys",
            value: "2107249XDS93ZKGC",
            key: "2107249XDS93ZKGC",
          },
          {
            title: "Gast. & Hepat Sys3333",
            value: "2107249XDS93ZKGC1",
            key: "2107249XDS93ZKGC1",
          },
        ],
      },
    ],
  },
  {
    title: "Personal Care",
    value: "2",
    key: "2",
    children: [
      {
        title: "Sanitary Protection",
        value: "2001",
        key: "2001",
        children: [
          {
            title: "Sanitary Napkin",
            value: "2107249XDS9ASNC0",
            key: "2107249XDS9ASNC0",
          },
        ],
      },
    ],
  },
];

// let arr = [];
// const findTreeData = (data) => {
//   data.forEach((ele) => {
//     const { title, children } = ele;
//     if (children && children.length) {
//       findTreeData(children);
//     } else {
//       arr.push(ele);
//     }
//   });
// };

// const testData = ["2107249XDS9ASNC0"];
// const res = findTreeData(categoryTestData);
// const res = testData.map((ele) => findTreeData(ele, categoryTestData));
// console.info("res", arr);

const testData = [
  {
    levelId: "11",
    levelName: "基本信息1-1",
    children: [
      {
        levelId: "22",
        levelName: "基本信息1-2-1",
        children: [
          {
            levelId: "33",
            levelName: "基本信息1-3-1",
            children: [
              {
                levelId: "44",
                levelName: "基本信息4",
                labelInfoList: [{ label: "apple", value: "4-1" }],
              },
              {
                levelId: "45",
                levelName: "基本信息5",
                labelInfoList: [{ label: "apple2", value: "4-2" }],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    levelId: "aa",
    levelName: "基本信息2-1",
    children: [
      {
        levelId: "bb",
        levelName: "基本信息2-2-1",
        children: [
          {
            levelId: "cc",
            levelName: "基本信息2-3-1",
            labelInfoList: [{ label: "phone", value: "3-1" }],
          },
          {
            levelId: "cc1",
            levelName: "基本信息2-3-2",
            labelInfoList: [{ label: "phone2", value: "3-2" }],
          },
        ],
      },
    ],
  },
];

const format = (data) => {
  const findAllLeafData = (baseData, result = [], level = "") => {
    baseData.forEach((ele, index) => {
      const { levelId, levelName, children, labelInfoList } = ele;
      let mark = level ? `${level}-${index}` : `${index}`;
      ele.pos = mark;
      if (children && children.length) {
        findAllLeafData(children, result, mark);
      } else {
        result.push(ele);
      }
    });
    return result;
  };

  return findAllLeafData(data);
};
// 根据 pos 位置信息，找到元素父级信息并组装所需格式
const getParentData = (data, leafData) => {
  const { pos } = leafData;
  const posArr = pos.split("-");
  const len = posArr.length;
  let childrenData = data; // 动态变化的数据
  const result = posArr.reduce(
    (acc, cur, index) => {
      const ele = childrenData[cur];
      const { levelId, levelName, children } = ele;
      acc.value.push(levelId);
      acc.text.push(levelName);
      if (children && children[posArr[index + 1]]) {
        childrenData = children;
      }
      return acc;
    },
    { value: [], text: [] }
  );

  return result;
  // switch (len) {
  //   case 4:
  //     {
  //       const firstEle = data[posArr[0]];
  //       const {
  //         levelId: firstValue,
  //         levelName: firstLabel,
  //         children: secLevel,
  //       } = firstEle;
  //       const secEle = secLevel[posArr[1]];
  //       const {
  //         levelId: secValue,
  //         levelName: secLabel,
  //         children: thirdLevel = [],
  //       } = secEle;
  //       const thirdEle = thirdLevel[posArr[2]];
  //       const {
  //         levelId: thirdValue,
  //         levelName: thirdLabel,
  //         children: fourthLevel = [],
  //       } = thirdEle;
  //       const fourthEle = fourthLevel[posArr[3]];
  //       const {
  //         levelId: fourthValue,
  //         levelName: fourthLabel,
  //         labelInfoList: [],
  //       } = fourthEle;

  //       acc[`${firstValue}/${secValue}/${thirdValue}/${fourthValue}`] = [
  //         firstLabel,
  //         secLabel,
  //         thirdLabel,
  //         fourthLabel,
  //       ];
  //       acc[`${firstValue}/${secValue}/${thirdValue}/${fourthValue}-data`] =
  //         labelInfoList;
  //     }
  //     break;
  // }
};

const res = format(testData);
console.info("res", res);
const combineData = res.map((ele) => {
  const result = getParentData(testData, ele);
  console.info("result", result);
});

// console.info("direct", testData[0].children[0]);
