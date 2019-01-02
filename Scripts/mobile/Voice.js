
function Voice() {
	 toolbarActive('VoiceTool');
	$(".headerModulMetting a").unbind(); 
    $(".headerModulMetting a").bind("click",function(){
        playHome();
        get_no(this,"","");
        $(".activeDisabled").attr("disabled",false);
        $(this).attr("disabled",true);
        $(".tooipSpan").removeClass("displayNone");
    });
}