<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <div class="middle">
            <div class="noset" v-if = 'isshow'>
                <ul class="list">
                    <li>
                        <img src="../../assets/img/card.png">&ensp;<input type="type" placeholder="请输入银行卡号"></li>
                    <li>
                        <img src="../../assets/img/card.png">&ensp;<input type="type" placeholder="请输入银行预留手机号码"></li>
                    <li>
                        <img src="../../assets/img/card.png">&ensp;<input type="type" placeholder="请输入手机验证码" class="register_content_input" v-model="LUserPsd"><span class="sm" @click="sendCode">{{btnText}}</span></li>
                </ul>
                <button class="button" @click="next">下一步</button>
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
            title:'新卡绑定',
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
        linkTodetail1() {
            this.$router.push({ path: '/page/detail1' })
        },
        // 手机号验证码
        sendCode() {
            console.log('点击验证码触发')
            // const reg = /^1[34578]\d{9}$/ // 手机号正则校验
            // if (!this.phoneNumber) {
            //     this.$vux.toast.text('请输入手机号~', 'middle')
            //     return
            // }
            // if (!reg.test(this.phoneNumber)) {
            //     this.$vux.toast.text('手机号格式不正确~', 'middle')
            //     return
            // }
            this.time = 90
            this.disabled = true
            this.timer()
             // 获取验证
             //  const url ='http://public.weifenvip.com/index/Sendcodes/sms';
             //  var params = new URLSearchParams();
             //  params.append('mobile',this.phoneNumber);
             //  params.append('token',localStorage.currentUser_token);
             //  params.append('type','1');
             //  if(!localStorage.sessionid){
             //    console.log(params)
             // }else{
             //    params.append('session_id',localStorage.sessionid);
             // }
             //  axios.post(url,params).then(response => {
             //    // const currentUser_token = response.data.data //获取token
             //        console.log(response)
             //        const sessionid = response.data.sessionid
             //        console.log(sessionid)
             //        localStorage.setItem('sessionid',sessionid);
             //        let smsCode = response.data.data.verifCode
             //        this.smsCode = smsCode
             //        this.$vux.alert.show({
             //            title: '验证码',
             //            content: `验证码已发送,【${smsCode}】,10分钟有效`
             //        })
             //        setTimeout(() => {
             //            this.$vux.alert.hide()
             //        }, 3000)
             //  }).catch((err) => {
             //    console.log(err)
             //  })
        },
        timer() {
            if (this.time > 0) {
                this.time--
                this.btnText = this.time + 's后重新获取'
                setTimeout(this.timer, 1000)
            } else {
                this.time = 0
                this.btnText = '获取验证码'
                this.disabled = false
            }
        },
        next(){
            this.$router.push({ path: '/page/cardSuccess' })
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
             .list{
                margin-top: 0.5rem;background: #fff;border-radius: 3px;color: #bdbdbd;
                li{
                    list-style: none;font-size: 0.7rem;border-bottom: 1px solid #eee;padding: 0.8rem;position: relative;
                    input{width: 60%;border: 0;color: #bdbdbd}
                    div{display: inline-block;}
                    .sm{color: #FFA303;font-size: 0.8rem;padding-left: 3%;border-left: 1px solid #eee;}
                    img{width: 1.5rem;vertical-align:middle;}
                }
                li:last-child{border-bottom: 0;}
            }
            p{padding: 0.5rem;font-size: 0.6rem;color: #999}
            .button{border: 0;width: 90%;margin-left: 5%;margin-top: 2rem;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);height: 40px;text-align: center;color: #fff;font-size: 0.9rem;border-radius: 30px;}
        }
    }
}
</style>
