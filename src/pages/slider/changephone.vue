<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <div class="middle">
            <div class="noset" v-if = 'isshow'>
                <ul class="list">
                    <li>
                        手机号&ensp;<input type="type" placeholder="请输入新的手机号" v-model="userPhone" @blur="checkLPhone" maxlength="11" @input="showTab" class="userPhone">
                        <img src="../../assets/img/loginClear.png" class="LoginImg" @click="clear">
                    </li>
                    <li>
                        验证码&ensp;<input type="type" placeholder="请输入验证码" class="register_content_input pwd" v-model="smsCode"  @input="changBGC" maxlength="6">
                        <img src="../../assets/img/loginClear.png" class="LoginImg1" @click="clear2">
                        <input id="sm" type="button" @click="sendCode" v-model="btnText" :disabled="disabled" style="background: transparent;">
                    </li>
                </ul>
                 <p>{{tishis}}</p>
            </div>
            <button class="button" @click="sureChange">验证</button>
        </div>
    </div>
</template>

<script>
import { PopupPicker, Tab, TabItem,XInput,  Swiper, SwiperItem,Qrcode, Divider,XDialog, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData,TransferDomDirective as TransferDom } from 'vux'
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
            btnText: '发送验证码',
            disabled: false,
            time: 0,
            verifyCode: '',
            dialog: false,
            userPhone:"",
            smsCode:'',
            picLyanzhengma:'',
            checkCode:'',
            title:'更换手机号',
            isshow:true,
            tishis:"",
        }
    },
    methods: {
        checkLPhone(){
            if(this.userPhone == ''){
                this.tishis = "请输入手机号"
            }else if(this.userPhone.search(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)==0){
                this.tishis = ""
                return true;
            }else{
                this.tishis = "请输入正确手机号"
            }
        },
        clear(){
            this.userPhone = "";
            this.tishis = "请输入手机号"
            $(".LoginImg").hide();
        },
        clear2(){
            this.smsCode = "";
            $(".LoginImg1").hide();
        },
        showTab(){
            this.tishis = "";
            var userPhone = $(".userPhone").val().length;
            if (userPhone != 0) {
                $(".LoginImg").show();
            }
        },
        // 手机号验证码
        sendCode() {
            if (this.checkLPhone() == true) {
                this.time = 90
                this.disabled = true;
                this.timer()
                // 获取验证
                const url = myPub.URL+`/three/getSmsCode` ;
                var params = new URLSearchParams();
                params.append('phone',this.userPhone);
                params.append('msgType',2);
                axios.post(url,params).then(res => {
                        console.log(res.data);
                            if (res.data.resultMsg == "短信验证码发送过于频繁，请稍后再试") {
                                this.$vux.alert.show({
                                    content: res.data.resultMsg
                                })
                                setTimeout(() => {
                                    this.$vux.alert.hide()
                                }, 3000)
                            }

                }).catch((err) => {
                    console.log(err)
                })
            }else{
                this.$vux.alert.show({
                    content: "请输入手机号码"
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                }, 3000)
            }
        },
        timer() {
            if (this.time > 0) {
                this.time--;
                this.btnText = '重新获取' + this.time + 's';
                setTimeout(this.timer, 1000)
            } else {
                this.time = 0
                this.btnText = '发送验证码'
                this.disabled = false
            }
        },
        // 判断验证背景色
        changBGC(){
            var pwdLen = $(".pwd").val().length;
            if (pwdLen >= 6) {
                $(".button").css("opacity","1");
            }else{
                $(".button").css("opacity",".5");
            }
            if (pwdLen != 0) {
                $(".LoginImg1").show();
            }
        },
        sureChange(){
            // console.log(this.checkLPhone());
              if (this.checkLPhone() == true) {
                const url = myPub.URL+`/user/updateUserPhone` ;
                const _this = this
                _this.$loading.show();
                var params = new URLSearchParams();
                params.append('token',sessionStorage.token);
                params.append('phone',this.userPhone);
                params.append('smsCode',this.smsCode);

                axios.post(url,params).then(res => {
                        console.log(res);
                        _this.$loading.hide()

                        if (res.data.result == 400) {
                            this.$vux.alert.show({
                                content: res.data.resultMsg
                            })
                            setTimeout(() => {
                                this.$vux.alert.hide()
                                this.$router.push({path:"/login",query: {redirect: 'your path'}})
                            }, 3000)
                        }else if (res.data.resultMsg == "短信验证码错误或已超时") {
                            this.$vux.alert.show({
                                content: res.data.resultMsg
                            })
                            setTimeout(() => {
                                this.$vux.alert.hide()
                            }, 3000)
                        }else if (res.data.result == 200) {
                            this.$vux.alert.show({
                                content: res.data.resultMsg
                            })
                            setTimeout(() => {
                                this.$vux.alert.hide();
                                var newPhone = this.userPhone;
                                newPhone = newPhone.substr(0, 3) + "****" + newPhone.substr(7);
                                sessionStorage.setItem("userPhonem",this.userPhone);
                                sessionStorage.setItem("userPhone",newPhone);
                                this.$router.go(-1);
                            }, 3000)
                        }if (res.data.result != 200) {
                        if (res.data.resultMsg == "短信验证码发送过于频繁，请稍后再试") {
                            this.$vux.alert.show({
                                content: res.data.resultMsg
                            })
                            setTimeout(() => {
                                this.$vux.alert.hide()
                            }, 3000)
                        }else if (res.data.resultMsg == "手机号已绑定") {
                            this.$vux.alert.show({
                                content: res.data.resultMsg
                            })
                            setTimeout(() => {
                                this.$vux.alert.hide()
                            }, 3000)
                        }else if (res.data.resultMsg == "请求参数[smsCode]不完整") {
                            this.$vux.alert.show({
                                content: "请输入验证码"
                            })
                            setTimeout(() => {
                                this.$vux.alert.hide()
                            }, 3000)
                        }
                    }

                }).catch((err) => {
                    console.log(err)
                })
              }
        }
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
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
    background: #f7f7f7;height:100%;
    // position: relative;
    .middle{
        margin-top: 1rem;
        .noset{
            position: relative;
            padding-bottom: 2rem;
            .list{
                margin-top: 0.5rem;background: #fff;border-radius: 3px;color: #bdbdbd;
                li{
                    list-style: none;font-size: 0.7rem;border-bottom: 1px solid #eee;padding: 0.8rem;position: relative;
                    input{width: 55%;border: 0;color: #bdbdbd}
                    div{display: inline-block;}
                    #sm{color: #FFA303;font-size: 0.8rem;padding-left: 3%;border-left: 1px solid #eee;width: 25%;}
                }
                li:last-child{border-bottom: 0;}
            }
            p{
                position: absolute;
                bottom: 0;
                padding: 0.5rem;
                font-size: 0.6rem;
                color: #999;
            }

        }
        .button{border: 0;width: 90%;margin-left: 5%;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);height: 40px;text-align: center;color: #fff;font-size: 0.9rem;border-radius: 30px;opacity: 0.5;margin-top: 2rem;}
    }
    .LoginImg,.LoginImg1{
        width: 1rem /* 34/40 */;
        position: absolute;
        right: .8rem;
        top: 1rem;
        display: none;
    }
    .LoginImg1{
        right: 8.5rem;
    }
}
</style>
