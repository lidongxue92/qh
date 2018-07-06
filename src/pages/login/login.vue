<template>
<div class="logTop">
    <topComponent title='登录' :showLeft='false'>
        <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
    </topComponent>

    <div class="settlein">
        <div class="bg-img">
          <img src="~@/assets/img/logo@2x.png">
        </div>
        <div class="middle">
            <ul>
                <li class="password active" @click="tab">密码登录</li>
                <li class="message" @click="tab1">短信登录</li>
            </ul>
            <!-- 密码登陆 -->
            <div class="login_content1 " v-if="isshow">
                <label>
                    <input type="text" placeholder="请输入手机号" class="register_content_input" v-model= "userPhone" @blur="checkLPhone" maxlength="11" @input="img1">
                    <span class="tishixiaoxi disappear">请输入手机号。</span>
                    <img src="../../assets/img/loginClear.png" class="LoginImg img1" @click="clear">
                </label>
                <label>
                    <input :type="type" placeholder="请输登录入密码" class="register_content_input pwd" v-model="userPwd" @blur="checkLPsd" @input="changBGC" maxlength="20"><br>
                    <span class="tishixiaoxi disappear">6~20位数字、字母或特殊符号组合</span>
                    <img src="../../assets/img/loginClear.png" class="LoginImg img2" @click="clear1" style="right: 2.1rem;top: 0.7rem;">
                    <img :src="imgSrc" class="LoginImg" @click="eyesTab">
                </label>
                <a href="javascript:" @click="findpassword">忘记密码?</a>
                <button class="login" @click="Login" style="padding-top: 0;">登录</button>
                <a class="user_login" @click="settlein" style="background: #2773FF;opacity: 1">注册</a>
            </div>

            <!-- 短信登陆 -->
            <div class="list" v-if="isshow1">
              <label>
                  <input type="text" placeholder="请输入手机号" class="register_content_input" v-model= "userPhone1" @blur="checkLPhone1" maxlength="11" @input="img5">
                  <img src="../../assets/img/loginClear.png" class="LoginImg img5" @click="clear2">
                </label>
                <label class="clearfix" style="margin-top: 30px;">
                  <input type="text" placeholder="请输入图片验证码" class="yanzhengma_input" @blur="checkLpicma" v-model="picLyanzhengma" maxlength="4" @input="img4">
                  <img src="../../assets/img/loginClear.png" class="LoginImg img3" @click="clear3" style="right: 40%">
                  <input type="button" id="code" @click="createCode"  class="verification1" v-model="checkCode"/> <br>
                </label>
                <label class="clearfix" style="margin-top: 30px;">
                  <input type="text" placeholder="请输入验证码" class="yanzhengma_input pwd1" v-model="verifyCode" maxlength="6" @input="changBGC1">
                  <img src="../../assets/img/loginClear.png" class="LoginImg img4" @click="clear4" style="right: 40%">
                  <input type="button" :value="btnText"
                      :disabled="disabled"  @click="sendCode" class="verification"/> <br>
                </label>
                <button class="login1" @click="msgLogin" style="padding-top: 0;">登录</button>
                <a class="user_login" @click="settlein" style="background: #2773FF;opacity: 1">注册</a>
            </div>
        </div>
        <!-- 弹框 -->
        <div class="bg"></div>
        <div class="toast">
            <img class="right" src="~@/assets/img/close1.png" @click="close"/>
            <img src="../../assets/img/active.png">
            <button class="button" @click="kaiHu">开户使用新手礼包</button>
        </div>
    </div>

    <!-- 版权 -->
    <div class="banQuan">
        <p>©2018 途粒 (上海) 金融信息服务有限公司 版权所有</p>
        <p>@启航金服  理财有风险，投资需谨慎</p>
    </div>


  <!-- 开户 -->
    <div class="box" style="display:none;">
        <form  name="regSubmit" method="post" :action="ChinaPnrServer">
             <input type='text' name='Version'  :value='Version'>
             <input type='text' name='CmdId'  :value='CmdId'>
             <input type='text' name='MerCustId' :value='MerCustId'>
             <input type='text' name='RetUrl'  :value='RetUrl'>
             <input type='text' name='BgRetUrl' :value='BgRetUrl'>
             <input type='text' name='UsrId'  :value='UsrId'>
             <input type='text' name='UsrMp' :value='UsrMp'>
             <input type='text' name='PageType'  :value='PageType'>
             <input type='text' name='ChkValue'  :value='ChkValue'>
             <input type='text' name='MerPriv' :value='MerPriv'>
        </form>
    </div>
</div>
</template>
<script>
import { XInput, Group, XButton, Cell, Toast } from 'vux'
import axios from 'axios'
let Base64 = require('js-base64').Base64;
import * as myPub from '../../assets/js/public.js'
import $ from 'jquery';
import topComponent from '../../components/common/top';
var code ; //在全局定义验证码
export default {
    components: {
        XInput,
        XButton,
        Group,
        Cell,
        Toast,
        topComponent
    },
    data () {
      return {
        btnText: '发送验证码',
        disabled: false,
        time: 0,
        verifyCode: '',
        userPhone:'',
        userPhone1:'',
        dialog: false,
        userPwd:'',
        picLyanzhengma:'',
        checkCode:'',
        isshow:true,
        isshow1:false,
        tel:'',
        items: [
          {state: true}
        ],
        isshow2:'true',
        imgSrc:"./static/img/closeEyes.png",
        type:"password",


        // 三方开户数据
        ChinaPnrServer : "",
        Version : "",
        CmdId : "",
        MerCustId : "",
        RetUrl : "",
        BgRetUrl :"",
        MerPriv : "",
        UsrId : "",
        UsrMp : "",
        PageType : "",
        ChkValue : "",
      }
    },
    methods:{
        goBack(){
            this.$router.back()
        },
        // 清空手机号
        clear(){
            this.userPhone = ""
            $(".login").css("opacity",".5");
            setTimeout(() => {
                $(".img1").css('display','none')
            }, 1000)
        },
        img1(){
            const len = this.userPhone.length
            if (len >= 1) {
                $(".img1").css('display','block')
            }
        },
        // 清空手机号
        clear2(){
            this.userPhone1 = ""
            $(".login1").css("opacity",".5");
            setTimeout(() => {
                $(".img5").css('display','none')
            }, 1000)
        },
        img5(){
            const len = this.userPhone1.length
            if (len >= 1) {
                $(".img5").css('display','block')
            }
        },
        // 清空密码
        clear1(){
            this.userPwd1 = ""
            $(".login").css("opacity",".5");
            setTimeout(() => {
                $(".img2").css('display','none')
            }, 1000)
        },
        // 清空图形验证码
        clear3(){
            this.picLyanzhengma = ""
            $(".login1").css("opacity",".5");
            setTimeout(() => {
                $(".img3").css('display','none')
            }, 1000)
        },
        img4(){
            const len = this.picLyanzhengma.length
            if (len >= 1) {
                $(".img3").css('display','block')
            }
        },
        // 清空验证码
        clear4(){
            this.verifyCode = ""
            $(".login1").css("opacity",".5");
            setTimeout(() => {
                $(".img4").css('display','none')
            }, 1000)
        },
        // 眼睛切换
        eyesTab(){
            if (this.imgSrc == "./static/img/loginEyes.png") {
                this.imgSrc = "./static/img/closeEyes.png";
                this.type = "password"
            }else{
                this.imgSrc = "./static/img/loginEyes.png";
                this.type = "text"
            }
        },
        settlein(){
            this.$router.push({path:"/settlein"})
        },
        findpassword(){
            this.$router.push({path:"/findpassword"});
        },
        checkUserPhone(){
            if(this.userPhone == ''){
            //   console.log(111)
            $(".hiddenTanchuang").removeClass('hiddenTanchuang')
            }
        },
        hiddenTanchuang(){
            $(".tanchuang").addClass("hiddenTanchuang")
        },
        // 验证登陆手机号格式
        checkLPhone(){
            if(this.userPhone == ''){
                  //   this.$vux.alert.show({
                  //   title: '',
                  //   content: '请输入手机号'
                  // })
                  // setTimeout(() => {
                  //     this.$vux.alert.hide()
                  // }, 1000)
                  return false

            }else if(this.userPhone.search(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)==0){
                $(".middle span:eq(0)").addClass("disappear")
                return true;
            }else{
                this.$vux.alert.show({
                title: '',
                content: '请输入正确手机号'
              })
              setTimeout(() => {
                  this.$vux.alert.hide()
              }, 1000)
            }
        },
        checkLPhone1(){
            if(this.userPhone1 == ''){
              //   this.$vux.alert.show({
              //   title: '',
              //   content: '请输入手机号'
              // })
              // setTimeout(() => {
              //     this.$vux.alert.hide()
              // }, 1000)
              return false
            }else if(this.userPhone1.search(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)==0){
                $(".middle span:eq(0)").addClass("disappear")
                return true;
            }else{
               this.$vux.alert.show({
                title: '',
                content: '请输入正确手机号'
              })
              setTimeout(() => {
                  this.$vux.alert.hide()
              }, 1000)
            }
        },
        // 验证登录密码
        checkLPsd(){
            if(this.userPwd == ''){
                return false
            }else if(this.userPwd.search(/^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-zA-Z]|[0-9]){6,20}$/) == 0){
                $(".login_content1  span:eq(1)").addClass("disappear");
                return true;
            }else{
                 this.$vux.alert.show({
                title: '',
                content: '密码由6~20位数字、字母或特殊符号组合'
              })
              setTimeout(() => {
                  this.$vux.alert.hide()
              }, 1000)
            }
        },
        // 判断登陆背景色
        changBGC(){
            var pwdLen = $(".pwd").val().length;
            if (pwdLen >= 6 && this.checkLPhone() == true) {
                // console.log(pwdLen);
                $(".login").css("opacity","1");
            }else{
                $(".login").css("opacity",".5");
            }
            if (pwdLen >= 1) {
                $(".img2").css("display","block")
            }
        },
        changBGC1(){
            var pwd = $(".pwd1").val().length;
            if (pwd >= 6 && this.checkLpicma() == true) {
                // console.log(pwdLen);
                $(".login1").css("opacity","1");
            }else{
                $(".login1").css("opacity",".5");
            }
            if (pwd >= 1) {
                $(".img4").css("display","block")
            }
        },

        // 图片验证码
        createCode(){
            code = "";
            var codeLength = 4;//验证码的长度
            var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
            'S','T','U','V','W','X','Y','Z');//随机数
            for(var i = 0; i < codeLength; i++) {//循环操作
                var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
                code += random[index];//根据索引取得随机数加到code上
            }
                this.checkCode = code;//把code值赋给验证码
        },
        // 失焦验证图和密码
        checkLpicma(){
            this.picLyanzhengma.toUpperCase();//取得输入的验证码并转化为大写
            if(this.picLyanzhengma == '') {
                return false
            }else if(this.picLyanzhengma.toUpperCase() != this.checkCode ) { //若输入的验证码与产生的验证码不一致时
                console.log( this.picLyanzhengma.toUpperCase())
                console.log(code)
                 this.$vux.alert.show({
                    title: '',
                    content: '验证码不正确'
                  })
                  setTimeout(() => {
                      this.$vux.alert.hide()
                  }, 1000)
                this.createCode();//刷新验证码
                this.picLyanzhengma = '';
            }else { //输入正确时
                return true;
            }
        },
        // 手机号验证码
        sendCode() {
            if ( this.checkLPhone() == true && this.checkLpicma() == true) {
                // console.log('点击验证码触发')
            this.time = 90
            this.disabled = true
            this.timer()
                // 获取验证
              const url = myPub.URL+`/three/getSmsCode` ;
              var params = new URLSearchParams();
              params.append('phone',this.userPhone);
              params.append('msgType','1');
              axios.post(url,params).then(res => {
                    // console.log(res);

              }).catch((err) => {
                console.log(err)
              })
            }
        },
        timer() {
            if (this.time > 0) {
                this.time--
                this.btnText = this.time + 's'
                setTimeout(this.timer, 1000)
            } else {
                this.time = 0
                this.btnText = '获取验证码'
                this.disabled = false
            }
        },
        tab1(){
            this.isshow = false
            this.isshow1 = true
            $(".message").addClass('active')
            $(".password").removeClass('active')
        },
        tab(){
            this.isshow = true
            this.isshow1 = false
            $(".password").addClass('active')
            $(".message").removeClass('active')
        },
        // 关闭弹框
        close(){
            this.$router.push({path:"/"})
            // this.$router.go(-1)
        },
        // 密码登陆
        Login(){
            if((this.checkLPhone() ==true && this.checkLPsd() == true)){
                //登陆
                const url = myPub.URL+`/login`;
                const pwd = Base64.encode(this.userPwd,'utf-8');
                var params = new URLSearchParams();
                params.append('phone',this.userPhone);
                params.append('password',pwd);
                params.append('loginType',1);
                params.append('clientType','h5');
                axios.post(url,params).then(res => {
                    console.log(res.data);
                    var user = res.data.User;
                    if (res.data.result == 200) {
                        sessionStorage.setItem("token",res.data.token);
                        sessionStorage.setItem("userId",user.id);
                        if (user.realName != "") {
                            this.$router.push({path:"/"})
                        }else{
                            $(".bg").show();
                            $(".toast").show();
                            // 开户
                            const url = myPub.URL+`/chinaPnr/userRegister`;
                            var params = new URLSearchParams();
                            params.append('token',sessionStorage.getItem("token"));
                            params.append('clientType','h5');

                            axios.post(url,params).then(res => {
                                console.log(res.data);
                                this.ChinaPnrServer = res.data.chinaPnrServer;
                                this.Version = res.data.Version; //版本号
                                this.CmdId = res.data.CmdId; //消息信息
                                this.MerCustId = res.data.MerCustId; //商户客户号
                                this.RetUrl = res.data.RetUrl; //页面返回的URL //undefinded
                                this.BgRetUrl = res.data.BgRetUrl; //商户后台应答地址
                                this.MerPriv = res.data.MerPriv; //商户私有域 //undefinded
                                this.UsrId = res.data.UsrId; //用户号
                                this.UsrMp = res.data.UsrMp; //手机号
                                this.PageType = res.data.PageType; //页面类型
                                this.ChkValue = res.data.ChkValue; //签名

                            }).catch((err) => {
                                console.log(err);
                            });
                        }

                    }else{
                        // 弹框
                        if (res.data.resultMsg == "账号或密码错误") {
                            this.$vux.alert.show({
                                // title: '',
                                content: res.data.resultMsg
                            })
                            setTimeout(() => {
                                this.$vux.alert.hide()
                            }, 3000)
                        } else if (res.data.resultMsg == "该账号不存在") {
                            this.$vux.alert.show({
                                // title: '',
                                content: res.data.resultMsg
                            })
                            setTimeout(() => {
                                this.$vux.alert.hide()
                            }, 3000)
                        }
                    }

                }).catch((err) => {
                console.log(err)
                })
            }
        },
        // 短信登陆
        msgLogin(){
            if((this.checkLPhone() ==true)){
                //登陆
                const url = myPub.URL+`/login`;
                const pwd = Base64.encode(this.userPwd,'utf-8');

                var params = new URLSearchParams();
                params.append('phone',this.userPhone);
                params.append('smsCode',this.verifyCode);
                params.append('loginType',2);
                params.append('clientType','h5');
                axios.post(url,params).then(res => {
                    console.log(res.data);
                    var user = res.data.User;

                    if (res.data.result == 200) {
                        sessionStorage.setItem("token",res.data.token);
                        sessionStorage.setItem("userId",user.id);

                        if (user.realName != "") {
                            this.$router.push({path:"/"})
                        }else{
                            $(".bg").show();
                            $(".toast").show();
                            //开户
                            const url = myPub.URL+`/chinaPnr/userRegister`;
                            var params = new URLSearchParams();
                            params.append('token',sessionStorage.getItem("token"));
                            params.append('clientType','h5');

                            axios.post(url,params).then(res => {
                                console.log(res.data);
                                this.ChinaPnrServer = res.data.chinaPnrServer;
                                this.Version = res.data.Version; //版本号
                                this.CmdId = res.data.CmdId; //消息信息
                                this.MerCustId = res.data.MerCustId; //商户客户号
                                this.RetUrl = res.data.RetUrl; //页面返回的URL //undefinded
                                this.BgRetUrl = res.data.BgRetUrl; //商户后台应答地址
                                this.MerPriv = res.data.MerPriv; //商户私有域 //undefinded
                                this.UsrId = res.data.UsrId; //用户号
                                this.UsrMp = res.data.UsrMp; //手机号
                                this.PageType = res.data.PageType; //页面类型
                                this.ChkValue = res.data.ChkValue; //签名

                            }).catch((err) => {
                                console.log(err);
                            });
                        }

                    }else{
                        // 弹框
                        if (res.data.resultMsg == "短信验证码错误或已超时") {
                            this.$vux.alert.show({
                                // title: '',
                                content: res.data.resultMsg
                            })
                            setTimeout(() => {
                                this.$vux.alert.hide()
                            }, 3000)
                        }
                    }
                }).catch((err) => {
                console.log(err)
                })
            }
        },

        // 三方开户
        kaiHu(){
            const url = myPub.URL+`/chinaPnr/userRegister`;
            var params = new URLSearchParams();
            params.append('token',sessionStorage.getItem("token"));
            params.append('clientType','h5');
            axios.post(url,params).then(res => {
                console.log(res.data);
                    this.ChinaPnrServer = res.data.chinaPnrServer;
                    this.Version = res.data.Version; //版本号
                    this.CmdId = res.data.CmdId; //消息信息
                    this.MerCustId = res.data.MerCustId; //商户客户号
                    this.RetUrl = res.data.RetUrl; //页面返回的URL //undefinded
                    this.BgRetUrl = res.data.BgRetUrl; //商户后台应答地址
                    this.MerPriv = res.data.MerPriv; //商户私有域 //undefinded
                    this.UsrId = res.data.UsrId; //用户号
                    this.UsrMp = res.data.UsrMp; //手机号
                    this.PageType = res.data.PageType; //页面类型
                    this.ChkValue = res.data.ChkValue; //签名

                if(res.data.result == 200){
                    //提交from表单
                    console.log(this.Version)
                    setTimeout(() => {
                        document.regSubmit.submit();
                    }, 1000)

                }
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    created(){
        this.createCode();
        sessionStorage.removeItem("token");
        this.userPhone = this.$route.query.phone
    },
    watch: {
      '$route' (to, from) {
          this.$router.go(0);
      }//回退上一级页面并刷新
    },
}
</script>

<style type="text/css">
  /*@import '/static/css/register_login.css'*/
  .weui-cells:before{border-top: 0!important;}
  .weui-cells:after{border-bottom: 0!important;}
  .weui-btn_primary{background: transparent!important;color: #FFA303!important;}
  .weui-btn:after{border: 0!important;}
  .weui-input{border: 0!important;font-size: 0.9rem!important;height: 42px!important;line-height:42px!important;padding-left: 5px;width: 90%!important}
  .weui-cell{padding: 10px 0!important}
  .weui-cells{border-bottom: 1px solid #eee}
  @media screen and (max-width: 320px) {
    .register_content_input{width:96%}
    .yanzhengma_input{width: 10rem;}
}
</style>
<style scoped lang="less">
.logTop{
    .left{
      float: left;
  }
  .right{
      float: right;
  }
  .clearfix:after{
      content:'';
      display:block;
      height:0;
      clear:both;
  }
  .login_or_register{
      background-color: #f2f2f5;
      padding-bottom: 50px;
  }
  /*logo*/
  .logo1{
      text-align: center;
      padding:40px 0 50px ;
      margin:0 auto;
  }
  /*login和register部分*/
  .login_bac{
      width:100%;
      margin: 0 auto;
      position: relative;
  }
  .register_content{
      width:400px;
      background-color: #fff;
      box-shadow: 0 0 15px rgba(0, 0, 0, .5);
      position: absolute;
      left:60px;
      top:80px;
      padding-left: 30px;
      padding-bottom: 50px;
  }
  .tianxie_img{
      width:26px;
      vertical-align: middle;
      margin-right: 10px;
  }
  .tishixiaoxi{
    font-size: 0.7rem;
    color:#FFA303;
    display: block;
    line-height: 20px;
    margin-top: 5px;
    position: absolute;
    z-index: 11;
  }
  .yanzhengma_input{
    width: 60%;
    font-size:0.9rem;
    padding: 5px 0 5px 10px;
      height: 30px;
      /*margin-top: 25px;*/
      border: 0;
      border-bottom: 1px solid #e6e6e6;
  }
  .disappear{
       visibility:hidden;
  }
  .register_content p{
      margin-top: 30px;
      font-size: 25px;
      line-height: 18px;
      margin-bottom: 15px;
  }
  .register_content input{
      padding: 5px 0 5px 10px;
      margin-left: 30px;
      height: 30px;
      /*margin-top: 25px;*/
      border: 1px solid #e6e6e6;
  }
  .register_content_input{
      width:96%;
      height: 30px;
      padding: 5px 0 5px 10px;
      font-size: 0.8rem;
      border: 0;
      border-bottom: 1px solid #e6e6e6;
  }
  .verification{
      vertical-align: middle;
    margin-left: 10px;
    font-size: 0.9rem!important;
    border: 0;
    color: #FFA303;
    /* float: right; */
    width: 30%;
    text-align: center;
    margin-top: 1rem;
    margin-left: 1rem;
    background: transparent;
  }
  .agreement{
      position: relative;
      top: -10px;
  }
  .read_already{
      position: relative;
      top:-21px;
      font-size: 12px;
      color: #999;
      cursor: pointer;
      margin-left: 5px;
  }
  .read_already a{
      color:#053d84;
  }
  .send_message{
      display: inline-block;
      height: 40px;
      line-height: 40px;
      color:#ccc;
      padding-left: 45px;
      padding-right: 5px;
      background: url('/static/img/message.png') no-repeat 10px 8px;
      background-size: 25px;
      border: 1px solid #f3f3f3;
      margin-left: 10px;
      cursor: pointer;
  }
  .next{
      display: block;
      width: 287px;
      height: 50px;
      font-size: 18px;
      text-align: center;
      line-height: 50px;
      color: #fff;
      background-color: #053d84;
      border-radius: 5px;
      margin-left: 40px;
      cursor: pointer;

  }
  /*注册*/
  .login_content1{
      width: 100%;
      background-color: #fff;
      padding: 0!important;
      padding-bottom: 30px!important;
      position: relative!important;
  }
  .login_content1 label{
    width: 100%;display: block;position: relative;margin-top: 30px;height: 42px;
    .img1{display: none;}
    .img2{display: none;}
}

  .bg-ed711f{
    background: #ed711f
  }
  .login_content1 p{
      margin-top: 30px;
      font-size: 25px;
      line-height: 18px;
      margin-bottom: 15px;
  }
  .login_content1 input{
    font-size:0.9rem;
      padding: 5px 0 5px 10px;
      height: 30px;
      /*margin-top: 25px;*/
      border: 0;
      border-bottom: 1px solid #e6e6e6;
  }
   .user_login{
    display: inline-block;
    width: 100%;
    padding: 0.4ren 0;text-align: center;color: #fff!important;border-radius: 50px;height: 2.2rem;line-height: 2.2rem;margin-top: 1rem!important;
   }
  .verification1{
      vertical-align: middle;
      transform: translate(-15px,0);
      width: 30%;
  }
  .forget{
      text-align: right;
      position: relative;
      top:-20px;
      cursor: pointer;
  }
  .forget a{
      font-size: 14px;
      color:#053d84;
      margin-right: 80px;
  }
  #code{
      font-size: 18px;
      letter-spacing:3px;
      color: #053d84;
      background: #f2f2f5;
      height: 42px;
      position: absolute;
      border: 0;
      right: -4%;
  }
  /*弹窗*/
  .tanchuang{
      position: fixed;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color:rgba(0,0,0,.5);
      z-index:100;
  }
  .hiddenTanchuang{
      display: none;
  }
  .inTanchuang{
      position: absolute;
      text-align: center;
      width: 300px;
      height: 169px;
      padding-top: 10px;
      left: 50%;
      top: 50%;
      border-radius: 10px;
      -webkit-transform: translateX(-50%) translateY(-50%);
      -ms-transform: translateX(-50%) translateY(-50%);
      transform: translateX(-50%) translateY(-50%);
      background-color: #fff;
  }
  .errorIcon{
      width:55px;
  }
  .register_content  .cue{
      font-size: 14px;
      text-align: center;
      margin-top: 15px;
  }
  .sure{
      display: inline-block;
      color: #fff;
      width: 100px;
      height: 20px;
      padding: 6px 10px;
      background: #053D84;
      border-radius: 5px;
      font-size: 18px;
      line-height: 18px;
      margin-top: 10px;
      cursor: pointer;
  }
    .settlein{
        color: #333;
        padding: 1rem;
        .buttomLogin{
            position: relative;
            bottom: 0rem;
            width: 80%;
            left: 50%;
            transform: translateX(-50%);
            button{
                width: 100%;
                font-size: 0.9rem;
                text-align: center;
                color: #fff;
                border-radius: 30px;
                border: none;
                background: #2773FF;
               padding: 0.4rem 0;
            }

            .login{
                opacity: .5;
                margin-bottom: 20px;
            }
              .user_login{
                opacity: 1;
            }
        }

      .bg-img{
        text-align: center;
        img{width: 5rem;height: 5rem;margin-top: 2rem;}
      }
      .middle{
        margin-top: 2rem;
        height: 12rem;
        &:after{
            content: "";
            display: block;
            clear: both;
        }
        ul{
            li{
                list-style: none;
                display: inline-block;
                width: 48.9%;
                line-height: 40px;
                text-align: center;border-bottom: 1px solid #eeeeee;font-size: 1rem;color: #999}
            .active{border-bottom: 1px solid #2395FF;color: #2395FF}
        }
        .login_content1{
            a{float: right;color: #FFA303;font-size: 0.8rem;margin-top: 5px;}
        }
        .list{
            h5{font-weight: normal;}
            label{
                display: block;position: relative;height: 42px;width: 100%;margin-top: 30px;
                .img2{display: none;}
                .img3{display: none;}
                .img4{display: none;}
                .img5{display: none;}
            }
            .Agreement{
              font-size: 0.8rem;margin-top: 20px;position: relative;
              input{position: relative;top: 2px;}
              span{display: inline-block;width: 100%;position: absolute;left: 0;bottom: -20px;color: #ff8134}
            }
          }
          .login1{
          display: block;
          width: 100%;
          height: 40px;
          font-size: 0.9rem;
          text-align: center;
          line-height: 40px;
          color: #fff;
          border-radius: 30px;
          margin-top: 2.5rem;
          border: none;
          background: #2773FF;
          opacity: .5;
      }
      }
      .LoginImg{
          width: 1rem /* 34/40 */;
          position: absolute;
          right: .8rem;
          top: 1rem;
      }
      .login{
          display: block;
          width: 100%;
          height: 40px;
          font-size: 0.9rem;
          text-align: center;
          line-height: 40px;
          color: #fff;
          border-radius: 30px;
          margin-top: 2.5rem;
          border: none;
          background: #2773FF;
          opacity: .5;
      }
       .bg{position: absolute;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,.5);display: none;}
        .toast{
            position: absolute;top: 8%;left: 12%;width: 76%;background: #fff;border-radius: 5px;text-align: center;display: none;
            img{width: 100%;}
            .right{position: absolute;top: -1rem;right: -1rem;width: 1rem;height: 1rem;}
            .button{position: absolute;bottom: 1rem;width: 90%;height: 2.5rem;line-height: 2.5rem;color: #fff;background: #FFA303;left: 5%;border-radius: 30px;border: 0;}
        }
    }
    .banQuan{font-size: 0.8rem;text-align: center;color: #999;margin-top: 2rem;position: fixed;width: 100%;bottom: 1rem;}
    @media screen and (max-width: 320px) {
        .banQuan{position: relative;margin-top:13rem;}
    }
}

</style>
