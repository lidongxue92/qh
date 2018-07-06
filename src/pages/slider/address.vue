<template>
    <div class="container">
        <topComponent title='联系地址' :showLeft='false'>
            <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
        </topComponent>

        <div v-if="isAddress" class="main">
            <div class="text">
                <span>联系地址</span>
                <span class="textMain">{{address}}</span>
            </div>
            <div class="addressImg">
                <img src="../../assets/img/sliderBox/address2.png">
                <p>地址已经设置</p>
                <button @click="addAddress">更换地址</button>
            </div>
        </div>

        <div v-else class="main1">
            <div>
                <img src="../../assets/img/sliderBox/address.png">
                <p>地址未设置</p>
                <button @click="addAddress">绑定地址</button>
            </div>
        </div>

        <div class="zhezhao">
            <div class="addAddress">
                <img src="../../assets/img/sliderBox/closeX.png" @click="close">
                <textarea placeholder="请填写您的详细地址" @input="changeText" class="textarea" v-model="addressVal" maxlength="100"></textarea>
                <input type="button" value="提交" class="submitAddress" @click="submitAddress">
            </div>
        </div>


    </div>
</template>

<script>
import topComponent from '../../components/common/top';
import $ from 'jquery';
import axios from 'axios';
import * as myPub from '../../assets/js/public.js'
export default {
    name:'address',
    components: {
        topComponent
    },
    data(){
        return{
            isAddress:false,
            addressVal:"",
            address:""
        }
    },
    created() {
        const url = myPub.URL+`/user/getUserInfo`;
        var params = new URLSearchParams();
        params.append('token',sessionStorage.getItem("token"));

        axios.post(url,params).then(res => {
            // console.log(res.data);
            if (res.data.User.address != "") {
                this.address = res.data.User.address;
                this.isAddress = true;
            }

        }).catch((err) => {
            console.log(err);
        });
    },
    methods:{
        goBack(){
            this.$router.back()
        },
        changeText(){
            if (this.addressVal == "") {
                $(".submitAddress").css("opacity",".5");
            }else{
                $(".submitAddress").css("opacity","1");
            }
        },
        close(){
            $(".zhezhao").hide();
        },
        addAddress(){
            $(".textarea").val("");
            $(".zhezhao").show();
        },
        submitAddress(){
            if (this.addressVal != "") {
                const url = myPub.URL+`/user/saveAddress`;
                var params = new URLSearchParams();
                params.append('token',sessionStorage.getItem("token"));
                // params.append('type',2);
                params.append('address',this.addressVal);

                axios.post(url,params).then(res => {
                    console.log(res.data);
                    if (res.data.result == 200) {
                        $(".zhezhao").hide();
                        this.isAddress = true;
                        this.address = this.addressVal
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
                    console.log(err);
                });
            }else{
                this.$vux.alert.show({
                    title: '',
                    content: "请输入地址"
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                }, 2000)
            }
        }

    }
}
</script>

<style lang="less" scoped>
.container{
    background: #f6f6f6;
    width: 100%;
    height: 100%;
    .main{
        .text{
            background: #fff;
            width: 100%;
            height: 2.8rem;
            line-height: 2.8rem;
            margin-top: 0.5rem;
            span{
                color: #333;
                margin-left: 0.8rem;
                font-size: .9rem;
            }
            .textMain{
                text-align: right;
                width: 50%;
                float: right;
                margin-right: .8rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .addressImg{
            text-align: center;
            img{
                width: 50%;
                margin-top: 3.5rem /* 140/40 */;
                margin-bottom: 1.6rem /* 63/40 */;
            }
            p{
                font-size: 1rem;
                color: #FFA303;
            }
            button{
                width: 90%;
                height: 2.8rem;
                color: #fff;
                font-size: 1.1rem;
                border-radius: 40px;
                border: none;
                outline: none;
                margin-top: 3.5rem /* 140/40 */;


                 /*渐变*/
                background: #2B9AFF;
                background: -moz-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
                background: -webkit-gradient(linear, left, color-stop(0%, #2B9AFF), color-stop(100%, #2773FF));
                background: -webkit-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
                background: -o-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
                background: -ms-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
                background: linear-gradient(to right, #2B9AFF 0%, #2773FF 100%);
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2B9AFF', endColorstr='#2773FF', GradientType=0);
            }

        }
    }
    .main1{
        text-align: center;
            img{
                width: 20%;
                margin-top: 3.5rem /* 140/40 */;
                margin-bottom: 1.6rem /* 63/40 */;
            }
            p{
                font-size: 1rem;
                color: #FFA303;
            }
            button{
                width: 90%;
                height: 2.8rem;
                color: #fff;
                font-size: 1.1rem;
                border-radius: 40px;
                border: none;
                outline: none;
                margin-top: 3.5rem /* 140/40 */;


                 /*渐变*/
                background: #2B9AFF;
                background: -moz-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
                background: -webkit-gradient(linear, left, color-stop(0%, #2B9AFF), color-stop(100%, #2773FF));
                background: -webkit-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
                background: -o-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
                background: -ms-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
                background: linear-gradient(to right, #2B9AFF 0%, #2773FF 100%);
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2B9AFF', endColorstr='#2773FF', GradientType=0);
            }
    }
    .zhezhao{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .3);
        display: none;
        .addAddress{
            width: 80%;
            height: 15.5rem /* 550/40 */;
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translateX(-50%);
            margin-top: -7.75rem;
            background: #fff;
            border-radius:.6rem /* 24/40 */;
            overflow: hidden;
            img{
                float: right;
                margin-right: 1rem;
                margin-top: 1rem;
                width: 1rem;
            }
            textarea{
                resize: none;
                width: 85%;
                height: 6.3rem /* 250/40 */;
                margin-left: 7.5%;
                margin-top: 1rem;
                border: 1px solid #ccc;
                border-radius:4px;
                color: #333;
                padding: 0.5rem;
                box-sizing: border-box;
                font-size: 0.8rem;
                outline: none;
            }
            input{
                width: 55%;
                margin-left: 22.5%;
                height: 2.4rem;
                color: #fff;
                text-align: center;
                border-radius: 40px;
               margin-top: 1.4rem /* 56/40 */;
                outline: none;
                border: none;
                /*渐变*/
                background: #2773FF;
                opacity: .4;
                font-size: 1rem;
                // background: -moz-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
                // background: -webkit-gradient(linear, left, color-stop(0%, #2B9AFF), color-stop(100%, #2773FF));
                // background: -webkit-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
                // background: -o-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
                // background: -ms-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
                // background: linear-gradient(to right, #2B9AFF 0%, #2773FF 100%);
                // filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2B9AFF', endColorstr='#2773FF', GradientType=0);
            }
        }
    }
}
</style>
