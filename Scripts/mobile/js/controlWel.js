
var obj = new Object(); //发送数据
var objoriginal = new Object();//原始数据
var fileName="",fileNameURL="";
function controlWel() {
    readyFilePhoto(Pathurl);
    initWel();
    //粗体，斜体
    $("a.icon-bold,a.icon-ital,.verticalSet a").unbind();
    $("a.icon-bold,a.icon-ital,.verticalSet a").bind('click', function() {
        playHome();
        $(this).hasClass("textStyle_selected") ? $(this).removeClass("textStyle_selected") : $(this).addClass("textStyle_selected");
    });
    //颜色选择
    $(".activeSkin").unbind();
    $(".activeSkin").bind('click', function() {
        playHome();
        if ($("#colorSkin").hasClass("displayNone")) weicomeInitAnimation();
        else $("#colorSkin").addClass("displayNone");
    });
    $("#colorSkin a").unbind();
    $("#colorSkin a").bind('click', function() {
        getcolor = $(this).find("i").css("backgroundColor");
        $(".activeSkin").css("background", getcolor);
        $("#colorSkin").addClass("displayNone");
    });
    //定位设置
    $(".horizontalSet a").unbind();
    $(".horizontalSet a").bind("click",function(){
        $(this).addClass("textStyle_selected").parent().siblings().find("a").removeClass("textStyle_selected");
    });
}
// 读取本地图片
function readyFilePhoto(url) {
    var endName = ".jpg|.png";
    var requestAPI = "/GWService.asmx/GetFileStructure";
    var requestData = "filePath=" + url + "&&fileName=" + ".png|.jpg|.JPG";
    JQajaxo("post", requestAPI, true, requestData, successFun);
    function successFun(data) {
        var result = JSON.parse($(data).children("string").html());
        $(".leftPoto").html("");
        if (result != "false") {
            var urlPoto = "",
                htmlPoto = "",
                name = "";
            result.forEach(function(item, index) {
                name = item.split("\\")[item.split("\\").length - 1];
                urlPoto = pathurlAll + "/BGImages/" + name;
                if (index == 0) htmlPoto += "<li><a href=\"#\" onclick=\"selectedImg(this)\" class=\"selectPotoName\" indexid=\""+index+"\"><img src=\"" + urlPoto + "\" alt=\"\"></a></li>";
                else htmlPoto += "<li><a href=\"#\" onclick=\"selectedImg(this)\" indexid=\""+index+"\"><img src=\"" + urlPoto + "\" alt=\"\"></a></li>";
            });
            $(".leftPoto").append(htmlPoto);
        }
    }
}
//图片选择
function selectedImg(that) {
    $(that).addClass("selectPotoName").parent().siblings().find("a").removeClass("selectPotoName");
}
//动画调用
function weicomeInitAnimation() {
    weicomeTestAnim("colorSkin", "flipInX", 200);
}

function weicomeTestAnim(thatId, x, time) {
    setTimeout(function() {
        $('#' + thatId).removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $('#' + thatId).removeClass(x + ' animated');
        });
    }, time);
};
//RGB转16进制 
function colorRGB2Hex(color) {
    var rgb = color.split(',');
    var r = parseInt(rgb[0].split('(')[1]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2].split(')')[0]);
    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
}
//初始化
function initWel(){
    $.ajax({
        type: "POST",
        url: "/GWService.asmx/GetDataTableFromSQL",
        timeout: 5000,
        data: {
            sql: "select top 1 *  from WelcomingSpeech where Type=0 order by ID desc",
            userName: window.localStorage.userName,
        },
        success: function(data) {
            $(".selectPotoName").removeClass("selectPotoName");
            try {
              var dt = $(data).find("siginalVal").text(),result = JSON.parse(dt);
            } catch(e) {}

            if (result != "" && result != null && result != undefined)

              $(".leftPoto a[Indexid=" + result.BackgroundImg + "]").addClass("selectPotoName"); //背景设置
              $(".fontSize").val(result.FontSize); //字大小
              $(".welcomeInput").val(replaceYn(result.Text));

              if(result.CanvasLeft == 0) //左上距离
              {
                $(".icon-fontLeft").addClass("textStyle_selected");
              }
              else if(result.CanvasLeft == 50)
              {
                $(".icon-fontCenter").addClass("textStyle_selected");
              }
              else if(result.CanvasLeft == 100)
              {
                $(".icon-fontRight").addClass("textStyle_selected")
              }
              if(result.CanvasTop == 50)
                {$(".icon-fontRepeat").addClass("textStyle_selected")}
              
              $(".activeSkin").css("background", result.FontColor); //字体颜色
              $("#fontFamily option[data-font='" + result.FontFamily + "']").attr("selected", true); //字体样式
              if (result.FontWeight != "normal") //字体粗体
              {
                  $(".icon-bold").addClass("textStyle_selected");
              }
              if (result.FontStyle != "normal") //字体斜体 
              {
                  $(".icon-ital").addClass("textStyle_selected");
              }

        }
    });
}

//保存欢迎词
function saveWel(that, number){
  dataRuslt();
  var allHTML = "<html>" + "<head>" + "<meta charset=\"utf-8\">" + "<meta http-equiv=\"Expires\" content=\"0\">" + "<meta http-equiv=\"Pragma\" content=\"no-cache\">" + "<meta http-equiv=\"Cache-control\" content=\"no-cache\">" + "<meta http-equiv=\"Cache\" content=\"no-cache\">" + "<title>欢迎词</title>" + "<style type=\"text/css\">" + "*{margin: 0;padding: 0;box-sizing: border-box;}" + ".viewPageContent span{  font-family:" + objoriginal.FontFamily + ";position: absolute;white-space: pre;}" + "</style>" + "</head>" + "<body style=\"overflow: hidden;\">" + "<div style=\"width: 100%;height: 100%;background: url("+ fileNameURL + ") no-repeat center center/100% 100%;\" class=\"viewPageContent\">" + "<span style=\"font-size: " + obj.FontSize + "px;color: " + obj.FontColor + "; left: " + obj.CanvasLeft + "%; top: " + obj.CanvasTop + "%!important; font-weight: " + obj.FontWeight + "; font-style: " + obj.FontStyle + ";transform: translate(-" + obj.transformX + "%,-"+obj.transformY+"%);text-align: "+obj.textLign+";    display: inline-block; \">" + obj.Text + "</span>" + "</div>" + "</body>" + "</html>";
  $.ajax({
      type: "POST",
      url: "/GWService.asmx/ExecuteSQL",
      timeout: 5000,
      data: {
          sql: "insert into WelcomingSpeech(JSONContent,BGImage,Type,siginalVal) values('" + allHTML + "','" + fileName + "','" + number + "','" + JSON.stringify(objoriginal) + "')",
          userName: window.localStorage.userName,
      },
      success: function(data) {
          $(that).attr("disabled", false);
          if ($(that).attr("id") == "viewsSave") {
              get_noNull(that,controlWelData.welView.equipNo,controlWelData.welView.setNo,"");
          }
          var dt = $(data).find('int').text(); //返回受影响行数
          dt == 1?alertMsgSuccess.open():alertMsgError.open();
      }
  });
}

//预览欢迎词
function viewWel(that){
   saveWel(that, 1);
}

//关闭欢迎词
function closeWel(that){
  get_noNull(that,controlWelData.welClose.equipNo,controlWelData.welClose.setNo,"");
}

//数据处理
function dataRuslt(){
//发送数据
obj.Text = replaceLine($(".welcomeInput").val()); //欢迎词  

obj.FontFamily = $("#fontFamily option:selected").attr("data-font"); //字体类型
obj.FontSize = parseInt($(".fontSize").val()); //字体大小
obj.FontWeight = $("a.icon-bold").hasClass("textStyle_selected") ? "bold" : "normal"; //粗体
obj.FontStyle = $("a.icon-ital").hasClass("textStyle_selected") ? "italic" : "normal"; //斜体
getcolor = $(".activeSkin").css("backgroundColor"); //字体颜色
if (getcolor == "" || getcolor == undefined) {
    getcolor = "white";obj.FontColor = getcolor.toString();
} else obj.FontColor = getcolor;//colorRGB2Hex(getcolor);
if($(".icon-fontLeft").hasClass("textStyle_selected")) //左上距离
{
  obj.CanvasLeft = 0;obj.transformX = 0;obj.textLign = "left";
}
else if($(".icon-fontCenter").hasClass("textStyle_selected"))
{
  obj.CanvasLeft = 50;obj.transformX = 50;obj.textLign = "center";
}
else if($(".icon-fontRight").hasClass("textStyle_selected"))
{
  obj.CanvasLeft = 100;obj.transformX = 100;obj.textLign = "right";
}
if($(".icon-fontRepeat").hasClass("textStyle_selected"))
  {obj.CanvasTop = 50; obj.transformY = 50;}
else
  {obj.CanvasTop = 0; obj.transformY = 0;}
fileNameURL = $(".selectPotoName").find("img").attr("src");// 背景图片
if (fileNameURL == undefined) 
  fileNameURL = $(".setBackground div:eq(0)").find("img").attr("src");
fileName = fileNameURL.split("/")[fileNameURL.split("/").length - 1]; //name


//原始数据
objoriginal.Text = replaceLine($(".welcomeInput").val()); //欢迎词
objoriginal.FontFamily = $("#fontFamily option:selected").attr("data-font"); //字体类型
objoriginal.FontSize = parseInt($(".fontSize").val()); //字体大小
objoriginal.FontWeight = $("a.icon-bold").hasClass("textStyle_selected") ? "bold" : "normal"; //粗体
objoriginal.FontStyle = $("a.icon-ital").hasClass("textStyle_selected") ? "italic" : "normal"; //斜体
getcolor = $(".activeSkin").css("backgroundColor"); //字体颜色
if (getcolor == "" || getcolor == undefined) {
    getcolor = "white";objoriginal.FontColor = getcolor.toString();
} else objoriginal.FontColor = getcolor;//colorRGB2Hex(getcolor);
if($(".icon-fontLeft").hasClass("textStyle_selected")) //左上距离
{
  objoriginal.CanvasLeft = 0;objoriginal.transformX = 0;objoriginal.textLign = "left";
}
else if($(".icon-fontCenter").hasClass("textStyle_selected"))
{
  objoriginal.CanvasLeft = 50;objoriginal.transformX = 50;objoriginal.textLign = "center";
}
else if($(".icon-fontRight").hasClass("textStyle_selected"))
{
  objoriginal.CanvasLeft = 100;objoriginal.transformX = 100;objoriginal.textLign = "right";
}
if($(".icon-fontRepeat").hasClass("textStyle_selected"))
  {objoriginal.CanvasTop = 50; objoriginal.transformY = 50;}
else
  {objoriginal.CanvasTop = 0; objoriginal.transformY = 0;}
  objoriginal.BackgroundImg = $(".selectPotoName").attr("indexid");


}


//替换换行符
function replaceLine(value){
  return value.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>');
}
//换行符转\n
function replaceYn(value){
  return value.replace(/&lt;br\/&gt;/g, '\n');
}