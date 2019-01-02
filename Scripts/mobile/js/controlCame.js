var sessionStr,windowAugement=controlCameData1;
function controlCame() {

	GetSetParmItem(null,300,7,"");
	$(".cameMenuList dd a").unbind()
	$(".cameMenuList dd a").bind("click",function(){
		stopAddEventListener(windowAugement);
		$(this).addClass("selectedYellow").siblings().removeClass("selectedYellow");
		sessionStr = $(".selectedYellow").attr("index");
		if(sessionStr == 1)
		  {windowAugement = controlCameData1;GetSetParmItem(this,300,7,"");}
		else if(sessionStr == 2)
		  {windowAugement = controlCameData2;GetSetParmItem(this,300,11,"");}
		else
		  {windowAugement = controlCameData3;GetSetParmItem(this,300,14,"");}
        startAddEventListener(windowAugement);
	})

   startAddEventListener(windowAugement);
}

function touchstartCame(){
	var that = $(this),dt = this;
  	windowAugement.forEach(function(item,index){
        if(that.hasClass(item.className))
        	GetSetParmItem(dt,item.equipNo,item.setNo,"");
	});
}

function touchendCame(){
	var that = $(this),dt = this;
  	windowAugement.forEach(function(item,index){
        if(that.hasClass(item.className) && item.setNo1 != undefined)
        	GetSetParmItem(dt,item.equipNo,item.setNo1,"");
	});
}

// stop addEventListener
function stopAddEventListener(dt){
	dt.forEach(function(item,index){
      $("."+item.className)[0].removeEventListener('touchstart', touchstartCame,false);
      $("."+item.className)[0].removeEventListener('touchend',touchendCame,false);
	});
}

// start addEventListener
function startAddEventListener(dt){
	dt.forEach(function(item,index){
      $("."+item.className)[0].addEventListener('touchstart',touchstartCame,false);
      $("."+item.className)[0].addEventListener('touchend',touchendCame,false);
	});	
}