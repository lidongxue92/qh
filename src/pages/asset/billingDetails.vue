<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <span class="right_title" @click="rightTitle">筛选</span>
        <div class="middle">
            <ul class="list">
                <li >
                    <span>类型</span>
                    <span>金额(元)</span>
                    <span>时间</span>
                    <span>状态</span>
                </li>
                <li class="li" v-for="(item,index) in Product" :key="index">
                    <span>{{item.tradeTypeName}}</span>
                    <span>{{item.tradeMoney}}</span>
                    <span>{{item.tradeTime.split(" ")[0]}}</span>
                    <span class="tradeStatus">{{item.tradeStatus}}</span>
                </li>
            </ul>
        </div>
        <div class="bg"></div>
        <div class="toast">
            <ul>
                <li class="active" @click="all">全部</li>
                <li @click="Recharge">充值</li>
                <li @click="Put">提现</li>
                <li @click="all">投资</li>
                <li @click="Investment">兑付</li>
                <li @click="Increase">加息兑付</li>
                <li @click="Transfer">转让到账</li>
                <li @click="Service">手续费</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { PopupPicker, Tab, TabItem, Swiper, SwiperItem,Qrcode, Divider,XDialog, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData,TransferDomDirective as TransferDom } from 'vux'
import { mapState, mapMutations, mapGetters } from 'vuex'
import * as myPub from '@/assets/js/public.js'
import axios from 'axios'
import $ from 'jquery'
import top from '../../components/common/top1'
export default {
    name: 'detail',
    directives: {
        TransferDom
    },
    data() {
        return {
            Product: '',
            money:'1000',
            title:'账单'
        }
    },
    computed: {
    },
    mounted () {
    },
    created() {},
    activated() {
        this.product('')
    },
    methods: {
        linkTodetail1() {
            this.$router.push({ path: '/page/detail1' })
        },
        rightTitle(){
            $(".bg").css('display','block')
            $(".toast").css('display','block')
        },
        // 全部
        all(){
            $(".bg").css('display','none')
            $(".toast").css('display','none')
            this.product('')
        },
        // 充值
        Recharge(){
            $(".bg").css('display','none')
            $(".toast").css('display','none')
            this.product('2')
        },
        // 提现
        Put(){
            $(".bg").css('display','none')
            $(".toast").css('display','none')
            this.product('3')
        },
        // 兑付
        Investment(){
            $(".bg").css('display','none')
            $(".toast").css('display','none')
            this.product('4')
        },
        // 加息兑付
        Increase(){
            $(".bg").css('display','none')
            $(".toast").css('display','none')
            this.product('5')
        },
        // 转让到账
        Transfer(){
            $(".bg").css('display','none')
            $(".toast").css('display','none')
            this.product('6')
        },
        // 手续费
        Service(){
            $(".bg").css('display','none')
            $(".toast").css('display','none')
            this.product('7')
        },
        product(status){
            const _this = this
          _this.$loading.show();
          const url = myPub.URL+`/user/getMyTradeRecords` ;
          const params = new URLSearchParams();
          params.append('curPage','1');
          params.append('pageSize','10');
          params.append('token',sessionStorage.token);
          params.append('tranType',status);
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
                this.Product = data.Trade
                setTimeout(() => {
                $(".tradeStatus").each(function (i,n) {
                    if ($(".tradeStatus").eq(i).text() == '-1') {
                        $(".tradeStatus").eq(i).css({"opacity":"1"})
                        $(".tradeStatus").eq(i).text('待支付')
                    }
                    if ($(".tradeStatus").eq(i).text() == '0') {
                        $(".tradeStatus").eq(i).css({"opacity":"1",'color':'#999'})
                        $(".tradeStatus").eq(i).text('失败')
                    }
                    if ($(".tradeStatus").eq(i).text() == '1') {
                        $(".tradeStatus").eq(i).css({"opacity":"1",'color':'#FFA303'})
                        $(".tradeStatus").eq(i).text('成功')
                    }
                    if ($(".tradeStatus").eq(i).text() == '2') {
                        $(".tradeStatus").eq(i).css({"opacity":"1",'color':'#999'})
                        $(".tradeStatus").eq(i).text('放款失败')
                    }
                })
            }, 300)
              }

          }).catch((err) => {
              console.log(err)
          })
        }
    },
    components: {
        PopupPicker,
        Tab,
        TabItem,
        Swiper,
        SwiperItem,
        Qrcode,
        Divider,
        XDialog,
        Popup,
        Group,
        XSwitch,
        Popup,
        Group,
        Cell,
        XSwitch,
        Toast,
        XAddress,
        XButton,
        top
    }
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/center.less';
@import '~vux/src/styles/close.less';
.detail {
    background: #f7f7f7;height:100%;position: relative;
    .middle{
        margin-top: 1rem;
        .list{
            li{
                text-align: center;line-height: 2.5rem;background: #fff;border-top: 1px solid #eee;
                span{display: inline-block;width: 24%;font-size: 0.8rem;color: #666}
                .tradeStatus{opacity: 0}
            }
            li:first-child{background: #eee;border-top: 0;}
            @media screen and (max-width: 320px) {
                li{
                    span{width: 23%}
                }
            }
        }
    }
    .right_title{position: absolute;top: 0.8rem;right: 0.8rem;color: #fff;font-size: 0.8rem;}
    .bg{position: absolute;background: rgba(0,0,0,.5);left: 0;top: 0;width: 100%;height: 100%;display: none;}
    .toast{
        background: #fff;position: absolute;top: 2.8rem;left: 0;padding: 1rem;display: none;
        li{display: inline-block;width: 4.2rem;margin-right: 1rem;border: 1px solid #333;color: #333;font-size: 0.7rem;text-align: center;line-height: 2rem;height: 2rem;border-radius: 30px;margin-top: 0.8rem;}
        .active{color: #fff;border: 1px solid #fff;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF) }
        li:nth-child(4n){margin-right: 0;}
        @media screen and (max-width: 320px) {
            li{
                width: 3.7rem;margin-right: 0.5rem;
            }
        }
    }
}
</style>
