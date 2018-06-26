<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <div class="middle">
            <div class="noset" >
                <img src="~@/assets/img/put.png">
                <p>恭喜！新卡绑定成功！</p>
                <button class="button" @click="back">返回充值</button>
            </div>
        </div>
    </div>
</template>

<script>
import { PopupPicker, Tab, TabItem,XInput,  Swiper, SwiperItem,Qrcode, Divider,XDialog, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData,TransferDomDirective as TransferDom } from 'vux'
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
            btnText: '发送验证码',
            disabled: false,
            time: 0,
            verifyCode: '',
            userPhone:'',
            dialog: false,
            LUserPhone:'',
            LUserPsd:'',
            picLyanzhengma:'',
            checkCode:'',
            title:'绑卡成功',
            isshow:true        }
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
        back() {
            this.$router.push({ path: '/page/recharge' })
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
        XInput,
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
        .noset{
             img{width: 8rem;height: 7rem;margin-left: 8rem;margin-top: 4rem;}
            p{
                padding:0.2rem 0.5rem;font-size: 0.9rem;color: #FFA303;text-align: center;
            }
            .title{color: #333;font-size: 0.7rem;margin-top: 1rem;}
            .button{border: 0;width: 90%;margin-left: 5%;margin-top: 2rem;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);height: 40px;text-align: center;color: #fff;font-size: 0.9rem;border-radius: 30px;}
        }
    }
}
</style>
