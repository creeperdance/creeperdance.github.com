/**
 * 自行封装的javascript库
 * */

function ajax(obj) {
	var xhr = (function() {
		if(typeof XMLHttpRequest != 'undefined') {
			return new XMLHttpRequest();
		} else if(typeof ActiveXObject != 'undefined') {
			var version = [
				'MSXML2.XMLHttp.6.0',
				'MSXML2.XMLHttp.3.0',
				'MSXML2.XMLHttp'
			];
			for(var i = 0; version.length; i++) {
				try {
					return new ActiveXObject(version[i]);
				} catch(e) {}
			}
		} else {
			throw new Error('您的系统或浏览器不支持XHR 对象！');
		}
	})();
	obj.url = obj.url + '?rand=' + Math.random();
	obj.data = (function(data) {
		var arr = [];
		for(var i in data) {
			arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
		}
		return arr.join('&');
	})(obj.data);
	if(obj.method === 'get') obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' +
		obj.data;
	if(obj.async === true) {
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				callback();
			}
		};
	}
	xhr.open(obj.method, obj.url, obj.async);
	if(obj.method === 'post') {
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(obj.data);
	} else {
		xhr.send(null);
	}
	if(obj.async === false) {
		callback();
	}

	function callback() {
		if(xhr.status == 200 || xhr.status ==0) {
			obj.success(xhr.responseText); //回调传递参数
		} else {
			alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' +
				xhr.statusText);
		}
	}
}

/*兼容：*/
//加载DOM
function addDomLoaded(fn) {
	var isReady = false;
	var timer = null;

	function doReady() {
		if(isReady) return;
		isReady = true;
		if(timer) clearInterval(timer);
		fn();
	}
	if(document.addEventListener) { //W3C
		addEvent(document, 'DOMContentLoaded', function() {
			doReady();
			//arguments.callee即函数本身
			removeEvent(document, 'DOMContentLoaded', arguments.callee);
		});
	} else if(sys.ie && sys.ie < 9) { //IE678
		timer = setInterval(function() {
			try {
				document.documentElement.doScroll('left');
				doReady();
			} catch(ex) {};
		}, 1);
	} else if((sys.webkit && sys.webkit < 525) || (sys.opera && sys.opera < 9) ||
		(sys.firefox && sys.firefox < 3)) {
		timer = setInterval(function() {
			if(/loaded|complete/.test(document.readyState)) {
				doReady();
			}
		}, 1);
	}
}
//浏览器检测
(function() {
	//全局对象记录浏览器检测记录
	window.sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;
	(s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1]:
		(s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
		(s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
		(s = ua.match(/opera.*version\/([\d.]+)/)) ? sys.opera = s[1] :
		(s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
	if(/applewebkit\/([\d.]+)/.test(ua))
		sys.webkit = ua.match(/applewebkit\/([\d.]+)/)[1];
})()

//获取样式
function getStyle(obj, attr) {
	if(typeof getComputedStyle != "undefined") {
		return getComputedStyle(obj, false)[attr];
	} else {
		return obj.currentStyle[attr];
	}
}
//获取当前窗口大小
function getInner() {
	if(typeof window.innerWidth != "undefined") {
		return {
			width: window.innerWidth,
			height: window.innerHeight
		}
	} else {
		return {
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight
		}
	}
}

//获取事件对象
function getEvent(event) {
	return event || window.event;
}
//事件绑定
addEvent = function(obj, type, fn) {
	if(typeof obj.addEventListener != "undefined") { //W3C
		obj.addEventListener(type, fn, false);
	} else {
		//创建每个对象的事件对象，并将函数按类型存储到其事件对象中
		if(!obj.event) {
			obj.event = {};
		}
		if(!obj.event[type]) {
			obj.event[type] = [];
			if(obj['on' + type]) {
				obj.event[type][0] = fn;
			}
		}
		obj.event[type][this.index++] = fn;
		obj.event['on' + type] = function() {
			for(var i = 0; i < obj.event[type].length; i++) {
				obj.event[type][i]();
			}
		}
	}
};
addEvent.index = 1;
//事件移出
removeEvent = function(obj, type, fn) {
	if(typeof obj.removeEventListener != "undefined") { //W3C
		obj.removeEventListener(type, fn);
	} else {
		var fns = obj.event[type];
		for(var i in fns) {
			if(fns[i] == fn) {
				delete obj.event[type][i];
			}
		}
	}
}
//阻止浏览器默认行为

var preventDefault = function(e) {
	e = e || window.event;
	if(e.preventDefault) {
		e.preventDefault();
	} else {
		e.returnValue = false;
	}
}
/*封装库：*/
function $(args) {
	return new Base(args);
}

function Base(args) {
	this.elements = [];
	if(typeof args == 'string') {
		if(args.indexOf(' ') != -1) {
			var elements = args.split(' ');
			var childElements = [];
			var node = [];
			for(var i = 0; i < elements.length; i++) {
				if(node.length == 0)
					node.push(document);
				switch(elements[i].charAt(0)) {
					case '#':
						childElements = [];
						childElements.push(this.getId(elements[i].substring(1)));
						node = childElements;
						break;
					case '.':
						childElements = [];
						for(var j = 0; j < node.length; j++) {
							var temps = this.getClass(elements[i].substring(1), node[j]);
							for(var k = 0; k < temps.length; k++) {
								childElements.push(temps[k]);
							}
						}
						node = childElements;
						break;
					default:
						childElements = [];
						for(var j = 0; j < node.length; j++) {
							var temps = this.getTagName(elements[i], node[j]);
							for(var k = 0; k < temps.length; k++) {
								childElements.push(temps[k]);
							}
						}
						node = childElements;
				}
			}
			this.elements = childElements;
		} else {
			switch(args.charAt(0)) {
				case '#':
					this.elements.push(this.getId(args.substring(1)));
					break;
				case '.':
					this.elements = this.getClass(args.substring(1));
					break;
				default:
					this.elements = this.getTagName(args);
			}
		}
	} else if(typeof args == 'object') {
		if(args != undefined) {
			this.elements[0] = args;
		}
	} else if(typeof args == 'function') {
		this.ready(args);
	}
}
//DOM加载
Base.prototype.ready = function(fn) {
	addDomLoaded(fn);
}
//获取ID 节点
Base.prototype.getId = function(id) {
	return document.getElementById(id);
};
//获取元素节点数组
Base.prototype.getTagName = function(tag, parentNode) {
	var node = null;
	var temps = [];
	if(parentNode != undefined) {
		node = parentNode;
	} else {
		node = document;
	}
	var tags = node.getElementsByTagName(tag);
	for(var i = 0; i < tags.length; i++) {
		temps.push(tags[i]);
	}
	return tags;
};
//获取及设置元素属性值
Base.prototype.attr = function(attr, value) {
	for(var i = 0; i < this.elements.length; i++) {
		if(arguments.length == 0) {
			return this.elements;
		}
		if(arguments.length == 1) {
			return this.elements[i][attr];
		} else {
			this.elements[i][attr] = value;
		}
	}
	return this;
}
//获取CLASS 节点数组
Base.prototype.getClass = function(className, parentNode) {
	var node = null;
	var temps = [];
	if(parentNode != undefined) {
		node = parentNode;
	} else {
		node = document;
	}
	var all = node.getElementsByTagName('*');
	for(var i = 0; i < all.length; i++) {
		if(all[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
			temps.push(all[i]);
		}
	}
	return temps;
}
//设置一个绑定事件的方法
Base.prototype.bind = function(event, fn) {
	for(var i = 0; i < this.elements.length; i++) {
		addEvent(this.elements[i], event, fn);
	}
	return this;
}
//获取或更改内容
Base.prototype.html = function(value) {
	for(var i = 0; i < this.elements.length; i++) {
		if(arguments.length == 0) {
			return this.elements[i].innerHTML;
		} else {
			this.elements[i].innerHTML = value;
		}
	}
	return this;
}

//获取或更改样式
Base.prototype.css = function(key, value) {
	for(var i = 0; i < this.elements.length; i++) {
		if(arguments.length == 1) {
			if(typeof window.getComputedStyle != "undefined") {
				return window.getComputedStyle(this.elements[i], null)[key];
			} else if(typeof this.elements[i].currentStyle != "undefined") {
				return this.elements[i].currentStyle[key];
			}
		} else {
			this.elements[i].style[key] = value;
		}
	}
	return this;
}

//获取元素数组中的某一个元素
Base.prototype.getElement = function(index) {
	return this.elements[index];
}
//添加Class
Base.prototype.addClass = function(className) {
	for(var i = 0; i < this.elements.length; i++) {
		if(!this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
			this.elements[i].className += " " + className;
		}
	}
	return this;
}
//移除Class
Base.prototype.removeClass = function(className) {
	for(var i = 0; i < this.elements.length; i++) {
		if(this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))) {
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
		}
	}
	return this;
}
//设置鼠标移入
Base.prototype.hover = function(over, out) {
	for(var i = 0; i < this.elements.length; i++) {
		addEvent(this.elements[i], 'mouseover', over);
		addEvent(this.elements[i], 'mouseout', out);
	}
	return this;
}
//设置鼠标点击
Base.prototype.click = function(on) {
	for(var i = 0; i < this.elements.length; i++) {
		addEvent(this.elements[i], 'click', on);
	}
	return this;
}
//设置显示
Base.prototype.show = function() {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display = "block";
	}
	return this;
}
//设置隐藏
Base.prototype.hide = function() {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display = "none";
	}
	return this;
}
//设置元素水平居中
Base.prototype.center = function(width, height) {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.top = (getInner().height - parseInt(height)) / 2 + 'px';
		this.elements[i].style.left = (getInner().width - parseInt(width)) / 2 + 'px';
	}
	return this;
}
//设置浏览器窗口变动
Base.prototype.resize = function(fn) {
	addEvent(window, 'resize', fn);
	return this;
}
//设置锁屏功能
Base.prototype.lock = function() {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.width = getInner().width + 'px';
		this.elements[i].style.height = getInner().height + 'px';
		this.elements[i].style.display = 'block';
		//隐藏滚动条
		document.documentElement.style.overflow = 'hidden';
	}
	return this;
}
//设置锁屏功能解锁
Base.prototype.unlock = function() {
	for(var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display = 'none';
		//还原滚动条
		document.documentElement.style.overflow = 'auto';
	}
	return this;
}

//设置拖拽功能
Base.prototype.drag = function() {
	for(var i = 0; i < this.elements.length; i++) {
		addEvent(this.elements[i], 'mousedown', function() {
			var e = getEvent(e);
			var _this = this;
			var diffX = e.clientX - _this.offsetLeft;
			var diffY = e.clientY - _this.offsetTop;

			function move() {
				var e = getEvent(e);
				var left = e.clientX - diffX;
				var top = e.clientY - diffY;
				if(left < 0) {
					left = 0;
				} else if(left > getInner().width - _this.offsetWidth) {
					left = getInner().width - _this.offsetWidth;
				}
				if(top < 0) {
					top = 0;
				} else if(top > getInner().height - _this.offsetHeight) {
					top = getInner().height - _this.offsetHeight;
				}
				_this.style.left = left + 'px';
				_this.style.top = top + 'px';
			}
			addEvent(document, 'mousemove', move);

			function up() {
				removeEvent(this, 'mousemove', move);
				addEvent(this, 'mouseup', up);
			}
			addEvent(document, 'mouseup', up);
		})
	}
	return this;
}
//设置多物体同时动画效果
var timer = null;
Base.prototype.startMove = function(json, step, time, fn) {
	clearInterval(timer);
	for(var i = 0; i < this.elements.length; i++) {
		var element = this.elements[i];
		timer = setInterval(function() {
			for(var attr in json) {
				var flag = true; //判断是否全部都达到目标值
				var current = 0; //记录属性对应的值
				//获得属性对应的当前值
				if(attr == 'opacity') {
					current = Math.round(parseFloat(getStyle(element, attr) * 100));
				} else {
					current = parseInt(getStyle(element, attr));
				}
				//设置缓冲动画，计算动画变动频率值
				var speed = (json[attr] - current) / step;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
				if(current != json[attr]) {
					//没有全部达到目标值
					flag = false;
				}
				if(attr == 'opacity') {
					current = current + speed;
					element.style.filter = 'alpha(opacity = ' + current + ')';
					element.style.opacity = current / 100;
				} else {
					current = current + speed;
					element.style[attr] = current + 'px';
				}
			}
			if(flag) {
				clearInterval(element.time);
				if(fn) { //有函数则执行
					fn();
				}
			}
		}, time);
	}
	return this;
}