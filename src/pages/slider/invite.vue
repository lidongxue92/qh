<template>
    <div class="container">
        <topComponent title='邀请好友' :showLeft='false'>
            <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
        </topComponent>
        <div class="banner"><img src="../../assets/img/invite/bg.png"></div>

        <div class="inviteTop">
            <div>
                <p>启航金控累计为{{100000}}人赚取收益超过</p>
                <p>1000000元</p>
                <!-- <img src="../../assets/img/weiXinEwm.png"> -->
            </div>
        </div>

    </div>
</template>

<script>
import topComponent from '../../components/common/top';
import $ from 'jquery';
import axios from 'axios';
export default {
    name:'invite',
    components: {
        topComponent
    },
    data(){
        return{

        }
    },
    methods:{
        goBack(){
            this.$router.back()
        }
    }
}
</script>

<style lang="less" scoped>
.container{
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
        p{
            text-align: center;
        }
    }
}

</style>