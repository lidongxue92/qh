<template>
<div class="slider">
      <!-- 侧栏头部 -->
      <div class="sliderTop">
        <div class="atHead">
          <img src="../../assets/img/sliderBox/sliderHead.png">
          <div v-if="isShow">
            <p v-if="isName" @click="linkToRealName">{{name}}</p>
            <p v-else @click="linkToKaiHu">请实名</p>
            <p>{{userPhoneBlack}}</p>
          </div>
          <div v-else>
            <h5 @click="linkToLogin">去登录</h5>
          </div>
        </div>
        <div class="sliderTop2">
          <div class="st2Left">
              <img src="../../assets/img/sliderBox/sliderCar.png" >
              <div v-if="isCard" @click="linkToBangCard">
                <h6>理财卡</h6>
                <p>未绑卡</p>
              </div>
              <div v-else @click="linkToBankCard">
                <h6>理财卡</h6>
                <p>已绑卡</p>
              </div>
          </div>
          <div class="st2Right">
              <img src="../../assets/img/sliderBox/sliderRisk.png" >
              <div v-if="isTest" @click="linkToRisk">
                <h6>风险评估</h6>
                <p>未评估</p>
              </div>
              <div v-else @click="linkToResult">
                <h6>风险评估</h6>
                <p>已评估</p>
              </div>
          </div>
        </div>
      </div>
      <!-- 侧栏头部 -->

      <!-- 侧栏菜单项 -->
      <div class="sliderMain">
        <ul>
          <li @click="linkToKaiHu" v-if="isReg">
            <img src="../../assets/img/sliderBox/slider1.png">
            <span>托管账户<b>(未开通)</b></span>
          </li>

          <li @click="linkToMsg" v-else>
            <img src="../../assets/img/sliderBox/slider1.png">
            <span>托管账户<b>(已开通)</b></span>
          </li>

          <li  @click="userset">
            <img src="../../assets/img/sliderBox/slider2.png">
            <span>账户设置</span>
          </li>
          <li @click="linkToInvite">
            <img src="../../assets/img/sliderBox/slider3.png">
            <span>邀请好友</span>
          </li>
          <li @click="linkToProblem">
            <img src="../../assets/img/sliderBox/slider4.png">
            <span>常见问题</span>
          </li>
          <li @click="linkToAddress">
            <img src="../../assets/img/sliderBox/slider5.png">
            <span>联系地址</span>
          </li>
          <li @click="linkToService">
            <img src="../../assets/img/sliderBox/slider6.png">
            <span>客服与反馈</span>
          </li>
          <li @click="linkToAboutUs">
            <img src="../../assets/img/sliderBox/slider7.png">
            <span>关于我们</span>
          </li>
        </ul>

        <!-- 侧栏底部 -->
        <div class="sliderBottom">
          <div class="loginOut" v-if="isShow" @click="loginOut">
            <p>安全退出</p>
          </div>
          <div class="loginReg" v-if ="!isShow" >
            <p class="login" @click="linkToLogin">登录</p>
            <p @click="linkToRegister">注册</p>
          </div>

        </div>
      </div>

    <div class="bg"></div>
    <div class="toast">
        确定退出
        <a class="button" @click="close">确定</a>
    </div>
      <!-- 侧栏菜单项 -->


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

    <!-- 绑卡 -->
<div class="box" style="display:none;">
	<form name="bangkaSubmit" method="post" :action='cardChinaPnrServer'>
		<input type='text' name='Version' :value='cardVersion'>
		<input type='text' name='CmdId' :value='cardCmdId'>
		<input type='text' name='MerCustId' :value='cardMerCustId'>
		<input type='text' name='UsrCustId' :value='cardUsrCustId'>
		<input type='text' name='BgRetUrl' :value='cardBgRetUrl'>
        <input type='text' name='MerPriv' :value='cardMerPriv'>
		<input type='text' name='PageType' :value='cardPageType'>
		<input type='text' name='ChkValue' :value='cardChkValue'>
	</form>
</div>


</div>
</template>

<script>
import * as myPub from '../../assets/js/public.js'
import $ from 'jquery'
import axios from 'axios';
export default {
    name:'slider',
    data(){
        return{
            isShow: false,
            isName:false,
            isReg:true,
            isCard:true,
            isTest:true,
            name:"未实名",
            userPhoneBlack: "",

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

            // 三方绑卡
            cardChinaPnrServer : "",
            cardVersion : "",
            cardCmdId : "",
            cardMerCustId : "",
            cardUsrCustId:"",
            cardBgRetUrl :"",
            cardMerPriv:"",
            cardPageType : "",
            cardChkValue : "",
        }
    },
    created() {
        this.res();
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


        // 绑卡
        const url1 = myPub.URL+`/chinaPnr/userBindCard`;
        var params1 = new URLSearchParams();
        params1.append('token',sessionStorage.token);
        params1.append('clientType','h5');

        axios.post(url1,params1).then(res => {
            console.log(res.data);
            this.cardChinaPnrServer = res.data.chinaPnrServer;
            this.cardVersion = res.data.Version; //版本号
            this.cardCmdId = res.data.CmdId; //消息信息
            this.cardMerCustId = res.data.MerCustId; //商户客户号
            this.cardBgRetUrl = res.data.BgRetUrl; //商户后台应地址
            this.cardUsrId = res.data.UsrCustId; //用户客户号
            this.cardMerPriv = res.data.MerPriv;//商户私有域
            this.cardPageType = res.data.PageType; //页面类型
            this.cardChkValue = res.data.ChkValue; //签名
        }).catch((err) => {
            console.log(err);
        });
    },
    mounted() {
        // 获取信息
        const url = myPub.URL+`/user/getUserInfo`;
        var params = new URLSearchParams();
        params.append('token',sessionStorage.getItem("token"));

        axios.post(url,params).then(res => {
            console.log(res.data);
            this.userPhoneBlack = res.data.User.userPhone;
            sessionStorage.setItem("userPhone",res.data.User.userPhone)
            sessionStorage.setItem("userPhonem",res.data.User.userPhonem)
            if (res.data.User.userRealname != "") {
                this.isName = true;
                this.name = res.data.User.userRealname;
            }
            if (res.data.User.hasBankCard == 2) {
                this.isCard = false
            }
            if (res.data.User.realNameStatus == 2) {
                this.isReg = false
            }


        }).catch((err) => {
            console.log(err);
        });

        //获取测试结果
        const url1 = myPub.URL+`/user/getInvestTestResult`;
        var params1 = new URLSearchParams();
        params1.append('token',sessionStorage.getItem("token"));

        axios.post(url1,params1).then(res => {
            console.log(res.data);
            console.log(res.data.investTestResult);
            if (res.data.investTestResult != undefined && res.data.investTestResult != 0 && res.data.investTestResult != "0" && res.data.investTestResult != "undefined") {
                this.isTest = false;
            }else{
                this.isTest = true;
            }




        }).catch((err) => {
            console.log(err);
        });



    },
    methods:{
        // 侧栏
        userset(){
            if (!sessionStorage.token) {
                this.$vux.alert.show({
                    title: '',
                    content: '请登录'
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    this.$router.push({path:"/login",query: {redirect: 'your path'}})
                }, 2000)
            }else{
                this.$router.push({path:'/page/userset'})
            }
        },
        linkToRisk(){
            if (!sessionStorage.token) {
                this.$vux.alert.show({
                    title: '',
                    content: '请登录'
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    this.$router.push({path:"/login",query: {redirect: 'your path'}})
                }, 2000)
            }else{
                location.href = "http://test.qihangjf.com:29084/risk.html?token=" + sessionStorage.token;
            }
        },
        linkToResult(){
            this.$router.push({path:"/RiskResult"})
        },
        linkToInvite(){
            if (!sessionStorage.token) {
                this.$vux.alert.show({
                    title: '',
                    content: '请登录'
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    this.$router.push({path:"/login",query: {redirect: 'your path'}})
                }, 2000)
            }else{
                this.$router.push({path:'/page/invite'})
            }
        },
        linkToProblem(){
            if (!sessionStorage.token) {
                this.$vux.alert.show({
                    title: '',
                    content: '请登录'
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    this.$router.push({path:"/login",query: {redirect: 'your path'}})
                }, 2000)
            }else{
                this.$router.push({path:'/page/commonProblem'})
            }
        },
        linkToAddress(){
            if (!sessionStorage.token) {
                this.$vux.alert.show({
                    title: '',
                    content: '请登录'
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    this.$router.push({path:"/login",query: {redirect: 'your path'}})
                }, 2000)
            }else{
                this.$router.push({path:'/page/address'})
            }
        },
        linkToService(){
            if (!sessionStorage.token) {
                this.$vux.alert.show({
                    title: '',
                    content: '请登录'
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    this.$router.push({path:"/login",query: {redirect: 'your path'}})
                }, 2000)
            }else{
                this.$router.push({path:'/page/service'})
            }
        },
        linkToAboutUs(){
            if (!sessionStorage.token) {
                this.$vux.alert.show({
                    title: '',
                    content: '请登录'
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    this.$router.push({path:"/login",query: {redirect: 'your path'}})
                }, 2000)
            }else{
                this.$router.push({path:'/page/aboutUs'})
            }
        },
        linkToLogin(){
            this.$router.push({path:'/login'})
        },
        linkToRegister(){
            this.$router.push({path:'/settlein'})
        },
        res(){
          if (sessionStorage.token) {
            // console.log(sessionStorage.token)
            this.isShow = true
          }
        },
        linkToBankCard(){
            if (!sessionStorage.token) {
                this.$vux.alert.show({
                    title: '',
                    content: '请登录'
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    this.$router.push({path:"/login",query: {redirect: 'your path'}})
                }, 2000)
            }else{
                this.$router.push({path:'/page/bankCard'})
            }
        },
        linkToBangCard(){
            if (!sessionStorage.token) {
                this.$vux.alert.show({
                    title: '',
                    content: '请登录'
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    this.$router.push({path:"/login",query: {redirect: 'your path'}})
                }, 2000)
            }else{
                const url = myPub.URL+`/user/getUserInfo`;
                var params = new URLSearchParams();
                params.append('token',sessionStorage.getItem("token"));

                axios.post(url,params).then(res => {
                    console.log(res.data);
                    if (res.data.User.realNameStatus != 2) {
                        this.$router.push({path:'/page/bangCard'});
                    }else{
                        if (res.data.User.hasBankCard != 2) {
                            //用户绑卡
                            const url = myPub.URL+`/chinaPnr/userBindCard`;
                            var params = new URLSearchParams();
                            params.append('token',sessionStorage.token);
                            params.append('clientType','h5');

                            axios.post(url,params).then(res => {
                                console.log(res.data);
                                this.cardChinaPnrServer = res.data.chinaPnrServer;
                                this.cardVersion = res.data.Version; //版本号
                                this.cardCmdId = res.data.CmdId; //消息信息
                                this.cardMerCustId = res.data.MerCustId; //商户客户号
                                this.cardBgRetUrl = res.data.BgRetUrl; //商户后台应地址
                                this.cardUsrId = res.data.UsrCustId; //用户客户号
                                this.cardMerPriv = res.data.MerPriv;//商户私有域
                                this.cardPageType = res.data.PageType; //页面类型
                                this.cardChkValue = res.data.ChkValue; //签名

                                if(res.data.result == 200){
                                    //提交from表单
                                    setTimeout(() => {
                                        document.bangkaSubmit.submit();
                                    }, 1000)

                                }
                            }).catch((err) => {
                                console.log(err);
                            });
                        }
                    }

                }).catch((err) => {
                    console.log(err);
                });
            }

        },

        // 开户
        linkToKaiHu(){
            if (!sessionStorage.token) {
                this.$vux.alert.show({
                    title: '',
                    content: '请登录'
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    this.$router.push({path:"/login",query: {redirect: 'your path'}})
                }, 2000)
            }else{
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
        // 三方账户信息
        linkToMsg(){
            if (!sessionStorage.token) {
                this.$vux.alert.show({
                    title: '',
                    content: '请登录'
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    this.$router.push({path:"/login",query: {redirect: 'your path'}})
                }, 2000)
            }else{
                this.$router.push({path:'/page/accountHf'})
            }
        },
        // 实名认证页面
        linkToRealName(){
          this.$router.push({path:'/page/userset'})
        },
        // 登出
        loginOut(){
            const url = myPub.URL+`/logout`;
            var params = new URLSearchParams();
            params.append('userId',sessionStorage.getItem("userId"));

            axios.post(url,params).then(res => {
                // console.log(res.data);
                if (res.data.result == 200) {
                    $(".bg").css("display","block")
                    $(".toast").css("display","block")
                    // setTimeout(() => {
                    //     sessionStorage.removeItem("token");
                    //     sessionStorage.removeItem("userId");
                    //     this.$vux.alert.hide();
                    //     this.$router.push({path:'/login'})
                    // },2000)
                }


            }).catch((err) => {
                console.log(err);
            });
        },
        close(){
            $(".bg").css("display","none")
            $(".toast").css("display","none")
            this.$router.push({path:"/login"})
        }
    },

}
</script>

<style lang="less" scoped>
.slider{
  position: fixed;
  top: 0;
  left: -75%;
  width: 72%;
  height: 100%;
  background: #fff;
  box-shadow: 1px 0 5px 5px rgba(0, 0, 0, .1);
  z-index: 601;
  overflow: scroll;

  /*侧栏头部*/
    .sliderTop{
      width: 100%;
      height: 8.8rem /* 352/40 */;
      background: url("../../assets/img/sliderBox/sliderBg.png") no-repeat;
      background-size: 100%;

      .atHead{
        overflow: hidden;
        padding-top: 2.4rem;
        img{
          width: 3rem;
          height: 3rem;
          margin: 0 1rem .5rem;
          float: left;
        }
        div{
          float: left;
          color: #fff;
          font-size: .8rem /* 32/40 */;
          margin-top: .3rem /* 10/40 */;
          h5{
            font-size: 1rem;
            margin-top: 0.3rem;
          }
        }
      }

      .sliderTop2{
        background: #4FC4FC;
        bottom: 0;
        display: flex;
        flex: 1;

        .st2Left,.st2Right{
          width: 50%;
          margin: .4rem;
          img{
            width: 1.8rem /* 70/40 */;
            height: 1.8rem;
            margin: .5rem;
            float: left;
          }
          div{
            float: left;
            color: #fff;
            font-size: .6rem /* 32/40 */;
            margin-top: .3rem /* 10/40 */;
            p{
              color: rgba(255, 255, 255, .8);
            }
          }
        }
        .st2Left{
          border-right: 1px solid rgba(255, 255, 255, .7);
        }
        .st2Right img{
          margin-left: 0;
        }

      }
    }
  /*侧栏头部*/

  /*侧栏菜单*/
    .sliderMain{
      width: 80%;
      margin: 1rem auto;

      li{
        border-bottom: 1px solid #EEE;
        padding: .8rem 0 .6rem .1rem;
        color: #333;
        b{
          font-weight: normal;
          color: #999999;
          font-size: .6rem /* 24/40 */;
        }
        img{
          width: 1.2rem ;
        }
        span{
          display: inline-block;
          margin-left: 1rem;
        }
      }
    }

  /*侧栏菜单*/

  // 侧栏底部
  .sliderBottom{
    // background: #f6f6f6;
    text-align: center;

    .loginOut{
      padding: 1.5rem;
      p{
        color: #fff;
        background: url("../../assets/img/sliderBox/sliderBtn.png") no-repeat;
        background-size: 100% ;
        width: 10rem;
        height: 2rem;
        line-height: 2rem;
        font-size: 0.8rem;
        margin: 0 auto;

      }
    }

    .loginReg{
      p{
        color: #fff;
        background: #2395FF;
        border-radius: 2.5rem /* 100/40 */;
        border: 1px solid #2395ff;
        width: 10rem;
        height: 2rem;
        line-height: 2rem;
        font-size: 0.8rem;
        margin: 1rem auto;
      }
      .login{
        color: #2395FF;
        background: #fff;
      }
    }



  }
  .bg{position: absolute;width: 100%;height: 100%;background: rgba(0,0,0,.5);top: 0;left: 0;display: none;}
  .toast{
    position: absolute;width: 60%;border-radius: 5px;background: #fff;top: 50%;left: 40%;text-align: center;font-size: 0.8rem;color: #999;padding: 1rem 0;display: none;
    .button{display: block;width: 80%;margin-left: 10%;height: 30px;color: #fff;background: #2B9AFF;font-size: 0.8rem;margin-top: 1rem;border-radius: 5px;line-height: 30px;}
}

}
</style>
