$(function() {
	$('#totoro_fixed img').mouseenter(function(){
		$('#right_sidebar').animate({right:"+=260px"},300);
		$('#content').animate({left:'-=150px'},300);
	});
	$('#right_sidebar').mouseleave(function(){
		$('#right_sidebar').animate({right:"-=260px"},300);
		$('#content').animate({left:'+=150px'},300);
	});
	$('.list-category h2').hover(function(){
		$(this).css('border-bottom','2px solid #555');
		$(this).css('font-size','+=2px');
	},function(){
		$(this).css('border-bottom','none');
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