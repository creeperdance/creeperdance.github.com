---
layout: post
title: JavaScript引用类型
date: 2017-05-19 01:05:13 +0800
categories:
  - javascript
---

说明：ECMAScript中常见引用类型有：Object类型、Array类型、Date类型、RepExp类型、Function类型。
除此之外,还有三种基本包装类型：Boolean、Number、String以便操作基本类型值，以及两个单体内置对象：Global、Math。
-参考《JavaScript高级程序设计(第3版)》


<br/><br/><br/><br/>
##   **引用类型**<br/>
<br/>
引用类型用于描述一类对象所具有的属性和方法，引用类型的值(对象，保存于堆内存中)是引用对象的一个实例。<br/>
引用类型常被称作类,但ECMAScript并不具备传统面向对象语言所支持的类和接口等基本结构，这种称呼并不恰当，它与类相似，但概念不同。<br/> <br/>
### **1.Object类型**
<br/><br/>
在Javascript中, 对象是  拥有属性和方法  的数据，**是某个特定引用类型的实例。**<br/>
创建方式：<br/>
**1.新对象使用new操作符后跟一个构造函数来创建:**<br/>
```javascript
var person = new Object();
```

**2.使用字面量表示法：**<br/>
&nbsp;&nbsp;&nbsp;&nbsp;由花括号分隔。
&nbsp;&nbsp;&nbsp;&nbsp;在括号内部，对象的属性以名称和值对的形式 (name : value) 来定义。属性由逗号分隔：
```javascript
var person={
	firstname : "John",
	lastname  : "Doe",
	id        :  5566
};
```




**声明变量类型：**<br/>
当您声明新变量时，可以使用关键词 "new" 来声明其类型：

```javascript
var carname =new String();
var x =      new Number();
var y =      new Boolean();
var person = new Object();
```


**访问对象属性:**

```javascript
//方式1：
person.lastName;
//方式2：
person["lastName"];
```

**访问对象方法:**

```javascript
objectName.methodName()
```

<br/><br/><br/><br/>
### **2.Array类型**<br/>
ECMAScript与其他语言一样,数组都是数据的有序列表。<br/>
ECMAScript中的**数组中的元素可以是不同类型。**<br/>
ECMAScript中的**数组的大小是可以动态调整的,即可以随着数据的添加自动增长以容纳新增数据。**<br/><br/>
#### **创建数组的两种方式：**<br/>
**1.使用Array构造函数：**<br/>
```javascript
var colors = new Array();
var colors = new Array(20);    //也可自定义数组长度。
var colors = new Array('red','blue','green');	//也可向构造函数传递数组应包含的项
var colors = Array(3);    //也可省略new操作符
```
**2.使用数组字面量法:**<br/>
```javascript
var colors = ['a','b','c'];
var colors = ['a','b',];	//会创建一个包含2或3项的数组，IE8及以前['a','b',undefined,其他['a','b'];
```
<br/><br/>
#### **读取数组的数据项**<br/>
使用方括号并提供相应值基于0的数字索引。<br/>
通过.length可访问数组的长度<br/>
```javascript
var colors  = [1,2,3];
alert(colors[2]);	//3
alert(colors.length);	//3
```
<br/><br/>
#### **检测数组**<br/>
**通过instanceof操作符**<br/>
```javascript
if(value instanceof Array){	//
	//...
}
```
**instanceof操作符**不适用于多个框架的特殊情况,因为它假定只有一个全局执行环境.当网页有多框架时,就有多个全局执行环境,因而会存在两个版本的Array构造函数,当传入数组发生冲突时可能会出错。<br/>
ES5新增了Array.isArray()方法,用于解决该问题。<br/>
```javascript
if(Array.isArray(value)){
	//...
}
```

<br/><br/>
#### **转换方法**<br/>
所有对象都有**toLocaleString()**、**toString()**、**valueOf()**方法。<br/>
调用数组的**toString()**方法：返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串。<br/>
调用数组的**valueOf()**方法：返回的还是数组。<br/>
```javascript
var colors = ['red','blue','green'];
alert(colors.toString());	//red,blue,green
alert(colors.valueOf());	//red,blue,green
alert(colors);	//red,blue,green  ,数组还要接受字符串参数，在后台调用toString()方法.
```
<br/>
#### **join()**
数组继承的toLocaleString()、toString()、valueOf()方法默认情况都以逗号(,)分割,若想使用不同分隔符创建字符串，可使用join()方法。<br/>
```javascript
var colors =['red','blue','green'];
alert(colors.join("||"));//red||blue||green
```

<br/><br/>
#### **栈，队列方法**<br/>
#### **栈方法**<br/>
栈是一种LIFO（last-in-first-out）的数据结构,最新添加的项最早被移出。<br/>
ECMAScript为数组提供了push()、pop()方法，以实现类似栈行为。<br/><br/>
#### **push()**<br/>

```javascript
var colos = new Array();
var count = colors.push('red','blue');
alert(count);	//2
count = count.push('green');
alert(count);	//3
```
#### **pop()**<br/>
```javascript
var item = colors.pop();
alert(item);	//'green'
alert(colors.length);	//2
```
<br/><br/>
#### **队列方法**<br/>
队列是一种FIFO（first-in-first-out）的数据结构,最早添加的项最早被移出。<br/>
ECMAScript为数组提供了push()、shift()方法，以实现类似队列行为,队列的push()方法和栈的push()方法为同一方法。<br/>
#### **push()**<br/>
```javascript
var colos = new Array();
var count = colors.push('red','blue');
alert(count);	//2
count = count.push('green');
alert(count);	//3
```
#### **shift()**<br/>
```javascript
var item = colors.shift();
alert(item);	//'red'
alert(colors.length);	//2
```
#### **unshift()**<br/>
ECMAScript还提供了unshift()方法，使用方法与shift()方法相反,向数组前端添加任意个项并返回新数组长度。同时使用unshift()和pop()可以模拟相反方向的队列。<br/>
```javascript
var colors = new Array();
var count = colors.unshift('red','green');
count = colors.unshift('black');
alert(count);	//3

var item = colors.pop();
alert(item);	//'green'
alert(colors.length);	//2
```
<br/><br/>
#### **重排序方法**<br/>
数值中已存在两个可用于排序的方法：reverse()、sort()方法.
#### **reverse()**<br/>
反转数组顺序。<br/>
```javascript
var values = [1,2,4,10,3];
values.reverse();
```
#### **sort**()<br/>
按升序排列数组项（调用每个数组项的头String()转型方法,得到比较的字符串，确定排序）
```javascript
var values = [1,2,4,10,3];
values.sort();
alert(values);	//1,10,2,3,4,即使每一项都是数值,也会转型成字符串再排序。
```
sort()方法可以接收一个比较函数作为参数，以便指定哪个值位于哪个值之前。<br/>
比较函数接收两个参数,第一个参数应该位于第二个参数之前则返回一个负数，相等则返回0，若第一个参数应位于第二个参数之后返回1。<br/>

```javascript
function compare(value1 ,value2){
	if(value1 < value2){
		return -1;
	}else if(value1 > value2){
		retunrn 1;
	}else{
		return 0;
	}
}
var values = [1,2,4,10,3];
values.sort();
alert(values);	//1,2,3,4,10
```
<br/><br/>
#### **操作方法**<br/>
#### **concat()**<br/>
基于当前函数数组创建一个新数组(当前数组副本),将接收到的参数添加到这个副本的末尾。<br/>
不改变原数组<br/>
```javascript
var colors = ['red','green','blue'];
var colors2 = colors.concat("yellow",["black","brown"]);
alert(colors);    //red,green,blue
alert(colors2);    //red,green,blue,yellow,black,brown
```
<br/><br/>

#### **slice()**<br/>
基于当前数组中的一或多项创建一个新数组,接收一或两个参数(要返回的起始和结束位置)<br/>
不改变原数组,包括起始位置的项，不包括结束位置的项<br/>
```javascript
var colors = ['red','green','blue','yellow','purple'];
var colors2 = colors.slice(1);
var colors3 = colors.slice(1,4);
alert(colors2);    //green,blue,yellow,purple
alert(colors3);	   //green,blue,yellow
```
<br/><br/>

#### **splice()**<br/>
splice()有很多种用法，主要操作方式有：删除、插入、替换。<br/>
splice()会改变原数组，返回的是删除后的元素，若未删除任何项，则返回空数组。<br/>
**接受参数：**<br/>
- 第一个参数：操作的起始位置
- 第二个参数：要删除项的个数,从操作的起始位置算起,如果为0,则表示不删除，返回空数组。
- 第三个参数：要添加的元素(可多个),在执行删除操作后进行添加。

<br/>

**删除：**<br/>
```javascript
var colors = ['red','green','blue'];
var removed = colors.splice(0,1);	//删除第一项
alert(colors);    //'green','blue'
alert(removed);    //'red'
```
**插入：**<br/>
```javascript
var colors = ['green','blue'];
var removed = colors.splice(1,0,'yellow','orange');	//不删除，从位置1开始插入两项
alert(colors);    //'green','blue','yellow','orange'
alert(removed);    //返回的是一个空数组
```
**替换：**<br/>
```javascript
var colors = ['green','yellow','orange','blue'];
var removed = colors.splice(1,1,'red','purple');	//删除1项,并从位置1开始添加两项
alert(colors);    //'green','red','purple','orange','blue'
alert(removed);    //'yellow'
```
<br/><br/>


#### **位置方法**<br/>
ECMAScript5为数组实例新增了两个位置方法,indexOf()和lastIndexOf()。<br/>
这两个函数都返回查找的项在数组中的位置,未找到则返回-1。<br/>
在比较第一个参数与数组的每一项时，使用全等操作符(===)。<br/> 
这两个方法都接收两个参数：<br/>
1. 要查找的项
2. 查找起点位置的索引(可选)

#### **indexOf()**<br/>
```javascript
var numbers = [1,2,3,4,5,4,3,2,1];
alert(numbers.indexOf(4));	  //3
alert(numbers.indexOf(4,4));	//5;

var person = {name:"Nicholas"};
var people = [{name:"Nicholas"}];
var morePeople = [person];

alert(people.indexOf(person));	  //-1,类型不匹配
alert(morePeople.indexOf(person));	  //0
```
#### **lastIndexOf()**<br/>
lastIndexOf()方法从数组末尾开始向前查找,其他同indexOf。<br/>

```javascript
var numbers = [1,2,3,4,5,4,3,2,1];
alert(numbers.lastIndexOf(4));	  //5
alert(numbers.lastIndexOf(4,4));	//3;
```

<br/><br/>


#### **迭代方法**<br/>
ECMAScript为数组定义了5个迭代方法，每个迭代方法都需要传入一个这样的函数:<br/>
```javascript
function(item,index,array){
	
}
```
**参数意义**：<br/>
- 数组项的值
- 该项在数组的位置
- 数组对象本身

#### **every()**<br/>
检测数组中的每一项是否符合条件,返回结果为布尔值,仅当函数中所有条件满足才返回true。<br/>
```javascript
var numbers = [1,2,3,4,5,4,3,2,1];
var result = numbers.every(function(item,index,array){
	return (item > 3);
});
alert(result);	  //false
```

<br/><br/>

#### **some()**<br/>
与every()相似,不同的是some()只要函数中有一个条件满足就返回true。<br/>
```javascript
var numbers = [1,2,3,4,5,4,3,2,1];
var result = numbers.some(function(item,index,array){
	return (item > 3);
});
alert(result);	  //true
```

<br/><br/>

#### **filter()**<br/>
筛选出数组中符合条件的值,组成新数组。<br/>
```javascript
var numbers = [1,2,3,4,5,4,3,2,1];
var result = numbers.filter(function(item,index,array){
	return (item > 2);
});
alert(result);	  //[3,4,5,4,3]
```

<br/><br/>

#### **map()**<br/>
让数组的每一项通过某种操作产生一个新数组。<br/>
```javascript
var numbers = [1,2,3,4,5,4,3,2,1];
var result = numbers.map(function(item,index,array){
	return item * 2;
});
alert(result);	  //[2,4,6,8,10,8,6,4,2]
```

<br/><br/>

#### **forEach()**<br/>
让数组的每一项执行某些操作,无返回值。<br/>
```javascript
var numbers = [1,2,3,4,5,4,3,2,1];
var result = numbers.forEach(function(item,index,array){
	console.log(item);
});
//在控制台打印numbers数组
```

<br/><br/>

#### **归并方法**<br/>
迭代数组的所有项,构建一个最终返回的值。<br/>
可传入参数：<br/>
如下执行函数和作为归并基础的初始值(可选)<br/>
```javascript
function(pre,cur,index,array){
	
}
```
**参数意义**：<br/>
- 前一个值
- 当前值
- 数组项的索引
- 数组对象本身


#### **reduce()**<br/>
从数组的第一项开始，逐个遍历，可以执行。
```javascript
	var values = [1,2,3,4,5];
	var sum = values.reduce(function(prev,cur,index,array){
		return prev+cur;
	},2);
	alert(sum);	   //17
```
#### **reduceRight()**<br/>
与reduce()作用相似，只不过方向相反。
```javascript
	var values = [1,2,3,4,5];
	var sum = values.reduceRight(function(prev,cur,index,array){
		return prev+cur;
	},2);
	alert(sum);	   //17
```
<br/><br/><br/><br/><br/><br/>


### **3.Date类型**<br/>
ECMAScript的Date类型是在早期Java的java.util.Date基础上上创建的。因此Date类型使用自UTC至1970年1月1日0时起经过的毫秒
数来保存日期。<br/>
#### **创建日期对象**<br/>
```javascript
var now = new Date();	//不传参，则自动获取当前时间
var someDate = new Date(10000);	   //传参，获取UTC时间1970年1月1日0时起经过10000毫秒后的时间
```
<br/>
为简化上述计算过程，ECMAScript提供了两个方法:Date.parse()、Date.UTC()。<br/>
#### **Date.parse()**<br/>
接收参数:表示日期的字符串参数，若传入的字符串不能表示日期，则返回NaN。<br/>
返回值：返回相应日期的毫秒数。<br/>
<br/>
```javascript
var someDate = new Date(Date.parse("May 25,2004"));
```
如果将表示日期的字符串传给Date构造函数，也会在后台调用Date.parse()，所以上述代码等价于:<br/>
```javascript
var someDate = new Date("May 25,2004");
```
<br/>
#### **Date.UTC()**<br/>
接收参数：年份、基于0的月份、月中的哪天、小时数、分钟、秒、毫秒数(仅年月必须)，如果没提供天数则为1，其他缺省都为0。<br/>
返回值：返回相应日期的毫秒数。<br/>
同上，如果将表示日期的字符串传给Date构造函数，也会在后台调用Date.UTC()。<br/>
```javascript
var y2k = new Date(Date.UTC(2000,0));
var allFives = new Date(Date.UTC(2005,4,5,17,55,55));
//直接传给Date()构造函数
var y2k = new Date(2000,0);
var allFives = new Date(2005,4,5,17,55,55);
```
<br/>
#### **Date.now()**<br/>
ECMAScript5添加了Date.now()方法，返回表示调用这个方法时的日期和时间的毫秒数。<br/>
该方法主要应用于分析代码工作。<br/>
```javascript
var start = Date.now();
//调用函数
doSomething();
var end = Date.now();
var result = end - start;
```
对于一些不支持该方法的浏览器,实现同效果的代码：<br/>
```javascript
var start = +new Date();
//调用函数
doSomething();
var end = +new Date();
var result = end - start;
```
<br/>
#### **重写Object方法**<br/>
Date类型也重写了toLocaleString(),toString(),valueOf()方法，但这些方法返回的值与其他类型中的方法不同。<br/>
toLocaleString():按照与浏览器设置的地区适应的格式返回日期和时间。<br/>
toString():返回带有时区信息的日期和时间。<br/>
valueOf():返回日期的毫秒表示。<br/>
```javascript
	var date1 = new Date(2007,0,1);
	var date2 = new Date(2007,1,1);
	alert(date1　< date2);	  //true
```

<br/>
#### **日期/时间组件方法**<br/>


|方法		                |				说明        |
|    ------:                |            :-------:      | 
|getFullYear()：|返回四位数的年份。 |
|getYear()：|返回两位数的年份。 |
|getMonth()：|返回月份。 |
|getDate()：|返回月份里的日期。 |
|getDay()： |返回星期几。每周从星期六开始（0－6）。 |
|getHours()：|返回时间的小时部分。 |
|getMinutes()：|返回时间的分钟部分。| 
|getSeconds()：|返回时间的秒部分。 |
|getTime()：|返回自从1970年1月1日午夜以来的毫秒数。| 
|getUTCFullYear()：|根据协调世界时返回四位数的年份。 |
|getUTCMonth()：|根据协调世界时（0－11）返回月份。 |
|getUTCDate()：|根据协调世界时（UTC）返回月份里的日期。 |
|getUTCHours()：|根据协调世界时返回时间的小时部分。 |
|getUTCMinutes()：|根据协调世界时返回时间的分钟部分。| 
|getUTCSeconds()：|根据协调世界时返回时间的秒部分。 |
|getMilliseconds()：|返回时间的毫秒部分。| 
|getUTCMilliseconds()：|根据协调世界时返回时间的毫秒部分。| 
|getTimezoneOffset()：|返回本地时间与格里尼治标准时间（GMT）之间的分钟差。 

<br/>
#### **与上述get方法对应的set方法：**<br/>
setFullYear <br/>
setMonth <br/>
setDate	<br/>
setHours <br/>
setMinutes <br/>
setSeconds <br/>
setTime <br/>
setMilliseconds <br/>
setUTCFullYear <br/>
setUTCMonth <br/>
setUTCHours <br/>
setUTCSeconds <br/>
setUTCMilliseconds <br/>

<br/><br/><br/><br/><br/><br/>

### **4.RegExp类型**<br/><br/>
ECMAScript通过RegExp类型来支持正则表达式，对此的介绍将集中在<a href="{{ site.url}}/2017/05/Javascript-RegExp.html">《Javascript正则表达式》</a>。
<br/><br/><br/><br/>

### **5.Function类型**<br/>
在ECMAScript中，**函数实际上就是对象。**<br/>
**每个函数都是都是Function类型的实例，都和其他引用类型一样具有属性和方法。**<br/>
**函数名实际是一个指向函数对象的指针，不会与某个函数绑定。**<br/>
<br/><br/>
#### **声明方式：**<br/>
1. 普通的函数声明
```javascript
function box(num1,num2){
	return num1+num2;
}
```

2. 使用函数表达式
```javascript
var box = function(num1,num2){
	return num1+num2;
}
```

3. 使用Function构造函数,不推荐，导致解析两次代码
```javascript
var box=new Function('num1','num2','return num1+num2');
```

<br/><br/>
#### **函数语法**


- 无参
```javascript
function functionname()
{
	//执行代码
}
```

- 带参
```javascript
function myFunction(var1,var2)
{
	//代码
}
```

- 带有返回值
```javascript
function myFunction()
{
	var x=5;
	return x;
}
```
<br/>

<br/><br/>



#### **没有重载**<br/>
ECMAScript中的函数完全**靠函数名称唯一确定，不存在函数签名，不将参数列表作为区分函数的依据。**且函数为特殊对象，
**其函数名只是一个普通变量，且当定义两个名字相同的函数时，该名字只属于后定义的函数**，因而无法实现重载。
<br/><br/><br/><br/>




#### **函数声明与函数表达式**<br/>
在上述**函数声明**块中，我们知道有函数声明方式与函数表达式方式，二者使用上有什么不同呢？<br/>
解析器在**向执行的环境中加载数据时，对函数声明与函数表达式的解析方式不同。**<br/>
  **解析器会先读取函数声明**，并使其在执行代码之前可用(可以访问)。<br/>
  **而函数表达式必须等到解析器执行到它所在代码行，才会真正被解析。**
<br/>




#### **函数声明提升**<br/>  

首先看下面这段代码：<br/>
```javascript
alert(sum(10,10));	  //20
function sum(a,b){
	return a+b;
}
```

<br/>
以上代码完全可以正常运行，正是因为代码在开始执行之前，解析器已经通过一个名为**函数声明提升**的过程，将函数声明读取并添加到执行环境中。<br/>
当我们对代码进行求值时，**JavaScript引擎会把函数声明提升到顶部**。<br/>
<br/>

那么如果将函数声明改为等价的**函数表达式**呢?<br/>
```javascript
alert(sum(10,10));	  //报错"undefined identifier"(意外标识符)
var sum = function (a,b){
	return a+b;
}
```

以上代码在运行期间报错"undefined identifier"(意外标识符)。原因是**函数位于一个初始化语句中，而不是一个函数声明**，
即执行到函数所在语句之前，变量sum中并不会保存有对函数的引用。<br/><br/>

除了什么时候可以通过变量访问函数这点区别外，函数声明与函数表达式语法其实是等价的。<br/>

<br/><br/><br/><br/>



#### **作为值的函数：**<br/>
ECMAScript中函数名本身就是变量，所以**函数也可以作为值来使用。**<br/>
**可以向传递参数一样把一个函数传递给另一个函数。**<br/>
**可以把一个函数作为另一个函数的结果返回。**<br/><br/>

#### **作为值传参** <br/>

```javascript
function callSomeFunction(someFunction,someArgument){
	return someFunction(someArgument);
}
function add10(num){
	return num+10;
}
function getGreeting(name){
	return "Hello, "+name;
}

var result1 = callSomeFunction(add10,10);	  //20
var result2 = callSomeFunction(getGreeting,"Nicholas");	   //"Hello Nicholas"

```

**注意：要访问函数的指针而不执行函数，应该去掉函数名后的圆括号()。**<br/><br/>

#### **作为值返回** <br/>
经典应用：**根据某个对象属性对数组进行排序。**<br/>
回顾前文Array类型的sort()方法,它可以接收一个比较函数作为参数,那么这个比较函数一般需要两个参数，即比较的值。 <br/>
我们若要比较某个变量大小，可以直接传两个对应参数然后进行比较。那么问题来了，如果要按某个对象某个属性来比较呢？<br/>
在这种情况下，我们就可以定义一个函数用于接收这个属性，然后再根据这个属性名创建比较函数，具体如下:<br/>
```javascript
function createComparionFunction(propertyName){
	return function(object1,object2){
		var value1 = object1[propertyName];
		var value2 = object2[propertyName];
		
		if(value1 <　value2){
			return -1;
		}else if(value1 > value2){
			return 1;
		}else {
			return 0;
		}
	}
}
```
应用如下：<br/>
```javascript
	var data = [{name:"Zachary",age:28},{name:"Nicholas",age:29}];
	data.sort(createComparionFunction("name"));
	alert(data[0].name);	//"Nicholas"
	data.sort(createComparionFunction("age"));
	alert(data[0].name);	//"Zachary"
```
<br/><br/><br/><br/>



#### **函数内部属性：**<br/>
在函数内部，有两个特殊的对象:**arguments**和**this**。<br/>

#### **arguments**<br/>
- 一个类数组对象，**包含着传入函数的所有参数。**<br/>
- arguments[0]是第一个元素,length属性是传递参数个数。<br/>
- 这个对象还有一个名为callee的指针，指向拥有这个arguments对象的函数。<br/>
- ECMAScript函数不介意传递的参数个数，数据类型。正是因为可以通过函数内部arguments对象访问这个参数数组.<br/>
因而ECMAScript函数也不能像传统意义上那样实现重载，不过它可以模仿重载，对传入函数的类型和数量可作出不同反应。<br/>

```javascript
function doAdd(){
	if(argumens.length == 1){
		alert(arguments[0] + 10);
	}else if(arguments.length == 2){
		alert(argumens[0]+arguments[1]);
	}
}
doAdd(10);	  //20
doAdd(30,20);	//50
```

<br/>
#### **callee**<br/>
一个指针，指向拥有这个arguments对象的函数，即arguments.callee在哪个函数内运行，就指向哪一个函数。<br/>
主要应用于匿名函数，以及解除函数体内代码与函数名耦合的状态。<br/>
**解除耦合：**
```javascript
function box(num){
	if(num<=1){
		return 1;
	}else {
		return num*box(num-1);
	}
}
//上述递归函数内部会调用自身，如果函数名不该变则没有问题，若函数名改变，内部的自身调用则需要逐一改变，解决该问题：
function box(num){
	if(num<=1){
		return 1;
	}else {
		return num*argumens.callee(num-1);//使用callee调用自身
	}
}
```

<br/>
#### **this**<br/>
Javascript中的this与Java和C#中的this相似，引用的是函数执行的环境对象，是函数运行时，自动生成的一个内部对象，只能在函数内部使用。<br/>
this对象主要有四种使用场合，但不管哪种场合，**this指向的都是调用函数的那个对象。**<br/>

**this对象可以绑定到：**<br/>
1. 全局对象
2. 自定义对象
3. 构造函数生成的对象
4. 指定的对象，通过call或apply绑定

#### **1.全局对象**<br/>
函数为全局性调用，this代表全局对象Global。<br/>
如下代码:<br/>

```javascript
var x = 1;
function test(){
	this.x = 0;
}
test();
alert(x);	//0
```

<br/><br/>
#### **2.自定义对象**<br/>
函数作为某个对象的方法调用，this代表当前对象。<br/>
```javascript
var person = {
	name : "Nicholas",
	age : 0,
	grow :function (age){
		this.age = age;
	}
};
person.grow(29);
alert(person.age);	  //29，this代表当前对象person
```

<br/><br/>

#### **3.构造函数生成的对象**<br/>
构造函数：通过new调用函数，生成新对象。<br/>
作为构造函数调用，this代表该构造函数生成的新对象。<br/>
```javascript
function Person(age){
	this.age = age;
}
var p = new Person(29);
alert(p.age);	//29,this代表这个新生成的对象p
```

<br/><br/>

#### **4.指定对象，通过call或apply绑定**<br/>
- **apply()：**函数对象的一个方法，其作用是**改变函数的调用对象**，接收的第一个参数就表示改变后的调用该函数的对象。<br/>
- **call()：**与apply作用相同，接收的第一个参数的意义与apply()亦相同。<br/>

对于这两个函数，this指向的都是它们的第一个参数。<br/>

```javascript
var age = 0;
function test(){
　　alert(this.age);
}
var person = {
	age:29,
	personTest : test
};
//若未传参，则this指向全局对象
person.personTest.apply(); //0
//若传参，则this指向第一个参数person对象
person.personTest.apply(person); //29

```

<br/><br/>
#### **this绑定混乱**<br/>
```javascript
var age = 0;
var person = {
	age:0,
	grow : function(age){
		this.age = age;	   //当前this指向对象本身
		function test(age){
			this.age = age+10;    //当前this绑定到全局变量
		}
		test(age);
	}
}
person.grow(30);
alert(person.age);	  //30
alert(age);    //40
};
```

**解决方法：**
保存this指向的对象，一般用that，代替this。<br/>
```javascript
var age = 0;
var person = {
	age:0,
	grow : function(age){
		this.age = age;	   //当前this指向对象本身
		var that = this;	//保存当前this指向的对象
		function test(age){
			that.age = age+10;    //当前this绑定到全局变量
		}
		test(age);
	}
}

person.grow(30);
alert(person.age);	  //40
alert(age);    //0
```

<br/><br/><br/><br/>
#### **函数的属性和方法：**<br/>
ECMAScript中的函数为对象，因此函数也有属性和方法。<br/>
**属性：**<br/>
- #### **length**<br/>
	函数希望接收的命名参数的个数<br/>
	```javascript
	function sayName(name){
		alert(name);
	}
	function sum(a,b){
		return a+b;
	}
	alert(sayName.length);	  //1
	alert(sum.length);	  //2
	```
- #### **prototype**<br/>
	**对于ECMAScript中的引用类型而言，prototype是保存它们所有实例方法的真正所在。**<br/>
	即toString(),valueOf()等方法都保存在prototype名下，只不过是通过各自对象的实例访问罢了。<br/>
	**prototype在创建自定义引用类型以及实现继承时极为重要(在之后的博文中会详细介绍)。<br/>

**方法：**<br/>
每个函数都包含连个非继承而来的方法：apply()和call()。
- #### **apply()**<br/>
	apply()方法接收两个参数：<br/>
+ 在其中运行函数的作用域，或者说改变后的调用该函数的对象。<br/>
+ 参数数组，可以是Array的实例，也可以是arguments对象。<br/>
```javascript
function sum(a,b){
	return a+b;
}
function applySum(a,b){
	return sum.apply(this,argumens);	//传入this(此处this为全局对象),arguments对象
}
function applySum2(a,b){
	return sum.apply(this,[a,b]);    //传入this(此处this为全局对象),数组
}
alert(applySum(10,10));		//20
alert(applySum2(10,10));	//20
```
- #### **call()**<br/>
	使用call()方法同apply()相似，只不过第二个参数，传参是必须逐个列举.如下代码：<br/>
	```javascript
	function sum(a,b){
		return a+b;
	}
	function callSum(a,b){
		return sum.call(this,a,b);
	}
	alert(callSum(10,10));	  //20
	```
	<br/>
	这两个函数主要用于**通过冒充改变作用域，或者说改变函数的调用对象**，在前文也有提及<br/>
	代码如下：<br/>
	```javascript
	var color = "red";
	var o = {color:"blue"};
	function sayColor(color){
		alert(this.color);
	}
	sayColor();	   //"red"
	sayColor.call(o);	//"blue"

	```

- #### **bind()**<br/>
	ECMAScript5还定义了bind()方法，该方法会创建一个函数的实例，其this值会绑定到传给bind()函数的值,即bind()接受的参数。<br/>
	```javascript
	var color = "red";
	var o = {color:"blue"};
	function sayColor(color){
		alert(this.color);
	}
	var objSayColor = sayColor.bind(o);
	objSayColor();	  //"blue"

	```

<br/><br/>

<br/><br/><br/><br/><br/><br/>

#### **基本包装类型**<br/>
为了**便于操作基本类型值**，ECMAScript提供了三个特殊的引用类型：**Boolean**、**Number**、**String**。<br/>
这些类型与前文的其他引用类型相似，但又**具有各自的基本类型相应的特殊行为**。<br/>
实际上，**每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象**。<br/>

```javascript
var s1 = "some text";
var s2 = s1.substring(2);
```
在上面这段代码中，可能会引发这样的疑问：变量s1包含一个基本类型值字符串，基本类型值竟然可以调用方法？？？<br/>
实际上，后台已经自动完成了一系列处理，当第二行访问s1时，访问过程处于一种**读取模式**，也就是内存中读取该字符串的值。
而在读取模式中访问字符串时，后台会自动完成以下处理：<br/>
1. **创建String类型的一个实例。**<br/>
2. **在实例上调用指定的方法。**<br/>
3. **销毁这个实例。**<br/>

可以理解为执行了下列代码：<br/>
```javascript
var s1 = new String("some text");
var s2 = new s1.substring(2);
s1 = null;
```
<br/><br/>
**引用类型和基本包装类型的主要区别就是对象的生存期:**<br/>
- **使用new操作符创建的引用类型的实例，在执行流离开当前作用域之前一直保存在内存中**。
- **自动创建的基本包装类型的对象，只存在与一行代码的执行瞬间，然后立即被销毁，这也意味着我们不能在运行时为基本类型值添加属性和方法**。<br/>
```javascript
var s1 = "some text";
s1.color = "red";
alert(s1.color);    //"undefined"
```
也可以显示调用Boolean、Number和String来创建基本包装类型的对象，
但不建议这么做，会让人分不清在处理基本类型还是引用类型的值，
对基本包装类型的实例调用typeof会返回"object",而且**所有基本包装类型的对象都会被转化为布尔值true。**<br/>
```javascript
var str = new String("some text");
alert(typeof str);	  //"object"
alert(Boolean(str));      //true  
```

<br/><br/><br/>

**补充：**<br/>
注意new调用基本包装类型的构造函数，与直接调用同名转型函数不同。<br/>
上面的三个步骤也使用于Boolean、Number类型对应的布尔值和数字值。<br/><br/>

<br/><br/><br/><br/>
#### **1.Boolean类型**<br/>
Boolean类型是与布尔值对应的引用类型。<br/>

#### **Boolean类型与布尔值的区别**
- 在布尔表达式中，所有的对象都会返回true。
```javascript
var falseObject = new Boolean(false);
var result = falseObject && true;
alert(result);	  //true
```
- typeof操作符对基本类型返回"boolean",对引用类型返回"object"。<br/>
```javascript
var falseObject = new Boolean(false);
var falseValue = false;
alert(typeof falseObject);	  //"object"
alert(tyoeof falseValue);	  //"boolean"
alert(falseObject instanceof Boolean);	  //true
alert(falseValue instanceof Boolean);	  //false
```

<br/><br/><br/><br/>
#### **2.Number类型**<br/>
Number类型是数字值对应的引用类型，上述提及的基本包装类型与对应基本类型值的一些区别和注意点在此不再赘述。<br/>
#### **Number类型提供的一些方法**<br/>

- #### **toFixed()**<br/>
按照指定的小数位返回数值的字符串表示。接收参数：显示几个小数<br/>
```javascript
var num = 10;
alert(num.toFixed(2));    //"10.00",位数不足则补0
var num = 10.005;
alert(num.toFixed(2));	  //"10.01",位数超出则舍入，不同浏览器舍入规则可能不同。
```
- #### **toExponential()**
返回以指数表示法(e)表示的数值的字符串形式。接收参数：输出结果的小数位数<br/>
```javascript
var num = 10;
alert(num.toExponential(1));//"1.0e+1"
```
- #### **toPrecision()**
可能返回固定大小格式(fixed)，也可能返回指数格式(exponential)，具体规则看返回哪种合适。<br/>
接受参数：数值所有数字的位数（不包含指数部分）<br/>
```javascript
var num = 99;
alert(num.toPrecision(1));//"1e+2"
alert(num.toPrecision(2));//99
alert(num.toPrecision(3));//"99.0"
```


<br/><br/><br/><br/>



#### **3.String类型**<br/>
String类型是字符串的对象包装类型，上述提及的基本包装类型与对应基本类型值的一些区别和注意点在此不再赘述。<br/><br/>

#### **length**
String对象的每个实例都有一个length属性来计算字符串的长度(包含多少个字符)。<br/>
```javascript
var txt = "ABCDEFG";
alert(txt.length); //7
```

<br/><br/>
#### **特殊字符**
字符串卸载单引号或双引号中，但以下实例

```javascript
var str = "We are the so-called "Vikings" from the north."
```
无法解析，解决方法：
```javascript
//方式1：反斜杠(\)转义
 var str = "We are the so-called \"Vikings\" from the north."
//方式2：改成" '' "  或 '  "" '
var str = "We are the so-called 'Vikings' from the north."

```

<br/><br/>
#### **String类型提供的方法：**
<br/>
1. #### **字符方法** <br/>
**用于访问字符串中特定字符,charAt()、charCodeAt()方法，都接收一个参数：基于0的字符位置。**<br/>
- #### **charAt()**
以单字符字符串的形式返回给定位置的那个字符。<br/>
```javascript
var str = "hello world";
alert(str.charAt(1));    //"e"
```
- #### **charCodeAt()**	
返回给定位置的那个字符的字符编码。<br/>
```javascript
var str = "hello world"
alert(str.charCodeAt(1));    //"101","e"的字符编码
```
- #### **方括号+数字索引**
IE7及更早会返回"undefined",用法如下：<br/>
```javascript
var str = "hello world";
alert(str[1]);    //"e"
```
<br/><br/><br/>
2. #### **字符串操作方法**
- #### **concat()**
将一或多个字符串拼接起来，返回得到的新字符串,不改变原来字符串。<br/>
可接受任意多个参数。<br/>
实践中更多还是用加号操作符(+)拼接字符串。<br/>
```javascript
var str = "hello ";
var result = str.concat("world");
alert(result);    //"hello world"
alert(str);    //"hello "
var result2 = str.concat("world","!");
alert(result2);    //"hello world!"
```
- #### **slice(n,m)**
返回字符串n到m之间位置的字符，无第二个参数则以字符串末尾作为结束位置，不包括结束位置处的字符<br/>
参数为负数情况：slice()会将传入的负值与字符串长度相加<br/>
```javascript
var str = "hello world";
alert(str.slice(3));    //"lo world"
alert(str.slice(3,7));    //"lo w"
alert(str.slice(3,-4));    //"lo w"
alert(str.slice(-3,11));    //"rld"
alert(str.slice(3,0));    //""
```
- #### **substring(n,m)**
参数定义同slice(),但参数为负数情况下行为不同。<br/>
参数为负数情况：substring()会把所有负值参数转为0,且该方法会将较小的数作为开始位置。<br/>
```javascript
var str = "hello world";
alert(str.substring(3));    //"lo world"
alert(str.substring(3,7));    //"lo w"
alert(str.substring(3,-4));    //"hel"
alert(str.substring(-3,11));    //"hello world"
alert(str.substring(3,0));    //"hel"
```
- #### **substr(n,m)**
substr()的第二个参数指的是返回字符个数，即返回字符串n开始的m个字符串,无第二个参数则以字符串末尾作为结束位置。<br/>
参数为负数情况：substr()方法将负的第一个参数加上字符串的长度，而将负的第二个参数转为0。<br/>
```javascript
var str = "hello world";
alert(str.substr(3));    //"lo world"
alert(str.substr(3,7));    //"lo worl"
alert(str.substr(3,-4));    //""
alert(str.substr(-3,11));    //"rld"
alert(str.substr(3,0));    //""
```
<br/><br/><br/>
3. #### **字符串位置方法**<br/>
**从字符串中查找子字符串,返回子字符串位置(未找到则返回-1)。**<br/>
- #### **indexOf(str,n)**
从n位置开始往后搜索到第一个str,并将搜索的索引值返回。<br/>
```javascript
var str = "hello world";
alert(str.indexOf("o"));    //4
alert(str.indexOf("o",5));    //7
```
- #### **lastIndexOf(str,n)**
从n位置开始往前搜索到第一个str,并将搜索的索引值返回。<br/>
```javascript
var str = "hello world";
alert(str.lastIndexOf("o"));    //7
alert(str.lastIndexOf("o",5));    //4
```
<br/><br/><br/>
4. #### **trim()方法**<br/>
创建一个字符串的副本，删除前置及后缀的所有空格,然后返回结果，不改变原字符串<br/>
```javascript
var str = "    hello world   ";
var trimStr = str.trim();
alert(trimStr);    //"hello world"
alert(str);    //"    hello world   "
```
<br/><br/><br/>
5. #### **字符串大小写转换方法**<br/>
ECMAScript中涉及字符串大小写转换的方法有4个：<br/>
**toLowerCase()**、**toLocaleLowerCase()**、
**toUpperCase()**、**toLocaleUpperCase()**。<br/>
toLowerCase(),toUpperCase()借鉴自java.lang.String中的同名方法。<br/>
toLocaleLowerCase(),toLocaleUpperCase()则是针对特定地区的实现。<br/>
```javascript
var str = "hello world";
alert(str.toLowerCase());    //"hello world"
alert(str.toUpperCase());    //"HELLO WORLD"
alert(str.toLocaleLowerCase());    //"hello world"
alert(str.toLocaleUpperCase());    //"HELLO WORLD"
```
<br/><br/><br/>
6. #### **字符串的模式匹配方法**<br/>
String类型定义了几个用于在字符串中匹配模式的方法：<br/>
**match()**、**search()**、**replace()**、**split()**。<br/>
对此的介绍将集中在<a href="{{ site.url}}/2017/05/Javascript-RegExp.html">《Javascript正则表达式》</a>。
<br/><br/><br/>
7. #### **localeCompare方法**<br/>
比较两个字符串，并返回下列值中的一个:<br/>
- 如果字符串在字母表中排在字符串参数之前，则返回一个负数。(一般为-1,具体值视实现而定)<br/>
- 如果字符串等于字符串参数，则返回0。<br/>
- 如果字符串在字母表中排在字符串参数之后，则返回一个正数。(一般为1,具体值视实现而定)<br/>
```javascript
var str = "yellow";
alert(str.localeCompare("black"));    //1
alert(str.localeCompare("yellow"));    //0
alert(str.localeCompare("zoo"));    //-1
```
不同地区比较的行为可能不同。有的可能大写字母在字母表中排在小写字母之前，有的可能不然。<br/>
<br/><br/><br/>
8. #### **fromCharCode方法**<br/>
String构造函数本身还有一个静态方法，**fromCharCode()**。<br/>
该方法接收一或多个字符编码，然后将它们转换成一个字符串。<br/>
和charCodeAt()执行相反操作。<br/>
```javascript
alert(String.fromCharCode(104,101,108,108,111));    //"hello"
```
<br/><br/><br/>
9. #### **HTML方法**<br/>
一些专门用于简化常见HTML格式化任务的方法，不过它们创建的标记通常无表达语义，尽量不要使用。<br/>
如：<br/>
anchor(name)   ->　　&lt;a name="name">string</a><br/>
fontcolor(color)   ->　　&lt;font color="color">string</font><br/>
small()   ->　　&lt;small>string</small><br/>
...
<br/><br/><br/>


<br/>
#### **汇总:**

|方法					|		描述|
|    ------: |    :-------:    | 
| charAt()				| 返回指定索引位置的字符| 
| charCodeAt()			| 返回指定索引位置字符的 Unicode 值| 
| concat()				| 连接两个或多个字符串，返回连接后的字符串| 
| fromCharCode()		| 	将 Unicode 转换为字符串| 
| indexOf()				| 返回字符串中检索指定字符第一次出现的位置| 
| lastIndexOf()			| 返回字符串中检索指定字符最后一次出现的位置| 
| localeCompare()		| 	用本地特定的顺序来比较两个字符串| 
| match()				| 	找到一个或多个正则表达式的匹配| 
| replace()				| 替换与正则表达式匹配的子串| 
| search()				| 检索与正则表达式相匹配的值| 
| slice()				| 	提取字符串的片断，并在新的字符串中返回被提取的部分| 
| split()				| 	把字符串分割为子字符串数组| 
| substr()				| 从起始索引号提取字符串中指定数目的字符	| 
| substring()			| 	提取字符串中两个指定的索引号之间的字符| 
| toLocaleLowerCase()	| 	根据主机的语言环境把字符串转换为小写，只有几种语言（如土耳其语）具有地方特有的大小写映射| 
| toLocaleUpperCase()	| 	根据主机的语言环境把字符串转换为大写，只有几种语言（如土耳其语）具有地方特有的大小写映射| 
| toLowerCase()			| 把字符串转换为小写| 
| toString()			| 	返回字符串对象值| 
| toUpperCase()			| 把字符串转换为大写| 
| trim()				| 	移除字符串首尾空白| 
| valueOf()				| 返回某个字符串对象的原始值| 

<br/><br/><br/><br/><br/><br/>

#### **单体内置对象**<br/>
**ECMA-262定义内置对象：**指由ECMAScript实现提供的、不依赖宿主环境的对象，这些对象在ECMAScript程序执行之前就已经存在了。<br/>
即开发人员不必显式实例化内置对象，它们已经实例化了。如：Object、Array、String。<br/>

#### **Global对象**<br/>
**所有在全局作用域中定义的属性和函数，其实都是Global对象的属性。**<br/>
之前说的**isNaN()**,**isFinite()**,**parseInt()**,**parseFloat()**都是Global对象的方法。<br/>
<br/><br/>
#### **URI编码方法**<br/>
Global对象的encodeURI()和encodeURIComponent()方法可以对URI进行编码，以便发送给浏览器。<br/>
- #### **encodeURI()**<br/>
主要用于整个URI，不会对属于URI的特殊字符进行编码(如冒号、正斜杠、问号、井字号)。<br/>
- #### **encodeURIComponent()**<br/>
主要用于对URI中的某一段进行编码，会对它发现的任何非标准字符进行编码。
<br/>
```javascript
var uri = "http://www.wrox.com/illegal value.htm#start";
//"http://www.wrox.com/illegal%20value.html#start"
alert(encodeURI(uri));
//"http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.html%23start"
alert(encodeURIComponent(uri));
```

<br/>
与encodeURI()和encodeURIComponent()方法对应的两个方法分别是**decodeURI()**和**decodeURIComponent()**方法。<br/>
补充说明：URI方法encodeURI()、encodeURIComponent()、decodeURI()和decodeURIComponent()用于替代已经被ECMA-262第3版废弃的escape()和unescape()方法。
URI方法能够编码所有Unicode字符，而原来的方法只能正确的编码ASCII字符。<br/>
<br/><br/>
#### **eval()**<br/>
eval()方法就像一个完整的ECMAScript解析器，它只接受一个参数，即要执行的ECMAScript字符串。<br/>
```javascript
eval("alert('hi')");
```
上述代码相当于：<br/>
```javascript
alert('hi');
```
<br/>
```javascript
var msg = "hello world!";
eval("alert(msg)"); //"hello world"
```
**变量msg实在eval()调用的环境之外定义的，为什么仍能显示"hello world"呢？<br/>
当解析器发现代码中调用eval()方法时，它会将传入的参数当作实际的ECMAScript语句来解析，然后把执行结果插入到原位置。
通过eval()执行的代码被认为是包含该次调用的执行环境的一部分，因此被执行的代码具有与该执行环境相同的作用域。**<br/>
再举个例子：<br/>
```javascript
eval("function sayHi(){ alert('hi');}");
sayHi();	//"hi"
```
函数sayHi()是在eval()内部定义的，但eval()的调用最终会被替换成定义函数的实际代码，因此下行可以调用sayHi()。<br/>

**注意：在eval()中创建的任何变量或函数都不会被提升，在解析代码时，它们被包含在一个字符串中，只在eval()执行时创建。**

<br/><br/>
#### **Global对象的属性**<br/>
Global对象的一部分属性之前已经介绍过了，如：<br/>
**特殊的值：**Undefined,NaN,Infinity。<br/>
**所有原生引用类型的构造函数:**Object、Array、Function、Boolean、String、Number、Date、RegExp。<br/>
**其他属性：**Error、RegExp、Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError。<br/>
<br/>
**ECMAScript5明确禁止给undefined、NaN和Infinity赋值，这样做即使在非严格模式下也会导致错误。**

<br/><br/>

#### **window对象**<br/>
ECMAScript虽然没有指出如何直接访问Global对象，但web浏览器都是将这个全局对象作为window对象的一部分实现的。
```javascript
var color = "red";
function sayColor() {
    alert(window.color);
}
window.sayColor();	  //"red"
```

另一种取得Global对象的方法是使用下面的代码：
```javascript
var global = function () {
    return this;
}();
```
<br/><br/>
#### **Math对象**<br/>
Math对象提供了辅助完成一些计算功能的属性和方法，与我们直接在JavaScript直接编写的计算功能相比，执行效率更高。<br/>
<br/><br/>
#### **Math对象的属性：**<br/>
<br/>

|属性					|		说明|
|    ------: |    :-------:    | 
|Math.E      |      &nbsp;&nbsp;&nbsp;自然对数的底数，即常量e的值|
|Math.LN10      |      10的自然对数|
|Math.LN2|2的自然对数|
|Math.LOG2E|以2为底e的对数|
|Math.LOG10E|以10为底e的对数|
|Math.PI|π的值|
|Math.SQRT1_2|1/2的平方根|
|Math.SQRT2|2的平方根|

<br/><br/>
#### **min()和max()方法**<br/>
用于确定一组数值中的最大值和最小值。两个方法都可以接收任意多个数值参数。<br/>
```javascript
var max = Math.max(3,54,32,16);
alert(max);	   //54
var min = Math.min(3,54,32,16);
alert(min);    //3
```

<br/><br/>
#### **舍入方法**<br/>
- #### **Math.ceil()**<br/>
执行向上舍入，总是将数值向上舍入为最接近的整数。<br/>
```javascript
alert(Math.ceil(25.9));	   //26
alert(Math.ceil(25.1));	   //26
```
- #### **Math.floor()**<br/>
执行向下舍入，总是将数值向下舍入为最接近的整数。<br/>
```javascript
alert(Math.floor(25.9));	   //25
alert(Math.floor(25.1));	   //25
```
- #### **Math.round()**<br/>
执行标准舍入，总是将数值四舍五入为最接近的整数。<br/>
```javascript
alert(Math.round(25.5));	   //26
alert(Math.round(25.1));	   //25
```


<br/><br/>
#### **random()**<br/>
Math.random()方法返回一个>=0&&<1的一个随机数。<br/>
经典应用：**值 = Math.floor(Math.random()*可能值的总数+第一个可能的值)**<br/>
若想选择一个1~10之间的数值，可编写如下代码：<br/>
```javascript
var num = Math.floor(Math.random()*10+1);
```
若想选择一个2~10之间的数值，可编写如下代码：<br/>
```javascript
var num = Math.floor(Math.random()*9+2);
```


<br/><br/>
#### **其他方法**<br/>
- **Math.abs(num)**  ->  返回num的绝对值
- **Math.exp(num)**  ->  返回Math.E的num次幂
- **Math.log(num)**  ->  返回num的自然对数
- **Math.pow(num,power)**  ->  返回num的power次幂
- **Math.sqrt(num)**  ->  返回num的平方根
- **Math.acos(x)**  ->  返回x的反余弦值
- **Math.asin(x)**  ->  返回x的反正弦值
- **Math.atan(x)**  ->  返回x的反正切值
- **Math.atan2(x,y)**  ->  返回y/x的反正切值
- **Math.cos(x)**  ->  返回x的余弦值
- **Math.sin(x)**  ->  返回x的正弦值
- **Math.tan(x)**  ->  返回x的正切值


<br/><br/><br/><br/>