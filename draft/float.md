# CSS浮动float相关初解
## 想法
前不久在维护公司一些项目的时候，发现不少地方用了float来进行布局，知道这个属性的作用效果，也知道怎么解决相关的问题，但就是不能进一步说出一个所以然来，看来是时候整理一下了。
## 约定
## 浮动的用途
浮动的设计的初衷，是为了实现文本环绕效果。在一些教程里面，关于浮动的介绍没有强调这个，而是讲如何利用这个属性的作用，去实现一些所谓“有趣”的效果。虽然拓展了思路，但感觉并没有用的合适。
## 浮动的介绍
W3C文档里面说的很简洁：这个属性指定一个盒子浮动到左边、右边还是不浮动。下面是摘取过来的基本特性。
> Value: left | right | none | inherit  
> Initial: none  
> Applies to: all,but see [9.7](https://www.w3.org/TR/CSS22/visuren.html#dis-pos-flo)  
> Inherited: no  

下面就是相关说明和一些注意项。
### 重要的认知
浮动使元素从正常的文档流中移除，脱离了正常的文档流。
### 值的作用
**left**  
元素会产生一个块级盒子向左浮动，正常的文档流会从这个盒子的右边和顶部开始。  
**right**  
跟“left”属性值类似，只是元素产生的块级盒子向右浮动，正常的文档流会从这个盒子的左边和顶部开始。  
**none**  
这个盒子不浮动。
### 浮动的约束规则

### 'display', 'position'和'float'的作用关系

## 参考：
- 《CSS权威指南》
- https://developer.mozilla.org/zh-CN/docs/CSS/float
- https://www.w3.org/TR/CSS22/visuren.html#x36
- http://www.iyunlu.com/view/css-xhtml/55.html
- http://www.iyunlu.com/view/css-xhtml/56.html
- https://www.cnblogs.com/cc156676/p/5682439.html