---
layout: post
title: JavaScript正则表达式
date: 2017-05-20 01:05:13 +0800
categories:
  - javascript
---
说明：正则表达式：用途、JavaScript中的RegExp类型、字符串的模式匹配方法、元字符、贪婪模式与惰性模式、多行模式、分组与非捕获性分组。。。

<br/><br/>

- 目录
{:toc #markdown-toc}

# **正则表达式用途**
- 检测字符串的某个模式。（对数据进行有效性验证）
- 替换文本。
- 根据模式匹配从字符串中提取的一个子字符串。

<br/>
<br/>
# **正则表达式对象**
<br/><br/>

## **创建正则表达式**
- **字面量写法（Perl写法）**<br/>
**语法：/pattern/attributes**
<br/>
```javascript
var re = /abcd/g;
alert(re.test("abcde"));   //true
```
-  **RegExp构造函数**
```javascript
var re = new RegExp();//没什么效果，需要将正则表达式的内容作为字符串传递进去。
re = new RegExp("abcd");//匹配字母a
re = new RegExp("a","i");
alert(re.test("abcde"));   //true
```

同其他语言中的正则表达式，模式中使用的**元字符**都必须转义。<br/>
正则表达式中的元字符有：<br/>
( [ { \ ^ $ | ) ? * + . ] } <br/>
若想匹配字符中包含这些字符，必须进行转义。<br/>
**两种方式的转义区别：**
由于RepExp构造函数的模式参数是字符串，所以在某些情况下要对字符进行**双重转义**。<br/>
```javascript
//匹配第一个"bat"或"cat",不区分大小写。
var pattern1 = /[bc]at/i;
//匹配第一个"[bc]at",不区分大小写
var pattern2 = /\[bc\]at/i;
```

<br/><br/>
## **正则表达式匹配模式支持的3个标志**
- **g**(全文查找):<br/>
表示全局(global)模式，即模式将被应用于所有字符串，而非在发现第一个匹配项时立即停止
- **i**（忽略大小写）:<br/>
表示不区分大小写(case-insensitive)模式，即在确定匹配项时忽略模式与字符串的大小写
- **m**（多行查找）:
表示多行(multiline)模式，即在到达一行文本末尾时还会继续查找下一行中是否存在与模式匹配的项


<br/><br/>
## **RegExp实例方法**<br/>
- ### **test()方法**<br/>
用于检测一个字符串是否匹配某个模式；<br/>
**语法：**RegExpObject.test(str);<br/>
**参数：**需要检测的字符串；<br/>
**返回值：**如果字符串str中含有与RegExpObject匹配的文本的话，返回true，否则返回false；<br/>
```javascript
var re = /abcd/g;
alert(re.test("abcde"));//true
re = new RegExp(/abcd/g);
alert(re.test("abcde"));//true
```
- ### **exec()方法** <br/>
用于检索字符串中的正则表达式的匹配:<br/>
**专门为捕获组而设计的**<br/>
**语法：**RegExpObject.exec(string)<br/>
**参数：**string【必填项】要检索的字符串。<br/>
**返回值：**<br/>返回一个数组，存放匹配的结果，如果未找到匹配，则返回值为null。
	+ **数组:**第一项为与整个模式相匹配的字符串，其它是与模式中的捕获组匹配的字符串。<br/>
	+ **index:**匹配项在字符串中的位置。<br/>
	+ **input：**应用正则表达式的字符串。<br/>
```javascript
var text = "mom and dad and baby";
var pattern = /mom( and dad( and baby)?)?)/gi;
var matches = pattern.exec(text);
alert(matches.index);    //0
alert(matches.input);    //"mom and dad and baby"
alert(matches[0]);    //"mon and dad and baby"
alert(matches[1]);    //" and dad and baby"
alert(matches[2]);    //" and baby"
```
<br/>
**如果设置了全局标志(g)**,每次也只返回1个匹配项。但若**在同一个字符串上多次调用exec()**,是否设置全局标志的表现则不同。<br/>
设置了全局标志后，每次调用exec()会在字符串中继续查找新匹配项，而不设置则始终返回第一个匹配项信息。<br/>
代码如下:<br/>
```javascript
var text = "cat,bat,sat,fat";
var pattern1 = /.at/;
var matches = patten1.exec(text);
alert(matches.index);    //0
alert(matches[0]);    //cat
alert(pattern1.lastIndex);    //0
matches = pattern1.exec(text);
alert(matches.index);    //0
alert(matches[0]);    //cat
alert(pattern1.lastIndex);    //0
var pattern2 = /.at/g;
matches = pattern2.exec(text);
alert(matches.index);    //0
alert(matches[0]);    //cat
alert(pattern2.lastIndex);    //3
matches = pattern2.exec(text);
alert(matches.index);    //5
alert(matches[0]);    //bat
alert(pattern2.lastIndex);    //8
```

<br/><br/>
## **RegExp的属性**
<br/><br/>
### **实例属性**
•**global:**布尔值，返回是否设置了g标志。 <br/>
•**ignoreCase:**布尔值，返回是否设置了i标志。 <br/>
•**multiline:**布尔值，返回是否设置了m标志。 <br/>
•**lastIndex:**整数，返回被查找字符串中下一次成功匹配的开始位置。 <br/>
•**source:**返回正则表达式模式的文本的复本,只读。 <br/>
```javascript
/*匹配第一个"[bc]at*/
var pattern = /\[bc\]at/i;
alert(pattern.global);    //false
alert(pattern.ignoreCase);    //true
alert(pattern.multiline);    //true
alert(pattern.lastIndex);    //0
alert(pattern.source);    //"\[bc\]at"

var pattern2 = new RegExp("\\[bc\\]at",i);
alert(pattern2.source);    //"\[bc\]at"
```
**source属性保存的是规范形式的字符串，即字面量形式所用的字符串**

<br/><br/>

### **构造函数属性**
RegExp构造函数包含一些属性(在其他语言中被看成是**静态属性**),这些属性**适用与作用域中所有属性**,基于所执行的最后一次正则表达式操作而变化。<br/>
**可以通过长属性名或短属性名两种方式访问**。<br/>
•**\$1...\$9:**返回九个在模式匹配期间找到的、最近保存的部分,只读。 <br/>
•**input(\$_):**返回字符串最后一次执行的字符串,只读。 <br/>
•**lastMatch(\$&):**,返回最后一次的匹配项,只读。 <br/>
•**lastParen(\$+)：**如果有的话，返回最近一次的捕获组,只读。 <br/>
•**multiline(\$*)：**如果有的话，返回最近一次的捕获组,只读。 <br/>
•**leftContext(\$`)：**返回布尔值，是否所有表达式都用多行模式。 <br/>
•**rightContext(\$')：**返回input字符串中lastMatch之后的文本,只读。<br/>
```javascript
var text = "you never tell back";
var regx = /(.)e/g;
if(regx.test(text)){
	alert(RegExp.$1);//n
	alert(RegExp.input);//you never tell back
	alert(RegExp.$_);//you never tell back
	alert(RegExp.lastMatch);//ne
	alert(RegExp["$&"]);//ne
	alert(RegExp.lastParen);//n
	alert(RegExp["$+"]);//n
	alert(RegExp.leftContext);//you
	alert(RegExp["$`"]);//you
	alert(RegExp.rightContext);//ver tell back
	alert(RegExp["$'"]);//ver tell back
	alert(RegExp.multiline);//false  
	alert(RegExp["$*"]);//false
}else {
	alert("flase");
}
```


<br/><br/>
# **和正则表达式相关的方法和属性**
**支持正则表达式的String对象的方法：**
## **search()**
<br/>
检测与正则表达式相匹配的值，或检测字符串中指定的子字符串。<br/>
**语法：**StringObject.search(regexp);<br/>
**参数：**需要在字符串(StringObject)中检索的字符串/需要检索的RegExp对象。<br/>
**返回值：返回字符串中第一个匹配项的索引**，未找到返回-1。<br/>
```javascript
var str = "helloworld";
alert(str.search("wo"));//5
alert(str.search(/hello/g));  //0
alert(str.search(/world/g));  //5
```
<br/><br/>
## **match()**
<br/>
找到一个或多个正则表达式的匹配,**本质上与RegExp的exec()方法相同**。<br/>
**语法：**StringObject.match(regexp)。<br/>
**参数：**可以是**需检索字符串的值**/需匹配模式的**RegExp对象**。(**只接受一个参数**)<br/>
**返回值:**存放匹配成功的数组。<br/>
	+ **数组:**第一项为与整个模式相匹配的字符串，其它是与模式中的捕获组匹配的字符串。<br/>
	+ **index:**匹配项在字符串中的位置。<br/>
	+ **input：**应用正则表达式的字符串。<br/>
<br/>
```javascript
var text = "cat,bat,sat,fat";
var pattern = /.at/;
var matches = text.match(pattern);
alert(matches.index);    //0
alert(matches.input);    //"cat,bat,sat,fat"
alert(matches[0]);    //'cat'
```
<br/><br/>
## **split()**
<br/>
**基于指定分隔符将字符串分割为字符串数组。**<br/>
**语法：<br/>**
**StringObject.split(separator,
howmany);**<br/>
**参数：**<br/>
---
separator[必填项]，字符串或正则表达式，该参数指定的地方分割stringObject;<br/>
howmany[可选] 该参数指定返回的数组的最大长度，如果设置了该参数，返回的子字符串不会多于这个参数指定的数组。否则不考虑其长度。<br/>
**返回值：** 一个字符串数组。该数组通过在separator指定的边界处将字符串stringObject分割成子字符串。<br/>
```javascript
var str = "what are you doing?";
// 以" "分割字符串
alert(str.split(" "));
//  ["what", "are", "you", "doing?"]
// 指定返回数组的最大长度为3
alert(str.split("",3));
// 打印 ["w", "h", "a"]
```
<br/><br/>
## **replace()**
<br/>
**查找和替换与正则表达式匹配的子串。**<br/>
**语法**StringObject.replace(regexp，replacement);<br/>
**参数:**<br/>
• 字符串/需要替换模式的RegExp对象。<br/>
• 替换的文本/生成替换文本的函数。<br/>	
**返回值:**返回替换后的新字符串<br/>
**注意：如果传入的参数为字符串，那么只会替换第一个子字符串，要想替换所有子字符串，必须提供一个正则表达式，
且要加修饰符g表示全局替换，否则只替换第一个匹配的字符串。**<br/>
```javascript
var text = "cat,bat,sat,fat";
var result = text.replace("at","ond");
alert(result);	  //"cond,bat,sat,fat"
result = text.replace(/at/g,"cond");
alert(result);    //"cond,bond,sond,fond"
```
**如果第二个参数是字符串，还可以使用一些特殊字符序列，将正则表达式操作得到的值插入到结果字符中。**<br/>
这些特殊的字符序列可以是：<br/>
$$(会替换成$)<br/>
$&(与RepExp.lastMatch值相同),$‘(与RepExp.leftMatch值相同),$'(与RepExp.righttMatch值相同)<br/>
$n(n为0-9,匹配第n个捕获组的子字符串),$nn(nn为01-99,匹配第nn个捕获组的子字符串).<br/>
```javascript
var text = "cat,bat,sat,fat";
var result = text.replace(/(.at)/g,"word($1)");
alert(result);    //word(cat),word(bat),word(sat),word(fat)
```
<br/><br/><br/>
# **正则表达式语法**<br/>
一个正则表达式是由普通字符（a-z）及特殊字符（元字符）组成的文字模式。<br/>
该模式描述在查找文字主体时匹配的一个或多个字符串。<br/>
<br/>


<br/><br/>
## **元字符**

|         元字符    |    描述    | 
| ------------- |:-------------:| 
|\\   |转义字符，将一些具有特殊含义的字符转义为普通字符，需要转义的字符有:( [ { \ ^ $ \| ) ? * + . ] } 
| . |查找任意的单个字符，除换行符,回车符，行分隔符（\u）外
|^|匹配输入字符串的开始位置
|$|匹配输入字符串的结束位置    
|*|匹配前面的子表达式零次或多次，等价{0,}
|+|匹配前面的子表达式一次或多次，等价{1,}
|?|匹配前面的子表达式零次或多次，等价{0,}
|{n}|匹配确定的n次
|{n,}|匹配至少n次
|{n,m}|至少匹配n次,之多匹配m次
|\||左右两边表达式之“或”的关系，匹配左边或右边
|\w|任意一个字母或数字或下划线，A_Za_Z0_9,_中任意一个
|\W|查找非单词的字符，等价于[^A_Za_z0_9_]
|\d|匹配一个数字字符，等价于[0-9]
|\D|匹配一个非数字字符，等价于[^0-9]
|\s|匹配任何空白字符，包括空格，制表符，换行符等等。等价于[\f\n\r\t\v]
|\S|匹配任何非空白字符，等价于[^\f\n\r\t\v]
|\b|匹配一个单词边界，也就是指单词和空格间的位置，比如’er\b’可以匹配”never”中的”er”,但是不能匹配”verb”中的”er”
|\B|匹配非单词边界,’er\B’能匹配’verb’中的’er’,但不能匹配’never’中的’er’
|\0|查找NUL字符。
|\n|匹配一个换行符
|\f|匹配一个换页符
|\r|匹配一个回车符
|\t|匹配一个制表符
|\v|匹配一个垂直制表符
|\cX |这儿，X是一个控制符，/\cM/匹配Ctrl-M 
|\xxx|查找一个以八进制数xxx规定的字符
|\xdd|查找以16进制数dd规定的字符
|\uxxxx|查找以16进制数的xxxx规定的Unicode字符。

<br/>
## **[]含义**
[abc]能匹配abc中任意一个字符<br/>
[^abc]能匹配除abc外任意一个字符<br/>
## **()含义**
在被修饰匹配次数时，括号中的表达式可以作为整体修饰。<br/>
实例如下：<br/>
```javascript
	alert(/1+1/.test('1+1')); //false
	alert(/1\+1/.test('1+1')); //true +需要转义
	alert(/\x/.test('x')); //true,‘\’加任意其他字符，默认情况即该字符，即反斜杠被忽略

	alert(/[0-9][^0-9]/.test('1e')); //true
	alert(/[0-9][^0-9]/.test('q2')); //false

	alert(/./.test('\r')); //false
	alert(/[\s\S]/.test('\r')); //true
```


## **字符类**
简单类，反向类，范围类，组合类，预定义类<br/>

```javascript
//简单类  
var re = /[abc123]/;//将匹配abc123这6个字符中一个  
//负向类  
re = /[^abc]/;//将匹配除abc之外的一个字符  
//范围类  
re = /[a-b]/;//将匹配小写a-b 26个字母  
re = /[^0-9]/;//将匹配除0-9 10个字符之处的一个字符  
//组合类  
re = /[a-b0-9A-Z_]/;//将匹配字母，数字和下划线  
//预定义类：. \d \D \s \S \w \W
re = [^\n\r\t\f\x0-9]
```

## **贪婪模式与惰性模式**
贪婪与惰性模式的区别是：被量词修饰的子表达式的匹配行为；贪婪模式在整个表达式匹配成功的情况下尽可能多的匹配；惰性模式在整个表达式匹配成功的前提下，尽可能少的匹配；<br/>
**常见贪婪模式的量词**<br/>+      ?      *　    {n}      {n,}      {n,m}<br/>

**常见惰性模式的量词：**（贪婪模式量词后加？）<br/>
+?      ??      *?　    {n}?      {n,}?      {n,m}?<br/>
<br/>
```javascript
var str = "abc";  
var re = /\w+/;//贪婪模式    将匹配abc  
re = /\w+?/;//惰性模式    将匹配a  
```
## **多行模式** 

```javascript
var re = /[a-z]$/;  
var str = "ab\ncdef";  
alert(str.replace(re,"#"));//ab\ncde#  
re =/[a-z]$/m;  
alert(str.replace(re,"#"));//a#\ncde#  
```

## **分组与非捕获性分组** 

```javascript
re = /abc{2}/;//将匹配abcc  
re = /(abc){2}/;//将匹配abcabc  
//上面的分组都是捕获性分组  
str = "abcabc ###";  
arr = re.exec(str);  
alert(arr[1]);//abc  
//非捕获性分组 (?:)  
re = /(?:abc){2}/;  
arr = re.exec(str);  
alert(arr[1]);//undefined  
```

**候选（也就是所说的“或”）** 

```javascript
re = /^a|bc$/;//将匹配开始位置的a或结束位置的bc  
str ="add";  
alert(re.test(str));//true  
re = /^(a|bc)$/;//将匹配a或bc  
str ="bc";  
alert(re.test(str));//true  
```


当包含分组的正则表达式进行过test,match,search这些方法之后，每个分组都被放在一个特殊的地方以备将来使用，这些存储是分组中的特殊值，我们称之为**反向引用** <br/>

```javascript
var re = /(A?(B?(C?)))/;  
/*上面的正则表达式将依次产生三个分组 
(A?(B?(C?))) 最外面的 
(B?(C?)) 
(C?)*/  
str = "ABC";  
re.test(str);//反向引用被存储在RegExp对象的静态属性1—1—9中  
alert(RegExp.$1+"\n"+RegExp.$2+"\n"+RegExp.$3);  //ABC BC C
//反向引用也可以在正则表达式中使用\1 ,\2...这类的形式使用  
re = /\d+(\D)\d+\1\d+/;  
str = "2008-1-1";  
alert(re.test(str));//true  
str = "2008-4_3";  
alert(re.test(str));//false
```

  


使用反向引用可以要求字符串中某几个位置上的字符必须相同.另外，在replace这类方法中可用特殊字符序列来表示反向引用 <br/>

```javascript
re = /(\d)\s(\d)/;  
str = "1234 5678";  
alert(str.replace(re,"221"));//在这个里面1表示第一个分组1234,1表示第一个分组1234,2则表示5678  
```


其它——〉<br/>
## **正向前瞻** <br/>
用来捕获出现在特定字符之前的字符,只有当字符后面跟着某个特定字符才去捕获它。与正向前瞻对应的有**负向前瞻**，它用匹配只有当字符后面不跟着某个特定字符时才去匹配它。在执行前瞻和负向前瞻之类的运算时，正则表达式引擎会留意字符串后面的部分，然而却不移动index <br/>


```javascript
//正向前瞻  
re = /([a-z]+(?=\d))/i;  
//我们要匹配后面跟一个数字的单词，然后将单词返回，而不要返回数字  
str = "abc every1 abc";  
alert(re.test(str));//true  
alert(RegExp.$1);//every  
alert(re.lastIndex);//使用前瞻的好处是,前瞻的内容(?=\d)并不会当成一次匹配，下次匹配仍从它开始  
//负向前瞻(?!)  
re = /([a-z](?!\d))/;i  
//将匹配后面不包含数字的字母,并且不会返回(?!\d)中的内容  
str = "abc1 one";  
alert(re.test(str));  
alert(RegExp.$1);//one  
```

## **实例**
构建一个验证电子邮箱地址有效性的正则表达式。电子邮箱地址有效性要求(我们姑且这样定义)：用户名只能包含字母数字以及下划线，最少一位，最多25位，用户名后面紧跟@，后面是域名，域名名称要求只能包含字母数字和减号（-），并且不能以减号开头或结尾，然后后面是域名后缀（可以有多个），域名后缀必须是点号连上2-4位英文字母 <br/>

```javascript
var re = /^\w{1,15}(?:@(?!-))(?:(?:[a-z0-9-]*)(?:[a-z0-9](?!-))(?:\.(?!-)))+[a-z]{2,4}$/;  
```

<br/><br/><br/><br/><br/><br/>