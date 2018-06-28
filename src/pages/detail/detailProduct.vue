<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <div class="middle">
            <!-- 产品介绍 -->
            <div class="product">
                <h5>产品介绍</h5>
                <p>{{product.productDetail}}</p>
                <span>《投资风险说明》</span>
            </div>
            <ul class="list">
                <li>借款人信息</li>
                <li>姓名 <span>{{user.creditorName}}</span></li>
                <li>身份证号 <span>{{user.creditorIdCard}}</span></li>
                <li>性别 <span>{{user.creditorSex}}</span></li>
                <li>借款用途 <span>{{user.assetFundsUse}}</span></li>
                <li>年龄 <span>{{user.creditorAge}}</span></li>
                <li>婚姻状况 <span v-if="isshow1">未婚</span><span v-if="isshow2">已婚</span><span v-if="isshow3">离异</span></li>
                <li>籍贯 <span>{{user.creditorNativePlace}}</span></li>
            </ul>
            <ul class="list">
                <li>抵押车辆信息</li>
                <li>车辆型号<span>{{user.vehicleType}}</span></li>
                <li>车牌号 <span>{{user.vehicleNumberPlate}}</span></li>
                <li>新车价格 <span>{{user.vehiclePrice}}</span></li>
                <li>行驶里程 <span>{{user.vehicleRoalHaul}}</span></li>
                <li>抵押估价 <span>{{user.vehicleMortgageValuation}}</span></li>
            </ul>
            <table class="tablelist">
                <tbody>
                    <tr>
                        <th>审核资料</th>
                        <th>审核结果</th>
                    </tr>
                    <tr class="child1">
                        <td >{{asset.creditorIdCard}}</td>
                    </tr>
                    <tr class="child2">
                        <td>{{asset.vehicleDrivingLicencePic}}</td>
                    </tr>
                    <tr class="child3">
                        <td>{{asset.vehicleIdCardPic}}</td>
                    </tr>
                    <tr class="child4">
                        <td>{{asset.vehicleApplyPic}}</td>
                    </tr>
                    <tr class="child5">
                        <td>{{asset.vehicleReceiptPic}}</td>
                    </tr>
                    <tr class="child6">
                        <td>{{asset.vehicleTravelLicensePic}}</td>
                    </tr>
                    <tr class="child7">
                        <td>{{asset.vehicleWarrantyPic}}</td>
                    </tr>
                    <tr class="child8">
                        <td>{{asset.vehiclePeccancyPic}}</td>
                    </tr>
                    <tr class="child9">
                        <td>{{asset.vehiclePersonPic}}</td>
                    </tr>
                    <tr class="child10">
                        <td>{{asset.vehicleAppearanceBeforePic}}</td>
                    </tr>
                    <tr class="child11">
                        <td>{{asset.vehicleAppearanceAfterPic}}</td>
                    </tr>
                    <tr class="child12">
                        <td>{{asset.vehicleOdometerPic}} </td>
                    </tr>
                    <tr class="child13">
                        <td>{{asset.vehicleTrunkPic}}</td>
                    </tr>
                    <tr class="child14">
                        <td>{{asset.vehicleNameplatePic}}</td>
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
import $ from 'jquery'
import top from '../../components/common/top1'
import * as myPub from '@/assets/js/public.js'
import axios from 'axios'
export default {
    name: 'detail',
    directives: {
        TransferDom
    },
    data() {
        return {
            product:'',
            user:'',
            asset:'',
            money:'1000',
            title:'详情介绍',
            isshow1:false,
            isshow2:false,
            isshow3:false,
            isshow4:false
        }
    },
    computed: {
    },
    mounted () {
    },
    created() {},
    activated: function() {
        this.productdata()
    },
    methods: {
    // 产品数据
        productdata(){
            const _this = this
            _this.$loading.show();
            const id = this.$route.query.id
            const url = myPub.URL+`/product/getProjectIntroduction` ;
            const params = new URLSearchParams();
            params.append('productId',id);
            params.append('token',sessionStorage.token); 
            axios.post(url,params).then(response => {
                 _this.$loading.hide();
                const data = response.data
                console.log(data)
                if (data.result == '400') {
                    this.$vux.alert.show({
                        title: '',
                        content: data.resultMsg
                    })
                    setTimeout(() => {
                        this.$vux.alert.hide()
                        this.$router.push({path:"/login"})
                    }, 3000)
                }
                if (data.result == '200') {
                    this.product = data
                    this.user = data.User
                    this.asset =data.asset
                    if (data.User.creditorMaritalStatus == '0') {
                        this.isshow1 = true
                        this.isshow2 = false
                        this.isshow3 = false
                    }
                    if (data.User.creditorMaritalStatus == '1') {
                        this.isshow1 = false
                        this.isshow2 = true
                        this.isshow3 = false
                    }
                    if (data.User.creditorMaritalStatus == '2') {
                        this.isshow1 = false
                        this.isshow2 = false
                        this.isshow3 = true
                    }
                    // 判断asset数据是否存在
                    const pro = '<td style="width: 50%;text-align: center;color: #999;font-size: 0.7rem;line-height: 2.2rem;color:#FFA303;text-align:center">通过</td>'
                    if (data.asset.creditorIdCard) {
                        $('.child1').append(pro)
                    }
                    if (data.asset.vehicleDrivingLicencePic) {
                        $('.child2').append(pro)
                    }
                    if (data.asset.vehicleIdCardPic) {
                        $('.child3').append(pro)
                    }
                    if (data.asset.vehicleApplyPic) {
                        $('.child4').append(pro)
                    }
                    if (data.asset.vehicleReceiptPic) {
                        $('.child5').append(pro)
                    }
                    if (data.asset.vehicleTravelLicensePic) {
                        $('.child6').append(pro)
                    }
                    if (data.asset.vehicleWarrantyPic) {
                        $('.child7').append(pro)
                    }
                    if (data.asset.vehicleWarrantyPic) {
                        $('.child8').append(pro)
                    }
                    if (data.asset.vehiclePersonPic) {
                        $('.child9').append(pro)
                    }
                    if (data.asset.vehicleAppearanceBeforePic) {
                        $('.child10').append(pro)
                    }
                    if (data.asset.vehicleAppearanceAfterPic) {
                        $('.child11').append(pro)
                    }
                    if (data.asset.vehicleOdometerPicc) {
                        $('.child12').append(pro)
                    }
                    if (data.asset.vehicleTrunkPic) {
                        $('.child13').append(pro)
                    }
                    if (data.asset.vehicleNameplatePic) {
                        $('.child14').append(pro)
                    }
                }
          }).catch((err) => {
            console.log(err)
          })
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
    .middle{
        padding: 0 0.5rem;margin-top: 1rem;height: 100%;
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
