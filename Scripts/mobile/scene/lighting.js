function lighting(){


$(".LightingButtom a img").unbind();
$(".LightingButtom a img").bind("click",function(){
	$(this).addClass("displayNone").siblings().removeClass("displayNone");  //正反选择

	switch(parseInt($(this).parent().attr("data_Number")))  //顶端视图
	{
		case 5: 
           if($(this).parent().find("img:eq(0)").hasClass("displayNone"))  //关闭按钮是否隐藏，隐藏则顶端开灯
               $(".outberLighLine").removeClass("Close_outberLighLineSelect").addClass("Open_outberLighLineSelect");
           else
               $(".outberLighLine").removeClass("Open_outberLighLineSelect").addClass("Close_outberLighLineSelect");
		       break;
		case 3: 
           if($(this).parent().find("img:eq(0)").hasClass("displayNone"))
               $(".innerberLine").removeClass("Close_innerberLineSelect").addClass("Open_innerberLineSelect");
           else
               $(".innerberLine").removeClass("Open_innerberLineSelect").addClass("Close_innerberLineSelect");
		       break;
		case 2: 
           if($(this).parent().find("img:eq(0)").hasClass("displayNone"))
               $(".centerberLine").removeClass("Close_centerberLineSelect").addClass("Open_centerberLineSelect");
           else
               $(".centerberLine").removeClass("Open_centerberLineSelect").addClass("Close_centerberLineSelect");
		       break;
		case 1: 
           if($(this).parent().find("img:eq(0)").hasClass("displayNone"))
                $(".light4").removeClass("light4Close").addClass("light4Open");
           else
                $(".light4").removeClass("light4Open").addClass("light4Close");
		       break;
		case 4: 
           if($(this).parent().find("img:eq(0)").hasClass("displayNone"))
                $(".light5").removeClass("light5Close").addClass("light5Open");
           else
                $(".light5").removeClass("light5Open").addClass("light5Close");
		       break;
		default:;
	}
    get_noLigh(this); 

});

// 新增
$(".lightiingBtn a").unbind();
$(".lightiingBtn a").bind("click",function(){

  if($(this).hasClass("allOpen"))  //全开
     {
        $(".LightingButtom a").find("img:eq(0)").addClass("displayNone");  //显示
        $(".LightingButtom a").find("img:eq(1)").removeClass("displayNone");  //隐藏

        $(".outberLighLine").removeClass("Close_outberLighLineSelect").addClass("Open_outberLighLineSelect");  //外围
        $(".innerberLine").removeClass("Close_innerberLineSelect").addClass("Open_innerberLineSelect"); //内围
        $(".centerberLine").removeClass("Close_centerberLineSelect").addClass("Open_centerberLineSelect"); //中心
         $(".light4").removeClass("light4Close").addClass("light4Open");
         $(".light5").removeClass("light5Close").addClass("light5Open");
     }
 else  //全关
     {
        $(".LightingButtom a").find("img:eq(0)").removeClass("displayNone");  //显示
        $(".LightingButtom a").find("img:eq(1)").addClass("displayNone");  //隐藏

        $(".outberLighLine").addClass("Close_outberLighLineSelect").removeClass("Open_outberLighLineSelect");  //外围
        $(".innerberLine").addClass("Close_innerberLineSelect").removeClass("Open_innerberLineSelect"); //内围
        $(".centerberLine").addClass("Close_centerberLineSelect").removeClass("Open_centerberLineSelect"); //中心
        $(".light4").removeClass("light4Open").addClass("light4Close");
         $(".light5").removeClass("light5Open").addClass("light5Close");
     }
get_noLigh(this); 
});






var _dataYxp = "selectedEquipNo=3001&&tableName=yxp";        
var _url ="/GWServices.asmx/RealTimeData";
JQajaxo("post", _url, false, _dataYxp, _successfYxp);
JQajaxo("post", _url, false, _dataYxp, _successfYxp);
function _successfYxp(data) {  
console.log(data); 
  var resultJs = $(data).children("string").text(); 
   // var js = $(resultJs);
   for(var i=0;i<5;i++)
   {
     var indexyxp=JSON.parse(resultJs)[i].m_YXState;
     console.log(indexyxp);
     if(indexyxp == "打开")
     {
       isOpacity(parseInt(JSON.parse(resultJs)[i].m_iYXNo),true);
     }
     else
     {
       isOpacity(parseInt(JSON.parse(resultJs)[i].m_iYXNo),false);
     }

   }

}



    function isOpacity(number,isiNys){
         
      if (isiNys) {
        //开灯
        $(".LightingButtom a[data-Index='"+number+"']").find("img:eq(0)").addClass("displayNone");  //显示
        $(".LightingButtom a[data-Index='"+number+"']").find("img:eq(1)").removeClass("displayNone");  //隐藏
       // console.log();
        switch(number){
          case 2: $(".centerberLine").removeClass("Close_centerberLineSelect").addClass("Open_centerberLineSelect");break;  //中心
          case 3: $(".innerberLine").removeClass("Close_innerberLineSelect").addClass("Open_innerberLineSelect");break;   //内围
          case 5: $(".outberLighLine").removeClass("Close_outberLighLineSelect").addClass("Open_outberLighLineSelect");break; //外围
          case 1:  $(".light4").removeClass("light4Close").addClass("light4Open");break;
          case 4:  $(".light5").removeClass("light5Close").addClass("light5Open");break;
          default:;
        }
      }else{
         $(".LightingButtom a[data-Index='"+number+"']").find("img:eq(0)").removeClass("displayNone");  //显示
         $(".LightingButtom a[data-Index='"+number+"']").find("img:eq(1)").addClass("displayNone");  //隐藏
          switch(number){
          case 2: $(".centerberLine").addClass("Close_centerberLineSelect").removeClass("Open_centerberLineSelect");break;
          case 3: $(".innerberLine").addClass("Close_innerberLineSelect").removeClass("Open_innerberLineSelect");break;
          case 5: $(".outberLighLine").addClass("Close_outberLighLineSelect").removeClass("Open_outberLighLineSelect");break;
          case 1:  $(".light4").removeClass("light4Open").addClass("light4Close");break;
          case 4:  $(".light5").removeClass("light5Open").addClass("light5Close");break;
          default:;
        }
      }

    }

//end
}


//******************************************************************************************************************************
//执行命令
function get_noLigh(that) {//values不为空则传。slideIndex为ppt页面元素（其他为空）
    if (!$(that).hasClass("Conference_selectedBG") && !$(that).hasClass("Conference_selectedCO"))
    {
        playHome();
        var set_equipX = $(that).attr("set_equip");
        var set_noX = $(that).attr("set_no");      
        if (set_noX != "")
            GetSetParmItemLigh(set_equipX, set_noX);  
    }
    
}

//获取结果集合
function GetSetParmItemLigh(equip_no,set_no) {
    if (Control_Equip_List(equip_no) || Control_SetItem_List(equip_no, false)) {

        var _url = "/GWServices.asmx/GetSetParmItem";
        var _dataSet = "equip_no=" + equip_no + "&&set_no=" + set_no;
        JQajaxo("post", _url, true, _dataSet, _successfSet);
        function _successfSet(data) {
            var resultJs = $(data).children("string").text();
            if (resultJs != "false" && resultJs != "") 
               { 
                    var userResultJs =JSON.parse(resultJs);

                    onSetCommandLigh(equip_no, userResultJs[0].main_instruction, userResultJs[0].minor_instruction, userResultJs[0].value, userResultJs[0].set_nm);
              }
             else
                {console.log("请检查是否配置设备");}
        }

    }
}

//设置命令-确定
function onSetCommandLigh(str_1, str_2, str_3, str_4, text) { //equip_no,main_instruction,minor_instruction,value,set_nm

    var vals = str_4;
    var userName = window.localStorage.userName;
    if (userName == null || userName == "") {
        userName = window.sessionStorage.userName;
    }
    var _url = "/GWServices.asmx/SetUpdateS";
    var _dataSet = "set_nm=" + encodeURIComponent(str_1) + "&&main_instruction=" + encodeURIComponent(str_2) + "&&minor_instruction=" + encodeURIComponent(str_3) + "&&values=" + encodeURIComponent(vals) + "&&usern=" + encodeURIComponent(userName);
    JQajaxo("post", _url, true, _dataSet, _successfSet);
    function _successfSet(data) {

        console.log(str_1 + "," + str_2 + "," + str_3 + "," + str_4 + "," + text);

        var resultJs = $(data).children("string").text();

        if (resultJs != "false") {


        }
    }



}