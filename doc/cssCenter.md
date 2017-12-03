## CSS居中初级理解
### 想法
在工作刚开始的时候，对CSS还是很有热情的，也花了时间看了些相关的书籍，做了相关的尝试。随着工作经验积累，手上的事情也越来越多，大部分时候根据已有的经验快速解决问题。时间久了，知道怎么写出这个效果，但写的时候往往很少再去想一下，这个属性的具体作用。所以在此对经常使用的CSS属性“再想一下”。
### 约定
“再想一下”更多的是去理解规范标准，在这里就不会去比较它们的优劣，如果理解了这些，我想到时候自然知道如何去选择。CSS居中在设计和代码实现中用的很多，居中效果需要有一个参照物，下面CSS实现方法前提是，都有一个一定高度和宽度的父元素。
### 居中
经常遇到的居中效果主要有2种：水平居中和垂直居中。需要居中的元素高宽度可能有或没有，为了方便理解，先以有固定高宽度元素为例。html的结构如下：
```html
<div class="css-center-parent">
  <div class="css-center-rec"></div>
</div>
```
基本的属性如下：
```css
.css-center-parent {
  border: 1px solid #333;
  width: 300px;
  height: 185px;
}
.css-center-rec {
  border: 1px solid #333;
  width: 100px;
  height: 62px;
}
```
### 水平居中
方法1：使用margin让元素居中
```css
.ma {
  margin: 0 auto;
}
```
margin是一个简写属性，上面的意思就是margin-top和margin-bottom值为0，margin-left和margin-right值为auto，可为什么左右值为auto就可以水平居中了？找文档走起，文档里面对取值为auto单独的有一个说明链接[calculating widths and margins](https://www.w3.org/TR/CSS22/visudet.html#Computing_widths_and_margins)，过去之后发现计算margin的值是跟其它的属性也有关系，按情况分有10种情况，这个例子是属于第3种情况：在正常文档流中的块级非替换元素。
> 3. block-level, non-replaced elements in normal flow  

相互影响的属性是有下面一个强制约定的关系：
> 'margin-left' + 'border-left-width' + 'padding-left' + 'width' + 'padding-right' + 'border-right-width' + 'margin-right' = width of containing block

下面说了好几种更详情的情况，这个例属于最后说明：如果margin-left和margin-right值都是auto，那么它们渲染出来的值就相等。所以这样使用margin就让元素居中了。

方法2：改变居中元素display属性,父元素设置text-align: center;
```css
/* 添加到父元素上 */
.tc {
  text-align: center;
}
/* 添加到居中元素上 */
.dib {
display: inline-block;
}
```
在一些教程里面对text-align的解释是：指定元素文本的水平对齐方式。但这里是一个元素又不是文本，为什么就居中了？找文档走起，看了之后发现，这个感觉就是英文单词上的误导。这个属性描述的是块级元素里面内联一类内容如何对齐，并不是只针对文本。
> This property describes how inline-level content of a block container is aligned. 

元素设置了display: inline-block后也有了内联元素的特性，text-align也就生效了，所以就让元素居中了。

方法3：居中元素使用定位position和margin负值



















