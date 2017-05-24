---
layout: post
title: jekyll - 侧边栏目录的滚动效果
date: 2017-05-23 01:04:13 +0800
categories:
  - jekyll
---
说明：发现自己写的有关javascript的学习总结的博文，内容都相当长,没有目录实在不便。
然后看到人家的博客有侧边栏文章目录，可跟随滚动条移动定位，心水已久，索性自己也来写一个。

<br/><br/>

- 目录
{:toc #markdown-toc}
# **侧边栏目录的滚动效果**
达到的效果见->本博客的右侧的侧边栏目录。<br/>
滚动时，会自动跟随，移动定位，高亮显示。
<br/>
## **步骤一：生成文章目录**
<br/><br/>
1. **首先，到底是通过什么实现生成文章目录的呢？**<br/>
Markdown 渲染器 kramdown提供了一个插件：jekyll-toc-generator，所以我们在配置文件中确保使用的是kramdown即可。<br/>
即在_config.yml文件中添加以下代码：<br/><br/>
```
markdown:kramdown
```
<br/><br/>
2. **如何在文章中标识toc生成位置：**<br/>
在文章中任意处(一般在开头),添加如下两行。</br>
```
* 目录   //必须，*号后面的内容随意。
{:toc #markdown-toc}	//生成的目录列表id="markdown-toc",也可改为其他。
```
添加完上述代码后，你会发现，在你添加的位置处，已经有目录了。可见下图：<br/><br/><br/>
<img class ="img-responsive center-block" src="{{site.url}}/img/toc.png" alt="markdown-toc"  />
<br/><br/>
当然，今天的目标不是这样的目录。若想达到预期效果该怎么做呢？<br/>
<br/>
3. **如何在侧边栏显示目录：**<br/>
我们现在已经可以通过id="markdown-toc"来获取生成的目录列表了，那接下来就可以直接显示在侧边栏中了。<br/>
代码如下:(注释部分带解释)<br/>
```javascript
/*可通过下列语句判断是否生成了目录(有的文章内容短无目录)*/
if (typeof $('#markdown-toc').html() === 'undefined') {
	//...	
}else {
	/*将其显示在侧边栏*/
	$('.sidebar_catelog').html('<ul class="list_catelog">' + $('#markdown-toc').html() + '</ul>');
}
```
<br/><br/>


<br/>
## **步骤二：添加滚动定位效果**
<br/><br/>
1. **获取文章内容的锚点集合**<br/>
首先，先解释一下，通过步骤一，我们只是在侧边栏显示了文章目录列表，我们仅有的是当前文章目录的列表集合(仅供显示)，那么当页面滚动时，我们想达到有效的定位并高亮显示，
暂时还是无法实现的。为什么呢？当页面滚动时，随之滚动的是文章内容，而侧边栏的文章目录列表固定，那我们只能根据**文章内容中的锚点集合**的滚动来判断当前页面显示的是哪个锚点元素，从而实现对应的高亮效果。<br/>
也就是要获取什么呢，我们编写的.md文件转为.html文件后的锚点集合。<br/>
**怎么获取？**
我们知道，_site目录下会自动根据_posts目录下的.md文件(即我们编写的博文)生成对应的.html文件，并最终显示在页面。<br/>
打开后，我们会发现:<br/>
<br/><br/>
>|         .md文件   |    .html文件    | 
| ------------- |:-------------:| 
|# 一级标题	  |&nbsp;&nbsp;&nbsp; <h1 id="一级标题">一级标题</h1>|
|# 二级标题	  |&nbsp; &nbsp;&nbsp;<h2 id="二级标题">二级标题</h2>|
|# 三级标题	  |&nbsp;&nbsp;&nbsp; <h3 id="三级标题">三级标题</h3>|
|...|...|
>
<br/><br/>
由此可见，我们只需要获取h1~h6的标题集合即可。



2. **实现滚动定位效果**<br/>
上面解释了为什么需要获取文章内容的锚点集合。<br/>
那么获取后如何实现呢?<br/>
**当滚动屏幕时，根据滚动条据顶部的距离，得到该锚点集合中的据顶部有同距离的锚点，再实现与之对应的侧边栏目录列表项的高亮效果。**<br/>
首先：必不可少的**scroll事件**<br/>
其次：<br/>
**滚动条到顶部的距离**  -->  **$(window).scrollTop()** <br/>
**锚点集合中的元素分别到顶点的距离**  -->  **$('锚点集合中的元素').offset().top** <br/>
最终代码如下：
```javascript
function locateCatelogList(){
	/*获取文章目录集合,可通过：header过滤器*/
	var alis = $('.article :header');
	/*获取侧边栏目录列表集合**/
	var sidebar_alis = $('.sidebar_catelog').find('a');
	/*获取滚动条到顶部的距离*/
	var scroll_height = $(window).scrollTop();
	for(var i =0;i<alis.length;i++){
		/*获取锚点集合中的元素分别到顶点的距离*/
		var a_height = $(alis[i]).offset().top;
		if (a_height<scroll_height){
			/*高亮显示*/
			sidebar_alis.removeClass('list_click');
			$(sidebar_alis[i]).addClass('list_click');
		}
	}
}
$(function() {
	/*绑定滚动事件 */ 
	$(window).bind('scroll',locateCatelogList); 
});
```








<br/><br/><br/><br/>


