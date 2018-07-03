//// 倒计时
//var interval = 1000;
//中奖用户的信息
//获取参数
	//function getQueryString(name) {
	//	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	//	var r = window.location.search.substr(1).match(reg);
	//	if (r != null) return unescape(r[2]);
	//	return null;
	//}
	//var login = getQueryString("login");
	//var loginName = getQueryString("loginName");
	//var isapp = getQueryString("isapp");
	//var memberId = getQueryString("memberId");
	//
	////是否在APP&是否登录 
	//if (isapp == 1) {
	//	if (login == 1) {
	//		$("#tzbtn").attr("href", "cjq:terminal");
	//	} else {
	//		$("#tzbtn").attr('href', 'cjq:login');
	//	}
	//} else {
	//	$("#share").hide();
	//	//$("#tzbtn").attr("href", "https://*****.html");
	//}
	//
	//// 滚动-start
	//// 左边
	//var speedi = 80;
	//var colee2 = document.getElementById("colee2");
	//var colee1 = document.getElementById("colee1");
	//var colee = document.getElementById("colee");
	//colee2.innerHTML = colee1.innerHTML; //克隆colee1为colee2
	//function Marquee1() {
	//	//当滚动至colee1与colee2交界时
	//	if (colee2.offsetTop - colee.scrollTop <= 0) {
	//		colee.scrollTop -= colee1.offsetHeight; //colee跳到最顶端
	//	} else {
	//		colee.scrollTop++
	//	}
	//}
	//var MyMar1 = setInterval(Marquee1, speedi) //设置定时器
	//	// 右边
	//var coleer2 = document.getElementById("coleer2");
	//var coleer1 = document.getElementById("coleer1");
	//var coleer = document.getElementById("coleer");
	//coleer2.innerHTML = coleer1.innerHTML; //克隆colee1为colee2
	//function Marqueer1() {
	//	//当滚动至colee1与colee2交界时
	//	if (coleer2.offsetTop - coleer.scrollTop <= 0) {
	//		coleer.scrollTop -= coleer1.offsetHeight; //colee跳到最顶端
	//	} else {
	//		coleer.scrollTop++
	//	}
	//}
	//var MyMarr1 = setInterval(Marqueer1, speedi) //设置定时器
	//	// console.log(num+"  "+arr[num])
	//	// 滚动-end
	//	// 中奖用户
	//jp = {
	//	'1': ["0", "0.1%加息券"],
	//	'2': ["1", "0.2%加息券"],
	//	'3': ["2", "0.3%加息券"],
	//	'4': ["3", "谢谢参与"],
	//	'5': ["4", "Iphone8"],
	//	'6': ["5", "0.5元"],
	//	'7': ["6", "0.1元"],
	//	'8': ["7", "10元"],
	//};
	//奖品列表信息


//转盘主体代码
$(function(){
	/*点击开始按钮，开始抽奖*/
	var $btn = $(".g-lottery-img");//要旋转的div，就是奖项转盘
	var beginCount = 3; //初始次数，有后台传入也可
	$("#beginCount").html(beginCount);//显示在页面上的剩余抽奖次数
	var isTrue = 0;//判断是否正在抽奖（FALSE）
	
//	var islogin = 0;//登录状态（false）
	
  //抽奖事件(现在的概率：说到底就是用一个1~8的随机数，然后把对应的角度值传给jquery.rotate.js,它就会转到相应的地方，不给数值，就转不到)---在这里调取概率
	var clickPrize = function(){
		var data = [2,3,4,5,6,7,8];//抽奖的奖项的数值
		var name = "加息券1%(投资满1000可用，产品期限30天)";
		//data为随机出来的结果，根据概率后的结果（1-8的随机数）
		data = data[Math.floor(Math.random()*data.length)];
		
		//角度的变化（data的值（奖项），角度）
		switch(data){
			case 1:
				rotateFn(1,25,"iPhone X");
				break;
			case 2:
				rotateFn(2, 70, '10元投资红包(投资满1000可用，产品期限30天)');
				break;
			case 3:
				rotateFn(3, 115, '20元投资红包(投资满2000可用，产品期限30天)');		
				break;
			case 4:
				rotateFn(4, 160, '50元投资红包(投资满5000可用，产品期限90天)');
				break;//几率最大
			case 5:
				rotateFn(5, 203, '加息券1%(投资满1000可用，产品期限30天)');//	
				break;
			case 6:
				rotateFn(6, 245, '加息券2%(投资满2000可用，产品期限90天)');
				break;
			case 7:
				rotateFn(7, 290, '100元话费');
				break;
			case 8:
				rotateFn(8, 340, '900元京东卡');
				break;
		}
			
	};//抽奖品模块
	
  //开始按钮
	$(".clickBtn").click(function(){
		/*$.ajax({
			url: "data.json",
			type: "GET",
			dataType: "json",
			success: function(data) {
				//console.log(data);
				isLogin = data.isLogin;//0未登录，1已登录
				dataList = data.dataList;
//				console.log(dataList);
				//判断是否登录
				if (isLogin == 0) {
					$(".zheZhao").show();
					$(".goLogin").show();//显示去登陆提示
					$(".okBtn").click(function(){
						$(".zheZhao").hide();
						$(".goLogin").hide();
					});
					$(".closeBtn").click(function(){
						$(".zheZhao").hide();
						$(".goLogin").hide();
					});
				} else{*/
					if (isTrue) return; // 如果正在抽奖就退出
					isTure = true; // 正在抽奖
				  //判断次数
					if(beginCount <= 0){
						//如果次数为0时
						$(".zheZhao").show();//遮罩显示
						$(".NoPassnum").show();//次数用完弹窗
					   //确定按钮
						$(".okBtn").click(function(){
							$(".zheZhao").hide();
							$(".NoPassnum").hide();
						});
						$("#beginCount").html(0);//次数显示为0
						isTrue = false;//停止抽奖
					}else {
						//如果还有次数
						beginCount = beginCount -1;//执行一次抽奖，次数减1
						if(beginCount<=0){
							beginCount = 0;
						}
						$("#beginCount").html(beginCount);//次数-1显示
						clickPrize();//执行抽奖事件
					}
				/*}
			},
			error: function(data) {
				console.log(data);
	        }
		});*/

	});//开始按钮模块
	
	
  //旋转角度(奖项，角度，显示的文本（奖项名称）)---旋转插件
	var rotateFn = function(awards,angle,text){
		isTrue = true; //正在抽奖
		$btn.stopRotate();//停止旋转
		$btn.rotate({
			angle:0,//旋转的角度数，默认0
			animateTo: angle + 1440,//从当前的角度（0），加上1440度（4圈），进行旋转
			duration:4000,//制定animateTo的旋转动画的耗时
			callback:function(){
				isTrue = false;//停止抽奖
				
				$(".texts").html("恭喜您，已获得<br>" + text);//终将是的弹窗内容
				$(".zheZhao").show();//遮罩
				$(".notePrize").show();//奖品提示弹框
				//close按钮
				$(".closeBtn").click(function(){
					$(".zheZhao").hide();
					$(".notePrize").hide();
				});
				//确定按钮
				$(".okBtn").click(function(){
					$(".zheZhao").hide();
					$(".notePrize").hide();
				
			//判断是否填写地址
					if(text == "100元话费" || text == "900元京东卡" || text == "iPhone X"){
						alert("请输入地址")
					}else {
						alert("请在‘我的账户’进行查看")
					}
				});
				
				
					
			
			}
		});
	};//旋转角度函数模块
	
});//结束
