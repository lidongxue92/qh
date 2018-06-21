<template>
  <div class="settlein">
    <div class="phone" v-if='isshow'>
      <div class="login_content1 ">
        <label>
          <input type="text" placeholder="请输入手机号" class="register_content_input" v-model= "LUserPhone" @blur="checkLPhone">
          <span class="tishixiaoxi disappear">请输入手机号。</span>
        </label>
        <label class="clearfix">
          <input type="text" placeholder="请输入验证码" class="yanzhengma_input" @blur="checkLpicma" v-model="picLyanzhengma"><input type="button" id="code" @click="createCode"  class="verification1" v-model="checkCode"/> <br>
            <span class="tishixiaoxi disappear">请输入验证码。</span>
        </label>
        <a class="user_login" @click="Login">下一步</a>
        <a href="javascript:" style="color: #FFA303;display: inline-block;width: 100%;text-align: center;font-size: 0.8rem;" @click="login">已有账号,去登录</a>
      </div>
    </div>
    <div class="list" v-if="isshow1">
      <h5 style="text-align: center;font-size: 1rem;padding-bottom: 2rem;"></h5>
      <h5>短信验证码已发送<span class="span">{{tel}}</span>,注意查收</h5>
      <group>
        <x-input type="text"
                 placeholder="请输入验证码"
                 v-model="verifyCode"
               >

                  <x-button slot="right"
                      type="primary"
                      mini
                      :text="btnText"
                      :disabled="disabled"
                      @click.native="sendCode" class="verification">
                 </x-button>
          </x-input>
        </group>
        <label style="margin-top: 10px;">
          <input type="password" placeholder="请输入新密码" class="register_content_input" v-model="LUserPsd" @blur="checkLPsd"><br>
          <span class="tishixiaoxi disappear">请输入新密码。</span>
      </label>
      <label style="margin-top: 10px;">
          <input type="password" placeholder="确认新密码" class="register_content_input" v-model="LUserPsd1" @blur="checkLPsd1"><br>
          <span class="tishixiaoxi disappear">请输入密码。</span>
      </label>
      <label class="Agreement"  v-for="item of items">
        <input type="checkbox" v-model="item.state" v-on:click="alocked(item)" />&ensp;我已阅读并同意<b class="c-2395FF">《启航金服平台注册服务协议》</b>
        <span v-if='!isshow2'>请同意注册协议</span>
      </label>
      <a class="user_login" @click="sub">确认提交</a>
    </div>
  </div>
  
  
</template>
<script>
import { XInput, Group, XButton, Cell, Toast, base64 } from 'vux'
import axios from 'axios'
import $ from 'jquery'
var code ; //在全局定义验证码
export default {
    data () {
      return {
        btnText: '发送验证码',
        disabled: false,
        time: 0,
        verifyCode: '',
        userPhone:'',
        dialog: false,
        LUserPhone:'',
        LUserPsd:'',
        LUserPsd1:'',
        picLyanzhengma:'',
        checkCode:'',
        isshow:true,
        isshow1:false,
        tel:'',
        items: [
          {state: true}
        ],
        isshow2:'true'
      }
    },
    methods:{
      login(){
        this.$router.push({path:"/login"})
        
      },
      checkUserPhone(){
        if(this.userPhone == ''){
          console.log(111)
          $(".hiddenTanchuang").removeClass('hiddenTanchuang')
        }
      },
      hiddenTanchuang(){
        $(".tanchuang").addClass("hiddenTanchuang")
      },
      // 验证登陆手机号格式
      checkLPhone(){
          if(this.LUserPhone == ''){
              $(".login_content1 span:eq(0)").removeClass("disappear");
              $(".login_content1 span:eq(0)").text("请输入手机号。")

          }else if(this.LUserPhone.search(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)==0){
              $(".login_content1 span:eq(0)").addClass("disappear")
              return true;
          }else{
              $(".login_content1 span:eq(0)").removeClass("disappear");
              $(".login_content1 span:eq(0)").text("请输入正确手机号。")
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
              $(".login_content1 span:eq(1)").text("请输入验证码")
              $(".login_content1 span:eq(1)").removeClass("disappear");
          }else if(this.picLyanzhengma.toUpperCase() != this.checkCode ) { //若输入的验证码与产生的验证码不一致时    
              console.log( this.picLyanzhengma.toUpperCase())
              console.log(code)           
              $(".login_content1 span:eq(1)").text("验证码不正确")
              $(".login_content1 span:eq(1)").removeClass("disappear");
              this.createCode();//刷新验证码   
              this.picLyanzhengma = '';
          }else { //输入正确时   
              $(".login_content1 span:eq(1)").addClass("disappear");
              $(".login_content1 span:eq(1)").text("请输入验证码")
              if (this.checkLPhone() ==true) {
                $('.user_login').addClass('bg-ed711f')
              }else{
                $('.user_login').removeClass('bg-ed711f')
              }
              return true;
          } 
      },
      Login(){
        if((this.checkLPhone() ==true && this.checkLpicma() == true)){
          const _this = this
          _this.isshow1 =true
          _this.isshow =false
          // 手机号脱敏
          const tel = $('.register_content_input').val()  
          const mtel = tel.substr(0, 3) + '****' + tel.substr(7);
          console.log(mtel)
          _this.tel = mtel 
        }
      },
      // 手机号验证码
      sendCode() {
            console.log('点击验证码触发')
            // const reg = /^1[34578]\d{9}$/ // 手机号正则校验
            // if (!this.phoneNumber) {
            //     this.$vux.toast.text('请输入手机号~', 'middle')
            //     return
            // }
            // if (!reg.test(this.phoneNumber)) {
            //     this.$vux.toast.text('手机号格式不正确~', 'middle')
            //     return
            // }
            this.time = 90
            this.disabled = true
            this.timer()
             // 获取验证
             //  const url ='http://public.weifenvip.com/index/Sendcodes/sms';
             //  var params = new URLSearchParams();
             //  params.append('mobile',this.phoneNumber);
             //  params.append('token',localStorage.currentUser_token);
             //  params.append('type','1');
             //  if(!localStorage.sessionid){
             //    console.log(params)
             // }else{
             //    params.append('session_id',localStorage.sessionid);
             // }
             //  axios.post(url,params).then(response => {
             //    // const currentUser_token = response.data.data //获取token
             //        console.log(response)
             //        const sessionid = response.data.sessionid
             //        console.log(sessionid)
             //        localStorage.setItem('sessionid',sessionid);
             //        let smsCode = response.data.data.verifCode
             //        this.smsCode = smsCode
             //        this.$vux.alert.show({
             //            title: '验证码',
             //            content: `验证码已发送,【${smsCode}】,10分钟有效`
             //        })
             //        setTimeout(() => {
             //            this.$vux.alert.hide()
             //        }, 3000)
             //  }).catch((err) => {
             //    console.log(err)
             //  })
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
      // 验证登录密码
      checkLPsd(){
          if(this.LUserPsd == ''){
              $(".list span:eq(1)").text("请输入密码");
              $(".list span:eq(1)").removeClass("disappear")
          }else if(this.LUserPsd.search(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/) == 0){
              $(".list span:eq(1)").addClass("disappear")
              return true;
          }else{
              $(".list span:eq(1)").removeClass("disappear");
              $(".list span:eq(1)").text("密码必须6-20位，包含字母与数字")
          }
      },
      checkLPsd1(){
          if(this.LUserPsd == ''){
              $(".list span:eq(1)").text("请输入密码");
              $(".list span:eq(1)").removeClass("disappear")
          }else if(this.LUserPsd == this.LUserPsd1){
              $(".list span:eq(1)").addClass("disappear")
              return true;
          }else{
              $(".list span:eq(1)").removeClass("disappear");
              $(".list span:eq(1)").text("密码必须6-20位，包含字母与数字")
          }
      },
      alocked: function (item) {
        const _this = this
        item.state = !item.state;
        _this.isshow2 = item.state
        console.log(_this.isshow2)
      },
      sub(){
        if( this.checkLPsd() == true && this.checkLPsd1() == true){
            alert('1')
          }
      }

},
  created(){
      this.createCode();
  },
  components: {
      XInput,
      XButton,
      Group,
      Cell,
      Toast
  }
}
</script>

<style type="text/css">
  /*@import '/static/css/register_login.css'*/
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
     
  }
  .yanzhengma_input{
    width: 60%;
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
    font-size: 0.9rem;
      width:98%;
      height: 30px;
      padding: 5px 0 5px 10px;
      /*margin-top: 30px;*/
      border: 0;
      border-bottom: 1px solid #e6e6e6;
  }
  .verification{
      vertical-align: middle;
      margin-left: 10px;
      font-size: 0.9rem!important;
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
    margin-top: 3rem;
      width: 90%;
      background-color: #fff;
      padding: 0 5%;
  }
  .login_content1 label{width: 100%;display: block;position: relative;}
  .user_login{
      display: block;
      width: 100%;
      height: 40px;
      font-size: 0.9rem;
      text-align: center;
      line-height: 40px;
      color: #fff;
      background-color: #2B9AFF;
      border-radius: 30px;
      margin-top:1rem;
      cursor:pointer;
  }
  .bg-ed711f{
    background: #2773FF
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
      right: -5%;
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
  .weui-cells:before{border-top: 0!important;}
  .weui-cells:after{border-bottom: 0!important;}
  .weui-btn_primary{background: transparent!important;color: #FFA303!important;}
  .weui-btn:after{border: 0!important;}
  .weui-input{border:0!important; font-size: 0.9rem!important;height: 2rem!important;line-height: 2rem!important;padding-left: 5px;width: 90%!important}
  .weui-cell{padding: 10px 0!important;}
  .weui-cells{border-bottom: 1px solid #eee;}
  @media screen and (max-width: 320px) {
    .register_content_input{width: 17rem}
    .yanzhengma_input{width: 10rem;}
    #code{right: -4%;}
}
</style>
<style scoped lang="less">
.settlein{
  .bg-img{
    text-align: center;
    h5{
      text-align: center;font-size: 1rem;font-weight: normal;line-height: 30px;padding: 1rem;
      img{float: left;width: 1rem;height: 1rem;margin-top: 0;}
    }
    img{margin-top:2rem;width: 5rem;height: 5rem;}
  }
  .list{
    padding: 1rem;
    h5{font-weight: normal;font-size: 1rem;}
    label{display: block;}
    .Agreement{
      font-size: 0.8rem;margin-top: 20px;position: relative;
      input{position: relative;top: 2px;}
      b{font-weight: normal;}
      span{display: inline-block;width: 100%;position: absolute;left: 0;bottom: -20px;color: #ff8134}
    }
    .user_login{margin-top: 30px;background: #2B9AFF}
  }
  .c-2395FF{color: #2395FF}
}
</style>
