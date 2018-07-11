<template>
    <div class="goods">
        <ul class="tab">
            <li class="Conducttab active" @click="Conducttab">理财专区</li>
            <li class="Transfertab" @click="Transfertab">转让专区</li>
        </ul>

        <!-- 没有数据 -->
        <div class="nodata" v-if="isshowHas">
            <!-- <img src="~@/assets/img/no_data.png"> -->
           <!--  <p>您还没有持有理财产品哦</p> -->
            <p>~暂无数据~</p>
            <!-- <button class="button" @click="category">去理财</button> -->
            <p class="note">理财有风险投资需谨慎 </p>
        </div>
        <!-- 理财专区 -->
        <div class="Conduct" v-if='isshow'>
            <div class="top" v-for="(item,index) in datalist" v-if="index == 0"  :key="index">
                <h5>{{item.productName}}<span class="Propagan"></span></h5>
                <span class="Profit Profit1" style="text-align: center;">{{item.baseAnnualYield}}<b style="font-weight: normal;color: #FFA303;font-size: 0.8rem">%<span class="actAnnual">+{{item.actAnnualYield}}%</span></b></span>
                <span class="Profit Profit2">{{item.baseAnnualYield}}<b style="font-weight: normal;">%-</b>{{item.actAnnualYield}}<b >%</b></span>
                <p><span>剩余金额 &emsp; <b class="LCopenLimit">{{item.openLimit}}</b><i class="danWei" style="font-style:normal"></i></span>&emsp; | &emsp;<span>理财期限  &emsp; <b>{{item.period}}</b>天</span></p>
                <button class="button" @click="linktoDetail(item.productId,item.qcdz)">立即投资</button>
            </div>
            <div class="middle">
               <ul class="productlist">
                    <li class="list" v-for="(item,index) in datalist" @click="linktoDetail(item.productId,item.qcdz)" v-view-lazy :key="index">
                    <h5>
                      <span class="prodecttitle">{{item.productName}}</span>
                      <span class="Slogan" style="position: relative;display: inline-block;bottom: 0.7rem;"></span>
                      <span class="Property">{{item.productType}}</span>
                      <p class="img">
                        <b class="hot">{{item.isHot}}</b>
                        <img src=""> <span></span>
                      </p>
                      <span class="productProperty" style="position: absolute;opacity: 0">{{item.productProperty}}</span>
                    </h5>
                    <div>
                        <p class="left">
                            <span class="Profit Profit1">{{item.baseAnnualYield}}<b style="font-weight: normal;color: #FFA303">%<span class="actAnnual">+{{item.actAnnualYield}}%</span></b></span>
                            <span class="Profit Profit2">{{item.baseAnnualYield}}<b style="font-weight: normal;">%-</b>{{item.actAnnualYield}}<b>%</b></span>
                            <span>历史年化收益率</span>
                        </p>
                        <p class="right">
                            <span class="day"><b>{{item.period}}</b>天</span>
                            <span class="status">{{item.status}}</span>
                            <span class="Quota">剩余金额 <b class="LCopenLimit">{{item.openLimit}}</b><i class="danWei" style="font-style:normal"></i></span>
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
                  <h5><span class="prodecttitle">{{item.productName}}</span><span class="Propaganda" style="position: relative;top: -0.7rem;display: inline-block;"></span></h5>
                    <div>
                        <p class="left">
                            <span class="Profit Profit1">{{item.annualYield}}
                            <b style="font-weight: normal;color: #FFA303">%</b></span>
                            <!-- <span class="Profit Profit2">{{item.baseAnnualYield}}<b style="font-weight: normal;">%-</b>{{item.actAnnualYield}}<b>%</b></span>
                            <span>历史年化收益率</span> -->
                        </p>
                        <p class="right">
                            <span class="day"><b>{{item.period}}</b>天</span>
                            <span class="status">{{item.status}}</span>
                            <span class="Quota">剩余金额<b class="LCopenLimit">{{item.openLimit}}</b><i class="danWei" style="font-style:normal"></i></span>
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
        isshowHas:false,
        scroll: '',
        curPage: 1,
        pageSize: 10,
        disQuestionList:[],//每次加载出来的新数据
        datalist:[],
        totalCount:'',　　//每次加载累加后的总数据
        imgsrc1:"./static/img/icon_biao1@2x.png",
        imgsrc2:"./static/img/icon_biao2@2x.png",
        imgsrc3:"./static/img/icon_biao4@2x.png"
　　　}
　　},
    created() {
    //   this.token()
      const status = '1'
      const a = ' '
      this.pro(status,a,50)
      setTimeout(() => {
        this.pro(status,a,this.totalCount)
      }, 1000)
    },
    activated() {
      const status = '1'
      const a = ' '
      this.pro(status,a,50)
      setTimeout(() => {
        this.pro(status,a,this.totalCount)
      }, 1000)
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
            const flag = "category";
            this.$router.push({ path: '/page/detail',query: { id: id,dz:dz,flag:flag}})
        },
        linktoDetailto(id,dz) {
            const flag = "category";
            this.$router.push({ path: '/page/detailto',query: { id: id,dz:dz,flag:flag}})
        },
        // 理财专区
        Conducttab(){
            const _this = this
            _this.isshow = true
            _this.isshow1 = false
            $(".Conducttab").addClass('active')
            $(".Transfertab").removeClass('active')
            this.pro('1',' ',50)
            setTimeout(() => {
              this.pro(1,'',this.totalCount);
            }, 500)
        },
        // 转让专区
        Transfertab(){
            const _this = this
            _this.isshow = false
            _this.isshow1 = true
            $(".Transfertab").addClass('active')
            $(".Conducttab").removeClass('active')
            this.pro('2','19',50)
            setTimeout(() => {
              this.pro1(2,19,this.totalCount)
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
              if (data.result == '200') {
                this.datalist = res.data.Product
                this.totalCount = res.data.totalCount
                console.log(this.totalCount);

                if (this.datalist.length == 0) {
                  this.isshowHas = true
                  this.isshow = false
                }else{
                  this.isshowHas = false
                  this.isshow = true
                }
                setTimeout(() => {
                  // 判断 固收 新手 转让 热销
                  $(".Property").each(function (i,n) {
                    if ($(".hot").eq(i).text() == '0'  &&  $(".Property").eq(i).text() == '3') {
                        $(".Property").eq(i).css("opacity","1")
                        $(".Property").eq(i).text('不可转让')
                        $(".img").eq(i).css("opacity","1")
                        $(".img img").eq(i).attr("src","./static/img/icon_biao1@2x.png")
                        $(".img span").eq(i).text('新手产品')
                        $(".Slogan").eq(i).text('新手产品高预期收益')
                        $(".Profit2").eq(i+1).css("display",'none')
                        // $(".Profit2").eq(i).css("display",'none')
                    }else if ($(".hot").eq(i).text() == '0'  &&  $(".Property").eq(i).text() == '18') {
                        $(".Property").eq(i).css("opacity","1")
                        $(".Property").eq(i).text('不可转让')
                        $(".img").eq(i).css("opacity","1")
                        $(".img img").eq(i).attr("src","./static/img/icon_biao4@2x.png")
                        $(".img span").eq(i).text('固收产品')
                        $(".Slogan").eq(i).text('固定期限 省心理财')
                        $(".Profit2").eq(i+1).css("display",'none')
                        // $(".Profit1").eq(i).css("display",'block')
                    }else if ($(".hot").eq(i).text() == '0'  &&  $(".Property").eq(i).text() == '19') {
                        $(".Property").eq(i).css("opacity","1")
                        $(".Property").eq(i).text('可转让')
                        $(".img").eq(i).css("opacity","1")
                        $(".img img").eq(i).attr("src","./static/img/icon_biao4@2x.png")
                        $(".img span").eq(i).text('转让产品')
                        $(".Slogan").eq(i).text('转让灵活 周转无忧')
                        // $(".Profit2").eq(i).css("display",'block')
                        $(".Profit1").eq(i+1).css("display",'none')
                    }else if ($(".hot").eq(i).text() == '0'  &&  $(".Property").eq(i).text() == '22') {
                        $(".Property").eq(i).css("opacity","1")
                        $(".Property").eq(i).text('不可转让')
                        $(".img").eq(i).css("opacity","1")
                        $(".img img").eq(i).attr("src","./static/img/icon_biao2@2x.png")
                        $(".img span").eq(i).text('火爆产品')
                        $(".Slogan").eq(i).text('热销火爆 稳定收益')
                        $(".Profit2").eq(i+1).css("display",'none')
                        // $(".Profit2").eq(i).css("display",'none')
                        // $(".Profit1").eq(i).css("display",'block')
                    }else if ($(".hot").eq(i).text() == '1' && $(".Property").eq(i).text() == '18') {
                      $(".Property").eq(i).css("opacity","1")
                        $(".Property").eq(i).text('不可转让')
                      $(".img img").eq(i).attr("src","./static/img/icon_biao2@2x.png")
                      $(".Slogan").eq(i).text('热销火爆 稳定收益')
                      $(".img span").eq(i).text('热销产品')
                      $(".Profit2").eq(i+1).css("display",'none')
                      // $(".Profit2").eq(i).css("display",'none')
                      // $(".Profit1").eq(i).css("display",'block')
                    }
                    else if ($(".hot").eq(i).text() == '1' && $(".Property").eq(i).text() == '3') {
                      $(".Property").eq(i).css("opacity","1")
                        $(".Property").eq(i).text('不可转让')
                      $(".img img").eq(i).attr("src","./static/img/icon_biao2@2x.png")
                      $(".Slogan").eq(i).text('热销火爆 稳定收益')
                      $(".img span").eq(i).text('热销产品')
                      $(".Profit2").eq(i+1).css("display",'none')
                      // $(".Profit2").eq(i).css("display",'none')
                      // $(".Profit1").eq(i).css("display",'block')
                    }
                    else if ($(".hot").eq(i).text() == '1' && $(".Property").eq(i).text() == '22') {
                      $(".Property").eq(i).css("opacity","1")
                        $(".Property").eq(i).text('不可转让')
                      $(".img img").eq(i).attr("src","./static/img/icon_biao2@2x.png")
                      $(".Slogan").eq(i).text('热销火爆 稳定收益')
                      $(".img span").eq(i).text('热销产品')
                      $(".Profit2").eq(i+1).css("display",'none')
                      // $(".Profit2").eq(i).css("display",'none')
                      // $(".Profit1").eq(i).css("display",'block')
                    }
                    else if ($(".hot").eq(i).text() == '1' && $(".Property").eq(i).text() == '19') {
                      $(".Property").eq(i).css("opacity","1")
                        $(".Property").eq(i).text('可转让')
                      $(".img img").eq(i).attr("src","./static/img/icon_biao2@2x.png")
                      $(".Slogan").eq(i).text('热销火爆 稳定收益')
                      $(".img span").eq(i).text('热销产品')
                      $(".Profit2").eq(i+1).css("display",'none')
                      // $(".Profit2").eq(i).css("display",'none')
                      // $(".Profit1").eq(i).css("display",'block')
                    }
                  });
                    $(".actAnnual").each(function (s) {
                        if ($(".actAnnual").eq(s).text() == '+0%') {
                          $(".actAnnual").eq(s).css("display","none")
                        }else{
                          $(".actAnnual").eq(s).css("display","inline-block")
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
                    });
                    if (this.datalist[0].productType == '3' && this.datalist[0].isHot == '0') {
                      $(".Propagan").text('新手福利预期高收益')
                      $(".top .Profit2").css("display","none")
                    }
                    if (this.datalist[0].productType == '18' && this.datalist[0].isHot == '0') {
                      $(".Propagan").text('固定期限 省心理财')
                      $(".top .Profit2").css("display","none")
                    }
                    if (this.datalist[0].productType == '22' && this.datalist[0].isHot == '0') {
                      $(".Propagan").text('热销火爆 稳定收益')
                      $(".top .Profit2").css("display","none")
                    }
                    if (this.datalist[0].productType == '19' && this.datalist[0].isHot == '0') {
                      $(".Propagan").text('转让灵活 周转无忧')
                      $(".top .Profit1").css("display","none")
                    }
                    if (this.datalist[0].isHot == '1') {
                      $(".Propagan").text('热销火爆 稳定收益')
                      $(".top .Profit2").css("display","none")
                    };
                    if (this.datalist[0].openLimit / 10000 >= 1) {
                        $(".top .LCopenLimit").text(this.datalist[0].openLimit / 10000 +'万元')
                      }else{
                        $(".top .LCopenLimit").text(this.datalist[0].openLimit+'元')
                      }
                    for (var i = 0; i < this.datalist.length; i++) {
                      // console.log(this.datalist[i].openLimit)
                      if (this.datalist[i].openLimit / 10000 >= 1) {
                        $(".LCopenLimit").eq(i+1).text(this.datalist[i].openLimit / 10000 +'万元')
                      }else{
                        $(".LCopenLimit").eq(i+1).text(this.datalist[i].openLimit+'元')
                      }
                    }


                    // _this.datalist.each(function (i) {
                    //  console.log(this.datalist[i].openLimit)
                    // })
                    // $(".LCopenLimit").each(function (i) {
                    //     var LCopenLimit = Number($(".LCopenLimit").eq(i).text());
                    //     if (LCopenLimit != "" && LCopenLimit < 10000) {
                    //         $(".LCopenLimit").eq(i).text(LCopenLimit);
                    //         $(".danWei").eq(i).empty().append("元");
                    //         var reg = /.*\..*/;
                    //         if (reg.test(LCopenLimit) == true) {
                    //             $(".danWei").eq(i).empty().append("万元");
                    //         }
                    //     }else{
                    //         $(".LCopenLimit").eq(i).text(Number($(".LCopenLimit").eq(i).text())/10000);
                    //         $(".danWei").eq(i).empty().append("万元")
                    //     }
                    // });
                  }, 200);



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
        pro1(status,a,i){
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
              if (data.result == '200') {
                this.datalist = res.data.Product
                this.totalCount = res.data.totalCount
                if (this.datalist.length == 0) {
                  this.isshowHas = true
                  this.isshow1 = false
                }else{
                  this.isshowHas = false
                  this.isshow1 = true
                }
                console.log(this.totalCount);
                setTimeout(() => {
                  // 判断 固收 新手 转让 热销
                  $(".Property").each(function (i,n) {
                    if ($(".hot").eq(i).text() == '0'  &&  $(".Property").eq(i).text() == '18') {
                        $(".Property").eq(i).css("opacity","1")
                        $(".Property").eq(i).text('不可转让')
                        $(".img").eq(i).css("opacity","1")
                        $(".img img").eq(i).attr("src","./static/img/icon_biao4@2x.png")
                        $(".img span").eq(i).text('固收产品')
                        $(".Slogan").eq(i).text('固定期限 稳定投资')
                        // $(".Profit2").eq(i).css("display",'none')
                        // $(".Profit1").eq(i).css("display",'block')
                    }else if ($(".hot").eq(i).text() == '0'  &&  $(".Property").eq(i).text() == '3') {
                        $(".Property").eq(i).css("opacity","1")
                        $(".Property").eq(i).text('不可转让')
                        $(".img").eq(i).css("opacity","1")
                        $(".img img").eq(i).attr("src","./static/img/icon_biao1@2x.png")
                        $(".img span").eq(i).text('新手产品')
                        $(".Slogan").eq(i).text('新手产品高预期收益')
                        // $(".Profit2").eq(i).css("display",'none')
                        // $(".Profit1").eq(i).css("display",'block')
                    }else if ($(".hot").eq(i).text() == '0'  &&  $(".Property").eq(i).text() == '22') {
                        $(".Property").eq(i).css("opacity","1")
                        // $(".Property").eq(i).text('不可转让')
                        $(".img").eq(i).css("opacity","1")
                        $(".img img").eq(i).attr("src","./static/img/icon_biao2@2x.png")
                        $(".img span").eq(i).text('火爆产品')
                        $(".Slogan").eq(i).text('热销火爆 稳定收益')
                        // $(".Profit2").eq(i).css("display",'none')
                        // $(".Profit1").eq(i).css("display",'block')
                    }else if ($(".hot").eq(i).text() == '0'  &&  $(".Property").eq(i).text() == '19') {
                        $(".Property").eq(i).css("opacity","1")
                        $(".Property").eq(i).text('可转让')
                        $(".img").eq(i).css("opacity","1")
                        $(".img img").eq(i).attr("src","./static/img/icon_biao4@2x.png")
                        $(".img span").eq(i).text('转让产品')
                        $(".Slogan").eq(i).text('转让灵活 周转无忧')
                        // $(".Profit1").eq(i).css("display",'none')
                        // $(".Profit2").eq(i).css("display",'block')
                    }else if ($(".hot").eq(i).text() == '1' && $(".Property").eq(i).text() == '18') {
                      $(".Property").eq(i).css("opacity","1")
                        $(".Property").eq(i).text('不可转让')
                      $(".img img").eq(i).attr("src","./static/img/icon_biao2@2x.png")
                      $(".Slogan").eq(i).text('热销火爆 稳定收益')
                      $(".img span").eq(i).text('热销产品')
                      // $(".Profit2").eq(i).css("display",'none')
                      // $(".Profit1").eq(i).css("display",'block')
                    }
                    else if ($(".hot").eq(i).text() == '1' && $(".Property").eq(i).text() == '3') {
                      $(".Property").eq(i).css("opacity","1")
                        $(".Property").eq(i).text('不可转让')
                      $(".img img").eq(i).attr("src","./static/img/icon_biao2@2x.png")
                      $(".Slogan").eq(i).text('热销火爆 稳定收益')
                      $(".img span").eq(i).text('热销产品')
                      // $(".Profit2").eq(i).css("display",'none')
                      // $(".Profit1").eq(i).css("display",'block')
                    }
                    else if ($(".hot").eq(i).text() == '1' && $(".Property").eq(i).text() == '22') {
                      $(".Property").eq(i).css("opacity","1")
                        $(".Property").eq(i).text('不可转让')
                      $(".img img").eq(i).attr("src","./static/img/icon_biao2@2x.png")
                      $(".Slogan").eq(i).text('热销火爆 稳定收益')
                      $(".img span").eq(i).text('热销产品')
                      // $(".Profit2").eq(i).css("display",'none')
                      // $(".Profit1").eq(i).css("display",'block')
                    }
                    else if ($(".hot").eq(i).text() == '1' && $(".Property").eq(i).text() == '19') {
                      $(".Property").eq(i).css("opacity","1")
                        $(".Property").eq(i).text('可转让')
                      $(".img img").eq(i).attr("src","./static/img/icon_biao2@2x.png")
                      $(".Slogan").eq(i).text('热销火爆 稳定收益')
                      $(".img span").eq(i).text('热销产品')
                      // $(".Profit2").eq(i).css("display",'none')
                      // $(".Profit1").eq(i).css("display",'block')
                    }
                  });
                    $(".actAnnual").each(function (s) {
                        if ($(".actAnnual").eq(s).text() == '+0%') {
                          $(".actAnnual").eq(s).css("display","none")
                        }else{
                          $(".actAnnual").eq(s).css("display","inline-block")
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
                    });
                    if (this.datalist[0].productType == '3' && this.datalist[0].isHot == '0') {
                      $(".Propagan").text('新手福利预期高收益')
                    }
                    if (this.datalist[0].productType == '18' && this.datalist[0].isHot == '0') {
                      $(".Propagan").text('固定期限 省心理财')
                    }
                    if (this.datalist[0].productType == '22' && this.datalist[0].isHot == '0') {
                      $(".Propagan").text('固定期限 省心理财')
                    }
                    if (this.datalist[0].productType == '19' && this.datalist[0].isHot == '0') {
                      $(".Propagan").text('转让灵活 周转无忧')
                    }
                    if (this.datalist[0].isHot == '1') {
                      $(".Propagan").text('热销火爆 稳定收益')
                    };

                    for (var i = 0; i < this.datalist.length; i++) {
                      // console.log(this.datalist[i].openLimit)
                      if (this.datalist[i].openLimit / 10000 >= 1) {
                        $(".LCopenLimit").eq(i).text(this.datalist[i].openLimit / 10000 +'万元')
                      }else{
                        $(".LCopenLimit").eq(i).text(this.datalist[i].openLimit+'元')
                      }
                    }
                  }, 500);

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
        token(){
            if (!sessionStorage.token) {
              this.$vux.alert.show({
                  title: '',
                  content: '请登录'
              })
              setTimeout(() => {
                  this.$vux.alert.hide()
                  this.$router.push({path:"/login",query: {redirect: 'your path'}})
              }, 2000)
            }
        },
        menu() {
          this.scroll = document.body.scrollTop;
          console.log(this.scroll)
         }
    },
    watch: {
      '$route' (to, from) {
          this.$router.go(0);
        //   window.location.reload()
      }
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
    .nodata{
        text-align: center;padding-bottom: 13rem;min-height:14rem;
        img{margin-top: 6rem;width: 4.2rem;height: 4.5rem;}
        p{font-size: 0.8rem;color: #999;line-height:1rem;margin-top: 0.5rem;}
        .button{width: 10rem;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);border: 0;border-radius: 30px;line-height: 2.2rem;height: 2.2rem;color: #fff;font-size: 0.9rem;margin-top: 1.2rem;}
        .note{margin-top: 40rem;}
    }
    .Conduct{
        height: auto;
        &:after{
            content: "";
            display: block;
            clear: both;
        }
        .top{
          border-bottom: 1px solid #eee;background: #fff;width: 94%;margin-left: 3%;margin-top: 3%;padding: 1rem 0;position: relative;text-align: center;
          h5{
              font-size: 0.9rem;font-weight: normal;text-align: center;line-height: 30px;border-bottom: 0;
              span{font-size: 0.7rem;border-left: 1px solid #eee;padding: 0 1rem;margin-left: 1rem;color: #999;}
            }
          p{
            text-align: center;font-size: 0.8rem;line-height: 30px;color: #999;
            b{font-weight: normal;font-size: 0.9rem;color: #333}
          }
          .Property{position: absolute;opacity:1}
          .Profit{font-size:3rem;color: #FFA303;font-weight: 600;margin-top: 1rem;margin-bottom: 1rem;}
          .button{display: inline-block;width: 80%;line-height: 40px;height: 40px;border: 0;border-radius: 30px;background: #2773FF;color: #fff;margin-top: 10px;margin-left: 10%;}
        }
        .middle{padding-bottom: 3rem;
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
                        float: right;display: inline-block;width: 5rem;height:1.8rem;color: #fff;text-align: center;line-height:1.8rem;font-size: 0.6rem;position: absolute;opacity: 1;right: 0;
                        img{width: 5rem;height: 1.8rem;position: absolute;top: 0;left: 0;}
                        span{position: absolute;z-index: 11;color: #fff;left: 1rem;}
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
                    .Profit1{display:block;}
                    .Profit2{display:block;}
                }
                .right{
                    display: inline-block;width: 48%;margin-top: 1rem;
                    .day{
                        font-size: 0.6rem;
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
    .Transfer{
      .middle{padding-bottom: 3rem;
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
        }
        .note{text-align: center;padding: 1rem 5rem;font-size: 0.5rem;color: #999;}
      }
    }
}
</style>
