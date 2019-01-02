//首页事件
var Value, getID, voiceSet;
var lostLen = 32750;
var startLen = 270;

function onHomePage() {
    // myApp.router.navigate('/controlEquip/'); 

    $('html').removeClass('with-statusbar-overlay').addClass("with-statusbar");
    //授权名称
    var ajaxVar = $.ajax({
        type: "POST",
        url: "/GWService.asmx/GetName2SFService",
        timeout: 5000,
        data: { userName: window.localStorage.userName,},
        success: function (data) {
            var dt = $(data).find('string').text();
            if(dt)
               $(".auth_name_get").text(dt);
            else
               $(".auth_name_get").text("AlarmCenter");
        }
    });

    try {
        myJavaFun.setOrientation();
    } catch (ex) {}

    $(".bottomMenu a").unbind();
    $(".bottomMenu a").bind("click", function() {
        $(this).addClass("active").siblings().removeClass("active");
    });
    //语音
    $(".exitVoice").unbind();
    $(".exitVoice").bind("click", function() {
        playHome();
        $("#footer").removeClass("footerDis");
        document.getElementById("voiceBtn").removeEventListener('touchstart', onTouchStart);
        document.getElementById("voiceBtn").removeEventListener('touchend', onTouchEnd);
        $("#voiceMessage").html("按住说话");
    });
    //讲解
    autoExplain.forEach(function(item,index){
        $("."+item.className).unbind();
        $("."+item.className).bind("click", function() {
            get_noNull(this,item.equipNo,item.setNo,"");
        });         
    });
    initMenu();
}
//初始化菜单
function initMenu() {
 var html =  "";  
  homeData.forEach(function(item,index){
      html +=  "<li class=\"col-25\" style=\"visibility:"+item.displayView+"\">"+
              "<a href =\""+item.url+"\" set_no=\""+item.setNo+"\" set_equip=\""+item.equipNo+"\" onclick=\"clickMenu(this)\"><img src=\""+item.checkedICON+"\" /></a>"+
              "<a href =\""+item.url+"\" set_no=\""+item.setNo+"\" set_equip=\""+item.equipNo+"\" class=\"displayNone\"><img src=\""+item.UncheckedICON+"\" /></a>"+
             "</li>";   
  });
  $(".homeExhibition").append(html);
}
//点击菜单
function clickMenu(that){
    //menu状态切换
    $(that).addClass("displayNone").siblings().removeClass("displayNone");
    var set_equipX = $(that).attr("set_equip");
    var set_noX = $(that).attr("set_no");
    if(set_equipX==1007&&set_noX==1){
    	playHome();
    	if($(".explainControl").is(":visible")){
    		$(".explainControl").slideUp(300);
    	}else{
    		$(".explainControl").slideDown(300);
    	}
    	setTimeout(function(){
    		if($(that).parent().parent().hasClass("homeExhibition"))
                   $(that).removeClass("displayNone").siblings().addClass("displayNone");
    	},100)
    }else{
    	get_no(that,"");
    }
}
function getNumberPanel(that) {
    $(that).addClass("selectPanel").parent().siblings().find("a").removeClass("selectPanel");
    $(".videoCenter input").val($(that).find("div.col-0").html());
}
//界面尺寸变化事件
function onResizeCustomized() {
    if ($(".view-main").attr("data-page") == "Voice") {
        var heightWindow = $(".page-content").height();
        if (heightWindow < 500) {
            $(".voiceDivs").css("height", "100%");
            $(".voiceDivs").css("bottom", "40px");
            $(".voiceDivs").css("position", "relative");
        } else {
            $(".voiceDivs").css("height", "300px");
            $(".voiceDivs").css("bottom", "60px");
            $(".voiceDivs").css("position", "absolute");
        }
    }
}
// ===============================================
// =====================动画函数==================
// ===============================================
function initAnimation() { //可优化
    testAnim("animationSandbox1", "bounceInLeft", 500);
    testAnim("animationSandbox2", "bounceInDown", 700);
    testAnim("animationSandbox3", "bounceInUp", 900);
    testAnim("animationSandbox4", "rollIn", 1100);
    testAnim("animationSandbox5", "lightSpeedIn", 800);
    testAnim("animationSandbox6", "bounceInDown", 500);
    testAnim("animationSandbox7", "bounceInDown", 700);
    testAnim("animationSandbox8", "bounceInDown", 400);
    testAnim("animationSandbox9", "bounceInDown", 600);
    testAnim("animationSandbox10", "fadeInUp", 400);
    testAnim("animationSandbox11", "fadeInUp", 1100);
    testAnim("animationSandbox12", "fadeInUp", 500);
    testAnim("animationSandbox13", "fadeInUp", 900);
}
//动画调用
function testAnim(thatId, x, time) {
    setTimeout(function() {
        $('#' + thatId).removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $('#' + thatId).removeClass(x + ' animated');
        });
    }, time);
};
 // ===============================================
 // ===================语音控制====================
 // ===============================================
function Ipadvoice() {
    playHome();
    $("#footer").addClass("footerDis");
    Voice();
}

function Voice() {
    document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
    document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
    if (!window.localStorage.voiceList) {
        window.localStorage.voiceList = "1";
    }
    $("#voiceList").find("option").each(function() {
        if ($(this).attr("value") == window.localStorage.voiceList) {
            $(this).attr("selected", true);
            $("#voiceListName>.item-after").html($(this).html());
        }
    });
    try {
        myJavaFun.VoiceOpen();
    } catch (ex) {}
}

function onVoiceList() {
    window.localStorage.voiceList = $("#voiceList").find("option:selected").attr("value");
}
var isVoices = false;
//按住开始说话
function onTouchStart() {
    AddvoiceAlet();
    $(this).addClass("voiceActive");
    $("#voiceMessage").hide();
    $("#waveAnim").show();
    try {
        isVoices = true;
        myJavaFun.StartVoice(1);
    } catch (ex) {
        $("#voiceMessage").html("无法使用此功能，请下载最新app！");
    }
}
//释放手指并识别语音
function onTouchEnd() {
    voiceSet = setTimeout(function() {
        RemovevoiceAlet();
    }, 3000);
    if (!isVoices) {
        return;
    }
    if ($(this).hasClass("voiceActive")) {
        $(this).removeClass("voiceActive");
        $("#voiceMessage").show();
        $("#voiceMessage").html("正在识别…");
        $("#waveAnim").hide();
    }
    document.getElementById("voiceBtn").removeEventListener('touchstart', onTouchStart);
    document.getElementById("voiceBtn").removeEventListener('touchend', onTouchEnd);
    setTimeout(function() {
        try {
            myJavaFun.StopVoice();
        } catch (ex) {
            isVoices = false;
            $("#voiceMessage").html("无法使用此功能，请下载最新app！");
            document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
            document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
            setTimeout(function() {
                if (isVoices == false) {
                    $("#voiceMessage").html("按住说话");
                    document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
                    document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
                }
            }, 3000);
        }
    }, 50);
}
function StartVoiceXF() {
    try {
        $("#voiceBtn_xf").unbind();
        $("#voiceBtn_xf").addClass("disabled");
        $("#waveAnim_xf").show();
        $("#voiceMessage_xf1").hide();
        $("#voiceMessage_xf2").hide();
        myJavaFun.StartViceXF(parseInt(window.localStorage.XFOffline));
    } catch (ex) {
        $("#waveAnim_xf").hide();
        $("#voiceMessage_xf1").html("无法使用此功能！");
        $("#voiceBtn_xf").removeClass("disabled");
        $("#voiceMessage_xf1").show();
        $("#voiceMessage_xf2").html("");
        $("#voiceMessage_xf2").show();
    }
}

function callbackVoiceXFMessage(dt) {
    $("#voiceMessage").html(dt);
    $("#voiceMessage").show();
    $("#waveAnim").hide();
    isVoices = false;
    document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
    document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
}

function callbackVoiceXFData(dt) {
    // myApp.alert(dt+"hhhhhhhhhh");
    var _url = "/GWServices.asmx/ServiceSetVCtrol1";
    var _data = "audioData=" + dt + "&&userName=" + window.localStorage.userName;
    ajaxService("post", _url, true, _data, _successf, _error);

    function _successf(data) {
        var rets = $(data).children("string").text();
        if (rets == "") {
            $("#voiceMessage").html("处理：未识别！");
        } else {
            $("#voiceMessage").html("处理：" + rets);
        }
        isVoices = false;
        document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
        document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
    }

    function _error(qXHR, textStatus, errorThrown) {
        //myApp.alert(textStatus+","+errorThrown);
        $("#voiceMessage").html("服务器出错！");
        isVoices = false;
        document.getElementById("voiceBtn").addEventListener('touchstart', onTouchStart);
        document.getElementById("voiceBtn").addEventListener('touchend', onTouchEnd);
        setTimeout(function() {
            if (isVoices == false) {
                $("#voiceMessage").html("按住说话");
            }
        }, 3000);
    }
}
//语音弹框
function AddvoiceAlet() {
    clearInterval(voiceSet);
    $(".viiceParent").parent().removeClass("displayNone");
}

function RemovevoiceAlet() {
    $(".viiceParent").parent().addClass("displayNone");
    voiceSet = null;
}
// ===============================================
// =====================音量相关==================
// ===============================================
// //音量变化
// function changeInput(a) {
//     var len = ($(a).val() - $(a).attr("min")) / ($(a).attr("max") - $(a).attr("min"));
//     $(a).parent().prev().html($(a).val());
//     $(a).css("background-size", len * 100 + "%" + " 100%");
//      Value = parseInt($("#outputValue").html()) * startLen + lostLen;
//     if (Value == lostLen)
//         $("#IntelligenceRange").addClass("inputRangeY")
//     else
//         $("#IntelligenceRange").removeClass("inputRangeY")
//     //静音和取消去色
//     $(".audioSet a").removeClass("selectedColor");
// }
// //历史纪录音量
// function historyVolume() {
//     var set_noValue = $("#IntelligenceRange").attr("set_no");
//     var set_ylequipX = $("#IntelligenceRange").attr("set_equip");
//     if (Control_Equip_List(set_ylequipX) || Control_SetItem_List(set_ylequipX, false)) {
//         var _url = "/GWService.asmx/RealTimeData";
//         var _dataSet = "selectedEquipNo=" + set_ylequipX + "&&tableName=Set";
//         JQajaxo("post", _url, true, _dataSet, _successfSet);
//         function _successfSet(data) {
//             var resultJs = $(data).children("string").text();
//             if (resultJs != "false" && resultJs != "") {
//                 /*开始*/
//                 var usera = JSON.parse(resultJs);
//                 for (var i = 0; i < usera.length; i++) {
//                     var userb = usera[i];
//                     if (userb.set_no == set_noValue) //set_no
//                     {
//                         var userc = new Array(userb.set_nm, userb.main_instruction, userb.minor_instruction, userb.value, userb.set_type);
//                         var set_nos1 = Control_Equip_List(set_noValue);
//                         var set_nos2 = Control_SetItem_List(set_noValue, userb.set_no);
//                         if (set_nos1 || set_nos2) {
//                             //  alert(userc[3]);
//                             $("#IntelligenceRange").css("background-size", (userc[3] - lostLen) / startLen + "%" + " 100%").val((userc[3] - lostLen) / startLen);
//                             $("#outputValue").val((userc[3] - lostLen) / startLen);
//                         }
//                     }
//                 }
//                 /*结束*/
//             }
//         }
//     }
//     else { }
// }
// ===============================================
// =====================执行命令==================
// ===============================================
//执行命令
// function get_no(a) {
//     if (!$(a).hasClass("Conference_selectedBG") && !$(a).hasClass("Conference_selectedCO")) {
//         playHome();
//         var set_equipX = $(a).attr("set_equip");
//         var set_noX = $(a).attr("set_no");
//         if (set_noX != "") GetSetParmItem(set_equipX, set_noX);
//     }
// }
// //获取结果集合
// function GetSetParmItem(equip_no, set_no) {
//     if (Control_Equip_List(equip_no) || Control_SetItem_List(equip_no, false)) {
//         var _url = "/GWServices.asmx/GetSetParmItem";
//         var _dataSet = "equip_no=" + equip_no + "&&set_no=" + set_no;
//         JQajaxo("post", _url, true, _dataSet, _successfSet);

//         function _successfSet(data) {
//             var resultJs = $(data).children("string").text();
//             if (resultJs != "false" && resultJs != "") {
//                 var userResultJs = JSON.parse(resultJs);
//                 onSetCommand(equip_no, userResultJs[0].main_instruction, userResultJs[0].minor_instruction, userResultJs[0].value, userResultJs[0].set_nm);
//             }
//         }
//     }
// }
// //设置命令-确定
// function onSetCommand(str_1, str_2, str_3, str_4, text) {
//     var vals = str_4;
//     var userName = window.localStorage.userName;
//     if (userName == null || userName == "") {
//         userName = window.sessionStorage.userName;
//     }
//     var _url = "/GWServices.asmx/SetUpdateS";
//     var _dataSet = "set_nm=" + encodeURIComponent(str_1) + "&&main_instruction=" + encodeURIComponent(str_2) + "&&minor_instruction=" + encodeURIComponent(str_3) + "&&values=" + encodeURIComponent(vals) + "&&usern=" + encodeURIComponent(userName);
//     JQajaxo("post", _url, true, _dataSet, _successfSet);

//     function _successfSet(data) {
//         console.log(str_1 + "," + str_2 + "," + str_3 + "," + str_4 + "," + text);
//         var resultJs = $(data).children("string").text();
//         if (resultJs != "false") {}
//     }
// }
//声音调用
function playHome() {
    setTimeout(function() {
        var audio = document.getElementById("audio");
        audio.currentTime = 0;
        audio.play();
    }, 100);
}