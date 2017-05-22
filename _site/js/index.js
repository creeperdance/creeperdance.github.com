//侧边栏显示、切换等
function showCatelog(){
	if (typeof $('#markdown-toc').html() === 'undefined') {
		$('.a_catelog').removeClass('active');
		$('.a_bloginfo').addClass('active');
		$('div.sidebar_catelog').hide();
		$('div.sidebar_index').show();
	}else {
		//获取目录
		$('#markdown-toc').hide();
		$('.sidebar_catelog').html('<ul class="list_catelog">' + $('#markdown-toc').html() + '</ul>');
		$('#right_sidebar').animate({right:"+=300px"},300);
		$('#content').animate({left:'-=150px'},300);
		$('.a_bloginfo').removeClass('active');
		$('.a_catelog').addClass('active');
		$('div.sidebar_index').hide();
		$('div.sidebar_catelog').show();
	}
}


$(function() {
	showCatelog();
	//侧标栏的显示及鼠标点击时的切换
	$('#totoro_fixed').find('img').mouseenter(function(){
		$('#right_sidebar').animate({right:"+=300px"},300);
		$('#content').animate({left:'-=150px'},300);
	});
	/*$('#right_sidebar').mouseleave(function(){
		$('#right_sidebar').animate({right:"-=300px"},300);
		$('#content').animate({left:'+=150px'},300);
	});*/
	$('.a_catelog').click(function(){
		$('.a_bloginfo').removeClass('active');
		$('.a_catelog').addClass('active');
		$('div.sidebar_index').hide();
		$('div.sidebar_catelog').show();
	});
	$('.a_bloginfo').click(function(){
		$('.a_catelog').removeClass('active');
		$('.a_bloginfo').addClass('active');
		$('div.sidebar_catelog').hide();
		$('div.sidebar_index').show();
	});
	//给点击后的目录列表项添加list_click
	var alis = $('.sidebar_catelog').find('a');
	alis.click(function(){
		alis.removeClass('list_click');
		$(this).addClass('list_click');
	});
	//文章标题变化...
	$('.list-category').find('h2').hover(function(){
		$(this).css('border-bottom','2px solid #555');
		$(this).css('font-size','+=2px');
	},function(){
		$(this).css('border-bottom','none');
		$(this).css('font-size','-=2px');
	});
	$('.list-category').find('a').hover(function(){
		$(this).css('font-size','+=2px');
	},function(){
		$(this).css('font-size','-=2px');
	});
	$('#content #title h3').hover(function(){
		$(this).css('font-size','+=2px');
	},function(){
		$(this).css('font-size','-=2px');
	});
	//鼠标下滚导航栏消失，上滚导航栏出现
	$(window).scroll(function(){
		var scroll_top = $(document).scrollTop();
		if(scroll_top > 100){
			$('#main nav').hide();
		}else{
			$('#main nav').show();
		}
		if(scroll_top >500) {
			$('#side_to_top').show();
		}else{
			$('#side_to_top').hide();
		}
    })
	$('#side_to_top').click(function(){
		$(document).scrollTop(0);
	});
});