$(function() {
	$('#totoro_fixed img').mouseenter(function(){
		$('#right_sidebar').animate({right:"+=300px"},300);
		$('#content').animate({left:'-=150px'},300);
	});
	$('#right_sidebar').mouseleave(function(){
		$('#right_sidebar').animate({right:"-=300px"},300);
		$('#content').animate({left:'+=150px'},300);
	});
});