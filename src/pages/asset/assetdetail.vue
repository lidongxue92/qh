<template>
  <div class="asset">
    <!-- 资产头部 -->
    <div class="assetTop">
      <div class="title">
        <img src="~@/assets/img/left.png" @click="goBack">
        <span>{{Product.productName}}</span>
      </div>
      <div class="assetTopMain">
        <h5>投资本金(元)</h5>
        <p class="totalMoney numberChange">{{Product.investMoney}}</p>
      </div>
      <ul class="assetBottom">
          <li class="tl">
              <span>预计到期收益(元)</span>
              <span class="big">{{Product.exceptedYield | numFilter}}</span>
          </li>
          <li class="middle">
              <span>产品期限(天)</span>
              <span class="big">{{Product.productPeriod}}</span>
          </li>
          <li class="tr">
              <span>平均历史年化收益</span>
              <span class="big">{{Product.annualYield | numFilter}}%</span>
          </li>
      </ul>
    </div>
    <div class="assetTop2" v-if="isshow3">
      <p class="rpMoney">红包金额　-{{Product.rpMoney}}</p>
      <p class="increaseMoney">加息券　+{{Product.increaseMoney}}%</p>
    </div>
    <!-- 标 -->
    <div class="list" v-if ='isshow4' >
        <ul>
            <li>到期日 <span>{{Product.dueDate}}</span></li>
            <li>起息日 <span>{{Product.interestDate}}</span></li>
            <li>投资日 <span>{{Product.buyTime}}</span></li>
            <li>收益方式 <span class="Profit">{{Product.interestType}}</span></li>
        </ul>
        <img v-if="isshow2" src="~@/assets/img/had.png">
        <div class="product" v-if="isshow3">
            <h5>资金去向 <span></span></h5>
            <p v-if="isshow" @click="linkTodetail1(Product.productId)">{{Product.productName}} <img class="img" src="~@/assets/img/right.png"></p>
        </div>
    </div>
    <div class="list" v-if ='isshow5'>
        <ul>
            <li>预计满标日<span>{{Product.fullDate}}</span></li>
            <li>投资日 <span>{{Product.buyTime}}</span></li>
            <li>计息方式<span class="interest">{{Product.interestType}}</span></li>
            <li>收益方式 <span class="Profit">{{Product.yieldDistribType}}</span></li>
        </ul>
        <img v-if="isshow2" src="~@/assets/img/had.png">
        <div class="product">
            <h5>投资状态 <span class="DistribType">{{Product.status}}</span></h5>
        </div>
        <p class="note" v-if = '!isshow'>流标，标的募集未满额</p>
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
        imgSrc:"./static/img/openEyes.png",
        totalMoney:1888800.01,
        numberChange: 10000.08,
        isshow: true,
        isshow1:false,
        isshow2:false,
        isshow3:true,
        Product:'',
        totalCount:'',
        isshow4:true,
        isshow5:false
　　  }
　　},
    created() {
        this.lczc = this.$route.query.lazc;
        this.product();
        //冻结金额
        const frzBalance = this.toDecimal2(Math.floor((this.Product.annualYield)*100)/100);
        $(".tr .big").text(frzBalance);
        const status = this.$route.query.status
        if (status == '投标中') {
          this.isshow4 = false
          this.isshow5 = true
          this.isshow3 = false
        }
        if (status == '持有中') {
          this.isshow4 = true
          this.isshow5 = false
        }
        if (status == '已兑付') {
          this.isshow4 = true
          this.isshow5 = false
          this.isshow3 = false
          this.isshow2 = true
        }
    },
    methods:{
        goBack() {
            this.$router.back()
        },
        linkTodetail1(id) {
            this.$router.push({ path: '/page/detailProduct',query: { id: id } })
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
                setTimeout(() => {
                    if (this.Product.yieldDistribType == '1') {
                    $(".Profit").html('到期兑付本金收益')
                    }
                    if (this.Product.yieldDistribType == '2') {
                      $(".Profit").html('先息后本')
                    }
                    if (this.Product.yieldDistribType == '3') {
                      $(".Profit").html('等额本息')
                    }
                    // 持有中判断
                    
                    if (this.Product.interestType == '1') {
                      $(".interest").html('T+0')
                    }
                    if (this.Product.interestType == '2') {
                      $(".interest").html('T+1')
                    }
                    if (this.Product.interestType == '3') {
                      $(".interest").html('满标计息')
                    }

                    if (this.Product.yieldDistribType == '1') {
                      $(".Profit").html('到期兑付本金收益')
                    }
                    if (this.Product.yieldDistribType == '2') {
                      $(".Profit").html('先息后本')
                    }
                    if (this.Product.yieldDistribType == '3') {
                      $(".Profit").html('等额本息')
                    }
                    if (this.Product.status == '7') {
                      setTimeout(() => {
                        if (this.Product.yieldDistribType == '1') {
                          this.isshow = false
                        }
                      }, 200)
                    };
                    if (this.Product.status == '6') {
                      setTimeout(() => {
                        this.isshow = true
                        console.log(6)
                        $(".DistribType").text("交易成功,等待满标")
                      }, 300)
                    };
                  }, 200)
                  

                if (this.Product.rpMoney == 0) {
                    $(".rpMoney").empty();
                }
                if (this.Product.increaseMoney == "") {
                    $(".increaseMoney").empty();
                }
                if (this.Product.rpMoney == 0 && this.Product.increaseMoney == "") {
                    $(".assetTop2").remove();
                }


              }

          }).catch((err) => {
              console.log(err)
          })
        }
    },
    filters: {
        numFilter(value) {
            // 截取当前数据到小数点后三位
            let transformVal = Number(value).toFixed(4)
            let realVal = transformVal.substring(0, transformVal.length - 1);
            // let val = Math.floor(realVal*100)/100;

            var num = realVal + "";
            var number = num.split(".")[0];//整数位
            var len = num.split(".")[1];//小数
            console.log(len);
            if (len.length >= 3) {
                var newNum = len.substr(0,2);
                newNum = number + "." + newNum;
                console.log(newNum);
            }else{
                var newNum = Number(num);
            }
            return newNum;
        }
    },
    watch: {
      '$route' (to, from) {
          this.$router.go(0);
          window.location.reload()
      }
    },
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
    .assetTop2{
        display: flex;
        flex: 1;
        background: #35A2FC;
        color: #FFFEFE;
        font-size: 0.8rem;
        padding-top: .5rem;
        padding-bottom: .5rem;
        p{
            width: 40%;
            margin: 0 auto;
            &:last-child{
                text-align: right;
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
                span{color: #FFA303;float: right;color: #FFA303}
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
