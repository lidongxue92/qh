<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <div class="middle">
            <!-- 产品介绍 -->
            <div class="product">
                <h5>产品介绍</h5>
                <p>本标的为个人资金周转借款，借款人以车辆为抵押物。投资人通过道道金控投资此标获得对应收益。每个借款人经过微贷实体门店风控人员多层严格筛选。通过车辆抵质押保障还款来源，稳健可靠。</p>
                <span>《投资风险说明》</span>
            </div>
            <ul class="list">
                <li>借款人信息</li>
                <li>姓名 <span>张三</span></li>
                <li>身份证号 <span>身份证号</span></li>
                <li>性别 <span>男</span></li>
                <li>借款用途 <span>车贷还款</span></li>
                <li>年龄 <span>30</span></li>
                <li>婚姻状况 <span>已婚</span></li>
                <li>籍贯 <span>中国 上海</span></li>
            </ul>
            <ul class="list">
                <li>抵押车辆信息</li>
                <li>车辆型号<span>通用五菱</span></li>
                <li>车牌号 <span>苏****GY</span></li>
                <li>新车价格 <span>10万元</span></li>
                <li>行驶里程 <span>20000公里</span></li>
                <li>抵押估价 <span>5万元</span></li>
            </ul>
            <table class="tablelist">
                <tbody>
                    <tr>
                        <th>审核资料</th>
                        <th>审核结果</th>
                    </tr>
                    <tr>
                        <td>车辆外观前照</td>
                        <td class="yes">通过</td>
                    </tr>
                    <tr>
                        <td>车辆外观后照</td>
                        <td class="yes">通过</td>
                    </tr>
                    <tr>
                        <td>里程表照片</td>
                        <td class="yes">通过</td>
                    </tr>
                    <tr>
                        <td>铭牌照片</td>
                        <td class="yes">通过</td>
                    </tr>
                    <tr>
                        <td>车辆后备箱照片</td>
                        <td class="yes">通过</td>
                    </tr>
                    <tr>
                        <td>二代身份证</td>
                        <td class="yes">通过</td>
                    </tr>
                    <tr>
                        <td>驾驶证</td>
                        <td class="yes">通过</td>
                    </tr>
                    <tr>
                        <td>身份证验证图</td>
                        <td class="yes">通过</td>
                    </tr>
                    <tr>
                        <td>申请表</td>
                        <td class="yes">通过</td>
                    </tr>
                    <tr>
                        <td>登记证书</td>
                        <td class="yes">通过</td>
                    </tr>
                    <tr>
                        <td>行驶证</td>
                        <td class="yes">通过</td>
                    </tr>
                    <tr>
                        <td>保单</td>
                        <td class="yes">通过</td>
                    </tr>
                    <tr>
                        <td>违章信息</td>
                        <td class="yes">通过</td>
                    </tr>
                    <tr>
                        <td>人车合照</td>
                        <td class="yes">通过</td>
                    </tr>
                    <tr>
                        <td>借条</td>
                        <td class="yes">通过</td>
                    </tr>
                    <tr>
                        <td>合同资料</td>
                        <td class="going">审核中</td>
                    </tr>
                    <tr>
                        <td>其他资料</td>
                        <td>未通过</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p class="note">理财有风险  投资需谨慎</p>
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
            title:'详情介绍'
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
    .middle{
        padding: 0 0.5rem;margin-top: 1rem;
        .product{
            background: #FFF;border-radius: 5px;padding: 0.5rem;
            h5{font-weight: normal;font-size: 0.8rem;border-bottom: 1px solid #eee;line-height: 2.2rem;}
            p{padding: 1rem 0.5rem 0 0.5rem;font-size: 0.6rem;color: #999}
            span{margin-right: 0.5rem;color: #FFA303;font-size: 0.7rem;display: inline-block;width: 100%;text-align: right;}
        }
        .list{
            margin-top: 0.5rem;background: #fff;border-radius: 3px;padding: 0.5rem 0.6rem;color: #333;border-radius: 5px;
            li{
                list-style: none;font-size: 0.7rem;padding: 0.6rem 0;color: #666;
                span{float: right;}
            }
            li:first-child{border-bottom: 1px solid #eee;font-size: 0.8rem;color: #333}
        }
        .tablelist{
            margin-top: 0.5rem;background: #fff;border-radius: 3px;padding: 0.5rem 0.6rem;color: #333;border-radius: 5px;width: 100%;
            th{border-bottom: 1px solid #eee;font-size: 0.8rem;font-weight: normal;line-height: 2.2rem;}
            td{width: 50%;text-align: center;color: #999;font-size: 0.7rem;line-height: 2.2rem}
            .yes{color: #FFA303}
            .going{color: #2B9AFF}
        }
    }
    .note{padding: 1rem 3rem;color: #999;font-size: 0.5rem;text-align: center;}
}
</style>
