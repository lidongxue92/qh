<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <div class="middle">
            <ul class="list">
                <li>
                    <span>类型</span>
                    <span>金额(元)</span>
                    <span>时间</span>
                    <span>状态</span>
                </li>
                <li>
                    <span>提现</span>
                    <span>-1000.00</span>
                    <span>2017.12.30</span>
                    <span class="c-FFA303">成功</span>
                </li>
                <li>
                    <span>投资</span>
                    <span>-1000.00</span>
                    <span>2017.12.30</span>
                    <span class="c-FFA303">成功</span>
                </li>
                <li>
                    <span>兑付</span>
                    <span>+1000.00</span>
                    <span>2017.12.30</span>
                    <span class="c-FFA303">成功</span>
                </li>
                <li>
                    <span>红包</span>
                    <span>+1000.00</span>
                    <span>2017.12.30</span>
                    <span class="c-FFA303">成功</span>
                </li>
                <li>
                    <span>加息券兑付</span>
                    <span>+1000.00</span>
                    <span>2017.12.30</span>
                    <span class="c-FFA303">成功</span>
                </li>
                <li>
                    <span>转让资金</span>
                    <span>-1000.00</span>
                    <span>2017.12.30</span>
                    <span class="c-FFA303">成功</span>
                </li>
                <li>
                    <span>手续费</span>
                    <span>-1000.00</span>
                    <span>2017.12.30</span>
                    <span>失败</span>
                </li>
                <li>
                    <span>充值</span>
                    <span>+1000.00</span>
                    <span>2017.12.30</span>
                    <span class="c-2773FF">处理中</span>
                </li>
            </ul>
        </div>
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
            title:'账单'
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
    background: #f7f7f7;height:100%;
    .middle{
        margin-top: 1rem;
        .list{
            li{
                text-align: center;line-height: 2.5rem;background: #fff;border-top: 1px solid #eee;
                span{display: inline-block;width: 24%;font-size: 0.8rem;color: #666}
                .c-FFA303{color: #FFA303}
                .c-2773FF{color: #2773FF}
            }
            li:first-child{background: #eee;border-top: 0;}
        }
    }
}
</style>
