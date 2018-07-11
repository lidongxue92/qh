<template>
<div class="container">
    <topComponent title='风险评估' :showLeft='false'>
        <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
    </topComponent>

    <div class="main">
        <div class="img">
            <p>{{investTestResult}}分</p>
        </div>
        <div class="text">
            <h4>{{type}}</h4>
            <p>{{content}}</p>
        </div>

        <button @click="riskAgain">重新测评</button>

    </div>

</div>
</template>

<script>
import topComponent from '../../components/common/top'
import axios from 'axios';
import * as myPub from '@/assets/js/public.js'
import $ from 'jquery'
export default {
    name:'riskResult',
    components: {
        topComponent
    },
    data(){
        return{
            investTestResult : "",
            type:"",
            content:''
        }
    },
    created() {
        //获取测试结果
        const url1 = myPub.URL+`/user/getInvestTestResult`;
        const _this = this
        _this.$loading.show();
        var params1 = new URLSearchParams();
        params1.append('token',sessionStorage.getItem("token"));

        axios.post(url1,params1).then(res => {
            _this.$loading.hide()
            // console.log(res.data);
            // console.log(res.data.investTestResult);
            if (res.data.investTestResult != undefined || res.data.investTestResult != 0 || res.data.investTestResult != "0") {
                this.investTestResult = res.data.investTestResult;
                if (this.investTestResult < 28) {
                    this.type = "属于保守型的投资者",
                    this.content = "我们建议您可以考虑货币型等低风险产品。"
                }else if (this.investTestResult >= 28 && this.investTestResult <= 39) {
                    this.type = "属于稳健型的投资者",
                    this.content = "我们建议您考虑的投资产品应该可让资本金不被通货膨胀侵蚀，产品预期收益率较高但价格波动性也高于保守型的投资者。您可以考虑风险较低的债券型产品，并少量介入风险程度较高的产品。"
                }else{
                    this.type = "属于积极的投资者",
                    this.content = "我们建议您考虑投资产品的投资收益率远高于通货膨胀率，您既可以考虑低风险产品，也可以考虑部分持有风险程度较高的产品。"
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
        riskAgain(){
            location.href = "http://test.qihangjf.com:29084/risk.html?token=" + sessionStorage.token;
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
        width: 100%;
        height: 100%;
        background: url("../../assets/img/risk/riskBg.png") no-repeat center;
        background-size: 100% 100%;
        padding-top: 2rem;
        .img{
            width: 7.2rem;
            height: 7.2rem;
            margin: 0 auto;
            background: url("../../assets/img/risk/resultBg.png") no-repeat center;
            background-size: 100%;
            text-align: center;
            p{
                line-height: 7.2rem;
                color: #fff;
                font-size: 1.8rem;
            }
        }
        .text{
            text-align: center;
            color: #333;
            p{
                width: 80%;
                margin: 0 auto;
                font-size: .8rem;
                color: #666;
                margin-top: .8rem;
            }
        }
        button{
            width: 80%;
            margin-left: 10%;
            margin-top: 2.5rem;
            color: #fff;
            background: #2773FF;
            border: none;
            border-radius: 50px;
            padding: .6rem;
        }
    }
}
</style>


