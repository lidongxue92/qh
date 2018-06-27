<template>
    <div class="slider">
      <!-- 侧栏头部 -->
      <div class="sliderTop">
        <div class="atHead">
          <img src="../../assets/img/sliderBox/sliderHead.png">
          <div v-if="isShow">
            <p>张** / 请实名</p>
            <p>157******98</p>
          </div>
          <div v-else>
            <h5 @click="linkToLogin">去登录</h5>
          </div>
        </div>
        <div class="sliderTop2">
          <div class="st2Left">
              <img src="../../assets/img/sliderBox/sliderCar.png" >
              <div>
                <h6>理财卡</h6>
                <p>未绑卡</p>
              </div>
          </div>
          <div class="st2Right">
              <img src="../../assets/img/sliderBox/sliderRisk.png" >
              <div>
                <h6>风险评估</h6>
                <p>未评估</p>
              </div>
          </div>
        </div>
      </div>
      <!-- 侧栏头部 -->

      <!-- 侧栏菜单项 -->
      <div class="sliderMain">
        <ul>
          <li>
            <img src="../../assets/img/sliderBox/slider1.png">
            <span>托管账户<b>(未开通)</b></span>
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
          <!-- <li>
            <img src="../../assets/img/sliderBox/slider8.png">
            <span>版本更新</span>
          </li> -->
        </ul>

        <!-- 侧栏底部 -->
        <div class="sliderBottom">
          <div class="loginOut" v-if="isShow">
            <p>安全退出</p>
          </div>
          <div v-else class="loginReg" v-if ="!isShow" >
            <p class="login" @click="linkToLogin">登陆</p>
            <p @click="linkToRegister">注册</p>
          </div>
          
        </div>
      </div>
      <!-- 侧栏菜单项 -->
    </div>     


</template>

<script>
import $ from 'jquery';
import axios from 'axios';
export default {
    name:'slider',
    data(){
        return{
            isShow: false,
        }
    },
    created() {
        this.res()
    },
    methods:{
        // 侧栏
        userset(){
          this.$router.push({path:'/page/userset'})
        },
        linkToInvite(){
          this.$router.push({path:'/page/invite'})
        },
        linkToProblem(){
        this.$router.push({path:'/page/commonProblem'})
        },
        linkToAddress(){
        this.$router.push({path:'/page/address'})
        },
        linkToService(){
        this.$router.push({path:'/page/service'})
        },
        linkToAboutUs(){
        this.$router.push({path:'/page/aboutUs'})
        },
        linkToLogin(){
        this.$router.push({path:'/login'})
        },
        linkToRegister(){
        this.$router.push({path:'/settlein'})
        },
        res(){
          if (localStorage.token) {
            console.log(localStorage.token)
            this.isShow = true
          }
        }
    }
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

}
</style>