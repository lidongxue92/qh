<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <div class="middle">
            <div class="noset" v-if = 'isshow'>
                <ul class="list">
                    <li>充值金额&ensp;<input type="type" placeholder="充值金额最小为100" v-model= 'transMoney' @input="re" maxlength="8">元</li>
                </ul>

                <button class="button">确定</button>
                <p class="title">充值规则：</p>
                <p>1. 用户充值不收取任何手续费；</p>
                <p>2. 最低充值金额应 >= 100 元；</p>
                <p>3. 充值/提现必须为银行借记卡，不支持存折、信用卡充值；</p>
                <p>4. 严禁利用充值功能进行信用卡套现、转账、洗钱等行为，一经发现，将封停账号；</p>
                <p>5. 充值需开通银行卡网上支付功能；如有疑问请咨询开户行客服；</p>
                <p>6. 如需帮助，请点击右侧在线客服或拨打客服热线：400-821-6328。</p>
            </div>
        </div>
        <!-- 充值 -->
        <div class="box" style="display:none;">
            <form  name="regSubmit" method="post" :action="chinaPnrServer" class="regSubmit"> 
                <input type='text' name='Version'  :value='Version'>
                <input type='text' name='CmdId'  :value='CmdId'>
                <input type='text' name='MerCustId' :value='MerCustId'>
                <input type='text' name='UsrCustId' :value='UsrCustId'>
                <input type='text' name='OrdId' :value='OrdId'>
                <input type='text' name='OrdDate' :value='OrdDate'>
                <input type='text' name='GateBusiId' :value='GateBusiId'>
                <input type='text' name='BgRetUrl' :value='BgRetUrl'>
                <input type='text' name='PageType'  :value='PageType'>
                <input type='text' name='ChkValue'  :value='ChkValue'>    
                <input type='text' name='TransAmt' :value='TransAmt'>
            </form>
        </div>
    </div>
</template>

<script>
import { PopupPicker, Tab, TabItem,XInput,  Swiper, SwiperItem,Qrcode, Divider,XDialog, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData,TransferDomDirective as TransferDom } from 'vux'
import { mapState, mapMutations, mapGetters } from 'vuex'
import * as myPub from '@/assets/js/public.js'
import axios from 'axios'
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
            title:'充值',
            isshow:true ,
            transMoney:'',

            // 三方充值数据
            chinaPnrServer:'',
            Version:'',
            CmdId:'',
            MerCustId:'',
            UsrCustId:'',
            OrdId:'',
            OrdDate:'',
            GateBusiId:'',
            OpenBankId:'',
            OpenAcctId:'',
            RetUrl:'',
            BgRetUrl:'',
            PageType:'',
            ChkValue:'',
            MerPriv:'',
            TransAmt:''
        }
    },
    computed: {
    },
    mounted () {
    },
    created() {},
    activated() {
        this.user()
    },
    methods: {
        //开通账户但未绑卡是进行跳转
        card() {
            this.$router.push({ path: '/page/card' })
        },
        // 充值
        recharge(){
            const url = myPub.URL+`/chinaPnr/userNetSave`;
            const transMoney = this.transMoney
            var params = new URLSearchParams();
            params.append('token',sessionStorage.getItem("token"));
            params.append('clientType','h5');
            params.append('transMoney',transMoney);
            axios.post(url,params).then(res => {
                console.log(res.data);
                if (res.data.result == '400') {
                  this.$vux.alert.show({
                      title: '',
                      content: data.resultMsg
                  })
                  setTimeout(() => {
                      this.$vux.alert.hide()
                      this.$router.push({path:"/login",query: {redirect: 'your path'}})
                  }, 3000)
              }
                if(res.data.result == 200){
                    this.chinaPnrServer = res.data.chinaPnrServer
                    this.Version = res.data.Version
                    this.CmdId = res.data.CmdId
                    this.MerCustId = res.data.MerCustId
                    this.UsrCustId = res.data.UsrCustId
                    this.OrdId = res.data.OrdId
                    this.OrdDate = res.data.OrdDate
                    this.GateBusiId = res.data.GateBusiId
                    this.BgRetUrl = res.data.BgRetUrl
                    this.PageType = res.data.PageType
                    this.ChkValue = res.data.ChkValue
                    this.TransAmt = res.data.TransAmt
                    //提交from表单
                    setTimeout(() => {
                        console.log(this.chinaPnrServer)
                        $(".regSubmit").submit();
                    }, 500)
                    
                }else if (res.data.result == 300) {
                    this.$vux.alert.show({
                      title: '',
                      content: '充值金额不能为空'
                  })
                  setTimeout(() => {
                      this.$vux.alert.hide()
                  }, 3000)
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        re(){
            if (this.transMoney.length >=3) {
                $(".button").css("opacity","1")
            }else{
                $(".button").css("opacity",".5")
            }
        },
        //基本信息
        user(){
            const url = myPub.URL+`/user/getUserInfo`;
            const transMoney = this.transMoney
            const _this = this
            _this.$loading.show();
            var params = new URLSearchParams();
            params.append('token',sessionStorage.getItem("token"));
            axios.post(url,params).then(res => {
                _this.$loading.hide()
                console.log(res.data);
                if (res.data.result == '400') {
                  this.$vux.alert.show({
                      title: '',
                      content: data.resultMsg
                  })
                  setTimeout(() => {
                      this.$vux.alert.hide()
                      this.$router.push({path:"/login",query: {redirect: 'your path'}})
                  }, 3000)
                 }
                if(res.data.result == 200){
                    if (res.data.hasBankCard == '1') {
                        $(".button").click(function () {
                            _this.$router.push({ path: '/page/card' })
                        })
                    }else{
                        $(".button").click(function () {
                             _this.recharge()
                        })
                    }
                }
            }).catch((err) => {
                console.log(err);
            });
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
                    list-style: none;font-size: 0.7rem;border-bottom: 1px solid #eee;padding: 0.8rem;position: relative;margin-bottom: 0.5rem;
                    input{width: 75%;border: 0;color: #bdbdbd;text-align: right;}
                }
                li:last-child{border-bottom: 0;}
            }
            p{
                padding:0.2rem 0.5rem;font-size: 0.6rem;color: #999;
                span{color: #333;}
                .right{float: right;color: #FFA303}
            }
            .title{color: #333;font-size: 0.7rem;margin-top: 1rem;}
            .button{border: 0;width: 90%;margin-left: 5%;margin-top: 2rem;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);height: 40px;text-align: center;color: #fff;font-size: 0.9rem;border-radius: 30px;opacity: .5}
        }
    }
}
</style>
