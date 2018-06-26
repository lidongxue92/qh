<template>
    <div class="container">
        <topComponent title='邀请好友' :showLeft='false'>
            <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
        </topComponent>
        <div class="banner"><img src="../../assets/img/invite/bg.png"></div>

        <div class="inviteTop">
            <div class="pTop">
                <p>启航金控累计为<span>100000</span>人赚取收益超过</p>
                <p class="shouYi">1000000元</p>
                <div @click="share"  class="img"><img src="../../assets/img/invite/ewm.png"></div>
            </div>
        </div>
    </div>
</template>


<script>
import topComponent from '../../components/common/top';
import $ from 'jquery';
import axios from 'axios';
import soshm from 'soshm'
export default {
    name:'invite',
    components: {
        topComponent
    },
    data(){
        return{

        }
    },
    mounted() {
        
    },  
    methods:{
        goBack(){
            this.$router.back()
        },
        share(){
            var token = "123456798";
        // ;touchstart
            addEventListener('click', function() {      
                // console.log("123456");      
                soshm.popIn({
                    url: 'http://test.qihangjf.com:29084/register.html?token=' + token,
                    sites: ['weixin', 'weixintimeline', 'qq']
                });
            }, false);
            
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