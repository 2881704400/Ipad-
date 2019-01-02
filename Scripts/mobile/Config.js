//*************************************************
//------------------视频配置 start---------------
//*************************************************
var map, infoPoint = [ //经纬度+设备号+通道号
    [113.960046, 22.535688, 2003, 1],
    [113.922468, 22.497125, 2003, 2]
];
// *************************************************
// ------------------视频配置 end-----------------  Android
// *************************************************
// var myJavaFun = function() {};
// myJavaFun.StartVoice = function(a) {
//     try {
//         window.webkit.messageHandlers.StartVoice.postMessage(a);
//     } catch (ex) {
//         try {
//             myJavaFunAndroid.StartVoice(a);
//         } catch (ex) {}
//     }
// };
// myJavaFun.StopVoice = function() {
//     try {
//         window.webkit.messageHandlers.StopVoice.postMessage('');
//     } catch (ex) {
//         try {
//             myJavaFunAndroid.StopVoice();
//         } catch (ex) {
//             myJavaFunAndroid.StopVoice();
//         }
//     }
// };
// myJavaFun.StopVice = function() {
//     try {
//         window.webkit.messageHandlers.StopVice.postMessage('');
//     } catch (ex) {
//         try {
//             myJavaFunAndroid.StopVice();
//         } catch (ex) {
//             myJavaFunAndroid.StopVice();
//         }
//     }
// };
// myJavaFun.StartVice = function() {
//     try {
//         window.webkit.messageHandlers.StartVice.postMessage('');
//     } catch (ex) {
//         try {
//             myJavaFunAndroid.StartVice();
//         } catch (ex) {}
//     }
// };
// myJavaFun.AppCacheClear = function() {
//     try {
//         window.webkit.messageHandlers.AppCacheClear.postMessage('');
//     } catch (ex) {
//         try {
//             myJavaFunAndroid.AppCacheClear();
//         } catch (ex) {}
//     }
// };
// myJavaFun.OpenLocalUrl = function(url) {
//     try {
//         window.webkit.messageHandlers.OpenLocalUrl.postMessage(url);
//     } catch (ex) {
//         try {
//             myJavaFunAndroid.OpenLocalUrl(url);
//         } catch (ex1) {
//             if(window.localStorage.terminal != "Mobile.App")
//                window.location.href = "/Views/login.html";
//             else
//                 myApp.dialog.alert("退出登陆异常");
//         }
//     }
// };
// myJavaFun.AppShare = function(url) {
//     try {
//         window.webkit.messageHandlers.AppShare.postMessage(url);
//     } catch (ex) {
//         try {
//             myJavaFunAndroid.AppShare(url);
//         } catch (ex) {}
//     }
// };
// myJavaFun.RichScan = function() {
//     try {
//         window.webkit.messageHandlers.RichScan.postMessage('');
//     } catch (ex) {
//         try {
//             myJavaFunAndroid.RichScan();
//         } catch (ex) {}
//     }
// };
// myJavaFun.AppShare2 = function() {
//     try {
//         window.webkit.messageHandlers.AppShare2.postMessage('');
//     } catch (ex) {}
// };
// myJavaFun.VideoShow = function(json) {
//     try {
//         window.webkit.messageHandlers.VideoShow.postMessage(json);
//     } catch (ex) {
//         try {
//             myJavaFunAndroid.VideoShow(json);
//         } catch (ex) {myJavaFunAndroid.VideoShow(json);}
//     }
// };
// myJavaFun.HikYunVideoShow = function(json) {
//     try {
//         window.webkit.messageHandlers.HikYunVideoShow.postMessage(json);
//     } catch (ex) {
//         try {
//             myJavaFunAndroid.HikYunVideoShow(json);
//         } catch (ex) {}
//     }
// };
// myJavaFun.Hik8700VideoShow = function(json) {
//     try {
//         window.webkit.messageHandlers.Hik8700VideoShow.postMessage(json);
//     } catch (ex) {}
// };
// myJavaFun.setOrientation = function() {
//     try {
//         window.webkit.messageHandlers.setOrientation.postMessage('');
//     } catch (ex) {}
// };
// myJavaFun.GetCookie = function() {
//     try {
//         window.webkit.messageHandlers.GetCookie.postMessage('');
//     } catch (ex) {}
// };
// GetCookieCallback = function(cookie) {
//     var cookie_json = JSON.parse(cookie);
//     window.localStorage.terminal = cookie_json.terminalString;
//     window.localStorage.ac_appkey = cookie_json.ac_appkeyString;
//     window.localStorage.ac_infokey = cookie_json.ac_infokeyString;
//     window.localStorage.service_url = cookie_json.service_urlString;
// };
// myJavaFun.SetCookie = function(cookie) {
//     try {
//         window.webkit.messageHandlers.SetCookie.postMessage(cookie);
//     } catch (ex) {}
// };
// myJavaFun.OpenMapNav = function(url) {
//     try {
//         window.webkit.messageHandlers.OpenMapNav.postMessage(url);
//     } catch (ex) {
//         try {
//             myJavaFunAndroid.OpenMapNav(url);
//         } catch (ex) {}
//     }
// };
// myJavaFun.OpenApp = function(url) {
//     try {
//         window.webkit.messageHandlers.OpenApp.postMessage(url);
//     } catch (ex) {
//         try {
//             myJavaFunAndroid.OpenApp(url);
//         } catch (ex) {}
//     }
// };
// myJavaFun.GetAppVersion = function() {
//     try {
//         window.webkit.messageHandlers.GetAppVersion.postMessage('');
//     } catch (ex) {
//         try {
//             myJavaFunAndroid.GetAppVersion();
//         } catch (ex) {}
//     }
// };
// myJavaFun.GetSystemInfor = function() {
//     try {
//         window.webkit.messageHandlers.GetSystemInfor.postMessage('');
//     } catch (ex) {
//         try { 
//             myJavaFunAndroid.GetSystemInfor();
//         } catch (ex) {}
//     }
// };
// *************************************************
// ---------------------用户配置--------------------  
// *************************************************

var getUser ={
    singleGroup:["zkx","admin","zkx2018"],
    multipleGroup:[
    {All0:["zkx","admin","zkx2018"]},
    {All1:["zkx","zkx2018"]}]
};
// *************************************************
// ---------------------首页配置--------------------  
// *************************************************
var homeData =[
    {
        name: '首页',
        url:'#',
        equipNo: '300',
        setNo: '1',
        checkedICON:'/Image/context/page1_home_0.png',
        UncheckedICON:'/Image/context/page1_home_1.png',
        displayView: '',
    },
    {
        name: '整体架构',
        url:'#',
        equipNo: '300',
        setNo: '9',
        checkedICON:'/Image/context/page1_zt_0.png',
        UncheckedICON:'/Image/context/page1_zt_1.png',
        displayView: '',
    },
    {
        name: '总体规划',
        url:'#',
        equipNo: '300',
        setNo: '10',
        checkedICON:'/Image/context/page1_gh_0.png',
        UncheckedICON:'/Image/context/page1_gh_1.png',
        displayView: '',
    },
    {
        name: '智慧管理',
        url:'#',
        equipNo: '300',
        setNo: '4',
        checkedICON:'/Image/context/page1_zhgl_0.png',
        UncheckedICON:'/Image/context/page1_zhgl_1.png',
        displayView: '',
    },
    {
        name: '智慧安全',
        url:'#',
        equipNo: '300',
        setNo: '5',
        checkedICON:'/Image/context/page1_zhaq_0.png',
        UncheckedICON:'/Image/context/page1_zhaq_1.png',
        displayView: '',
    },
    {
        name: '智慧能源',
        url:'#',
        equipNo: '300',
        setNo: '6',
        checkedICON:'/Image/context/page1_zhny_0.png',
        UncheckedICON:'/Image/context/page1_zhny_1.png',
        displayView: '',
    },
    {
        name: '物业管理',
        url:'#',
        equipNo: '300',
        setNo: '3',
        checkedICON:'/Image/context/page1_wy_0.png',
        UncheckedICON:'/Image/context/page1_wy_1.png',
        displayView: '',
    },
    {
        name: '停车场',
        url:'#',
        equipNo: '300',
        setNo: '2',
        checkedICON:'/Image/context/page1_tj_0.png',
        UncheckedICON:'/Image/context/page1_tj_1.png',
        displayView: '',
    },
    {
        name: '',
        url:'#',
        equipNo: '',
        setNo: '',
        checkedICON:'#',
        UncheckedICON:'#',
        displayView: 'hidden',
    },
    {
        name: '无人机',
        url:'#',
        equipNo: '300',
        setNo: '16',
        checkedICON:'/Image/context/page1_wr_0.png',
        UncheckedICON:'/Image/context/page1_wr_1.png',
        displayView: '',
    },
    {
        name: '自动讲解',
        url:'#',
        equipNo: '1007',
        setNo: '1',
        checkedICON:'/Image/context/page1_zd_0.png',
        UncheckedICON:'/Image/context/page1_zd_1.png',
        displayView: '',
    },    
    {
        name: '',
        url:'#',
        equipNo: '',
        setNo: '',
        checkedICON:'#',
        UncheckedICON:'#',
        displayView: 'hidden',
    },                       
];
// *************************************************
// ------------------实景摄像头配置------------------  
// *************************************************
//1号球机
var controlCameData1 =[
    {name: '球机-大门口云台控制:左1',equipNo: '1008',setNo: '385',setNo1: '386',className:"controlDirectionLeftBtn"},
    {name: '球机-大门口云台控制:上',equipNo: '1008',setNo: '389',setNo1: '390',className:"controlDirectionTopBtn"},
    {name: '球机-大门口云台控制:右',equipNo: '1008',setNo: '387',setNo1: '388',className:"controlDirectionRightBtn"},
    {name: '球机-大门口云台控制:下',equipNo: '1008',setNo: '391',setNo1: '392',className:"controlDirectionBottomBtn"},
    // {name: '云台控制中',equipNo: '1008',setNo: '1',className:"controlDirectionStopBtn"},
    // {name: '云台控制中',equipNo: '1008',setNo: '1',className:"controlDirectionStopBtn"},
    {name: '预留位置1',equipNo: '1008',setNo: '1',className:"controlPositionBtn1"},
    {name: '预留位置2',equipNo: '1008',setNo: '2',className:"controlPositionBtn2"},
    {name: '预留位置3',equipNo: '1008',setNo: '3',className:"controlPositionBtn3"},
    {name: '球机-大门口倍数增加',equipNo: '1008',setNo: '394',setNo1: '395',className:"controlIconBtn1"},
    {name: '球机-大门口倍数减少',equipNo: '1008',setNo: '396',setNo1: '397',className:"controlIconBtn4"},
    {name: '球机-大门口焦点拉近',equipNo: '1008',setNo: '398',setNo1: '399',className:"controlIconBtn2"},
    {name: '球机-大门口焦点拉远',equipNo: '1008',setNo: '400',setNo1: '401',className:"controlIconBtn5"},
    {name: '球机-大门口光圈打开',equipNo: '1008',setNo: '402',setNo1: '403',className:"controlIconBtn3"},
    {name: '球机-大门口光圈关闭',equipNo: '1008',setNo: '404',setNo1: '405',className:"controlIconBtn6"},
    ];
//2号球机
var controlCameData2 =[
    {name: '球机-大门口云台控制:左',equipNo: '1008',setNo: '768',setNo1: '769',className:"controlDirectionLeftBtn"},
    {name: '球机-大门口云台控制:上',equipNo: '1008',setNo: '772',setNo1: '773',className:"controlDirectionTopBtn"},
    {name: '球机-大门口云台控制:右',equipNo: '1008',setNo: '770',setNo1: '771',className:"controlDirectionRightBtn"},
    {name: '球机-大门口云台控制:下',equipNo: '1008',setNo: '774',setNo1: '775',className:"controlDirectionBottomBtn"},
    // {name: '云台控制中',equipNo: '1008',setNo: '1',className:"controlDirectionStopBtn"},
    // {name: '云台控制中',equipNo: '1008',setNo: '1',className:"controlDirectionStopBtn"},
    {name: '预留位置1',equipNo: '1008',setNo: '4',className:"controlPositionBtn1"},
    {name: '预留位置2',equipNo: '1008',setNo: '5',className:"controlPositionBtn2"},
    {name: '预留位置3',equipNo: '1008',setNo: '6',className:"controlPositionBtn3"},
    {name: '球机-大门口倍数增加',equipNo: '1008',setNo: '777',setNo1: '778',className:"controlIconBtn1"},
    {name: '球机-大门口倍数减少',equipNo: '1008',setNo: '779',setNo1: '780',className:"controlIconBtn4"},
    {name: '球机-大门口焦点拉近',equipNo: '1008',setNo: '781',setNo1: '782',className:"controlIconBtn2"},
    {name: '球机-大门口焦点拉远',equipNo: '1008',setNo: '783',setNo1: '784',className:"controlIconBtn5"},
    {name: '球机-大门口光圈打开',equipNo: '1008',setNo: '785',setNo1: '786',className:"controlIconBtn3"},
    {name: '球机-大门口光圈关闭',equipNo: '1008',setNo: '787',setNo1: '788',className:"controlIconBtn6"},
    ];
//3号球机
var controlCameData3 =[
    {name: '球机-大门口云台控制:左3',equipNo: '1008',setNo: '791',setNo1: '792',className:"controlDirectionLeftBtn"},
    {name: '球机-大门口云台控制:上',equipNo: '1008',setNo: '795',setNo1: '796',className:"controlDirectionTopBtn"},
    {name: '球机-大门口云台控制:右',equipNo: '1008',setNo: '793',setNo1: '794',className:"controlDirectionRightBtn"},
    {name: '球机-大门口云台控制:下',equipNo: '1008',setNo: '797',setNo1: '798',className:"controlDirectionBottomBtn"},
    // {name: '云台控制中',equipNo: '1008',setNo: '1',className:"controlDirectionStopBtn"},
    // {name: '云台控制中',equipNo: '1008',setNo: '1',className:"controlDirectionStopBtn"},
    {name: '预留位置1',equipNo: '1008',setNo: '7',className:"controlPositionBtn1"},
    {name: '预留位置2',equipNo: '1008',setNo: '8',className:"controlPositionBtn2"},
    {name: '预留位置3',equipNo: '1008',setNo: '9',className:"controlPositionBtn3"},
    {name: '球机-大门口倍数增加',equipNo: '1008',setNo: '800',setNo1: '801',className:"controlIconBtn1"},
    {name: '球机-大门口倍数减少',equipNo: '1008',setNo: '802',setNo1: '803',className:"controlIconBtn4"},
    {name: '球机-大门口焦点拉近',equipNo: '1008',setNo: '804',setNo1: '805',className:"controlIconBtn2"},
    {name: '球机-大门口焦点拉远',equipNo: '1008',setNo: '806',setNo1: '807',className:"controlIconBtn5"},
    {name: '球机-大门口光圈打开',equipNo: '1008',setNo: '808',setNo1: '809',className:"controlIconBtn3"},
    {name: '球机-大门口光圈关闭',equipNo: '1008',setNo: '810',setNo1: '811',className:"controlIconBtn6"},
    ]; 
// *************************************************
// ------------------空调管理配置-------------------  
// *************************************************
var controlEquipData =[ // 温度设置（设备号，设备ID），打开（设备号，设备ID），关闭（设备号，设备ID）
{name: '展厅中庭空调',ycp_no: '1',equipNo: '50',setNo: '3',equipNoOpen: '50',setNoOpen: '1',equipNoClose: '50',setNoClose: '2',index: 0},
{name: '一楼休息区空调',ycp_no: '2',equipNo: '50',setNo: '6',equipNoOpen: '50',setNoOpen: '4',equipNoClose: '50',setNoClose: '5',index: 1},
{name: '3D眼镜区空调',ycp_no: '3',equipNo: '50',setNo: '9',equipNoOpen: '50',setNoOpen: '7',equipNoClose: '50',setNoClose: '8',index: 2},
{name: '无人工厂空调',ycp_no: '4',equipNo: '50',setNo: '12',equipNoOpen: '50',setNoOpen: '10',equipNoClose: '50',setNoClose: '11',index: 3},
{name: '大堂空调',ycp_no: '5',equipNo: '50',setNo: '15',equipNoOpen: '50',setNoOpen: '13',equipNoClose: '50',setNoClose: '14',index: 4},
{name: '会议室新风空调',ycp_no: '6',equipNo: '50',setNo: '18',equipNoOpen: '50',setNoOpen: '16',equipNoClose: '50',setNoClose: '17',index: 5},
{name: '会议厅小空调',ycp_no: '7',equipNo: '50',setNo: '21',equipNoOpen: '50',setNoOpen: '19',equipNoClose: '50',setNoClose: '20',index: 6},
{name: '办公区新风空调',ycp_no: '8',equipNo: '50',setNo: '24',equipNoOpen: '50',setNoOpen: '22',equipNoClose: '50',setNoClose: '23',index: 7},
{name: '会议厅大空调',ycp_no: '9',equipNo: '50',setNo: '27',equipNoOpen: '50',setNoOpen: '25',equipNoClose: '50',setNoClose: '26',index: 8},
{name: '中庭高低速空调',ycp_no: '10',equipNo: '50',setNo: '32',equipNoOpen: '50',setNoOpen: '28',equipNoClose: '50',setNoClose: '29',index: 9},


];


// *************************************************
// ------------------欢迎词配置-------------------  
// *************************************************
var controlWelData ={
    welClose:{name: '关闭',equipNo: '1005',setNo: '4021',},
    // welSave:{name: '保存',equipNo: '300',setNo: '1',},
    welView:{name: '预览',equipNo: '300',setNo: '13',},
}
var pathurlAll = "http://192.168.0.152:8068"; //左侧图片读取路径
var Pathurl = "D:\\AlarmCenter\\web\\Image\\poto"; //物理路径

// *************************************************
// ------------------自动讲解配置-------------------  
// *************************************************
var autoExplain =[
{name: '开始讲解',equipNo: '1007',setNo: '1',className:"controlIconBtn6"},
{name: '停止讲解',equipNo: '1007',setNo: '2',className:"explainControl1"},
{name: '暂停讲解',equipNo: '1007',setNo: '3',className:"explainControl2"},
{name: '继续讲解',equipNo: '1007',setNo: '4',className:"explainControl3"},
];