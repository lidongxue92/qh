<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <div class="middle">
            <div class="nodata" v-if="isshow1">
                <img src="~@/assets/img/no_data.png">
                <p>您还没有持有理财产品哦</p>
                <p>赶紧去产品中心挑选吧~</p>
                <button class="button" @click="category">去理财</button>
            </div>
            <div class="Datalist">
                <ul class="tab">
                    <li v-bind:class="{ active: is_show}" @click="Transferable">可转让列表</li>
                    <li v-bind:class="{ active: is_show2}" @click="Notransferable">已转让列表</li>
                </ul>
                <ul class="list">
                    <li>
                        <h5>产品名称<span>到期时间 <b>2017.12.12</b></span></h5>
                        <p>
                            <span class="big">1000000</span>
                            <span>投资金额</span>
                        </p>
                        <p>
                            <span class="color">188.88</span>
                            <span>预计到期收益</span>
                        </p>
                        <p>
                            <span class="button" @click="TransferAgreement">转让</span>
                        </p>
                    </li>
                    <li>
                        <h5>产品名称<span>到期时间 <b>2017.12.12</b></span></h5>
                        <p>
                            <span class="big">1000000</span>
                            <span>投资金额</span>
                        </p>
                        <p>
                            <span class="color">188.88</span>
                            <span>预计到期收益</span>
                        </p>
                        <p>
                            <span class="button" @click="TransferAgreement">转让</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { PopupPicker, Tab, TabItem, Swiper, SwiperItem,Qrcode, Divider,XDialog, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData,TransferDomDirective as TransferDom } from 'vux'
import { mapState, mapMutations, mapGetters } from 'vuex'
import * as myPub from '@/assets/js/public.js'
import $ from 'jquery'
import top from '../../components/common/top1'
export default {
    name: 'detail',
    directives: {
        TransferDom
    },
    data() {
        return {
            product: null,
            money:'1000',
            title:'债权转让',
            is_show:true,
            isshow1:false,
            is_show2:false
        }
    },
    computed: {
    },
    mounted () {
    },
    created() {
        const id = this.$route.query.id
        console.log(id)
        if (id) {
            this.is_show2 = true
            this.is_show = false
        }
    },
    activated() {
        // this.getALLProducts()
    },
    methods: {
        TransferAgreement() {
            this.$router.push({ path: '/page/TransferAgreement' })
        },
        Transferable(){
            const _this = this
            _this.is_show2 = false
            _this.is_show = true
            _this.$loading.show();//显示
            setTimeout(function(){  //模拟请求
                  _this.$loading.hide(); //隐藏
            },2000)
        },
        Notransferable(){
            const _this = this
            _this.$loading.show();//显示
            setTimeout(function(){  //模拟请求
                  _this.$loading.hide(); //隐藏
            },2000)
            _this.is_show2 = true
            _this.is_show = false
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
        margin-top: 0.5rem;
        .nodata{
            text-align: center;
            img{margin-top: 3rem;width: 4.2rem;height: 4.5rem;}
            p{font-size: 0.8rem;color: #999;line-height:1rem;margin-top: 0.8rem;}
            .button{width: 10rem;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);border: 0;border-radius: 30px;line-height: 2.2rem;height: 2.2rem;color: #fff;font-size: 0.9rem;margin-top: 2rem;}
        }
        .Datalist{
            .tab{
                background: #fff;
                li{text-align: center;line-height: 2.5rem;background: #fff;border-top: 1px solid #eee;width: 49%;display: inline-block;font-size: 0.9rem;color: #999}
                .active{color: #FFA303;border-bottom: 2px solid #FFA303}
            }
            .list{
                li{
                    margin-top: 0.5rem;background: #fff;
                    h5{
                        font-size: 0.8rem;color: #666;height: 2.5rem;line-height: 2.5rem;font-weight: normal;padding: 0 0.8rem;border-bottom: 1px solid #eee;
                        span{float: right;color: #999;font-size: 0.6rem;b{color: #333;font-weight: normal;}}
                    }
                    p{
                        display: inline-block;width: 32%;text-align: center;padding: 1rem 0 0.5rem 0;
                        span{display: inline-block;width: 100%;font-size: 0.6rem;color: #999}
                        .big{font-size: 0.9rem;color: #333;}
                        .color{font-size: 0.9rem;color: #FFA303}
                        .button{border: 0;width: 80%;margin-left: 10%;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);height: 30px;text-align: center;color: #fff;font-size: 0.9rem;border-radius: 30px;line-height: 30px;position: relative;bottom: 0.8rem;}
                    }
                    .tl{text-align: left;}
                    .tr{text-align: right;}
                    .tc{text-align: center;}
                }
            }
        }
    }
}
</style>
