//==================================================
// エモーションズ株式会社 様
//==================================================


//--------------------------------------------------
// 検索ページ用
//--------------------------------------------------

// フラグ
// var flagSearchPage = 1;

// 値取得
var tv_maker = ''; // メーカー
var tv_size = ''; // インチ数
var tv_productid = ''; // 型番
var tv_setuptype = ''; // 取付け方法
var tv_seriestype = ''; // 機能
window.addEventListener('load', function() {
    // URL取得
    tv_maker = localStorage['tv_maker'];
    tv_size = localStorage['tv_size'];
    tv_productid = localStorage['tv_productid'];
    tv_setuptype = localStorage['tv_setuptype'];
    tv_seriestype = localStorage['tv_seriestype'];

    if (tv_maker) {
        setTimeout(function() { setSelect1b(tv_maker); }, 2000);
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
}