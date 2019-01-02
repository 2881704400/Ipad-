function feelControl(){
	$(".feelContent a").unbind();
	$(".feelContent a").bind("click",function(){
		playHome();
		get_no(this,"","");
		$(this).addClass("displayNone").siblings().removeClass("displayNone");
		$(".tooipSpan").removeClass("displayNone");
	});
}
