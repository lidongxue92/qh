<template>
<div class="container">
    <topComponent title='银行卡' :showLeft='false'>
        <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
    </topComponent>

    <div class="main">
        <img src="../../assets/img/bank/bankCardBg.png" v-if="bgImg">
        <img src="../../assets/img/bank/bankCardBg1.png" v-else>
        <div class="card">
            <div class="mainTop">
                <img :src="imgSrc">
                <span>{{bank}}</span>
            </div>
            <p>{{cardAccount}}</p>
            <p @click="toUntie">去解绑></p>
        </div>
    </div>


</div>
</template>

<script>
import topComponent from '../../components/common/top'
import axios from 'axios';
import * as myPub from '@/assets/js/public.js'
import $ from 'jquery'
export default {
    name:'bankCard',
    components: {
        topComponent
    },
    data(){
        return{
            bgImg:true,
            bank:"银行",
            cardNumber: "0000000000000000",
            imgSrc: "",
            BankCard:[],
            bankCode:"",
            cardAccount:"",
            expressFlag:"",

        }
    },
    created() {
        //用户银行卡信息
        const url = myPub.URL+`/bankCard/getUserBankCardList`;
        var params = new URLSearchParams();
        params.append('token',sessionStorage.token);

        axios.post(url,params).then(res => {
            // console.log(res.data);

            if (res.data.result == 200 && res.data.BankCard.length > 0) {
                console.log(res.data.BankCard[0]);
                this.BankCard = res.data.BankCard[0];
                this.bankCode = this.BankCard.bankCode;
                this.cardAccount = this.BankCard.cardAcc;
                this.expressFlag = this.BankCard.expressFlag;

                // 银行logo
                this.imgSrc = "../static/img/bank/" + this.bankCode +".png";

                // 判断背景颜色
                if (this.bankCode == "BCCB" || this.bankCode == "BJRCB" || this.bankCode == "BOC" || this.bankCode == "CITIC" || this.bankCode == "CMB" || this.bankCode == "CZB" || this.bankCode == "GDB" || this.bankCode == "HKBEA" || this.bankCode == "HXB" || this.bankCode == "ICBC" || this.bankCode == "NJCB" || this.bankCode == "PINGAN") {
                    this.bgImg = false
                }else{
                   this.bgImg = true
                }

                // 判断银行卡
                if (this.expressFlag == "Y") {
                    //判断银行(取现卡)
                    if (this.bankCode == "BCCB") {
                        this.bank = "北京银行借记卡"
                    }else if (this.bankCode == "ICBC") {
                        this.bank = "中国工商银行取现卡"
                    }else if (this.bankCode == "ABC") {
                        this.bank = "中国农业银行取现卡"
                    }else if (this.bankCode == "CMB") {
                        this.bank = "招商银行取现卡"
                    }else if (this.bankCode == "CCB") {
                        this.bank = "中国建设银行取现卡"
                    }else if (this.bankCode == "BCCB") {
                        this.bank = "北京银行取现卡"
                    }else if (this.bankCode == "BJRCB") {
                        this.bank = "北京农村商业银行取现卡"
                    }else if (this.bankCode == "BOC") {
                        this.bank = "中国银行取现卡"
                    }else if (this.bankCode == "BOCOM") {
                        this.bank = "交通银行取现卡"
                    }else if (this.bankCode == "CMBC") {
                        this.bank = "民生银行取现卡"
                    }else if (this.bankCode == "BOS") {
                        this.bank = "上海银行取现卡"
                    }else if (this.bankCode == "CBHB") {
                        this.bank = "渤海银行取现卡"
                    }else if (this.bankCode == "CEB") {
                        this.bank = "光大银行取现卡"
                    }else if (this.bankCode == "CIB") {
                        this.bank = "兴业银行取现卡"
                    }else if (this.bankCode == "CITIC") {
                        this.bank = "中信银行取现卡"
                    }else if (this.bankCode == "CZB") {
                        this.bank = "浙商银行取现卡"
                    }else if (this.bankCode == "GDB") {
                        this.bank = "广发银行取现卡"
                    }else if (this.bankCode == "HKBEA") {
                        this.bank = "东亚银行取现卡"
                    }else if (this.bankCode == "HXB") {
                        this.bank = "华夏银行取现卡"
                    }else if (this.bankCode == "HZCB") {
                        this.bank = "杭州银行取现卡"
                    }else if (this.bankCode == "NJCB") {
                        this.bank = "南京银行取现卡"
                    }else if (this.bankCode == "PINGAN") {
                        this.bank = "平安银行取现卡"
                    }else if (this.bankCode == "PSBC") {
                        this.bank = "邮政储蓄银行取现卡"
                    }else if (this.bankCode == "SDB") {
                        this.bank = "深发银行取现卡"
                    }else if (this.bankCode == "SPDB") {
                        this.bank = "浦发银行取现卡"
                    }else if (this.bankCode == "SRCB") {
                        this.bank = "上海农村商业银行取现卡"
                    }
                } else {
                    //判断银行(借记卡)
                    if (this.bankCode == "ICBC") {
                        this.bank = "中国工商银行借记卡"
                    }else if (this.bankCode == "ABC") {
                        this.bank = "中国农业银行借记卡"
                    }else if (this.bankCode == "CMB") {
                        this.bank = "招商银行借记卡"
                    }else if (this.bankCode == "CCB") {
                        this.bank = "中国建设银行借记卡"
                    }else if (this.bankCode == "BCCB") {
                        this.bank = "北京银行借记卡"
                    }else if (this.bankCode == "BJRCB") {
                        this.bank = "北京农村商业银行借记卡"
                    }else if (this.bankCode == "BOC") {
                        this.bank = "中国银行借记卡"
                    }else if (this.bankCode == "BOCOM") {
                        this.bank = "交通银行借记卡"
                    }else if (this.bankCode == "CMBC") {
                        this.bank = "民生银行借记卡"
                    }else if (this.bankCode == "BOS") {
                        this.bank = "上海银行借记卡"
                    }else if (this.bankCode == "CBHB") {
                        this.bank = "渤海银行借记卡"
                    }else if (this.bankCode == "CEB") {
                        this.bank = "光大银行借记卡"
                    }else if (this.bankCode == "CIB") {
                        this.bank = "兴业银行借记卡"
                    }else if (this.bankCode == "CITIC") {
                        this.bank = "中信银行借记卡"
                    }else if (this.bankCode == "CZB") {
                        this.bank = "浙商银行借记卡"
                    }else if (this.bankCode == "GDB") {
                        this.bank = "广发银行借记卡"
                    }else if (this.bankCode == "HKBEA") {
                        this.bank = "东亚银行借记卡"
                    }else if (this.bankCode == "HXB") {
                        this.bank = "华夏银行借记卡"
                    }else if (this.bankCode == "HZCB") {
                        this.bank = "杭州银行借记卡"
                    }else if (this.bankCode == "NJCB") {
                        this.bank = "南京银行借记卡"
                    }else if (this.bankCode == "PINGAN") {
                        this.bank = "平安银行借记卡"
                    }else if (this.bankCode == "PSBC") {
                        this.bank = "邮政储蓄银行借记卡"
                    }else if (this.bankCode == "SDB") {
                        this.bank = "深发银行借记卡"
                    }else if (this.bankCode == "SPDB") {
                        this.bank = "浦发银行借记卡"
                    }else if (this.bankCode == "SRCB") {
                        this.bank = "上海农村商业银行借记卡"
                    }
                }

            }else if (res.data.result == 400) {
                this.$vux.alert.show({
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
    .main{
        position: relative;
        // background: url("../../assets/img/bank/bankCardBg1.png") no-repeat;
        width: 92%;
        margin: 1rem auto 0;
        // background-size: 100% 100%;
        color: #fff;

        img{
            width: 100%;
        }
        .card{
            width: 100%;
            position: absolute;
            z-index: 1;
            top: 0;
            .mainTop{
                width: 100%;
                font-size: 1rem;
                vertical-align: middle;
                float: left;
                margin: .8rem .8rem;
                img{
                    float: left;
                    width: 2.5rem;
                    margin-right: 0.8rem;
                }
                span{
                    float: left;
                    margin-top: .5rem;
                }
                :active{
                    content: "";
                    clear: both;
                    display: block;
                }
            }

            p{
                width: 100%;
                font-size: .9rem;
                text-align: center;
                &:last-child{
                    text-align: right;
                    padding-right: 1rem;
                    box-sizing: border-box;
                }
            }
        }

    }
}
</style>


