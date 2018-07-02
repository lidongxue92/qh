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
        <div class="xiaoXi" @click="linkToMsgDetail(item.imId)" v-for="(item,index) in Log">
            <p class="msgTitle">{{item.imTitle}}</p>
            <p class="content"><span>{{item.imAbstract}}</span></p>
        </div>
    </div>
    <div class="msgList" @click="note">
        <div class="gongGao" @click="linkToMsgDetail1(item.imId)" v-for="(item,index) in Log">
            <p class="content"><span>{{item.imDate}}</span><br/>{{item.imAbstract}}</p>
        </div>
    </div>

</div>
</template>


<script>
import topComponent from '../../components/common/top'
import * as myPub from '@/assets/js/public.js'
import axios from 'axios'
import $ from 'jquery'
import Vue from 'vue'
export default {
    name:'message',
    components: {
        topComponent
    },
    data(){
        return{
           Log:'',
           note:''

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
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        }//回退上一级页面并刷新
    },
    created() {},
    activated() {
        this.loadPageList('1')
    },
    methods:{
        goBack(){
            this.$router.back()
        },

        read(){},
        linkToMsgDetail(id){
            this.$router.push({path:'/page/msgDetail',query: { id: id }})
        },
        linkToMsgDetail1(id){
            this.$router.push({path:'/page/msgDetail1',query: { id: id }})
        },
        note(){
            this.loadPageList('2')
        },
        log(){
            this.loadPageList('1')
        },
        loadPageList(status){
            const url = myPub.URL+`/index/getInfoManageList`;
            var params = new URLSearchParams();
            const id = this.$route.query.id
            params.append('imType',status);
            params.append('pageSize','1');
            params.append('curPage','1');
            axios.post(url,params).then(res => {
                console.log(res.data);
                this.Log = res.data.InfoManage;
            }).catch((err) => {
                console.log(err);
            });
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


