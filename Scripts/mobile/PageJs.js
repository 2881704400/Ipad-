/*================================智能中控=========================================*/

//空调控制
$(document).on("page:beforein", ".page[data-page='airConditioner']", function (e) {
    initPageJS('airConditioner', '/Scripts/mobile/scene/');
});

//空调控制
$(document).on("page:beforein", ".page[data-page='airConditionerIpad']", function (e) {
    initPageJS('airConditionerIpad', '/Scripts/mobile/scene/');
});

//智能中控
$(document).on("page:beforein", ".page[data-page='intelligentControl']", function (e) {
    initPageJS('intelligentControl', '/Scripts/mobile/scene/');
});

//智能中控
$(document).on("page:beforein", ".page[data-page='intelligentControlIpad']", function (e) {
    initPageJS('intelligentControlIpad', '/Scripts/mobile/scene/');
});

//大屏控制
$(document).on("page:beforein", ".page[data-page='bigScreenIndex']", function (e) {
    initPageJS('bigScreenIndex', '/Scripts/mobile/scene/');
});
$(document).on("page:beforein", ".page[data-page='bigScreen']", function (e) {
    initPageJS('bigScreen', '/Scripts/mobile/scene/');
});
$(document).on("page:beforein", ".page[data-page='bigScreenScene']", function (e) {
    initPageJS('bigScreenScene', '/Scripts/mobile/scene/');
});

//大屏控制Ipad端
$(document).on("page:beforein", ".page[data-page='bigScreenIpad']", function (e) {
    initPageJS('bigScreenIpad', '/Scripts/mobile/scene/');
});

//灯光控制
$(document).on("page:beforein", ".page[data-page='lighting']", function (e) {
    initPageJS('lighting', '/Scripts/mobile/scene/');
});

//灯光控制
$(document).on("page:beforein", ".page[data-page='lightingIpad']", function (e) {
    initPageJS('lightingIpad', '/Scripts/mobile/scene/');
});




/*================================会议管理=========================================*/
//欢迎词
$$(document).on("page:beforein", ".page[data-page='welcomeWords']", function (e) {
    initPageJS('welcomeWords', '/Scripts/mobile/js/');
});
//PPT 
$$(document).on("page:beforein", ".page[data-page='mettingPPT']", function (e) {
    initPageJS('mettingPPT', '/Scripts/mobile/js/');
});
$$(document).on("page:beforein", ".page[data-page='mettingDetails']", function (e) {
    initPageJS('mettingDetails', '/Scripts/mobile/js/');
});


//会议安排
$$(document).on("page:beforein", ".page[data-page='meetingArrange']", function (e) {
    initPageJS('meetingArrange', '/Scripts/mobile/js/');
});
//电子桌牌
$$(document).on("page:beforein", ".page[data-page='tableCard']", function (e) {
    initPageJS('tableCard', '/Scripts/mobile/js/');
});

/*================================视频监控=========================================*/
$$(document).on("page:beforein", ".page[data-page='vedioControl']", function (e) {
    initPageJS('vedioControl', '/Scripts/mobile/js/');
});
$$(document).on("page:beforein", ".page[data-page='vedioControlchild']", function (e) {
    initPageJS('vedioControlchild', '/Scripts/mobile/js/');
});
$$(document).on("page:beforein", ".page[data-page='viceHandle']", function (e) {
    initPageJS('viceHandle', '/Scripts/mobile/js/');
});
$$(document).on("page:beforein", ".page[data-page='viceHandleIpad']", function (e) {
    initPageJS('viceHandleIpad', '/Scripts/mobile/js/');
});
$$(document).on("page:beforein", ".page[data-page='meetingClassChild1']", function (e) {
    initPageJS('meetingClassChild1', '/Scripts/mobile/js/');
});
$$(document).on("page:beforein", ".page[data-page='meetingClassChild2']", function (e) {
    initPageJS('meetingClassChild2', '/Scripts/mobile/js/');
});
$$(document).on("page:beforein", ".page[data-page='meetingClassChild11']", function (e) {
    initPageJS('meetingClassChild11', '/Scripts/mobile/js/');
});
$$(document).on("page:beforein", ".page[data-page='meetingClassChild22']", function (e) {
    initPageJS('meetingClassChild22', '/Scripts/mobile/js/');
});



/*================================新增=========================================*/
//备份文件
$$(document).on("page:beforein", ".page[data-page='backupfile']", function (e) {
    initPageJS('backupfile', '/Scripts/mobile/scene/');
});
//体感控制
$$(document).on("page:beforein", ".page[data-page='feelControl']", function (e) {
    initPageJS('feelControl', '/Scripts/mobile/scene/');
});
//总裁驾驶舱
$$(document).on("page:beforein", ".page[data-page='zc']", function (e) {
    initPageJS('zc', '/Scripts/mobile/');
});
//照片
$$(document).on("page:beforein", ".page[data-page='groupPhoto']", function (e) {
    initPageJS('groupPhoto', '/Scripts/mobile/');
});
//国内外项目
$$(document).on("page:beforein", ".page[data-page='nProject']", function (e) {
    initPageJS('nProject', '/Scripts/mobile/js/');
});

//小镇
$$(document).on("page:beforein", ".page[data-page='atownControl']", function (e) {
    initPageJS('atownControl', '/Scripts/mobile/js/');
});


//宣传片
$$(document).on("page:beforein", ".page[data-page='trailer']", function (e) {
    initPageJS('trailer', '/Scripts/mobile/js/');
});


// 实景监控
$$(document).on("page:beforein", ".page[data-page='sjControl']", function (e) {
    initPageJS('sjControl', '/Scripts/mobile/js/');
});


/*================================新增=========================================*/

// 全景摄像头
$$(document).on("page:beforein", ".page[data-page='controlCame']", function (e) {
    initPageJS('controlCame', '/Scripts/mobile/js/');
});
// 设备管理
$$(document).on("page:beforein", ".page[data-page='controlEquip']", function (e) {
    initPageJS('controlEquip', '/Scripts/mobile/js/');
});
// 欢迎词
$$(document).on("page:beforein", ".page[data-page='controlWel']", function (e) {
    initPageJS('controlWel', '/Scripts/mobile/js/');
});