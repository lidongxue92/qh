<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <div class="middle">
            <ul class="list">
                <li @click="security">安全设置 <img src="~@/assets/img/right.png"></li>
                <li>
                    实名认证
                    <img src="~@/assets/img/right.png"> 
                    <span v-if="isshow" class="c-FFA303"  @click="nameInfo">已认证 &emsp;</span>
                    <span v-else class="c-FFA303"  @click="nameset">未认证 &emsp;</span>
                </li>
                <li @click='phone'>手机号 <img src="~@/assets/img/right.png"></li>
            </ul>
        </div>
        <div class="bg"></div>
        <div class="tost">
          <p>亲，您还没进行实名认证，需要验证才可购买哦~</p>
          <span class="left" @click="leftclose">取消</span><span class="right" @click="rightclose">确定</span>
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



    </div>
</template>

<script>
import { PopupPicker, Tab, TabItem, Swiper, SwiperItem,Qrcode, Divider,XDialog, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData,TransferDomDirective as TransferDom } from 'vux'
import axios from 'axios';
import * as myPub from '@/assets/js/public.js'
import $ from 'jquery'
import { mapState, mapMutations, mapGetters } from 'vuex'
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
            title:'账户设置',
            isshow: false,

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
        }
    },
    created () {
        // 开户
        const url = myPub.URL+`/chinaPnr/userRegister`;
        var params = new URLSearchParams();
        params.append('token',sessionStorage.getItem("token"));
        params.append('clientType','h5');
        
        axios.post(url,params).then(res => {
            // console.log(res.data);
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

            if (res.data.resultMsg == "该账号已开通汇付托管账户！") {
                this.isshow = true
            }

        }).catch((err) => {
            console.log(err);
        });

    },
    methods: {
        security() {
            this.$router.push({ path: '/page/security' })
        },
        phone() {
            this.$router.push({ path: '/page/phone' })
        },
        nameset() {
            // 开户
            const url = myPub.URL+`/chinaPnr/userRegister`;
            var params = new URLSearchParams();
            params.append('token',sessionStorage.getItem("token"));
            params.append('clientType','h5');
            
            axios.post(url,params).then(res => {
                // console.log(res.data);
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
        nameInfo(){
            this.$router.push({path:'/page/nameset'})
        },
        leftclose(){
          $(".bg").css("display","none")
          $(".tost").css("display","none")
        },
        rightclose(){
          $(".bg").css("display","none")
          $(".tost").css("display","none")
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
    },
    watch: {
      '$route' (to, from) {
          this.$router.go(0);
      }//回退上一级页面并刷新
    },
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/center.less';
@import '~vux/src/styles/close.less';
.detail {
    background: #f7f7f7;height:100%;position: relative;
    .middle{
        margin-top: 1rem;
        .list{
            margin-top: 0.5rem;background: #fff;border-radius: 3px;padding: 0.5rem;color: #666;
            li{
                list-style: none;font-size: 0.7rem;border-bottom: 1px solid #eee;padding: 0.5rem 0;
                span{float: right;color: #333;font-size: 0.7rem;}
                img{float: right;width: 0.5rem;height: 0.8rem;position: relative;top: 0.2rem;}
                .c-FFA303{color: #FFA303}
                .c-2B9AFF{color: #2B9AFF}
            }
            li:last-child{border-bottom: 0;}
        }
    }
    .bg{position: absolute;width: 100%;height: 100%;background: rgba(0,0,0,.5);top:0;left: 0;z-index: 11;display: none;}
    .tost{
        display: none;
      width: 60%;height: 8.3rem;border-radius: 5px;position: absolute;top: 40%;background: #fff;left: 20%;text-align: center;z-index: 111;overflow: hidden;
      .close{color: #ccc;position: absolute;right: 1rem;top: 0.5rem;}
      p{font-size: 0.8rem;color: #333;text-align: center;margin-top: 2.4rem;padding: 0 0.8rem;}
      .left{color: #2B9AFF;font-size: 0.9rem;width: 49%;display: inline-block;text-align: center;line-height: 2.2rem;height: 2.2rem;margin-top: 1.2rem;border-top: 1px solid #eee;}
      .right{font-size: 0.9rem;width: 51%;display: inline-block;text-align: center;line-height: 2.2rem;height: 2.2rem;margin-top: 1.2rem;border-top: 1px solid #eee;color: #fff;background:#2B9AFF }
    }
}
</style>
