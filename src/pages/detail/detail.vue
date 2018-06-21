<template>
    <div class="detail page">
        <h5>产品名称</h5>
        <div class="product">
            <div class="left">
                <p>10%+5%</p>
                <span>预计年化收益率</span>
            </div>
            <div class="right">
                <p>理财期限</p>
                <p>可转让</p>
                <p>募集期</p>
                <p>起投金额</p>
                <p>开发额度</p>
                <p>剩余额度</p>
            </div>
        </div>
        <!-- 购买金额 -->
        <div>
            <p>购买金额</p>
        </div>
    </div>
</template>

<script>
import { PopupPicker, Tab, TabItem, Swiper, SwiperItem,Qrcode, Divider,XDialog, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData,TransferDomDirective as TransferDom } from 'vux'
import { mapState, mapMutations, mapGetters } from 'vuex'
import * as myPub from '@/assets/js/public.js'
export default {
    name: 'detail',
    directives: {
        TransferDom
    },
    data() {
        return {
            product: null,
        }
    },
    computed: {
    },
    mounted () {
    },
    created() {},
    activated() {
        this.getALLProducts()
    },
    methods: {
        linkToCart() {
            this.$router.push({ path: '/page/cart' })
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
    padding: 0.5rem;
    h5{text-align: center;font-size: 1rem;line-height: 30px;border-bottom: 1px solid #eee;font-weight: normal;}
    .product{
        border: 1px solid #eee;padding: 1rem 0;height: 190px;
        .left{
            display: inline-block;width: 55%;text-align: center;position: relative;top:-60px;
            p{font-size: 1.1rem;color: #ed711f;vertical-align: middle;text-align: center;font-weight: 600;}
            span{text-align: center;font-size: 0.8rem;}
        }
        .right{
            display: inline-block;width: 39%;
            p{line-height: 30px;font-size: 0.9rem;}
        }
    }
}
</style>
