$(function () {
    $.backstretch(["img/risk/riskBg.png"]); //背景
});



for (var index = 1; index < 11; index++) {
    $("input[name='q" + index + "']").bind("click", {
        index: index
    }, answerClickEvent);
    $("#question" + index + " .pre").bind("click", {
        index: index
    }, preClickEvent);
}
// 选中样式
function answerClickEvent(event) {
    var index = event.data.index;
    $(".qMain" + index + " label").css("border", "1px solid #FFF");
    $(this).parent().css("border", "1px solid #2773FF");
    setTimeout(function(){
        if (index < 10) {
            $("#question" + index).hide();
            $("#question" + (index + 1)).show();
        }
    }, 500);
}
// 返回上一题
function preClickEvent(event) {
    var index = event.data.index;
    $("#question" + index).hide();
    $("#question" + (index - 1)).show();
}

$("#index .indexBtn").click(function () {
    $("#index").hide();
    $("#question1").show();
})

//获取url
var url = location.href;
var url = url.split("=");
var token = url[1];

// 提交
$("#question10 .submit").click(function () {
    var num1 = Number($("input[name='q1']:checked").val()),
        num2 = Number($("input[name='q2']:checked").val()),
        num3 = Number($("input[name='q3']:checked").val()),
        num4 = Number($("input[name='q4']:checked").val()),
        num5 = Number($("input[name='q5']:checked").val()),
        num6 = Number($("input[name='q6']:checked").val()),
        num7 = Number($("input[name='q7']:checked").val()),
        num8 = Number($("input[name='q8']:checked").val()),
        num9 = Number($("input[name='q9']:checked").val()),
        num10 = Number($("input[name='q10']:checked").val());

    var total = num1 + num2 + num3 + num4 + num5 + num6 + num7 + num8 + num9 + num10;
    // console.log(typeof total);

    $("#result .resBg p").empty().append(total + "分");
    if (!isNaN(total)) {
        //调接口
        jsonAjax("/user/saveInvestTestResult", {
            token: token,
            // token: "3266782724bd5503f2f0bf91133ad544",
            investTestResult: total,
        }, saveInvestTestResult);
        function saveInvestTestResult(data) {
            console.log(data);

            if (data.result == 200) {
                //提示判断
                if (total < 28) {
                    $("#question10").hide();
                    $("#result").show();
                } else if (total >= 28 && total <= 39) {
                    $("#question10").hide();
                    $("#result .resMain").hide();
                    $("#result .resMain1").show();
                    $("#result").show();
                } else if (total >= 39) {
                    $("#question10").hide();
                    $("#result").show();
                    $("#result .resMain").hide();
                    $("#result .resMain1").hide();
                    $("#result .resMain2").show();
                }
            }
        }
    } else {
        $("#question10").show();
        $(".tishi").show();
        setTimeout(function () {
            $(".tishi").hide();
        }, 2000);
    }

    
});



// 判断手机系统--查看产品
var u = navigator.userAgent;
if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { //安卓手机
    // console.log("安卓手机");
    $(".ios").hide();
    $(".android").show();
    function callAndroid() {       
        // risk.goManageMoney();
        window.risk.goManageMoney();
    }


} else if (u.indexOf('iPhone') > -1) { //苹果手机
    // console.log("苹果手机");
    $(".ios").show();
    $(".android").hide();
    function callIos() {
        window.webkit.messageHandlers.sayhello.postMessage({
            // body:""
        });
    }
}



