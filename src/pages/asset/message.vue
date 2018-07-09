<template>
<div class="container">
    <topComponent :showLeft='false'>
        <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
        <span class="right" slot="right" @click="allRead">全部已读</span>
    </topComponent>

    <div id="myMsgTab" class="title">
        <input type="button" value="消息" class="active" @click="loadPageList">
        <input type="button" value="公告" @click="loadPageList1">
    </div>

    <div class="msgList" v-if="isShow">
        <div id="xiaoXi" @click="linkToMsgDetail(item.msgTextId)" v-for="(item,index) in Log" :key="index">
            <p class="msgTitle">{{item.msgTitle}}</p>
            <p class="content"><span>{{item.msgText}}</span></p>
        </div>
    </div>
    <div class="msgList gongGao" v-if="isShow1">
        <div id="gongGao" @click="linkToMsgDetail1(item.title,item.content,item.date)" v-for="(item,index) in note" :key="index">
        <p class="msgTitle">{{item.title}}</p>
            <p class="content"><span>{{item.content}}</span></p>
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
           xiaoxi:[],
           gonggao:[],
           note:'',
           Log:'',
           isShow:true,
           isShow1:false,

        }
    },
    mounted() {
        /*我的资产-底部产品Tabs切换*/
        $("#myMsgTab input:first").addClass("active");
        $(".msgList").eq(0).show();
        $("#myMsgTab input").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
        });
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        }//回退上一级页面并刷新
    },
    activated() {
        this.loadPageList()
    },
    methods:{
        goBack(){
            this.$router.back()
        },
        linkToMsgDetail(id){
            this.$router.push({path:'/page/msgDetail',query: { id: id }})
        },
        linkToMsgDetail1(title,content,data){
            sessionStorage.setItem("title",title);
            sessionStorage.setItem("content",content);
            sessionStorage.setItem("data",data);
            this.$router.push({path:'/page/msgDetail1'})
        },
        loadPageList(){
            $(".right").show();
            this.isShow = true;
            this.isShow1 = false;
            const _this = this
            _this.$loading.show();
            const url = myPub.URL+`/msg/getMessageList` ;
            const params = new URLSearchParams();
            params.append('token',sessionStorage.token);
            params.append('pageSize','10');
            params.append('curPagel','1');
            axios.post(url,params).then(response => {
                const data = response.data
                _this.$loading.hide();
                if (data.result == '400') {
                    this.$vux.alert.show({
                        title: '',
                        content: data.resultMsg
                    })
                    setTimeout(() => {
                        this.$vux.alert.hide()
                        this.$router.push({path:"/login",query: {redirect: 'your path'}})
                    }, 3000)
                }
                if (data.result == '200') {
                    this.Log = data.message
                    // console.log(this.Log);
                }
                // console.log(data)
            }).catch((err) => {
                console.log(err)
            })
        },
        loadPageList1(){
            $(".right").hide();
            this.isShow = false;
            this.isShow1 = true;

            const _this = this
            _this.$loading.show();
            const url = myPub.URL+`/index/getInfoManageList` ;
            const params = new URLSearchParams();
            params.append('imType','2');
            params.append('pageSize','10');
            params.append('curPagel','1');
            axios.post(url,params).then(response => {
                const data = response.data
                _this.$loading.hide();
                if (data.result == '400') {
                    this.$vux.alert.show({
                        title: '',
                        content: data.resultMsg
                    })
                    setTimeout(() => {
                        this.$vux.alert.hide()
                        this.$router.push({path:"/login",query: {redirect: 'your path'}})
                    }, 3000)
                }
                if (data.result == '200') {
                    this.note = data.InfoManage
                    // console.log(this.note )
                }
                console.log(data)
            }).catch((err) => {
                console.log(err)
            })
        },
        allRead(){
            const url = myPub.URL+`/msg/getMessageList` ;
            const params = new URLSearchParams();
            params.append('token',sessionStorage.token);
            params.append('pageSize','10');
            params.append('curPagel','1');
            axios.post(url,params).then(response => {
                const data = response.data
                if (data.msgStatus != 0) {
                    const url = myPub.URL+`/msg/setMsgRead` ;
                    const params = new URLSearchParams();
                    params.append('token',sessionStorage.token);
                    params.append('msgTextId','');
                    axios.post(url,params).then(res => {
                        console.log(res);
                        if (res.data.result == 200) {
                            $(".msgTitle").css("color","#999")
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
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
    .top{position: fixed;top: 0;}
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
        height: 100%;
        padding-top: 2.8rem;
    }
    #xiaoXi,#gongGao{
        width: 100%;
        margin: 0 auto;
        padding-top: 0.5rem;
        border-radius: 0 0 .2rem .2rem;
        background: #f6f6f6;
        p{
            width: 94%;
            margin-left: 3%;
            box-sizing: border-box;
            background: #fff;
            line-height: 2em;
        }
        .msgTitle{
            margin: 0 auto;
            height: auto;
            background: url("../../assets/img/msgBg1.png") top no-repeat;
            background-size: 100% 100%;
            padding: 0 .8rem .3rem;
            font-size: .9rem;
            background-color:#fff;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
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


