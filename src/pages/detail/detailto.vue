<template>
    <div class="detail page">
        <div class="product">
            <top v-bind:title="title"></top>
            <p class="proict">
                <span>预期年化收益率</span>
                <span><b>8.0</b>%</span>
            </p>
            <p class="left">
                <span>剩余期限(天)</span>
                <b>180</b>
            </p>
            <p class="right">
                <span>标的金额(元)</span>
                <b>10,000.00</b>
            </p>
        </div>
        <div class="middle">
            <!-- 项目介绍 -->
            <ul class="list">
                <li >预计到期收益 <span class="c-FFA303">42.65元</span></li>
                <li >预计到期日 <span class="c-2B9AFF">2017.12.30</span></li>
                <li >收益方式 <span>到期还本付息</span></li>
                <li >转让日期 <span>2017.12.12</span></li>
                <li >转让人 <span>江苏  李先生</span></li>
            </ul>
        </div>
        <p class="note">投资182天  预计收益<span class="c-FFA303">42.65元</span></p>
        <p class="note" style="font-size: 0.7rem">收益说明：本产品为用户转让产品，投资成功后即起息，产品到期还本付息，实际收益按照剩余持有天数计算</p>
        <p class="Pro">项目介绍<img src="~@/assets/img/right.png"></p>
        <button class="button" @click="tost">立即投资</button>
    </div>
</template>

<script>
import { PopupPicker, Tab, TabItem, Swiper,XCircle, SwiperItem,Qrcode, Divider,XDialog, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData,TransferDomDirective as TransferDom } from 'vux'
import { mapState, mapMutations, mapGetters } from 'vuex'
import * as myPub from '@/assets/js/public.js'
import top from '../../components/common/top1'
import $ from 'jquery'
export default {
    name: 'detail',
    directives: {
        TransferDom
    },
    data() {
        return {
            product: null,
            money:'1000',
            title:'启航新手礼',
            isshow:false,
            percent: 0,
            time:6
        }
    },
    computed: {
    },
    mounted () {
    },
    created() {
    },
    activated() {
    },
    methods: {
        linkTodetail1() {
            this.$router.push({ path: '/page/detailProduct' })
        },
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
    }
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/center.less';
@import '~vux/src/styles/close.less';
.detail {
    background: #f7f7f7;position: relative;
    .product{
        background: url(~@/assets/img/bg.png);color: #fefefe;padding-bottom: 1rem;
        .proict{
            text-align: center;padding: 1rem 2rem;
            span{
                font-size: 0.6rem;display: inline-block;width: 100%;
            }
            b{font-size: 2rem;font-weight: normal;}
        }
        .left{
            display: inline-block;width: 49%;position: relative;text-align: center;font-size: 0.6rem;
            b{font-size: 1rem;font-weight: normal;display: block;}
        }
        .left:after{position: absolute;content: '';height: 60%;top: 20%;width: 1px;background: #fefefe;right: 0;}
        .right{
            display: inline-block;width: 49%;text-align: center;font-size: 0.6rem;
            b{font-size: 1rem;font-weight: normal;display: block;}
        }
    }
    .middle{
        padding: 0 0.5rem;
        .list{
            margin-top: 0.5rem;background: #fff;border-radius: 3px;padding: 0.5rem;color: #333;
            li{
                list-style: none;font-size: 0.8rem;border-bottom: 1px solid #eee;padding: 0.5rem;color: #666;
                span{float: right;}
            }
            li:last-child{border-bottom: 0;}
        }
    }
    .note{font-size: 0.8rem;color: #999;padding: 0.5rem;}
    .c-FFA303{color: #FFA303}
    .c-2B9AFF{color: #2B9AFF}
    .Pro{
        background: #fff;font-size: 0.8rem;line-height: 2.5rem;padding: 0 .8rem;margin-top: 0.5rem;
        img{float: right;width: 0.4rem;height: 0.7rem;position: relative;top: 1rem;}
    }
    .button{border: 0;width: 90%;margin-left: 5%;margin-top: 1rem;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);height: 40px;text-align: center;color: #fff;font-size: 0.9rem;border-radius: 30px;}
}
</style>
