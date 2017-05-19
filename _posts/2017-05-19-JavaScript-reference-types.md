---
layout: post
title: JavaScript引用类型
date: 2017-05-19 01:05:13 +0800
categories:
  - javascript
---

说明：常见引用类型：Object类型、Array类型、Date类型、RepExp类型、Function类型,及基本包装类型...


<br/><br/><br/><br/>
##   引用类型
引用类型的值(对象)是引用对象的一个实例,用于将数据和功能组织在一起。<br/><br/><br/>
### 1.Object类型 <br/><br/>
ECMAScript并不具备传统面向对象语言所支持的类和接口等基本结构。<br/>
<br/><br/>
在Javascript中, 对象是  拥有属性和方法  的数据，是某个特定引用类型的实例。<br/>
创建方式：<br/>
1.新对象使用new操作符后跟一个构造函数来创建:<br/>
```javascript
	var person = new Object();
```

2.使用字面量表示法：<br/>
&nbsp;&nbsp;&nbsp;&nbsp;由花括号分隔。
&nbsp;&nbsp;&nbsp;&nbsp;在括号内部，对象的属性以名称和值对的形式 (name : value) 来定义。属性由逗号分隔：
```javascript
	var person={
	firstname : "John",
	lastname  : "Doe",
	id        :  5566
	};
```




**声明变量类型**
当您声明新变量时，可以使用关键词 "new" 来声明其类型：

```javascript
	var carname =new String();
	var x =      new Number();
	var y =      new Boolean();
	var person = new Object();
```


**访问对象属性**

```javascript
	//方式1：
	person.lastName;
	//方式2：
	person["lastName"];
```

**访问对象方法**

```javascript
	objectName.methodName()
```

<br/><br/><br/>
### 2.Array类型 <br/><br/>
ECMAScript与其他语言一样,数组都是数据的有序列表。<br/>
ECMAScript中的数组的大小是可以动态调整的,即可以随着数据的添加自动增长以容纳新增数据。<br/>
**创建数组的基本方式：**<br/>
1.使用Array构造函数<br/>
```javascript
	var colors = new Array();
	var colors = new Array(20);    //也可自定义数组长度。
	var colors = new Array('red','blue','green');	//也可向构造函数传递数组应包含的项
	var colors = Array(3);    //也可省略new操作符
```
2.使用数组字面量法:<br/>
```javascript
	var colors = ['a','b','c'];
	var colors = ['a','b',];	//会创建一个包含2或3项的数组，IE8及以前['a','b',undefined,其他['a','b'];
```
<br/><br/>
**读取数组中数据项：**<br/>
使用方括号并提供相应值基于0的数字索引。<br/>
通过.length可访问数组的长度<br/>
```javascript
	var colors  = [1,2,3];
	alert(colors[2]);	//3
	alert(colors.length);	//3
```
<br/><br/>
**检测数组**<br/>
通过instanceof操作符<br/>
```javascript
	if(value instanceof Array){	//
		//...
	}
```
instanceof操作符不适用于多个框架的特殊情况,因为它假定只有一个全局执行环境.当网页有多框架时,就有多个全局执行环境,因而会存在两个版本的Array构造函数,当传入数组发生冲突时可能会出错。<br/>
ES5新增了Array.isArray()方法,用于解决该问题。<br/>
```javascript
	if(Array.isArray(value)){
		//...
	}
```

<br/><br/>
**转换方法：**<br/>
所有对象都有toLocaleString()、toString()、valueOf()方法。<br/>
调用数组的toString()方法会返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串。<br/>
调用数组的valueOf()方法返回的还是数组。<br/>
```javascript
	var colors = ['red','blue','green'];
	alert(colors.toString());	//red,blue,green
	alert(colors.valueOf());	//red,blue,green
	alert(colors);	//red,blue,green  ,数组还要接受字符串参数，在后台调用toString()方法.
```
数组继承的toLocaleString()、toString()、valueOf()方法默认情况都以逗号(,)分割,若想使用不同分隔符创建字符串，可使用join()方法。<br/>
```javascript
	var colors =['red','blue','green'];
	alert(colors.join("||"));//red||blue||green
```

<br/><br/>
**栈，队列方法：**<br/>
栈方法：<br/>
栈是一种LIFO（last-in-first-out）的数据结构,最新添加的项最早被移出。<br/>
ECMAScript为数组提供了push()、pop()方法，以实现类似栈行为。<br/>
```javascript
	var colos = new Array();
	var count = colors.push('red','blue');
	alert(count);	//2
	count = count.push('green');
	alert(count);	//3
	
	var item = colors.pop();
	alert(item);	//'green'
	alert(colors.length);	//2
```
<br/><br/>
队列方法：<br/>
队列是一种FIFO（first-in-first-out）的数据结构,最早添加的项最早被移出。<br/>
ECMAScript为数组提供了push()、shift()方法，以实现类似队列行为,队列的push()方法和栈的push()方法为同一方法。<br/>
ECMAScript还提供了unshift()方法，使用方法与shift()方法相反,向数组前端添加任意个项并返回新数组长度。同时使用unshift()和pop()可以模拟相反方向的队列。<br/>
```javascript
	var colos = new Array();
	var count = colors.push('red','blue');
	alert(count);	//2
	count = count.push('green');
	alert(count);	//3
	
	var item = colors.shift();
	alert(item);	//'red'
	alert(colors.length);	//2
```

<br/><br/>
**重排序方法：**<br/>
数值中已存在两个可用于排序的方法：reverse()、sort()方法.
reverse()->反转数组顺序。<br/>
sort()->按升序排列数组项（调用每个数组项的头String()转型方法,得到比较的字符串，确定排序）
```javascript
	var values = [1,2,4,10,3];
	values.reverse();
	alert(values);	//3,10,4,2,1;
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
**操作方法：**<br/>
**concat():基于当前函数数组创建一个新数组(当前数组副本),将接收到的参数添加到这个副本的末尾。<br/>**
```javascript
	var colors = ['red','green','blue'];
	var colors2 = colors.concat("yellow",["black","brown"]);
	alert(colors);    //red,green,blue
	alert(colors2);    //red,green,blue,yellow,black,brown
```
<br/><br/>

**slice():基于当前数组中的一或多项创建一个新数组,接收一或两个参数(要返回的起始和结束位置)<br/>**
```javascript
	var colors = ['red','green','blue','yellow','purple'];
	var colors2 = colors.slice(1);
	var colors3 = colors.slice(1,4);
	alert(colors2);    //green,blue,yellow,purple
	alert(colors3);	   //green,blue,yellow
```
<br/><br/>

**splice():向数组中部插入项<br/>**
**删除：**<br/>
<br/><br/><br/><br/><br/><br/>

##   Javascript函数
<br/><br/>
**JavaScript 函数语法**


```javascript
	//无参
	function functionname()
	{
		//执行代码
	}
	//带参
	function myFunction(var1,var2)
	{
		//代码
	}
	//带有返回值
	function myFunction()
	{
		var x=5;
		return x;
	}

```
**声明方式：**<br/>

```javascript
	//1.普通的函数声明
	function box(num1,num2){
		return num1+num2;
	}
	//2.使用变量初始化函数
	var box = function(num1,num2){
		return num1+num2;
	}
	//3.使用Function构造函数,不推荐，导致解析两次代码
	var box=new Function('num1','num2','return num1+num2');
```

**函数内部属性：**<br/>
1.arguments：一个类数组对象，包含着传入函数的所有参数。arguments[0]是第一个元素,length属性是传递参数.<br/>
ECMAScript函数不介意传递的参数个数，数据类型。正是因为可以通过函数内部arguments对象访问这个参数数组.<br/>
因而ECMAScript函数也不能像传统意义上那样实现重载，不过它可以模仿重载，对传入函数的类型和数量可作出不同反应。<br/>

```javascript
	function doAdd(){
		if(argumens.)
	}
```
2.callee：一个指针，指向拥有这个arguments对象的函数。

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

**函数的属性和方法：**<br/>
length：函数希望接收的命名参数的个数<br/>
prototype：另行介绍<br/>
prototype属性下的两个方法：通过冒充改变作用域<br/>
apply()<br/>
call()<br/>

```javascript
	function box (num1,num2) {
		return num1+num2;
	}
	function sayBox1(num1,num2){
		return box.apply(this,[num1,num2]);//this为作用域，这里即window,[]表示box需要的参数
		//或  return box.apply(this,arguments);
	}

	function sayBox2(num1,num2){
		return box.call(this,num1,num2);//call与apply仅传参不同
	}
	alert(sayBox1(10,10));//20
	alert(sayBox2(10,10));//20

```



**JavaScript 变量的生存期**<br/>
JavaScript 变量的生命期从它们被声明的时间开始。
局部变量会在函数运行以后被删除。
全局变量会在页面关闭后被删除

**向未声明的 JavaScript 变量分配值**
把值赋给尚未声明的变量，该变量将被自动作为全局变量声明。

```javascript
// 此处可调用 carName 变量

	function myFunction() {
		carName = "Volvo";

		// 此处可调用 carName 变量

	}
```
<br/><br/><br/><br/><br/><br/>
## Javascript字符串
<br/><br/>
**字符串长度**

可以使用内置属性 length 来计算字符串的长度：

```javascript
	var txt = "ABCDEFG";
	alert(txt.length); //7
```
**特殊字符**
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


**字符串可以是对象**

```javascript
	var x = "John"; //typeof->String          
	var y = new String("John");// typeof->Object 
	alert(x === y) // 结果为true
	alert(x === y) // 结果为 false，因为 x 是字符串，y 是对象
```

**补充说明： ===  为绝对相等，数据类型与值都必须相等**



**字符串属性和方法**


**字符串属性:**
<br/>

|属性		                |				描述        |
|    ------:                |            :-------:      | 
|constructor	          	&nbsp;&nbsp;&nbsp;|	返回创建字符串属性的函数|
|length			           &nbsp;&nbsp;&nbsp;	|返回字符串的长度           |
|prototype		          	&nbsp;&nbsp;&nbsp;|允许您向对象添加属性和方法 |

<br/>
**常见字符串方法：**（更多参见：JavaScript String 对象。）


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

##  Javascript类型转换
<br/><br/>
 5 种不同的数据类型：<br/>
string    number  boolean  object  function<br/>
3 种对象类型：<br/>
Object  Date  Array<br/>
2 个不包含任何值的数据类型：<br/>
null  undefined<br/>



```javascript
	typeof "John"                 // 返回 string 
	typeof 3.14                   // 返回 number
	typeof NaN                    // 返回 number
	typeof false                  // 返回 boolean
	typeof [1,2,3,4]              // 返回 object
	typeof {name:'John', age:34}  // 返回 object
	typeof new Date()             // 返回 object
	typeof function () {}         // 返回 function
	typeof myCar                  // 返回 undefined (如果 myCar 没有声明)
	typeof null                   // 返回 object

	/*

	NaN 的数据类型是 number
	数组(Array)的数据类型是 object
	日期(Date)的数据类型为 object
	null 的数据类型是 object
	未定义变量的数据类型为undefined

	*/
```
**自动转换类型**<br/>
当 JavaScript 尝试操作一个 "错误" 的数据类型时，会自动转换为 "正确" 的数据类型。

```javascript
	5 + null    // 返回 5 ,  null 转换为 0
	"5" + null  // 返回"5null"   null 转换为 "null"
	"5" + 1     // 返回 "51" , 1 转换为 "1"  
	"5" - 1     // 返回 4 ,  "5" 转换为 5
```
当你尝试输出一个对象或一个变量时 JavaScript 会自动调用变量的 toString() 方法：

```
document.getElementById("demo").innerHTML = myVar;

// if myVar = {name:"Fjohn"}  // toString 转换为 "[object Object]"
// if myVar = [1,2,3,4]       // toString 转换为 "1,2,3,4"
// if myVar = new Date()      // toString 转换为 "Fri Jul 18 2014 09:08:55 GMT+0200"
```

**数字转换为字符串**


```javascript
//方式1  全局方法String()：可用于任何类型的数字，字母 ，变量，表达式
String(x)       
String(123)     
String(100 + 23) 


//方式2  Number的toString()
x.toString()
(123).toString()
(100 + 23).toString()
```

**将布尔值转换为字符串**

```javascript
//方式1：全局方法String()
String(false)        // 返回 "false"
String(true)         // 返回 "true"
//方式2：Boolean的toString()
false.toString()     // 返回 "false"
true.toString()      // 返回 "true"
```

**将日期转换为字符串**

```javascript
//方式1：全局方法String()
String(Date())    // 返回 Thu Jul 17 2014 15:38:19 GMT+0200 (W. Europe Daylight Time)

//方式2：Date 方法 toString()
Date().toString()   // 返回 Thu Jul 17 2014 15:38:19 GMT+0200 (W. Europe Daylight Time)
```



**将字符串转换为数字**

```javascript
//方式1 ：全局方法 Number() 
Number("3.14")    // 返回 3.14

//方式2 ：parseFloat()	解析一个字符串，并返回一个浮点数。
alert(typeof parseFloat("123.00"));//number
//parseInt()	解析一个字符串，并返回一个整数。
alert(typeof parseInt("123"));//number

//方式3：Operator + 可用于将变量转换为数字：
var y = "5";      //y为字符串
var x = + y;      //x为数字
```


**将布尔值转换为数字**

```javascript
//全局方法Number()
Number(false)     // 返回 0
```

**将日期转换为数字**

```javascript
//方式1：全局方法Number()
Number(new Date()) // 返回 1404568027739

//方式2：日期方法 getTime() 
new Date().getTime()// 返回 1404568027739
```
<br/><br/><br/><br/><br/><br/>
