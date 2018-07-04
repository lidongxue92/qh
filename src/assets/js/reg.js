    
    var url = location.href;
    // var url = "http://10.0.0.174/H5luodiye/register.html?invitationCode=G38898"; 
    url = url.split("=");
    
    if (url[1] != "" && url[1] != null && url.length > 1) {
        invitationCode = url[1];
    }else{
        invitationCode = ""
    }
    
    //个人注册手机号码验证
    $("#phone").blur(function () {
        var mobile = $("#phone").val();
        var reMobile = /^1[34578]\d{9}$/;
        if (reMobile.test(mobile) == false || mobile == null) {
            $(".tishi").empty().append("请输入正确的手机号");
            $(".tishi").show();
            setTimeout(function(){
                $(".tishi").hide();
            }, 1500);
            return true;
        } else {
            $(".tishi").hide();
            var rPhone = mobile;

            return false;
        }
    })
        
    //点击获取短信验证码
    var countdown = 90;
    function settime(obj) {
        if (countdown == 0) {
            $(obj).attr("disabled", false);
            obj.value = "点击获取";
            countdown = 90;
            return;
        } else {
            $(obj).attr("disabled", true);
            obj.value = "重新发送(" + countdown + ")";
            countdown--;
        }
        setTimeout(function () {
            settime(obj);
        }, 1000)
    };
    //个人注册点击获取验证码
	$("#button").click(function () {
	    if ($("#phone").val() != "") {
	        settime(this);
	    }
	    //调用三方短信接口
	    jsonAjax("/three/getSmsCode", {
	        phone: $("#phone").val(),
	        msgType: 1
	    }, getSmsCode);

	    function getSmsCode(data) {
	        // console.log(data);
	        if (data.resultMsg == "请求参数[phone]不完整") {
	            $(".tishi").empty().append("请输入正确的手机号");
	            $(".tishi").show();
	            setTimeout(function () {
	                $(".tishi").hide();
	            }, 1500)
	        } else if (data.resultMsg == "短信验证码发送过于频繁，请稍后再试") {
	            $(".tishi").empty().append(data.resultMsg);
	            $(".tishi").show();
	            setTimeout(function () {
	                $(".tishi").hide();
	            }, 1500)
	        }
	    }

    });
    
	//个人注册短信验证码验证
	$("#smsCode").blur(function () {
	    var smsCode = $("#smsCode").val();
	    var regCode = /^\d{6}$/;
	    if (regCode.test(smsCode) == false) {
	        $(".tishi").empty().append("请输入正确的短信验证码");
	        $(".tishi").show();
	        setTimeout(function () {
	            $(".tishi").hide();
	        }, 1500);
	        return true;
	    } else {
	        $(".tishi").hide();
            
            var rSmsCode = smsCode;
	        return false;
	    }
    });
    
    //个人注册密码验证
    $("#pwd").blur(function () {
        var pwd = $("#pwd").val();
        var reqPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if (pwd == null || reqPwd.test(pwd) == false) {
            $(".tishi").empty().append("密码6-20位，字母、数字组合");
            $(".tishi").show();
            setTimeout(function () {
                $(".tishi").hide();
            }, 1500);
            return true;
        } else {
            $(".tishi").hide();
            var rPwd = pwd;

            return false;
        }
    })

    $(".btn").click(function () {
        var mobile = $("#phone").val();
        var reMobile = /^1[34578]\d{9}$/; //手机号

        var pwd = $("#pwd").val();
        var reqPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/; //密码

        if (reMobile.test(mobile) != false && pwd != null && reqPwd.test(pwd) != false) {
            jsonAjax("/reg/register", {
                phone: $("#phone").val(),
                smsCode: $("#smsCode").val(),
                clientType: "h5",
                regChannel: "h5",
                reqPwd: $.base64.btoa($("#pwd").val()),
                invitationCode: invitationCode
            }, personRegister);

            function personRegister(data) {
                console.log(data);
    
                if (data.result == 200) {
                    if (data.resultMsg == "该用户已经存在,请直接登陆！！！") {
                        $(".tishi").empty().append("该用户已经存在");
                        $(".tishi").show();
                        setTimeout(function () {
                            $(".tishi").hide();
                            // window.location.href = "regSuccess.html";
                        }, 1500)
                    }else{
                        window.location.href = "regSuccess.html";
                    }
                } else {
                    if (data.result == 300) {
                        if (data.resultMsg == "该用户已经存在,请直接登陆！！！") {
                            $(".tishi").empty().append("该用户已经存在");
                            $(".tishi").show();
                            setTimeout(function () {
                                $(".tishi").hide();
                                // window.location.href = "regSuccess.html";
                            }, 1500)
                        } else if (data.resultMsg == "短信验证码错误或已超时") {
                            $(".tishi").empty().append(data.resultMsg);
                            $(".tishi").show();
                            setTimeout(function () {
                                $(".tishi").hide();
                            }, 1500)
                        } else {
                            $(".tishi").empty().append("请输入完整正确的信息");
                            $(".tishi").show();
                            setTimeout(function () {
                                $(".tishi").hide();
                            }, 1500)
                        }

                    } else if (data.result == 100) {
                        $(".tishi").empty().append(data.resultMsg);
                        $(".tishi").show();
                        setTimeout(function () {
                            $(".tishi").hide();
                        }, 1500)
                    }
                }
            }
        } else {
            var inputVal = $('#main').find("input[type=text]").val();

            if (inputVal == "") {
                $(".tishi").empty().append("请输入正确完整的信息");
                $(".tishi").show();
                setTimeout(function () {
                    $(".tishi").hide();
                }, 1500)
            } else {
                if (reqPwd.test(pwd) == false) {
                    $(".tishi").empty().append("密码6-20位，字母、数字组合");
                    $(".tishi").show();
                    setTimeout(function () {
                        $(".tishi").hide();
                    }, 1500)
                } else if (reMobile.test(mobile) == false) {
                    $(".tishi").empty().append("请输入正确的手机号");
                    $(".tishi").show();
                    setTimeout(function () {
                        $(".tishi").hide();
                    }, 1500)
                }else{
                    $(".tishi").empty().append("请确认输入的信息是否正确");
                    $(".tishi").show();
                    setTimeout(function () {
                        $(".tishi").hide();
                    }, 1500)
                }
                
            }

        }
    });




    $(".closeEyes").click(function () {
        $(".openEyes").show();
        $(".closeEyes").hide();
        $("input[type=password]").attr("type","text");
    });

    $(".openEyes").click(function () {
        $(".closeEyes").show();
        $(".openEyes").hide();
        $("#pwd").attr("type", "password");
    });