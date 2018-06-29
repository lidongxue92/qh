<template>
    <div class="goods">
        <ul class="tab">
            <li class="Conducttab active" @click="Conducttab">理财专区</li>
            <li class="Transfertab" @click="Transfertab">转让专区</li>
        </ul>
        <!-- 理财专区 -->
        <div class="Conduct" v-if='isshow'>
            <div class="top" v-for="(item,index) in datalist" v-if="index == 0">
                <h5>{{item.productName}}<span>新手福利高预期收益</span></h5>
                <p class="Profit">{{item.annualYield}}</p>
                <p><span>剩余金额 &emsp; <b>{{item.openLimit}}</b></span>&emsp; | &emsp;<span>理财期限  &emsp; <b>{{item.openLimit}}</b> </span></p>
                <button class="button" @click="linktoDetail()">立即投资</button>
            </div>
            <div class="middle">
             <ul class="productlist">
                  <li v-for="(item,index) in datalist" @click="linktoDetail(item.productId,item.qcdz)">
                    <h5>{{item.productName}}<span>热销火爆 高收益</span><span class="Property">{{item.productType}}</span><p class="img">{{item.isHot}}</p></h5>
                    <div>
                        <p class="left">
                            <span class="Profit">{{item.annualYield}}<b v-if="isshow2">{{item.profit}}</b></span>
                            <span>历史年化收益率</span>
                        </p>
                        <p class="right">
                            <span class="day"><b>{{item.daysLimit}}</b> 个月</span><span class="status">{{item.status}}</span>
                            <span class="Quota">剩余金额 <b>{{item.openLimit}}</b></span>
                        </p>
                    </div>
                    <img class="bg-img" src="~@/assets/img/full.png">
                    <div class="bg"></div>
                  </li>
             </ul>
             <p class="note">理财有风险投资需谨慎 </p>
         </div>
        </div>
        <!-- 转让专区 -->
        <div class="Transfer" v-if='isshow1'>
            <div class="middle">
             <ul class="productlist">
                  <li v-for="(item,index) in datalist" @click="linktoDetail(item.productId)">
                    <h5>{{item.productName}}<span>热销火爆 高收益</span></h5>
                    <div>
                        <p class="left">
                            <span class="Profit">{{item.annualYield}}<b v-if="isshow2">{{item.profit}}</b></span>
                            <span>历史年化收益率</span>
                        </p>
                        <p class="right">
                            <span class="day"><b>{{item.daysLimit}}</b> 个月</span><span class="status">{{item.status}}</span>
                            <span class="Quota">剩余金额 <b>{{item.openLimit}}</b></span>
                        </p>
                    </div>
                    <img class="bg-img" src="~@/assets/img/full.png">
                    <div class="bg"></div>
                  </li>
             </ul>
             <p class="note">理财有风险投资需谨慎 </p>
         </div>
        </div>
    </div>
</template>

<script>
import { XInput, Group, XButton, Cell, Toast, base64 } from 'vux'
import * as myPub from '@/assets/js/public.js'
import axios from 'axios'
import $ from 'jquery'
import Vue from 'vue'
export default {
    name: 'category',
    data(){
　　　　　　return {
　　　　　　　　datalist:'',
                isshow1:false,
                isshow:true,
                isshow2:true,
                isshow3:false,
                isshow4:false,
                isshow5:false,
　　　　　　}
　　　　},
    created() {
    },
    activated() {
      const status = '1'
      const a = ''
        this.pro(status,a)
    },
    computed: {
    },
    methods: {
      // 跳转详情页
        linktoDetail(id,dz) {
            this.$router.push({ path: '/page/detail',query: { id: id,dz:dz }})
        },
        linktoDetailto() {
            this.$router.push({ path: '/page/detailto'})
        },
        // 理财专区
        Conducttab(){
            const _this = this
            _this.isshow = true
            _this.isshow1 = false
            $(".Conducttab").addClass('active')
            $(".Transfertab").removeClass('active')
            this.pro('1','18')
        },
        // 转让专区
        Transfertab(){
            const _this = this
            _this.isshow = false
            _this.isshow1 = true 
            $(".Transfertab").addClass('active')
            $(".Conducttab").removeClass('active')
            this.pro('2','19')
        },
        pro(status,a){
          const _this = this
          const url = myPub.URL+`/product/getProductList`;
          var params = new URLSearchParams();
          _this.$loading.show();
          params.append('productType','14');
          params.append('productSubType',a);
          params.append('productProperty',status);
          params.append('clientType','h5');
          params.append('token',sessionStorage.token)
          params.append('pageSize','10');
          params.append('curPage','1');
          axios.post(url,params).then(res => {
            _this.$loading.hide();
              console.log(res.data);
              this.datalist =res.data.Product
              setTimeout(() => {
                $(".img").each(function (i,n) {
                  if ($(".img").eq(i).text() == '1') {
                    $(".img").eq(i).css("opacity","1")
                    $(".img").eq(i).addClass('img2')
                    $(".img").eq(i).text('热销产品')
                  }
                  if ($(".img").eq(i).text() == '0') {
                    $(".img").eq(i).css("opacity","1")
                    $(".img").eq(i).addClass('img3')
                    $(".img").eq(i).text('固收产品')
                  }
                })
                $(".status").each(function (i,n) {
                  if ($(".status").eq(i).text() == '3') {
                    $(".status").eq(i).css({"opacity":"1"})
                    $(".status").eq(i).text('可加入')
                    $(".bg-img").eq(i).css("display","none")
                    $(".bg").eq(i).css("display","none")
                  }
                  if ($(".status").eq(i).text() == '4') {
                    $(".status").eq(i).css({"opacity":"1","color":"#999"})
                    $(".status").eq(i).text('不可加入')
                    $(".bg-img").eq(i).css("display","block")
                    $(".bg").eq(i).css("display","block")
                  }
                })
                $(".Property").each(function (i,n) {
                  if ($(".Property").eq(i).text() == '18') {
                    $(".Property").eq(i).css({"opacity":"1"})
                    $(".Property").eq(i).text('不可转让')
                  }
                  if ($(".Property").eq(i).text() == '3') {
                    $(".Property").eq(i).css({"opacity":"1"})
                    $(".Property").eq(i).text('不可转让')
                  }
                  if ($(".Property").eq(i).text() == '22') {
                    $(".Property").eq(i).css({"opacity":"1"})
                    $(".Property").eq(i).text('不可转让')
                  }
                  if ($(".Property").eq(i).text() == '19') {
                    $(".Property").eq(i).css({"opacity":"1"})
                    $(".Property").eq(i).text('可转让')
                  }
                })
            }, 500)
          }).catch((err) => {
              console.log(err);
          });
        }

    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        }//回退上一级页面并刷新
    }
}
</script>
<style scoped lang="less">
/*顶部背景 样式*/
 .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content:" ";
    clear: both;
    height: 0;
}
.clearfix {
    zoom:1;
}
.goods{
    background: #f7f7f7;
    height: 100%;
    h5{line-height: 30px;font-weight: normal;font-size: 0.8rem;border-bottom: 1px solid #eee;padding: 0 1rem;}
    .tab{
        background: #2B9AFF;
        li{display: inline-block;width: 49%;border-bottom: 1px solid #eee;text-align: center;line-height: 40px;height: 40px;color: #BDD4F5;}
        .active{color: #fff;position: relative;}
        .active:after{content: '';display: inline-block;width: 30%;height: 2px;background: #fff;left: 35%;bottom: 0;position: absolute;}
    }
    .top{
        border-bottom: 1px solid #eee;background: #fff;width: 94%;margin-left: 3%;margin-top: 3%;padding: 1rem 0;
        h5{
            font-size: 0.9rem;font-weight: normal;text-align: center;line-height: 30px;border-bottom: 0;
            span{font-size: 0.7rem;border-left: 1px solid #eee;padding: 0 1rem;margin-left: 1rem;color: #999;}
          }
        p{
          text-align: center;font-size: 0.8rem;line-height: 30px;color: #999;
          b{font-weight: normal;font-size: 0.9rem;color: #333}
        }
        .Profit{font-size:3rem;color: #FFA303;font-weight: 600;margin-top: 1rem;margin-bottom: 1rem;}
        .button{display: inline-block;width: 80%;line-height: 40px;height: 40px;border: 0;border-radius: 30px;background: #2773FF;color: #fff;margin-top: 10px;margin-left: 10%;}
    }
    .middle{
        .productlist{
          li{
              background: #fff;margin-top: 10px;padding:1rem;position: relative;
              .status{position: absolute;opacity: 0;}
              h5{
                  border-bottom: 1px solid #eee;font-weight: normal;font-size: 0.8rem;height: 2.2rem;position: relative;padding-left: 0;
                  span{color: #999;margin-left: 10px;font-size: 0.6rem;}
                  .Property{line-height: 1rem;padding:0 0.2rem;border: 1px solid #FFA303;border-radius: 30px;color:#FFA303;opacity: 0;position: absolute;right: 5.5rem;top: 0.3rem;}
                  .img{
                      float: right;display: inline-block;width: 5rem;height:1.8rem;color: #fff;text-align: center;line-height:1.8rem;font-size: 0.6rem;position: absolute;opacity: 0;right: 0;
                  }
                  .img1{background: url(~@/assets/img/icon_biao1@2x.png);background-size: 100% ;background-repeat: no-repeat;}
                  .img2{background: url(~@/assets/img/icon_biao2@2x.png);background-size: 100% ;background-repeat: no-repeat;}
                  .img3{background: url(~@/assets/img/icon_biao4@2x.png);background-size: 100% ;background-repeat: no-repeat;}
              }
              .left{
                  display: inline-block;width: 48%;border-right: 1px solid #eee;margin-top: 1rem;text-align: left;font-size: 0.6rem;color: #999;
                  .Profit{
                      display: block;width: 100%;color: #FFA303;font-size: 2rem;font-weight: 600;text-align: left;
                      b{font-size: 1rem;font-weight: normal;}
                  }
              }
              .right{
                  display: inline-block;width: 48%;
                  .day{
                      font-size: 0.6rem;border-right: 1px solid #eee;padding: 0 0.8rem;
                      b{font-size: 0.8rem;font-weight: normal;}
                  }
                  .status{color: #FFA303;font-size: 0.6rem;padding:0 0.8rem;opacity: 0}
                  .Quota{
                      display: inline-block;width: 100%;font-size: 0.6rem;padding: 0 0.8rem;color: #999;
                      b{font-weight: normal;color: #333;font-size: 0.9rem;}
                  }
              }
              .bg-img{position: absolute;width: 4rem;height: 4rem;right: 1rem;top: 5rem;}
              .bg{position: absolute;width: 100%;height: 100%;background: rgba(255,255,255,.3);left: 0;top: 0;}
          }
      }
      .note{text-align: center;padding: 1rem 5rem;font-size: 0.5rem;color: #999;}
    }
}
</style>
