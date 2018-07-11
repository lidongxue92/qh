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
            <li class="has active" @click="cyz">持有中</li>
            <li class="going" @click="tbz">投标中</li>
            <li class="had" @click="had">已兑付</li>
        </ul>

        <div class="nodata" v-if="isshowHas">
            <img src="~@/assets/img/no_data.png">
            <p>您还没有持有理财产品哦</p>
            <p>赶紧去产品中心挑选吧~</p>
            <button class="button" @click="category">去理财</button>
        </div>
        <div class="Data" v-else>
            <ul class="datalist">
                <li @click="assetdetail(item.orderId)"  v-for="(item,index) in Product" v-view-lazy :key="index">
                    <h5>{{item.productName}}<span><b class="isFull" style="display:none; font-weight:normal">预计满标：</b> {{item.orderBuyTime}}</span></h5>
                    <p class="left">
                        <span class="big">{{item.investMoney}}</span>
                        <span>投资金额(元)</span>
                    </p>
                    <p class="right">
                        <span class="color exceptedYield">{{item.exceptedYield | numFilter}}</span>
                        <span v-if="!isshow7">预计到期收益(元)</span>
                        <span v-if="isshow7">实际到期收益</span>
                    </p>
                    <span class="productStatus" style="position: absolute;opacity: 0;">{{item.productStatus}}</span>
                    <img class="img1" src="">
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
        imgSrc:"./static/img/openEyes.png",
        isShow: false,
        isshow1:false,
        isshow2:true,
        isshow3:false,
        isshow4:false,
        isshow5:false,
        isshow6:false,
        money:'',
        Account:{},
        totalCount:'',
        isshowHas: true,
        qxr:"",
        isshow7:false
　　  }
　　},
    created() {
            this.lczc = this.$route.query.lazc;
          const url = myPub.URL+`/user/getAccountOverview` ;
          const _this = this
        _this.$loading.show();
          const params = new URLSearchParams();
          params.append('token',sessionStorage.token);
          axios.post(url,params).then(res => {
            _this.$loading.hide()
               this.Account = res.data.Account;
                // console.log(res);
                if (res.data.result == '400') {
                  this.$vux.alert.show({
                      title: '',
                      content: res.data.resultMsg
                  })
                  setTimeout(() => {
                      this.$vux.alert.hide()
                      this.$router.push({path:"/login",query: {redirect: 'your path'}})
                  }, 3000)
                }else if (res.data.result == 200) {
                    this.isshow1 = true;
                    this.isshow2 = false;
                }
          }).catch((err) => {
              console.log(err)
          });
          // const status = this.$route.query.status
          // if (status == '投标中') {
          //     this.tbz();
          //   }else if (status == '持有中') {
          //     this.cyz();
          //   }else if (status == '已兑付') {
          //     this.had();
          //   }else{
          //       this.cyz();
          //   }
          
    },
    activated() {
        setTimeout(() => {
            const status = this.$route.query.status
              if (status == '投标中') {
                  this.tbz();
                }else if (status == '持有中') {
                  this.cyz();
                }else if (status == '已兑付') {
                  this.had();
                }
        }, 500)
     
    },
    methods:{
        goBack() {
            this.$router.back()
        },
        category(){
            this.$router.push({ path: '/category' })
        },
        assetdetail(id){
            const status = $(".active").text()
            this.$router.push({ path: '/page/assetdetail',query:{id:id,status:status} })
        },
        Transfer(){
            this.$router.push({ path: '/page/Transfer' })
        },
        // 已兑付
        had(){
            $(".isshow4").hide();
            this.isshow7 = true
            $(".img1").hide();
            const _this = this
            _this.$loading.show();
            $(".had").addClass('active')
            $(".going").removeClass('active')
            $(".has").removeClass('active')
            const url1 = myPub.URL+`/user/getUserAssetsList` ;
            const params1 = new URLSearchParams();
            params1.append('token',sessionStorage.token);
            params1.append('curPage',1);
            params1.append('pageSize',9);
            params1.append('status',3);
            params1.append('productFullStatus',"0,1,2");
            params1.append('czlx',1);
            params1.append('orderType',"0,1");
            axios.post(url1,params1).then(res => {
                console.log(res);
                _this.$loading.hide();
                this.Product = res.data.Product;
                if (res.data.result == '400') {
                this.$vux.alert.show({
                    title: '',
                    content: res.data.resultMsg
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    this.$router.push({path:"/login",query: {redirect: 'your path'}})
                }, 3000)
                }else if (res.data.result == 200) {
                    this.totalCount = res.data.totalCount
                    this.isshow4 = true
                    if (res.data.totalCount == 0) {
                        this.isshowHas = true;
                    }else{
                        console.log(this.totalCount)
                        const url1 = myPub.URL+`/user/getUserAssetsList` ;
                        const params1 = new URLSearchParams();
                        params1.append('token',sessionStorage.token);
                        params1.append('curPage',1);
                        params1.append('pageSize',this.totalCount);
                        params1.append('czlx',1);
                        params1.append('status',"3");
                        params1.append('productFullStatus',"0,1,2");
                        params1.append('orderType','0,1');
                        axios.post(url1,params1).then(res => {
                            console.log(res);
                           if (res.data.result == 200) {
                                this.totalCount = res.data.totalCount
                                this.Product = res.data.Product
                                if (res.data.totalCount == 0) {
                                    this.isshowHas = true;
                                }else{
                                    this.isshowHas = false;
                                };
                                $(".isFull").hide();
                            }
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                    setTimeout(() => {
                        $(".productStatus").each(function (i,n) {
                            if ($(".productStatus").eq(i).text() == '4') {
                                $(".img1").attr("src","./static/img/had.png")
                                $(".img1").show()
                            }
                        })
                        $(".exceptedYield").each(function (i) {
                            const value = $(".exceptedYield").eq(i).text()
                            const newvalue = Math.floor(value * 100) / 100
                            $(".exceptedYield").eq(i).text(value)
                        })
                    }, 300)
                    
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        // 持有
        cyz(){
            this.isshow7 = false
            $(".has").addClass('active')
            $(".going").removeClass('active')
            $(".had").removeClass('active')
            //持有数据
            const url1 = myPub.URL+`/user/getUserAssetsList` ;
            const _this = this
            const params1 = new URLSearchParams();
            _this.$loading.show();
            params1.append('token',sessionStorage.token);
            params1.append('curPage',1);
            params1.append('pageSize',20);
            params1.append('czlx',1);
            params1.append('status',"1,2");
            params1.append('productFullStatus',"0,1,2");
            params1.append('orderType',0);
            axios.post(url1,params1).then(res => {
                    console.log(res);
                    _this.$loading.hide();
                this.Product = res.data.Product;
                    if (res.data.result == '400') {
                    this.$vux.alert.show({
                        title: '',
                        content: res.data.resultMsg
                    })
                    setTimeout(() => {
                        this.$vux.alert.hide()
                        this.$router.push({path:"/login",query: {redirect: 'your path'}})
                    }, 3000)
                    }else if (res.data.result == 200) {
                        this.totalCount = res.data.totalCount
                        if (res.data.totalCount == 0) {
                            this.isshowHas = true;
                        }else{
                            console.log(this.totalCount)
                            const url1 = myPub.URL+`/user/getUserAssetsList` ;
                            const _this = this
                            const params1 = new URLSearchParams();
                            _this.$loading.show();
                            params1.append('token',sessionStorage.token);
                            params1.append('curPage',1);
                            params1.append('pageSize',this.totalCount);
                            params1.append('czlx',1);
                            params1.append('status',"1,2");
                            params1.append('productFullStatus',"0,1,2");
                            params1.append('orderType',0);
                            axios.post(url1,params1).then(res => {
                                console.log(res);
                                 _this.$loading.hide();
                               if (res.data.result == 200) {
                                    this.totalCount = res.data.totalCount
                                    this.Product = res.data.Product
                                    if (res.data.totalCount == 0) {
                                        this.isshowHas = true;
                                    }else{
                                        this.isshowHas = false;
                                    };

                                    $(".isFull").hide();
                                }
                            }).catch((err) => {
                                console.log(err)
                            })
                        }
                    }
            }).catch((err) => {
                console.log(err)
            });
        },
        // 投标中
        tbz(){
            this.isshow7 = false
            $(".going").addClass('active')
            $(".had").removeClass('active')
            $(".has").removeClass('active');
            const _this = this;
            _this.$loading.show();
            const url1 = myPub.URL+`/user/getUserAssetsList` ;
            const params1 = new URLSearchParams();
            params1.append('token',sessionStorage.token);
            params1.append('curPage',1);
            params1.append('pageSize',9);
            params1.append('czlx',1);
            params1.append('status',"6,7");
            params1.append('productFullStatus',"0,2");
            params1.append('orderType',0,1);
            axios.post(url1,params1).then(res => {
                console.log(res);
                _this.$loading.hide();
                this.Product = res.data.Product;
                if (res.data.result == '400') {
                    this.$vux.alert.show({
                        title: '',
                        content: res.data.resultMsg
                    })
                    setTimeout(() => {
                        this.$vux.alert.hide()
                        this.$router.push({path:"/login",query: {redirect: 'your path'}})
                    }, 3000)
                }else if (res.data.result == 200) {
                    this.totalCount = res.data.totalCount
                    this.isshow4 = false;
                    if (res.data.totalCount == 0) {
                        this.isshowHas = true;
                    }else{
                        // console.log(this.totalCount)
                        const url1 = myPub.URL+`/user/getUserAssetsList` ;
                        const _this = this;
                        const params1 = new URLSearchParams();
                        _this.$loading.show();
                        params1.append('token',sessionStorage.token);
                        params1.append('curPage',1);
                        params1.append('pageSize',9);
                        params1.append('czlx',1);
                        params1.append('status',"6,7");
                        params1.append('productFullStatus',"0,2");
                        params1.append('orderType',0);
                        axios.post(url1,params1).then(res => {
                            console.log(res);
                             _this.$loading.hide();
                           if (res.data.result == 200) {
                                this.Product = res.data.Product
                                if (res.data.totalCount == 0) {
                                    this.isshowHas = true;
                                }else{
                                    this.isshowHas = false;
                                };
                                $(".isFull").show();
                            }
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                    setTimeout(() => {
                        $(".productStatus").each(function (i,n) {
                            console.log(i)
                            if ($(".productStatus").eq(i).text() == '6') {
                                $(".img1").eq(i).css("display","b")
                                $(".img1").eq(i).attr("src","./static/img/lost.png")
                            }else{
                                $(".img1").eq(i).css("display","none")
                            }
                        })
                    }, 300)
                    
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
    background: #f6f6f6;
    height: auto;
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
            text-align: center;padding-bottom: 13rem;
            img{margin-top: 3rem;width: 4.2rem;height: 4.5rem;}
            p{font-size: 0.8rem;color: #999;line-height:1rem;margin-top: 0.5rem;}
            .button{width: 10rem;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);border: 0;border-radius: 30px;line-height: 2.2rem;height: 2.2rem;color: #fff;font-size: 0.9rem;margin-top: 1.2rem;}
        }
        .Data{
            .datalist{
                
                li{
                    background: #fff;position: relative;margin-top: 0.5rem;
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
