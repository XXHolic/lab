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