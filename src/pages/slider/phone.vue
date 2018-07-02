<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <div class="middle">
            <img src="~@/assets/img/phone.png">
            <p>已绑定</p>
            <p>{{userPhone}}</p>
            <button class="button" @click="changephone">更换绑定手机号</button>
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
            title:'手机号',
            isshow:true,
            userPhone: sessionStorage.userPhone,
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
        changephone() {
            this.$router.push({ path: '/page/changephone' })
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
        padding-top: 8.5rem;
        img{
            position: absolute;
            width: 9rem;
            top: 6rem;
            left: 50%;
            transform: translateX(-50%);
        }
        p{color:#FFA303;font-size: 0.9rem;text-align: center;margin-top: .7rem;}
        .button{border: 0;width: 90%;margin-left: 5%;margin-top: 1rem;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);height: 40px;text-align: center;color: #fff;font-size: 0.9rem;border-radius: 30px;}
    }
}
</style>
