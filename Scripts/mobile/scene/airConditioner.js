var width; // 画布宽度
var height; // 画布高度
var dot; // 圆点位置、半径
var benchmark; //圆半径判断基准
var radius; // 刻度圆半径
var circleRadius; // 底层圆半径
var scaleRadius; // 圆环半径
var borderWidth; // 圆边框宽度
var length; // 长度
var clock;
var clockBg;
var clockPointers;
var clockTexts;
var bgCtx;
var ptCtx;
var circleX; //圆点距屏幕原点x坐标
var circleY; //圆点距屏幕原点y坐标

/* 画旋转动态效果 参数定义*/
var flag;
var linePosition;
var count;
var oldAngle;
var oldAngleL;
var newAngle;
var frequency;

function airConditioner() {
	width = $(window).width(); // 桌布宽度
	height = $(".temperature_setup").position().top - $("#clockChoice").position().top; // 桌布高度
	dot = {
		x: parseInt(width / 2),
		y: parseInt(height / 2),
		radius: 6
	}; // 圆点位置、半径
	benchmark = dot.x > dot.y ? dot.y : dot.x;  //用小的半径
	radius = dot.y * 7 / 10; // 圆半径
	circleRadius = benchmark * 1 / 2;

	circleX = dot.x;
	circleY = dot.y + $("#clockChoice").position().top;

	scaleRadius = benchmark * 2 / 3; // 圆半径
	borderWidth = radius / 20; // 圆边框宽度
	length = circleRadius * 3 / 4;
	clock = document.getElementById('clockChoice');
	$("#clockChoice").html(""); //清空填充内容，以再次填充
	clockBg = document.createElement('canvas');
	clockPointers = document.createElement('canvas');
	clockTexts = document.createElement('canvas');
	//
	//
	//
	//
	//
	clockTexts.width=clockPointers.width = clockBg.width = width;
	clockTexts.height = clockPointers.height = clockBg.height = height;
	clockPointers.style.position = 'absolute';
	clockPointers.style.left = 0;
	clockPointers.style.right = 0;
	clockTexts.style.position = 'absolute';
	clockTexts.style.left = 0;
	clockTexts.style.right = 0;

	clock.appendChild(clockBg);
	clock.appendChild(clockTexts);
	clock.appendChild(clockPointers);
	
	bgCtx = clockBg.getContext('2d');
	ptCtx = clockPointers.getContext('2d');
	textCtx=clockTexts.getContext('2d');

	drawCircle();
	drawScale();
	drawLightLine();
	drawDescFont();
	drawLightCirrle();
	drawTextFont(25);
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
	
	/*$("#divBlokBtn").bind('touchend',function(){
		if($("#mycheckbox").is(':checked')){
			$("#divBlokBtn").css({right: '0.5%'});
			$("#mycheckbox").attr("checked", false);
		}else{
			$("#divBlokBtn").css({right: '50%'})
			$("#mycheckbox").attr("checked", true);
		}
	});*/
   //===================================================================
   //============================发送命令===============================
   //===================================================================






}

function movEnding(e) {
	frequency = 0;
	flag = false;
	linePosition = 0;
	count = 0;
}

function moving(e) {

	evt = e.touches[0];
	var mx = evt.pageX; //触摸点横坐标
	var my = evt.pageY; //触摸点纵坐标
	/*var mx = e.layerX;
	var my = e.layerY;*/
	var sx = circleX; //圆盘横坐标
	var sy = circleY; //圆盘纵坐标
	var jiaodu = 0; //当前触摸点对应原点角度
	var jiaoduR = 15; //刻度间隔角度
	var jiaoduNum = 0; //指钟对应刻度角度
	var realAngle = 0; //角度正切值
	var pi2 = Math.PI / 2; //90°
	var pi4 = Math.PI / 4; //45°
	var pi43 = Math.PI * 3 / 4; //135°
	var lowLineLength = benchmark * 7 / 10 - borderWidth / 2;
	var linelen = radius / 7; //线条长度
	var realJiaoDu = 0;
	var scales = 0; //刻度值

	ptCtx.clearRect(0, 0, width, height);
	var angle = Math.atan2((my - sy), (mx - sx));
	/*获取当前触摸点对应原点角度*/
	jiaodu = 180 * (angle / Math.PI);

	if(jiaodu % jiaoduR < jiaoduR / 2) {
		/*角度范围四舍五入不变*/
		jiaoduNum = parseInt(jiaodu / jiaoduR);
		realJiaoDu = jiaoduNum * jiaoduR;
		
	} else {
		/*角度范围四舍五入+1*/
		jiaoduNum = parseInt(jiaodu / jiaoduR) + 1;
		realJiaoDu = (parseInt((360 + jiaodu) / jiaoduR) + 1) * jiaoduR;
		//		scales=(parseInt( / jiaoduR) + 1-135)/jiaoduR+1;
		//		scales=((parseInt((360+jiaodu) / jiaoduR) + 1)*jiaoduR-135)/jiaoduR+1;
	}
	/*还原atan数值*/
	realAngle = jiaoduNum * jiaoduR * Math.PI / 180;

	if(flag) {

		checkDirectionR(mx, sx, my, sy, angle);
	}

	if(angle > pi4 && angle < pi2 && linePosition != 4) { //>45 && <90
		flag = true;
		linePosition = 2;
	}

	if(angle >= pi2 && angle < pi43 && linePosition != 2) {  //>=90 && <135
		flag = true;
		linePosition = 4;
	}
    
	if((angle >= pi43 || angle < pi4) && count <= 0) {

		drawTriangle(dot.x + length * Math.cos(realAngle - 1 / 15),
			dot.y + length * Math.sin(realAngle - 1 / 15),
			dot.x + length * Math.cos(realAngle + 1 / 15),
			dot.y + length * Math.sin(realAngle + 1 / 15),
			dot.x + (length + 10) * Math.cos(realAngle),
			dot.y + (length + 10) * Math.sin(realAngle), '#34CABE', 'fill');  //画箭头

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

	var perimeter = 360 * frequency; //圈数

	if(mx > sx && my > sy) { //鼠标在第二象限
		newAngle = angle * 180 / Math.PI;
		console.log(222);
	}
	if(mx < sx && my > sy) { //鼠标在第四象限
		newAngle = angle * 180 / Math.PI;
		console.log(444);
	}
	if(mx < sx && my < sy) { //鼠标在第三象限
		newAngle = 360 + angle * 180 / Math.PI;
		console.log(333);
	}
	if(mx > sx && my < sy) { //鼠标在第一象限
		newAngle = 360 + angle * 180 / Math.PI;
		console.log(newAngle);
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
	var grd = bgCtx.createRadialGradient(dot.x, dot.y, radius / 4, dot.x, dot.y, radius / 2);
	grd.addColorStop(0, '#213043');
	grd.addColorStop(1, '#2C3B4B');
	bgCtx.fillStyle = grd;
	bgCtx.shadowBlur = 5;
	//	bgCtxshadowOffsetX =0;
	bgCtx.shadowColor = "#202A37";
	bgCtx.fill();
}

/* 画文本字体 */
function drawDescFont() {
	//设置字体样式
	bgCtx.font = "1.2rem 'PingFang Regular'"; //20px '微软雅黑' 
	//设置字体填充颜色
	bgCtx.fillStyle = "#FFFFFF";
	var lenR = benchmark * 7 / 10;
	//从坐标点(50,50)开始绘制文字
	bgCtx.fillText("16", dot.x - lenR * Math.sin(45) - 8, dot.y + lenR * Math.sin(45) + 8);
	bgCtx.fillText("20", dot.x - lenR - 5 * borderWidth, dot.y - 5 * borderWidth);
	bgCtx.fillText("25", dot.x - 9, dot.y - lenR - 2 * borderWidth);
	bgCtx.fillText("30", dot.x + lenR + 2 * borderWidth, dot.y - 5 * borderWidth);
	bgCtx.fillText("34", dot.x + lenR * Math.sin(45) - 8, dot.y + lenR * Math.sin(45) + 8);

	
	/*bgCtx.font = "0.6rem '宋体'";
	bgCtx.shadowBlur=5;
	bgCtxshadowOffsetX =0;
	bgCtx.shadowColor="#25313c";
	bgCtx.fillStyle = "#9f9f9f";
	bgCtx.fillText("设定温度", dot.x-4*borderWidth, dot.y-3*borderWidth);*/
}

/* 画文本字体 */
function drawTextFont(number) {
	textCtx.clearRect(0, 0, width, height);
	textCtx.font = "1.8rem '宋体'";
	textCtx.fillStyle = "#dbad38";
//	textCtx.shadowBlur = 5;
//	textCtx.shadowOffsetX = 0;
//	textCtx.shadowColor = "#25313c";
	textCtx.fillText(number, dot.x - 4.5 * borderWidth, dot.y + 1.5 * borderWidth);
	textCtx.font = "1rem '宋体'";
//	textCtx.shadowBlur = 5;
//	textCtx.shadowOffsetX = 0;
//	textCtx.shadowColor = "#25313c";
//	textCtx.fillStyle = "#9f9f9f";
	textCtx.fillText("℃", dot.x + 2 * borderWidth, dot.y + 1.5 * borderWidth);
}


/* 画圆环 */
function drawLightCirrle() {
	bgCtx.beginPath();
	bgCtx.lineWidth = 3;
	bgCtx.strokeStyle = '#34CABE';
	bgCtx.shadowBlur = 2;
	bgCtx.shadowOffsetX = 0;
	bgCtx.shadowColor = "#000";
	bgCtx.arc(dot.x, dot.y, length, 0, 2 * Math.PI, true);
	bgCtx.closePath();
	bgCtx.stroke();

	var circleAngle = Math.atan2(-1, 0);
	drawTriangle(dot.x + length * Math.cos(circleAngle - 1 / 15),
		dot.y + length * Math.sin(circleAngle - 1 / 15),
		dot.x + length * Math.cos(circleAngle + 1 / 15),
		dot.y + length * Math.sin(circleAngle + 1 / 15),
		dot.x + (length + 10) * Math.cos(circleAngle),
		dot.y + (length + 10) * Math.sin(circleAngle), '#34CABE', 'fill');
}

function drawTriangle(x1, y1, x2, y2, x3, y3, color, type) {
//	console.log(x1+","+ y1+","+ x2+","+ y2+","+ x3+","+ y3+","+ color+","+ type);
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
			angle += Math.PI / 24; // 每次递增1/30π
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
		//			alert(i);
		tmp = benchmark * 7 / 10 - borderWidth / 2; // 因为圆有边框，所以要减去边框宽度
		bgCtx.moveTo(
			dot.x + tmp * Math.cos(angle),
			dot.y + tmp * Math.sin(angle)
		);
		tmp -= len;
		bgCtx.lineTo(dot.x + tmp * Math.cos(angle), dot.y + tmp * Math.sin(angle));
		bgCtx.stroke();
		bgCtx.closePath();

		angle += Math.PI / 24; // 每次递增1/30π
	}
}

/* 画亮度线 */
function drawLightLine() {
	/* 画长亮度线 */
	/*ptCtx.beginPath();
	ptCtx.moveTo(dot.x, dot.y);
	ptCtx.lineWidth = 4;

	var angle = Math.atan2(-1, 0);
	ptCtx.lineTo(dot.x + length * Math.cos(angle), dot.y + length * Math.sin(angle));
	ptCtx.strokeStyle = '#34CABE';
	ptCtx.stroke();
	ptCtx.closePath();*/

	/* 画短亮度线 */
	var angle = Math.atan2(-1, 0);
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