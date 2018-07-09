<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <div class="middle">
            <ul class="list">
                <li>
                    <input type="password" placeholder="请输入新密码" class="register_content_input pwd" v-model="pwd" @blur="checkLPsd" @input="shuruPwd">
                    <!-- <span class="tishixiaoxi disappear">请输入新密码。</span> -->
                    <img src="../../assets/img/loginClear.png" class="LoginClear" @click="clear">
                </li>
                <li>
                    <input type="password" placeholder="请确认新密码" class="register_content_input surePwd" v-model="surePwd" @blur="checkLPsd1" @input="shuruPwd1">
                    <!-- <span class="tishixiaoxi disappear">请输入新密码。</span> -->
                    <img src="../../assets/img/loginClear.png" class="LoginClear1" @click="clear1">
                </li>
            </ul>
            <p>密码长度为6~20位，须包含数字、字母、符号至少2种或以上元素</p>
            <button class="button" @click="sub">确认修改</button>
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
let Base64 = require('js-base64').Base64;
export default {
    name: 'loginpassword',
    directives: {
        TransferDom
    },
    data() {
        return {
            product: null,
            money:'1000',
            title:'登录密码修改',
            isshow:true,
            pwd:'',
            surePwd:'',
        }
    },
    computed: {
    },
    mounted () {
    },
    created() {
        if (this.surePwd != "" && this.pwd != "") {
            $(".button").css("opacity"," 1");
        }
    },
    methods: {
        // 清空
        clear(){
            this.pwd = "";
            $(".LoginClear").hide();
        },
        clear1(){
            this.surePwd = "";
            $(".LoginClear1").hide();
        },
        //X号切换
        shuruPwd(){
            var pwdLen = $(".pwd").val().length;
            if (pwdLen != 0) {
                $(".LoginClear").show();
            }else{
                $(".LoginClear").hide();
            }
        },
        shuruPwd1(){
            var suePwdLen = $(".surePwd").val().length;
            if (suePwdLen != 0) {
                $(".LoginClear1").show();
            }else{
                $(".LoginClear1").hide();
            }
        },
        // 验证登录密码
        checkLPsd(){
            if(this.pwd == ''){
                $(".middle p").addClass("disappear");
            }else if(this.pwd.search(/^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-zA-Z]|[0-9]){6,20}$/) == 0){
                $(".middle p").removeClass("disappear");
                console.log(this.pwd);
                return true;
            }else{
                 $(".middle p").removeClass("disappear");
                //  $(".LoginClear").show();
            }
        },
        checkLPsd1(){
            if(this.surePwd == ''){
                $(".middle p").addClass("disappear")
            }else if(this.pwd == this.surePwd){
                $(".middle p").removeClass("disappear");
                $(".middle p").text("密码长度为6~20位，须包含数字、字母、符号至少2种或以上元素")
                $(".button").css("opacity"," 1");
                return true;
            }else{
                $(".middle p").addClass("disappear");
                $(".middle p").text("两次密码必须一致");
                // $(".LoginClear1").show();
            }
        },
        sub(){
            if (this.checkLPsd() == true && this.checkLPsd1() == true && this.pwd == this.surePwd) {
                $(".button").css("opacity"," 1");
                const url = myPub.URL+`/pwd/updateUserLoginPwd` ;
                const surePwd = Base64.encode(this.surePwd,'utf-8');

                var params = new URLSearchParams();
                params.append('token',sessionStorage.token);
                params.append('newPwd',surePwd);
                axios.post(url,params).then(res => {
                        // console.log(res);
                        if (res.data.result == 200) {
                            this.$vux.alert.show({
                                content: res.data.resultMsg
                            })
                            setTimeout(() => {
                                this.$vux.alert.hide()
                                this.$router.push({ path: '/page/userset'})
                            }, 2000)

                        }else if (res.data.result == 400) {
                            this.$vux.alert.show({
                                title: '',
                                content: res.data.resultMsg
                            })
                            setTimeout(() => {
                                this.$vux.alert.hide()
                                this.$router.push({path:"/login",query: {redirect: 'your path'}})
                            }, 3000)
                        }

                }).catch((err) => {
                    console.log(err)
                })
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
        .list{
            margin-top: 0.5rem;background: #fff;border-radius: 3px;color: #bdbdbd;
            li{
                list-style: none;font-size: 0.7rem;border-bottom: 1px solid #eee;position: relative;
                input{width: 100%;border: 0;color: #bdbdbd;padding: 0.8rem;outline:none;}
            }
            li:last-child{border-bottom: 0;}
            .LoginClear,.LoginClear1{
                width: 1rem /* 34/40 */;
                position: absolute;
                right: .8rem;
                top: 1rem;
                display: none;
            }
        }
        p{padding: 0.5rem;font-size: 0.6rem;color: #999}
        .disappear{color: red;}
        .button{
            border: 0;
            width: 90%;
            margin-left: 5%;
            margin-top: 1rem;
            background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);
            height: 40px;
            text-align: center;
            color: #fff;
            font-size: 0.9rem;
            border-radius: 30px;
            opacity: .5;
        }
    }
}
</style>
