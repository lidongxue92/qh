<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <h5>
            <span class="tl">手机号</span>
            <span>金额(元)</span>
            <span class="tr">时间</span>
        </h5>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
            <el-collapse accordion>
                <el-collapse-item v-for="(item,index) in Log" :key="'list'+index" @click="linkToProDetail(item)">
                <template slot="title">
                    <div class="middle">
                        <ul class="list">
                            <li>
                                <span class="tl">{{item.tranName}}</span>
                                <span>{{item.tranAmount}}</span>
                                <span class="tr">{{item.tranTime}}</span>
                            </li>
                        </ul>
                    </div>
                </template>>
                </el-collapse-item>
            </el-collapse>
        </mt-loadmore>
    </div>
</template>

<script>
import { PopupPicker, Tab, TabItem, Swiper, SwiperItem,Qrcode, Divider,XDialog, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData,TransferDomDirective as TransferDom } from 'vux'
import { mapState, mapMutations, mapGetters } from 'vuex'
import * as myPub from '@/assets/js/public.js'
import axios from 'axios'
import $ from 'jquery'
import top from '../../components/common/top1'
export default {
    name: 'detail',
    directives: {
        TransferDom
    },
    data() {
        return {
            Log: '',
            money:'1000',
            title:'投资记录',
            Data:[],　　//每次加载累加后的总数据
            currPage:1,//页码
            pageSize:10,//每页条数
            totalPage: "",//总页数
            num:0,　　//num为0时表示刷新或第一次加载，每加载一次增加1，刷新时默认为0
            allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
            scrollMode:"auto"
        }
    },
    computed: {
    },
    mounted () {
    },
    created() {},
    activated() {
        this.loadPageList()
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        }//回退上一级页面并刷新
    },
    methods: {
        linkTodetail1() {
            this.$router.push({ path: '/page/detail1' })
        },
        // log(){
        //     const url = myPub.URL+`/product/getProductBuyRecords`;
        //     var params = new URLSearchParams();
        //     const id = this.$route.query.id
        //     params.append('productId',id);
        //     params.append('curPage','1');
        //     axios.post(url,params).then(res => {
        //         console.log(res.data);
        //         this.Log =res.data.Record
        //     }).catch((err) => {
        //         console.log(err);
        //     });
        // },
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
            const url = myPub.URL+`/product/getProductBuyRecords`;
            var params = new URLSearchParams();
            const id = this.$route.query.id
            params.append('productId',id);
            params.append('curPage','1');
            axios.post(url,params).then(res => {
                console.log(res.data);
                this.Log = res.data.Record;
                this.currPage = res.data.currPage;
                console .log(this.Log)
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
            const url = myPub.URL+`/product/getProductBuyRecords`;
            var params = new URLSearchParams();
            const id = this.$route.query.id
            params.append('productId',id);
            params.append('curPage','1');
            axios.post(url,params).then(res => {
                console.log(res);
                this.Log = res.data.Record;　
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
    },
    components: {
        PopupPicker,
        Tab,
        TabItem,
        Swiper,
        SwiperItem,
        Qrcode,
        Divider,
        XDialog,
        Popup,
        Group,
        XSwitch,
        Popup,
        Group,
        Cell,
        XSwitch,
        Toast,
        XAddress,
        XButton,
        top
    }
}
</script>
<style type="text/css">
    .el-collapse-item__header{border-bottom:0; }
    .mint-loadmore-top{text-align: center;line-height: 2rem;font-size: 0.8rem;color: #999}
    .mint-loadmore-bottom{text-align: center;line-height: 2rem;font-size: 0.8rem;color: #999}
    .el-collapse-item__content{display: none;}
    .el-collapse-item__arrow{display: none;}
</style>
<style scoped lang="less">
@import '~vux/src/styles/center.less';
@import '~vux/src/styles/close.less';
.detail {
    background: #f7f7f7;height:100%;
    h5{
        text-align: center;line-height: 2.5rem;background: #eee;padding: 0 1rem;border-top: 1px solid #eee;margin-top: 1rem;
        span{display: inline-block;width: 32%;font-size: 0.8rem;color: #666}
    }
    .middle{
        .list{
            li{
                text-align: center;line-height: 2.5rem;background: #fff;padding: 0 1rem;border-top: 1px solid #eee;
                span{display: inline-block;width: 32%;font-size: 0.8rem;color: #666}
                .tl{text-align: left;}
                .tr{text-align: right;}
            }
        }
    }
}
</style>
