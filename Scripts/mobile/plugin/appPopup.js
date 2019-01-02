; (function ($, window, document, undefined) {
    //载入popup插件
    $.fn.popupShow = function (opt) {
        this.defaults = {
            id: '',
            title: '',
            closeText: '关闭',
            rightContent: {
                id: '',
                href: '#',
                text: '',
                onClick: null
            },
            navbar: {//顶部导航
                id: '',
                show: true,
            },
            contents: {//主体
                id: '',
                show: true,
                content: '',
            },
            toolbar: {//底部导航
                id: '',
                show: true,
                content: '',
            },
            callBackOpen: null,//open 当 Popover 开始打开动画时，事件将被触发。
            callBackOpened: null,//opened 当 Popover 完成打开动画时，事件将被触发。
            callBackClose: null,//close 当 Popover 开始结束动画时，事件将被触发。
            callBackClosed: null,//closed 当 Popover 完成结束动画时，事件将被触发。
        },
        this.options = $.extend(true, {}, this.defaults, opt);
        var showList = ['', '', ''];
        if (!this.options.navbar.show) {
            showList[0] = 'style="display:none"';
        }
        if (!this.options.contents.show) {
            showList[1] = 'style="display:none"';
        }
        if (!this.options.toolbar.show) {
            showList[2] = 'style="display:none"';
        }
        var popupHTML = $('<div class="popup pages navbar-through toolbar-through tablet-fullscreen" id="' + this.options.id + '">' +
                            '<div class="page">' +
                                '<div class="navbar" id="' + this.options.navbar.id + '" ' + showList[0] + '>' +
                                    '<div class="navbar-inner">' +
                                        '<div class="left">' +
                                            '<a href="#" class="close-popup link">' + this.options.closeText + '</a>' +
                                        '</div>' +

                                        '<div class="center sliding">' + this.options.title + '</div>' +

                                        '<div class="right">' +
                                            '<a id="' + this.options.rightContent.id + '" href="' + this.options.rightContent.href + '" class="link icon-only">' + this.options.rightContent.text + '</a>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +

                                '<div class="page-content" id="' + this.options.contents.id + '" ' + showList[1] + '>' +
                                    this.options.contents.content +
                                '</div>' +

                                '<div class="toolbar tabbar tabbar-labels" id="' + this.options.toolbar.id + '" ' + showList[2] + '>' +
                                    this.options.toolbar.content +
                                '</div>' +
                            '</div>' +
                        '</div>');
        if (this.options.rightContent.onClick != null) {
            popupHTML.find('.right a').unbind();
            popupHTML.find('.right a').bind('click', this.options.rightContent.onClick);
        }

        if (this.options.callBackOpen != null) {
            popupHTML.on('open', this.options.callBackOpen);
        }
        if (this.options.callBackOpened != null) {
            popupHTML.on('opened', this.options.callBackOpened);
        }
        if (this.options.callBackClose != null) {
            popupHTML.on('close', this.options.callBackClose);
        }
        if (this.options.callBackClosed != null) {
            popupHTML.on('closed', this.options.callBackClosed);
        }

        myApp.popup(popupHTML);
        popupHTML = null;
        return this;
    };

    //载入动态页面
    $.fn.viewShow = function (opt) {
        this.defaults = {
            id: '',
            title: '',
            titleID: '',
            leftOnClick: null,
            rightContent: {
                id: '',
                href: '#',
                text: '',
                onClick: null
            },
            contents: {//主体
                id: '',
                content: '',
            },
            pageCallBack: null,//界面回调
        },
        this.options = $.extend(true, {}, this.defaults, opt);
        var viewHTML = $('<div class="navbar">' +
                        '<div class="navbar-inner">' +
                            '<div class="left">' +
                                '<a href="#" class="back link"><i class="iconfont icon-back"></i></a>' +
                            '</div>' +

                            '<div class="center sliding" id="' + this.options.titleID + '">' + this.options.title + '</div>' +

                            '<div class="right">' +
                                '<a id="' + this.options.rightContent.id + '" href="' + this.options.rightContent.href + '" class="link icon-only">' + this.options.rightContent.text + '</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +

                    '<div class="page" id="' + this.options.id + '" data-page="' + this.options.id + '">' +
                        '<div class="page-content" id="' + this.options.contents.id + '">' +
                            this.options.contents.content +
                        '</div>' +
                    '</div>');
        if (this.options.leftOnClick != null) {
            viewHTML.find('.left a').unbind();
            viewHTML.find('.left a').bind('click', this.options.leftOnClick);
        }
        if (this.options.rightContent.onClick != null) {
            viewHTML.find('.right a').unbind();
            viewHTML.find('.right a').bind('click', this.options.rightContent.onClick);
        }

        mainView.router.loadContent(viewHTML);
        if (this.options.pageCallBack != null) {
            var s = myApp.onPageBeforeInit(this.options.id, this.options.pageCallBack);
            s.trigger();
            s.remove();
        }
        viewHTML = null;
        return this;
    };

    //载入底部输入框插件
    $.fn.bottomText = function (opt) {
        this.defaults = {
            id: '',//根节点ID
            textID: '',//输入框ID
            originalID: '',//原始输入框ID
            placeholder: '请输入内容',
            rightBtn: {//确定按钮
                id: '',
                href: '#',
                text: '确定',
                onClick: null
            },
            value: '',
            callBack: null,//回调
            zIndex: 99999
        },
        this.options = $.extend(true, {}, this.defaults, opt);
        var btnHTML = $('<div class="toolbar" id="' + this.options.id + '" style="background:#fff;position:absolute;display:none;z-index:' + this.options.zIndex + '">' +
                   '<div class="messagebar" style="height:44px;">' +
                       '<div class="toolbar-inner">' +
                           '<textarea id="' + this.options.textID + '" placeholder="' + this.options.placeholder + '"></textarea>' +
                           '<a id="' + this.options.rightBtn.id + '" href="' + this.options.rightBtn.href + '" class="link icon-only">' + this.options.rightBtn.text + '</a>' +
                       '</div>' +
                   '</div>' +
               '</div>');

        btnHTML.find('a').unbind();
        var option = this.options;
        btnHTML.find('a').bind('click', function () {
            var text = $(this).prev().val();
            if (option.rightBtn.onClick != null) {
                option.rightBtn.onClick(text);
            }
            if (Object.prototype.toString.call(option.originalID) == '[object String]') {
                $('#' + option.originalID).val(text);
            }
            else {
                $(option.originalID).val(text);
            }
        });

        $('body').append(btnHTML);
        $(btnHTML).slideToggle(function () {
            $(btnHTML).find('textarea').val(option.value);
            $(btnHTML).find('textarea').focus();
            $(btnHTML).find('textarea').bind('blur', function () {
                var thisText = $(this).parent().parent().parent();
                thisText.slideToggle(function () {
                    thisText.remove();
                });
            });
            btnHTML = null;
            if (option.callBack != null) {
                option.callBack();
            }
        });
        return this;
    };

    //tab页插件
    $.fn.tabAndTable = function (opt) {
        this.defaults = {
            id: '',//根节点ID
            tabList: [],//tab列表[{id:'',href:'',name:'',tableID:'',tableThead:[],onRefresh:function}]
            initRefresh: false,//刷新控件是否初始化
            callBack: null,//回调
        },
        this.options = $.extend(true, {}, this.defaults, opt);
        var config = this.options;
        var btnRow = '';
        var tabsRow = '';
        for (var i = 0; i < config.tabList.length; i++) {
            var activeClass = '';
            if (i == 0) {
                activeClass = 'active';
            }
            btnRow += '<a id="' + config.tabList[i].id + '" href="#' + config.tabList[i].href + '" class="tab-link ' + activeClass + ' button">' + config.tabList[i].name + '</a>';
            var th = '';
            if (config.tabList[i].tableThead.length == 1) {
                th += '<th style="text-align:center;">' + config.tabList[i].tableThead[0] + '</th>';
            }
            else {
                for (var j = 0; j < config.tabList[i].tableThead.length; j++) {
                    th += '<th>' + config.tabList[i].tableThead[j] + '</th>';
                }
            }

            tabsRow += ' <div id="' + config.tabList[i].href + '" class="tab ' + activeClass + ' pull-to-refresh-content" style="overflow:auto;position:relative;" data-ptr-distance="55">' +
                            '<div class="pull-to-refresh-layer">' +
                                '<div class="preloader"></div>' +
                                '<div class="pull-to-refresh-arrow"></div>' +
                            '</div>' +

                            '<div class="tableAuto tableAuto2">' +
                                '<table id="' + config.tabList[i].tableID + '">' +
                                    '<thead>' +
                                        '<tr>' +
                                            th +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody></tbody>' +
                                '</table>' +
                            '</div>' +
                        '</div>';
        }
        var contentHTML = $('<div class="tabs-animated-wrap" id="' + config.id + '">' +
                        '<div class="buttons-row tabBtn">' +
                            btnRow +
                        '</div>' +

                        '<div class="tabs">' +
                            tabsRow +
                        '</div>' +
                    '</div>');
        this.innerHTML = "";
        $(this).append(contentHTML).ready(function () {
            for (var i = 0; i < config.tabList.length; i++) {
                if (config.tabList[i].onRefresh != null) {
                    if (config.initRefresh) {
                        myApp.initPullToRefresh($('#' + config.tabList[i].href));
                    }
                    $$('#' + config.tabList[i].href).on("refresh", config.tabList[i].onRefresh);
                }
            }
            if (config.callBack != null) {
                config.callBack();
            }
        });
        contentHTML = null;
        return this;
    };

    //资产信息和维护
    $.fn.maintainZiChan = function (opt) {
        this.defaults = {
            id: '',//根节点ID
            titleID: '',
            contentInfor: {
                id: '',
                title: '资产信息',
                imgID: '',
                list: [],//{name:'',text:''}
                btnText: '我要维护',
                btnClick: null,
            },
            contentApply: {
                id: '',
                title: '维护申请',
                textareaID: '',
                btnText: '提交',
                btnTextCan: '取消',
                btnClick: null,
            },
            callBack: null,//回调
        },
        this.options = $.extend(true, {}, this.defaults, opt);
        var config = this.options;
        var newRow = '';
        for (var i = 0; i < config.contentInfor.list.length; i++) {
            newRow += '<li>' +
                '<div class="item-content">' +
                    '<div class="item-media mgList_left">' + config.contentInfor.list[i].name + '</div>' +
                    '<div class="item-inner">' +
                        '<div class="item-title">' + config.contentInfor.list[i].text + '</div>' +
                    '</div>' +
                '</div>' +
                '</li>';
        }

        var contentHTML = $('<div class="list-block" id="' + config.id + '" style="overflow:auto;height:100%;">' +
                        '<div id="' + config.contentInfor.id + '">' +
                            '<img id="' + config.contentInfor.imgID + '" class="zicanImg"/>' +
                            '<ul>' +
                                newRow +
                            '</ul>' +
                            '<a href="#" class="button button-big button-fill zicanBtn" titleID="' + config.titleID + '" titleto="' + config.contentApply.title + '">' + config.contentInfor.btnText + '</a>' +
                        '</div>' +

                        '<div id="' + config.contentApply.id + '" style="display:none">' +
                            '<p class="words leftText">请输入维护内容：</p>' +
                            '<p class="mgSection">' +
                                '<textarea id="' + config.contentApply.textareaID + '" style="background:#fff;"></textarea>' +
                            '</p>' +
                            '<p class="words leftText"></p>' +
                            '<div id="fileImg" class="addimgDiv">' +
                            '</div>' +
                            '<p class="row">' +
                                '<a href="#" class="button button-big button-fill zicanBtn col-50" titleID="' + config.titleID + '" titleto="' + config.contentInfor.title + '">' + config.contentApply.btnText + '</a>' +
                                '<a href="#" class="button button-big zicanBtn color-red col-50" titleID="' + config.titleID + '" titleto="' + config.contentInfor.title + '" cancel="cancel">' + config.contentApply.btnTextCan + '</a>' +
                            '</p>' +
                        '</div>' +
                    '</div>');
        this.innerHTML = "";
        contentHTML.find('#fileImg').fileImg();
        $("#" + config.titleID).html(config.contentInfor.title);
        $(this).append(contentHTML).ready(function () {
            if (config.contentInfor.btnClick != null) {
                $('#' + config.contentInfor.id).find('a').unbind();
                $('#' + config.contentInfor.id).find('a').bind('click', config.contentInfor.btnClick);
            }
            if (config.contentApply.btnClick != null) {
                $('#' + config.contentApply.id).find('a').unbind();
                $('#' + config.contentApply.id).find('a').bind('click', config.contentApply.btnClick);
            }
            if (config.callBack != null) {
                config.callBack();
            }
        });
        contentHTML = null;
        return this;
    };

    //选择图片或拍照插件
    $.fn.fileImg = function (opt) {
        this.defaults = {
            way: 'multiple',//multiple多种选择，camera只打开照相机
            ico: {
                src: '',
                icon: 'iconfont icon-addimg'
            },
            count: 4,
            callBack: null,//回调
        },
        this.options = $.extend(true, {}, this.defaults, opt);
        var option = this.options;
        if (option.way == 'camera') {
            option.way = 'capture="camera"';
        }

        var icons = '';
        if (option.ico.src == '') {
            icons = '<i class="' + option.ico.icon + ' addimgListIcon"></i>';
        }
        else {
            icons = '<img src="' + option.ico.src + ' addimgListIcon"/>';
        }
        var imgHTML = $('<div class="addimgList flexBoxStart">' +
                        '<div class="addimgListItme">' +
                            '<input type="file" accept="image/*" ' + option.way + '>' +
                            icons +
                        '</div>' +
                    '</div>');
        //选择事件
        this.fileImgChangeFun = function () {
            $(this).find('input').unbind();
            $(this).find('input').bind('change', function (index) {
                var thisElem = $(index.target).parent();
                var reader = new FileReader();
                reader.onload = function (e) {
                    compress(e.target.result, function (res) {
                        var newRowDiv = $("<div class='addimgListItme'></div>");
                        var newRow = $("<img/>");
                        newRow.attr("src", res);
                        newRowDiv.append(newRow);
                        newRowDiv.unbind();
                        newRowDiv.bind('click', function () {
                            var list = new Array();
                            var initialSlides = 0;
                            var th = $(this).find('img').attr('src');
                            $(this).parent().find('img').each(function (i) {
                                list.push({ url: $(this).attr('src'), captions: '1' });
                                if (th == $(this).attr('src')) {
                                    initialSlides = i;
                                }
                            });
                            photoBrowserShow(list, initialSlides, this);
                        });
                        newRow = null;
                        thisElem.before(newRowDiv);
                        newRowDiv = null;
                        var parent = thisElem.parent();
                        var len = parent.children("div").length;
                        if (len > option.count) {
                            parent.children("div").eq(len - 1).hide();
                        }
                        parent = null;
                        thisElem = null;
                    });
                };

                //压缩
                function compress(res, fun) {
                    var img = new Image(), maxH = 160;
                    img.onload = function () {
                        var cvs = document.createElement('canvas'),
                            ctx = cvs.getContext('2d');

                        if (img.height > maxH) {
                            img.width *= maxH / img.height;
                            img.height = maxH;
                        }

                        cvs.width = img.width;
                        cvs.height = img.height;

                        ctx.clearRect(0, 0, cvs.width, cvs.height);
                        ctx.drawImage(img, 0, 0, img.width, img.height);

                        var dataUrl = cvs.toDataURL('image/jpeg', 0.6);
                        cvs = null;
                        fun(dataUrl);
                    }
                    img.src = res;
                }

                function photoBrowserShow(list, initialSlides, dt) {
                    var myPhotoBrowser = myApp.photoBrowser({
                        zoom: 400,
                        photos: list,
                        theme: 'dark',
                        ofText: '/',
                        backLinkText: ' ',
                        initialSlide: initialSlides,
                        onOpen: function () {
                            if ($('.photo-browser').find('.right').html() == "") {
                                var lables = $("<label class=\"label-checkbox item-content\" style=\"background:transparent\">" +
                                "<input id='rightCheckbox' type=\"checkbox\" name=\"ks-checkbox\" checked>" +
                                "<div class=\"item-media\"><i class=\"icon icon-form-checkbox\"></i></div>" +
                                "</label>");
                                var th = this;
                                lables.unbind();
                                lables.bind('click', function () {
                                    var t = parseInt($('.photo-browser-current').text()) - 1;
                                    var p = th.photos[t].captions;
                                    if (p == '0') {
                                        th.photos[t].captions = '1';
                                    }
                                    else {
                                        th.photos[t].captions = '0';
                                    }
                                });
                                $('.photo-browser').find('.right').append(lables);
                                lables = null;
                            }
                        },
                        onTransitionEnd: function () {
                            var t = parseInt($('.photo-browser-current').text()) - 1;
                            var p = this.photos[t].captions;
                            if (document.getElementById('rightCheckbox')) {
                                if (p == '0') {
                                    document.getElementById('rightCheckbox').checked = false;
                                }
                                else {
                                    document.getElementById('rightCheckbox').checked = true;
                                }
                            }
                        },
                        onClose: function () {
                            var t = this.photos;
                            $(dt).parent().find('img').each(function (i) {
                                if (t[i].captions == '0') {
                                    var parent = $(this).parent().parent();
                                    $(this).parent().remove();
                                    var len = parent.children("div").length;
                                    parent.children("div").eq(len - 1).show();
                                }
                            });
                            t = null;
                        }
                    });
                    myPhotoBrowser.open();
                }

                try {
                    reader.readAsDataURL(this.files[0]);
                }
                catch (e) {
                    reader = null;
                }
            });
        }
        var t = this;
        $(this).append(imgHTML).ready(function () {
            t.fileImgChangeFun();
            t = null;
            if (option.callBack != null) {
                option.callBack();
            }
        });
        imgHTML = null;
        return this;
    };
})(jQuery, window, document);