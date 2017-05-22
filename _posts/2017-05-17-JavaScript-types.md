---
layout: post
title: JavaScript变量及作用域
date: 2017-05-17 01:05:13 +0800
categories:
  - javascript
---

说明：关于javascript基本类型及引用类型、执行环境及作用域等...  -参考《JavaScript高级程序设计(第3版)》

<br/><br/><br/><br/>

- 目录
{:toc #markdown-toc}

## 1.基本类型和引用类型的值
<br/>
ECMAScript变量包含两种不同数据类型的值：基本类型值和引用值。<br/><br/>
基本类型类型：Undefined、Null、Boolean、String、Number.<br/>
[简单的数据段,按值访问,可以直接操作保存在变量中的实际的值]<br/><br/>
引用类型：[引用类型值指由多个值构成的对象,这些对象保存在内存中,因而只能操作对象的引用,不能操作对象的内存空间]<br/>
<br/>
**从内存分配上看：**<br/>
原始值：存储在栈（stack）中的简单数据段，即值直接存储变量访问的位置，可以直接操作。
其空间固定，将他们存储在较小的内存区域（栈）便于迅速查寻变量的值。<br/>

引用值：指复合数据类型的对象，因为其空间大小不固定，因而将其存于堆中，因而存储在变量处的值是一个指针，指向存储对象的内存地址。<br/><br/>
内存分析图：<br/><br/><br/>
<img class ="img-responsive center-block" src="{{site.url}}/img/1.png" alt="" style="border:1px solid #000;" />
<br/><br/><br/>
### 复制变量：<br/>
基本类型：<br/>
若变量A要复制变量B的基本类型的值，则会把变量B的副本赋值给变量A,此后AB变量完全独立，只不过拥有的值相同。<br/>
<br/>
引用类型：<br/>
若变量A要复制变量B的引用类型的值，也会把存储在变量A中的值赋值给变量B,但由于存放在变量处的是一个指向对象内存地址的指针，所以它们操作的其实是同一个对象。<br/>
```javascript
	//基本类型值的复制
	var num1 = 5;
	var num2 = num1;
	num1=10;
	alert(num2);	//5
	//引用类型值的复制
	var obj1 = new Object();
	var obj2 = obj1;
	obj1.name = "Nicholas";
	alert(obj2.name);    //"Nicholas"
```
可参考下图：
<br/><br/>
<img class ="img-responsive center-block" src="{{site.url}}/img/2.png" alt="" style="border:1px solid #000;" />
<br/><br/>
### 传递参数：<br/>
ECMAScript中所有函数的参数都是按值传递的。但基本类型和引用类型在传参时还是有差别。其主要原因主要是上述讲到的内存分配不同导致的。<br/>
对于基本类型的值传递还是一样,独立各不影响。<br/>
对于引用类型：引用类型变量存放的值仍是其对象在堆内存中的内存地址，因此它传递的值也就是这个内存地址，因此若在函数内部修改了该参数，也会体现在外部，因为它们都指向同一个对象。<br/>
```javascript
	//基本类型：
	function addTen(num){
		num+=10;
		return num;
	}
	var count = 20;
	var result = addTen(count);
	alert(count);	//20
	alert(result);	//30;
	
	//引用类型：
	function setName(obj){
		obj.name = "Nicholas";
	}
	var person = new Object();
	setName(person);
	alert(person.name);    //"Nicholas"
```
<br/>
《JavaScript高级程序设计(第3版)》书中证明对象是按值传递部分：<br/>
```javascript
	function setName(obj){
		obj.name = "Nicholas";
		obj = new Object();
		obj.name="Greg";
	}
	var person = new Object();
	setName(person);
	alert(person.name); //"Nicholas";
```
对于上次代码，书中的解释为：**如果person是按引用传递的,那么person就会自动被修改为指向其name属性值为"Greg"的新对象，但实际访问person.name,得到的仍是"Nicholas",说明即使在函数内部
改了参数的值，但原始的引用仍未改变。**<br/>
上述代码中setName部分其实就是：
```javascript
	function setName(person){
		arguments[0] = person;
		arguments[0].name="Nicholas"; //即person.name="Nicholas";
		arguments[0] = new Object();  //arguments[0]的值重新绑定了新对象的内存地址，已经不再同person一样指向同一个对象的内存地址，而person的值仍为原来的值。
		arguments[0].name="Greg"; //与person无关
	}
```
补充：在函数内部重写obj,其实这个变量引用即为一个局部变量，该函数执行完毕后，这个局部变量就会被销毁。<br/>
因而可以把ECMAScript函数的参数想象成局部变量。<br/>

<br/><br/><br/>
### 检测类型：<br/>
typeof操作符用于检测String、Number、Boolean、Undefined类型的最佳工具。不过无法检测object和null<br/>
```javascript
	var n = null;
	var o = new Object();
	alert(n);	//object
	alert(o);	//object
```
在检测引用类型时,我们可以使用**instanceof操作符**<br/>
如果变量是给定引用类型的实例,instanceof操作符就会返回true。<br/>
补充：所有的引用类型都是Object的实例,因此用instanceof检测一个引用类型值和Object始终为true,用instanceof检测基本类型值则始终为false.<br/>
```javascript
	alert(person instanceof Object);    //变量person是否为Object的实例?
	//举例如下:
	function Animal(){};
	function Pig(){};
	Pig.prototype = new Animal();	//后续介绍---Pig继承Animal
	alert(new Pig() instanceof Animal);    //true
```
<br/><br/>
### 执行环境与作用域：<br/>
1. 每个执行环境都有一个与之关联的变量对象,环境中定义的所有变量和函数都保存在这个对象。我们无法通过代码访问该对象，但解析器可在后台处理数据时使用它。<br/>
2. 执行环境也称为执行上下文,当Javascript解释器初始化执行代码时,会**默认进入全局执行环境**,执行过程中调用的**每个函数都会创建一个新的执行环境**，
每个函数都有自己的执行环境,当执行流进入一个函数时,会**将函数的环境推入栈顶部,函数执行完,其环境从栈中退出,控制权交回原来的执行环境。**<br/>
3. 全局执行环境是最外围的执行环境,在Web浏览器中,全局变量被认为是window对象,**所有全局变量和全局函数都作为window对象的属性和方法。**<br/>
4. 当代码在一个执行环境中执行时,会**创建变量对象的一个作用域链**,其用途是保证对执行环境有权访文的所有变量和函数的有序访问。**全局作用链的前端是当前执行代码所在的环境的变量对象。<br/>
5. 内层环境可以引用外层环境的变量和函数,而外层环境则无法访问内层变量的变量和函数。<br/>
6. 全局执行环境的变量对象始终都是作用域链的最后一个对象。<br/>

```javascript
	var color = "blue";
	function changeColor(){
		var anotherColor = "red";
		function swapColors(){
			var tempColor = anotherColor;
			anotherColor = color;
			color = tempColor;
			
			// 这里可以访问color, anotherColor, 和 tempColor
		}
		// 这里可以访问color 和 anotherColor,但不能访问tempColor
		swapColors();
	}
	changeColor();// 只能访问color
```
执行环境如图：
<br/><br/>
<img class ="img-responsive center-block" src="{{site.url}}/img/3.png" alt="" style="border:1px solid #000;" />
<br/><br/>
解释：<br/>
上述代码主要涉及三个执行环境：全局执行环境、changeColor()局部环境、swapColors()局部环境。<br/>
1.全局环境：变量color、函数changeColor().<br/>
2.changeColor()局部环境：变量anotherColor,函数swapColors().<br/>
3.swapColors()局部环境:变量tempColor.<br/>
<br/>
该段代码很好地展现了内层环境可引用外层环境的变量和函数,而外层环境无法访问内层变量的变量和函数。<br/>
如图,执行环境可以向上搜索作用域链,查询变量和函数名,任何环境下都不能通过向下搜索作用域链进入另一个执行环境。<br/>
即：changeColor()执行环境不能向下搜索进入swapColors()执行环境,但swapColors()执行环境可以通过向上搜索进入changeColor()执行环境。<br/>
<br/><br/><br/>
### 查询标识符：<br/>
查询过程：从作用域链前端开始,向上逐级查询与给定名字相匹配的标识符,找到便停止返回,未找到则继续向上逐级搜索,一直追溯到全局环境的变量对象,若还未找到,则该变量未声明。<br/>
<br/><br/><br/>
### 延长作用域链：<br/>
执行环境共有全局和局部两种,但可通过其他方式延长作用域链。<br/>
可以通过一些语句在作用域链的前端临时增加一个变量对象,该变量对象在代码执行结束后删除。<br/>
实现上述方法的两种语句：<br/>
**try-catch语句的catch块**：创建一个新变量对象，其中包含被抛出的错误对象的声明.<br/>
**with语句**:将指定对象添加到作用域链中。<br/>
<br/><br/><br/>
### 无块级作用域：<br/>
什么是无块级作用域？<br/>
在其他类C语言中,花括号{}封闭的代码(if,for,while...)都有自己的作用域,但在ECMAScript中经常会遇到下列问题：<br/>

```javascript
	//在javascript中,if,for语句等没有自己的执行环境,而是会把其变量添加到当前执行环境(在此为全局环境).
	//if语句中：
	if(true){
		var color = "blue";
	}
	alert(color);	//"blue"
	//for语句中
	for(var i = 0;i<10;i++) {
		alert(i);
	}
	alert(i);	//10  ！！！
```