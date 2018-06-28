<template>
    <div class="container">
        <topComponent title='好友列表' :showLeft='false'>
            <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
        </topComponent>

        <div class="main">
            <ul class="title">
                <li>注册时间</li>
                <li>手机号</li>
                <li>是否实名</li>
                <li>是否投资</li>
            </ul>
            <!-- <div class="data" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                <ul v-for="(item,index) in friendList" :key="index">
                    <li>{{item.inviteTime}}</li>
                    <li>{{item.userPhone}}</li>
                    <li v-if="item.realNameStatus == 0">否</li>
                    <li v-else>是</li>
                    <li v-if="item.isInvest == 0">否</li>
                    <li v-else>是</li>
                </ul>
            </div> -->

            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" class="data">
                <ul v-for="(item,index) in friendList" :key="index">
                    <li>{{item.inviteTime}}</li>
                    <li>{{item.userPhone}}</li>
                    <li v-if="item.realNameStatus == 0">否</li>
                    <li v-else>是</li>
                    <li v-if="item.isInvest == 0">否</li>
                    <li v-else>是</li>
                </ul>
            </mt-loadmore>
        </div>
    </div>


</template>

<script>
import topComponent from '../../components/common/top';
import $ from 'jquery';
import axios from 'axios';
import * as myPub from '../../assets/js/public.js'
export default {
    name:'friendList',
    components: {
        topComponent
    },
    data(){
        return{
            friendList:[]
        }
    },
    created() {
        // 邀请列表
        const url = myPub.URL+`/invite/getMyInviteList`;
        var params = new URLSearchParams();
        params.append('token',sessionStorage.getItem("token"));
        params.append('curPage',1);
        params.append('pageSize',1);

        axios.post(url,params).then(res => {
            // console.log(res.data.User);
            this.friendList = res.data.User;

        }).catch((err) => {
            console.log(err);
        });
    },
    methods:{
        goBack(){
            this.$router.back()
        },

        // 加载更多数据(下拉刷新)
        loadTop() {
            this.$refs.loadmore.onTopLoaded();
        },
        // 加载更多数据(上拉刷新)
        loadBottom() {
            this.allLoaded = true;// 若数据已全部获取完毕
            this.$refs.loadmore.onBottomLoaded();
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
        text-align: center;
        .title{
            display: flex;
            flex: 1;
            padding: 1rem 0;
            background: #eee;
            color: #666;
            font-size: .8rem /* 26/40 */;
            margin-top: .5rem;

            li{
                width: 25%;
            }
        }
        .data{
            background: #fff;
            ul{
                display: flex;
                flex: 1;
                font-size: .8rem /* 26/40 */;
                color: #333;
                padding: 0 .5rem;
                box-sizing: border-box;
                li{
                    width: 25%;         
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    border-bottom: 1px solid #eee;
                    padding: 1rem 0;
                }
            }
        }
    }
}
</style>