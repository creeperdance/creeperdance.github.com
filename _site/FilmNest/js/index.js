$(function() {
	//鼠标浮动到个人中心的显示和隐藏
	$('#active').hover(function() {
		if(getInner().width >= 768) {
			$(".person_center").show();
		}
	}, function() {
		$(".person_center").hide();
	})
	//点击导航折叠按钮的显示和隐藏
	var collapse = $('#myCollapse');
	$('.navbar-toggle').click(function() {
		if(collapse.css('display') == 'none') {
			collapse.css('display', 'block');
		} else {
			collapse.css('display', 'none');
		}
	})
	//点击登陆，登陆模块的居中显示和隐藏，及锁屏功能
	var login = $('#user_login');
	$('.login').click(function() {
		var width = getStyle(login.getElement(0), 'width');
		var height = getStyle(login.getElement(0), 'height');
		collapse.hide();
		login.show();
		$('.lock_screen').lock();
		login.center(width, height).resize(function() {
			login.center(width, height);
			if(login.css('display') == "block") {
				$('.lock_screen').lock();
			}
		});
	})
	//点击注册，注册模块的居中显示和隐藏
	var regist = $('#regist_container');
	$('.regist').click(function() {
		var width = getStyle(regist.getElement(0), 'width');
		var height = getStyle(regist.getElement(0), 'height');
		collapse.hide();
		regist.show();
		$('.lock_screen').lock();
		regist.center(width, height).resize(function() {
			var width = getStyle(regist.getElement(0), 'width');
			var height = getStyle(regist.getElement(0), 'height');
			regist.center(width, height);
			if(regist.css('display') == "block") {
				$('.lock_screen').lock();
			}
		});
	})

	//点击关闭，关闭登陆/注册模块及锁屏功能
	$('#login_close').click(function() {
		login.hide();
		$('.lock_screen').unlock();
	})
	$('#regist_close').click(function() {
		regist.hide();
		$('.lock_screen').unlock();
	})

	//登陆注冊窗口的拖拽效果
	login.drag();
	regist.drag();
	//登陆注册输入框获取焦点
	$('.user_input').bind('focus', function() {
		$(this).attr('placeholder', '');
	});
	//弹窗居中 
	var frame = $('#flip_frame');
	var frame_span = $('#flip_frame span');
	frame.center(frame.css('width'), frame.css('height')).resize(function() {
		frame.center(frame.css('width'), frame.css('height'));
	});
	//关闭弹窗
	$('#frame_close').click(function() {
		frame.hide();
	});
	//注册验证[失去焦点]
	function check_username(obj) {
		//规则:字母开头，其余允许字母下划线数字，6-12位
		var user_name = obj.attr('value');
		if(!/^[a-zA-Z][\w]{5,11}$/.test(user_name)) {
			if(!/^[a-zA-Z]/.test(user_name)) {
				frame_span.html('用户名必须以字母开头');
				frame.css('display', 'block');
			} else if(/[\W]/.test(user_name)) {
				frame_span.html('用户名含有非法字符[合法字符为：字母，数字，下划线]！');
				frame.css('display', 'block');
			} else {
				frame_span.html('用户名个数不合法[6-12位]');
				frame.css('display', 'block');
			}
			return false;
		}
		return true;
	}

	function check_password(obj) {
		//规则:6-18位数字或字母
		var password = obj.attr('value');
		if(!/^[a-zA-Z0-9]{6,12}$/.test(password)) {
			if(/[^a-zA-Z0-9]/.test(password)) {
				frame_span.html('密码含有非法字符[合法字符为：字母，数字]！');
				frame.css('display', 'block');
			} else {
				frame_span.html('密码个数不合法[6-18位]');
				frame.css('display', 'block');
			}
			return false;
		}
		return true;
	}

	function check_password_again(obj) {
		var password = $('#regist_form .password').attr('value');
		var password_again = obj.attr('value');
		if(password != password_again) {
			frame_span.html('两次输入的密码不一致');
			frame.css('display', 'block');
			return false;
		}
		return true;
	}
	//使用协议确认
	function check_agree() {
		if(!$('#agreement').getElement(0).checked && getInner().width >= 768) {
			frame_span.html('您尚未接受FilmNest使用协议');
			frame.css('display', 'block');
			return false;
		}
		return true;
	}
	//用户名验证
	$('#regist_form .username').bind('blur', function() {
		check_username($(this));
	});
	//密码验证
	$('#regist_form .password').bind('blur', function() {
		check_password($(this));
	});
	//密码确认验证
	$('.password_confirm').bind('blur', function() {
		check_password_again($(this));
	});

	//提交认证
	$('#regist_form .btn_submit').click(function(event) {
		var $username = $('#regist_form .username');
		var $password = $('#regist_form .password');
		var $confirm = $('.password_confirm');
		preventDefault(event);
		if((check_username($username)　 && 　check_password($password) && 　check_password_again($confirm) && check_agree())) {
			//调用ajax
			ajax({
				method: 'post',
				url: 'regist.php',
				data: {
					'username': $username.attr('value'),
					'password': $password.attr('value')
				},
				success: function(text) {
					if(text == 1) {
						frame_span.html('该用户名已被注册!');
						frame.css('display', 'block');
					} else {
						frame_span.html('注冊成功!');
						frame.css('display', 'block');
						regist.hide();
						$('.lock_screen').unlock();
					}
				},
				async: true
			});
		}
	})
	//用户登陆验证
	$('#login_form .btn_submit').click(function(event) {
		var $username = $('#login_form .username');
		var $password = $('#login_form .password');
		preventDefault(event);
		ajax({
			method: 'post',
			url: 'login.php',
			data: {
				'username': $username.attr('value'),
				'password': $password.attr('value')
			},
			success: function(text) {
				if(text == '2' || text == '3') {
					frame_span.html('登陆成功!');
					frame.css('display', 'block');
					login.hide();
					$('.lock_screen').unlock();
				} else if(text == '1') {
					frame_span.html('用户名与密码不匹配!');
					frame.css('display', 'block');
				} else {
					frame_span.html('该用户名不存在!');
					frame.css('display', 'block');
				}
			},
			async: true
		});
	});
	//菜单切换功能
	//电影1
	var role_name1 = document.getElementById('role_name1');
	var infos1 = $('#role_info1 .row');
	var lis1 = role_name1.getElementsByTagName('ul')[0].getElementsByTagName('li');
	for(var j = 0; j < lis1.length; j++) {
		if(lis1[j].className.match(new RegExp('(\\s|)^active'))) {
			$(infos1.getElement(j)).css('display', 'block');
		}
		lis1[j].onclick = function() {
			for(var a = 0; a < lis1.length; a++) {
				$(infos1.getElement(a)).css('display', 'none');
			}
			var a = parseInt(this.innerHTML.replace(/[^0-9]/ig, ""));
			$(infos1.getElement(a - 1)).css('display', 'block');
		}
	}
	//电影2
	var role_name2 = document.getElementById('role_name2');
	var infos2 = $('#role_info2 .row');
	var lis2 = role_name2.getElementsByTagName('ul')[0].getElementsByTagName('li');
	for(var j = 0; j < lis2.length; j++) {
		if(lis2[j].className.match(new RegExp('(\\s|)^active'))) {
			$(infos2.getElement(j)).css('display', 'block');
		}
		lis2[j].onclick = function() {
			for(var a = 0; a < lis2.length; a++) {
				$(infos2.getElement(a)).css('display', 'none');
			}
			var a = parseInt(this.innerHTML.replace(/[^0-9]/ig, ""));
			$(infos2.getElement(a - 1)).css('display', 'block');
		}
	}
	//电影2
	var role_name3 = document.getElementById('role_name3');
	var infos3 = $('#role_info3 .row');
	var lis3 = role_name3.getElementsByTagName('ul')[0].getElementsByTagName('li');
	for(var j = 0; j < lis3.length; j++) {
		if(lis3[j].className.match(new RegExp('(\\s|)^active'))) {
			$(infos3.getElement(j)).css('display', 'block');
		}
		lis3[j].onclick = function() {
			for(var a = 0; a < lis3.length; a++) {
				$(infos3.getElement(a)).css('display', 'none');
			}
			var a = parseInt(this.innerHTML.replace(/[^0-9]/ig, ""));
			$(infos3.getElement(a - 1)).css('display', 'block');
		}
	}
	//侧边栏图片动画效果
	$('#side1 p').hover(function() { //鼠标移入
		$('#side1 img').startMove({
			width: 150,
			height: 150,
			opacity: 100
		}, 10, 50);
	}, function() { //鼠标移出
		$('#side1 img').startMove({
			width: 50,
			height: 50,
			opacity: 0
		}, 10, 10);
	});
	$('#side2 p').hover(function() { //鼠标移入
		$('#side2 img').startMove({
			width: 150,
			height: 150,
			opacity: 100
		}, 10, 50);
	}, function() { //鼠标移出
		$('#side2 img').startMove({
			width: 50,
			height: 50,
			opacity: 0
		}, 10, 10);
	});

	$('#side3 p').hover(function() { //鼠标移入
		$('#side3 img').startMove({
			width: 150,
			height: 150,
			opacity: 100
		}, 10, 50);
	}, function() { //鼠标移出
		$('#side3 img').startMove({
			width: 50,
			height: 50,
			opacity: 0
		}, 10, 10);
	});
	//设置侧边栏高度
	$('.sidebar').css('height', getInner().height + 'px').resize(function() {
		$('.sidebar').css('height', getInner().height + 'px');
	});
	//点击侧边栏，跳转至相应区域 【可直接在html文档直接更改，此处仅为试手】
	/*$('#side1').click(function() {
		$('#side1 a').getElement(0).href = '#film_list1';
	});
	$('#side2').click(function() {
		$('#side2 a').getElement(0).href = '#film_list2';
	});
	$('#side3').click(function() {
		$('#side3 a').getElement(0).href = '#film_list3';
	});*/

});