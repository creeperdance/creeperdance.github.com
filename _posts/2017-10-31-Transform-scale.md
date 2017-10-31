---
layout: post
title:  解决使用transform后导致的字体模糊问题。
date: 2017-10-31 11:05:13 +0800
categories:
  - css3
---

说明：如何解决使用transform值函数(如translate3d(), scale(), rotate()等)后，字体模糊/抖动？

<br/><br/>

- 目录
{:toc #markdown-toc}


## 问题背景
<br/>
之前在写模态框组件时遇到一个问题（之前？好吧...因为很久没更博文了，此处蹲墙角三秒中...）：当加了缩放动画(transform:scale(1.185) )的模态框弹出时，模态框内的文字显示效果十分怪异，抖动/模糊，那么如何解决呢？
## 解决方法

<br/>
```javascript
transform:perspective(1px) scale(1.185) ;
```
<br/>
<br/>
**参考自CSS-TRACKS：**
<br/>
<a href="https://css-tricks.com/forums/topic/transforms-cause-font-smoothing-weirdness-in-webkit/">https://css-tricks.com/forums/topic/transforms-cause-font-smoothing-weirdness-in-webkit/</a>


<br/><br/><br/><br/><br/><br/>