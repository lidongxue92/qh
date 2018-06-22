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
      <p>平台福利></p>
      <p>账单明细></p>
    </div>
    <!-- 资产头部 -->


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
    }
  }

}
</script>

<style scoped lang="less">
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
</style>
