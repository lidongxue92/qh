<template>
    <div class="goods">
        <ul class="tab">
            <li class="Conducttab active" @click="Conducttab">理财专区</li>
            <li class="Transfertab" @click="Transfertab">转让专区</li>
        </ul>
        <!-- 理财专区 -->
        <div class="Conduct" v-if='isshow'>
            <div class="top" v-for="(item,index) in datalist" v-if="index == 0"  :key="index">
                <h5>{{item.productName}}<span>新手福利高预期收益</span></h5>
                <p class="Profit">{{item.annualYield}}%</p>
                <p><span>剩余金额 &emsp; <b>{{item.openLimit}}</b>元</span>&emsp; | &emsp;<span>理财期限  &emsp; <b>{{item.period}}</b>天</span></p>
                <button class="button" @click="linktoDetail(item.productId,item.qcdz)">立即投资</button>
            </div>
            <div class="middle">
               <ul class="productlist">
                    <li class="list" v-for="(item,index) in datalist" @click="linktoDetail(item.productId,item.qcdz)" v-view-lazy :key="index">
                      <h5><span class="prodecttitle">{{item.productName}}</span><span style="position: relative;top: -0.7rem;display: inline-block;">热销火爆 高收益</span><span class="Property">{{item.productType}}</span><p class="img">{{item.isHot}}</p></h5>
                      <div>
                          <p class="left">
                              <span class="Profit">{{item.annualYield}}<b v-if="isshow2">{{item.profit}}</b>%</span>
                              <span>历史年化收益率</span>
                          </p>
                          <p class="right">
                              <span class="day"><b>{{item.period}}</b>天</span>
                              <span class="status">{{item.status}}</span>
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
                  <li class="list" v-for="(item,index) in datalist" @click="linktoDetailto(item.productId,item.qcdz)" v-view-lazy :key="index">
                  <h5><span class="prodecttitle">{{item.productName}}</span><span style="position: relative;top: -0.7rem;display: inline-block;">热销火爆 高收益</span></h5>
                    <div>
                        <p class="left">
                            <span class="Profit">{{item.annualYield}}<b v-if="isshow2">{{item.profit}}</b>%</span>
                            <span>历史年化收益率</span>
                        </p>
                        <p class="right">
                            <span class="day"><b>{{item.period}}</b>天</span>
                            <span class="status">{{item.status}}</span>
                            <span class="Quota">剩余金额<b>{{item.openLimit}}</b>元</span>
                        </p>
                    </div>
                    <img class="bg-img" src="~@/assets/img/full.png">
                    <div class="bg"></div>
                  </li>
             </ul>
             <p class="note">理财有风险投资需谨慎 </p>
         </div>
        </div>
        <div class="page"><page></page></div>
    </div>
</template>

<script>
import { XInput, Group, XButton, Cell, Toast, base64 } from 'vux'
import {Loadmore} from 'mint-ui';
import * as myPub from '@/assets/js/public.js'
import axios from 'axios'
import $ from 'jquery'
import Vue from 'vue'
import page from '../../pages/page/page'
export default {
    name: 'category',
    data(){
　　　return {
        isshow1:false,
        isshow:true,
        isshow2:true,
        isshow3:false,
        isshow4:false,
        isshow5:false,
        // loadingShow: false,
        scroll: '',
        curPage: 1,
        pageSize: 10,
        disQuestionList:[],//每次加载出来的新数据
        datalist:[],
        totalCount:'',　　//每次加载累加后的总数据
　　　}
　　},
    created() {
    //   this.token()
      const status = '1'
      const a = ' '
      this.pro(status,a,10)
    },
    activated() {
      const status = '1'
      const a = '18'
    },
    beforeMount() {
       //获取url
        var url = location.href;
        var url = url.split("=");
        var token = url[1];
        if (token != undefined) {
            sessionStorage.setItem("token",token);
        }
    },
    mounted() {
      const status = '1'
      const a = ' '
      setTimeout(() => {
        this.pro(status,a,this.totalCount)
      }, 500)
    },
    methods: {
      // 跳转详情页
        linktoDetail(id,dz) {
            this.$router.push({ path: '/page/detail',query: { id: id,dz:dz }})
        },
        linktoDetailto(id,dz) {
            this.$router.push({ path: '/page/detailto',query: { id: id,dz:dz }})
        },
        // 理财专区
        Conducttab(){
            const _this = this
            _this.isshow = true
            _this.isshow1 = false
            $(".Conducttab").addClass('active')
            $(".Transfertab").removeClass('active')
            this.pro('1',' ',10)
            setTimeout(() => {
              this.pro(1,'',this.totalCount)
            }, 500)
        },
        // 转让专区
        Transfertab(){
            const _this = this
            _this.isshow = false
            _this.isshow1 = true
            $(".Transfertab").addClass('active')
            $(".Conducttab").removeClass('active')
            this.pro('2','19',10)
            setTimeout(() => {
              this.pro(2,19,this.totalCount)
            }, 500)
        },
        pro(status,a,i){
          const _this = this
          const url = myPub.URL+`/product/getProductList`;
          var params = new URLSearchParams();
          _this.$loading.show();
          params.append('productType','14');
          params.append('productSubType',a);
          params.append('productProperty',status);
          params.append('clientType','h5');
          params.append('token',sessionStorage.token)
          params.append('pageSize',i);
          params.append('curPage','1');
          axios.post(url,params).then(res => {
            _this.$loading.hide();
              console.log(res.data);
              const data = res.data
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
                this.datalist = res.data.Product
                this.totalCount = res.data.totalCount
                console.log(this.totalCount)
                setTimeout(() => {
                    $(".img").each(function (i,n) {
                      if ($(".img").eq(i).text() == '1') {
                        $(".img").eq(i).css("opacity","1")
                        $(".img").eq(i).addClass('img2')
                        $(".img").eq(i).text('热销产品')
                      }
                      if ($(".img").eq(i).text() == '0') {
                        $(".Property").each(function (i,n) {
                          if ($(".Property").eq(i).text() == '18' && $(".img").eq(i).text() == '0') {
                              $(".Property").eq(i).css({"opacity":"1"})
                              $(".Property").eq(i).text('不可转让')
                              $(".img").eq(i).css("opacity","1")
                              $(".img").eq(i).addClass('img3')
                              $(".img").eq(i).text('固收产品')
                          }
                          if ($(".Property").eq(i).text() == '3' && $(".img").eq(i).text() == '0') {
                              $(".Property").eq(i).css({"opacity":"1"})
                              $(".Property").eq(i).text('不可转让')
                              $(".img").eq(i).css("opacity","1")
                              $(".img").eq(i).addClass('img3')
                              $(".img").eq(i).text('固收产品')
                          }
                          if ($(".Property").eq(i).text() == '22' && $(".img").eq(i).text() == '0') {
                              $(".Property").eq(i).css({"opacity":"1"})
                              $(".Property").eq(i).text('不可转让')
                              $(".img").eq(i).css("opacity","1")
                              $(".img").eq(i).addClass('img3')
                              $(".img").eq(i).text('固收产品')
                          }
                          if ($(".Property").eq(i).text() == '19' && $(".img").eq(i).text() == '0') {
                              $(".Property").eq(i).css({"opacity":"1"})
                              $(".Property").eq(i).text('可转让')
                              $(".img").eq(i).css("opacity","1")
                              $(".img").eq(i).addClass('img3')
                              $(".img").eq(i).text('转让产品')
                          }
                           if ($(".Property").eq(i).text() == '3' && $(".img").eq(i).text() == '0') {
                              $(".Property").eq(i).css({"opacity":"1"})
                              $(".Property").eq(i).text('可转让')
                              $(".img").eq(i).css("opacity","1")
                              $(".img").eq(i).addClass('img1')
                              $(".img").eq(i).text('新手产品')
                          }
                        })
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
                            $(".img").eq(i).css("opacity","1")
                              $(".img").eq(i).addClass('img3')
                              $(".img").eq(i).text('转让产品')
                        }
                      })
                    $(".status").each(function (i,n) {
                    if ($(".status").eq(i).text() == '3') {
                        $(".status").eq(i).css({"opacity":"1"})
                        $(".status").eq(i).text('')
                        $(".bg-img").eq(i).css("display","none")
                        $(".bg").eq(i).css("display","none")
                    }
                    if ($(".status").eq(i).text() == '4') {
                        $(".status").eq(i).css({"opacity":"1","color":"#999"})
                        $(".status").eq(i).text('')
                        $(".bg-img").eq(i).css("display","block")
                        $(".bg").eq(i).css("display","block")
                    }
                    })
                }, 500)
              }else if (data.result == '400') {
                    this.$vux.alert.show({
                        title: '',
                        content: data.resultMsg
                    })
                    setTimeout(() => {
                        this.$vux.alert.hide()
                        this.$router.push({path:"/login"})
                    }, 3000)
                }

          }).catch((err) => {
              console.log(err);
          });
        },
        getAjaxContent(event,datalist){
            event.innerText = datalist
        },
        // 判断token
        // token(){
        //     if (!sessionStorage.token) {
        //       this.$vux.alert.show({
        //           title: '',
        //           content: '请登录'
        //       })
        //       setTimeout(() => {
        //           this.$vux.alert.hide()
        //           this.$router.push({path:"/login",query: {redirect: 'your path'}})
        //       }, 2000)
        //     }
        // },
        menu() {
          this.scroll = document.body.scrollTop;
          console.log(this.scroll)
         }
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        }//回退上一级页面并刷新
    },
    components: {
        top,
        page
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
    height: auto;
    h5{line-height: 30px;font-weight: normal;font-size: 0.8rem;border-bottom: 1px solid #eee;padding: 0 1rem;}
    .tab{
        background: #2B9AFF;
        li{display: inline-block;width: 49%;border-bottom: 1px solid #eee;text-align: center;line-height: 40px;height: 40px;color: #BDD4F5;}
        .active{color: #fff;position: relative;}
        .active:after{content: '';display: inline-block;width: 30%;height: 2px;background: #fff;left: 35%;bottom: 0;position: absolute;}
    }
    .Conduct{
        height: auto;
        &:after{
            content: "";
            display: block;
            clear: both;
        }
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
          .list{
              background: #fff;margin-top: 10px;padding:1rem;position: relative;min-height: 8rem; margin-bottom: 10px;
              .status{position: absolute;opacity: 0;}
              h5{
                  border-bottom: 1px solid #eee;font-weight: normal;font-size: 0.8rem;height: 2.2rem;position: relative;padding-left: 0;
                  span{color: #999;margin-left: 0.5rem;font-size: 0.6rem;}
                  .prodecttitle{
                      display: inline-block;
                      max-width: 5.5rem;
                      overflow: hidden;
                      text-overflow:ellipsis;
                      white-space: nowrap;
                      position: relative;
                      top: -0.1rem;
                      margin-left: 0;
                      color: #333;
                      font-size: 0.8rem;
                    }
                  .Property{line-height: 1rem;padding:0 0.2rem;border: 1px solid #FFA303;border-radius: 30px;color:#FFA303;opacity: 0;position: absolute;right: 5.1rem;top: 0.3rem;}
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
                  display: inline-block;width: 48%;margin-top: 1rem;
                  .day{
                      font-size: 0.6rem;
                    //border-right: 1px solid #eee;
                      padding: 0 0.8rem;
                      b{font-size: 0.8rem;font-weight: normal;}
                  }
                  .status{color: #FFA303;font-size: 0.6rem;padding:0 0.8rem;opacity: 0;position: relative;}
                  .Quota{
                      display: inline-block;width: 100%;font-size: 0.6rem;padding: 0 0.8rem;color: #999;
                      b{font-weight: normal;color: #333;font-size: 0.9rem;}
                  }
              }
              .bg-img{position: absolute;width: 4rem;height: 4rem;right: 1rem;top: 5rem;}
              .bg{position: absolute;width: 100%;height: 100%;background: rgba(255,255,255,.3);left: 0;top: 0;}
          }
          .list:first-child{display: none;}
      }
      .note{text-align: center;padding: 1rem 5rem;font-size: 0.5rem;color: #999;}
    }
}
</style>
