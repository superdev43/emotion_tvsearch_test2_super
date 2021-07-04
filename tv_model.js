document.getElementById('myFrame').style.display = "none";
document.getElementById('myFrameS').style.display = "block";
//   2021.6.14 そのタブグループの配下グループのタブを押下したら、上部のタブグループは押下した状態にしてください。
$(document).ready(function() {
    $('#guide-new > div.subsearch > div.subsearch-body > div:nth-child(1) > label > div.subsearch-content-main > dl').click(function() {
        $('#rad1').prop('checked', true)
    })
    $('#guide-new > div.subsearch > div.subsearch-body > div:nth-child(2) > label > div.subsearch-content-main > dl').click(function() {
        $('#rad2').prop('checked', true)
    })
    $('#guide-new > div.subsearch > div.subsearch-body > div:nth-child(3) > label > div.subsearch-content-main > dl').click(function() {
        $('#rad3').prop('checked', true)
    })
})

function ena(status) {
    if (status == 1) {
        document.getElementById("hang1").disabled = false;
        document.getElementById("hang2").disabled = false;
        document.getElementById("hang3").disabled = false;
    } else {
        document.getElementById("hang1").disabled = true;
        document.getElementById("hang2").disabled = true;
        document.getElementById("hang3").disabled = true;
        document.getElementById("hang1").checked = false;
        document.getElementById("hang2").checked = false;
        document.getElementById("hang3").checked = false;
    }
}

function radioA() {
    document.getElementById("hang").disabled = false;
    document.getElementById("woody").disabled = false;
    document.getElementById("rental").disabled = false;
    document.getElementById("op").disabled = false; //2021.5.28 ワンプッシュ（簡単取付） id='op'
    document.getElementById("bar").disabled = false;
    document.getElementById("ceil").disabled = false;
    document.getElementById("basic").disabled = true;
    document.getElementById("basic").checked = false;
    document.getElementById("stylish").disabled = true;
    document.getElementById("stylish").checked = false;
    document.getElementById("quality").disabled = true;
    document.getElementById("quality").checked = false;
    document.getElementById("lowprice").disabled = true;
    document.getElementById("lowprice").checked = false;
    document.getElementById("midprice").disabled = true;
    document.getElementById("midprice").checked = false;
    document.getElementById("highprice").disabled = true;
    document.getElementById("highprice").checked = false;
    document.getElementsByClassName('subsearch-content-main')[0].style.color = "black"
    document.getElementsByClassName('subsearch-content-main')[1].style.color = "lightgrey"
    document.getElementsByClassName('subsearch-content-main')[2].style.color = "lightgrey"

}

function radioB() {
    document.getElementById("hang").disabled = true;
    document.getElementById("hang").checked = false;
    document.getElementById("woody").disabled = true;
    document.getElementById("woody").checked = false;
    document.getElementById("rental").disabled = true;
    document.getElementById("rental").checked = false;
    document.getElementById("op").disabled = true; //2021.5.28 ワンプッシュ（簡単取付） id='op'
    document.getElementById("op").checked = false;
    document.getElementById("bar").disabled = true;
    document.getElementById("bar").checked = false;
    document.getElementById("ceil").disabled = true;
    document.getElementById("ceil").checked = false;
    document.getElementById("basic").disabled = false;
    document.getElementById("stylish").disabled = false;
    document.getElementById("quality").disabled = false;
    document.getElementById("lowprice").disabled = true;
    document.getElementById("lowprice").checked = false;
    document.getElementById("midprice").disabled = true;
    document.getElementById("midprice").checked = false;
    document.getElementById("highprice").disabled = true;
    document.getElementById("highprice").checked = false;
    document.getElementsByClassName('subsearch-content-main')[0].style.color = "lightgrey"
    document.getElementsByClassName('subsearch-content-main')[1].style.color = "black"
    document.getElementsByClassName('subsearch-content-main')[2].style.color = "lightgrey"
    ena(2);
    fitClass();
}

function radioC() {
    document.getElementById("hang").checked = false;
    document.getElementById("hang").disabled = true;
    document.getElementById("woody").disabled = true;
    document.getElementById("woody").disabled = true;
    document.getElementById("woody").checked = false;
    document.getElementById("rental").disabled = true;
    document.getElementById("rental").checked = false;
    document.getElementById("op").disabled = true; //2021.5.28 ワンプッシュ（簡単取付） id='op'
    document.getElementById("op").checked = false;
    document.getElementById("bar").disabled = true;
    document.getElementById("bar").checked = false;
    document.getElementById("ceil").disabled = true;
    document.getElementById("ceil").checked = false;
    document.getElementById("basic").disabled = true;
    document.getElementById("basic").checked = false;
    document.getElementById("stylish").disabled = true;
    document.getElementById("stylish").checked = false;
    document.getElementById("quality").disabled = true;
    document.getElementById("quality").checked = false;
    document.getElementById("lowprice").disabled = false;
    document.getElementById("midprice").disabled = false;
    document.getElementById("highprice").disabled = false;
    document.getElementsByClassName('subsearch-content-main')[0].style.color = "lightgrey"
    document.getElementsByClassName('subsearch-content-main')[1].style.color = "lightgrey"
    document.getElementsByClassName('subsearch-content-main')[2].style.color = "black"
    ena(2);
    price();
}

var beforeList = [];
var list = new Array();
var currentPage = 1;
var numberPerPage = 10;
var numberOfPage = 1;
var rowLength = "";
var sort_number = 0;
var base_list = new Array();


window.addEventListener('load', function() {
    setTimeout(function() { paginat() }, 3000);
}, false);

function paginat() {
    var table = document.getElementById('resultTable');
    if (table) {
        rowLength = table.rows.length;
        // console.log(rowLength);

        for (i = 0; i < rowLength; i++) {
            var oCells = table.rows.item(i).cells;
            var cellLength = oCells.length;
            var cell_array = []
            for (var j = 0; j < cellLength; j++) {
                var cellVal = oCells.item(j).innerHTML;
                if (j == 3) {
                    cellVal = Number(cellVal);
                }
                cell_array.push(cellVal);
            }
            list.push(cell_array)
        }

        console.log('basic->', list);

        list.sort(sortFunction);
        base_list = list;
        //2021.5.20 絞り込み検索のデフォルトを設定(デフォルト：金具タイプで絞込み－壁掛け－角度固定、上下角度、上下左右にチェック。)
        // document.getElementById('hang1').checked = true
        // document.getElementById('hang1').disabled = false

        // document.getElementById('hang2').checked = true
        // document.getElementById('hang2').disabled = false

        // document.getElementById('hang3').checked = true
        // document.getElementById('hang3').disabled = false

        // document.getElementById('rad1').checked = true
        // document.getElementById('hang').checked = true
        // fitAlign(1);
        numberOfPage = getNumberOfPages();
        createNum(numberOfPage);
        loadList();
    }
}

function getNumberOfPages() {
    return Math.ceil(rowLength / numberPerPage);
}

function nextPage() {
    currentPage += 1;

    var parent = document.getElementById('number_bar').parentNode;
    var items = parent.querySelectorAll(".pager-item");
    for (var x = 0; x < items.length; x++) {
        items[x].classList.remove("selected");
    }
    var n = currentPage - 1;
    document.getElementsByClassName('pager-item')[n].classList.add('selected');
    loadList();
    // createNum(numberOfPage);
}

function previousPage() {
    currentPage -= 1;

    var parent = document.getElementById('number_bar').parentNode;
    var items = parent.querySelectorAll(".pager-item");
    for (var x = 0; x < items.length; x++) {
        items[x].classList.remove("selected");
    }
    var n = currentPage - 1;
    document.getElementsByClassName('pager-item')[n].classList.add('selected');
    loadList();
}

function loadList() {


    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;
    pageList = list.slice(begin, end);

    var begina = begin + 1;
    if (currentPage == numberOfPage) {
        enda = rowLength;
    } else {
        enda = end;
    }
    var paginate_header = begina + " ~ " + enda + "件  &nbsp;(全 " + rowLength + " 件）";
    // console.log(rowLength);

    document.getElementById('paginate_header').innerHTML = paginate_header;

    drawList();
    check();
}
//「さらに絞り込む」ボタンをクリックすると実行
function show_result() {
    //絞込み条件を設定してくださ
    if (!document.getElementById('rad1').checked && !document.getElementById('rad2').checked && !document.getElementById('rad3').checked) { document.getElementById('condition-setting').style.display = 'block' } else { document.getElementById('condition-setting').style.display = 'none' }
    var main = document.getElementsByClassName('subsearch-content-main')
    var children_type = main[0].getElementsByTagName("input")
    var children_count = 0;

    if (children_type[0].checked) {
        var grandchildren = [children_type[1], children_type[2], children_type[3]]
        for (var i = 0; i < grandchildren.length; i++) {
            if (grandchildren[i].checked)
                children_count++;
        }
    }

    for (var i = 4; i < children_type.length; i++) {
        if (children_type[i].checked)
            children_count++;
    }

    var children_class = main[1].getElementsByTagName('input');

    for (var i = 0; i < children_class.length; i++) {
        if (children_class[i].checked)
            children_count++
    }



    var children_amount = main[2].getElementsByTagName('input');

    for (var i = 0; i < children_amount.length; i++) {
        if (children_amount[i].checked)
            children_count++
    }

    if (children_count == 0) {
        document.getElementById('condition-setting').style.display = 'block'

        // rowLength = beforeList.length
        // numberOfPage = getNumberOfPages();
    } else {
        document.getElementById('condition-setting').style.display = 'none'
        loadList()
        createNum(numberOfPage);
    }


    if (list == "") {
        document.getElementById("next").disabled = true;
        document.getElementById("previous").disabled = true;
    }


    // beforeList = list

}

function drawList() {
    var itemlist = '';
    if (pageList.length > 0) {

        for (r = 0; r < pageList.length; r++) {
            itemlist += '<tr>';
            itemlist += '<td class="img" style="width:1%;">' + pageList[r][0] + '</td>';
            itemlist += '<td class="title">' + pageList[r][1] + '</td>';
            itemlist += '<td class="price">' + pageList[r][2] + '</td>';
            itemlist += '</tr>';
        }

        document.getElementById("resultTable").innerHTML = itemlist;
    } else {
        document.getElementById("resultTable").innerHTML = "<h4 style='color:red;text-align:center'>検索結果がありませんでした。条件を変更して再度検索しなおしてください</h4>";
    }

}

function check() {
    document.getElementById("next").disabled = currentPage == numberOfPage ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
    if (numberOfPage == 0)
        document.getElementById("next").disabled = true
}

function number_ten() {
    numberPerPage = 10;
    numberOfPage = getNumberOfPages();
    currentPage = 1;
    loadList();
    createNum(numberOfPage);

    document.getElementById('pag_ten').style.backgroundColor = "#92a492"
    document.getElementById('pag_fifty').style.backgroundColor = "green"

}

function number_fifty() {
    numberPerPage = 50;
    numberOfPage = getNumberOfPages();
    currentPage = 1;
    loadList();
    createNum(numberOfPage);
    document.getElementById('pag_ten').style.backgroundColor = "green"
    document.getElementById('pag_fifty').style.backgroundColor = "#92a492"

}

function sortFunction(a, b) {
    if (a[3] === b[3]) {
        return 0;
    } else {
        return (a[3] < b[3]) ? -1 : 1;
    }
}

function sortOrder() {
    if (sort_number == 0) {
        list.sort(sortFunction).reverse();
        loadList();
        document.getElementById('number_order').src = "https://www.emotions.co.jp/tvsearch_test2/2.svg";
        sort_number = 1;
    } else {
        list.sort(sortFunction);
        loadList();
        document.getElementById('number_order').src = "https://www.emotions.co.jp/tvsearch_test2/1.svg";
        sort_number = 0;
    }
}
//2021.5.28--------------３桁目
function fitAlign(filtertype) {
    if (filtertype == 1) {
        var hflist;
        var hslist;
        var htlist;
        var hangF = document.getElementById("hang1").checked;
        var hangS = document.getElementById("hang2").checked;
        var hangT = document.getElementById("hang3").checked;

        if (hangF == true) {
            hflist = fitAlignFiter(1);
        } else {
            hflist = "";
        }

        if (hangS == true) {
            hslist = fitAlignFiter(2);
        } else {
            hslist = "";
        }

        if (hangT == true) {
            htlist = fitAlignFiter(3);
        } else {
            htlist = "";
        }
        list = [...hflist, ...hslist, ...htlist];
        console.log('fitType->', list);
    }
    if (filtertype == 4) {
        list = fitAlignFiter(4);
        ena(2);
    }

    rowLength = list.length;
    numberOfPage = getNumberOfPages();
    currentPage = 1;
    // loadList();
    // createNum(numberOfPage);
    // if (list == "") {
    //     document.getElementById("next").disabled = true;
    //     document.getElementById("previous").disabled = true;
    // }
}

function fitAlignFiter(arg) {
    var fitFilterlist = base_list.filter(innerArray => innerArray[4][1] == arg);
    return fitFilterlist;
}
//2021.5.28--------------2桁目
function fitRent() {
    var r_list;
    var rent = document.getElementById('rental');
    if (rent.checked) {
        r_list = base_list.filter(innerArray => innerArray[4][2] == 1);
    } else {
        r_list = base_list.filter(innerArray => innerArray[4][2] == 0);

    }
    ena(2)
    list = [...r_list];
    rowLength = list.length;
    numberOfPage = getNumberOfPages();
    currentPage = 1
}
//2021.5.28--------------1桁目
function fitOp(param) {

    var o_lsit;
    o_lsit = base_list.filter(innerArray => innerArray[4][3] == param);
    list = [...o_lsit]

    ena(2)
    rowLength = list.length;
    numberOfPage = getNumberOfPages();
    currentPage = 1

}

//2021.5.28--------------1桁目
function fitClass() {
    var alist;
    var blist;
    var clist;
    var basic = document.getElementById("basic").checked;
    var stylish = document.getElementById("stylish").checked;
    var quality = document.getElementById("quality").checked;

    if (basic == true) {
        alist = fitClassFiter(1);
    } else {
        alist = "";
    }

    if (stylish == true) {
        blist = fitClassFiter(2);
    } else {
        blist = "";
    }

    if (quality == true) {
        clist = fitClassFiter(3);
    } else {
        clist = "";
    }
    list = [...alist, ...blist, ...clist];
    console.log('fitClass->', list);
    // list = list
    // alert(list.length)
    rowLength = list.length;
    numberOfPage = getNumberOfPages();
    currentPage = 1;
    // loadList();

    // if (list == "") {
    //     document.getElementById("next").disabled = true;
    //     document.getElementById("previous").disabled = true;
    // }
}

function fitClassFiter(arg) {
    var fitFilterlist = base_list.filter(innerArray => innerArray[4][0] == arg);
    return fitFilterlist;
}

function price() {

    var alist;
    var blist;
    var clist;
    var lowprice = document.getElementById("lowprice").checked;
    var midprice = document.getElementById("midprice").checked;
    var highprice = document.getElementById("highprice").checked;

    if (lowprice == true) {
        alist = base_list.filter(innerArray => innerArray[3] < 5000);
    } else {
        alist = "";
    }

    if (midprice == true) {
        blist = base_list.filter(innerArray => innerArray[3] > 5000);
        blist = blist.filter(innerArray => innerArray[3] < 10000);
    } else {
        blist = "";
    }

    if (highprice == true) {
        clist = base_list.filter(innerArray => innerArray[3] > 10000);
    } else {
        clist = "";
    }
    list = [...alist, ...blist, ...clist];
    console.log('price->', list);

    rowLength = list.length;
    numberOfPage = getNumberOfPages();
    currentPage = 1;
    // loadList();
    // createNum(numberOfPage);
    // if (list == "") {
    //     document.getElementById("next").disabled = true;
    //     document.getElementById("previous").disabled = true;
    // }
}

function fitTypeFiter(n, arg) {
    var fitFilterlist = base_list.filter(innerArray => innerArray[n] == arg);
    return fitFilterlist;
}

function createNum(count) {
    var sortNum = document.getElementById('number_bar');
    sortNum.innerHTML = "";


    for (var i = 0; i < count; i++) {
        var page = document.createElement('span');
        page.innerHTML = i + 1;
        page.className = "pager-item";
        page.dataset.index = i;

        if (i == 0)
            page.classList.add("selected");

        page.addEventListener('click', function() {
            var parent = this.parentNode;
            var items = parent.querySelectorAll(".pager-item");
            for (var x = 0; x < items.length; x++) {
                items[x].classList.remove("selected");
            }
            this.classList.add('selected');
            currentPage = Number(this.dataset.index) + 1;
            loadList();
        })

        sortNum.appendChild(page);
    }
}