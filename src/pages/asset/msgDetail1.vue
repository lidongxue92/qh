<template>
    <div class="container">
        <topComponent title='公告详情' :showLeft='false'>
            <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
        </topComponent>
        <div class="gonggao">
            <p class="msgTitle">{{title}}</p>
            <p class="content">
                <span>{{data}}</span></br>
                {{content}}
            </p>
        </div>
    </div>
</template>

<script>
import topComponent from '../../components/common/top';
import * as myPub from '@/assets/js/public.js'
import axios from 'axios'
import $ from 'jquery'
export default {
    name:'msgDetail1',
    components: {
        topComponent
    },
    data(){
        return{
            title:sessionStorage.title,
            content:sessionStorage.content,
            data:sessionStorage.data
        }
    },
    created() {
    },
    mounted() {
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
    width: 100%;
    height: 100%;
    background: #f6f6f6;
    .gonggao{
        width: 94%;
        margin: 0 auto;
        margin-top: 0.5rem;
        border-radius: 0 0 .2rem .2rem;
        
        p{
            width: 100%;
            line-height: 1.8em;
            box-sizing: border-box;    
            background: #fff;       
        }
        .msgTitle{
            margin: 0 auto;
            background: url("../../assets/img/msgBg1.png") top no-repeat;
            background-size: 100%;
            padding: .3rem .8rem;
            font-size: .9rem /* 28/40 */;
        }
        .content{
           font-size: .7rem /* 26/40 */;
            margin: 0 auto;
            background: url("../../assets/img/msgBg2.png") center repeat;
            background-size: 100%;
            padding: .3rem .8rem;
            border-radius: 0 0 .2rem .2rem;
            color: #999999;
        }
    }
}
</style>