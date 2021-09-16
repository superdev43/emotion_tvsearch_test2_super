//==================================================
// エモーションズ株式会社 様
// 金具検索
//==================================================

// 2018/03/27
// 設置サイト毎にURLの初期設定を行っていたが、
// 価格データ内に httpから設定するように変更


//--------------------------------------------------
// メイン処理：変更禁止
//--------------------------------------------------

// データファイルの内容（tv_data.js）
// [0]メーカー名,[1]TVサイズ,[2]TV型番,[3]TV金具型番,[4]URL,[5]TV設置方法,[6]TV設置方法詳細,[7]新商品,[8]シリーズタイプ

// 表示完了時に起動
//	window.onload = setSelect1;

// 初期化
var flagSearchPage = 0;
var tv_match = [];

function setSelect1() {
    for (var i = 1; i < makerJ.length; ++i) {
        var maker_no = i;
        var maker_jpn = makerJ[i];
        document.getElementById('tv_maker').options[i] = new Option(maker_jpn, maker_no);
    }
}

// プルダウンメニュー生成（サイズ）
function setSelect2() {
    // リセット
    resetSelect('tv_size'); // サイズ
    resetSelect('tv_productid'); // 型番
    resetSelect('tv_setuptype'); // 設置方法
    resetSelect('tv_seriestype'); // 機能（金具ID取得用の機能番号）
    resetSelect('tv_seriestype2'); // 機能★（金具ID）
    resetHtml('itemlist'); // 検索結果html（検索ページの場合のみ存在するので、有無をチェック後に初期化する）
    resetButton(); // 検索ボタン
    // フォームの選択内容取得
    var tv_maker = document.getElementById('tv_maker').value; // メーカー
    if (!tv_maker) { return; }
    // 検索
    var selected2 = [];
    var i2 = 0;
    for (var i = 0; i < maindata.length; ++i) {
        var splits = maindata[i].split(",");
        if (splits[0] == tv_maker) {
            var tv_size = splits[1];
            if (!selected2[tv_size]) {
                i2++;
                document.getElementById('tv_size').options[i2] = new Option(tv_size + '型', tv_size);
                selected2[tv_size] = 1;
            }
        }
    }
}

// プルダウンメニュー生成（型番）
function setSelect3() {
    // リセット
    resetSelect('tv_productid'); // 型番
    resetSelect('tv_setuptype'); // 設置方法
    resetSelect('tv_seriestype'); // 機能
    resetSelect('tv_seriestype2'); // 機能★
    resetHtml('itemlist'); // 検索結果html
    resetButton(); // 検索ボタン
    // フォームの選択内容取得
    var tv_maker = document.getElementById('tv_maker').value; // メーカー
    var tv_size = document.getElementById('tv_size').value; // サイズ
    if (!tv_maker || !tv_size) { return; }
    // 検索
    var selected3 = [];
    var i2 = 0;
    for (var i = 0; i < maindata.length; ++i) {
        var splits = maindata[i].split(",");
        if (splits[0] == tv_maker && splits[1] == tv_size) {
            var tv_productid = splits[2];
            if (!selected3[tv_productid]) {
                i2++;
                document.getElementById('tv_productid').options[i2] = new Option(tv_productid, tv_productid);
                selected3[tv_productid] = 1;
            }
        }
    }
}

// プルダウンメニュー生成（設置方法）
function setSelect4() {
    // リセット
    resetSelect('tv_setuptype'); // 設置方法
    resetSelect('tv_seriestype'); // 機能
    resetSelect('tv_seriestype2'); // 機能★
    resetHtml('itemlist'); // 検索結果html
    resetButton(); // 検索ボタン
    // リセット
    // 「非対応機種」を選択後に、他のテレビの型番を選択したときのため
    document.getElementById('tv_setuptype').options[0] = new Option("TV設置方法", "");
    document.getElementById('tv_seriestype').options[0] = new Option("機能選択", "");
    document.getElementById('tv_seriestype2').options[0] = new Option("機能選択", ""); // ★
    // フォームの選択内容取得
    var tv_maker = document.getElementById('tv_maker').value; // メーカー
    var tv_size = document.getElementById('tv_size').value; // サイズ
    var tv_productid = document.getElementById('tv_productid').value; // 型番
    if (!tv_maker || !tv_size || !tv_productid) { return; }
    // 検索
    var selected4 = [];
    var i2 = 0;
    for (var i = 0; i < maindata.length; ++i) {
        var splits = maindata[i].split(",");
        if (splits[0] == tv_maker && splits[1] == tv_size && splits[2] == tv_productid) {
            //console.log(splits[0] +','+ splits[1] +','+ splits[2] +','+ splits[3] +','+ splits[4] +','+ splits[5]);
            // セットアップタイプ（splits[5]）に、[5]お問い合わせください、か、[6]非対応機種 が設定されている場合は、プルダウンに入れない
            var tv_setuptype = splits[5];
            /*
            if(tv_setuptype == 5){
                // まずリセットする（）
                resetSelect('tv_setuptype');
                resetSelect('tv_seriestype');
                resetSelect('tv_seriestype2');
                // [0] に「お問い合わせください」を設定する
                document.getElementById('tv_setuptype').options[0] = new Option("お問い合わせください",""); // 設置方法（TV設置方法）
                document.getElementById('tv_seriestype').options[0] = new Option("お問い合わせください",""); // 設置方法（機能選択）
                document.getElementById('tv_seriestype2').options[0] = new Option("お問い合わせください",""); // 設置方法（機能選択）★非表示項目
            	
            //	break;
            }else 
            */
            if (tv_setuptype == 6) {
                //	resetSelect('tv_setuptype');
                //	resetSelect('tv_seriestype');
                //	resetSelect('tv_seriestype2');
                document.getElementById('tv_setuptype').options[0] = new Option("非対応機種", ""); // 設置方法（TV設置方法）
                document.getElementById('tv_seriestype').options[0] = new Option("非対応機種", ""); // 設置方法（機能選択）
                document.getElementById('tv_seriestype2').options[0] = new Option("非対応機種", ""); // 設置方法（機能選択）★非表示項目
                break;
            }
            // プルダウンに追加

            document.getElementById('tv_setuptype').options[0] = new Option("全て", "9", true, true); //2021.6.8
            if (!selected4[tv_setuptype]) {
                var setuptype_name = setuptype[tv_setuptype];
                i2++;
                // setButton()
                document.getElementById('tv_setuptype').options[i2] = new Option(setuptype_name, tv_setuptype);
                selected4[tv_setuptype] = 1;
            }
            //2021.6.8
            document.getElementById('tv_seriestype').options[0] = new Option('全シリーズ', '');
            document.getElementById('tv_seriestype').options[0].selected = true;
            setButton();
            if (flagSearchPage == 1) {
                search();
            }
        }
    }
}

// プルダウンメニュー生成（機能）
function setSelect5() {
    // リセット
    resetSelect('tv_seriestype'); // 機能
    resetSelect('tv_seriestype2'); // ★機能
    resetHtml('itemlist'); // 検索結果html
    resetButton(); // 検索ボタン
    // フォームの選択内容取得
    var tv_maker = document.getElementById('tv_maker').value; // メーカー
    var tv_size = document.getElementById('tv_size').value; // サイズ
    var tv_productid = document.getElementById('tv_productid').value; // 型番
    var tv_setuptype = document.getElementById('tv_setuptype').value; // 設置方法
    if (!tv_maker || !tv_size || !tv_productid || !tv_setuptype) { return; }
    // 検索
    // １つの機種に複数の合う金具がある
    var selected5 = [];
    var selected5b = [];
    //2021.6.8
    if (tv_setuptype != 9) {

        for (var i = 0; i < maindata.length; ++i) {
            var splits = maindata[i].split(",");
            if (splits[0] == tv_maker && splits[1] == tv_size && splits[2] == tv_productid && splits[5] == tv_setuptype) {
                var tv_kanaguid = splits[3]; // 金具ID
                var tv_seriestype = splits[8]; // 機能
                // 未登録の場合は追加
                if (!selected5[tv_seriestype + ":" + tv_kanaguid]) {
                    if (!seriestype[tv_seriestype]) { continue; } // 元データが空白の場合があるので設定している
                    if (!selected5b[tv_seriestype]) { selected5b[tv_seriestype] = ""; }
                    selected5b[tv_seriestype] += tv_kanaguid + ' '; // 検索用キーワード
                    selected5[tv_seriestype + ":" + tv_kanaguid] = 1; // 登録済みフラグ
                }
            }
        }
        // プルダウン生成
        var i2 = 0;
        for (tv_seriestype in selected5b) {
            i2++;
            var kanaguid = selected5b[tv_seriestype];
            var seriestype_name = seriestype[tv_seriestype];
            //	document.getElementById('tv_seriestype').options[i2] = new Option(seriestype_name,kanaguid);
            // 金具IDをセットする
            // このプルダウンは検索用で hidden にしている
            document.getElementById('tv_seriestype2').options[i2] = new Option(seriestype_name, kanaguid);
            // このプルダウンは、値を渡す為に使っている
            // 値をGETで渡すため大量の型番をアドレスバーに表示する事を避けるため
            // 設置方法の番号を送り、受け取り後、「tv_seriestype2」から金具IDに戻している
            document.getElementById('tv_seriestype').options[i2] = new Option(seriestype_name, tv_seriestype);
        }
        // 一つでも該当がある場合は「全シリーズ」の選択肢を設定し、検索ボタンを有効にする
        if (i2) {
            document.getElementById('tv_seriestype').options[0] = new Option('全シリーズ', '');
            document.getElementById('tv_seriestype').options[0].selected = true;
            document.getElementById('tv_seriestype2').options[0] = new Option('全シリーズ', '');
            document.getElementById('tv_seriestype2').options[0].selected = true;
            setButton();
            // 検索実行
            if (flagSearchPage == 1) {
                search();
            }
        }
    } else {
        for (var i = 0; i < maindata.length; ++i) {
            var splits = maindata[i].split(",");
            if (splits[0] == tv_maker && splits[1] == tv_size && splits[2] == tv_productid) {
                var tv_kanaguid = splits[3]; // 金具ID
                var tv_seriestype = splits[8]; // 機能
                // 未登録の場合は追加
                if (!selected5[tv_seriestype + ":" + tv_kanaguid]) {
                    if (!seriestype[tv_seriestype]) { continue; } // 元データが空白の場合があるので設定している
                    if (!selected5b[tv_seriestype]) { selected5b[tv_seriestype] = ""; }
                    selected5b[tv_seriestype] += tv_kanaguid + ' '; // 検索用キーワード
                    selected5[tv_seriestype + ":" + tv_kanaguid] = 1; // 登録済みフラグ
                }
            }
        }
        // プルダウン生成
        var i2 = 0;
        for (tv_seriestype in selected5b) {
            i2++;
            var kanaguid = selected5b[tv_seriestype];
            var seriestype_name = seriestype[tv_seriestype];
            //	document.getElementById('tv_seriestype').options[i2] = new Option(seriestype_name,kanaguid);
            // 金具IDをセットする
            // このプルダウンは検索用で hidden にしている
            document.getElementById('tv_seriestype2').options[i2] = new Option(seriestype_name, kanaguid);
            // このプルダウンは、値を渡す為に使っている
            // 値をGETで渡すため大量の型番をアドレスバーに表示する事を避けるため
            // 設置方法の番号を送り、受け取り後、「tv_seriestype2」から金具IDに戻している
            // document.getElementById('tv_seriestype').options[i2] = new Option(seriestype_name, tv_seriestype);
        }
        // 一つでも該当がある場合は「全シリーズ」の選択肢を設定し、検索ボタンを有効にする
        if (i2) {
            document.getElementById('tv_seriestype').options[0] = new Option('全シリーズ', '');
            document.getElementById('tv_seriestype').options[0].selected = true;
            document.getElementById('tv_seriestype2').options[0] = new Option('全シリーズ', '');
            document.getElementById('tv_seriestype2').options[0].selected = true;
            setButton();
            // 検索実行
            if (flagSearchPage == 1) {
                search();
            }
        }
    }
}

// 検索ボタンの有効化
function setButton() {
    // 機能が選択されていない場合は、ボタンをリセットする
    var kanaguid = document.getElementById('tv_seriestype').value; // 機能選択（金具IDがvalueに設定されてる）
    var kanagutext = document.getElementById('tv_seriestype').options[0].text; // 名前が「全シリーズ」かどうかを判断する為に取得
    if (kanaguid || kanagutext == '全シリーズ') {
        //	var buttonImg = pathImg + 'search2.gif';
        if (flagSearchPage) {
            //	html = '<img src="' + buttonImg + '" alt="検索" onclick="search();" />';
            html = '<div class="on" onclick="search();"><span>検索</span></div>';
        } else {
            //	html = '<img src="' + buttonImg + '" alt="検索" onclick="document.getElementById(\'tvk_form\').submit()" class="buttonon" />';
            html = '<div class="on" onclick="onSubmit();" class="buttonon"><span>検索</span></div>';
        }
        document.getElementById('search_bt').innerHTML = html;
    } else {
        resetButton();
    }
    // 検索実行
    if (flagSearchPage == 1) {
        search();
    }
    return;
}

function onSubmit() {
    localStorage['tv_maker'] = document.getElementById('tv_maker').value;
    localStorage['tv_size'] = document.getElementById('tv_size').value;
    localStorage['tv_productid'] = document.getElementById('tv_productid').value;
    //  2021.5.26  data-transision.csvファイルからデータを受けて、そのページに切り替えます
    // $.ajax({
    //     type: "GET",
    //     dataType: "text",
    //     url: "https://www.emotions.co.jp/tvsearch_test2/data-transition.csv",
    //     success: function(data) {

    //         var lines = data.split(/\r\n|\n/);
    //         var page_transition = [];
    //         var headers = lines[0].split(",")

    //         for (var i = 1; i < lines.length - 1; i++) {
    //             var obj = {};
    //             var currentline = lines[i].split(",");
    //             for (var j = 0; j < headers.length; j++) {
    //                 obj[headers[j]] = currentline[j]
    //             }
    //             page_transition.push(obj)
    //         }

    //         var page_url;
    //         for (var i = 0; i < page_transition.length; i++) {
    //             if (page_transition[i]['tv_maker'] == makerJ[localStorage['tv_maker']] && page_transition[i]['tv_productid'] == localStorage['tv_productid']) {
    //                 page_url = page_transition[i]['page_number'];
    //                 console.log(page_url)
    //             } else {
    //                 continue;
    //             }
    //         }
    var form = document.getElementById('tvk_form');
    // form.action = "https://www.ace-of-parts.com/page/194";
    window.parent.location.href = "https://www.ace-of-parts.com/data/ace-of-parts/image/" + makerE[localStorage['tv_maker']] + "/" + localStorage['tv_productid'] + ".html";
    // form.action = "https://www.ace-of-parts.com/data/ace-of-parts/image/" + makerE[localStorage['tv_maker']] + "/" + localStorage['tv_productid'] + ".html";
    // form.method = "post";
    // form.submit()
    //     }
    // })

}

// 検索ボタンの無効化
function resetButton() {
    //	document.getElementById('search_bt').innerHTML = '<img src="' + pathImg + 'search1.gif" alt="検索" />';
    document.getElementById('search_bt').innerHTML = '<div><span>検索</span></div>';
    return;
}


// セレクトリセット
function resetSelect(selectId) {
    var element = document.getElementById(selectId);
    var length2 = element.length;
    for (var i = length2; i > 0; --i) {
        if (element.options[i]) {
            element.options[i] = null;
        }
    }
    // jsで変化させているので、強制的に戻す
    if (selectId == 'tv_setuptype') {
        document.getElementById(selectId).options[0] = new Option('TV設置方法', '');
    } else if (selectId == 'tv_seriestype') {
        document.getElementById(selectId).options[0] = new Option('機能選択', '');
    } else if (selectId == 'tv_seriestype2') {
        document.getElementById(selectId).options[0] = new Option('機能選択', '');
    }
}

// htmlリセット
function resetHtml(id) {
    if (document.getElementById(id)) {
        document.getElementById(id).innerHTML = '';
    }
}


// 検索実行
search();
function search() {
    var url = window.location.href;
    var tv_maker_extra = url.split('/')[6];
    var tv_maker="";
    for(var i=0;i<makerE.length;i++){
        if(tv_maker_extra == makerE[i]){
            tv_maker = i;
        }
    }
    var tv_productid = url.split('/')[7].split('.')[0];
    var realDataList = [];
    for(var i=0;i<maindata.length;i++){
        var splits = maindata[i].split(',');
        if(splits[0] == tv_maker && splits[2] == tv_productid){
            realDataList.push(maindata[i]);
        }
    }



    // 価格データ読み込み
    var items = [];
    for (var i = 0; i < priceD.length; ++i) {
        var splits = priceD[i].split(",");
        var modelno = splits[0];
        //	console.log(modelno +' : '+ splits[1] +','+ splits[2] + "\n");
        items[modelno] = priceD[i];
    }
    var itemlist = '';
    for(var i=0; i<realDataList.length;i++){
        var splits_of_main = realDataList[i].split(',');
        if(items[splits_of_main[3]]){
            var splits_of_price = items[splits_of_main[3]].split(',');
            var modelno = splits_of_price[0];
            var pricea = splits_of_price[1];
            var price = addFigure(pricea);
            price = '<div class="stitle">通常価格<br>（税込）</div><div class="price">' + price + '円</div>';
            var title = splits_of_price[2];
            var copy = splits_of_price[3];
            var urlPage = splits_of_price[4];
            var urlImg = splits_of_price[5];
            var fit = splits_of_price[6];
            var image = '<a href="' + urlPage + '" target="_blank"><img src="' + urlImg + '" /></a>';
            title = '<a href="' + urlPage + '" target="_blank">' + title + '</a>';
            price = '<a href="' + urlPage + '" target="_blank">' + price + '</a>';

            if (modelno == 'contact') {
                modelno = '';
                copy = '';
                price = '';
            }
            itemlist += '<tr>';
            itemlist += '<td class="img" style="width:1%;">' + image + '</td>';
            itemlist += '<td class="title">' + title + '<div class="mno">' + modelno + '</div>' + copy + '</td>';
            itemlist += '<td class="price">' + price + '</td>';
            itemlist += '<td style="display:none">' + pricea + '</td>';
            itemlist += '<td style="display:none">' + fit + '</td>';
            itemlist += '</tr>';


        }else{
            itemlist += '<tr>';
            itemlist += '<td class="img"></td>';
            itemlist += '<td class="title">' + splits_of_main[3] + '</td>';
            itemlist += '<td class="price"></td>';
            itemlist += '</tr>';
        }
    }    
    // 金具IDが半角スペース区切りで入っているので配列に入れ直し、値毎に詳細を表示する
    // var itemlist = '';
    
    // var kanaguids = kanaguid.split(/ /g);
    // console.log('kanaguid->', kanaguid);

    // for (var i = 0; i < kanaguids.length; ++i) {
    //     if (!kanaguids[i]) { continue; }
    //     kanaguid = kanaguids[i];
    //     if (items[kanaguid]) {
    //         items[kanaguid] = items[kanaguid].replace(/,/g, "\t");
    //         items[kanaguid] = items[kanaguid].replace(/<c>/g, ",");
    //         var splits = items[kanaguid].split("\t");
    //         var modelno = splits[0];
    //         var pricea = splits[1];
    //         var price = addFigure(splits[1]);
    //         price = '<div class="stitle">通常価格<br>（税込）</div><div class="price">' + price + '円</div>'
    //         var title = splits[2];
    //         var copy = splits[3];
    //         var urlPage = splits[4];
    //         var urlImg = splits[5];
    //         var fit = splits[6];
    //         var image = '<a href="' + urlPage + '" target="_blank"><img src="' + urlImg + '" /></a>';
    //         title = '<a href="' + urlPage + '" target="_blank">' + title + '</a>';
    //         price = '<a href="' + urlPage + '" target="_blank">' + price + '</a>';
    //         // お問い合わせくださいの場合の調整
    //         if (modelno == 'contact') {
    //             modelno = '';
    //             copy = '';
    //             price = '';
    //         }
    //         itemlist += '<tr>';
    //         itemlist += '<td class="img" style="width:1%;">' + image + '</td>';
    //         itemlist += '<td class="title">' + title + '<div class="mno">' + modelno + '</div>' + copy + '</td>';
    //         itemlist += '<td class="price">' + price + '</td>';
    //         itemlist += '<td style="display:none">' + pricea + '</td>';
    //         itemlist += '<td style="display:none">' + fit + '</td>';
    //         itemlist += '</tr>';

    //     } else {
    //         itemlist += '<tr>';
    //         itemlist += '<td class="img"></td>';
    //         itemlist += '<td class="title">' + kanaguid + '</td>';
    //         itemlist += '<td class="price"></td>';
    //         itemlist += '</tr>';
    //     }
    // }


    //2021.6.14 遷移先ページの　上部の検索コンテンツは削除。

    // document.getElementById('myFrameS').style.display = "none";
    // $('#new-header > img').hide();
    document.getElementById('itemlist').innerHTML = '<table id="resultTable">' + itemlist + '</table>';
}


// 数値3桁区切り
function addFigure(str) {
    var num = new String(str).replace(/,/g, "");
    while (num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
    return num;
}

// // 20180909
// if (flagFramePage) {
//     // iframeでの読み込みの場合
//     setSelect1();
// } else {
//     // 検索結果ページで読み込みの場合
//     window.onload = setSelect1;
// }




