---
layout: post
title:  JavaScript中的方法开关
date: 2017-10-31 11:05:13 +0800
categories:
  - css3
---

说明：偶然发现一个JavaScript区别于其他语言的一个很好用的特性...

<br/><br/>

- 目录
{:toc #markdown-toc}


## 背景介绍
JavaScript的对象实例允许定义属于自己的属性和方法，而Java、C++中的对象...不存在的。甩个简单的例子，在JavaScript中可以如是操作：
```javascript
function Person(name,age) {
	this.name = name;
	this.age = age;
}
var person1 = new Person('Kitty',34);
var person2 = new Person('Jane',22);
//注意：person1这个对象允许添加属于它自己的属性和方法
person1.score = 99;
person1.getScore = function() {
	console.log(this.score)
};
console.log(person1.score,person2.score);//99,undefined
console.log(person1.getScore(),person2.getScore());//99,报错：person2.getScore is not a function
```
如上例，在JavaScript中，person1这个对象实例还可以添加属于它的属性和方法。而在Java，C++中，这种操作...不存在的。
<br/>
那么问题来了，JavaScript的这个特性有什么用呢？


## 方法开关？
如果你认真推敲的话，其实可以发现**Java/C++和JavaScript语言中存在的这样一个差异**：<br/>
**Java/C++:** 创建一个类，为这一类对象定义它们共有的所有属性和方法，不允许某个对象实例另行定义属性和方法（不考虑继承等）.<br/>
**JavaScript：** 创建一个类，为这一类对象定义它们共有的所有属性和方法，允许某个对象实例另行定义属性和方法.<br/><br/>
那么JavaScript的特性有什么用呢？=》**为某个对象实例定义一个方法开关。**<br/>
由于JavaScript中对象实例可以自行添加属性和方法，那么当场景如下时，它就是一个非常有用的开关了。<br/>
场景：<br/>
1.我定义了一个Parent类，并定义了一个方法A，该方法在符合某规则R时被调用（即一定要有该方法）<br/>
2.我定义一个Children类，重写了方法A<br/>
3.我定义了Children类的对象实例children1，children2<br/>
4.某规则R符合，调用children1,children2的A方法（即children重写的A方法），但children1，children2执行的操作不同<br/>
由1+2+3+4提取出"方法开关"的概念：定义一个方法，当需要的时候再调用该方法。<br/>


## 实际应用
贴代码如下（删减版）：<br/>

```javascript
function Modal() {
}
//符合某规则时被调用（此处为关闭Modal时调用hide方法）
Modal.prototype.hide = function () {
};
function keyModal() {
}
keyModal.prototype = new Modal();
KeyModal.prototype.hide = function () {
	//【注意此处，在需要时调用】
    this.onHide();
};

function KeyPressModal() {
    this.modal = new KeyModal({});
	//【注意此处，为开关】
    this.modal.onHide = function() {
		//【注意此处，对该对象实例特有的操作】
	}
};
```
认真推敲一下的话，这段代码到底是解决什么的呢？<br/>
首先，我定义了一个类（KeyModal），该类中重写了父类Modal的hide方法。<br/>
然后呢...也就是关键部分，在KeyModal重写的hide方法中我需要根据不同的对象实例执行不同的操作，而具体的操作只能在创建出具体的对象实例之后才可执行。那么这时我就可以在创建对象实例之时定义一个方法开关（onHide）,在KeyModal重写的hide方法中调用该方法。

