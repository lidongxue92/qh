<template>
    <div class="login">
        <div class="login—prompt">请输入新的手机号</div>
        <group>
<!--             <x-input placeholder="请输入商家用户名"
                     type="tel"
                     v-model="username"
                     is-type="username">
            </x-input> -->
            <div class="phone"><x-input placeholder="请输入您的手机号"
                     :max="11"
                     type="tel"
                     v-model="phoneNumber"
                     is-type="china-mobile">
                   </x-input></div>
                     <x-input class="code" type="text" 
                       placeholder="请输入验证码"
                       v-model="verifyCode"

                       >
                       <x-button slot="right"
                          type="primary"
                          mini
                          :text="btnText"
                          :disabled="disabled"
                          @click.native="sendCode" class="verification">
                     </x-button>
                     </x-input>
        </group>
        <div style="padding:15px;margin-top:30px;">
            <div v-on:click="phone"><x-button  type="primary" class="x-button">下一步 </x-button></div>
        </div>
    </div>
</template>

<script>
import { XInput, Group, XButton, Cell, Toast, base64 } from 'vux'
import { mapMutations } from 'vuex'
import axios from 'axios'
export default {
    name: 'Login',
    data() {
        return {
            btnText: '发送验证码',
            disabled: false,
            time: 0,
            memname: '',
            username:'',
            phoneNumber: '',
            verifyCode: '',
            smsCode: '',
            BaseUrl: '',
            JsApiData: '',
            code_num: '',
        }
    },
    created() {},
    activated() {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        localStorage.removeItem('cartData')
        this.UPDATE_USERINFO({
            userInfo: null
        })
    },
    mounted() {
         // this.login()
    },
    methods: {
        ...mapMutations(['UPDATE_USERINFO']),
        sendCode() {
            console.log('点击验证码触发')
            const reg = /^1[34578]\d{9}$/ // 手机号正则校验
            if (!this.phoneNumber) {
                this.$vux.toast.text('请输入手机号~', 'middle')
                return
            }
            if (!reg.test(this.phoneNumber)) {
                this.$vux.toast.text('手机号格式不正确~', 'middle')
                return
            }
            this.time = 120
            this.disabled = true
            this.timer()
             // 获取验证
                const url ='http://public.weifenvip.com/index/Sendcodes/sms';
              var params = new URLSearchParams();
              params.append('mobile',this.phoneNumber); 
              params.append('token',localStorage.currentUser_token);
              params.append('type','111');
              if (localStorage.sessionid) {
                params.append('session_id',localStorage.sessionid);
              }else{}
              axios.post(url,params).then(response => {
                // const currentUser_token = response.data.data //获取token
                console.log(response)
                    let smsCode = response.data.data.verifCode
                    this.smsCode = smsCode
                    this.$vux.alert.show({
                        title: '验证码',
                        content: `验证码已发送,【${smsCode}】,10分钟有效`
                    })
                    setTimeout(() => {
                        this.$vux.alert.hide()
                    }, 3000)
              }).catch((err) => {
                console.log(err)
              })
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
        phone(){
            const url ='http://public.weifenvip.com/index/Shop/editShopKeeper';
              var params = new URLSearchParams();
              params.append('mobile',this.phoneNumber); 
              params.append('token',localStorage.currentUser_token);
              params.append('code',this.verifyCode);
              axios.post(url,params).then(response => {
                const status = response.data.status
                console.log(status)
                if (status == "200") {
                    this.$router.push({ path: 'page/phonesuccess'})
                }else{
                    this.$vux.alert.show({
                        title: '操作失败',
                        content: response.data.msg
                    })
                    setTimeout(() => {
                        this.$vux.alert.hide()
                    }, 3000)
                }
              }).catch((err) => {
                console.log(err)
              })
          }

    },
    components: {
        XInput,
        XButton,
        Group,
        Cell,
        Toast
    }
}
</script>
<style type="text/css">
    .weui-btn{color: #ffffff;}
    .weui-dialog{background: #ffffff;}
    .weui-cells{padding: 0 10px;}
    .weui-cells input{font-size: 0.9rem;}
    .weui-cells:before{border-top: 0!important;}
    .weui-cell:before{border: 0!important;}
    .weui-cells:after{width: 92%;left: 1.5rem!important;border: 0!important;}
    .phone{background: #f7f7f7;margin-top: 1rem;border-radius: 4px;}
    .code{width: 50%;background: #f7f7f7;padding-left: 1rem;margin-top: 1rem;border-radius: 4px;float: left;height: 1.5rem;}
    .code .weui-input{width: 200%;}
    .weui-btn:after{height: 1.5rem;color: #f54321;border:0!important;}
</style>
<style scoped lang="less">
.login {
    height: 100%;
    text-align: center;
    overflow: hidden;
    .logo-wrap {
        margin:50px 0 12px 0;
        height:45px;
        .logo_box{
            margin:0 auto;
            width:80%;
            height:100%;
              display:flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content:space-between;
            .logo_imgbox{
                width:45%;
                height:100%;
                .app-logo {
                    width: 100%;
                    height: 100%;
                }
            }
            .m_bor{
                    width:auto;
                    height:100%;
                    box-sizing:border-box;
                    padding:10px;
                   /* border:1px solid #333;*/
                    .m_bor_box{
                         width:1.5px;
                        height:100%;
                        background-color: #c2c2c2;
                    }
            }
            .logo-app-name{
                width:45%;
                height: 100%;
                line-height: 45px;
                font-family:PingFangSC-Semibold;
                font-size:18px;
                font-weight:600;
                color:#333333;
                letter-spacing:0;
                text-align:left;
                vertical-align: top;
            }
        }
    }
    .login—prompt{
        font-family:PingFangSC-Regular;
        font-size:1rem;
        color:#333;
        letter-spacing:0;
        line-height: 20px;
        margin-top: 2rem;
        text-align: left;
        padding-left: 1.5rem;
    }
    .x-button{
        background:#fc5738;
        border-radius:2px;
    }
    .verification{
      width: 60%;
      background: #ffffff;
        height:2.6rem;;
        line-height:2.6rem;
        position: absolute;
        left: 110%;
        bottom: 0.1rem;
        color: #f54321;
        border: 1px solid #f54321
    }
    .registered{
        width:100%;
        margin-top:16px;
        text-align:right;
        font-family:PingFangSC-Regular;
        font-size:14px;
        color:#999999;
        letter-spacing:0;
        label{
            color:#ff8134;
        }
    }
}
</style>