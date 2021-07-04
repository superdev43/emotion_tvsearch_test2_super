//==================================================
// エモーションズ株式会社 様
//==================================================


//--------------------------------------------------
// 検索ページ用
//--------------------------------------------------

// フラグ
var flagSearchPage = 1;

// 値取得
var tv_maker = localStorage['tv_maker'] ?? ''; // メーカー
var tv_size =  localStorage['tv_size'] ??''; // インチ数
var tv_productid = localStorage['tv_productid'] ?? ''; // 型番
var tv_setuptype = localStorage['tv_setuptype'] ?? ''; // 取付け方法
var tv_seriestype =  localStorage['tv_seriestype'] ??''; // 機能

var url_id = "";
window.addEventListener('load', function() {
    // URL取得
    var href = window.location.href;
    // var hrefpath = window.location.pathname;
    // var pathArray = hrefpath.split('/');
    // // alert(typeof(pathArray[3]));
    // if (pathArray[3] != undefined) {
    //     url_id = pathArray[3];
    // } else {
    //     url_id = null;
    // }
    // 値取得
    if (href.match(/m=([^&]*)/)) { tv_maker = RegExp.$1; }
    if (href.match(/s=([^&]*)/)) { tv_size = RegExp.$1; }
    if (href.match(/p=([^&]*)/)) { tv_productid = RegExp.$1; }
    if (href.match(/u=([^&]*)/)) { tv_setuptype = RegExp.$1; }
    if (href.match(/r=([^&]*)/)) { tv_seriestype = RegExp.$1; }

    // for (var i = 0; i < tv_model.length; ++i) {
    //     var splits = tv_model[i].split(",");
    //     if (splits[0] == tv_maker && splits[1] == tv_productid) {
    //         url_id = splits[2];
    //     }
    // }
    // URLの「?」以降を削除
    // history.replaceState('', '', href.replace(/\?.+/, url_id));
    // if (tv_maker && tv_productid) {
    //     console.log(makerE[tv_maker],":",tv_productid)
    //     document.getElementById('tvFrame').src = "https://www.ace-of-parts.com/data/ace-of-parts/image/"+makerE[tv_maker]+"/"+tv_productid+".html";
    // }
    // else {
    //     document.getElementById('tvFrame').style.display = "none";
    // }
    // データ読み込み時間を考慮して0.5秒後に実行する
    // 20180909データ処理jsの読み込みタイミングを変えたので、ここでの処理も 1秒後に変更
    if (tv_maker) {
        // data_tv.js 読み込み指示
        //	setSearchForm1();
        // 検索フォームセット指示
        setTimeout(function() { setSelect1b(tv_maker) }, 1000);
    }
}, false);


function setSelect1b(tv_maker) {
    document.getElementById('tv_maker').value = tv_maker;
    setSelect2();
    setSelect2b(tv_size);
}

function setSelect2b(tv_size) {
    document.getElementById('tv_size').value = tv_size;
    setSelect3();
    setSelect3b(tv_productid);
}

function setSelect3b(tv_productid) {
    document.getElementById('tv_productid').value = tv_productid;
    setSelect4();
    setSelect4b(tv_setuptype);
}

function setSelect4b(tv_setuptype) {
    document.getElementById('tv_setuptype').value = tv_setuptype;
    setSelect5();
    setSelect5b(tv_seriestype);
}

function setSelect5b(tv_seriestype) {
    document.getElementById('tv_seriestype').value = tv_seriestype;
    search();
    if (location.href.match(/\/sp\//)) {
        location.hash = 'itemlist';
    }
}