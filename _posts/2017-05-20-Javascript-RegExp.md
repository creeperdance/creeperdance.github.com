---
layout: post
title: Javascript正则表达式
date: 2017-05-20 01:05:13 +0800
categories:
  - javascript
---
说明：从开始学习用jekyll如何自己创建模板,搭建博客,到现在各种功能的逐步完善过程中,遇到问题不断,解决完后就都不了了之了,
今天使用rouge语法高亮时遇到几个问题，ok...记录一下解决问题的过程。

<br/><br/>

#正则表达式

##正则表达式用途
检测字符串的某个模式。（对数据进行有效性验证）
替换文本。
根据模式匹配从字符串中提取的一个子字符串。

##正则表达式对象
###创建正则表达式
**方式1 ：字面量写法（Perl写法）**
/pattern/attributes

```
var re = /abcd/g;
//alert(re.test("abcde"))   返回true
```

**方式2：RegExp构造函数**
```
var re = new RegExp();//没什么效果，需要将正则表达式的内容作为字符串传递进去。
re = new RegExp("abcd");//匹配字母a
re = new RegExp("a","i");
//alert(re.test("abcde"))   返回true
```
**正则表达式匹配模式支持下列3个标志：**
g(全文查找):
表示全局(global)模式，即模式将被应用于所有字符串，而非在发现第一个匹配项时立即停止
i（忽略大小写）:
表示不区分大小写(case-insensitive)模式，即在确定匹配项时忽略模式与字符串的大小写
m（多行查找）:
表示多行(multiline)模式，即在到达一行文本末尾时还会继续查找下一行中是否存在与模式匹配的项

### 和正则表达式相关的方法和属性
**支持正则表达式的String对象的方法：**
**1.search()方法:**
检测与正则表达式相匹配的值，或检测字符串中指定的子字符串
语法：StringObject.search(regexp);
参数：需要在StringObject中检索的字符串/需要检索的RegExp对象
返回值：StringObject中第一个与要检索字符串/regexp对象匹配的子串的起始位置，未找到返回-1

```
var str = "helloworld";
alert(str.search("wo"));//5
alert(str.search(/hello/g));  //0
alert(str.search(/world/g));  //5
```

**2.match()方法:**
找到一个或多个正则表达式的匹配
语法：StringObject.match(regexp)
参数：可以是需检索字符串的值/需匹配模式的regexp对象
返回值:存放匹配成功的数组; 它可以全局匹配模式，全局匹配的话，它返回的是一个数组。如果没有找到任何的一个匹配，那么它将返回的是null；返回的数组内有三个元素，第一个元素的存放的是匹配的文本，还有二个对象属性；index属性表明的是匹配文本的起始字符在stringObject中的位置；input属性声明的是对stringObject对象的引用；

```
var str = "hello world";
console.log(str.match("hello")); // ["hello", index: 0, input: "hello world"]
console.log(str.match("Hello")); // null
console.log(str.match(/hello/)); // ["hello", index: 0, input: "hello world"]
// 全局匹配
var str2="1 plus 2 equal 3"
console.log(str2.match(/\d+/g)); //["1", "2", "3"]
```



**3.split()方法:**
将字符串分割为字符串数组
语法：SstringObject.split(separator,howmany);
参数：
 1. separator[必填项]，字符串或正则表达式，该参数指定的地方分割stringObject; 
 2. howmany[可选] 该参数指定返回的数组的最大长度，如果设置了该参数，返回的子字符串不会多于这个参数指定的数组。否则不考虑其长度。
返回值： 一个字符串数组。该数组通过在separator指定的边界处将字符串stringObject分割成子字符串。


```
var str = "what are you doing?";
// 以" "分割字符串
alert(str.split(" "));
//  ["what", "are", "you", "doing?"]

// 指定返回数组的最大长度为3
alert(str.split("",3));
// 打印 ["w", "h", "a"]
```

**4.replace()方法:**
查找和替换与正则表达式匹配的子串
语法：StringObject.replace(regexp，replacement);
参数: 字符串/需要替换模式的RegExp对象，被替换的文本或者生成替换文本的函数。
返回值: 返回替换后的新字符串
加修饰符gi表示全局替换，否则只替换第一个匹配的字符串


```
var str = "hello world";
//替换字符串
var s1 = str.replace("hello","a");
alert(s1); //a world
// 正则替换字符串
var s2 = str.replace(/hello/,"b");
alert(s2); // b world
//正则全局替换
var s3 = str.replace(/l/g,'');
alert(s3);  //heo word
```
**支持正则表达式对象的方法：**

**•test()方法：**
用于检测一个字符串是否匹配某个模式；
语法：RegExpObject.test(str);
参数：需要检测的字符串；
返回值：如果字符串str中含有与RegExpObject匹配的文本的话，返回true，否则返回false；

```
var re = /abcd/g;
alert(re.test("abcde"));//true
re = new RegExp(/abcd/g);
alert(re.test("abcde"));//true
```
**•exec()方法:** 
用于检索字符串中的正则表达式的匹配:
语法：RegExpObject.exec(string)
参数：string【必填项】要检索的字符串。
返回值：返回一个数组，存放匹配的结果，如果未找到匹配，则返回值为null；

```
var str = "abc";
alert(/longen/.exec(str)); 
// ["a", index: 0, input: "abc"]
```

**支持正则表达式对象的属性：**
•source,返回正则表达式模式的文本的复本。只读。 
•lastIndex,返回字符位置，它是被查找字符串中下一次成功匹配的开始位置。 
•\$1...\$9,返回九个在模式匹配期间找到的、最近保存的部分。只读。 
•input (\$_),返回执行规范表述查找的字符串。只读。 
•lastMatch (\$\&),返回任何正则表达式搜索过程中的最后匹配的字符。只读。 
•lastParen (\$+),如果有的话，返回任何正则表达式查找过程中最后括的子匹配。只读。 
•leftContext (\$`),返回被查找的字符串中从字符串开始位置到最后匹配之前的位置之间的字符。只读。 
•rightContext (\$'),返回被搜索的字符串中从最后一个匹配位置开始到字符串结尾之间的字符。只读。 



```

var text = "you never tell back";
    var regx = /(.)e/g;

    if(regx.test(text)){
    	alert(RegExp.$1);//n
        alert(RegExp.input);//you never tell back
        alert(RegExp.$_);//you never tell back
        
        alert(RegExp.lastMatch);//ne
        alert(RegExp["$&"]);//ne
        
        alert(RegExp.lastParent);//undefined
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


##正则表达式语法
一个正则表达式是由普通字符（a-z）及特殊字符（元字符）组成的文字模式。
该模式描述在查找文字主体时匹配的一个或多个字符串。

**元字符**
| 元字符 | 描述| 
| ------------- |:-------------:| 
|\\   |转义字符，将一些具有特殊含义的字符转义为普通字符，需要转义的字符有:^ * + . [ ? \ { |
|.|查找任意的单个字符，除换行符,回车符，行分隔符（\u）外
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


**[]含义**
[abc]能匹配abc中任意一个字符
[^abc]能匹配除abc外任意一个字符
**（）含义**
在被修饰匹配次数时，括号中的表达式可以作为整体修饰。
实例如下：

```
	alert(/1+1/.test('1+1')); //false
	alert(/1\+1/.test('1+1')); //true +需要转义
	alert(/\x/.test('x')); //true,‘\’加任意其他字符，默认情况即该字符，即反斜杠被忽略

	alert(/[0-9][^0-9]/.test('1e')); //true
	alert(/[0-9][^0-9]/.test('q2')); //false

	alert(/./.test('\r')); //false
	alert(/[\s\S]/.test('\r')); //true
```


**字符类**
简单类，反向类，范围类，组合类，预定义类

```
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

**贪婪模式与惰性模式**
贪婪与惰性模式的区别是：被量词修饰的子表达式的匹配行为；贪婪模式在整个表达式匹配成功的情况下尽可能多的匹配；惰性模式在整个表达式匹配成功的前提下，尽可能少的匹配；
**常见贪婪模式的量词：**
+      ?      *　    {n}      {n,}      {n,m}

**常见惰性模式的量词：**（贪婪模式量词后加？）
+?      ??      *?　    {n}?      {n,}?      {n,m}?

```
var str = "abc";  
var re = /\w+/;//贪婪模式    将匹配abc  
re = /\w+?/;//惰性模式    将匹配a  
```
**多行模式** 

```
var re = /[a-z]$/;  
var str = "ab\ncdef";  
alert(str.replace(re,"#"));//ab\ncde#  
re =/[a-z]$/m;  
alert(str.replace(re,"#"));//a#\ncde#  
```

**分组与非捕获性分组** 

```
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

```
re = /^a|bc$/;//将匹配开始位置的a或结束位置的bc  
str ="add";  
alert(re.test(str));//true  
re = /^(a|bc)$/;//将匹配a或bc  
str ="bc";  
alert(re.test(str));//true  
```


当包含分组的正则表达式进行过test,match,search这些方法之后，每个分组都被放在一个特殊的地方以备将来使用，这些存储是分组中的特殊值，我们称之为**反向引用** 

```
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

  


使用反向引用可以要求字符串中某几个位置上的字符必须相同.另外，在replace这类方法中可用特殊字符序列来表示反向引用 

```
re = /(\d)\s(\d)/;  
str = "1234 5678";  
alert(str.replace(re,"221"));//在这个里面1表示第一个分组1234,1表示第一个分组1234,2则表示5678  
```


其它——〉**正向前瞻**,用来捕获出现在特定字符之前的字符,只有当字符后面跟着某个特定字符才去捕获它。与正向前瞻对应的有**负向前瞻**，它用匹配只有当字符后面不跟着某个特定字符时才去匹配它。在执行前瞻和负向前瞻之类的运算时，正则表达式引擎会留意字符串后面的部分，然而却不移动index 


```
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

**实例**
构建一个验证电子邮箱地址有效性的正则表达式。电子邮箱地址有效性要求(我们姑且这样定义)：用户名只能包含字母数字以及下划线，最少一位，最多25位，用户名后面紧跟@，后面是域名，域名名称要求只能包含字母数字和减号（-），并且不能以减号开头或结尾，然后后面是域名后缀（可以有多个），域名后缀必须是点号连上2-4位英文字母 

```
var re = /^\w{1,15}(?:@(?!-))(?:(?:[a-z0-9-]*)(?:[a-z0-9](?!-))(?:\.(?!-)))+[a-z]{2,4}$/;  
```
