<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <div class="middle">
            <h5>启航金服债权转让协议</h5>
            <h6><img src="~@/assets/img/book.png">第一条</h6>
            <p>甲方同意按本协议的条款和条件向乙方转让其对丙方的债权，乙方同意按本协议的条款和条件从甲方受让该债权甲方在签订本协议之日起日内，将其合法拥有上述债权的相关依据向乙方交割完毕。</p>
            <h6><img src="~@/assets/img/book.png">第二条</h6>
            <p>甲方同意按本协议的条款和条件向乙方转让其对丙方的债权，乙方同意按本协议的条款和条件从甲方受让该债权甲方在签订本协议之日起日内，将其合法拥有上述债权的相关依据向乙方交割完毕。</p>
            <h6><img src="~@/assets/img/book.png">第三条</h6>
            <p>甲方同意按本协议的条款和条件向乙方转让其对丙方的债权，乙方同意按本协议的条款和条件从甲方受让该债权甲方在签订本协议之日起日内，将其合法拥有上述债权的相关依据向乙方交割完毕。</p>
        </div>
        <div class="bottom">
            <h5><span class="img img2"></span><input @click="check" class="check" type="checkbox" checked="true" /> 我已阅读并同意<span>《启航金服债权转让协议》</span></h5>
            <span class="button" @click="Transferdetail">下一步</span>
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
            title:'转让协议',
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
        Transferdetail() {
            if ($('.bottom .check').is(':checked')) {
                this.$router.push({ path: '/page/Transferdetail' })
            }
        },
        check(){
            if ($('.bottom .check').is(':checked')) {
                $('.bottom .img').removeClass('img1').addClass('img2')
            }else{
                $('.bottom .img').removeClass('img2').addClass('img1')
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
        margin-top: 0.5rem;color: #999;background: #fff;padding:0.8rem;
        h5{text-align: center;color: #333;font-size: 0.9rem;font-weight: normal;}
        h6{font-size: 0.8rem;font-weight:normal;margin-top:0.5rem;img{width: 0.8rem;height: 0.8rem;margin-right: 0.6rem;}}
        p{font-size: 0.7rem;line-height: 1.5rem;margin-top: 0.5rem;}
    }
    .bottom{
        position: fixed;bottom: 0;font-size: 0.7rem;color: #999;padding: 0.8rem;width: 93%;
        h5{
            position: relative;
            .img{position: absolute;width: 1.1rem;height: 1.1rem;left: 0;top: 0.2rem;display: inline-block;}
            .img1{background: url(~@/assets/img/noagree.png);background-size: 100%;background-repeat: no-repeat;}
            .img2{background: url(~@/assets/img/agree.png);background-size: 100%;background-repeat: no-repeat;}
            input{width: 1.1rem;height: 1.1rem;opacity: 0;position: relative;z-index: 11;}
            span{color: #2B9AFF}
        }
        .button{border: 0;width: 100%;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);height: 40px;text-align: center;color: #fff;font-size: 0.9rem;border-radius: 30px;line-height: 40px;position: relative;bottom: 0.8rem;display: inline-block;margin-top: 1.3rem;}
    }
}
</style>
