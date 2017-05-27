---
layout: post
title: JavaScript 面向对象
date: 2017-05-24 01:05:13 +0800
categories:
  - javascript
---
说明:创建对象方法：1.使用构造函数创建、2.使用对象字面量创建一个对象、3.通过工厂模式创建对象、
4.通过构造函数模式创建对象、5.通过原型模式创建对象、6.通过动态原型模式创建对象、
7.通过寄生构造函数模式创建对象、8.通过稳妥构造函数模式创建对象。<br/>
继承：1.继承 通过原型链实现、2.借用构造函数（对象冒充）、3.组合继承、
4.原型式继承、5.寄生式继承、6.寄生组合继承

<br/><br/><br/><br/>

- 目录
{:toc #markdown-toc}

# **理解对象**
- **对象和类：**<br/>
面向对象的语言的标志就是**类**，而通过类可以**创建任意多个具有相同属性和方法的对象**。
而**ECMAScript中并没有类的概念**，因此它的对象和其他基于类的语言中的对象有所不同。<br/>
- **ECMAScript中的对象：**<br/>
**ECMAScript中将对象定义为无序的属性集合，其属性可以包含基本值，对象或函数。**(可以将其想象为一个散列表，即一组名值对，其中值可以是基本值，对象或函数)。<br/>
**每个对象都是基于一个引用类型创建的，这个引用类型可以是原生类型，也可以是开发人员自定义类型。**

<br/><br/>

## **属性类型**
**属性在创建时都会带有一些特征值，ECMAScript为了描述属性(property)的各种特征时，定义了特性(attribute)。**（所以特性就是用于描述属性的）<br/>
**特性是为了实现JavaScript引擎用的，不能直接访问(只能通过方括号访问,如[[Enumerable]])**
<br/><br/>
### **数据属性**
数据属性是用于**存储数据数值的，它具有一个数据值的位置，在该位置可读取或写入值。<br/>**
数据属性有4个描述其行为的特性：<br/>
- **[[Configurable]]** <br/>
表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或能否把属性修改为访问器属性,
若直接在对象上创建属性，默认true。<br/>
<br/>
- **[[Enumerable]]** <br/>
表示能否通过for-in循环返回属性，若直接在对象上创建属性，默认true。<br/>
<br/>
- **[[Writable]]**<br/>
表示能否修改属性的值，若直接在对象上创建属性，默认true。<br/>
- **[[Value]]**<br/>
包含这个属性的数据值，默认undefined。

如果要**修改属性默认的特性**，就要使用ES5的**Object.defineProperty()方法**.<br/>
该方法接收三个参数：<br/>
- 属性所在的对象
- 属性的名字
- 描述符对象
<br/>
属性必须为:<br/>
Configurable,Enumerable,
Writable,Value
如下代码：<br/>
```javascript
var person = {};
Object.defineProperty(person,"name",{
	writable:false;
	value:"Nicholas"
});
alert(person.name);    //"Nicholas"
person.name = "Greg";
alert(person.name);	   //"Nicholas"
```

**可以多次调用Object.defineProperty()修改同一个属性，但是把configurable特性设置为false之后，就会有限制了。**<br/>
```javascript
var person = {};
Object.defineProperty(person,"name",{
	configurable:false;
	value:"Nicholas"
});
//抛出错误
Object.defineProperty(person,"name",{
	configurable:true;
	value:"Nicholas"
});
```

**如果用Object.defineProperty()创建新属性且未指定，configurable和writable特性的默认值都为false。**<br/>
<br/><br/>

### **访问器属性**<br/>
访问器属性不包含数据值，它们包含一对**getter**和**setter**函数(非必需),在读取访问器属性时调用getter函数，写入访问器属性时调用setter函数。<br/>
有以下四个特性：<br/>
- **[[Configurable]]:**  同上
- **[[Enumerable]]:**   同上
- **[[Get]]:**  在读取属性时调用的函数，默认值为undefined
- **[[Set]]:**  在写入属性时调用的函数，默认值为undefined

**访问器属性不能直接定义，要使用Object.defineProperty()方法定义。**<br/>
```javascript
var book = {
	_year:2001,
	edition:1
};
Object.defineProperty(book,"year",{
	get:function(){
		return this._year;
	},
	set:function(){
		if(newValue>2001){
			this._year=newValue;
			this.edition+=newValue-2001;
		}
	}
});
book.year=2002;
alert(book.edition);    //2
```

"_year"的下划线用于表示只能通过对象方法访问的属性，而访问器属性year则包含了一对getter,setter函数,分别用于获取和设置这个访问器属性的值。<br/>
若只指定getter函数则表示属性不能写，若尝试写入属性会被忽略(严格模式下会报错)，同样的，只指定setter函数的属性则不能读。<br/>
ES5之前用的是__defineGetter__(), \__defineSetter__().<br/>


<br/><br/>
## **定义多个属性**<br/>
ES5定义了一个Object.defineProperties()方法为对象定义多个属性。<br/>
利用该方法可以通过描述符**一次定义多个属性。**<br/>
**参数：**<br/>
- 要添加和修改其属性的对象
- 与第一个参数的对象一一对应

```javascript
var book = {};
Object.defineProperties(book,{
	_year:{
		writable:true,
		value:2004,
	},
	edition:{
		writable:true,
		value:1
	},
	year:{
		get:function(){
			return this._year;
		}
		set:function(newValue){
			if(newValue > 2004){
				this._year=newValue;
				this.edition+=newValue-2004
			}
		}
	}
});
```
与用Object.defineProperty()方法定义的唯一区别：这里的属性都是同一时间创建的<br/>

<br/><br/>
## **读取属性的特性**
ES5定义了**Object.getOwnPropertyDescriptor()方法**，用于**获取给定选择器的描述符**。<br/>
**接收参数：**<br/>
- 属性所在的对象
- 要读取其描述符的属性名称

**返回值：**一个对象。<br/>
若是访问器属性则该对象的属性有：configurable,enumerable,get,set。<br/>
如果是数据属性，则该对象的属性有：<br/>
configurable,enumerable,
writable,value。<br/>
如下代码：<br/>
```javascript
var book={};
Object.getOwnPropertyDescriptor(book,{
	_year:{
		value:2004
	},
	edition:{
		value:1
	},
	year:{
		get:function(){
			return this._year;
		}
		set:function(newValue){
			if(newValue > 2004){
				this._year = newValue;
				this.edition += newValue-2004;
			}
		}
	}
});
var descriptor = Object.getOwnPropertyDescriptor(book,"_year");
alert(descriptor.value);    //2004
alert(descriptor.configurable);    //false
alert(typeof descriptor.get);    //"undefined"
var descriptor = Object.getOwnPropertyDescriptor(book,"year");
alert(descriptor.value);    //undefined
alert(descriptor.configurable);    //false
alert(typeof descriptor.get);    //"function"
```



<br/><br/><br/><br/>
# **创建对象方法**
## **1.使用Object构造函数创建**

```javascript
var cat1 = new Object();
cat1.name = "hello kitty";
cat1.age = 3;
cat1.call=function(){
	alert("miao~~");
}
var cat2 = new Object();
cat2.name = "hello kitty";
cat2.age = 3;
cat2.call=function(){
	alert("miao~~");
}
```
## **2.使用对象字面量创建一个对象**

```javascript
var cat1 {
	name: "hello kitty",
	age = 3,
	call:function(){
		alert("miao~~");
	}
}
var cat2 {
	name: "hello kitty",
	age = 3,
	call:function(){
		alert("miao~~");
	}
}
```
<br/>
因ECMAScript中没有类的概念，它的对象和其他基于类的语言中的对象不同，
观察上述代码发现，虽然能通过Object构造函数或对象字面量来创建单个对象，但**使用同一个接口创建很多对象时，会产生大量代码**。
<br/><br/>
**为了提高代码的复用性\--->工厂模式**

<br/>
 
<br/><br/>
## **3.通过工厂模式创建对象**
抽象了创建对象的具体过程,**用函数来封装以特定接口创建对象的细节**。

```javascript
funtion createPerson(name , age , job) {
	var o = new Object();
	o.name=name;
	o.age=age;
	o.job=job;
	o.sayname=funtion(){
		alert(this.name);
	}
	return o;
}
var person1 = createPerson("zhangsan",12,"Student");
var person2 = createPerson("Lisi",44,"Teacher");

```

观察上述代码，我们可以发现相交1,2两种创建对象方法而言，我们已经可以解决了创建多个相似对象的问题了。<br/>
but...我们看到函数内部返回的都是Object对象，即**工厂模式并未解决对象识别问题**<br/>
为了解决这个问题  --->**构造函数模式**

<br/><br/>

## **4.通过构造函数模式创建对象**

```javascript
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function() {
		alert(this.name);
	}
}
var person1 = new Person("Xusan", 12, "Student");
var person2 = new Person("Lisi", 44, "Teacher");

//对象冒充
var o = new Object();
Person.call(o,'Micy',34,"Doctor");
alert(o.name);//o得到Person的所有
function Box(){}
var box = new  Box();

//解决了对象识别问题
alert(person1 instanceof Person);//true
alert(person2 instanceof Person);//true
alert(box instanceof Person);//false
alert(box instanceof Box);//true


alert(person1.sayName()==person2.sayName());//true 构造函数体内的方法的值是相等的
alert(person1.sayName==person2.sayName);//false  构造函数体内的方法的引用地址是不相等的（若想相同，可转为全局）

```
观察上述代码，我们发现：<br/>
1. 构造函数模式并未显示创建对象，而是直接将属性和方法通过传参的方式赋给了this对象，而当前的this对象其实指向的就是person对象。
(详见<a href="{{ site.url}}/2017/05/JavaScript-types.html">《JavaScript引用类型》</a>中介绍的this对象)<br/>
2. 构造函数内部并无返回值，因为this对象指向的就是person对象，所以其内部已经定义了person对象的属性和方法。<br/>
3. **注意点：**一般**构造函数第一个字母大写**，且创建Person对象的新实例**必须用"new"操作符**（如不通过new操作符，将和普通函数无异）
4. 从代码最后一行我们发现，构造函数体内的方法的引用地址是不相等，即**每个对象实例都指向不同的方法实例**,
从逻辑而言，此时构造函数的定义与下列代码定义方式相同。<br/>
```javascript
	function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = new Function("alert(this.name)");
}
```
以这种方式创建函数，会导致**不同的作用域链和标识符解析**，但创建Function新实例的机制仍然相同，这样创建两个完成相同任务的Function实例并无多大意义，
大可把函数定义转移到构造函数外部，（等于设置成全局函数），但要让它只能被某个对象调用，其全局作用域又有点名不符实，且如果对象需定义多个方法，都设置成全局则无封装性可言。 <br/>
解决方法：  -----> **原型模式**




<br/><br/>

## **5.通过原型模式创建对象**
上面提到构造函数模型创建对象的缺点：创建一个特定类型的多个实例的同时会创建多个完成相同任务的函数实例。要解决这个问题，
就是要解决创建多个对象时仅创建一个完成相同任务的函数，那么也就是让这个函数被这多个实例都共享。
(在其他语言中，称此函数为静态方法,被所有对象共享)<br/>
ECMAScript中，解决这个问题的方法则是通过原型对象创建方法。
创建每一个函数 都有一个**prototype（原型）属性**（默认，自动生成的），该属性又是一个对象，
它**用于包含可以由特定类型的所有实例共享的属性和方法。**原型prototype是函数的一个自带属性。
可以看作是构造函数在实例化时创作的那个对象。 <br/>
**好处：让所有对象实例共享它所包含的属性和方法，不用在构造函数中定义对象信息，直接将这些信息添加在原型中。**


```javascript
function Box(){}//当前构造函数体内什么都没有，若有则称其为实例属性，实例方法
//原型属性，原型方法：
Box.prototype.name="Lee";
Box.prototype.age=33;
Box.prototype.run=function(){
	return this.name+" "+this.age+" running";
}
var box1 = new Box();
alert(box1.name);
alert(box1.run());
//如果是实例方法，不同的实例化，其方法地址不同，唯一
//如果是原型方法，其地址是共享的
var box2 = new Box();
alert(box1.run==box2.run);//true
alert(box1.prototype);//undefined 其为函数的一个属性，使用对象实例无法访问prototype
alert(box1.__proto__);//[object object] 其为原型对象的指针
alert(box1.constructor);//function Box(){} 可以获取构造函数本身

//isPrototypeOf()
var obj = new Object();
alert(Box.prototype.isPrototypeOf(box1)); //true
alert(Object.prototype.isPrototypeOf(box1)); //true
//实例属性和方法不共享，原型属性和方法共享
box1.name="Milk";
alert(box1.name);//milk
alert(box2.name);//Lee


//判断实例中是否存在指定属性  hasOwnProperty()
alert(box1.hasOwnProperty("name"));//true
alert(box2.hasOwnProperty("name"));//false

//判断原型及实例中是否存在指定属性  in操作符
alert('name' in box2);  //true

//判断原型中是否存在指定属性：结合上述两种方法 

delete box1.name;//删除实例中的属性
delete Box.prototype.name;//删除原型中的属性


//原型模式的执行流程：（若function Box(){name="Jack"},box1.name会打印Jack）
//1.先查找构造函数实例里的属性或方法，若有，立刻返回
//2.如果构造函数实例中没有，则去其原型对象中找，有则返回
```
构造函数  ： 有prototype属性   -----> （指向）    原型对象
原型对象  ： 有constructor属性   ------>   对应的构造函数
实例对象  ： 有\__proto__属性  ------->  对应的原型对象
则有：

```javascript
alert(Box.prototype.constructor === Box);//true
alert(Box.prototype===box1.__proto__);//true
```

<br/>
（解释：在原型模式声明中，多了两个属性（\__proto__    和constructor））,这两个属性都是创建对象时自动生成的，_proto_属性
 是实例指向原型对象的一个指针，它可以指向构造函数的原型属性constructor。constructor是原型的一个属性,可以得到构造函数，可被原型指针定位，然后得到构造函数本身，起到连接对象实例和对应原型对象的作用。

**使用字面量方式创建原型对象：**

```javascript
function Box(){}
Box.prototype = {	//{}相当于创建对象 new Object()
	name:'Lee',
	age:100,
	run:function(){
		return this.name+" "+this.age+" running";
	}
}
var box = new Box();
alert(box.constructor);		//function Object(){[native code]}
```
使用字面量创建对象和使用构造函数创建原型对象在使用上基本相同。但字面量创建的方式使用constructor不会指向实例对象的构造函数，而会指向Object，构造函数创建原型对象方式则相反。


可通过强制指向，让字面量方式的constructor指向实例对象的构造函数
补充：原型的声明是有先后顺序的，重写的原型会切断之前的原型
```javascript
function Box(){}
Box.prototype = {	
	constructor:Box,
	name:'Lee',
	age:100,
	run:function(){
		return this.name+" "+this.age+" running";
	}
}
//var box = new Box();
//alert(box.constructor);		//function Box(){[native code]}

Box.prototype = {
	age:200 //切断了原来原型对象和构造函数对象实例的关系
};
var box = new Box();
alert(box.run);//box.run is not a function
```


**原生对象的原型：**

```
var box = [5,6,234,3,7,8,9];
alert(box.sort());
//查看sort是否是Array原型对象里的方法
alert(Array,prototype.sort); //function sort(){[native code]}

//内置引用类型的功能扩展
String.prototype.addString=function(){
	return this+" is  adding ...";
}
alert('Lee'.addString());//Lee is  adding ...
```


**原型模式创建对象的缺点：**
省略了构造函数传参初始化这一过程，其初始值都一致，它最大的缺点就是它最大的优点，即 **共享** 。
为解决其构造传参和共享的问题，可以组合**构造函数+原型模式**：

```javascript
function Box(name,age){	//不共享的  使用构造函数
	this.name=name;
	this.age=age;
	this.family=['Dad','Mon','Sister'];
}
Box.prototype = {
	constructor:Box,
	run:function(){
		return this.name+" "+this.age+" "+this.family+" running..."
	}
}
var box1=new Box('Lee',100);
var box2 = new Box('Jack',200);
alert(box1.run());//Lee 100 Dad,Mon,Sister running...
alert(box2.run());//Jack 200 Dad,Mon,Sister running...
```

原型模式：无论是否调用了原型的共享方法，它都会初始化原型的方法，并且在声明一个对象时，构造函数+原型 没有很好的封装。
---》动态原型模式





## **6.通过动态原型模式创建对象**

```javascript
function Box(name,age){	//不共享的  使用构造函数
	this.name=name;
	this.age=age;
	this.family=['Dad','Mon','Sister'];
	if(typeof this.run != "function"){//避免原型初始化多次
		Box.prototype.run = function(){
			return this.name+" "+this.age+" "+this.family+" running..."
		}
	}
}
var box1=new Box('Lee',100);
var box2 = new Box('Jack',200);

```
注意：不可再使用字面量的方式重写原型，会切断实例和新原型之间的联系


## **7.通过寄生构造函数模式创建对象**
寄生构造函数模式=工厂模式+构造函数模式

```
function Box(name,age){
	var obj = new Object();
	obj.name=name;
	obj.age=age;
	obj.run=function(){
		return this.name+" "+this.age+" running...";
	}
	return obj;
}
var box1 = new Box("Lee",32);
alert(box1.run());
```

## **8.通过稳妥构造函数模式创建对象**
稳妥构造函数模式类似寄生构造函数模式，它适合在一些安全环境中。（安全环境：禁止使用this和new  ,  this 指 禁止在构造函数中使用this， new 指不使用new操作符调用构造函数）

```javascript
function Box(name,age){
	var obj = new Object();
	obj.name=name;
	obj.age=age;
	obj.run=function(){
		return this.name+" "+this.age+" running...";
	}
	return obj;
}
var box1 = Box("Lee",32);
alert(box1.run());
```





# **继承**
ECMAScript只支持继承，不支持接口实现。
所有的对象都继承自Object
## **1.通过原型链实现**

```javascript
function Box(){		//被继承的函数称为超类型（父类，基类）
	this.name ='Lee';
}
function Desk(){	//继承的函数叫做子类型（子类，派生类）
	this.age=100;
}
function Table(){
	this.level = 'AAAAA';
}
//通过原型链继承:将超类型实例化后的对象实例赋值给子类型的原型属性
//new Box()会将Box构造函数里的信息和原型里的信息都交给Desk
//Dest的原型将得到Box的构造+原型里的信息
Desk.prototype = new Box();
Table.prototype = new Desk();

var desk = new Desk();
alert(desk.name);
var table = new Table ();
alert(table.name+" "+table.age);

//补充：执行流程同上
Box.prototype.name='Jack'; 
alert(desk.name);//Lee

//子类型从属于自己或者它的超类型
alert(desk instanceof Object);//true
alert(table instanceof Box);//true
alert(desk instanceof Table);//false
```

## **2.借用构造函数（对象冒充）：**
为了解决引用共享和超类无法传参的问题，可采用一种叫 借用构造函数的技术，或者称为对象冒充（伪造对象，经典继承）。

```javascript
//使用对象冒充继承
function Box(name,age){
	this.name=name;
	this.age=age;
}
Box.prototype.family='family';
function Desk(name,age){
	Box.call(this,name,age);//对象冒充
}
var desk = new Desk('Lee',100);
alert(desk.name);//Lee
alert(desk.family);//undefined  对象冒充只能继承构造里的信息
```


## **3.组合继承**
通过原型链+借用构造函数
解决传参+方法共享
```javascript
//对象冒充+原型链
function Box(age) {
	this.name = 'Lee';
	this.age = age;
}
Box.prototype.run = function(){
	return this.name + " " + this.age +  " running..."
};

function Desk(age) {
	Box.call(this, age); 	//对象冒充 ,第二次调用Box
}
Desk.prototype = new Box();		//原型链继承,第一次调用Box

var desk = new Desk( 100);
alert(desk.run());
```


## **4.原型式继承**
借助原型并基于已有对象来创建新对象，同时还不必因此创建自定义类型

```javascript
//临时中转函数
function obj(o) { //o为将要传入的对象
	function F() {} //F构造是一个临时新建对象，用于存储传递过来的对象
	F.prototype = o; //将o对象实例赋值给F构造的原型对象,其实相当于原型链继承
	return new F(); //返回得到传递过来对象的对象实例
	
}
//字面量方式创建对象
var box = {
	name: 'Lee',
	age: 100,
	family: ['Dad', 'Mom', 'Sister']
};
var box1 = obj(box);
alert(box1.family);//Dad.Mom,Sister
box1.family.push('Brother');
alert(box1.family);//Dad.Mom,Sister,Brother

var box2 = obj(box);
alert(box2.family);//Dad.Mom,Sister,Brother,实现了共享
```


## **5.寄生式继承：**

= 原型式+工厂模式
解决了组合继承两次调用构造函数的问题
```javascript
//临时中转函数
function obj(o) { 
	function F() {} 
	F.prototype = o; 
	return new F(); 
}
//寄生函数
function create(o){
	var f = obj(o);
	//可以对f进行扩展
	f.run = function(){
		return this.name+"方法";
	}
	return f;
}
var box = {
	name: 'Lee',
	age: 100,
	family: ['Dad', 'Mom', 'Sister']
};
var box1 = create(box);
alert(box1.name);
alert(box1.run());
```



## **6.寄生组合继承**
通过调用构造函数来继承属性，通过原型链混成形式继承方法，与组合继承不同之处在于子类型只继承了超类型原型的一个副本，并未继承其构造函数。因此只需要调用一次超类型构造函数。
```javascript
//临时中转函数
function obj(o) { 
	function F() {} 
	F.prototype = o; 
	return new F(); 
}
//寄生函数
function create(box,desk){
	var f = obj(box.prototype);
	f.construtor=desk;
	desk.prototype=f;
}
function Box(name,age){
	this.name=name;
	this.age=age;
}
Box.prototype.run=function(){
	return this.name + " " + this.age +  " running..."
}
function Desk(name,age){
	Box.call(this,name,age);
}
//通过寄生组合继承来实现
create(Box,Desk);//替代Desk.prototype=new Box();
var desk = new Desk('Lee',100);
alert(desk.run());


```



<br/><br/><br/><br/><br/><br/>