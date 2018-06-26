<template>
<div class="container">
    <topComponent :showLeft='false'>
        <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
        <span class="right" @click='read' slot="right">全部已读</span>
    </topComponent>    

    <div id="myMsgTab" class="title">
        <input type="button" value="消息" class="active">
        <input type="button" value="公告">
    </div>
    
    <div class="msgList">
        <div class="xiaoXi" @click="linkToMsgDetail">
            <p class="msgTitle">登录密码修改成功</p>
            <p class="content"><span>您的登录密码修改成功，请注意查看您的登录密码修改您的登录密码修改成功，请注意查看您的登录密码修改您的登录密码修改成功，请注意查看您的登录密码修改您的登录密码修改成功，请注意查看您的登录密码修改您的登录密码修改成功，请注意查看您的登录密码修改您的登录密码修改成功，请注意查看您的登录密码修改</span></p>
        </div>
    </div>
    <div class="msgList">
        <div class="gongGao" @click="linkToMsgDetail1">
            <p class="msgTitle">登录密码修改成功</p>
            <p class="content"><span>2017.12.21</span><br/>您的登录密码修改请注意查看您的登录密码修改您的登录密码修改成功，请注意查看您的登录密码修改您的登录密码修改成功，请注意查看您的登录密码修改</p>
        </div>
    </div>

</div>
</template>


<script>
import topComponent from '../../components/common/top'
import $ from 'jquery';
import axios from 'axios';
export default {
    name:'message',
    components: {
        topComponent
    },
    data(){
        return{
           
        }
    },
    mounted() {
        /*我的资产-底部产品Tabs切换*/
        $("#myMsgTab input:first").addClass("active");
        $(".msgList").eq(0).show();
        $("#myMsgTab input").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            var i = $("#myMsgTab input").index(this);
            $(".msgList").eq(i).show().siblings(".msgList").hide();
        });
    },  
    methods:{
        goBack(){
            this.$router.back()
        },
        read(){},
        linkToMsgDetail(){
            this.$router.push({path:'/page/msgDetail'})
        },
        linkToMsgDetail1(){
            this.$router.push({path:'/page/msgDetail1'})
        },
    }
}
</script>

<style lang="less" scoped>
*{
    padding: 0;
    margin: 0;
}
.container{
    width: 100%;
    height: 100%;
    background: #f6f6f6;
    .title{
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 8.2rem /* 326/40 */;
        height: 1.5rem /* 60/40 */;
        line-height: 1.5rem;
        margin-top: .6rem /* 10/40 */;
        display: flex;
        flex: 1;
        border-radius: 40px;
        border: 1px solid rgba(255, 255, 255, .5);
        input{
            display: inline-block;
            width: 50%;
            text-align: center;
            color: #fff;
            background: none;
            border:none;
            outline: none;
        }
    }
    .active{
        color: #2395FF !important;
        background: #fff !important;
        border-radius: 40px;
        border: 1px solid rgba(255, 255, 255, 1);
    }
    .msgList{
        display: none;
    }
    .xiaoXi,.gongGao{
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
           color: #999999;
            margin: 0 auto;
            background: url("../../assets/img/msgBg2.png") center repeat;
            background-size: 100%;
            padding: .3rem .8rem;
            border-radius: 0 0 .2rem .2rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}
// box-shadow:0px 0px 18px rgba(165,165,165,0.32);
</style>


