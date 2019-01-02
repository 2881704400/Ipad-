/*function welcomeWords() {
  //排版选择
  $(".textStyle a").bind("click",function(){
    $(this).addClass("textStyle_selected").siblings().removeClass("textStyle_selected");
  });
$(".setStyle").find("div.col-16 a").bind('click',function(){
    if($(this).hasClass("textStyle_selected"))
      $(this).removeClass("textStyle_selected")
    else
      $(this).addClass("textStyle_selected")
});
 //banner
  var mySwiper3 = myApp.swiper('.swiper-3', {
  pagination:'.swiper-3 .swiper-pagination',
  spaceBetween: 10,
  slidesPerView: 3
});

// ===============================================
// ===================动画控制====================
// ===============================================
    $(".activeSkin").bind('click',function(){
      if($("#colorSkin").hasClass("displayNone"))
         weicomeInitAnimation();
      else
        $("#colorSkin").addClass("displayNone");
    });
    $("#colorSkin a").bind('click',function(){

        $("#colorSkin").addClass("displayNone");
    });












}

// ===============================================
// =====================动画函数==================
// ===============================================
function weicomeInitAnimation(){   //可优化

 weicomeTestAnim("colorSkin","flipInY",500);


}
//动画调用
function weicomeTestAnim(thatId,x,time) {

 setTimeout(function(){
   $('#'+thatId).removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $('#'+thatId).removeClass(x + ' animated');
   });
   },time);
};*/