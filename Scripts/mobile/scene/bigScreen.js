
function bigScreen() {

//左边Menu
$(".bigScreenMenu>a").unbind(); 
$(".bigScreenMenu>a").bind("click",function(){

  $(this).addClass("bigScreenMenuBG").siblings().removeClass("bigScreenMenuBG");

  if($(this).attr("id") == "bigScreenMenu1")
  {
    $("#bigScreenContent1").removeClass("displayNone");
    $("#bigScreenContent2").addClass("displayNone");
  }
  else
  {
    $("#bigScreenContent1").addClass("displayNone");
    $("#bigScreenContent2").removeClass("displayNone");
  }
});

//左边选择
$("#bigScreenContent1 li a").unbind(); 
$("#bigScreenContent1 li a").bind("click",function(){

  $(this).addClass("selectScreenLeft1").parent().siblings().find("a").removeClass("selectScreenLeft1");
});
$("#bigScreenContent2 li a").unbind(); 
$("#bigScreenContent2 li a").bind("click",function(){

  $(this).addClass("selectScreenLeft").parent().siblings().find("a").removeClass("selectScreenLeft");
});

//右边地下模板
$(".rightScreen li a").unbind();
$(".rightScreen li a").bind('click',function(){

    var index = parseInt($(this).parent().attr("index"));
    $(this).parent().siblings().find("a:eq(0)").removeClass("displayNone");
    $(this).parent().siblings().find("a:eq(1)").addClass("displayNone");
    $(this).addClass("displayNone").siblings().removeClass("displayNone");

    if($(this).parent().find("a:eq(0)").hasClass("displayNone"))
    {
      $(".video").eq(index).removeClass("displayNone").siblings(".video").addClass("displayNone");
       get_no(this,"","");
    }


});
//右边上部模板
$(".activeLeftContent").unbind(); 
$(".activeLeftContent").bind("click",function(){
    if($(this).parent().hasClass("oneFrame"))
    {$(".twoFrame,.zeroFrame,.threeFrame,.fourFrame,.fiveFrame").find("span").html("");}
    else if($(this).parent().hasClass("twoFrame"))
    {$(".oneFrame,.zeroFrame,.threeFrame,.fourFrame,.fiveFrame").find("span").html("");}
    else if($(this).parent().hasClass("zeroFrame"))
    {$(".oneFrame,.twoFrame,.threeFrame,.fourFrame,.fiveFrame").find("span").html("");}
    else if($(this).parent().hasClass("threeFrame"))
    {$(".oneFrame,.twoFrame,.zeroFrame,.fourFrame,.fiveFrame").find("span").html("");}
    else if($(this).parent().hasClass("fourFrame"))
    {$(".oneFrame,.twoFrame,.zeroFrame,.threeFrame,.fiveFrame").find("span").html("");}
    else if($(this).parent().hasClass("fiveFrame"))
    {$(".oneFrame,.twoFrame,.zeroFrame,.threeFrame,.fourFrame").find("span").html("");}  

    

    if($("#bigScreenMenu1").hasClass("bigScreenMenuBG"))
    {
        $(this).next("span").html($(".selectScreenLeft1").text());
       var value=$(".selectScreenLeft1").attr("dataLeft")+"V"+$(this).attr("dataRight")+".";      
    }

    else
    {
        $(this).next("span").html($(".selectScreenLeft").text());
       var value=$(".selectScreenLeft").attr("dataLeft")+"V"+$(this).attr("dataRight")+".";   
    }


    onSetCommand(this,"5002", "-", "-", value, value,"");

});




            //  document.querySelector('.leftButton').onselectstart = function() {
            //         return false;
            //     };
            // $('.leftButton1')[0].ondragstart = function (event)  
            //     {  
            //        event.dataTransfer.effectAllowed = "move";
            //         console.log(event.target.innerHTML);  
            //        // $(this).addClass("selectScreenLeft").parent().siblings().find("a").removeClass("selectScreenLeft");
            //        // event.dataTransfer.setData("Text", $(this).html());  
            //     };
            // /*拖拽元素在目标元素头上移动的时候*/
            //   document.querySelector('.oneFrame').ondragover = function (e){
            //       //防止浏览器默认行为(W3C)
            //       e.preventDefault();
            //   }

            // // 拖放元素 丢到 容器内 会触发 ondrop事件
            // // 如果没有在 ondragover中 阻止默认行为 那么 无法触发 ondrop事件
            // document.querySelector('.oneFrame').ondrop = function (){
            
            //      var text = event.dataTransfer.getData("Text");
            //      console.log(111);
            //      // $(this).append(text);  









// ===============================================
// ===================动画控制====================
// ===============================================
// $('#ScreenMenu1,#ScreenMenu2,#ScreenMenu3,#ScreenMenu4,#ScreenMenu5,#ScreenMenu6,#ScreenMenu7,#ScreenMenu8,#ScreenMenu9,#ScreenMenu10,#ScreenMenu11,#ScreenMenu12,#ScreenMenu13,#ScreenMenu14,#ScreenMenu15,#ScreenMenu16,#ScreenMenu17,#ScreenMenu18,#ScreenMenu19,#ScreenMenu20,#ScreenMenu21,#ScreenMenu22,#ScreenMenu23,#ScreenMenu24,#ScreenMenu25').addClass("displayNone");
// initAnimationScreen();


}


// ===============================================
// =====================动画函数==================
// ===============================================
function initAnimationScreen(){   //可优化

 testAnimScreen("ScreenMenu1","fadeInUp",500);
 testAnimScreen("ScreenMenu2","fadeInUp",600);
 testAnimScreen("ScreenMenu3","fadeInUp",700);
 testAnimScreen("ScreenMenu4","fadeInUp",800);
 testAnimScreen("ScreenMenu5","fadeInUp",900);

 testAnimScreen("ScreenMenu6","bounceInLeft",100);
 testAnimScreen("ScreenMenu7","bounceInLeft",200);
 testAnimScreen("ScreenMenu8","bounceInLeft",300);
 testAnimScreen("ScreenMenu9","bounceInLeft",400);
 testAnimScreen("ScreenMenu10","bounceInLeft",500);

 testAnimScreen("ScreenMenu11","bounceInLeft",600);
 testAnimScreen("ScreenMenu12","bounceInLeft",700);
 testAnimScreen("ScreenMenu13","bounceInLeft",800);

 testAnimScreen("ScreenMenu14","bounceInLeft",900);
 testAnimScreen("ScreenMenu15","bounceInLeft",1000);
 testAnimScreen("ScreenMenu16","bounceInLeft",900);
 testAnimScreen("ScreenMenu17","bounceInLeft",800);
 testAnimScreen("ScreenMenu18","bounceInLeft",700);
 testAnimScreen("ScreenMenu19","bounceInLeft",600);
 testAnimScreen("ScreenMenu20","bounceInLeft",500);

 testAnimScreen("ScreenMenu21","fadeInDown",800);
 testAnimScreen("ScreenMenu22","fadeInDown",700);
 testAnimScreen("ScreenMenu23","fadeInDown",600);
 testAnimScreen("ScreenMenu24","fadeInDown",500);

}
//动画调用
function testAnimScreen(thatId,x,time) {

 setTimeout(function(){
   $('#'+thatId).removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $('#'+thatId).removeClass(x + ' animated');
   });
   },time);
};