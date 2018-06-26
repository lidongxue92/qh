<template>
  <div class="asset">
    <!-- 资产头部 -->
    <div class="assetTop">
      <div class="title">
        <img src="~@/assets/img/left.png" @click="goBack">
        <span>产品名称</span>
      </div>
      <div class="assetTopMain">
        <h5>投资本金(元) <span><img :src="imgSrc"></span></h5>
        <p class="totalMoney numberChange">{{totalMoney}}</p>
      </div>
      <ul class="assetBottom">
          <li class="tl">
              <span>预计到期收益(元)</span>
              <span class="big">1000000.36</span>
          </li>
          <li class="middle">
              <span>产品期限(天)</span>
              <span class="big">365</span>
          </li>
          <li class="tr">
              <span>平均历史年化收益</span>
              <span class="big">8.8%+0.4%</span>
          </li>
      </ul>
    </div>
    <!-- 标 -->
    <div class="list">
        <ul>
            <li>到期日 <span class="color">2017.12.30</span></li>
            <li>起息日 <span>2017.12.12</span></li>
            <li>投资日 <span>2017.12.12</span></li>
            <li>收益方式 <span>到期还本付息</span></li>
        </ul>
        <ul>
            <li>已持有天数 <span>200天</span></li>
            <li>剩余天数<span  class="color">165天</span></li>
            <li>转让日期 <span>2017.12.12</span></li>
            <li>当日转让结算利率<span  class="color">6.5%</span></li>
            <li>当日转让结算收益<span  class="color">4500.58元</span></li>
            <li>转让成功后本息合计<span  class="color">1004500.58元</span></li>
            <li>转让手续费<span  class="color">880.00元</span></li>
        </ul>
    </div>
    <span class="button" @click="sub">提交转让</span>
    <div class="tost">
      <img src="~@/assets/img/face.png"><span class="close" @click="close">&Chi;</span>
      <p>主人你就真的狠心不要我了么？</p>
      <span class="left" @click="leftclose">狠心转让</span><span class="right" @click="rightclose">我在想想</span>
    </div> 
    <div class="bg"></div>
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
        isshow: true,
        isshow1:false,
        isshow2:false,
        isshow3:true,
　　  }
　　},
    methods:{
        goBack() {
            this.$router.back()
        },
        sub(){
          $(".bg").css("display","block")
          $(".tost").css("display","block")
        },
        rightclose(){
          $(".bg").css("display","none")
          $(".tost").css("display","none")
        },
        leftclose(){
          $(".bg").css("display","none")
          $(".tost").css("display","none")
          this.$router.push({ path: '/page/Transfersuccess' })
        },
        close(){
          $(".bg").css("display","none")
          $(".tost").css("display","none")
        }
    },
    mounted() {
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
.asset{
    background: #f6f6f6;padding-bottom: 1rem;position: relative;
    /*资产头部*/
    .assetTop{
        width: 100%;
        height: auto;
        background: url("../../assets/img/bg@2x.png") no-repeat;
        background-size: 100%;

        .title{
          padding: 1rem 0.8rem 0.5rem 0.8rem;
          margin: 0 auto;
          text-align: center;
          color: #fff;
          img{float: left;width: 0.6rem;height: 1rem;}
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
        .assetBottom{
            font-size: 0.6rem;color: #fff;padding: 0.8rem;
            li{
                display: inline-block;width: 32%;
                span{display: inline-block;width: 100%;color: #fff;font-size: 0.6rem;text-align: center;}
                .big{font-size: 0.8rem;}
            }
            .tl{text-align: left;}
            .tr{text-align: right;}
            @media screen and (max-width: 320px) {
                li{width: 35%}
                .middle{width: 26%}
            }
        }
    }
    .list{
      position: relative;
      ul{ 
        padding: 0 0.8rem;background: #fff;margin-top: 0.8rem;
        li{
            line-height: 2.5rem;height: 2.5rem;font-size: 0.8rem;color: #666;border-bottom: 1px solid #eee;
            span{float: right;color: #333;text-align: right;}
            .color{color: #FFA303}
        }
        li:last-child{border-bottom: 0;}
      }
    }
    .button{width: 90%;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);border-radius: 30px;line-height: 2.4rem;height: 2.4rem;color: #fff;font-size: 0.9rem;margin-top: 2rem;display: inline-block;text-align: center;margin-left: 5%;}
    .bg{position: absolute;width: 100%;height: 100%;background: rgba(0,0,0,.5);top:0;left: 0;z-index: 11;display: none;}
    .tost{
      width: 60%;height: 8.3rem;border-radius: 5px;position: absolute;top: 40%;background: #fff;left: 20%;text-align: center;z-index: 111;overflow: hidden;display: none;
      img{width: 2.6rem;height: 2.3rem;margin-top: 1rem;}
      .close{color: #ccc;position: absolute;right: 1rem;top: 0.5rem;}
      p{font-size: 0.8rem;color: #333;text-align: center;}
      .left{color: #2B9AFF;font-size: 0.9rem;width: 49%;display: inline-block;text-align: center;line-height: 2.2rem;height: 2.2rem;float: left;margin-top: 1.1rem;border-top: 1px solid #eee;}
      .right{font-size: 0.9rem;width: 51%;display: inline-block;text-align: center;line-height: 2.2rem;height: 2.2rem;float: left;margin-top: 1.1rem;border-top: 1px solid #eee;color: #fff;background:#2B9AFF }
    }
}



</style>
