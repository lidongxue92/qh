<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <div class="middle">
            <div class="set">
                <ul class="list">
                    <li>姓名<span class="c-2B9AFF" >{{userRealname}} &emsp;</span></li>
                    <li>身份证号<span class="c-2B9AFF" >{{idCardNo}} &emsp;</span></li>
                    <li>认证状态<span class="c-2B9AFF" >已认证 &emsp;</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { PopupPicker, Tab, TabItem, Swiper, SwiperItem,Qrcode, Divider,XDialog, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData,TransferDomDirective as TransferDom } from 'vux'
import { mapState, mapMutations, mapGetters } from 'vuex'
import * as myPub from '@/assets/js/public.js'
import $ from 'jquery'
import axios from 'axios';
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
            title:'实名认证',
            userRealname:"",
            idCardNo:""
        }
    },
    computed: {
    },
    mounted () {
    },
    created() {
        const url = myPub.URL+`/user/getUserInfo` ;
        var params = new URLSearchParams();
        params.append('token',sessionStorage.getItem("token"));
        axios.post(url,params).then(res => {
            // console.log(res);
            this.userRealname = res.data.User.userRealname;
            this.idCardNo = res.data.User.idCardNo;

        }).catch((err) => {
            console.log(err)
        })
    },
    activated() {
        // this.getALLProducts()
    },
    methods: {
        linkTodetail1() {
            this.$router.push({ path: '/page/detail1' })
        },
        // 姓名
        checkname(){
            if(this.LUsername == ''){
                $(".list span:eq(0)").text("请输入姓名");
                $(".list span:eq(0)").removeClass("disappear")
            }else if(this.LUsername.search(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/) == 0){
                $(".list span:eq(0)").addClass("disappear")
                return true;
            }else{
                 $(".list span:eq(0)").removeClass("disappear");
                $(".list span:eq(0)").text("姓名必须是中文")
            }
        },
        // 身份证
        checkLPsd(){
            if(this.LUserPsd == ''){
                $(".list span:eq(1)").text("请输入身份证");
                $(".list span:eq(1)").removeClass("disappear")
            }else if(this.LUserPsd.search( /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/) == 0){
                $(".list span:eq(1)").addClass("disappear")
                return true;
            }else{
                $(".list span:eq(1)").removeClass("disappear");
                $(".list span:eq(1)").text("身份证不正确")
            }
        },
        sub(){
            if (this.checkname() == true && this.checkLPsd() == true) {
                console.log("11")
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
    background: #f7f7f7;height:100%;position: relative;
    .middle{
        margin-top: 1rem;
        .noset{
             .list{
                margin-top: 0.5rem;background: #fff;border-radius: 3px;color: #bdbdbd;
                li{
                    list-style: none;font-size: 0.7rem;border-bottom: 1px solid #eee;padding: 0.8rem;position: relative;
                    input{width: 100%;border: 0;color: #bdbdbd}
                    .tishixiaoxi{position: absolute;right: 0.8rem;top: 0.8rem;color: #FFA303}
                    .disappear{display: none;}
                }
                li:last-child{border-bottom: 0;}
            }
            p{padding: 0.5rem;font-size: 0.6rem;color: #999}
            .button{border: 0;width: 90%;margin-left: 5%;margin-top: 1rem;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);height: 40px;text-align: center;color: #fff;font-size: 0.9rem;border-radius: 30px;}
        }
        .set{
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
}
</style>
