---
layout: post
title: JavaScript  — the Basics
date: 2017-05-15 01:05:13 +0800
categories:
  - javascript
---

补充说明：之前学习javascript比较求成，很多基础知识都没有理解透彻，决定重温<<JavaScript高级程序设计>>，对之前csdn上的博文javascript基础做了延伸，
因此更博文如下：

<br/><br/><br/><br/>
## 第一章   在html中使用
<br/><br/>
向HTML页面插入javascript的方法就是使用&lt;script>元素。
脚本可被放置在 HTML 页面的 &lt;body> 和  &lt;head> 部分中。
<br/>
其使用方式有2种：直接在页面中嵌套javascript代码 | 包含外部javascript文件。
<br/><br/>
**< body> 中的 JavaScript:**

```
<!DOCTYPE html>
<html>
<body>
...
	<script type="text/javascript">
		document.write("该部分即向html页面插入的javascript脚本代码");
	</script>
...
</body>
</html>
```

**< head> 中的 JavaScript ：**

```
<!DOCTYPE html>
<html>
<head>
	<script type="text/javascript">
		function myFunction()
		{ 
			document.getElementById("demo").innerHTML="我的第一个 JavaScript 函数";
		}
	</script>
</head>
<body>
	<button type="button" onclick="myFunction()">该按钮被点击后会调用myFuntion()函数</button>
</body>
</html>
```

**外部的 JavaScript：**

```
<!DOCTYPE html>
<html>
<body>
	<script  type="text/javascript" src="myScript.js"></script>
</body>
</html>
```
<br/><br/><br/><br/><br/><br/>

## 第二章   javascript基本概念
<br/><br/>
**JavaScript 字面量（一种表示值的记法）**

1.数字（Number）字面量
可为整数/小数（3.14  1001  123e5）

2.字符串（String）字面量
可使用单引号或双引号（“Hi”  ‘Hi’）

3.表达式字面量
用于计算 (5+6    6*5)

4.数组（Array）字面量
定义一个数组
[40, 100, 1, 5, 25, 10]

5.对象（Object）字面量
定义一个对象
{firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"}

6.函数（Function）字面量
定义一个函数
function myFunction(a, b) { return a * b;}
<br/><br/>
**javascript变量**

1.变量用于存储信息的“容器”。<br/>
2.ECMAScript的变量是松散类型的，其数据类型具有动态性。即：<br/>
&nbsp;&nbsp;&nbsp;ECMAScript的变量可以用来保存任何类型的数据,每个变量在初始化时并不会标记它的数据类型，在修改值时也可更换数据类型。<br/>
3.JavaScript 使用关键字 var 来定义变量， 使用等号来为变量赋值，用var操作符定义的变量将成为定义该变量的作用域中的局部变量。即如果在函数中使用var
定义一个变量，那么该变量在函数退出后就会销毁。（省略var操作符定义的变量为全局变量，最后不要在局部作用域中定义全局变量->难以维护）。

```
var  length;
length = 6;
```
变量可以通过变量名访问。在指令式语言中，变量通常是可变的。字面量是一个恒定的值。
**注意：**
变量必须以字母开头
变量也能以 $ 和 _ 符号开头（不过我们不推荐这么做）
变量名称对大小写敏感（y 和 Y 是不同的变量）
<br/><br/>
**JavaScript 关键字**
<br/><br/>
JavaScript 关键字用于标识要执行的操作。
JavaScript 关键字必须以字母、下划线（_）或美元符（$）开始。
后续的字符可以是字母、数字、下划线或美元符（数字是不允许作为首字符出现的，以便 JavaScript 可以轻易区分开关键字和数字）。
以下是 JavaScript （第三版）中的保留字：
<br/>
abstract　　enum　　int　　short　　boolean　　export　　interface　 class
static　　byte　　extends　　long　　super　　char　　final　　native　　
synchronized　　float　　package　　throws　　const　　goto　　private　
transient　　debugger　　implements　　protected　　volatile　　double　　
import　　public
<br/><br/>
Javascript语句标识符（关键字）：
<br/>
break、delete、function、return、typeof、case、do、if、switch、var、catch、
else、in、this、void、continue、false、instanceof、throw、while、debugger、
finally、new、true、const、with、default、for、null和try。
<br/><br/>**JavaScript 语句标识符**
<br/>
所谓标识符，就是指变量、函数、属性的名字，或者函数的参数。可以是以下列规则组合成的一或多个字符：
<br/>1.第一个字符必须是一个字母，下划线（_）或美元符（$）;
<br/>2.其他字符可以为字母、下划线、数字;
<br/>3.不能把关键字、保留字、true、false、null用作标识符。
<br/><br/>
**JavaScript 注释**
<br/>
单行注释   //
<br/>
多行注释  /**/


<br/><br/><br/><br/><br/><br/>
## 第三章   javascript运算符
<br/><br/>
**算数运算符**
＋   -    *  	  /	%	++	--

**赋值运算符**
=    +=     -=      *=  	  /=	 %=	

补充：
+ 运算符用于把文本值或字符串变量加起来（连接起来）。（txt="what"+"?";）
如果把数字与字符串相加，结果将成为字符串！

**比较运算符**
==	  等于	
===	    绝对等于（值和类型均相等）	
!=	 不等于	
!==	 不绝对等于（值和类型有一个不相等，或两个都不相等）	
>	 大于	
<	 小于
>=	 大于或等于	
<=    小于或等于	

**逻辑运算符**
&&	and	(x < 10 && y > 1) 为 true
||	or	(x==5 || y==5) 为 false
!	not	!(x==y) 为 true


**条件运算符**

variablename=(condition)?value1:value2 
如：var a = (100>50)?"yes":"no"  //a为"yes"
<br/><br/><br/><br/><br/><br/>

## 第四章    javascript数据类型
<br/><br/>
**五种简单数据类型：**（基本数据类型）<br/>
字符串（String）<br/>
数字(Number)<br/>
布尔(Boolean)<br/>
空（Null）<br/>
未定义（Undefined）。<br/>
**一种复杂数据类型:**<br/>
对象(Object)<br/>

**typeof 操作符：**<br/>
ECMAScript变量是松散类型的，需要提供检测给定变量数据类型的手段—**typeof**，对一个值使用typeof的返回结果：<br/>
"undefined"    ->      该值未定义;<br/>
"boolean"      ->      该值为布尔值;<br/>
"string"       ->      该值为字符串;<br/>
"number"       ->      该值为数值;<br/>
"object"       ->      该值为对象或者null;<br/>
"function"     ->      该值为函数。<br/>
<br/>
```
	var x;        
	alert(typeof x);   //"undefined"
	var x = 5;    
	alert(typeof x)    //"number"
	var x = null; 
	alert(typeof x)    //"object"
```
<br/>
**JavaScript 拥有动态数据类型**，即相同的变量可用作不同的类型

```
	var x;        // x 为 undefined
	var x = 5;    // 现在 x 为数字
	var x = "hi"; // 现在 x 为字符串
```
<br/><br/><br/>
**1.Undefined类型:**<br/>
Undefined 只有一个值，特殊的值undefined,这个值表示变量不含有值,使用var声明变量但未初始化，其变量值就是undefined。<br/>
```
	var x;        
	alert(x == undefined);  //true
```
<br/>
对typeof操作符而言，声明了变量，但未初始化 与为声明变量 返回的结果都为"undefined"<br/>

```
	//undefined
	var cars;
	alert(cars == "undefined"); //true
	alert(message) //报错
	alert(typeof cars)   //"undefined"
	alert(typeof message) //"undefined"



	//null
	var cars = null;
	alert(typeof cars) //"object"

	alert(null == undefined) //true,undefined派生自null
 
```
<br/><br/>

**2. Null类型:**<br/>
Null 只有一个值，特殊的值null，null值表示一个空对象指针（所以typeof检测null返回"object"）.<br/>
undefined值派生自null值，因而其相等性测试返回true.<br/>
```
	var x=null;        
	alert(typeof x);  //"object"
	alert(null == undefined);  //true
```
可以通过将变量的值设置为 null 来清空变量。

<br/><br/>

**3.Boolean类型:**<br/>
Boolean类型只能有两个子面值：true 和 false。<br/>
要将一个值转换为Boolean值，可以掉用转型函数Boolean(),也用！！可实现boolean转型。<br/>
多用于条件测试<br/>
个数据类型转换为Boolean类型为false的值：<br/>
String(空字符串""),Number(0和NaN,不包括无穷大),Object(null),Undefined(undefined).<br/>
```
	var x = true;
	var y = false;
	var m = "hello";
	var mBoolean = Boolean(m);
```



<br/><br/>

**4.Number类型：**<br/>
JavaScript 只有一种数字类型Number,使用IEEE754标准中的双精度浮点数,不区分整数和浮点数，数字可以带小数点，也可以不带。<br/>
```
	var x1=34.00;      //使用小数点来写
	var x2=34;         //不使用小数点来写
```
<br/>进制：<br/>
```
	var num1 = 32;  //十进制
	var num2 = 070  //八进制，第一位必须为0，后面位0-7的数字序列
	var num3 = 079  //无效八进制，超出范围，解析为十进制
	var num4 = 0xA; //十六进制10，前两位必须为0x,后跟十六进制数字(0-9和A-F)A-F可大小写。
```
<br/><br/>浮点数值：<br/><br/>
保存浮点数值需要的内存空间是保存整数的两倍，ECMAScript会不失时机地将浮点数值转为整数值.<br/>
用e表示法表示的数值等于e前面的数值乘以10的指数次幂。<br/>
浮点数值的最高精度是17位小数，在算术计算时精确度远不如整数。【不要测试某个特定的浮点数值】<br/>
```
	//极大或极小的数字可通过科学（指数）计数法写
	var y=123e5;       //12300000
	var z=123e-5;      //0.00123
	//精度丢失	
	alert(0.1+0.2 == 0.3)  //false,0.1+0.2结果为0.30000000000000004
```
<br/><br/>
数值范围：
<br/><br/>
ECMAScript能表示的最小数值 ->  Number.MAX_VALUE(1.7976931348623157e+308).超出为特殊的Infinity值<br/>
判断一个数值是否有穷：isFinite()函数.<br/>
```
	var result = Number.MAX_VALUE + Number.MAX_VALUE;
	alert(isFinite(result));   //false;
```
<br/><br/>
	NaN (Not a Number):<br/>
	一个特殊的数值,表示一个本来要返回数值的操作数未返回数值的情况(数值除以非数值不报错->返回NaN).<br/>
	isNaN()，接受一个参数，尝试转为数值，不能转换为数值的值都会导致整个函数返回true。<br/>
	也适用对象(->valueof()->tostring())
<br/><br/>
数值转换：<br/><br/>
非数值转换为数值：Number() —用于任何数据类型、 parseInt()、parseFloat()  —用于字符串。<br/>
Number转换规则：<br/>
Boolean： true转换为1,false转换为0 ;<br/>
null：    返回0 ;<br/>
undefined : 返回NaN ;<br/>
string:   
		只包含数字(有效浮点格式)，直接转为10进制(浮点数值)(忽略前导零);<br/>
		字符串为空,返回0;<br/>
		包含有效的十六进制，转换为相同大小的10进制.<br/>
		除了上述格式，返回NaN. <br/><br/>
```
	var num1 = Number("hello world!"); //NaN
	var num2 = Number(""); //0
	var num3 = Number("0000011"); //11
	var num4 = Number(true);         //1
```
parseInt()：(在转换字符串上更合理).<br/>
		忽略字符串前面的空格，直至第一个非空字符,第一个字符不是数字字符或符号，parseInt()就会返回NaN;<br/>
		如果第一个字符是数字字符或符号，会继续解析至非数字字符;<br/>
		能解析各种数字格式(十六进制、八进制...)；<br/>
		字符串为空，返回NaN;<br/>
		第二个参数，转换时使用的基数（进制）。
<br/><br/>
```
	var num1 = parseInt("1234blue"); //1234
	var num2 = parseInt(""); //NaN
	var num3 = parseInt("0xA"); //10（十六进制数）
	var num4 = parseInt("22.5"); //22
	var num5 = parseInt("070"); //56（八进制数）
	var num6 = parseInt("70"); //70（十进制数）
	var num7 = parseInt("0xf"); //15（十六进制数）
	var num8 = parseInt("AF");//NaN
	var num8 = parseInt("AF",16); //175
```
<br/>
parseFloat():<br/>
		第一个小数点有效，第二个小数点无效;<br/>
		始终忽略前导零;<br/>
		只解析十进制，十六进制的字符串转换为0;<br/>
		如果为一个可解析的整数，返回整数。<br/>
<br/><br/><br/>

**5.String类型**
String类型可以为引号的任意文本，可用单引号或双引号。<br/>
ECMAScript中的字符串不可变，一旦创建，其值不可变。【待续...】
<br/><br/>
1.字符字面量：<br/>
\n 换行, \t 制表 ,\b 退格,\r 回车,\\ 斜杠(\),\' 单引号,\ " 双引号 ,<br />
\xnn 十六进制码nn为一字符 , \unnn 十六进制码nn为一Unicode字符

```
	var a=" hello ";
	var b=" my name is 'Lee XX' ";
	var c=' your name is "KangKang" ';
```










**5.JavaScript 对象**
对象由花括号分隔。
在括号内部，对象的属性以名称和值对的形式 (name : value) 来定义。属性由逗号分隔：

```
var person={
firstname : "John",
lastname  : "Doe",
id        :  5566
};
```




**声明变量类型**
当您声明新变量时，可以使用关键词 "new" 来声明其类型：

```
var carname=new String;
var x=      new Number;
var y=      new Boolean;
var person= new Object;
```

<br/><br/><br/><br/><br/><br/>
## 第五章   javascript对象
<br/><br/>
javascript 对象是  拥有属性和方法  的数据

**对象定义：**

```
var person = {
    firstName:"John",
    lastName:"Doe",
    age:50,
    eyeColor:"blue"
};


```
**访问对象属性**

```
//方式1：
person.lastName;
//方式2：
person["lastName"];
```

**访问对象方法**

```
objectName.methodName()
```
<br/><br/><br/><br/><br/><br/>
## 第六章   javascript函数
<br/><br/>
**JavaScript 函数语法**


```
//无参
function functionname()
{
执行代码
}
//带参
function myFunction(var1,var2)
{
代码
}
//带有返回值
function myFunction()
{
    var x=5;
    return x;
}

```
**声明方式：**

```
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

**函数内部属性：**
1.arguments：一个类数组对象，包含着传入函数的所有参数。
2.callee：一个指针，指向拥有这个arguments对象的函数。

```

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

**函数的属性和方法：**
length：函数希望接收的命名参数的个数
prototype：另行介绍
prototype属性下的两个方法：通过冒充改变作用域
apply()
call()

```
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



**局部 JavaScript 变量**
在 JavaScript 函数内部声明的变量（使用 var）是局部变量，所以只能在函数内部访问它。
可以在不同的函数中使用名称相同的局部变量，因为只有声明过该变量的函数才能识别出该变量。
只要函数运行完毕，本地变量就会被删除。


**全局 JavaScript 变量**
在函数外声明的变量是全局变量，网页上的所有脚本和函数都能访问它。

```
var carName = " Volvo";

// 此处可调用 carName 变量

function myFunction() {

    // 函数内可调用 carName 变量 

}
```



**JavaScript 变量的生存期**
JavaScript 变量的生命期从它们被声明的时间开始。
局部变量会在函数运行以后被删除。
全局变量会在页面关闭后被删除

**向未声明的 JavaScript 变量分配值**
把值赋给尚未声明的变量，该变量将被自动作为全局变量声明。

```
// 此处可调用 carName 变量

function myFunction() {
    carName = "Volvo";

    // 此处可调用 carName 变量

}
```
<br/><br/><br/><br/><br/><br/>
## 第七章   javascript字符串
<br/><br/>
**字符串长度**

可以使用内置属性 length 来计算字符串的长度：

```
var txt = "ABCDEFG";
alert(txt.length); //7
```
**特殊字符**
字符串卸载单引号或双引号中，但以下实例

```
var str = “We are the so-called "Vikings" from the north."
```
无法解析，解决方法：

```
//方式1：反斜杠(\)转义
 var str = "We are the so-called \"Vikings\" from the north."
//方式2：改成" '' "  或 '  "" '
var str = "We are the so-called 'Vikings' from the north."

```


**字符串可以是对象**

```
var x = "John"; //typeof->String          
var y = new String("John");// typeof->Object 
alert(x === y) // 结果为true
alert(x === y) // 结果为 false，因为 x 是字符串，y 是对象
```

**补充说明： ===  为绝对相等，数据类型与值都必须相等**



**字符串属性和方法**


**字符串属性:**
```
属性						描述
constructor			返回创建字符串属性的函数
length				返回字符串的长度
prototype			允许您向对象添加属性和方法
```
**常见字符串方法：**（更多参见：JavaScript String 对象。）


```


方法							描述
charAt()				返回指定索引位置的字符
charCodeAt()			返回指定索引位置字符的 Unicode 值
concat()				连接两个或多个字符串，返回连接后的字符串
fromCharCode()			将 Unicode 转换为字符串
indexOf()				返回字符串中检索指定字符第一次出现的位置
lastIndexOf()			返回字符串中检索指定字符最后一次出现的位置
localeCompare()			用本地特定的顺序来比较两个字符串
match()					找到一个或多个正则表达式的匹配
replace()				替换与正则表达式匹配的子串
search()				检索与正则表达式相匹配的值
slice()					提取字符串的片断，并在新的字符串中返回被提取的部分
split()					把字符串分割为子字符串数组
substr()				从起始索引号提取字符串中指定数目的字符	
substring()				提取字符串中两个指定的索引号之间的字符
toLocaleLowerCase()		根据主机的语言环境把字符串转换为小写，只有几种语言（如土耳其语）具有地方特有的大小写映射
toLocaleUpperCase()		根据主机的语言环境把字符串转换为大写，只有几种语言（如土耳其语）具有地方特有的大小写映射
toLowerCase()			把字符串转换为小写
toString()				返回字符串对象值
toUpperCase()			把字符串转换为大写
trim()					移除字符串首尾空白
valueOf()				返回某个字符串对象的原始值
```
<br/><br/><br/><br/><br/><br/>
## 第八章   javascript语句
<br/><br/>
**IF ELSE 语句:**

```
if (condition1)
{
    当条件 1 为 true 时执行的代码
}
else if (condition2)
{
    当条件 2 为 true 时执行的代码
}
else
{
  当条件 1 和 条件 2 都不为 true 时执行的代码
}
```

**switch语句**

```
switch(n)
{
    case 1:
        执行代码块 1
        break;
    case 2:
        执行代码块 2
        break;
    default:
        与 case 1 和 case 2 不同时执行的代码
}
```


**for 循环**

```
//方式1：
for (语句 1; 语句 2; 语句 3)
{
    被执行的代码块
}
//方式2：for/in
var person={fname:"John",lname:"Doe",age:25}; 
 
for (x in person)
{
    txt=txt + person[x];
}
```

**while循环**

```
while (条件)
{
    需要执行的代码
}

//或

do
{
    需要执行的代码
}
while (条件);
```



**break  continue 语句**
break 语句可用于跳出循环。
continue 语句跳出循环后，会继续执行该循环之后的代码

```
//break
for (i=0;i<10;i++)
{
    if (i==3)  break;
    x=x + "The number is " + i + "<br>";
}//i==3后跳出循环体，即for循环不再执行
//continue
for (i=0;i<10;i++)
{
    if (i==3)  continue;
    x=x + "The number is " + i + "<br>";
}//跳过i==3,循环体继续执行
```


**实现label 标签跳出循环 **
 label标签可是任意名称（非关键字保留字）

```
 bk:for(var i=0;i<4;i++){
	    for(varj=0;j<4;j++){
	            if(i===1&&j===1)break bk;
			    else console.log("i:"+i+"--j:"+j);
   }
 }
```
运行结果：

```
1 i:0--j:0
2 i:0--j:1
3 i:0--j:2
4 i:0--j:3
5 i:1--j:0
//成功跳出外层循环
```



**typeof操作符**
用于检测变量的数据类型

```
typeof "John"                // 返回 string 
typeof 3.14                  // 返回 number
typeof false                 // 返回 boolean
typeof [1,2,3,4]             // 返回 object，数组是一种特殊的对象类型
typeof {name:'John', age:34} // 返回 object
```

**Null**
null是一个只有一个值的特殊类型。表示一个空对象引用，用 typeof 检测 null 返回是object。
（可以用null和undefined来清空对象）

**Undefined**
undefined 是一个没有设置值的变量。
typeof 一个没有值的变量会返回 undefined。


二者区别：

```
typeof undefined             // undefined
typeof null                  // object
null === undefined           // false
null == undefined            // true
```
<br/><br/><br/><br/><br/><br/>
## 第九章   javascript类型转换
<br/><br/>
 5 种不同的数据类型：
string    number  boolean  object  function
3 种对象类型：
Object  Date  Array
2 个不包含任何值的数据类型：
null  undefined



```
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
**自动转换类型**
当 JavaScript 尝试操作一个 "错误" 的数据类型时，会自动转换为 "正确" 的数据类型。

```
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


```
//方式1  全局方法String()：可用于任何类型的数字，字母 
，变量，表达式
String(x)       
String(123)     
String(100 + 23) 


//方式2  Number的toString()
x.toString()
(123).toString()
(100 + 23).toString()
```

**将布尔值转换为字符串**

```
//方式1：全局方法String()
String(false)        // 返回 "false"
String(true)         // 返回 "true"
//方式2：Boolean的toString()
false.toString()     // 返回 "false"
true.toString()      // 返回 "true"
```

**将日期转换为字符串**

```
//方式1：全局方法String()
String(Date())    // 返回 Thu Jul 17 2014 15:38:19 GMT+0200 (W. Europe Daylight Time)

//方式2：Date 方法 toString()
Date().toString()   // 返回 Thu Jul 17 2014 15:38:19 GMT+0200 (W. Europe Daylight Time)
```



**将字符串转换为数字**

```
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

```
//全局方法Number()
Number(false)     // 返回 0
```

**将日期转换为数字**

```
//方式1：全局方法Number()
Number(new Date()) // 返回 1404568027739

//方式2：日期方法 getTime() 
new Date().getTime()// 返回 1404568027739
```
<br/><br/><br/><br/><br/><br/>

## 第十章   javascript错误
<br/><br/>
**try:** 
 允许我们定义在执行时进行错误测试的代码块
**catch：** 
语句允许我们定义当 try 代码块发生错误时，所执行的代码块。
trycatch 语句在javascript中是成对出现的
**throw：** 
JavaScript 将抛出一个错误。（当错误发生时，当事情出问题时，JavaScript 引擎通常会停止，并生成一个错误消息）


```
function myFunction()
{
  try
  { 
    var x=document.getElementById("demo").value;
    if(x=="")    throw "值为空";
    if(isNaN(x)) throw "不是数字";
    if(x > 10) throw "太大";
    if(x < 5) throw "太小";
  }
  catch(err)
  {
    var y=document.getElementById("mess");
    y.innerHTML="错误：" + err + "。";
  }
}
```