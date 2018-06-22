<template>
    <div class="goods">
        <ul class="tab">
            <li class="Conducttab active" @click="Conducttab">理财专区</li>
            <li class="Transfertab" @click="Transfertab">转让专区</li>
        </ul>
        <!-- 理财专区 -->
        <div class="Conduct" v-if='isshow'>
            <div class="top" v-for="(item,index) in datalist" v-if="index == 0">
                <h5>{{item.Title}}<span>{{item.Data}}</span></h5>
                <p class="Profit">{{item.Profit}}</p>
                <p><span>剩余金额 &emsp; <b>{{item.Quota}}</b></span>&emsp; | &emsp;<span>理财期限  &emsp; <b>{{item.Day}}</b> </span></p>
                <button class="button">立即投资</button>
            </div>
            <div class="middle">
             <ul class="productlist">
                  <li v-for="(item,index) in datalist" @click="linktoDetail()">
                      <h5>{{item.Title}} <span>{{item.Data}}</span><p class="img img1">新人专享</p></h5>
                      <div>
                          <p class="left">
                              <span class="Profit">{{item.Profit}}<b v-if="isshow2">{{item.profit}}</b></span>
                              <span>历史年化收益率</span>
                          </p>
                          <p class="right">
                              <span class="day"><b>{{item.Day}}</b> 个月</span><span class="status">可加入</span>
                              <span class="Quota">剩余金额 <b>{{item.Quota}}</b></span>
                          </p>
                      </div>
                  </li>
             </ul>
             <p class="note">理财有风险投资需谨慎 </p>
         </div>
        </div>
        <!-- 转让专区 -->
        <div class="Transfer" v-if='isshow1'>
            <div class="middle">
             <ul class="productlist">
                  <li v-for="(item,index) in datalist" @click="linktoDetailto()">
                      <h5>{{item.Title}} <span>{{item.Data}}</span><p class="img img1">新人专享</p></h5>
                      <div>
                          <p class="left">
                              <span class="Profit">{{item.Profit}}<b v-if="isshow2">{{item.profit}}</b></span>
                              <span>历史年化收益率</span>
                          </p>
                          <p class="right">
                              <span class="day"><b>{{item.Day}}</b> 个月</span><span class="status">可加入</span>
                              <span class="Quota">剩余金额 <b>{{item.Quota}}</b></span>
                          </p>
                      </div>
                  </li>
             </ul>
             <p class="note">理财有风险投资需谨慎 </p>
         </div>
        </div>
    </div>
</template>

<script>
import { XInput, Group, XButton, Cell, Toast, base64 } from 'vux'
import axios from 'axios'
import $ from 'jquery'
import Vue from 'vue'
export default {
    name: 'category',
    data(){
　　　　　　return {
　　　　　　　　datalist:[
                    {Title:'热卖产品',Data:'新手福利高预期收益',Label:'热卖',Profit:'12%',Day:'15天',Quota:'1000'},
                    {Title:'火爆产品',Data:'',Label:'',Profit:'10%',Day:'30天',Quota:'3000',profit:'+.5%'}
                ],
                isshow1:false,
                isshow:true,
                isshow2:true
　　　　　　}
　　　　},
    created() {
    },
    computed: {
    },
    methods: {
      // 跳转详情页
        linktoDetail() {
            this.$router.push({ path: '/page/detail'})
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
            _this.$loading.show();//显示
            setTimeout(function(){  //模拟请求
                  _this.$loading.hide(); //隐藏
            },2000)
        },
        // 转让专区
        Transfertab(){
            const _this = this
            _this.isshow = false
            _this.isshow1 = true 
            $(".Transfertab").addClass('active')
            $(".Conducttab").removeClass('active')
            _this.$loading.show();//显示
            setTimeout(function(){  //模拟请求
                  _this.$loading.hide(); //隐藏
            },2000)
        }
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
              background: #fff;margin-top: 10px;padding:1rem;
              h5{
                  border-bottom: 1px solid #eee;font-weight: normal;font-size: 0.8rem;height: 2.2rem;
                  span{color: #999;margin-left: 10px;font-size: 0.6rem;}
                  .img{
                      float: right;display: inline-block;width: 5rem;height:1.8rem;color: #fff;text-align: center;line-height:1.8rem;font-size: 0.6rem;
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
                  .status{color: #FFA303;font-size: 0.6rem;padding:0 0.8rem;}
                  .Quota{
                      display: inline-block;width: 100%;font-size: 0.6rem;padding: 0 0.8rem;color: #999;
                      b{font-weight: normal;color: #333;font-size: 0.9rem;}
                  }
              }
          }
      }
      .note{text-align: center;padding: 1rem 5rem;font-size: 0.5rem;color: #999;}
    }
}
</style>
