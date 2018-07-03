<template>
<div class="container">
    <topComponent title='取现绑卡' :showLeft='false'>
        <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
    </topComponent>


    <div class="main">
        <!-- 绑卡 -->
        <div class="box1" v-if="isCard">
            <div class="bg"></div>
            <div class="tost">
                <p></p>
                <div class="button">
                    <span class="left" @click="leftclose">取消</span><span class="right" @click="rightclose">确定</span>
                </div>
            </div>
        </div>

        <div class="box2" v-else>
            <div class="bg"></div>
            <div class="tost">
                <p>尚未开通汇付账户，请先开通汇付托管账户</p>
                <div class="button">
                    <span class="left" @click="leftclose">取消</span><span class="right" @click="rightclose">确定</span>
                </div>
            </div>
        </div>



    </div>

    <!-- 开户 -->
<div class="box" style="display:none;">
    <form  name="regSubmit" method="post" :action="ChinaPnrServer">
            <input type='text' name='Version'  :value='Version'>
            <input type='text' name='CmdId'  :value='CmdId'>
            <input type='text' name='MerCustId' :value='MerCustId'>
            <input type='text' name='RetUrl'  :value='RetUrl'>
            <input type='text' name='BgRetUrl' :value='BgRetUrl'>
            <input type='text' name='UsrId'  :value='UsrId'>
            <input type='text' name='UsrMp' :value='UsrMp'>
            <input type='text' name='PageType'  :value='PageType'>
            <input type='text' name='ChkValue'  :value='ChkValue'>
            <input type='text' name='MerPriv' :value='MerPriv'>
    </form>
</div>


    <!-- 绑卡 -->
<div class="box" style="display:none;">
	<form name="bangkaSubmit" method="post" :action='cardChinaPnrServer'>
		<input type='text' name='Version' :value='cardVersion'>
		<input type='text' name='CmdId' :value='cardCmdId'>
		<input type='text' name='MerCustId' :value='cardMerCustId'>
		<input type='text' name='UsrCustId' :value='cardUsrCustId'>
		<input type='text' name='BgRetUrl' :value='cardBgRetUrl'>
        <input type='text' name='MerPriv' :value='cardMerPriv'>
		<input type='text' name='PageType' :value='cardPageType'>
		<input type='text' name='ChkValue' :value='cardChkValue'>
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
            isCard:false,

            // 三方开户数据
            ChinaPnrServer : "",
            Version : "",
            CmdId : "",
            MerCustId : "",
            RetUrl : "",
            BgRetUrl :"",
            MerPriv : "",
            UsrId : "",
            UsrMp : "",
            PageType : "",
            ChkValue : "",


            // 三方绑卡
            cardChinaPnrServer : "",
            cardVersion : "",
            cardCmdId : "",
            cardMerCustId : "",
            cardUsrCustId:"",
            cardBgRetUrl :"",
            cardMerPriv:"",
            cardPageType : "",
            cardChkValue : "",
        }
    },
    created() {
        const url = myPub.URL+`/user/getUserInfo`;
        var params = new URLSearchParams();
        params.append('token',sessionStorage.getItem("token"));

        axios.post(url,params).then(res => {
            console.log(res.data);
            if (res.data.result == 200) {
                // 开户
                if (res.data.realNameStatus != 2) {
                    const url = myPub.URL+`/chinaPnr/userRegister`;
                    var params = new URLSearchParams();
                    params.append('token',sessionStorage.getItem("token"));
                    params.append('clientType','h5');
                    axios.post(url,params).then(res => {
                        console.log(res.data);
                            this.ChinaPnrServer = res.data.chinaPnrServer;
                            this.Version = res.data.Version; //版本号
                            this.CmdId = res.data.CmdId; //消息信息
                            this.MerCustId = res.data.MerCustId; //商户客户号
                            this.RetUrl = res.data.RetUrl; //页面返回的URL //undefinded
                            this.BgRetUrl = res.data.BgRetUrl; //商户后台应答地址
                            this.MerPriv = res.data.MerPriv; //商户私有域 //undefinded
                            this.UsrId = res.data.UsrId; //用户号
                            this.UsrMp = res.data.UsrMp; //手机号
                            this.PageType = res.data.PageType; //页面类型
                            this.ChkValue = res.data.ChkValue; //签名
                    }).catch((err) => {
                        console.log(err);
                    });
                }else{
                    this.isCard = true;
                    // 绑卡
                    if (res.data.User.hasBankCard != 2) {
                        //用户绑卡
                        const url = myPub.URL+`/chinaPnr/userBindCard`;
                        var params = new URLSearchParams();
                        params.append('token',sessionStorage.token);
                        params.append('clientType','h5');

                        axios.post(url,params).then(res => {
                            console.log(res.data);
                            this.cardChinaPnrServer = res.data.chinaPnrServer;
                            this.cardVersion = res.data.Version; //版本号
                            this.cardCmdId = res.data.CmdId; //消息信息
                            this.cardMerCustId = res.data.MerCustId; //商户客户号
                            this.cardBgRetUrl = res.data.BgRetUrl; //商户后台应地址
                            this.cardUsrId = res.data.UsrCustId; //用户客户号
                            this.cardMerPriv = res.data.MerPriv;//商户私有域
                            this.cardPageType = res.data.PageType; //页面类型
                            this.cardChkValue = res.data.ChkValue; //签名

                        }).catch((err) => {
                            console.log(err);
                        });

                    }
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
        leftclose(){
            this.$router.back();
        },
        // 开户
        rightclose(){
            const url = myPub.URL+`/chinaPnr/userRegister`;
            var params = new URLSearchParams();
            params.append('token',sessionStorage.getItem("token"));
            params.append('clientType','h5');
            axios.post(url,params).then(res => {
                console.log(res.data);
                    this.ChinaPnrServer = res.data.chinaPnrServer;
                    this.Version = res.data.Version; //版本号
                    this.CmdId = res.data.CmdId; //消息信息
                    this.MerCustId = res.data.MerCustId; //商户客户号
                    this.RetUrl = res.data.RetUrl; //页面返回的URL //undefinded
                    this.BgRetUrl = res.data.BgRetUrl; //商户后台应答地址
                    this.MerPriv = res.data.MerPriv; //商户私有域 //undefinded
                    this.UsrId = res.data.UsrId; //用户号
                    this.UsrMp = res.data.UsrMp; //手机号
                    this.PageType = res.data.PageType; //页面类型
                    this.ChkValue = res.data.ChkValue; //签名

                if(res.data.result == 200){
                    //提交from表单
                    setTimeout(() => {
                        document.regSubmit.submit();
                    }, 1000)

                }
            }).catch((err) => {
                console.log(err);
            });
        },

    }
}
</script>

<style lang="less" scoped>
.container{
    background: #f6f6f6;
    width: 100%;
    height: 100%;

    .bg{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
    }
    .tost{
        position: absolute;
        z-index: 1;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        height: auto;
        margin: 0 auto;
        background: #fff;
        border-radius: .6rem /* 24/40 */;
        p{
            width: 80%;
            margin: 0 10%;
            text-align: center;
            margin-top: 2rem;
            color: #333;
            font-size: 1.1rem;
        }
        .button{
            width: 100%;
            display: flex;
            flex: 1;
            border-top: 1px solid #eee;
            margin-top: 2rem;

            .left,.right{
                width: 50%;
                text-align: center;
                // padding: .5rem auto;
                padding-top: .5rem;
                padding-bottom: .5rem;
                font-size: 1.1rem;
                line-height: 2rem;
            }
            .left{
                color: #2395FF;
            }
            .right{
                background: #2B9AFF;
                border-radius: 0 0 .6rem 0;
                color: #fff;
            }
        }
    }

}
</style>


