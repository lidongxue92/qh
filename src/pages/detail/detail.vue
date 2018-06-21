<template>
    <div class="detail page">
        <div class="product">
         <h5>产品名称</h5>
            <div class="left">
                <p>10%</p>
                <span>预计年化收益率</span>
            </div>
            <div class="right">
                <p>理财期限</p>
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
        // this.getALLProducts()
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
    .product{
        background: #2B9AFF;color: #fefefe;
        h5{text-align: center;font-size: 1rem;line-height:2.5rem;font-weight: normal;margin-bottom: 1rem;}
        .left{
            display: inline-block;width: 55%;text-align: center;position: relative;
            p{font-size: 3rem;color: #fff;vertical-align: middle;text-align: center;}
            span{text-align: center;font-size: 0.5rem;}
        }
        .right{
            display: inline-block;width: 39%;
            p{line-height: 1.1rem;font-size: 0.6rem;color: #fff;}
        }
    }
}
</style>
