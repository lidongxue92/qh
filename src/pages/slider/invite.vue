<template>
    <div class="container">
        <topComponent title='邀请好友' :showLeft='false'>
            <span class="back" @click='goBack' slot="left"><img src="../../../static/img/left.png"></span>
            <span class="right" @click='linkToFrienfList' slot="right">好友列表</span>
        </topComponent>
        <div class="banner"> <a :href="adLink"><img :src="imgSrc"></a></div>
        <div class="inviteTop">
            <div class="pTop">
                <p>启航金控累计为<span>{{regTotal}}</span>人赚取收益超过</p>
                <p class="shouYi">{{totalProfit}}</p>
                <div class="img"><img src="../../assets/img/invite/ewm.png"></div>
            </div>
        </div>
    </div>
</template>


<script>
import topComponent from '../../components/common/top';
import $ from 'jquery';
import axios from 'axios';
import * as myPub from '../../assets/js/public.js'
import soshm from 'soshm'
export default {
    name:'invite',
    components: {
        topComponent
    },
    data(){
        return{
            imgSrc:"../../../static/img/bg.png",
            adLink:"javaScript:;",
            regTotal:0,
            totalProfit:0.00,
        }
    },
    created() {
        // 运营报告
        const url = myPub.URL+`/index/getOperationReport`;
        var params = new URLSearchParams();
        // params.append('','');
        axios.post(url,params).then(res => {
            // console.log(res);
            this.regTotal = res.data.ReportInfo.regTotal;
            this.totalProfit = res.data.ReportInfo.totalProfit;
        }).catch((err) => {
            console.log(err);
        });

        // 邀请图片
        const url1 = myPub.URL+`/front/getAdvList`;
        var params1 = new URLSearchParams();
        params1.append('adType','1');
        params1.append('adPosition','11');
        params1.append('adPort','h5');
        axios.post(url1,params1).then(res => {
            console.log(res);
            if (res.data.Advertise[0] != "") {
                this.adLink = res.data.Advertise[0].adLink;
                this.imgSrc = res.data.Advertise[0].adImg;
            }

        }).catch((err) => {
            console.log(err);
        });
    },
    mounted() {

    },
    methods:{
        goBack(){
            this.$router.back()
        },
        linkToFrienfList(){
            this.$router.push({path:'/page/friendList'})
        }
    }
}
</script>

<style>
.soshm-pop{
    background: none;
}
.soshm-pop-sites{
    top: 94%;
    background: #fff;
}
</style>

<style lang="less" scoped>
.container{
    .right{
        position: absolute;
        top: 0;
        right: 1rem;
        font-size: .7rem /* 26/40 */;
        line-height: 2.8rem;
    }
    background: #F6F6F6;
    width: 100%;
    height: 100%;
    .banner{
        width: 100%;
        img{
            width: 100%;
        }
    }
    .inviteTop{
        width: 81.6%;
        height: 15rem;
        background: url("../../assets/img/invite/mainBg.png") no-repeat;
        background-size: 100%;
        margin: 2.1rem auto 1.9rem;
        .pTop{
            color: #333;
            font-size: .8rem;
            text-align: center;
            padding-top: 1.3rem /* 50/40 */;
            span{
                color: #FF6936;
            }
            .shouYi{
                color: #FF6936;
                font-size: 1.1rem;
                margin-top: .7rem ;
            }
            .img{
                width: 7.8rem /* 310/40 */;
                margin: 1.3rem auto;
                img{
                    width: 100%;
                }
            }

        }

    }
}

</style>
