<template>
    <div class="container">
        <div id="topTitle">
            <topComponent title='常见问题' :showLeft='false'>
                <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
            </topComponent>
        </div>
        <div class="main">
            <div class="menu">
                <div :style="{'-webkit-overflow-scrolling': scrollMode}">
                    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                        <el-collapse accordion>
                            <el-collapse-item v-for="(item,index) in Data" :key="'list'+index" @click="linkToProDetail(item)">
                                <template slot="title">
                                    <div class="questionTitle">
                                    <span class="number">Q<b>{{index + 1}}</b></span>
                                        <p>{{item.title}}</p>
                                    </div>
                                </template>
                                <div class="answer">
                                    <p>{{item.content}}</p>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </mt-loadmore>
                </div>
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
    name:'commonProblem',
    components: {
        topComponent
    },
    data(){
        return{
            index:0,
            disQuestionList:[],//每次加载出来的新数据
　　　　　　 Data:[],　　//每次加载累加后的总数据
            currPage:1,//页码
            pageSize:10,//每页条数
            totalPage: "",//总页数
            num:0,　　//num为0时表示刷新或第一次加载，每加载一次增加1，刷新时默认为0
            allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
            scrollMode:"auto", //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        }
    },
    mounted(){
          this.loadPageList();  //初次访问查询列表
      $(".mint-loadmore-bottom .mint-loadmore-text").text("向下加载更多")
    },
    methods:{
        goBack(){
            this.$router.back()
        },
        linkToProDetail(){
            console.log("123");
        },
      //分页加载数据
        loadTop() { //组件提供的下拉触发方法
            //下拉加载
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
            // 常见问题
            const url = myPub.URL+`/question/getQuestionList`;
            var params = new URLSearchParams();
            params.append('token',sessionStorage.getItem("token"));
            params.append('curPage',this.currPage);
            params.append('pageSize',this.pageSize);

            axios.post(url,params).then(res => {
                console.log(res);
                this.disQuestionList = res.data.DisQuestion;
                this.currPage = res.data.currPage;
                let len = this.disQuestionList.length;
                for(let i=0;i<len;i++){
                　　this.Data.push(this.disQuestionList[i]);　　//将新数据push到Data中
            　　 }

                // 总条数：用来判断-是否还有下一页，加个方法判断，没有下一页要禁止上拉
                this.totalPage = res.data.totalPage;
                if(this.totalPage == 1){
                    this.allLoaded = true;
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

            // 常见问题
            const url = myPub.URL+`/question/getQuestionList`;
            var params = new URLSearchParams();
            params.append('token',sessionStorage.getItem("token"));
            params.append('curPage',this.currPage);
            params.append('pageSize',this.pageSize);
            axios.post(url,params).then(res => {
                console.log(res);
                this.disQuestionList = res.data.DisQuestion;
                let len = this.disQuestionList.length;
                for(let i=0;i<len;i++){
                　　this.Data.push(this.disQuestionList[i]);　　//将新数据push到Data中
            　　 }

            }).catch((err) => {
                console.log(err);
            });
        },
        isHaveMore(){
            // 是否还有下一页，如果没有就禁止上拉刷新
            if(this.currPage === this.totalPage){
                this.allLoaded = true; //true为禁止
            }
        },
      //分页加载数据
    }
}
</script>


<style>
.mint-loadmore-top,
.mint-loadmore-bottom{
    text-align: center;
}
.mint-loadmore-top{
    margin-top: -5%;
}
.el-collapse-item__header{
    height: auto;
    line-height: 1em;
    padding-top: 1rem;
    padding-bottom: 1rem;
}
.el-collapse-item__arrow{
    line-height: 1em;
    padding-top: .8rem;
}
</style>

<style lang="less" scoped>
.el-collapse{
    border-top: none;
    border-bottom: none;
}
.container{
    width: 100%;
    height: 100%;
    background: #f6f6f6;

    .main{
        background: #fff;
        margin-top: 0.5rem;
        padding-bottom: 1rem;
        width: 100%;
        #topTitle{
            position: relative;
            z-index: 100;
        }
        .menu{
             width: 92%;
             margin: 0 auto;
            .questionTitle{
                .number{
                    display: inline-block;
                    width: 12%;
                    line-height: 1.5em;
                    vertical-align: top;
                    color: #2395FF;
                    font-size: 1.2rem;
                    b{
                        font-weight: normal;
                        font-size: .8rem;
                    }

                }
                p{
                    display: inline-block;
                    width: 79%;
                    line-height: 1.5rem;
                    font-size: .9rem;
                    vertical-align:auto;
                    padding-top: .3rem;
                }

            }
            .answer{
                width: 95%;
                margin: .9rem auto 0;
                color: #BDBDBD;
                font-size: 0.9rem;
                p{
                    text-align: justify;
                }
            }
        }
    }
}
</style>
