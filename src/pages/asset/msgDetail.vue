<template>
    <div class="container">
        <topComponent title='消息详情' :showLeft='false'>
            <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
        </topComponent>
        <div class="xiaoXi">
            <p class="msgTitle">登录密码修改成功</p>
            <p class="content"><span>您的登录密码修改成功，请注意查看您的登录密码修改您的登录密码修改成功，请注意查看您的登录密码修改您的登录密码修改成功，请注意查看您的登录密码修改您的登录密码修改成功，请注意查看您的登录密码修改您的登录密码修改成功，请注意查看您的登录密码修改您的登录密码修改成功，请注意查看您的登录密码修改</span></p>
        </div>
    </div>
</template>

<script>
import topComponent from '../../components/common/top';
import $ from 'jquery';
import axios from 'axios';
export default {
    name:'msgDetail',
    components: {
        topComponent
    },
    data(){
        return{

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
    .xiaoXi{
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