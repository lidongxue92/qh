<template>
    <div class="detail page">
        <div class="product">
         <h5>产品名称</h5>
            <div class="left">
                <span class="interest">10<b>&ensp;%</b></span>
                <span class="rate">预计年化收益率</span>
            </div>
            <div class="right">
                <p>理财期限&emsp;<span>1个月</span></p>
                <p>开发额度&emsp;<span>100万</span></p>
                <span class="status">可转让</span>
            </div>
            <p class="line"></p>&emsp;<span class="Percentage">已售64%</span>
            <p class="note">
                <span class="left1">剩余额度&emsp;<b>100万</b></span>
                <span class="right1">起投金额&emsp;<b>100元</b></span>
            </p>
        </div>
        <!-- 购买金额 -->
        <div class="Amount">
            <h5>购买金额</h5>
            <p>
                <img class="leftimg" src="~@/assets/img/cont.png" @click="cont">
                <input class="money" v-model="money"/>元
                <img class="rightimg" src="~@/assets/img/add.png" @click="add">
            </p>
            <p class="word">
                <span class="fl">红包卡券</span><span class="fr">0个可用&emsp;<img src="~@/assets/img/right.png"></span>
            </p>
            <p class="word">
            <span class="fl">预期收益</span><span class="fr c-FFA303"><b>20</b>&ensp;元</span>
            </p>
        </div>
    </div>
</template>

<script>
import { PopupPicker, Tab, TabItem, Swiper, SwiperItem,Qrcode, Divider,XDialog, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData,TransferDomDirective as TransferDom } from 'vux'
import { mapState, mapMutations, mapGetters } from 'vuex'
import * as myPub from '@/assets/js/public.js'
import $ from 'jquery'
export default {
    name: 'detail',
    directives: {
        TransferDom
    },
    data() {
        return {
            product: null,
            money:'1000'
        }
    },
    computed: {
    },
    mounted () {
    },
    created() {},
    activated() {
        // this.getALLProducts()
    },
    methods: {
        linkToCart() {
            this.$router.push({ path: '/page/cart' })
        },
        add(){
            const _this = this
            const num = $(".money")
            const value = num.val()
            this.money = parseFloat(this.money)+1000
            console.log (this.money)
        },
        cont(){
            const _this = this
            const num = $(".money")
            const value = num.val()
            if (value>'1000') {
                this.money = parseFloat(this.money)-1000
                console.log (this.money)
            }
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
        XButton
    }
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/center.less';
@import '~vux/src/styles/close.less';
.detail {
    background: #f7f7f7;
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
    .Amount{
        margin-top: 0.5rem;background: #fff;border-radius: 3px;width: 94%;margin-left: 3%;padding: 0.5rem;color: #333;
        h5{font-size: 0.8rem;font-weight: normal;}
        p{
            padding:1rem;text-align: center;font-size: 0.6rem;
            .leftimg{width: 2.4rem;height: 2.4rem;float: left;}
            input{border: 0;text-align: center;font-size: 1.1rem;width: 15%;margin-top: 0.8rem;}
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
            .c-FFA303{color: #FFA303}
        }
    }
}
</style>
