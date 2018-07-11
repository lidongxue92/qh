<template>
    <div class="container">
        <div class="topTitle">
            <topComponent title='好友列表' :showLeft='false'>
                <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
            </topComponent>
        </div>

        <div class="main">
            <div class="mainTitle">
                <ul class="title">
                    <li>注册时间</li>
                    <li>手机号</li>
                    <li>是否实名</li>
                    <li>是否投资</li>
                </ul>
            </div>

            <div v-for="(item,index) in friendList" :key="index" class="data" v-view-lazy>
                <ul >
                    <li>{{item.inviteTime}}</li>
                    <li>{{item.userPhone}}</li>
                    <li v-if="item.realNameStatus == 0">否</li>
                    <li v-else>是</li>
                    <li v-if="item.isInvest == 0">否</li>
                    <li v-else>是</li>
                </ul>
            </div>
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
        topComponent,
    },
    data(){
        return{
            friendList:[],
            currPage:1,//页码
            pageSize:1,//每页条数

        }
    },
    created() {
        // 查询邀请列表数据
        const url = myPub.URL+`/invite/getMyInviteList`;
        const _this = this
        _this.$loading.show();
        var params = new URLSearchParams();
        params.append('token',sessionStorage.getItem("token"));
        params.append('curPage',this.currPage);
        params.append('pageSize',this.pageSize);

        axios.post(url,params).then(res => {
            _this.$loading.hide()
            console.log(res.data);
            this.pageSize = res.data.totalCount;
            setTimeout(() => {
                // 邀请列表
                const url = myPub.URL+`/invite/getMyInviteList`;
                var params = new URLSearchParams();
                params.append('token',sessionStorage.getItem("token"));
                params.append('curPage',this.currPage);
                params.append('pageSize',this.pageSize);

                axios.post(url,params).then(res => {
                    this.friendList = res.data.User;

                }).catch((err) => {
                    console.log(err);
                });
            }, 300);



        }).catch((err) => {
            console.log(err);
        });
    },
    methods: {
        goBack(){
            this.$router.back()
        },
      more:function (){
          // 分页查询
        if(this.totalPage == 1 || this.currPage == this.totalPage){
            this.currPage = 1;
            this.allLoaded = true;
        }else{
            this.currPage = parseInt(this.currPage) + 1;
            this.allLoaded = false;
        }


      },
      isHaveMore(){
        // 是否还有下一页，如果没有就禁止上拉刷新
        if(this.currPage === this.totalPage){
            this.allLoaded = true; //true为禁止
            $(".mint-loadmore-bottom .mint-loadmore-text").text("暂无更多数据");
        }
      },
    //   分页加载数据
    }
  }
</script>


<style>
.mint-loadmore-top{
    position: relative;
    margin-top: -1.5rem;
    top: 0;
    z-index: -1;
}
</style>

<style lang="less" scoped>
.container{
    background: #f6f6f6;
    width: 100%;
    height: 100%;
    .topTitle{
        position: relative;
        z-index: 1;
    }
    .main{
        text-align: center;
        .mainTitle{
            position: relative;
            z-index: 1;
            height: auto;
            padding-top: .5rem;
            background: #f6f6f6;
            .title{
                display: flex;
                flex: 1;
                padding: 1rem 0;
                background: #eee;
                color: #666;
                font-size: .8rem /* 26/40 */;
                li{
                    width: 25%;
                }
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
