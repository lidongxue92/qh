<template>
  <div class="asset">
    <!-- 资产头部 -->
    <div class="assetTop">
      <div class="title">
        <div><span class="head"><img src="../../assets/img/icon_head@2x.png"></span></div>
        <div><h1>资产</h1></div>
        <div><span class="message"><img src="../../assets/img/icon_xiaoxi@2x.png"></span></div>
      </div>
      <div class="assetTopMain">
        <h5>总资产(元) <span @click="eyesTab"><img :src="imgSrc"></span></h5>
        <p class="totalMoney">1880000.08</p>
      </div>
      <div class="assetTopBottom">
        <div class="atbLeft">
          <h6>可用余额(元)</h6>
          <p>88888000.00</p>
        </div>
        <div class="atbRight">
          <h6>累计收益(元)</h6>
          <p>8990.00</p>
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
      <div><p>充值</p></div>
      <div><p class="withdraw">提现</p></div>
    </div>
    <!-- 充值提现 -->
    <div class="grayLine"></div>



  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'asset',
  data(){
　　return {
        imgSrc:"../../../static/img/openEyes.png",
　　　}
　},

  methods:{
    eyesTab(){      
      this.imgSrc == "../../../static/img/openEyes.png" ? this.imgSrc = "../../../static/img/closeEyes.png" : this.imgSrc = "../../../static/img/openEyes.png"
    },
    linkToPlatfrom(){
      this.$router.push({path:'/page/platform'})
    },
    linkToBiling(){
      this.$router.push({path:'/page/billingDetails'})
    }
  }

}
</script>

<style scoped lang="less">
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
      padding-bottom: .6rem;
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
        width: 70%;
        text-align: center;
        margin: .5rem auto;
        border: 1px solid #2395FF;
        color: #2395FF;
        border-radius: 2.5rem /* 100/40 */;
        padding-top: .8rem;
        padding-bottom: .8rem;
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
</style>
