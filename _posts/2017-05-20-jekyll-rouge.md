---
layout: post
title: rouge语法高亮 — 错误及解决方案
date: 2017-05-19 01:05:13 +0800
categories:
  - jekyll
---
说明：从开始学习用jekyll如何自己创建模板,搭建博客,到现在各种功能的逐步完善过程中,遇到问题不断,解决完后就都不了了之了,
今天使用rouge语法高亮时遇到几个问题，ok...记录一下解决问题的过程。
<br/><br/><br/><br/>

<br/><br/>

### **使用rouge语法高亮**<br/><br/><br/>


#### **1.安装rouge**<br/><br/>
使用gem安装rouge、kramdown<br/><br/>
```	
	gem install kramdown
	gem install rouge
```	
<br/><br/>
#### **2.配置_config.yml文件**<br/><br/>
在_config.yml文件中添加如下代码：<br/>
```	
	highlighter: rouge
	markdown: kramdown
```	
<br/><br/>
#### **3.生成rouge css**<br/><br/>
安装rouge 后，就可以用附带的 rougify 工具来生成多种高亮主题的CSS文件，个人比较喜欢monokai.sublime 主题.<br/>
```	
	rougify style monokai.sublime > rouge_monokai.css
```	
<br/>
ok...问题来了...报错如下：<br/><br/>
"unsupported signal SIGPIPE (ArgumentError)"<br/><br/><br/>
<img class ="img-responsive center-block" src="{{site.url}}/img/4.png" alt="rouge_error"  />

<br/><br/>
那么具体的解决过程如下：<br/>
首先打开报错文件(C:\Ruby200-x64\lib\ruby\gems\2.0.0\gems\rouge-2.0.7\bin\rougify)<br/>
文件内容如下：<br/><br/>
```	
#!/usr/bin/env ruby

require 'pathname'
ROOT_DIR = Pathname.new(__FILE__).dirname.parent
load ROOT_DIR.join('lib/rouge.rb')
load ROOT_DIR.join('lib/rouge/cli.rb')
Signal.trap('SIGPIPE', 'SYSTEM_DEFAULT')


begin
  Rouge::CLI.parse(ARGV).run
rescue Rouge::CLI::Error => e
  puts e.message
  exit e.status
rescue Interrupt
  $stderr.puts "\nrouge: interrupted"
  exit 2
end
```	
<br/><br/>
ok...修改文件内容,得到如下结果：
<br/><br/>
```	
#!/usr/bin/env ruby

require 'pathname'
ROOT_DIR = Pathname.new(__FILE__).dirname.parent
load ROOT_DIR.join('lib/rouge.rb')
load ROOT_DIR.join('lib/rouge/cli.rb')
#Signal.trap('SIGPIPE', 'SYSTEM_DEFAULT')
if Signal.list.include? 'PIPE'
Signal.trap('SIGPIPE', 'SYSTEM_DEFAULT')
end

begin
  Rouge::CLI.parse(ARGV).run
rescue Rouge::CLI::Error => e
  puts e.message
  exit e.status
rescue Interrupt
  $stderr.puts "\nrouge: interrupted"
  exit 2
end

```	

<br/><br/>
检验解决方案是否有效,重试上述rougify...很好...问题解决!在当前路径生成rouge_monikai.css文件<br/>
```	
	rougify style monokai.sublime > rouge_monokai.css
```	
<br/><br/>
#### **4.使用rouge**<br/><br/>
将上述生成的rouge_monokai.css文件拷到css目录下,在HTML代码的<head>标签内加载之...<br/>
```	
	<link rel="stylesheet" href="{{ site.url}}/css/rouge_monikai.css" type="text/css">
```

<br/><br/>
#### **5.修改rouge**<br/><br/>
well...满心欢喜,jekyll serve后查看结果...sadly~~显示效果为：浅色背景+浅色字体！！？
解决方案如下：
在上述rouge_monikai.css中添加如下代码：<br/>
```	
pre[class='highlight'] {background-color:#000000;}
```	
将背景颜色改为黑色,finally...使用rouge语法高亮完结。
<br/><br/><br/><br/>