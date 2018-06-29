<template>
    <div class="detail page">
        <div class="product">
            <top v-bind:title="title"></top>
            <div class="left">
                <span class="interest">{{product.baseAnnualYield}}<b>&ensp;%</b></span>
                <span class="rate">预计年化收益率</span>
            </div>
            <div class="right">
                <p>理财期限&emsp;<span>{{product.period}}</span></p>
                <p>开发额度&emsp;<span>{{product.openLimit}}</span></p>
                <span class="status">{{product.productType}}</span>
            </div>
            <p class="line"></p>&emsp;<span class="Percentage">已售{{product.xmjd}}</span>
            <p class="note">
                <span class="left1">剩余额度&emsp;<b>{{product.residueMoney}}</b></span>
                <span class="right1">起投金额&emsp;<b>{{product.amountMin}}</b></span>
            </p>
        </div>
        <div class="middle">
            <!-- 购买金额 -->
            <div class="Amount">
                <h5>购买金额</h5>
                <p>
                    <img class="leftimg" src="~@/assets/img/cont.png" @click="cont">
                    <input class="money" v-model= "money" @blur="red"/>元
                    <img class="rightimg" src="~@/assets/img/add.png" @click="add">
                </p>
                <p class="word" @click="red">
                    <span class="fl">红包卡券</span><span class="fr">{{free.totalCount}}个可用&emsp;<img src="~@/assets/img/right.png"></span>
                </p>
                <p class="word">
                    <span class="fl">预期收益</span><span class="fr c-FFA303"><b>20</b>&ensp;元</span>
                </p>
                <p class="bottomimg" v-if="isshow4">
                    <span class="fl">
                        起息日
                        <b>{{product.qxr}}</b>
                    </span>
                    <span>
                        到期日
                        <b>{{product.dqr}}</b>
                    </span>
                    <span class="fr">
                        到帐日
                        <b>{{dz}}</b>
                    </span>
                </p>
                <p v-if="isshow3" class="full"><img src="~@/assets/img/clock.png">&emsp;满标计息</p>
            </div>
            <!-- 项目介绍 -->
            <ul class="list">
                <li @click="linkTodetail1(product.productId)">项目介绍 <img src="~@/assets/img/right.png"></li>
                <li @click="log(product.productId)">投资记录 <img src="~@/assets/img/right.png"></li>
            </ul>
        </div>
        <button class="button" @click="tost">立即投资</button>
        <div class="tost" v-if="isshow">
            <div class="vux-circle-demo" style="margin-top: 9rem;margin-left: 7rem;">
                <div style='width: 9.9rem;height:9.9rem;'>
                  <x-circle
                    :percent="percent"
                    :stroke-width="4"
                    :trail-width="1"
                    :stroke-color="['#36D1DC', '#5B86E5']"
                    trail-color="#ececec">
                    <span style="color:#2395FF;font-size: 2.3rem;">00.0{{time}}</span>
                  </x-circle>
                </div>
              </div>
              <button class="button bottom">确认支付</button>
        </div>
    </div>
</template>

<script>
import { PopupPicker, Tab, TabItem, Swiper,XCircle, SwiperItem,Qrcode, Divider,XDialog, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData,TransferDomDirective as TransferDom } from 'vux'
import { mapState, mapMutations, mapGetters } from 'vuex'
import top from '../../components/common/top1'
import * as myPub from '@/assets/js/public.js'
import axios from 'axios'
import $ from 'jquery'
export default {
    name: 'detail',
    directives: {
        TransferDom
    },
    data() {
        return {
            product: '',
            money:'',
            Money:'',
            title:'启航新手礼',
            isshow:false,
            isshow3:false,
            isshow4:true,
            percent: 0,
            time:6,
            id:'',
            day:'',
            free:'',
            dz:''
        }
    },
    computed: {
    },
    mounted () {
        this.productdata()
    },
    created() {
        const dz = this.$route.query.dz
        this.dz = dz
        console.log(this.dz)
    },
    activated: function() {
        this.productdata()
        setTimeout(() => {
            this.welfare()
        }, 300)
    },
    methods: {
        linkTodetail1(id) {
            this.$router.push({ path: '/page/detailProduct',query: { id: id } })
        },
        log(id) {
            this.$router.push({ path: '/page/log',query: { id: id } })
        },
        red() {
            this.$router.push({ path: '/page/red' })
        },
        add(){
            const _this = this
            const num = $(".money")
            const value = num.val()
            this.money = (parseFloat(this.money)+parseFloat(this.Money))+'.00'
            console.log (this.money)
            $(".leftimg").attr('src',"~@/assets/img/add1.png")
            this.welfare()
        },
        cont(){
            const _this = this
            const num = $(".money")
            const value = num.val()
            if (value>parseFloat(this.Money)) {
                this.money = (parseFloat(this.money)-parseFloat(this.Money))+'.00'
                console.log (this.money+'00')
                this.welfare()
            }else{
                $(".leftimg").attr('src',"~@/assets/img/cont.png")
            }
        },
        timer() {
          const _this =this
          if (_this.time > 0) {
              _this.time--
              setTimeout(_this.timer, 1000)
              _this.percent = parseFloat(_this.percent)+17
              console.log()
          }else{
            this.isshow = false
            const id = this.id
            const money = this.money
            this.$router.push({ path: '/page/pay' ,query: { id: id, money: money }})
            _this.time = '6'
            _this.percent = '0'
          }
      },
      tost(){
        this.isshow = true
        this.timer()
      },
      // 产品数据
      productdata(){
          const _this = this
          _this.$loading.show();
          const id = this.$route.query.id
          const url = myPub.URL+`/product/getProductDetail` ;
          const params = new URLSearchParams();
          params.append('productId',id);
          params.append('token',sessionStorage.token); 
          axios.post(url,params).then(response => {
            _this.$loading.hide();
            const data = response.data
            console.log(data)
            if (data.result == '400') {
                this.$vux.alert.show({
                    title: '',
                    content: data.resultMsg
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    this.$router.push({path:"/login"})
                }, 3000)
            }
            if (data.result == '200') {
                this.product = data.ProductInfo
                this.title = data.ProductInfo.productName
                this.money = data.ProductInfo.amountMin
                this.Money = data.ProductInfo.amountMin
                this.id = data.ProductInfo.productId
                this.day = data.ProductInfo.period
                if (this.product.productType == '19') {
                    $(".status").text("可转让")
                }
                if (this.product.productType == '22') {
                    $(".status").text("不可转让")
                }
                if (this.product.productType == '3') {
                    $(".status").text("不可转让")
                }
                if (this.product.productType == '18') {
                    $(".status").text("不可转让")
                }
            }
          }).catch((err) => {
            console.log(err)
          })
        },
        // 红包福利
        welfare(){
            const url = myPub.URL+`/welfare/getAvailableWelfareCount`;
            const id = this.id
            const orderMoney = this.money
            const proPeriod = this.day
            var params = new URLSearchParams();
            params.append('token',sessionStorage.getItem("token"));
            params.append('proPeriod',id);
            params.append('transMoney',orderMoney);
            params.append('type','1');
            axios.post(url,params).then(res => {
                console.log(res.data)
                const data = res.data
                this.free= data
            }).catch((err) => {
                console.log(err);
            });
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
        top,
        XCircle
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        }//回退上一级页面并刷新
    },
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/center.less';
@import '~vux/src/styles/close.less';
.detail {
    background: #f7f7f7;position: relative;height: 100%;
    .product{
        background: url(~@/assets/img/bg.png);color: #fefefe;
        h5{text-align: center;font-size: 1rem;line-height:2.5rem;font-weight: normal;margin-bottom: 1rem;}
        .left{
            display: inline-block;width: 39%;text-align: center;position: relative;padding: 0 5%;text-align: right;
            .interest{
                font-size: 3rem;color: #fff;text-align: center;margin: 0;padding: 0;display: inline-block;position: relative;width: 100%;text-align: right;
                b{font-weight: normal;position: relative;bottom: 0rem;font-size: 0.8rem;}
            }
            .rate{text-align: center;font-size: 0.5rem;position:relative;top: -0.7rem;color: #7AAFFB}
        }
        .left:after{position: absolute;content: '';height: 70%;width: 1px;background: #7AAFFB;right: 0;top: 15%;}
        .right{
            display: inline-block;width: 39%;padding: 0 5%;position: relative;bottom: 1rem;
            p{
                font-size: 0.6rem;color: #7AAFFB;line-height: 1.5rem;
                span{font-size: 0.8rem;color: #fff}
            }
            .status{display: inline-block;border-radius: 30px;border: 1px solid #eee;font-size: 0.5rem;padding: 0rem 0.5rem;}
        }
        .line{width: 55%;position: relative;margin-left: 15%;margin-top: 1rem;font-size: 0.6rem;display: inline-block;}
        .Percentage{font-size: 0.6rem;display: inline-block;position: relative;top: 0.2rem;}
        .line:before{height: 0.1rem;width: 100%;background:#7AAFFB;position: absolute;left: 0;top: 0;content:'';}
        .line:after{content: '';position: absolute;width: 50%;left: 0;top: 0;height: 0.1rem;background: #fefefe}
        .note{
            background: #3F93FF;height:2.2rem;margin-top: 1rem;padding: 0 1rem;
            .left1{
                text-align: left;line-height: 2.2rem;font-size: 0.6rem;color:#7AAFFB;float: left;
                b{font-size: 0.8rem;color: #fefefe;font-weight: normal;}
            }
            .right1{
                text-align: left;line-height: 2.2rem;font-size: 0.6rem;color:#7AAFFB;float: right;
                b{font-size: 0.8rem;color: #fefefe;font-weight: normal;}
            }
        }
    }
    .middle{
        padding: 0 0.5rem;
        .Amount{
            margin-top: 0.5rem;background: #fff;border-radius: 3px;padding: 0.5rem;color: #333;
            h5{font-size: 0.8rem;font-weight: normal;}
            p{
                padding:1rem;text-align: center;font-size: 0.6rem;
                .leftimg{width: 2.4rem;height: 2.4rem;float: left;}
                input{border: 0;text-align: center;font-size: 1.1rem;width: 20%;margin-top: 0.8rem;}
                .rightimg{width: 2.4rem;height: 2.4rem;float: right;}
            }
            .word{
                border-top: 1px solid #eee;flex: 1;padding:1rem 0 2rem 0;
                .fl{float: left;font-size: 0.8rem;}
                .fr{
                    float: right;color: #999;font-size:0.7rem;
                    img{width: 0.4rem;height: 0.7rem;}
                    b{font-size: 1.25rem;font-weight: normal;color: #FFA303}
                }
                .c-FFA303{color: #FFA303;position: relative;bottom: 0.3rem;}
            }
            .bottomimg{
                background: url(~@/assets/img/bottom.png);background-size: 100%;background-repeat: no-repeat;background-position: bottom;padding: 1rem 0;font-size: 0.6rem;border-top: 1px solid #eee;
                span{
                    display: inline-block;
                    b{display: block;font-weight: normal;font-size: 0.5rem;color: #999;}
                }
                .fl{float: left;text-align: left;}
                .fr{float: right;text-align: right;}
            }
            .full{
                text-align: left;border-top: 1px solid #eee;
                img{float: left;width: 1.4rem;height: 1.4rem;}
            }
        }
        .list{
            margin-top: 0.5rem;background: #fff;border-radius: 3px;padding: 0.5rem;color: #333;
            li{
                list-style: none;font-size: 0.8rem;border-bottom: 1px solid #eee;padding: 0.5rem 0;
                img{float: right;width: 0.4rem;height: 0.7rem;position: relative;top: 0.1rem;}
            }
            li:last-child{border-bottom: 0;}
        }
    }
    .button{border: 0;width: 90%;margin-left: 5%;margin-top: 1rem;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);height: 40px;text-align: center;color: #fff;font-size: 0.9rem;border-radius: 30px;}
    .tost{
        position: absolute;width: 100%;height: 100%;z-index: 11;background: #f6f6f6;top: 0;text-align: center;
        .bottom{background: #80BFFF;position: fixed;bottom:2rem;left: 0;}
    }
}
</style>
