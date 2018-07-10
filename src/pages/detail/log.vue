<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <h5>
            <span class="tl">手机号</span>
            <span>金额(元)</span>
            <span class="tr">时间</span>
        </h5>

                    <div class="middle" v-for="(item,index) in Data" :key="'list'+index" @click="linkToProDetail(item)">
                        <ul class="list">
                            <li>
                                <span class="tl">{{item.tranName}}</span>
                                <span>{{item.tranAmount}}</span>
                                <span class="tr">{{item.tranTime}}</span>
                            </li>
                        </ul>
                    </div>

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
        }
    },
    created() {
        const url = myPub.URL+`/product/getProductBuyRecords`;
        var params = new URLSearchParams();
        const id = this.$route.query.id
        params.append('productId',id);
        params.append('curPage',this.currPage);
        axios.post(url,params).then(res => {
            // console.log(res);
            this.Data = res.data.Record;
            this.currPage = res.data.currPage;
            this.totalPage = res.data.totalPage;
            if (this.currPage <= this.totalPage) {
                this.currPage++;
                const url = myPub.URL+`/product/getProductBuyRecords`;
                var params = new URLSearchParams();
                const id = this.$route.query.id
                params.append('productId',id);
                params.append('curPage',this.currPage);
                axios.post(url,params).then(res => {
                    console.log(res);
                    this.Log = res.data.Record;
                    for(let i=0;i<this.Log.length;i++){
                        this.Data.push(this.Log[i]);
    　　　　　　　　 }
                });
            }
        });
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
