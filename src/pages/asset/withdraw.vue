<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <div class="middle">
            <div class="noset" v-if = 'isshow'>
                <ul class="list">
                    <li>提现金额&ensp;<input type="type" v-model = 'transMoney' @input="re" maxlength="8">元</li>
                </ul>
                <p>您当前可提现金额<span>￥{{avlBalance}}</span> <span class="right" @click="all">全部提现</span></p>
                <button class="button" @click="withd">下一步</button>
                <p class="title">提现规则：</p>
                <p>1. 您每月拥有三次免费提现的机会，超过三次收取2元/笔；</p>
                <p>2. 免费提现次数不累计到下月；</p>
                <p>3. 账户余额（或提现后）< 100元时，须一次性提完；</p>
                <p>4. 新用户充值成功而未做投资的，如需提现，需承担提现金额0.3%的手续费，最低每笔2元。因银行存管处理T+1日限制，当日充值的额度，24小时内不支持发起提现，具体可咨询平台客服。</p>
            </div>
        </div>
        <!-- 提现 -->
        <div class="box" style="display:none;">
            <form  name="regSubmit" method="post" :action="chinaPnrServer" class="regSubmit"> 
                <input type='text' name='Version'  :value='Version'>
                <input type='text' name='CmdId'  :value='CmdId'>
                <input type='text' name='MerCustId' :value='MerCustId'>
                <input type='text' name='OrdId' :value='OrdId'>
                <input type='text' name='UsrCustId' :value='UsrCustId'>
                <input type='text' name='TransAmt' :value='TransAmt'>
                <input type='text' name='ServFee' :value='ServFee'>
                <input type='text' name='OpenAcctId' :value='OpenAcctId'>
                <input type='text' name='BgRetUrl'  :value='BgRetUrl'>
                <input type='text' name='Remark'  :value='Remark'>    
                <input type='text' name='CharSet' :value='CharSet'>
                <input type='text' name='PageType' :value='PageType'>
                <input type='text' name='BgRetUrl'  :value='BgRetUrl'>
                <input type='text' name='ChkValue'  :value='ChkValue'>    
                <input type='text' name='ReqExt' :value='ReqExt'>
                <input type='text' name='ServFeeAcctId' :value='ServFeeAcctId'>
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
            title:'提现',
            isshow:true,
            transMoney:'',
            avlBalance:'',

            // 三方提现
            BgRetUrl:'',
            CharSet:'',
            ChkValue:'',
            CmdId:'',
            MerCustId:'',
            OpenAcctId:'',
            OrdId:'',
            PageType:'',
            Remark:'',
            ReqExt:'',
            ServFee:'',
            ServFeeAcctId:'',
            TransAmt:'',
            UsrCustId:'',
            Version:'',
            chinaPnrServer:'',
        }
    },
    computed: {
    },
    mounted () {
    },
    created() {
        this.avlBalance = this.$route.query.avlBalance;
    },
    activated() {
        // this.getALLProducts()
    },
    methods: {
        re(){
            if (this.transMoney.length >=3) {
                $(".button").css("opacity","1")
            }else{
                $(".button").css("opacity",".5")
            }
        },
        all(){
            this.transMoney = this.$route.query.avlBalance
            $(".button").css("opacity","1")
        },
        withd(){
            if (this.transMoney.length >=3) {
                this.withdraw()
            }else{
                this.$vux.alert.show({
                      title: '',
                      content: '提现金额不能为空'
                  })
                  setTimeout(() => {
                      this.$vux.alert.hide()
                  }, 3000)
            }
        },
        withdrawsuccess() {
            this.$router.push({ path: '/page/withdrawsuccess' })
        },
        withdraw(){
            const url = myPub.URL+`/chinaPnr/userCash`;
            const _this = this
            _this.$loading.show();
            const transMoney = this.transMoney
            var params = new URLSearchParams();
            params.append('token',sessionStorage.getItem("token"));
            params.append('clientType','h5');
            params.append('transMoney',transMoney);
            axios.post(url,params).then(res => {
                _this.$loading.hide()
                console.log(res.data);
                if (res.data.result == '400') {
                  this.$vux.alert.show({
                      title: '',
                      content: res.data.resultMsg
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
                    this.OrdId = res.data.OrdId
                    this.UsrCustId = res.data.UsrCustId
                    this.TransAmt = res.data.TransAmt
                    this.ServFee = res.data.ServFee
                    this.OpenAcctId = res.data.OpenAcctId
                    this.BgRetUrl = res.data.BgRetUrl
                    this.Remark = res.data.Remark
                    this.CharSet = res.data.CharSet
                    this.PageType = res.data.PageType
                    this.BgRetUrl = res.data.BgRetUrl 
                    this.ChkValue = res.data.ChkValue
                    this.ReqExt = JSON.stringify(res.data.ReqExt);
                    if (this.ReqExt == "{}") {
                        this.ReqExt = "";
                    } else {
                        this.ReqExt = JSON.stringify(res.data.ReqExt);
                    }
                    this.ServFeeAcctId = res.data.ServFeeAcctId
                    //提交from表单
                    setTimeout(() => {
                        console.log(this.ReqExt)
                        $(".regSubmit").submit();
                    }, 500)
                    
                }else{
                    this.$vux.alert.show({
                      title: '',
                      content: res.data.resultMsg
                  })
                  setTimeout(() => {
                      this.$vux.alert.hide()
                  }, 3000)
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
