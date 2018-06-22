<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <ul class="tab">
            <li class="red active" @click="red">红包</li>
            <li class="add" @click="add">加息券</li>
        </ul>
        <div class="middle">
            <p class="no">不使用红包卡券</p>
            <ul class="list">
                <li>
                    <p class="title">新手红包</p>
                    <p class="left">¥<b>1000</b></p>
                    <p class="right">
                        <span>使用条件：投资满10000元可使用</span>
                        <span>投资满10000元可使用</span>
                    </p>
                    <p class="note">有效期至：2017.12.12 00:00
                    <span class="button">立即使用</span></p>
                </li>
                <li>
                    <p class="title">新手红包</p>
                    <p class="left">¥<b>1000</b></p>
                    <p class="right">
                        <span>使用条件：投资满10000元可使用</span>
                        <span>投资满10000元可使用</span>
                    </p>
                    <p class="note">有效期至：2017.12.12 00:00
                    <span class="button">立即使用</span></p>
                </li>
            </ul>
        </div>
        <p class="notes">查看历史红包</p>
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
            title:'平台福利'
        }
    },
    computed: {
    },
    mounted () {
    },
    created() {},
    activated() {
        // this.getALLProducts()
    },
    methods: {
        linkTodetail1() {
            this.$router.push({ path: '/page/detail1' })
        },
        red(){
            $(".red").addClass('active')
            $('.add').removeClass('active')
        },
        add(){
            $(".add").addClass('active')
            $('.red').removeClass('active')
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
    background: #f7f7f7;
    .tab{
        background: #fff;margin-top: 1rem;
        li{list-style: none;width: 49%;text-align: center;font-size: 0.9rem;line-height: 2.5rem;height: 2.5rem;color: #999;display: inline-block;}
        .active{color: #FFA303;border-bottom: 2px solid #FFA303}
    }
    .middle{
        padding: 1rem;
        .no{background: #fff;font-size: 0.8rem;height: 2rem;line-height: 2rem;text-align: center;border-right: 5px;}
        .list{
            margin-top: 0.8rem;
            li{
                background: url(~@/assets/img/red.png);list-style: none;height:7rem;background-size: 100%;padding:1.5rem 2rem;background-repeat:no-repeat;
                .title{font-size: 0.8rem;color: #fff;}
                .left{
                    color: #fff;display: inline-block;width: 30%;position: relative;bottom: 0.5rem;
                    b{font-size: 1.6rem;color: #fff;}
                }
                .left:after{content: '';display: inline-block;position: absolute;width: 1px;height: 50%;background-color: #fff;top: 25%;right: 0;}
                .right{
                    display: inline-block;width: 66%;
                    span{display:inline-block; width: 100%;font-size: 0.6rem;color: #fff;padding-left: 0.8rem;}
                }
                .note{
                    font-size: 0.6rem;color: #333;padding: 0;margin-top: 0.5rem;
                    .button{display: inline-block;float: right;width: 4.5rem;height: 1.4rem;border-radius: 30px;border: 1px solid #F0463D;color: #F0463D;text-align: center;line-height: 1.4rem;}
                }
            }
            @media screen and (max-width: 320px) {
                li{
                    padding: 1rem 1rem;
                    .left{
                        width: 23%;bottom: 1rem;
                        b{font-size: 1rem;}
                    }
                    .right{width: 75%;}
                    .note{
                        font-size: 0.6rem;color: #333;padding: 0rem;margin-top: 0.5rem;
                        .button{position: relative;bottom: 0.3rem;}
                    }
                }
            }
        }
    }
    .notes{font-size: 0.7rem;color: #FFA303;text-align: center;position: fixed;bottom: 1rem;width: 100%;}
}
</style>
