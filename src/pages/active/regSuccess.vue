<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <title>恭喜，注册成功</title>
    <link rel="stylesheet" href="css/fengKong.css">
</head>

<body>

    <div class="content">
        <!--Android版-->
        <div class="android">
            <div class="erweima">
            </div>
            <p>Android版</p>
        </div>

        <!--IOS版-->
        <div class="ios">
            <div class="erweima">
            </div>
            <p>IOS版</p>
        </div>

    </div>
</body>

</html>
<style>
    *{ padding: 0; margin: 0; }
    body{
        width: 100%;
        height: auto;
        background: url("img/reg/regSuccess.png") no-repeat;
        background-size: 100%;
        position: relative;
    }

    .content{
        position: absolute;
        width: 2.533333rem /* 190/75 */;
        height: auto;
        margin: 0 auto;
    }
    .android,
    .ios{
        width: 2.533333rem /* 190/75 */;
        margin-top: 11.333333rem /* 850/75 */; 
        margin-left: 3.733333rem /* 280/75 */;
    }
    .android .erweima,
    .ios .erweima{
        width: 2.533333rem /* 190/75 */;
        height: 2.533333rem /* 190/75 */;
        background: #FFFCEF;
        border-radius:.133333rem /* 10/75 */;
    }
    .android p,
    .ios p{
        width: 2.533333rem /* 190/75 */;
        font-size: .32rem /* 24/75 */;
        text-align: center;
        color: #fff;
        margin-top: .186667rem /* 14/75 */;
        margin-bottom: 3.346667rem /* 251/75 */;   
    }
    .android{
        display: none;
    }


</style>
<script src="js/jquery-3.3.1.min.js"></script>
<script src="js/flexible.min.js"></script>
<script src="js/jquery.backstretch.min.js"></script>
<script>
    // 判断手机系统--查看产品
var u = navigator.userAgent;
if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { //安卓手机
    // console.log("安卓手机");
    $(".ios").hide();
    $(".android").show();

} else if (u.indexOf('iPhone') > -1) { //苹果手机
    // console.log("苹果手机");
    $(".ios").show();
    $(".android").hide();
}
</script>