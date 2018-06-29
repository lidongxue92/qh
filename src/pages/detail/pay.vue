<template>
    <div class="detail">
        <top v-bind:title="title"></top>
        <div class="middle">
            <ul class="list">
                <li>产品名称<span>{{product.productName}}</span></li>
                <li>订单号 <span>{{product.orderCode}}</span></li>
                <li>应付金额 <span>{{product.transAmt}}元</span></li>
                <li>抵扣金额 <span class="c-FFA303">-{{product.redPacketMoney}}</span></li>
                <li>加息利率<span class="c-FFA303">0.5%</span></li>
                <li>实际支付金额 <span class="c-FFA303">{{product.payMoney}}</span></li>
            </ul>
        </div>
        <button class="button" @click="kaiHu">确认支付</button>
        <div class="box" style="display:none;">
            <form  name="regSubmit" method="post" :action="ChinaPnrServer"> 
                 <input type='text' name='Version'  :value='Version'>
                 <input type='text' name='CmdId'  :value='CmdId'>
                 <input type='text' name='MerCustId' :value='MerCustId'>
                 <input type='text' name='OrdId'  :value='OrdId'> 
                 <input type='text' name='OrdDate' :value='OrdDate'>
                 <input type='text' name='TransAmt'  :value='TransAmt'>
                 <input type='text' name='UsrCustId' :value='UsrCustId'>
                 <input type='text' name='MaxTenderRate'  :value='MaxTenderRate'>
                 <!-- <input type='text' name='BorrowerCustId' :value='BorrowerCustId'>
                 <input type='text' name='BorrowerAmt'  :value='BorrowerAmt'> 
                 <input type='text' name='BorrowerRate' :value='BorrowerRate'>
                 <input type='text' name='ProId'  :value='ProId'> -->
                 <!-- <input type='text' name='productName' :value='productName'>
                 <input type='text' name='orderCode'  :value='orderCode'>
                 <input type='text' name='transAmt'  :value='transAmt'>
                 <input type='text' name='payMoney' :value='payMoney'>
                 <input type='text' name='redPacketMoney'  :value='redPacketMoney'>
                 <input type='text' name='IiRate'  :value='IiRate'> -->
                 <input type='text' name='IsFreeze' :value='IsFreeze'>
                 <input type='text' name='FreezeOrdId'  :value='FreezeOrdId'>
                 <!-- <input type='text' name='retUrl' :value='retUrl'> -->
                 <input type='text' name='BgRetUrl'  :value='BgRetUrl'>
                 <!-- <input type='text' name='MerPriv'  :value='MerPriv'> -->
                 <input type='text' name='PageType' :value='PageType'>
                 <input type='text' name='ChkValue'  :value='ChkValue'>
                 <input type='text' name='ReqExt'  :value='ReqExt'>
                 <input type='text' name='BorrowerDetails'  :value='BorrowerDetails'>
            </form>
        </div>
    </div>
</template>

<script>
import { PopupPicker, Tab, TabItem, Swiper, SwiperItem,Qrcode, Divider,XDialog, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData,TransferDomDirective as TransferDom } from 'vux'
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
            product: '',
            money:'',
            title:'确认支付',
            brow:{},
            BorrowerDetails:"",
            BorrowerDetailsStr:'',
            // 三方开户数据
            ChinaPnrServer : "", 
            Version : "",
            CmdId : "",
            MerCustId : "",
            OrdId : "",
            OrdDate :"",
            TransAmt : "",
            UsrCustId : "",
            MaxTenderRate : "",
            BorrowerCustId:"",
            BorrowerAmt : "", 
            BorrowerRate : "",
            ProId : "",
            productName : "",
            orderCode : "",
            transAmt :"",
            payMoney : "",
            redPacketMoney: "",
            IiRate : "",
            IsFreeze:'',
            FreezeOrdId : "",
            retUrl :"",
            BgRetUrl: "",
            MerPriv: "",
            PageType : "",
            ChkValue:'',
            VocherAmt:'',
            AcctId:'',
            ReqExt:''
        }
    },
    computed: {
    },
    mounted () {
    },
    created() {
        
    },
    activated: function(){
        this.productdata()
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        }//回退上一级页面并刷新
    },
    methods: {
        linkTodetail1() {
            this.$router.push({ path: '/page/detail1' })
        },
        productdata(){
            const _this = this
            _this.$loading.show();
            const url = myPub.URL+`/trade/buyProductByChinaPnr`;
            const id = this.$route.query.id
            const orderMoney = this.$route.query.money
            var params = new URLSearchParams();
            params.append('token',sessionStorage.getItem("token"));
            params.append('productId',id);
            params.append('clientType','h5');
            params.append('orderMoney',orderMoney);
            params.append('payType','1');
            axios.post(url,params).then(res => {
                console.log(res.data)
                const data = res.data
                _this.$loading.hide();
                    if (data.result == '400') {
                    this.$vux.alert.show({
                        title: '',
                        content: data.resultMsg
                    })
                    setTimeout(() => {
                        this.$vux.alert.hide()
                        this.$router.push({path:"/login"})
                    }, 3000)
                }
                if(res.data.result == 200){
                    this.product = data.buyInfo.detailInfo
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        
        // 三方购买
        kaiHu(){
            const _this = this
            _this.$loading.show();
            const url = myPub.URL+`/trade/buyProductByChinaPnr`;
            const id = this.$route.query.id
            const orderMoney = this.$route.query.money
            var params = new URLSearchParams();
            params.append('token',sessionStorage.getItem("token"));
            params.append('productId',id);
            params.append('clientType','h5');
            params.append('orderMoney',orderMoney);
            params.append('payType','1');
            axios.post(url,params).then(res => {
                _this.$loading.hide();
                console.log(res.data.buyInfo);
                const data = res.data.buyInfo
                const pay = res.data.buyInfo.PayInfo
                _this.brow = pay.BorrowerDetails
                    // 支付信息
                    this.ChinaPnrServer = pay.ChinaPnrServer;
                    this.Version = pay.Version; //版本号
                    this.CmdId = pay.CmdId; //消息信息
                    this.MerCustId = pay.MerCustId; //商户客户号
                    this.OrdId = pay.OrdId; //订单号
                    this.OrdDate = pay.OrdDate; //订单日期
                    this.TransAmt = pay.TransAmt; //交易金额
                    this.UsrCustId = pay.UsrCustId; //交易金额
                    this.MaxTenderRate = pay.MaxTenderRate; //最大投资手续费率
                    this.IsFreeze = pay.IsFreeze;
                    this.FreezeOrdId = pay.FreezeOrdId;
                    this.BgRetUrl = pay.BgRetUrl;
                    this.PageType = pay.PageType;
                    this.ChkValue = pay.ChkValue;
                    this.ReqExt = " ";
                    // if (pay.ReqExt != "{}" && pay.ReqExt.length >= 2) {
                    //     this.ReqExt = JSON.stringify(pay.ReqExt);
                    // }
                    for (var i in  _this.brow) {
                        var obj = _this.brow[i]
                        this.BorrowerDetails = '['+'{'+'"BorrowerAmt":'+'"'+obj.BorrowerAmt+'"}'+'{'+'"BorrowerCustId":'+'"'+obj.BorrowerCustId+'"}'+'{'+'"BorrowerRate":'+'"'+obj.BorrowerRate+'"}'+'{'+'"ProId":'+'"'+obj.ProId+'"}'+']'
                        console.log(this.BorrowerDetails)
                    }
                if(res.data.result == 200){
                    //提交from表单
                    setTimeout(() => {
                        document.regSubmit.submit();
                    }, 500)
                    
                }
            }).catch((err) => {
                console.log(err);
            });
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
        .list{
            margin-top: 0.5rem;background: #fff;border-radius: 3px;padding: 0.5rem 0.6rem;color: #333;border-radius: 5px;
            li{
                list-style: none;font-size: 0.8rem;padding: 0.6rem 0;color: #666;
                span{float: right;color: #333}
                .c-FFA303{color: #FFA303}
            }
        }
    }
    .button{border: 0;width: 90%;margin-left: 5%;margin-top: 1rem;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);height: 40px;text-align: center;color: #fff;font-size: 0.9rem;border-radius: 30px;position: fixed;bottom: 2rem;}
}
</style>
