<template>
  <div class="asset">
    <!-- 资产头部 -->
    <div class="assetTop">
      <div class="title">
        <div @click="zhezhaoShow"><span class="head"><img src="../../assets/img/icon_head@2x.png"></span></div>
        <div><h1>资产</h1></div>
        <div @click="linkToMsg"><span class="message"><img src="../../assets/img/icon_xiaoxi@2x.png"></span></div>
      </div>
      <div class="assetTopMain">
        <h5>总资产(元) <span @click="eyesTab"><img :src="imgSrc"></span></h5>
        <p class="totalMoney numberChange">{{totalMoney}}</p>
      </div>
      <div class="assetTopBottom">
        <div class="atbLeft">
          <h6>可用余额(元)</h6>
          <p class="numberChange">{{numberChange}}</p>
        </div>
        <div class="atbRight">
          <h6>累计收益(元)</h6>
          <p class="numberChange">{{numberChange}}</p>
        </div>
      </div>
    </div>
    <div class="assetTop2">
      <router-link to=""></router-link>
      <p @click="linkToPlatfrom">平台福利></p>
      <p @click="linkToBiling">账单明细></p>
    </div>
    <!-- 资产头部 -->

    <!-- 充值提现 -->
    <div class="recharge">
      <div @click="linkToRecharge"><p>充值</p></div>
      <div @click="linkToWithdraw"><p class="withdraw">提现</p></div>
    </div>
    <!-- 充值提现 -->
    <div class="grayLine"></div>

    <!-- 主要内容 -->
    <div class="assetMain">
      <div class="assetMainLeft">
        <div id="charts">
          <div id="main" :style="{width:'100%',height:'14rem'}"></div>
          <div class="title">
            <h5 class="totalMoney numberChange">{{totalMoney}}</h5>
            <p>总资产(元)</p>
          </div>
        </div>
        
      </div>
      <div class="assetMainRight">
        <div class="moneyName1" @click="linkToPrincipal">
          <div>
            <b></b>
            <span>待收本金</span>
            <p class="numberChange">{{numberChange}}</p>
          </div>
          <div class="nameImg1"><img src="../../assets/img/rightGray.png"></div>
        </div>

        <div class="moneyName2">
          <div>
            <b></b>
            <span>待收收益</span>
            <p class="numberChange">{{numberChange}}</p>
          </div>
        </div>

        <div class="moneyName3" @click="linkToIncome">
          <div>
            <b></b>
            <span>转让金额</span>
            <p class="numberChange">{{numberChange}}</p>
          </div>
          <div class="nameImg1"><img src="../../assets/img/rightGray.png"></div>
        </div>

        <div class="moneyName4">
          <div>
            <b></b>
            <span>账户余额</span>
            <p class="numberChange">{{numberChange}}</p>
          </div>
        </div>

        <div class="moneyName5">
          <div>
            <b></b>
            <span>冻结金额</span>
            <p class="numberChange">{{numberChange}}</p>
          </div>
        </div>
      </div>
    </div>


    <!-- 侧边栏 -->
    <div class="zhezhao" @click="zhezhaoHide">
         
    </div>
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
          <li @click="userset">
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
          <div v-else class="loginReg">
            <p class="login" @click="linkToLogin">登陆</p>
            <p @click="linkToRegister">注册</p>
          </div>
          
        </div>
      </div>
      <!-- 侧栏菜单项 -->

      


    </div>     



  </div>
</template>

<script>
var echarts = require('echarts');
import $ from 'jquery';
import axios from 'axios';
export default {
  name: 'asset',
  data(){
　　return {
        imgSrc:"../../../static/img/openEyes.png",
        totalMoney:1888800.01,
        numberChange: 10000.08,
        isShow: false,
　　　}
　},

  methods:{
    eyesTab(){     
      if (this.imgSrc == "../../../static/img/openEyes.png") {
        this.imgSrc = "../../../static/img/closeEyes.png";
        $(".numberChange").text("****")
        
      }else{
        this.imgSrc = "../../../static/img/openEyes.png";
         $(".numberChange").text(this.numberChange);
         $(".totalMoney").text(this.totalMoney);
      }
    },
    zhezhaoShow(){
      $(".zhezhao").fadeIn(400);
      $(".slider").animate({left:"0"},400);      
    },
    zhezhaoHide(){
       $(".zhezhao").fadeOut(400);
       $(".slider").animate({left:"-75%"},400);

    },

    linkToMsg(){
      this.$router.push({path:'/page/message'})
    },
    linkToPlatfrom(){
      this.$router.push({path:'/page/red'})
    },
    linkToBiling(){
      this.$router.push({path:'/page/billingDetails'})
    },
    linkToRecharge(){
      this.$router.push({path:'/page/recharge'})
    },
    linkToWithdraw(){
      this.$router.push({path:'/page/withdraw'})
    },
    linkToPrincipal(){
      this.$router.push({path:'/page/principal'})
    },
    linkToIncome(){
      this.$router.push({path:'/page/income'})
    },

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

  },

  mounted() {
    /*ECharts图表*/
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
            tooltip : { //提示框组件
              show:false,
            },
            color:['#41A8FF','#86C8FF','#FF8B13','#FFB971','#FF8A77'],  //手动设置每个图例的颜色
            series : [ //系列列表
                {
                    // name:'设备状态',  //系列名称
                    type:'pie',   //类型 pie表示饼图
                    radius : ['56%', '70%'],  //饼图的半径,第一项是内半径,第二项是外半径,内半径为0就是真的饼,不是环形
                    hoverAnimation:false,
                    legendHoverLink:false,
                    itemStyle : {  //图形样式
                        normal : { //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                            label : {  //饼图图形上的文本标签
                                show : false  //平常不显示
                            },
                            labelLine : {     //标签的视觉引导线样式
                                show : false  //平常不显示
                            }
                        },
                        emphasis : {   //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                            label : {  //饼图图形上的文本标签
                                show : false,
                            }
                        }
                    },
                    data:[
                        {value:80, name:'待收本金'},
                        {value:10, name:'待收收益'},
                        {value:30, name:'转让金额'},
                        {value:20, name:'账户余额'},
                        {value:25, name:'冻结金额'}
                    ]
                }
            ]
    });
    /*ECharts图表*/
  }

}
</script>

<style scoped lang="less">
  h1,h2,h3,h4,h5,h6{
    font-weight: normal;
  }
  *{
    padding: 0;
    margin: 0;
  }
/*资产头部*/
  .assetTop{
    width: 100%;
    height: auto;
    background: url("../../assets/img/bg@2x.png") no-repeat;
    background-size: 100%;

    .title{
      padding-top: 1.7rem /* 67/40 */;
      width: 92%;
      margin: 0 auto;
      display: flex;
      flex: 1;
      div{
        width: 33.33%;
      }
      .head{
        float: left;
        width: 1.6rem /* 64/40 */;
        height: 1.6rem /* 64/40 */;
        img{
          width: 100%;
        }
      }
      h1{
        font-size: 1rem /* 40/40 */;
        color: #fff;
        text-align: center;
        font-weight: normal;
      }
      .message{
        float: right;
        width: 1.3rem /* 50/40 */;
        height: 1.3rem /* 50/40 */;
        img{
          width: 90%;
        }
      }
    }

    .assetTopMain{
      width: 85%;
      margin: 1.6rem /* 64/40 */ auto 0;
      h5{
        text-align: center;
        color: rgba(255, 255, 255, .7);
        font-size: .8rem;
        span{
          float: right;
          width: .8rem /* 30/40 */;
          img{
            width: 100%;
          }

        }
      }
      p{
        font-size: 1.5rem /* 60/40 */;
        text-align: center;
        color: #fff;
      }
    }

    .assetTopBottom{
      width: 85%;
      margin: .8rem auto 0;
      padding-bottom: .5rem;
      display: flex;
      flex: 1;
      .atbLeft,.atbRight{
        float: left;
        width: 50%;
        text-align: center;
      }
      .atbLeft{
        border-right: 1px solid rgba(255, 255, 255, .7);
      }
      h6{
        color: rgba(255, 255, 255, .7);
        font-size: .8rem;
      }
      p{
        color: #fff;
        font-size: 1rem;
      }
    }
  }
  .assetTop2{
      width: 100%;
      background: #35A2FC;
      display: flex;
      flex: 1;
      p{
        width: 50%;
        margin: .8rem /* 30/40 */ auto;
        text-align: center;
        color: rgba(255, 255, 255, .8);
      }
  }
/*资产头部*/

/*充值提现*/
  .recharge{
    width: 100%;
    background: #fff;
    display: flex;
    flex: 1;
    div{
      width: 50%;
      p{
        width: 80%;
        text-align: center;
        margin: .5rem auto;
        border: 1px solid #2395FF;
        color: #2395FF;
        border-radius: 2.5rem /* 100/40 */;
        padding-top: .7rem;
        padding-bottom: .7rem;
        font-size: 1rem;
      }
    }
    
    .withdraw{
      color: #fff;
      /*渐变*/
      background: #2B9AFF;
      background: -moz-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
      background: -webkit-gradient(linear, left, color-stop(0%, #2B9AFF), color-stop(100%, #2773FF));
      background: -webkit-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
      background: -o-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
      background: -ms-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
      background: linear-gradient(to right, #2B9AFF 0%, #2773FF 100%);
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2B9AFF', endColorstr='#2773FF', GradientType=0);

    }

  }
/*充值提现*/
.grayLine{
  width: 100%;
  height: 10px;
  background: #F6F6F6;
}
/*主要内容*/
  .assetMain{
    display: flex;
    flex: 1;
    .assetMainLeft{
      width: 50%;
      
       #charts{
        width: 100%;
        margin-top: 2rem /* 100/40 */;
        position: relative;
        
      }
      .title{
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translateX(-50%);
        h5{
          text-align: center;
          color: #333;
          font-size: 1.1rem;
        }
        p{
          text-align: center;
          color: #666;
          font-size: .8rem;
        }
      }
    }

    .assetMainRight{
      width: 50%;

      b{
        display: inline-block;
        width: .4rem /* 15/40 */;
        height: .4rem /* 15/40 */;
        background: #41A8FF;
      }
      .moneyName2 b{
        background: #86C8FF;
      }
      .moneyName3 b{
        background:#FF8B13;
      }
      .moneyName4 b{
        background: #FFB971;
      }
      .moneyName5 b{
        background: #FF8A77;
      }
      .moneyName1{
        margin-top: 2rem;
      }
      .moneyName1,.moneyName2,.moneyName3,.moneyName4,.moneyName5{
        width: 100%;
        margin-bottom: .5rem /* 20/40 */;
        overflow: hidden;
        
        div:first-child{
          float: left;
        }
        
        span{
          color: #999;
          font-size: .8rem ;
        }
        p{
          font-size: 1rem;
          text-indent: .8em;
        }
        .nameImg1{
          float: right;
          margin-top: 10%;
          margin-right: 1rem;
          width: .5rem /* 20/40 */;
          img{
            width: 100%;
          }
        }
      }


      

      




    }
  }
/*主要内容*/

/*侧边栏*/
.zhezhao{
  background: rgba(0, 0, 0, .3);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 600;
}
.slider{
  position: fixed;
  top: 0;
  left: 0;
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
