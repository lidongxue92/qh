<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <div class="middle">
            <ul class="list">
                <li>
                    <span class="tl">手机号</span>
                    <span>金额(元)</span>
                    <span class="tr">时间</span>
                </li>
                <li v-for="(item,index) in Log">
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
            title:'投资记录'
        }
    },
    computed: {
    },
    mounted () {
    },
    created() {},
    activated() {
        this.log()
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
        log(){
            const url = myPub.URL+`/product/getProductBuyRecords`;
            var params = new URLSearchParams();
            const id = this.$route.query.id
            params.append('productId',id);
            params.append('curPage','1');
            axios.post(url,params).then(res => {
                console.log(res.data);
                this.Log =res.data.Record
            }).catch((err) => {
                console.log(err);
            });
        }
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

<style scoped lang="less">
@import '~vux/src/styles/center.less';
@import '~vux/src/styles/close.less';
.detail {
    background: #f7f7f7;height:100%;
    .middle{
        margin-top: 1rem;
        .list{
            li{
                text-align: center;line-height: 2.5rem;background: #fff;padding: 0 1rem;border-top: 1px solid #eee;
                span{display: inline-block;width: 32%;font-size: 0.8rem;color: #666}
                .tl{text-align: left;}
                .tr{text-align: right;}
            }
            li:first-child{background: #eee;border-top: 0;}
        }
    }
}
</style>
