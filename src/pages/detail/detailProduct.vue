<template>
    <div class="detail page">
        <div class="middle">
            <!-- 产品介绍 -->
            <div class="product">
                <h5>产品介绍</h5>
                <p>本标的为个人资金周转借款，借款人以车辆为抵押物。投资人通过道道金控投资此标获得对应收益。每个借款人经过微贷实体门店风控人员多层严格筛选。通过车辆抵质押保障还款来源，稳健可靠。</p>
            </div>
            <ul class="list">
                <li>项目介绍 <img src="~@/assets/img/right.png"></li>
                <li>投资记录 <img src="~@/assets/img/right.png"></li>
            </ul>
        </div>
        <button class="button">立即投资</button>
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
        XButton
    }
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/center.less';
@import '~vux/src/styles/close.less';
.detail {
    background: #f7f7f7;
    .middle{
        padding: 0 0.5rem;
        .product{background: #FFF;border-radius: 3px;padding: 0.5rem;}
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
}
</style>
