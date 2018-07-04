<template>
    <div class="asset">
    <!-- 资产头部 -->
    <div class="assetTop">
      <div class="title">
        <img src="~@/assets/img/left.png" @click="goBack">
        <span>理财详情</span>
      </div>
      <div class="assetTopMain">
        <h5>待收本息(元)</h5>
        <p class="totalMoney">{{Account.ddfbx | numFilter}}</p>
      </div>
      <p class="assetBottom">
          <span class="left">投资本金(元) <b>{{Account.investMoney}}</b></span>
          <span class="right" @click="Transfer">我要转让 >></span>
      </p>
    </div>
    <!-- 标 -->
    <div class="list">
        <ul class="tab">
            <li class="has active" @click="has">持有中</li>
            <li class="going" @click="going">投标中</li>
            <li class="had" @click="had">已兑付</li>
        </ul>
        <div class="nodata" v-if="isshow1">
            <img src="~@/assets/img/no_data.png">
            <p>您还没有持有理财产品哦</p>
            <p>赶紧去产品中心挑选吧~</p>
            <button class="button" @click="category">去理财</button>
        </div>
        <div class="Data" v-if="isshow2">
            <ul class="datalist">
                <li @click="assetdetail(item.productId)"  v-for="(item,index) in Product" :key="index">
                    <h5>{{item.productName}}<span>{{item.orderBuyTime}}</span></h5>
                    <p class="left">
                        <span class="big">{{item.investMoney}}</span>
                        <span>投资金额(元)</span>
                    </p>
                    <p class="right">
                        <span class="color">{{item.exceptedYield}}</span>
                        <span>预计到期收益(元)</span>
                    </p>
                    <span class="productStatus" style="position: absolute;opacity: 0;">{{item.productStatus}}</span>
                    <img class="img1" src="~@/assets/img/lost.png">
                    <img v-if="isshow4" src="~@/assets/img/had.png">
                    <img v-if="isshow5" src="~@/assets/img/lost.png">
                </li>
            </ul>
        </div>
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
        Product:'',
        imgSrc:"../../../static/img/openEyes.png",
        isShow: false,
        isshow1:false,
        isshow2:true,
        isshow3:false,
        isshow4:false,
        isshow5:false,
        money:'',
        Account:{}
　　  }
　　},
    created() {
        this.lczc = this.$route.query.lazc;
        this.product('1,2','0,1,2',0);
        const url = myPub.URL+`/user/getAccountOverview` ;
          const params = new URLSearchParams();
          params.append('token',sessionStorage.token);
          axios.post(url,params).then(res => {
               this.Account = res.data.Account;
                // console.log(this.Account);
                if (res.data.result == '400') {
                  this.$vux.alert.show({
                      title: '',
                      content: res.data.resultMsg
                  })
                  setTimeout(() => {
                      this.$vux.alert.hide()
                      this.$router.push({path:"/login",query: {redirect: 'your path'}})
                  }, 3000)
                }
          }).catch((err) => {
              console.log(err)
          })
    },
    methods:{
        goBack() {
            this.$router.back()
        },
        category(){
            this.$router.push({ path: '/page/category' })
        },
        assetdetail(id){
            this.$router.push({ path: '/page/assetdetail',query:{id:id} })
        },
        Transfer(){
            this.$router.push({ path: '/page/Transfer' })
        },
        has(){
            const _this = this
            $(".has").addClass('active')
            $(".going").removeClass('active')
            $(".had").removeClass('active')
            this.product('1,2','0,1,2',0);
        },
        going(){
            const _this = this
            $(".going").addClass('active')
            $(".has").removeClass('active')
            $(".had").removeClass('active')
            this.product(6,'0,2',0);
        },
        had(){
            const _this = this
            $(".had").addClass('active')
            $(".has").removeClass('active')
            $(".going").removeClass('active')
            _this.isshow4 = true
            this.product(3,'0,1,2','0,1')
        },
        product(status,productFullStatus,orderType){
            const _this = this
            _this.$loading.show();
            const url = myPub.URL+`/user/getUserAssetsList` ;
            const params = new URLSearchParams();
            params.append('curPage','1');
            params.append('pageSize','10');
            params.append('status',status);
            params.append('token',sessionStorage.token);
            params.append('productFullStatus',productFullStatus);
            params.append('czlx','1');
            params.append('orderType',orderType);
            params.append('clientType','pc');
            axios.post(url,params).then(response => {
                _this.$loading.hide();
                const data = response.data
                console.log(response)
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
                    // console.log(sessionStorage.token)
                    this.Product = data.Product
                    this.money = data
                    if (data.Product.length <= 0){
                    this.isshow1 = true
                    this.isshow2 = false
                    }else{
                        this.isshow1 = false
                    this.isshow2 = true
                    }
                    $(".productStatus").each(function (i,n) {
                        if ($(".productStatus").eq(i).text() == '6') {
                            $(".img1").eq(i).css("display","inline-block")
                        }
                    })
                }

            }).catch((err) => {
                console.log(err)
            })
        }
    },
    filters: {
        numFilter(value) {
            // 截取当前数据到小数点后三位
            let transformVal = Number(value).toFixed(3)
            let realVal = transformVal.substring(0, transformVal.length - 1)
            // num.toFixed(3)获取的是字符串
            return Number(realVal)
        }
    },

    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        }//回退上一级页面并刷新
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
    background: #f6f6f6;
    height: 100%;
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
            line-height:2rem;font-size: 0.6rem;color: #fff;padding: 0.8rem;height: 2rem;
            span{
                b{font-weight: normal;font-size: 0.8rem;}
            }
            .left{float: left;}
            .right{float: right;}
        }
    }
    .list{
        margin-top: 0.8rem;
        .tab{
            background: #fff;text-align: center;
            li{width: 32%;display: inline-block;line-height: 2.5rem;text-align: center;height: 2.5rem;font-size: 0.9rem;color: #999;}
            .active{color: #FFA303;border-bottom: 2px solid #FFA303}
        }
        .nodata{
            text-align: center;
            img{margin-top: 3rem;width: 4.2rem;height: 4.5rem;}
            p{font-size: 0.8rem;color: #999;line-height:1rem;margin-top: 0.5rem;}
            .button{width: 10rem;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);border: 0;border-radius: 30px;line-height: 2.2rem;height: 2.2rem;color: #fff;font-size: 0.9rem;margin-top: 1.2rem;}
        }
        .Data{
            .datalist{
                li{
                    margin-top: 0.5rem;background: #fff;position: relative;
                    h5{
                        padding: 0.8rem 1rem;color: #666;border-bottom:1px solid #eee;
                        span{float: right;color: #999;font-size: 0.5rem;}
                    }
                    p{
                        display: inline-block;width: 38%;padding: 0.8rem 1rem;color: #999;font-size: 0.6rem;
                        span{display: inline-block;width: 100%;}
                    }
                    img{position: absolute;right: 0.8rem;width: 5rem;height: 5rem;top: 1.5rem;}
                    .img1{display: none;}
                    .left{
                        .big{font-size: 1.25rem;color: #333;}
                    }
                    .right{
                        .color{font-size: 1.25rem;color: #FFA303}
                    }
                }
            }
        }
    }
}



</style>
