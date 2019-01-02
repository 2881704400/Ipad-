function Video() {
    if ($("#Video_tree").find("li").length == 0) {
        equipVideo();
    }
    $$('#Video_content_ref').on("refresh", refresh_Video);

    toolbarActive('VideoTool');
}

function refresh_Video(e) {
    setTimeout(function () {
        initEnsureChonglian(function () {
            //allEquipSatatus();
        });

        // 加载完毕需要重置
        myApp.pullToRefreshDone(e);
    }, 2000);
}

var tableVideoConfig;
function equipVideo() {
    var _url = service + "/VideoConfigs";
    var _data = "data=equip";
    function _sccess(data) {
        tableVideoConfig = new Array();
        var result = $$(data).children("string").text();
        if (result != "false") {
            var newRow = "";
            var usera = JSON.parse(result);
            for (var i = 0; i < usera.length; i++) {
                var userb = usera[i];
                var jsonString = JSON.stringify(userb);
                var userc = new Array(userb.equip_no, userb.equip_nm, userb.local_addr, userb.equip_addr);
                tableVideoConfig[i] = userc;
                newRow += "<li class=\"accordion-item\"><a dll='" + userb.communication_drv + "' href=\"#\" onclick='onVideoShow(this,\"" + userc[0] + "\",\"" + userb.communication_param + "\",\"" + userb.Reserve1 + "\")' class=\"item-link item-content\">";
                newRow += "<div class=\"item-media\"><i class=\"iconfont icon-xiayiye rt_listIcon\"></i></div>";
                newRow += "<div class=\"item-inner\"><div class=\"item-title\">" + userc[1] + "</div></div></a>";
                
				if(userb.communication_drv=='HikYun.NET.dll'){
				    //AccessToken(userb.communication_param,'videoList_'+i);
					newRow += "<div class=\"accordion-item-content rt_tree_1\"><div class=\"list-block\"><ul id='videoList_"+i+"' dll='"+userb.communication_drv+"'></ul></div></div>";
				}
				else{
					newRow += "<div class=\"accordion-item-content rt_tree_1\"><div class=\"list-block\"><ul id='videoList_"+i+"' jsonString='" + jsonString + "' dll='"+userb.communication_drv+"'></ul></div></div>";
				}
                newRow += "</li>";
            }
            $('#Video_tree').append(newRow);
        }
    }
    JQajaxo("post", _url, true, _data, _sccess);
}
//展开节点
function onVideoShow(dt, equip_no, key, accessToken) {
	var dll = $(dt).attr('dll');
	var ul = $(dt).next().children('div').children('ul');
	if (ul.children('li').length == 0) {
	    if (dll == 'HikYun.NET.dll') {
	        //获取AccessToken密钥
	        var keys = key.split('-');
	        var appKey = keys[0];
	        var appSecret = keys[1];
			ul.attr('appKey', appKey);
			ul.attr('appSecret', appSecret);
			ul.attr('accessToken', accessToken);
			videoListLi(dll, equip_no, dt);
			//$.ajax({
			//		url: '/GWServices.asmx/PostData',
			//		data: {
			//			url: 'https://open.ys7.com/api/lapp/token/get',
			//			value: 'appKey=' + appKey + '&appSecret=' + appSecret
			//		},
			//		type: 'post',
			//		success: function (data) {
			//			var str = $(data).find('string').text();
			//			var usera = JSON.parse(str);
			//			var accessToken='';
			//			if(usera.code=='200'){
			//				accessToken = usera.data.accessToken;
			//				window.localStorage.accessToken=accessToken;
			//			}
			//			else{
			//				accessToken=window.localStorage.accessToken;
			//			}
			//			ul.attr('accessToken', accessToken);
			//			videoListLi(dll, equip_no, dt);
			//		}
			//	});
	        
	    }
	    else {
	        videoListLi(dll, equip_no, dt);
	    }
	}
}

//添加节点
function videoListLi(dll,equip_no,dt){
	var ul = $(dt).next().children('div').children('ul');
	var _url = service + "/VideoConfigs";
	var _data = "data=" + equip_no;
	function _sccess(data) {
		var result = $(data).children("string").text();
		if (result != "false") {
			var usera = JSON.parse(result);
			for (var i = 0; i < usera.length; i++) {
				var userb = usera[i];
				var jsonString = JSON.stringify(userb)
				var userc = new Array(userb.EquipNum, userb.ID, userb.ChannelName, userb.ChannelType, userb.ChannelNum, userb.ControlEquip, userb.Path);
				var newRow = "";
				if(dll=='HikYun.NET.dll'){
					newRow += "<li><a href=\"#\" equip_no='"+equip_no+"' ChannelType='"+userb.ChannelType+"' ids='"+userb.ID+"' ChannelNum='"+userb.ChannelNum+"' onclick='videoListClick(this)' class=\"item-link item-content\">";
				}
				else{
					newRow += "<li><a href=\"#\" jsonString='" + jsonString + "' onclick='videoListClick(this)' class=\"item-link item-content\">";
				}
				newRow += "<div class=\"item-media\"><i class=\"iconfont icon-shipin rt_listIcon\"></i></div>";
				newRow += "<div class=\"item-inner\"><div class=\"item-title\">" + userc[2] + "</div></div></a>";
				newRow += "</li>";
				if (Browse_Equip_List(equip_no) || Browse_SpecialEquip_List(equip_no, userb.ID)){
					ul.append(newRow);
				}
			}                
		}
		$(dt).next().css('height', 'auto');
	}
	JQajaxo("post", _url, true, _data, _sccess);
}

//节点事件
function videoListClick(dt) {
	var titleName = $(dt).find('.item-title').text();
	var dll = $(dt).parent().parent().attr('dll');
	if(dll=='HikYun.NET.dll'){
		var address='';
		var equip_no = $(dt).attr('equip_no');
		var ids = $(dt).attr('ids');
		
		var accessToken = $(dt).parent().parent().attr('accessToken');
		var appkey = $(dt).parent().parent().attr('appkey');
		var appsecret = $(dt).parent().parent().attr('appsecret');
		var ChannelType = $(dt).attr('ChannelType');
		var ChannelNum = $(dt).attr('ChannelNum');
		var datas = {
		    'accessToken': accessToken,
		    'appkey': appkey,
		    'appsecret': appsecret,
		    'ChannelNum': ChannelNum,
		    'ChannelType': ChannelType,
		    'cameraName': titleName
		}
		var jsonString = JSON.stringify(datas);
	    try{
	        myJavaFun.HikYunVideoShow(jsonString);
	    }
	    catch (ex) {
	        alert('请更新APP客户端或者使用APP客户端打开！');
	    }
	}
	else{
		var equip = $(dt).parent().parent().attr('jsonString');
		var video = $(dt).attr('jsonString');
		var json = '{"equip":' + equip + ',"video":' + video + '}';
		try{
			myJavaFun.VideoShow(json);
		}
		catch (ex) {
			alert('请更新APP客户端或者使用APP客户端打开！');
		}
	}
}

function onVideoClick(){
	 var video=document.getElementById("videoPlay");
	 if(video.controls){
		 video.controls=false;
	 }
	 else{
		 video.controls=true;
	 }
}

//控制按钮
function controlsBtn(equip_no,Video_id){
	if (Control_Equip_List(equip_no) || Control_SetItem_List(equip_no, false)) {
		$('.videoControls').find('a').each(function(){
			var values=$(this).attr('values');
			$(this).attr('ontouchstart','onSetCommand('+equip_no+',"'+Video_id+'","'+values+'","true","'+window.localStorage.userName+'")');
			$(this).attr('ontouchend','onSetCommand('+equip_no+',"'+Video_id+'","'+values+'","false","'+window.localStorage.userName+'")');
		});
		
		$('.videoControls2').find('img').each(function(){
			var values=$(this).attr('values');
			$(this).attr('ontouchstart','onSetCommand('+equip_no+',"'+Video_id+'","'+values+'","true","'+window.localStorage.userName+'",this)');
			$(this).attr('ontouchend','onSetCommand('+equip_no+',"'+Video_id+'","'+values+'","false","'+window.localStorage.userName+'",this)');
		});
    }
}

//设置命令-确定
function onSetCommand(str_1, str_2, str_3, str_4, dt,thisDom) {
	if(thisDom){
		var act=$(thisDom).attr('actives').split('_');
		if(act[1]=="j"){
			var imgNm=act[0]+'_jv_'+act[2];
			$(thisDom).attr('actives',imgNm);
			$(thisDom).attr('src','/Image/video/'+imgNm+'.png');
		}
		else{
			var imgNm=act[0]+'_j_'+act[2];
			$(thisDom).attr('actives',imgNm);
			$(thisDom).attr('src','/Image/video/'+imgNm+'.png');
		}
	}
    var userName = window.localStorage.userName;
    if (userName == null || userName == "") {
        userName = window.sessionStorage.userName;
    }
    var _url = service + "/SetupsCommand";
    var _dataSet = "equip_no=" + encodeURIComponent(str_1) + "&&main_instruction=" + encodeURIComponent(str_2) + "&&minor_instruction=" + encodeURIComponent(str_3) + "&&value=" + encodeURIComponent(str_4) + "&&user_name=" + encodeURIComponent(userName);
    JQajaxo("post", _url, true, _dataSet, _successfSet);
    function _successfSet(data) {
        var resultJs = $(data).children("string").text();
        if (resultJs != "false") {
            
        }
    }
}