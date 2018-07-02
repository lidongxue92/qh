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
            <div :style="{'-webkit-overflow-scrolling': scrollMode}">
                <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                    <div v-for="(item,index) in Data" :key="index" class="data">
                        <ul >
                            <li>{{item.inviteTime}}</li>
                            <li>{{item.userPhone}}</li>
                            <li v-if="item.realNameStatus == 0">否</li>
                            <li v-else>是</li>
                            <li v-if="item.isInvest == 0">否</li>
                            <li v-else>是</li>
                        </ul>
                    </div>
                </mt-loadmore>
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
            Data:[],
            currPage:1,//页码
            pageSize:1,//每页条数
            totalPage: "",//总页数
            allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
            scrollMode:"auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动

        }
    },
    mounted(){
      this.loadPageList();  //初次访问查询列表
      $(".mint-loadmore-bottom .mint-loadmore-text").text("向下加载更多");
    },
    methods: {
        goBack(){
            this.$router.back()
        },
    //   分页加载数据
      loadTop() { //组件提供的下拉触发方法
        //下拉刷新
        this.loadPageList();
        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      loadBottom() {
          this.isHaveMore();
        // 上拉加载
        this.more();// 上拉触发的分页查询
        this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      },
      loadPageList(){
        // 查询邀请列表数据
        const url = myPub.URL+`/invite/getMyInviteList`;
        var params = new URLSearchParams();
        params.append('token',sessionStorage.getItem("token"));
        params.append('curPage',this.currPage);
        params.append('pageSize',this.pageSize);

        axios.post(url,params).then(res => {
            console.log(res.data);
            this.Data = res.data.User;
            this.currPage = res.data.currPage;

            // 总条数：用来判断-是否还有下一页，加个方法判断，没有下一页要禁止上拉
            this.totalPage = res.data.totalPage;
            if(this.totalPage == 1){
                this.allLoaded = true;
            }else{
                this.allLoaded = false;
            }
            this.$nextTick(function () {
                this.scrollMode = "touch";
                this.isHaveMore();
            });

        }).catch((err) => {
            console.log(err);
        });
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

        // 邀请列表
        const url = myPub.URL+`/invite/getMyInviteList`;
        var params = new URLSearchParams();
        params.append('token',sessionStorage.getItem("token"));
        params.append('curPage',this.currPage);
        params.append('pageSize',this.pageSize);

        axios.post(url,params).then(res => {
            // console.log(res.data);
            this.friendList = res.data.User;
            // console.log(this.currPage);
            // console.log(this.totalPage);
            // 将数据添加到Data中
            let len = this.friendList.length;
            for(let i=0;i<len;i++){
            　　this.Data.push(this.friendList[i]);　　//将新数据push到Data中
        　　 }

        }).catch((err) => {
            console.log(err);
        });
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
