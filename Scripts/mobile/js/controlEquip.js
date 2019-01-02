var btnLeftX,distance = 0;
var strEN = 0;//默认第一台空调
var scales,ycp_no_1,equipNo_1,equipID_1,equipNo_2,equipID_2,equipNo_3,equipID_3;
function controlEquip() {

	leftListMenu();
    //子菜单点击
	$(".equipMenuList dd a").unbind();
	$(".equipMenuList dd a").bind("click",function(){
		$(".equipMenuList dd a").removeClass("selectedYellow");
		$(this).addClass("selectedYellow");
		strEN = parseInt($(this).attr("index"));
        //初始化发送命令
         controlEquipData.forEach(function(item,index){
         	if(item.index == strEN)
         	{
         		ycp_no_1 = item.ycp_no;
         		equipNo_1= item.equipNo;
         		equipID_1= item.setNo;
         		equipNo_2= item.equipNoOpen;
         		equipID_2= item.setNoOpen;
         		equipNo_3= item.equipNoClose;
         		equipID_3= item.setNoClose;
         	}
         });
		//初始化页面显示
		StatusInit(strEN);
	});
	//温度设置
	$(".equipSetBottom ul li a").unbind();
	$(".equipSetBottom ul li a").bind("click",function(){
		var wdValue= parseInt($(this).find("label").text());
		if($("#divBlokBtn").css("left") != "0px");
		{ 
		  
		  setView(wdValue,1);
		  get_noNull(null,equipNo_1,equipID_1,wdValue);
		}
	});
	//开关按钮监听
	var divBlokBtn = document.getElementById("divBlokBtn");
	btnLeftX = $("#divBlokBtn").width(); //本上长度
	divBlokBtn.addEventListener('touchstart', takeMoveStart, false);
	divBlokBtn.addEventListener('touchmove', takeMove, false);
	divBlokBtn.addEventListener('touchend', takeMoveEnd, false);
	// init 温度
	setTemperature();

}
// 开关滑动事件
function takeMoveStart(e) {
  var evt = e.touches[0];
  var mx = evt.pageX; //触摸点横坐标
  var my = evt.pageY; //触摸点纵坐标
  distance = mx - $("#divBlokBtn").offset().left; //触摸相对滑块左侧距离
}

function takeMove(e) {
  var evt = e.touches[0];
  var mx = evt.pageX; //触摸点横坐标
  var my = evt.pageY; //触摸点纵坐标
  var leftX = mx - $(".sceneButton").offset().left - distance;
  if(leftX>0 && leftX<=btnLeftX)
    document.getElementById("divBlokBtn").style.left = leftX + 'px';
}

function takeMoveEnd(e) {
  var evt = e.changedTouches[0];
  var mx = evt.pageX; //触摸点横坐标
  var my = evt.pageY; //触摸点纵坐标
  var endLeftDistance = mx - $(".sceneButton").offset().left - distance; //滑块距离父元素左侧距离
  if(endLeftDistance <= btnLeftX/2)
    {document.getElementById("divBlokBtn").style.left = 0 + 'px'; get_noNull(null,equipNo_2,equipID_2,"");}//开
  else
    {document.getElementById("divBlokBtn").style.left = 50 + '%';get_noNull(null,equipNo_3,equipID_3,"");}
  playHome();

}

//温度滑动事件
function  setTemperature(){
  width = $(".equipSetTop").outerWidth(true);// 桌布宽度
  height = $(".equipSetTop").outerHeight(true); // 桌布高度
  dot = {
    x: parseInt(width / 2),
    y: parseInt(height / 2),
    radius: 6
  }; // 圆点位置、半径
  benchmark = dot.x > dot.y ? dot.y : dot.x;
  radius = benchmark * 7 / 10; // 圆半径
  circleRadius = benchmark * 1 / 2;
  var offsetLeft1=$(".equipSetValue").position().left;
  var offsetLeft2=$(".rightEquipView").position().left;
  var offsetTop1=$(".equipSetValue").position().top;
  var offsetTop2=$(".rightEquipView").position().top;

  circleX = dot.x + offsetLeft1+offsetLeft2;//圆盘中心原点距离屏幕左侧距离
  circleY = dot.y + offsetTop1+offsetTop2;//圆盘中心原点距离屏幕顶部距离
  scaleRadius = benchmark * 2 / 3; // 圆半径
  borderWidth = radius / 20; // 圆边框宽度
  length = circleRadius * 3 / 4;
  clock = document.getElementById('equipSetTop');
  clockBg = document.createElement('canvas');
  clockPointers = document.createElement('canvas');
  clockTexts = document.createElement('canvas');
  clockTexts.width = clockPointers.width = clockBg.width = width;
  clockTexts.height = clockPointers.height = clockBg.height = height;
  clockBg.style.position = 'absolute';clockBg.style.left = 0;clockBg.style.right = 0;
  clockPointers.style.position = 'absolute';clockPointers.style.left = 0;clockPointers.style.right = 0;
  clockTexts.style.position = 'absolute';clockTexts.style.left = 0;clockTexts.style.right = 0;

  clock.appendChild(clockBg);
  clock.appendChild(clockTexts);
  clock.appendChild(clockPointers);

  bgCtx = clockBg.getContext('2d'); 
  ptCtx = clockPointers.getContext('2d');
  textCtx = clockTexts.getContext('2d');

  drawCircle(); //中间背景
  drawScale();  //刻度
  drawDescFont();  //画数字标度
  drawLightCirrle(); //画中间转圈 

  StatusInit(strEN);
  // drawLightLine(getAngel(16));  //指示亮度
  // drawTextFont(25);  //画中间变化温度
  // var initAngle = getAngel(16); //初始化角度
  // drawTriangle(dot.x + length * Math.cos(initAngle - 1 / 15),
  //     dot.y + length * Math.sin(initAngle - 1 / 15),
  //     dot.x + length * Math.cos(initAngle + 1 / 15),
  //     dot.y + length * Math.sin(initAngle + 1 / 15),
  //     dot.x + (length + 10) * Math.cos(initAngle),
  //     dot.y + (length + 10) * Math.sin(initAngle), '#34CABE', 'fill'); //画三角

  clockPointers.addEventListener('touchmove', moving, false);
  clockPointers.addEventListener('touchend', movEnding, false);

  /* 画旋转动态效果 */
  flag = false;
  linePosition = 0;
  count = 0;
  oldAngle = 45;
  oldAngleL = 135;
  newAngle = 0;
  frequency = 0;
}

/* 触摸结束后重置状态 */
function movEnding(e) {
	frequency = 0;
	flag = false;
	linePosition = 0;
	count = 0;
	get_noNull(null,equipNo_1,equipID_1,Savescales);
}

/* 触摸更改空调温度效果 */
function moving(e) {
	evt = e.touches[0];//console.log(e)
	var mx = evt.pageX; //触摸点横坐标
	var my = evt.pageY; //触摸点纵坐标
	/*var mx = e.layerX;//PC端点击处横坐标
	var my = e.layerY;*///PC端点击处纵坐标
	var sx = circleX; //圆盘横坐标
	var sy = circleY; //圆盘纵坐标
	jiaodu = 0; //当前触摸点对应原点角度
	var jiaoduR = 15; //刻度间隔角度
	var jiaoduNum = 0; //指钟对应刻度角度
	var realAngle = 0; //角度正切值
	var pi2 = Math.PI / 2; //90°
	var pi4 = Math.PI / 4; //45°
	var pi43 = Math.PI * 3 / 4; //135°
	var lowLineLength = benchmark * 7 / 10 - borderWidth / 2;
	var linelen = radius / 7; //线条长度
	var realJiaoDu = 0;
	scales = 0; //刻度值
	
	ptCtx.clearRect(0, 0, width, height);
	var angle = Math.atan2((my - sy), (mx - sx));
	/*获取当前触摸点对应原点角度*/
	jiaodu = 180 * (angle / Math.PI);
	//console.log(sx,sy,mx,my,jiaodu)
	//console.log(angle,jiaodu)
	if(jiaodu % jiaoduR < jiaoduR / 2) {
		/*角度范围四舍五入不变*/
		jiaoduNum = parseInt(jiaodu / jiaoduR);
		realJiaoDu = jiaoduNum * jiaoduR;
	} else {
		/*角度范围四舍五入+1*/
		jiaoduNum = parseInt(jiaodu / jiaoduR) + 1;
		realJiaoDu = (parseInt((360 + jiaodu) / jiaoduR) + 1) * jiaoduR;
	}
	//console.log(jiaoduNum)
	/*还原atan数值*/
	realAngle = jiaoduNum * jiaoduR * Math.PI / 180;

	if(flag) {
		checkDirectionR(mx, sx, my, sy, angle);
	}

	if(angle > pi4 && angle < pi2 && linePosition != 4) {
		flag = true;
		linePosition = 2;
	}

	if(angle >= pi2 && angle < pi43 && linePosition != 2) {
		flag = true;
		linePosition = 4;
	}
	
	if((angle >= pi43 || angle < pi4) && count <= 0) {
		drawTriangle(dot.x + length * Math.cos(realAngle - 1 / 15),
			dot.y + length * Math.sin(realAngle - 1 / 15),
			dot.x + length * Math.cos(realAngle + 1 / 15),
			dot.y + length * Math.sin(realAngle + 1 / 15),
			dot.x + (length + 10) * Math.cos(realAngle),
			dot.y + (length + 10) * Math.sin(realAngle), '#34CABE', 'fill');

		ptCtx.beginPath();
		ptCtx.moveTo(dot.x + (lowLineLength - linelen) * Math.cos(realAngle), dot.y + (lowLineLength - linelen) * Math.sin(realAngle));
		ptCtx.lineWidth = 2;
		ptCtx.lineTo(dot.x + lowLineLength * Math.cos(realAngle), dot.y + lowLineLength * Math.sin(realAngle));
		ptCtx.strokeStyle = '#34CABE';
		ptCtx.stroke();
		ptCtx.closePath();

		if(jiaodu >= 0 && jiaodu <= 45) {
			var scales = (jiaoduNum * jiaoduR) / jiaoduR + 31;
			drawTextFont(scales);
		} else if(jiaodu <= 180 && jiaodu >= 90) {
			var scales = (jiaoduNum * jiaoduR - 135) / jiaoduR + 16;
			drawTextFont(scales);
		} else if(jiaodu < 0) {
			var scales = (360 + jiaoduNum * jiaoduR - 135) / jiaoduR + 16;
			drawTextFont(scales);
		}
		//playHome();

	} else {
		if(linePosition == 2) {
			drawTriangle(dot.x + length * Math.cos(Math.atan2(1, 1) - 1 / 15),
				dot.y + length * Math.sin(Math.atan2(1, 1) - 1 / 15),
				dot.x + length * Math.cos(Math.atan2(1, 1) + 1 / 15),
				dot.y + length * Math.sin(Math.atan2(1, 1) + 1 / 15),
				dot.x + (length + 10) * Math.cos(Math.atan2(1, 1)),
				dot.y + (length + 10) * Math.sin(Math.atan2(1, 1)), '#34CABE', 'fill');

			ptCtx.beginPath();
			ptCtx.moveTo(dot.x + (lowLineLength - linelen) * Math.cos(Math.atan2(1, 1)), dot.y + (lowLineLength - linelen) * Math.sin(Math.atan2(1, 1)));
			ptCtx.lineWidth = 2;
			ptCtx.lineTo(dot.x + lowLineLength * Math.cos(Math.atan2(1, 1)), dot.y + lowLineLength * Math.sin(Math.atan2(1, 1)));
			ptCtx.strokeStyle = '#34CABE';
			ptCtx.stroke();
			ptCtx.closePath();
		} else if(linePosition == 4) {

			drawTriangle(dot.x + length * Math.cos(Math.atan2(1, -1) - 1 / 15),
				dot.y + length * Math.sin(Math.atan2(1, -1) - 1 / 15),
				dot.x + length * Math.cos(Math.atan2(1, -1) + 1 / 15),
				dot.y + length * Math.sin(Math.atan2(1, -1) + 1 / 15),
				dot.x + (length + 10) * Math.cos(Math.atan2(1, -1)),
				dot.y + (length + 10) * Math.sin(Math.atan2(1, -1)), '#34CABE', 'fill');

			ptCtx.beginPath();
			ptCtx.moveTo(dot.x + (lowLineLength - linelen) * Math.cos(Math.atan2(1, -1)), dot.y + (lowLineLength - linelen) * Math.sin(Math.atan2(1, -1)));
			ptCtx.lineWidth = 2;
			ptCtx.lineTo(dot.x + lowLineLength * Math.cos(Math.atan2(1, -1)), dot.y + lowLineLength * Math.sin(Math.atan2(1, -1)));
			ptCtx.strokeStyle = '#34CABE';
			ptCtx.stroke();
			ptCtx.closePath();
		}
	}
}

/* 判断旋转方向 */
function checkDirectionR(mx, sx, my, sy, angle) {
	var perimeter = 360 * frequency;

	if(mx > sx && my > sy) { //鼠标在第二象限
		newAngle = angle * 180 / Math.PI;
	}
	if(mx < sx && my > sy) { //鼠标在第四象限
		newAngle = angle * 180 / Math.PI;
	}
	if(mx < sx && my < sy) { //鼠标在第三象限
		newAngle = 360 + angle * 180 / Math.PI;
	}
	if(mx > sx && my < sy) { //鼠标在第一象限
		newAngle = 360 + angle * 180 / Math.PI;
	}

	if(linePosition == 2) {
		newAngle += perimeter;
		var oAngle = oldAngle % 360;
		var nAngle = newAngle % 360;
		if(oAngle > 270 && oAngle <= 360 && nAngle >= 0 && nAngle < 90) {
			frequency += 1;
			newAngle = newAngle + 360 * frequency;
		}
		if(nAngle > 270 && nAngle <= 360 && oAngle >= 0 && oAngle < 90) {
			frequency -= 1;
			newAngle = newAngle + 360 * frequency;
		}
		if(flag) {
			count += newAngle - oldAngle;
			oldAngle = newAngle;
		}
		if(count < 0) {
			frequency = 0;
			flag = false;
			linePosition = 0;
			count = 0;
		}
	} else if(linePosition == 4) {
		var oAngleL = Math.abs(oldAngleL % 360);
		var nAngle = Math.abs(newAngle % 360);
		if(oAngleL > 270 && oAngleL <= 360 && nAngle >= 0 && nAngle < 90) {
			frequency -= 1;
			oldAngleL = oldAngleL - 360;
		}
		if(nAngle > 270 && nAngle <= 360 && oAngleL >= 0 && oAngleL < 90) {
			frequency += 1;
			oldAngleL = oldAngleL + 360;
		}
		if(flag) {
			count += oldAngleL - newAngle;
			oldAngleL = newAngle;
		}
		if(count < 0) {
			frequency = 0;
			flag = false;
			linePosition = 0;
			count = 0;
		}
	}
}
/* 画底层圆 */
function drawCircle() {
  bgCtx.beginPath();
  bgCtx.lineWidth = borderWidth;
  bgCtx.arc(dot.x, dot.y, circleRadius, 0, 2 * Math.PI, true);
  bgCtx.closePath();
  //使用经向渐变
  var grd = bgCtx.createRadialGradient(dot.x, dot.y, radius / 4, dot.x, dot.y, radius *3/4);
  grd.addColorStop(0, '#213043');
  grd.addColorStop(0.7, '#2C3B4B');
  grd.addColorStop(0.85, '#2A3948');
  grd.addColorStop(0.92, '#2D3E53');//2D3E53
  grd.addColorStop(0.93, '#2A3948');
  bgCtx.fillStyle = grd;
  bgCtx.shadowBlur = 1;
  bgCtx.shadowOffsetX = 0;
  bgCtx.shadowColor = "#212934";
  bgCtx.fill();
}

/* 画文本字体 */
function drawDescFont() {
  bgCtx.font = "22px '宋体'"; 
  bgCtx.fillStyle = "#FFFFFF";
  var lenR = benchmark * 7 / 10;
  //从坐标点(50,50)开始绘制文字
  bgCtx.fillText("16", dot.x - lenR * Math.sin(45) - 8, dot.y + lenR * Math.sin(45) + 8);
  bgCtx.fillText("20", dot.x - lenR - 5 * borderWidth, dot.y - 5 * borderWidth);
  bgCtx.fillText("25", dot.x - 9, dot.y - lenR - 2 * borderWidth);
  bgCtx.fillText("30", dot.x + lenR + 2 * borderWidth, dot.y - 5 * borderWidth);
  bgCtx.fillText("34", dot.x + lenR * Math.sin(45) - 8, dot.y + lenR * Math.sin(45) + 8);
}

/* 画文本字体 */
function drawTextFont(number) {
  Savescales = number;
  textCtx.clearRect(0, 0, width, height);
  textCtx.font = "34px '宋体'";
  textCtx.fillStyle = "#dbad38";
  textCtx.shadowBlur = 5;
  textCtx.shadowOffsetX = 0;
  textCtx.shadowColor = "#25313c";
  textCtx.fillText(number, dot.x - 4 * borderWidth, dot.y + 1.5 * borderWidth);
  textCtx.font = "18px '宋体'";
  textCtx.shadowBlur = 5;
  textCtx.shadowOffsetX = 0;
  textCtx.shadowColor = "#25313c";
  textCtx.fillStyle = "#9f9f9f";
  textCtx.fillText("℃", dot.x + 2 * borderWidth, dot.y + 1.5 * borderWidth);
}

/* 画圆环 */
function drawLightCirrle() {
  bgCtx.beginPath();
  bgCtx.lineWidth = 3;
  bgCtx.strokeStyle = '#34CABE';
  bgCtx.shadowBlur = 20;
  bgCtx.shadowOffsetX = 0;
  bgCtx.shadowColor = "#212934";
  bgCtx.arc(dot.x, dot.y, length, 0, 2 * Math.PI, true);
  bgCtx.closePath();
  bgCtx.stroke();

  
}
// 画小三角
function drawTriangle(x1, y1, x2, y2, x3, y3, color, type) {
  ptCtx.beginPath();
  ptCtx.moveTo(x1, y1);
  ptCtx.lineTo(x2, y2);
  ptCtx.lineTo(x3, y3);
  ptCtx[type + 'Style'] = color;
  ptCtx.closePath();
  ptCtx[type]();
}

/* 画刻度 */
function drawScale() {
  for(var i = 0, angle = 0, tmp, len; i < 48; i++) {
    bgCtx.beginPath();
    if(i > 6 && i < 18) {
      angle += Math.PI / 24; // 每次递增1/24π
      continue;
    }
    bgCtx.lineWidth = 2;
    if(i % 2 == 0) {
      len = radius / 7;
    } else {
      len = radius / 14;
    }
    bgCtx.strokeStyle = '#4a8bda';
    bgCtx.shadowBlur = 2;
    bgCtxshadowOffsetX = 0;
    bgCtx.shadowColor = "#000";
    tmp = benchmark * 7 / 10 - borderWidth / 2; // 因为圆有边框，所以要减去边框宽度
    bgCtx.moveTo(
      dot.x + tmp * Math.cos(angle),
      dot.y + tmp * Math.sin(angle)
    );
    tmp -= len;
    bgCtx.lineTo(dot.x + tmp * Math.cos(angle), dot.y + tmp * Math.sin(angle));
    bgCtx.stroke();
    bgCtx.closePath();

    angle += Math.PI / 24; // 每次递增1/24π
  }
}

/* 画亮度线 */
function drawLightLine(value) {
  /* 画短亮度线 */
  var angle = value;//Math.atan2(-1, 0);
  ptCtx.beginPath();
  var lowLineLength = benchmark * 7 / 10 - borderWidth / 2;
  var linelen = radius / 7;
  ptCtx.moveTo(dot.x + (lowLineLength - linelen) * Math.cos(angle), dot.y + (lowLineLength - linelen) * Math.sin(angle));
  ptCtx.lineWidth = 2;
  ptCtx.lineTo(dot.x + lowLineLength * Math.cos(angle), dot.y + lowLineLength * Math.sin(angle));
  ptCtx.strokeStyle = '#34cbbf';
  ptCtx.stroke();
  ptCtx.closePath();
}


// 遥信表
function StatusInit(value) //对应哪台空调 ，默认 0 是第一台空调
{
    var jsonData = {
            "url": "/api/real/equip_ycp_state",
            "data":{ equip_no: equipNo_1,ycp_no: ycp_no_1},
            "success": _successfYxp,
            "error": _errorfYxp,
            "complete": _completefYxp
    };
    jQuery.axpost(jsonData);

	function _successfYxp(data) {  
	  console.log(data); 
	  var resultJs = data.HttpData; 
	  if(resultJs.code == 200)
	  {
	  	  var str = resultJs.data.m_YCNm.indexOf("运行状态");
	  	  console.log(str);
          if(str != -1)
            setView(resultJs.data.m_YCValue,1);
          else
             setView(resultJs.data.m_YCValue,0);
	  }
	   
	}
	function _errorfYxp(e) { setView(25,0);}
	function _completefYxp(XMLHttpRequest, status) { }		
	// setEquipNumber
	//setView(30,1);
}


//设置界面信息
function setView(value,equipStatus){ //空调值，设备开关状态
	ptCtx.clearRect(0, 0, width, height);
  if(equipStatus) //开
    document.getElementById("divBlokBtn").style.left = 0 + 'px'; 
  else
    document.getElementById("divBlokBtn").style.left = 50 + '%';
 
  drawTextFont(value);  //画中间变化温度
  drawLightLine(getAngel(value));
  drawTriangle(dot.x + length * Math.cos(getAngel(value) - 1 / 15),
      dot.y + length * Math.sin(getAngel(value) - 1 / 15),
      dot.x + length * Math.cos(getAngel(value) + 1 / 15),
      dot.y + length * Math.sin(getAngel(value) + 1 / 15),
      dot.x + (length + 10) * Math.cos(getAngel(value)),
      dot.y + (length + 10) * Math.sin(getAngel(value)), '#34CABE', 'fill'); //画三角
}

//返回对应角度
function getAngel(value){
  var sValue = value - 16;
  return (135+sValue*15)/180*Math.PI;
}


//初始化左侧列表
function leftListMenu(){
	var leftHtml = "";
	controlEquipData.forEach(function(item,index){
		if(index == 0)
		  {
		  	leftHtml  += "<a href=\"#\" class=\"selectedYellow\" index=\""+index+"\">"+item.name+"</a>";
		  	ycp_no_1 = item.ycp_no;
			equipNo_1= item.equipNo;
			equipID_1= item.setNo;
			equipNo_2= item.equipNoOpen;
			equipID_2= item.setNoOpen;
			equipNo_3= item.equipNoClose;
			equipID_3= item.setNoClose;
		  }
	    else
          leftHtml  += "<a href=\"#\"  index=\""+index+"\">"+item.name+"</a>";
	});
	$(".setEquipNumber").append(leftHtml);


}