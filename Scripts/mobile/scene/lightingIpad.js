function lightingIpad() {
	$(".nightingButtom a img").unbind();
	$(".nightingButtom a img").bind("click",function(){
	$(this).addClass("displayNone").siblings().removeClass("displayNone");

	// switch($(this).parent().attr("data_Number"))
	// {
	// 	case 1: break;
	// 	case 2: break;
	// 	case 3: break;
	// 	case 4: break;
	// 	case 5: break;
	// 	default:;
	// }
});


	
}