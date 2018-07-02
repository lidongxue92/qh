<template>
<div class="container">
    <topComponent title='取现绑卡' :showLeft='false'>
        <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
    </topComponent>

    <div class="main">
        <div class="mainTop">
            <img src="../../assets/img/bank/bankCardBg.png">
            <span>{{bank}}</span>
        </div>
        <p>{{cardNumber}}</p>
        <p @click="toUntie">去解绑</p>
    </div>

    <!-- 绑卡 -->
<div class="box" style="display:none;">
	<form name="bangkaSubmit" method="post" :action='ChinaPnrServer'>
		<input type='text' name='Version' :value='Version'>
		<input type='text' name='CmdId' :value='CmdId'>
		<input type='text' name='MerCustId' :value='MerCustId'>
		<input type='text' name='UsrCustId' :value='UsrCustId'>
		<input type='text' name='BgRetUrl' :value='BgRetUrl'>
        <input type='text' name='MerPriv' :value='MerPriv'>
		<input type='text' name='PageType' :value='PageType'>
		<input type='text' name='ChkValue' :value='ChkValue'>
	</form>
</div>

</div>
</template>

<script>
import topComponent from '../../components/common/top'
import axios from 'axios';
import * as myPub from '@/assets/js/public.js'
import $ from 'jquery'
export default {
    name:'bangCard',
    components: {
        topComponent
    },
    data(){
        return{
            // 三方绑卡
            ChinaPnrServer : "",
            Version : "",
            CmdId : "",
            MerCustId : "",
            UsrCustId:"",
            BgRetUrl :"",
            MerPriv:"",
            PageType : "",
            ChkValue : "",
        }
    },
    created() {
        const url = myPub.URL+`/user/getUserInfo`;
        var params = new URLSearchParams();
        params.append('token',sessionStorage.getItem("token"));

        axios.post(url,params).then(res => {
            console.log(res.data);
            if (res.data.result == 200) {
                if (res.data.User.hasBankCard != 2) {
                    //用户绑卡
                    const url = myPub.URL+`/chinaPnr/userBindCard`;
                    var params = new URLSearchParams();
                    params.append('token',sessionStorage.token);
                    params.append('clientType','h5');

                    axios.post(url,params).then(res => {
                        console.log(res.data);
                        this.ChinaPnrServer = res.data.chinaPnrServer;
                        this.Version = res.data.Version; //版本号
                        this.CmdId = res.data.CmdId; //消息信息
                        this.MerCustId = res.data.MerCustId; //商户客户号
                        this.BgRetUrl = res.data.BgRetUrl; //商户后台应地址
                        this.UsrId = res.data.UsrCustId; //用户客户号
                        this.MerPriv = res.data.MerPriv;//商户私有域
                        this.PageType = res.data.PageType; //页面类型
                        this.ChkValue = res.data.ChkValue; //签名

                    }).catch((err) => {
                        console.log(err);
                    });

                }
            }

        }).catch((err) => {
            console.log(err);
        });
    },
    methods:{
        goBack(){
            this.$router.back()
        },
        toUntie(){
            location.href="https://user.chinapnr.com/p2puser/"
        },

    }
}
</script>

<style lang="less" scoped>
.container{
    background: #f6f6f6;
    width: 100%;
    height: 100%;

}
</style>


