window.onload = function() {
    alert('请先勾选商品再更改数量!')
    var oSelect = document.getElementById("selectAll");
    var aItems = document.getElementsByClassName("check-one");
    var oSum = document.getElementById("priceTotal");
    var oGoods = document.getElementById("selectedTotal");

    // 全选
    oSelect.onclick = function() {
        if (oSelect.checked) {
            for (var i = 0; i < aItems.length; i++) {
                if (aItems[i].checked) {

                } else {
                    oSelect.checked = true;
                    aItems[i].checked = true;
                    getStart();
                }
            }
        } else {
            //全消
            for (var i = 0; i < aItems.length; i++) {
                if (aItems[i].checked) {
                    aItems[i].checked = false;
                    oSum.innerText = 0;
                    oGoods.innerText = 0;
                } else {}
            }
        }
    }
}

function getStart() {
    var oSelect = document.getElementById("selectAll");
    var aItems = document.getElementsByClassName("check-one");
    var oSum = document.getElementById("priceTotal");
    var oGoods = document.getElementById("selectedTotal");

    var aSubtotal = document.getElementsByClassName("subtotal");
    var aCountInput = document.getElementsByClassName("count-input");
    var a = 0;

    for (var i = 0; i < aItems.length; i++) {
        if (aItems[i].checked) {
            chooseIt(i);
            a++;
            if (a == 3) {
                oSelect.checked = true; //当所有选项都选到时,全选按钮自动勾选
            }
        } else {
            oSelect.checked = false; //任意一个选项没勾选,全选按钮不选
            chooseIt(i);
        }
    }
}

function getSum() {
    var temp = 0;
    var oSum = document.getElementById("priceTotal");
    var aItems = document.getElementsByClassName("check-one");
    var aSubtotal = document.getElementsByClassName("subtotal");

    //循环,计算选中的商品的总价格
    for (var j = 0; j < aItems.length; j++) {
        if (aItems[j].checked) {
            temp += parseInt(aSubtotal[j].innerText);
        } else {
            temp += 0;
        }
    }

    oSum.innerText = temp;
}

function getGoods() {
    var num = 0;
    var oGoods = document.getElementById("selectedTotal");
    var aItems = document.getElementsByClassName("check-one");
    var aCountInput = document.getElementsByClassName("count-input");

    //循环,计算选中的商品的总数量
    for (var i = 0; i < aItems.length; i++) {
        if (aItems[i].checked) {
            num += parseInt(aCountInput[i].value);
        } else {
            num += 0;
        }
    }

    oGoods.innerText = num;
}

function getTotal(n) {
    var aPrice = document.getElementsByClassName("price");
    var aCountInput = document.getElementsByClassName("count-input");
    var aSubtotal = document.getElementsByClassName("subtotal");

    //计算单件商品的总价
    var oMoney = parseInt(aPrice[n].innerText) * parseInt(aCountInput[n].value);
    aSubtotal[n].innerText = oMoney;
}

function getPlus(n) {
    var aCountInput = document.getElementsByClassName("count-input");

    //增加单件商品的数量
    var temp = parseInt(aCountInput[n].value) + 1;
    aCountInput[n].value = temp;
}

function getReduce(n) {
    var aCountInput = document.getElementsByClassName("count-input");

    //减少单件商品的数量
    var temp = parseInt(aCountInput[n].value) - 1;
    aCountInput[n].value = temp;

    //当剪到数量为1件时,停止减
    if (aCountInput[n].value < 1) {
        aCountInput[n].value = 1;
    }
}

function showTotal() {
    if(document.getElementById('buyerName').value == '' && document.getElementById('number').value == '' && document.getElementById('contact').value == '') {
        alert('请先填写必要的个人信息!');
        return;
    }
    var price = document.getElementById("priceTotal").innerText;
    var str = '';
    str = '姓名:' + document.getElementById('buyerName').value + ' 学号:' + document.getElementById('number').value + ' 联系方式:' + document.getElementById('contact').value + ' ';
    var aCountInput = document.getElementsByClassName("count-input");
    var aItems = document.getElementsByClassName("check-one");
    var aCodes = document.getElementsByClassName("code");
    for (var j = 0; j < aItems.length; j++) {
        if (aItems[j].checked) {
            str += aCodes[j].innerText + 'x' + aCountInput[j].value + ' ';
        }
    }
    str = str + ' 总计:' + price + '元';
    base64 = b64EncodeUnicode(str);
    console.log(base64);
    return base64;
    //window.open('mailto: sfls-c3-g2021@outlook.com?subject=义卖订单&body=班级:%0d%0a姓名:%0d%0a学号:%0d%0a备注:%0d%0a%0d%0a%0d%0a%0d%0a购买内容(以下请勿更改):%0d%0a' + goods + '总计:' + price, '_blank');
}

function chooseIt(i) {
    var aAdd = document.getElementsByClassName("add");
    var aReduce = document.getElementsByClassName("reduce")
    var aDel = document.getElementsByClassName("delete");
    var oTab = document.getElementById("cartTable");

    aAdd[i].onclick = function() {
        getPlus(i); //增加单件商品数量
        getTotal(i); //计算单间商品总价
        getSum(); //计算总商品价格
        getGoods(); //计算总商品数量
    }

    aReduce[i].onclick = function() {
        getReduce(i); //减少单件商品数量
        getTotal(i);
        getSum();
        getGoods();
    }

    aDel[i].onclick = function() {
        var oDialog = confirm("确定要删除吗?");
        if (oDialog) {
            //oTab.tBodies[0].removeChild(aDel[i].parentNode.parentNode);
            //getGoods();
            //getSum();
            getTotal(i);
            getSum();
            getGoods();
            aCountInput[i].value = 0;
        }
        getStart(); //更新表格中行的数量
    }
    getGoods(); //显示初始总商品数量(在勾选了该商品,但未增加数量时,显示默认数量1)
    getSum(); //显示初始商品总价(在勾选了该商品,但未增加数量时,显示默认总价为1件商品的金额)
}