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
              <span class="big">{{Product.exceptedYield}}</span>
          </li>
          <li class="middle">
              <span>产品期限(天)</span>
              <span class="big">{{Product.productPeriod}}</span>
          </li>
          <li class="tr">
              <span>平均历史年化收益</span>
              <span class="big">{{Product.annualYield}}</span>
          </li>
      </ul>
    </div>
    <!-- 标 -->
    <div class="list">
        <ul>
            <li>到期日 <span>{{Product.buyTime}}</span></li>
            <li>起息日 <span>{{Product.interestDate}}</span></li>
            <li>投资日 <span>{{Product.buyTime}}</span></li>
            <li>收益方式 <span class="Profit">到期还本付息</span></li>
        </ul>
        <img v-if="isshow2" src="~@/assets/img/had.png">
        <div class="product" v-if="isshow3">
            <h5>资金去向 <span></span></h5>
            <p v-if="isshow">某某项目 <img class="img" src="~@/assets/img/right.png"></p>
        </div>
        <p class="note" v-if="!isshow">流标，标的募集未满额</p>
    </div>
  </div>
</template>

<script>
var echarts = require('echarts');
import * as myPub from '@/assets/js/public.js'
import axios from 'axios'
import $ from 'jquery'
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
        Product:''
　　  }
　　},
    created() {
        this.lczc = this.$route.query.lazc
    },
    activated: function() {
        this.product()
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        }//回退上一级页面并刷新
    },
    methods:{
        goBack() {
            this.$router.back()
        },
        category(){
            this.$router.push({ path: '/page/category' })
        },
        product(status){
            const _this = this
          _this.$loading.show();
          const url = myPub.URL+`/user/getUserAssetsInfo` ;
          const id = this.$route.query.id
          const params = new URLSearchParams();
          params.append('orderId',id);
          params.append('token',sessionStorage.token);
          axios.post(url,params).then(response => {
              _this.$loading.hide();
              const data = response.data
              console.log(response.data)
              if (data.result == '400') {
                  this.$vux.alert.show({
                      title: '',
                      content: data.resultMsg
                  })
                  setTimeout(() => {
                      this.$vux.alert.hide()
                      this.$router.push({path:"/login",query: {redirect: 'your path'}})
                  }, 3000)
              }
              if (data.result == '200') {
                this.Product = data.Product
                if (this.Product.yieldDistribType == '1') {
                  $(".Profit").html('到期兑付本金收益')
                }
                if (this.Product.yieldDistribType == '2') {
                  $(".Profit").html('先息后本')
                }
                if (this.Product.yieldDistribType == '3') {
                  $(".Profit").html('等额本息')
                }
              }

          }).catch((err) => {
              console.log(err)
          })
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
    background: #f6f6f6;height: 100%;
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
        margin-top: 0.8rem;position: relative;
        ul{ 
            padding: 0 0.8rem;background: #fff;
            li{
                line-height: 2.5rem;height: 2.5rem;font-size: 0.8rem;color: #666;border-bottom: 1px solid #eee;
                span{float: right;color: #333;text-align: right;}
            }
            li:last-child{border-bottom: 0;}
        }
        img{position: absolute;top: 1rem;left: 8rem;width: 8rem;height: 8rem;}
        .product{
            margin-top: 0.8rem;background: #fff;
            h5{
                color: #333;font-size: 0.8rem;line-height: 2rem;border-bottom: 1px solid #eee;height: 2rem;padding: 0 0.8rem;
                span{color: #FFA303}
            }
            p{
                font-size: 0.7rem;height: 2.5rem;line-height: 2.5rem;padding: 0 0.8rem;
                .img{float: right;width: 0.4rem;height:0.7rem;position: relative;top: 1rem;left: 0}
            }
        }
        .note{color: #FF6936;font-size: 0.8rem;text-align: right;padding: 0.8rem;}
    }
}



</style>
