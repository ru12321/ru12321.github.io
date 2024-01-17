---
title: JavaScript基础
date: 2024-01-17
category: javascript
---

学习资料

https://www.runoob.com/js/js-howto.html

https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web



# 一、js基础

## js简介

JavaScript 已经由 ECMA（欧洲电脑制造商协会）通过 ECMAScript 实现语言的标准化。

ECMAScript 6 也称为 ECMAScript 2015。

ECMAScript 7 也称为 ECMAScript 2016。

![image-20220919135414757](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/image-20220919135414757.png)



## js用法

* HTML 中的 Javascript 脚本代码必须位于 **<script>** 与 **</script>** 标签之间。

* 浏览器会在页面加载时，解释并执行位于 `<script> `和 `</script>`之间的 JavaScript 代码 

* 也可以把脚本保存到外部文件中。外部文件通常包含被多个网页使用的代码。
* Chrome浏览器的开发者模式中的snippets可以编写代码

![image-20220919140217951](https://picbed-for-mrru-mdfile.oss-cn-chengdu.aliyuncs.com/mrru-glodon/image-20220919140217951.png)



## js 输出

JavaScript 可以通过不同的方式来输出数据：

- 使用 **window.alert()** 弹出警告框。
- 使用 **document.write()** 方法将内容写到 HTML 文档中。
- 使用 **innerHTML** 写入到 HTML 元素。
- 使用 **console.log()** 写入到浏览器的控制台。



示例1

```html
<!DOCTYPE html>
<html>
<body>

<h1>我的第一个 Web 页面</h1>

<p id="demo">我的第一个段落</p>

<script>
	document.getElementById("demo").innerHTML = "段落已修改。";
</script>

</body>
</html>
```

**document.getElementById("demo")** 是使用 id 属性来查找 HTML 元素的 JavaScript 代码 。

**innerHTML = "段落已修改。"** 是用于修改元素的 HTML 内容(innerHTML)的 JavaScript 代码。



示例2

```html
<!DOCTYPE html>
<html>
<body>

<h1>我的第一个 Web 页面</h1>

<p>我的第一个段落。</p>

<button onclick="myFunction()">点我</button>

<script>
function myFunction() {
    document.write(Date());
}
</script>

</body>
</html>
```

请使用 document.write() 仅仅向文档输出写内容。

==如果在文档已完成加载后执行 document.write，整个 HTML 页面将被覆盖。==



## js语法

### 字面量

**数字（Number）字面量** 可以是整数或者是小数，或者是科学计数(e)。 123e5

**字符串（String）字面量** 可以使用单引号或双引号:  

**表达式字面量** 用于计算：   5+6   5*10

**数组（Array）字面量** 定义一个数组：

**对象（Object）字面量** 定义一个对象：

**函数（Function）字面量** 定义一个函数：  function myAdd(a){return a + 1;}

### 变量

JavaScript 使用关键字 **var** 来定义变量， 使用等号来为变量赋值；

变量是一个**名称**。字面量是一个**值**

- **变量必须以字母开头**
- 变量也能以 $ 和 _ 符号开头（不过我们不推荐这么做）
- 变量名称对大小写敏感（y 和 Y 是不同的变量）

未使用值来声明的变量，其值实际上是 undefined

```js
var carname;
```

---

ES6允许我们使用 **const 关键字**来定义一个常量，使用 **let 关键字**定义的限定范围内作用域的变量

### 语句

* 语句是用分号分隔

* 可以在文本字符串中使用反斜杠对代码行进行换行

```js
document.write("你好 \
世界!");
```

* JavaScript 是脚本语言，**浏览器会在读取代码时，逐行地执行脚本代码**

### 注释

* 双斜杠 **//** 后的内容将会被浏览器忽略
* 多行注释 /*  */

### 大小写

JavaScript 对大小写是敏感的。驼峰法的命名规则

### 数据类型

**值类型(基本类型)**：字符串（String）、数字(Number)、布尔(Boolean)、空（Null）、未定义（Undefined）、Symbol。

**引用数据类型（对象类型）**：对象(Object)、数组(Array)、函数(Function)，还有两个特殊的对象：正则（RegExp）和日期（Date）。

> *Symbol 是 ES6 引入了一种新的原始数据类型，表示独一无二的值。*

* 动态类型

意味着相同的变量可用作不同的类型：

```js
var x;               // x 为 undefined
var x = 5;           // 现在 x 为数字
var x = "John";      // 现在 x 为字符串
```

变量的数据类型可以使用 **typeof** 操作符来查看：

```js
typeof "John"                // 返回 string
typeof 3.14                  // 返回 number
typeof false                 // 返回 boolean
typeof [1,2,3,4]             // 返回 object
typeof {name:'John', age:34} // 返回 object
```



### 对象

* 对象由花括号分隔。在括号内部，对象的属性以名称和值对的形式 (name : value) 来定义。属性由逗号分隔：

* JavaScript 变量均为对象。当您声明一个变量时，就创建了一个新的对象。

访问对象属性

```js
person.lastName; //方式1

person["lastName"];//方式2
```

### 函数

函数就是包裹在花括号中的代码块，前面使用了关键词 function：

```js
function functionname()
{
    // 执行代码
}
```



https://www.runoob.com/js/js-scope.html



# 二、js进阶

## 1.js引擎、调用堆栈

Google V8 引擎是一个比较流行的 JavaScript 引擎示例。V8 引擎是在诸如 `Chrome` 和 `Node.js` 等内部使用的























































































































































































































































































































































































































































































































































































































