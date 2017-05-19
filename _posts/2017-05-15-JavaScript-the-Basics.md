---
layout: post
title: JavaScript基础
date: 2017-05-15 01:05:13 +0800
categories:
  - javascript
---

说明：之前学习javascript比较求成，很多基础知识都没有理解透彻，决定重温<<JavaScript高级程序设计>>,也为了便于今后复习,对之前csdn上的博文javascript基础做了延伸，
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

## 第二章   Javascript基本概念
<br/><br/>
### JavaScript 字面量（一种表示值的记法）<br/><br/>

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
### Javascript变量 <br/>

1.变量用于存储信息的“容器”。<br/>
2.ECMAScript的变量是松散类型的，其数据类型具有动态性。即：<br/>
&nbsp;&nbsp;&nbsp;ECMAScript的变量可以用来保存任何类型的数据,每个变量在初始化时并不会标记它的数据类型，在修改值时也可更换数据类型。<br/>
3.JavaScript 使用关键字 var 来定义变量， 使用等号来为变量赋值，用var操作符定义的变量将成为定义该变量的作用域中的局部变量。即如果在函数中使用var
定义一个变量，那么该变量在函数退出后就会销毁。（省略var操作符定义的变量为全局变量，最后不要在局部作用域中定义全局变量->难以维护）。

```javascript
var  length;
length = 6;
```
变量可以通过变量名访问。在指令式语言中，变量通常是可变的。字面量是一个恒定的值。
**注意：**
变量必须以字母开头
变量也能以 $ 和 _ 符号开头（不过我们不推荐这么做）
变量名称对大小写敏感（y 和 Y 是不同的变量）
<br/><br/>
### JavaScript 关键字<br/>
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
### JavaScript 注释 <br/>
<br/>
单行注释   //
<br/>
多行注释  /**/


<br/><br/><br/><br/><br/><br/>
## 第三章   Javascript操作符
<br/><br/>
### 一元操作符<br/>
#### 1.递增、递减操作符:<br>
```javascript
	//前置型递增/递减操作符：借鉴C,变量的值在语句求值前改变
	var age = 29;
	var otherage = --age+2;
	alert(age);			//28
	alert(otherage); 	//30
	//后置型递增/递减操作符：变量的值在语句求值后改变
	var age = 29;
	var otherage = age-- + 2;
	alert(age);			//28
	alert(otherage); 	//31
	//适用整数外，还是用于字符串、布尔值、浮点数值、对象
	var s1 = "2";
	var s2 = "z";
	var b = false;
	var f = 1.1;
	var o = {
		valueOf:function(){
			return -1;
		}
	};
	s1++;	//值变成数值3
	s2++;	//值变成NaN
	b++;	//值变成数值1
	f--;	//值变成0.10000000000000009(浮点数舍入错误)
	o--;	//值变成-2
```
<br/><br/>
#### 2.一元加和减操作符：<br>
一元加(+)放在数值前，不对数值产生影响，应用非数值前则像Number()转型函数一样进行值转换.<br/>
一元减(-)主要放在数值前，该值则变成负数，应用非数值规则同一元加操作符.<br/>
<br/><br/>

### 位操作符<br/>
ECMAScript中所有数值都以IEEE-754 64位格式存储，位操作符则将64位值转为32位整数再执行操作，最后将结果换位64位.<br/>
#### 1.按位非(~):<br/>
返回数值的反码  (本质： 操作数的负值-1)<br/>
```javascript
	var num = 25;
	alert(~num); //-26
```
<br/><br/>
#### 2.按位与(&)：<br>
有两位操作符数，结果：为其每位对齐，对相同位置上的对应数作AND操作，得到的值.<br/>
只在两个数值对应位都为1时才返回1，任何一位为0，结果都是0.<br/>
```javascript
	var num = 25 & 3;
	alert(num); //1
	//0 0 0 1  1 0 0 1
	//0 0 0 0  0 0 1 1
	//0 0 0 0  0 0 0 1
```
<br/><br/>
#### 3.按位或(|)：<br>
有两位操作符数，结果：为其每位对齐，对相同位置上的对应数作OR操作，得到的值.<br/>
只在两个数值对应位都为0时才返回0，任何一位为1，结果都是1.<br/>
```javascript
	var num = 25 & 3;
	alert(num); //27
	//0 0 0 1  1 0 0 1
	//0 0 0 0  0 0 1 1
	//0 0 0 1  1 0 1 1
```
<br/><br/>
#### 4.按位异或(^)：<br>
有两位操作符数，结果：为其每位对齐，对相同位置上的对应数作XOR操作，得到的值.<br/>
只在两个数值对应位都是0或都是1返回0，一个1一个0才返回1.<br/>
```javascript
	var num = 25 & 3;
	alert(num); //26
	//0 0 0 1  1 0 0 1
	//0 0 0 0  0 0 1 1
	//0 0 0 1  1 0 1 0
```
<br/><br/>
#### 5.左移(< <)：<br>
将所有数值向左移动指定位数,原数值右侧多出的空位补0.<br/>
相当于原数值乘以2的x次方,x为要移动的指定位数.<br/>
```javascript
	var num = 2;
	alert(num<<5); //26,相当于num*2^5
```
<br/><br/>
#### 5.有符号右移(> >)：<br>
将所有数值向右移动指定位数,原数值左侧多出的空位补0.<br/>
相当于原数值除以2的x次方,x为要移动的指定位数.<br/>
对于**有符号的右移**：会保留隐藏的符号位(不改变符号位)<br/>
```javascript
	var num = 64;
	alert(num>>5); //2,相当于num/(2^5)
```
<br/><br/>
#### 6.无符号右移(> > >)：<br>
而对于**无符号的右移**而言：正数同有符号右移结果相同，符号的话，右移结果会变得相当大(右移时左侧补0)<br/>
```javascript
	var num = -64;
	alert(num>>>5); //134217726
```
<br/><br/><br/>

### 布尔操作符<br/>

#### 1.逻辑非(!)：<br>
应用ECMAScript中任何值,返回布尔值.<br/>
!!相当于模拟Boolean()转型函数的行为.<br/>
逻辑非操作符遵循规则：<br/>
返回true的有：空字符串"" ,  数值0 , null , NaN ,undefined .
<br/><br/>
#### 2.逻辑与(&&)：<br>
只有true&&true 才为true，否则为false.<br/>
短路操作，若第一个操作符为false，则不会对第二个操作数求值.<br/>

<br/><br/>
#### 3.逻辑或(||)：<br>
只有false||false 才为false，否则为true.<br/>
短路操作，若第一个操作符为true，则不会对第二个操作数求值.<br/>

<br/><br/>

### 算数操作符符 <br/>
＋   -    *  	  /	%	++	--
```javascript
	//注意点如下：
	//忽略加法操作中的数据类型(若想对数值执行算术计算，可使用圆括号)
	var num1 = 5;
	var num2 = 10;
	alert("The sum of 5 and 10 is "+num1+num2); //The sum of 5 and 10 is 510;
	alert("The sum of 5 and 10 is "+(num1+num2)); //The sum of 5 and 10 is 15;
	//减法操作符：
	var result1 = 5 - true; //4
	var result2 = NaN - 1;   //NaN
	var result3 = 5 - "";		//5
	var result4 = 5 - "3";		//2
	var result5 = 5 - null;	//5
```
<br/><br/> 
### 比较操作符 <br/>
**相等、全等:**<br/>
相等：转换成相似类型,再比较;<br/>
==	  等于	<br/>
!=	 不等于	<br/>
```javascript
	//特殊情况：
	alert(null == undefined);	//true, null和undefined是相等的
	alert("NaN" == NaN);		//false,NaN和任何操作数比较都不相等(包括NaN自身)
	alert(NaN == NaN);			//false
	alert(false == 0);			//true
	alert(true == 1);			//true
	alert(undefined == 0);		//true
	alert(null == 0);			//false
	alert("5" == 5);			//true
```
相等和不相等操作符存在类型转换问题，建议使用全等。<br/>
全等：不转换，直接进行比较。<br/>
===	    绝对等于（值和类型均相等）<br/>	
!==	 不绝对等于（值和类型有一个不相等，或两个都不相等）	<br/>
```javascript
	alert("5" === 5);	//false;
	alert(null === undefined);  //false;
```



**其他:**
<br/>
 &gt; 大于 <br/>
 <	 小于 <br/>
 &gt;=	 大于或等于	 <br/>
 <=    小于或等于 <br/>	



<br/>
```javascript
	//注意点如下:
	//两个操作符都为数值，直接比较;都为字符串，比较字符编码值。
	var result = "23" < "3";	//true 
	//如果一个为数值，则将另一操作符转为数值再比较，如果为布尔值，先转为数值再比较。
	var result = "23" < 3;		//false,字符串被转为数值23 
	//任何数与NaN比较,都为false
	var result = "a" < 3; //false (NaN < 3)
```
<br/>
### 赋值操作符 <br/>
=    +=     -=      *=  	  /=	 %=	<br/>
仅简化赋值操作，不提升性能。<br/>





### 条件运算符 <br/>

variablename=(condition)?value1:value2 
如：var a = (100>50)?"yes":"no"  //a为"yes"
<br/><br/><br/><br/><br/><br/>

## 第四章    Javascript数据类型
<br/><br/>
### 五种简单数据类型：（基本数据类型）<br/>
字符串（String）<br/>
数字(Number)<br/>
布尔(Boolean)<br/>
空（Null）<br/>
未定义（Undefined）。<br/>
**一种复杂数据类型:**<br/>
对象(Object)<br/>

### typeof 操作符：<br/>
用于检测变量的数据类型<br/>
ECMAScript变量是松散类型的，需要提供检测给定变量数据类型的手段—**typeof**，对一个值使用typeof的返回结果：<br/>
"undefined"    ->      该值未定义;<br/>
"boolean"      ->      该值为布尔值;<br/>
"string"       ->      该值为字符串;<br/>
"number"       ->      该值为数值;<br/>
"object"       ->      该值为对象或者null;<br/>
"function"     ->      该值为函数。<br/>
<br/>


```javascript
	typeof "John"                // 返回 string 
	typeof 3.14                  // 返回 number
	typeof false                 // 返回 boolean
	typeof [1,2,3,4]             // 返回 object，数组是一种特殊的对象类型
	typeof {name:'John', age:34} // 返回 object
	
	var x;        
	alert(typeof x);   //"undefined"
	var x = null; 
	alert(typeof x)    //"object"
```
<br/>
**JavaScript 拥有动态数据类型**,即相同的变量可用作不同的类型

```javascript
	var x;        // x 为 undefined
	var x = 5;    // 现在 x 为数字
	var x = "hi"; // 现在 x 为字符串
```
<br/><br/><br/>
### 1.Undefined类型:<br/>
Undefined 只有一个值，特殊的值undefined,这个值表示变量不含有值,使用var声明变量但未初始化，其变量值就是undefined。<br/>
Undefined典型应用：变量声明但未赋值、调用函数应提供参数却未提供、对象中未赋值的属性、函数无返回值默认返回undefined。<br/>
```
	var x;        
	alert(x == undefined);  //true
```
<br/>
对typeof操作符而言，声明了变量，但未初始化 与为声明变量 返回的结果都为"undefined"<br/>

```javascript
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

### 2. Null类型:<br/>
Null 只有一个值，特殊的值null，null值表示一个空对象指针（所以typeof检测null返回"object"）.<br/>
undefined值派生自null值，因而其相等性测试返回true.<br/>
null典型应用：作为函数的参数，表示该函数的参数不是对象，作为对象原型链的终点。<br/>
```javascript
	var x=null;        
	alert(typeof x);  //"object"
	alert(null == undefined);  //true
	Object.getPrototypeOf(Object.prototype); // null,作为原型链终点
```
可以通过将变量的值设置为 null 来清空变量。

<br/><br/>

### 3.Boolean类型:<br/>
Boolean类型只能有两个子面值：true 和 false。<br/>
要将一个值转换为Boolean值，可以掉用转型函数Boolean(),也用！！可实现boolean转型。<br/>
多用于条件测试<br/>
个数据类型转换为Boolean类型为false的值：<br/>
String(空字符串""),Number(0和NaN,不包括无穷大),Object(null),Undefined(undefined).<br/>
```javascript
	var x = true;
	var y = false;
	var m = "hello";
	var mBoolean = Boolean(m);
```



<br/><br/>

### 4.Number类型：<br/>
JavaScript 只有一种数字类型Number,使用IEEE754标准中的双精度浮点数,不区分整数和浮点数，数字可以带小数点，也可以不带。<br/>
```javascript
	var x1=34.00;      //使用小数点来写
	var x2=34;         //不使用小数点来写
```
<br/>进制：<br/>
```javascript
	var num1 = 32;  //十进制
	var num2 = 070  //八进制，第一位必须为0，后面位0-7的数字序列
	var num3 = 079  //无效八进制，超出范围，解析为十进制
	var num4 = 0xA; //十六进制10，前两位必须为0x,后跟十六进制数字(0-9和A-F)A-F可大小写。
```
<br/><br/>浮点数值：<br/><br/>
保存浮点数值需要的内存空间是保存整数的两倍，ECMAScript会不失时机地将浮点数值转为整数值.<br/>
用e表示法表示的数值等于e前面的数值乘以10的指数次幂。<br/>
浮点数值的最高精度是17位小数，在算术计算时精确度远不如整数。【不要测试某个特定的浮点数值】<br/>
```javascript
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
```javascript
	var result = Number.MAX_VALUE + Number.MAX_VALUE;
	alert(isFinite(result));   //false;
```
<br/><br/>
NaN (Not a Number):<br/>
&nbsp;&nbsp;&nbsp;&nbsp;一个特殊的数值,表示一个本来要返回数值的操作数未返回数值的情况(数值除以非数值不报错->返回NaN).<br/>
&nbsp;&nbsp;&nbsp;&nbsp;isNaN()，接受一个参数，尝试转为数值，不能转换为数值的值都会导致整个函数返回true。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;也适用对象(->valueof()->tostring())
<br/><br/>
数值转换：<br/><br/>
非数值转换为数值：Number() —用于任何数据类型、 parseInt()、parseFloat()  —用于字符串。<br/>
Number转换规则：<br/>
Boolean： true转换为1,false转换为0 ;<br/>
null：    返回0 ;<br/>
undefined : 返回NaN ;<br/>
string:   
&nbsp;&nbsp;&nbsp;&nbsp;只包含数字(有效浮点格式)，直接转为10进制(浮点数值)(忽略前导零);<br/>
&nbsp;&nbsp;&nbsp;&nbsp;字符串为空,返回0;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;包含有效的十六进制，转换为相同大小的10进制.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;除了上述格式，返回NaN. <br/><br/>
```javascript
	var num1 = Number("hello world!"); //NaN
	var num2 = Number(""); //0
	var num3 = Number("0000011"); //11
	var num4 = Number(true);         //1
```
parseInt()：(在转换字符串上更合理).<br/>
&nbsp;&nbsp;&nbsp;&nbsp;忽略字符串前面的空格，直至第一个非空字符,第一个字符不是数字字符或符号，parseInt()就会返回NaN;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;如果第一个字符是数字字符或符号，会继续解析至非数字字符;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;能解析各种数字格式(十六进制、八进制...)；<br/>
&nbsp;&nbsp;&nbsp;&nbsp;字符串为空，返回NaN;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;第二个参数，转换时使用的基数（进制）。
<br/><br/>
```javascript
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
&nbsp;&nbsp;&nbsp;&nbsp;第一个小数点有效，第二个小数点无效;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;始终忽略前导零;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;只解析十进制，十六进制的字符串转换为0;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;如果为一个可解析的整数，返回整数。<br/>
<br/><br/><br/>

### 5.String类型: <br/>
String类型可以为引号的任意文本，可用单引号或双引号。<br/>
ECMAScript中的字符串不可变，一旦创建，其值不可变。若要更改某个变量保存的字符串，会先销毁原来字符串，用包含新值的字符串填充。
<br/><br/>
1.特殊字符字面量(转义序列)：<br/>
\n 换行, \t 制表 ,\b 退格,\r 回车,\\ 斜杠(\),\' 单引号,\ " 双引号 ,<br />
\xnn 十六进制码nn为一字符 , \unnn 十六进制码nn为一Unicode字符<br/>
2.转换为字符串:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;使用几乎所有值（除null和undefined值外)都有的toString()方法,可传参数：输出数值的基数<br/>
&nbsp;&nbsp;&nbsp;&nbsp;使用转型函数String(),适用所有值,null->"null",undefined->"undefined",其他->调用toString() <br/>
&nbsp;&nbsp;&nbsp;&nbsp;使用加法操作符,把它与""加在一起<br/>

```javascript
	var a=" hello ";
	var b=" my name is 'Lee XX' ";
	var c=' your name is "KangKang" ';
	
	var value1 = 10;
	var value2 = true;
	var value3 = null;
	var value4;
	
	alert(value.toString());    //"10"
	alert(value.toString(2));    //"1010"
	
	alert(String(value1));    //"10"
	alert(String(value2));	  //"true";
	alert(String(value3));	  //"null"
	alert(String(value4));	  //"undefined"
	
	alert(typeof (value1+""));  //"string"  
	
```
<br/><br/><br/>

### 6.Object类型:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;一组数据和功能的集合，通过new操作符跟要创建的对象名称创建;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Object类型是所有它的实例的基础，Object是所有对象的基础;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;Object的每个实例都有下列属性和方法，因此所有对象都具有这些基本属性和方法<br/>

```javascript
	var o = new Object();//不给构造函数传参可省略(),不推荐	
```
**Object实例都具有的属性和方法:**<br/>
constructor  	 					->  保存创建当前对象的函数(构造函数).<br/>
hasOwnProperty(propertyName)    	->  检查给定的属性在当前对象实例中(而非实例原型)是否存在.<br/>
isPrototypeOf(Object)    			->  检查传入的对象是否是当前对象的原型.<br/>
propertyIsEnumerable(propertyName)  ->  检查给定的属性是否能用for-in语句枚举.<br/>
toLocaleString()					->  对象的字符串表示，与执行环境地区对应.<br/>
toString()							->  返回对象的字符串表示.<br/>
valueOf()							->  返回对象的字符串、数值、布尔值表示.<br/>
<br/><br/><br/><br/><br/><br/>


## 第五章   Javascript语句
<br/><br/>
**if else 语句:**

```javascript
	if (/*condition1*/)
	{
		//当条件 1 为 true 时执行的代码
	}
	else if (/*condition2*/)
	{
		//当条件 2 为 true 时执行的代码
	}
	else
	{
		//当条件 1 和 条件 2 都不为 true 时执行的代码
	}
```

**switch语句**

```javascript
	switch(/*n*/)
	{
		case 1:
			//执行代码块 1
			break;
		case 2:
			//执行代码块 2
			break;
		default:
			//与 case 1 和 case 2 不同时执行的代码
	}
```


**for 循环**

```javascript
	//方式1：
	for (/*语句 1*/; /*语句 2*/; /*语句 3*/)
	{
		//被执行的代码块
	}
	//方式2：for/in
	var person={fname:"John",lname:"Doe",age:25}; 
	 
	for (x in person)
	{
		txt=txt + person[x];
	}
```

**while循环**

```javascript
	while (/*条件*/)
	{
		//需要执行的代码
	}

	//或

	do
	{
		//需要执行的代码
	}
	while (/*条件*/);
```



**break  continue 语句**<br/>
break 语句可用于跳出循环。
continue 语句跳出循环后，会继续执行该循环之后的代码

```javascript
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


**实现label 标签跳出循环**
 label标签可是任意名称（非关键字保留字）

```javascript
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
<br/><br/>
**with语句**<br/>
作用：将代码的作用域设置到一个特定对象中,简化多次编写同一个对象的工作<br/>
```javascript
	var qs = location.search.substring(1);
	var hostName = location.hostname;
	var url = location.href;
```
使用with语句:<br/>
```javascript
	with(location){
		var qs = search.substring(1);
		var hostName = hostname;
		var url = href;
	}
```
with语句在严格模式下视为语法错误,大量使用with会造成性能下降，调试错误，不建议使用<br/>

<br/><br/><br/><br/><br/><br/>



## 第六章   Javascript错误
<br/><br/>
**try:** 
 允许我们定义在执行时进行错误测试的代码块
**catch：** 
语句允许我们定义当 try 代码块发生错误时，所执行的代码块。
trycatch 语句在javascript中是成对出现的
**throw：** 
JavaScript 将抛出一个错误。（当错误发生时，当事情出问题时，JavaScript 引擎通常会停止，并生成一个错误消息）


```javascript
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