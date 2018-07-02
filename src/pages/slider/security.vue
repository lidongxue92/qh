<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <div class="middle">
            <ul class="list">
                <li @click="loginpassword">登录密码 <img src="~@/assets/img/right.png"><span v-if="isshow" class="c-FFA303" >修改 &emsp;</span></li>
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
            title:'安全设置',
            isshow:true
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
        loginpassword() {
            this.$router.push({ path: '/page/YanzhengPhone' })
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
    background: #f7f7f7;height:100%;position: relative;
    .middle{
        margin-top: 1rem;
        .list{
            margin-top: 0.5rem;background: #fff;border-radius: 3px;padding: 0.5rem;color: #666;
            li{
                list-style: none;font-size: 0.7rem;border-bottom: 1px solid #eee;padding: 0.5rem 0;
                span{float: right;color: #333;font-size: 0.7rem;}
                img{float: right;width: 0.5rem;height: 0.8rem;position: relative;top: 0.2rem;}
                .c-FFA303{color: #FFA303}
                .c-2B9AFF{color: #2B9AFF}
            }
            li:last-child{border-bottom: 0;}
        }
    }
}
</style>
