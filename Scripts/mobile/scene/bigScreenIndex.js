

function bigScreenIndex() {
    // ===============================================
    // ===================动画控制====================
    // ===============================================
    //$('#bigScreenIndex1,#bigScreenIndex2').addClass("displayNone");
    // setTimeout(function(){
    // 	initAnimationbigScreenIndex();
    // },0);
    

}


// ===============================================
// =====================动画函数==================
// ===============================================
function initAnimationbigScreenIndex(){   //可优化

 testAnimbigScreenIndex("bigScreenIndex1","bounceInLeft",500);
 testAnimbigScreenIndex("bigScreenIndex2","bounceInDown",700);

}
//动画调用
function testAnimbigScreenIndex(thatId,x,time) {

 setTimeout(function(){
   $('#'+thatId).removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $('#'+thatId).removeClass(x + ' animated');
   });
   },time);
};
