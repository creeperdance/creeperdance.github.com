---
layout: post
title: JavaScript  匿名函数与闭包
date: 2017-06-02 01:05:13 +0800
categories:
  - JavaScript
---

说明：匿名函数、闭包、创建闭包的常见方式、
循环里包含匿名函数、关于this对象、内存泄漏
匿名函数中的私有化...

<br/><br/>

- 目录
{:toc #markdown-toc}

## 匿名函数
**普通函数:**

```javascript
function box(){
	return 'Lee';
}
alert(box());
```
**匿名函数：**

```javascript
//单独的匿名函数  会报错    无法运行    也无法调用
//function() {
//	return 'Lee';
//}

//通过表达式的自我执行
(function() {
	alert('Lee');
})();

//把匿名函数赋值给变量
var cat = function() {
	return 'Lee';
};
alert(cat()); //调用

//把匿名函数自我执行的返回值赋值给变量
var box = (function() {
	return 'Lee';
})();
alert(box);
//自我执行匿名函数的传参
(function (num){
	alert(num);
})(100);


```

## 闭包

闭包指有权访问另一个函数作用域里变量的函数
<br/><br/>
```javascript
//函数里放一个匿名函数---闭包
function box (){
	return function(){
		return 'Lee';
	}
}
alert(box);	//function box(){return function(){return 'Lee'}}
alert(box());//function (){return 'Lee'}
alert(box()());//Lee
```

<br/><br/>
### 创建闭包的常见方式：
在一个函数内部创建另一个函数，通过另一个函数访问这个函数的局部变量

```javascript
//通过全局变量来累加
var age=100;
function box(){
	age++;
	alert("age:"+age);
}
box();
alert(age);//101
//通过闭包返回局部变量
function box(){
	var age=100;
	return function(){
		return age;
	}
}
alert(box()());
```
使用闭包的优点（缺点），可以把局部变量驻留在内存中，避免使用全局变量（全局变量污染导致应用程序不可预测性，每个模块都可调用容易发生错误，所以推荐使用私有的，封装的局部变量）

```javascript
//使用局部变量无法累加
function box(){
	age=100;
	age++;
	return age;
}
alert(age);//100
box();
alert(age);//100
//使用匿名函数实现局部变量驻留内存中，实现累加
function box(){
	var age=100;
	return function (){
		age++;
		return age;
	}
}
var b = box();
alert(b());//101
alert(b());//102
b=null;//接触引用，等待垃圾回收
```
由于闭包里作用域返回的局部变量资源不会被立刻撤销回收，所以可能会占用过多内存，过度使用将导致性能下降，建议在必要时才使用


### 循环里包含匿名函数
作用域链的机制导致了一个问题，在循环里的匿名函数取得的任何变量都是最后一个值  

```javascript
function box(){
	var arr = [];
	for(var i=0;i<5;i++){
		arr[i]=function(){
			return i;
		}
	}
	//循环已经执行完毕了，i最终为4++即5
	return arr;
}
var b=box();
for(var i=0;i<b.length;i++){
	alert(b[i]());
}
//5 5 5 5 5
//解决方法，单纯得到0 1 2 3 4  ---->无需使用匿名函数
function box(){
	var arr = [];
	for(var i=0;i<5;i++){
		arr[i]=i;
	}
	return arr;
}
for(var i=0;i<5;i++){
	alert(box()[i]);
}

//通过匿名函数及时自我执行
function box() {
var arr = [];
	for(var i = 0; i < 5; i++) {
		arr[i] = (function(num) {
			return num;
		})(i);
	}
	return arr;
}
var b = box();
for(var i = 0; i < b.length; i++) {
	alert(b[i]);
}
//通过闭包可以将变量驻留内存中
function box() {
var arr = [];
	for(var i = 0; i < 5; i++) {
		arr[i] = (function(num) {
			return function(){
				return num;
			};
		})(i);
	}
	return arr;
}
var b = box();
for(var i = 0; i < b.length; i++) {
	alert(b[i]);
}
```
### 关于this对象
this对象是在运行时基于函数的执行环境绑定的，如果this在全局范围就是window，如果是在对象内部，就指向这个对象，而闭包却是在运行时指向window的，因而**闭包不属于这个对象的属性或方法。**

```javascript
var user="The window";
var box = {
	user:'The box',
	getUser:function(){
		return this.user;
	}
}
alert(user);//The window
alert(box.getUser());//The box

var user = "The window";
var box = {
	user: 'The box',
	getUser: function() {
		return function(){
			return this.user;
		}
	}
}
alert(box.getUser()()); //The window
alert(box.getUser().call(box)); //The box
```

### 内存泄漏
	
```javascript
function box(){
	var oDiv = document.getElementById('oDiv');//oDiv用完后一直存在内存中
	var text =oDiv.innerHTML;
	oDiv.onclick=function(){
		alert(text);
	}
	oDiv=null;//解除引用，等待回收
}
box();
```

### 匿名函数中的私有化

封装细节，提高安全性和可控性,经常在全局作用域中被用于函数外部，从而限制向全局作用域中添加过多的变量和函数。
在全局作用域中使用块级作用域可以减少闭包占用内存的问题，因为没有指向匿名函数的引用，只要函数执行完毕，就可以立即销毁其作用域链了。

**模仿块级（私有）作用域：**

```javascript
function box(){
	for(var i=0;i<5;i++){  //块级作用域(js无)
	}
	var i //即便重新声明，也不会影响之前的值
	alert(i);//5
}
box();
```

<br/>
javascript 不同于java,c等其他语言，它没有块级语句的作用域,它不会提醒你多次声明同一次变量.因此可通过模仿块级作用域解决该问题。

```javascript
function box(){
	(function(){
		for(var i=0;i<5;i++){  //块级作用域(js无)
		}
	})();
	alert(i);//报错
}
box();
```
**私有作用域：**

<br/>
```javascript
//全局变量
var age;
age=100;
age=null;
//太繁琐，没有封装性

(function(){
	//这里就是全局的私有作用域
	var age=100;
	alert(age);
})();
```

**私有变量**
javascript中没有私有属性的概念，所有的对象属性都是公有的，不过有私有变量的概念。
任何在函数中定义的变量，都可以被认为是私有变量，因为不能在函数的外部访问这些变量。

```javascript
function box(){
	var age=100;//私有变量，外部无法访问
}
//通过函数内部创建一个闭包，那么闭包通过自己的作用域链也可以访问这些变量，而利用这一点，也可以创建用于访问私有变量的共有方法
function Box(){
		this.age=100;//共有属性，外部可直接访问
		this.run=function(){//共有方法
			return 'running...';
		}
}
var box = new Box();
alert(box.age);//100
alert(box.run());//running
/*
function Box(){
	var age=100;//私有变量
	function run(){//私有方法
		return "running...";
	}
}
var box = new Box();
alert(box.run());//报错
*/

//解决方法：
function Box(){
	var age=100;//私有变量
	function run(){//私有方法
		return "running...";
	}
	this.getRun= function(){//对外可见的公共接口，特权方法
		return run();
	}
	this.getAge=function(){
		return age;
	}
}
var box = new Box();
alert(box.getRun());//running
alert(box.getAge());//100

```

<br/>

**通过构造函数传参**


```javascript
function Box(value) {
var user = value; //私有变量
	this.getUser = function() {
		return user;
	}
}
var box1 = new Box('Lee');
alert(box1.getUser());//Lee
var box2 = new Box('MJG');
alert(box2.getUser());//MJG
//没有共享
```


**静态私有变量**

```javascript
//使用property导致方法共享，而user也变成了静态属性（共享于不同对象中的属性）
(function() {
	var user = ""; //私有变量
	Box = function(value) {
		user = value;
	}
	Box.prototype.getUser = function() {
		return user;
	}
	Box.prototype.setUser = function(value) {
		user = value;
	}
})();
var box1 = new Box('Lee');
alert(box1.getUser());//Lee
var box2 = new Box('kkk');
alert(box1.getUser());//kkk
box2.setUser('OOO');
alert(box1.getUser());//OOO
```


**模块模式**

```javascript
//单例：永远只实例化一次   ----->字面量方式实例化对象
var box = function(){
	var user='Lee';//私有变量
	function run(){//私有函数
		return " running...";
	}
	return {//直接返回一个对象
		publicGo:function(){
			return user+run();
		}
	}
}();//自我执行的函数
alert(box.publicGo());//Lee running

```
**增强的模块模式：**
```javascript
function Desk() {};
var box = function() {
	var user = 'Lee';

	function run() {
		return ' running';
	}
	var desk = new Desk();
	desk.publicGo = function() {
		return user + run();
	}
	return desk;
}();
alert(box.publicGo());
```


<br/><br/><br/><br/><br/><br/>