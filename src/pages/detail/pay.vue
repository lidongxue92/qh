<template>
    <div class="detail">
        <top v-bind:title="title"></top>
        <div class="middle">
            <ul class="list">
                <li>产品名称<span>启航新手礼</span></li>
                <li>订单号 <span>1220145202</span></li>
                <li>应付金额 <span>1000.00元</span></li>
                <li>抵扣金额 <span class="c-FFA303">-100.00元</span></li>
                <li>加息利率<span class="c-FFA303">0.5%</span></li>
                <li>实际支付金额 <span class="c-FFA303">900.00元</span></li>
            </ul>
        </div>
        <button class="button">确认支付</button>
    </div>
</template>

<script>
import { PopupPicker, Tab, TabItem, Swiper, SwiperItem,Qrcode, Divider,XDialog, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData,TransferDomDirective as TransferDom } from 'vux'
import { mapState, mapMutations, mapGetters } from 'vuex'
import * as myPub from '@/assets/js/public.js'
import $ from 'jquery'
import top from '../../components/common/top1'
export default {
    name: 'detail',
    directives: {
        TransferDom
    },
    data() {
        return {
            product: null,
            money:'1000',
            title:'确认支付'
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
        linkTodetail1() {
            this.$router.push({ path: '/page/detail1' })
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
        top
    }
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/center.less';
@import '~vux/src/styles/close.less';
.detail {
    background: #f7f7f7;
    .middle{
        .list{
            margin-top: 0.5rem;background: #fff;border-radius: 3px;padding: 0.5rem 0.6rem;color: #333;border-radius: 5px;
            li{
                list-style: none;font-size: 0.8rem;padding: 0.6rem 0;color: #666;
                span{float: right;color: #333}
                .c-FFA303{color: #FFA303}
            }
        }
    }
    .button{border: 0;width: 90%;margin-left: 5%;margin-top: 1rem;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);height: 40px;text-align: center;color: #fff;font-size: 0.9rem;border-radius: 30px;position: fixed;bottom: 2rem;}
}
</style>
