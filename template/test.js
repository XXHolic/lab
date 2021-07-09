// 后台提供入参示例
var a = {
  flowId: 126, // 流程id
  name: "测试流程-0708", // 流程名称
  nodeCategory: 20, // 节点分类： 1：开始；10：触发渠道；20：条件判断；30：控制件
  nodeType: 201, // 组件类型： 201：属性判断； 202：属性多分支；203： 事件判断；204： 事件多分支
  refAbTestNodeId: -1, // 对应AB测试节点
  // 属性判断入参
  flowNodeConfig: {
    targetTrueFlowNoteKey: "target_true_key_1", // 满足条件分支节点key
    targetFalseFlowNoteKey: "target_false_key_2", // 不满足条件分支节点key
    // 条件组关系
    propertyTree: {
      deleted: 0,
      childrenLogic: "and", // 条件组逻辑关系 ；and、or
      children: [
        {
          // 条件组1
          deleted: 0,
          childrenLogic: "and", // 条件组内部条件逻辑关系 ；and、or
          children: [
            {
              deleted: 0,
              childrenLogic: "and",
              children: [
                {
                  // 条件组具体属性
                  propertyTreePath: "123/456/111", // 多级属性把所有的父级都保存（方便前端回写展示）
                  property: "sex", // 属性
                  propertyValueType: "number", // 属性值类型；number、datetime、string
                  operator: "equalTo", // 运算符（greaterThan、lessThan、greaterThanOrEqualTo、lessThanOrEqualTo、equalTo、notEqual、in、notIn、betweenAnd）
                  judgeValueList: [
                    {
                      // 属性比较值
                      deleted: 0,
                      stringValue: "-1616580468",
                    },
                    {
                      deleted: 0,
                      stringValue: "417735337",
                    },
                  ],
                },
                {
                  deleted: 0,
                  propertyTreePath: "234/789/333",
                  childrenLogic: "and",
                  property: "level",
                  propertyValueType: "number",
                  operator: "equalTo",
                  judgeValueList: [
                    {
                      deleted: 0,
                      stringValue: "-1737437069",
                    },
                    {
                      deleted: 0,
                      stringValue: "-752865168",
                    },
                  ],
                },
              ],
            },
            {
              deleted: 0,
              childrenLogic: "and",
              children: [
                {
                  deleted: 0,
                  propertyTreePath: "aaa/bbb/ccc",
                  childrenLogic: "and",
                  property: "age",
                  propertyValueType: "number",
                  operator: "equalTo",
                  judgeValueList: [
                    {
                      deleted: 0,
                      stringValue: "-1081200983",
                    },
                    {
                      deleted: 0,
                      stringValue: "-967987223",
                    },
                  ],
                },
                {
                  deleted: 0,
                  propertyTreePath: "adb/dae/ead",
                  childrenLogic: "and",
                  property: "consume",
                  propertyValueType: "number",
                  operator: "equalTo",
                  judgeValueList: [
                    {
                      deleted: 0,
                      stringValue: "417695047",
                    },
                    {
                      deleted: 0,
                      stringValue: "518912754",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          // 条件组2
          deleted: 0,
          childrenLogic: "and",
          children: [
            {
              deleted: 0,
              childrenLogic: "and",
              children: [
                {
                  deleted: 0,
                  propertyTreePath: "123/456/111",
                  childrenLogic: "and",
                  property: "sex",
                  propertyValueType: "number",
                  operator: "equalTo",
                  judgeValueList: [
                    {
                      deleted: 0,
                      stringValue: "-379215701",
                    },
                    {
                      deleted: 0,
                      stringValue: "-876707017",
                    },
                  ],
                },
                {
                  deleted: 0,
                  propertyTreePath: "234/789/333",
                  childrenLogic: "and",
                  property: "level",
                  propertyValueType: "number",
                  operator: "equalTo",
                  judgeValueList: [
                    {
                      deleted: 0,
                      stringValue: "31558255",
                    },
                    {
                      deleted: 0,
                      stringValue: "1276696056",
                    },
                  ],
                },
              ],
            },
            {
              deleted: 0,
              childrenLogic: "and",
              children: [
                {
                  deleted: 0,
                  propertyTreePath: "aaa/bbb/ccc",
                  childrenLogic: "and",
                  property: "age",
                  propertyValueType: "number",
                  operator: "equalTo",
                  judgeValueList: [
                    {
                      deleted: 0,
                      stringValue: "-934870771",
                    },
                    {
                      deleted: 0,
                      stringValue: "-552504906",
                    },
                  ],
                },
                {
                  deleted: 0,
                  propertyTreePath: "adb/dae/ead",
                  childrenLogic: "and",
                  property: "consume",
                  propertyValueType: "number",
                  operator: "equalTo",
                  judgeValueList: [
                    {
                      deleted: 0,
                      stringValue: "-553143296",
                    },
                    {
                      deleted: 0,
                      stringValue: "-878795473",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
};

// 前端

var b = {
  flowId: 126, // 流程id
  name: "测试流程-0708", // 流程名称
  nodeCategory: 20, // 节点分类： 1：开始；10：触发渠道；20：条件判断；30：控制件
  nodeType: 201, // 组件类型： 201：属性判断； 202：属性多分支；203： 事件判断；204： 事件多分支
  refAbTestNodeId: -1, // 对应AB测试节点
  flowNodeConfig: {
    targetTrueFlowNoteKey: "target_true_key_1", // 满足条件分支节点key
    targetFalseFlowNoteKey: "target_false_key_2", // 不满足条件分支节点key
    // 条件组关系
    propertyTree: {
      // deleted: 0,
      childrenLogic: "and", // 条件组逻辑关系 ；and、or
      children: [
        {
          // 条件组1
          // deleted: 0,
          childrenLogic: "and", // 条件组内部条件逻辑关系 ；and、or
          children: [
            {
              // deleted: 0,
              childrenLogic: "and",
              children: [
                {
                  // 条件组具体属性
                  propertyTreePath: "123/456/111", // 多级属性把所有的父级都保存（方便前端回写展示）
                  property: "sex", // 属性
                  propertyValueType: "number", // 属性值类型；number、datetime、string
                  operator: "equalTo", // 运算符（greaterThan、lessThan、greaterThanOrEqualTo、lessThanOrEqualTo、equalTo、notEqual、in、notIn、betweenAnd）
                  judgeValueList: [
                    {
                      // 属性比较值
                      // deleted: 0,
                      stringValue: "-1616580468",
                    },
                    {
                      // deleted: 0,
                      stringValue: "417735337",
                    },
                  ],
                },
                {
                  // deleted: 0,
                  propertyTreePath: "234/789/333",
                  childrenLogic: "and",
                  property: "level",
                  propertyValueType: "number",
                  operator: "equalTo",
                  judgeValueList: [
                    {
                      // deleted: 0,
                      stringValue: "-1737437069",
                    },
                    {
                      // deleted: 0,
                      stringValue: "-752865168",
                    },
                  ],
                },
              ],
            },
            {
              // deleted: 0,
              childrenLogic: "and",
              children: [
                {
                  // deleted: 0,
                  propertyTreePath: "aaa/bbb/ccc",
                  childrenLogic: "and",
                  property: "age",
                  propertyValueType: "number",
                  operator: "equalTo",
                  judgeValueList: [
                    {
                      // deleted: 0,
                      stringValue: "-1081200983",
                    },
                    {
                      // deleted: 0,
                      stringValue: "-967987223",
                    },
                  ],
                },
                {
                  // deleted: 0,
                  propertyTreePath: "adb/dae/ead",
                  childrenLogic: "and",
                  property: "consume",
                  propertyValueType: "number",
                  operator: "equalTo",
                  judgeValueList: [
                    {
                      // deleted: 0,
                      stringValue: "417695047",
                    },
                    {
                      // deleted: 0,
                      stringValue: "518912754",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          // 条件组2
          deleted: 0,
          childrenLogic: "and",
          children: [
            {
              deleted: 0,
              childrenLogic: "and",
              children: [
                {
                  deleted: 0,
                  propertyTreePath: "123/456/111",
                  childrenLogic: "and",
                  property: "sex",
                  propertyValueType: "number",
                  operator: "equalTo",
                  judgeValueList: [
                    {
                      deleted: 0,
                      stringValue: "-379215701",
                    },
                    {
                      deleted: 0,
                      stringValue: "-876707017",
                    },
                  ],
                },
                {
                  deleted: 0,
                  propertyTreePath: "234/789/333",
                  childrenLogic: "and",
                  property: "level",
                  propertyValueType: "number",
                  operator: "equalTo",
                  judgeValueList: [
                    {
                      deleted: 0,
                      stringValue: "31558255",
                    },
                    {
                      deleted: 0,
                      stringValue: "1276696056",
                    },
                  ],
                },
              ],
            },
            {
              deleted: 0,
              childrenLogic: "and",
              children: [
                {
                  deleted: 0,
                  propertyTreePath: "aaa/bbb/ccc",
                  childrenLogic: "and",
                  property: "age",
                  propertyValueType: "number",
                  operator: "equalTo",
                  judgeValueList: [
                    {
                      deleted: 0,
                      stringValue: "-934870771",
                    },
                    {
                      deleted: 0,
                      stringValue: "-552504906",
                    },
                  ],
                },
                {
                  deleted: 0,
                  propertyTreePath: "adb/dae/ead",
                  childrenLogic: "and",
                  property: "consume",
                  propertyValueType: "number",
                  operator: "equalTo",
                  judgeValueList: [
                    {
                      deleted: 0,
                      stringValue: "-553143296",
                    },
                    {
                      deleted: 0,
                      stringValue: "-878795473",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
};


{
	"flowNodeId": 126, // 流程id
	"flowVersion": "2021-07-08 12:11:54", // 版本
	"targetTrueFlowNoteId": 111, // // 满足条件分支节点id
	"targetTrueFlowNoteKey": "target_true_key_1", // 满足条件分支节点key
	"targetFalseFlowNoteId": 222,   // 不满足条件分支节点id
	"targetFalseFlowNoteKey": "target_false_key_2", // 满足条件分支节点key
	// 属性判断详情
	"propertyTree": {
		"id": 1,
		"deleted": 0,
		"parentId": -1,// 根节点
		"childrenLogic": "and",
		// 条件组
		"children": [{
			"id": 2,
			"deleted": 0,
			"parentId": 1,
			"childrenLogic": "and", // 条件组逻辑；and、or
			"children": [{ // 条件属性
				"id": 3,
				"deleted": 0,
				"parentId": 2,
				"childrenLogic": "and",  // 条件组属性逻辑
				"judgeValueList": [],
				"children": [{  // 条件属性1
					"id": 4,
					"deleted": 0,
					"parentId": 3,
					"propertyTreePath": "123/456/111", // 多级属性把所有的父级都保存（方便前端回写展示）
					"childrenLogic": "and", // 子节点逻辑；and、or
					"property": "sex", // 属性
					"propertyValueType": "number",  // 属性值类型；number、datetime、string
					"operator": "equalTo", // 运算符（greaterThan、lessThan、greaterThanOrEqualTo、lessThanOrEqualTo、equalTo、notEqual、in、notIn、betweenAnd）
					"judgeValueList": [{ // 属性比较值
						"deleted": 0,
						"fncPropertyJudgeTreeNodeId": 4,
						"stringValue": "-1841362107"
					}, {
						"deleted": 0,
						"fncPropertyJudgeTreeNodeId": 4,
						"stringValue": "-931978639"
					}]
				}, {
					"id": 5,
					"deleted": 0,
					"parentId": 3,
					"propertyTreePath": "234/789/333",
					"childrenLogic": "and",
					"property": "level",
					"propertyValueType": "number",
					"operator": "equalTo",
					"judgeValueList": [{
						"deleted": 0,
						"fncPropertyJudgeTreeNodeId": 5,
						"stringValue": "801787438"
					}, {
						"deleted": 0,
						"fncPropertyJudgeTreeNodeId": 5,
						"stringValue": "-1384460404"
					}]
				}]
			}, {
				"id": 6,
				"deleted": 0,
				"parentId": 2,
				"childrenLogic": "and",
				"judgeValueList": [],
				"children": [{
					"id": 7,
					"deleted": 0,
					"parentId": 6,
					"propertyTreePath": "aaa/bbb/ccc",
					"childrenLogic": "and",
					"property": "age",
					"propertyValueType": "number",
					"operator": "equalTo",
					"judgeValueList": [{
						"deleted": 0,
						"fncPropertyJudgeTreeNodeId": 7,
						"stringValue": "1267468002"
					}, {
						"deleted": 0,
						"fncPropertyJudgeTreeNodeId": 7,
						"stringValue": "-28750075"
					}]
				}, {
					"id": 8,
					"deleted": 0,
					"parentId": 6,
					"propertyTreePath": "adb/dae/ead",
					"childrenLogic": "and",
					"property": "consume",
					"propertyValueType": "number",
					"operator": "equalTo",
					"judgeValueList": [{
						"deleted": 0,
						"fncPropertyJudgeTreeNodeId": 8,
						"stringValue": "-1097794123"
					}, {
						"deleted": 0,
						"fncPropertyJudgeTreeNodeId": 8,
						"stringValue": "1898152948"
					}]
				}]
			}]
		}, { // 条件组2
			"id": 9,
			"deleted": 0,
			"parentId": 1,
			"childrenLogic": "and",
			"judgeValueList": [],
			"children": [{
				"id": 10,
				"deleted": 0,
				"parentId": 9,
				"childrenLogic": "and",
				"judgeValueList": [],
				"children": [{
					"id": 11,
					"deleted": 0,
					"parentId": 10,
					"propertyTreePath": "123/456/111",
					"childrenLogic": "and",
					"property": "sex",
					"propertyValueType": "number",
					"operator": "equalTo",
					"judgeValueList": [{
						"deleted": 0,
						"fncPropertyJudgeTreeNodeId": 11,
						"stringValue": "-1892925322"
					}, {
						"deleted": 0,
						"fncPropertyJudgeTreeNodeId": 11,
						"stringValue": "381589151"
					}]
				}, {
					"id": 12,
					"deleted": 0,
					"parentId": 10,
					"propertyTreePath": "234/789/333",
					"childrenLogic": "and",
					"property": "level",
					"propertyValueType": "number",
					"operator": "equalTo",
					"judgeValueList": [{
						"deleted": 0,
						"fncPropertyJudgeTreeNodeId": 12,
						"stringValue": "745267673"
					}, {
						"deleted": 0,
						"fncPropertyJudgeTreeNodeId": 12,
						"stringValue": "-322981687"
					}]
				}]
			}, {
				"id": 13,
				"deleted": 0,
				"parentId": 9,
				"childrenLogic": "and",
				"judgeValueList": [],
				"children": [{
					"id": 14,
					"deleted": 0,
					"parentId": 13,
					"propertyTreePath": "aaa/bbb/ccc",
					"childrenLogic": "and",
					"property": "age",
					"propertyValueType": "number",
					"operator": "equalTo",
					"judgeValueList": [{
						"deleted": 0,
						"fncPropertyJudgeTreeNodeId": 14,
						"stringValue": "-2026833357"
					}, {
						"deleted": 0,
						"fncPropertyJudgeTreeNodeId": 14,
						"stringValue": "-1305236763"
					}]
				}, {
					"id": 15,
					"deleted": 0,
					"parentId": 13,
					"propertyTreePath": "adb/dae/ead",
					"childrenLogic": "and",
					"property": "consume",
					"propertyValueType": "number",
					"operator": "equalTo",
					"judgeValueList": [{
						"deleted": 0,
						"fncPropertyJudgeTreeNodeId": 15,
						"stringValue": "1833688321"
					}, {
						"deleted": 0,
						"fncPropertyJudgeTreeNodeId": 15,
						"stringValue": "-1308895166"
					}]
				}]
			}]
		}]
	}
}