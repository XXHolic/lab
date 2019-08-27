### xss csrf 防御怎么做
- xss：跨站脚本攻击，通过 HTML 注入篡改网页，插入恶意脚本。例如在访问链接上添加 script 代码。
- xss 解决方式：httpOnly，对输入编码
- csrf： 跨站点请求伪造
- csrf 解决方式：验证码， 添加随机 token

### [1,1,2,3] 去重，然后抓换为 [1,2,3,2,1]，然后求和
已解决

### 正则方式格式化金额千分位，例如 10000 抓换为 1,000

### 一个最多 5 位的金额数字，转换为汉字描述，例如 30123 转换为 三万零一百二十三
done

### 继承
解决

### 前端优化的方式
- 常见的写了 10 条，最后问还有没有其它的优化方式

### Object.create() 如果用 es5 怎么实现
```js
if (typeof Object.create !== "function") {
    Object.create = function (proto, propertiesObject) {
        if (typeof proto !== 'object' && typeof proto !== 'function') {
            throw new TypeError('Object prototype may only be an Object: ' + proto);
        } else if (proto === null) {
            throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
        }

        if (typeof propertiesObject != 'undefined') throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");

        function F() {}
        F.prototype = proto;

        return new F();
    };
}
```
### 链表
链表就是线性表的链式存储方式。链表的内存是不连续的，前一个元素存储地址的下一个地址中存储的不一定是下一个元素。链表通过一个指向下一个元素地址的引用将链表中的元素串起来。

链表中最基本的数据称为节点(node)。
- 单向链表：每一个节点包含了数据块和指向下一个节点的指针。
- 双向链表：每一个节点不仅存储指向下一个节点的指针，而且存储指向前一个节点的指针。第一个节点的前驱节点不是头结点，而是指向一个空指针。同样的，最后一个节点的后驱指向了一个空指针。
- 环链表：在链表的尾部增加一个指向头结点的指针，头结点也增加一个指向尾节点的指针，以及第一个节点指向头节点的指针，从而更方便索引链表元素。


### 空间复杂度 时间复杂度
- 时间复杂度是指执行算法所需要的计算工作量；
- 空间复杂度是指执行这个算法所需要的内存空间。

### 所有的同步变成异步的方式处理

### promise 规范中 caught 的传值
