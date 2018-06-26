<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <div class="middle">
            <div class="Data">
                <img src="~@/assets/img/success.png">
                <span class="color">恭喜!</span>
                <p>该产品转让操作成功！</p>
                <p>您可在“已转让列表”中查看您的产品转让进度</p>
                <button class="button" @click="Transfer">关闭</button>
            </div>
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
            title:'转让成功',
            isshow1:false
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
        Transfer() {
            this.$router.push({ path: '/page/Transfer', query: { id: '1' }})
        },
        Transferable(){
            $(".Transferable").addClass('active')
            $(".Notransferable").removeClass('active')
        },
        Notransferable(){
            $(".Notransferable").addClass('active')
            $(".Transferable").removeClass('active')
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
        margin-top: 0.5rem;
        .Data{
            text-align: center;
            img{margin-top: 3rem;width: 7.8rem;height: 5.5rem;}
            .color{font-size: 1.3rem;color: #FFA303;display: inline-block;width: 100%;margin-top: 1rem;margin-bottom: 1rem}
            p{font-size: 0.8rem;color: #333;line-height:1rem;}
            .button{width: 10rem;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);border: 0;border-radius: 30px;line-height: 2.2rem;height: 2.2rem;color: #fff;font-size: 0.9rem;margin-top: 2rem;}
        }
    }
}
</style>
