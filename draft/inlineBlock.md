# 关于`display: inline-block`产生的间隙
## 想法
最近在看自己笔记的时候，看到了关于`display: inline-block`产生的间隙的记录，就简单的记录了一下，自己完全不能回忆起来。随即在网上搜了一下，相关的博客也是蛮多的，但里面的讲解不太符合个人的理解方式，还是自己回顾详细记录一下。
## 约定
以下所有的示例基于的html结构如下：
```html
  <ul>
    <li></li>
    <li></li>
    <li></li>
  </ul>
```
这里对不同内核浏览器进行了验证，并没有对所有的浏览器进行验证。

## 现象
在比较早的时候，不少的布局是用`float`属性完成。随着标准和浏览器的不断更新，布局的方式变多，原本目的不是用来布局的`float`属性，逐渐不被提倡使用。例如比较常见的横向排列布局，就可以利用`display: inline-block`的特性进行完成。但这个方式有一种问题：会出现间隙，间隙在水平和竖直方向都有。
如下图所示。
![inline-block-problem.png](../images/inline-block-problem.png)

## 原因
先来了解

## 相关资料
- https://www.w3.org/TR/CSS22/visuren.html#x17