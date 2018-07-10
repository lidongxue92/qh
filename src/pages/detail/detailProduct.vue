<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <div class="middle">
            <!-- 产品介绍 -->
            <div class="product">
                <h5>产品介绍</h5>
                <p>{{product.productDetail}}</p>
                <span @click="info">《投资风险说明》</span>
            </div>
            <ul class="list">
                <li><h5>借款人信息</h5></li>
                <li>姓名 <span>{{user.creditorName}}</span></li>
                <li>身份证号 <span>{{user.creditorIdCard}}</span></li>
                <li>性别 <span class="creditorSex">男</span></li>
                <li>借款用途 <span>{{user.assetFundsUse}}</span></li>
                <li>年龄 <span>{{user.creditorAge}}</span></li>
                <li>婚姻状况 <span v-if="isshow1">未婚</span><span v-if="isshow2">已婚</span><span v-if="isshow3">离异</span></li>
                <li>籍贯 <span>{{user.creditorNativePlace}}</span></li>
            </ul>
            <ul class="list">
                <li><h5>抵押车辆信息</h5></li>
                <li>车辆型号<span>{{user.vehicleType}}</span></li>
                <li>车牌号 <span>{{user.vehicleNumberPlate}}</span></li>
                <li>新车价格 <span>{{user.vehiclePrice}}</span></li>
                <li>行驶里程 <span>{{user.vehicleRoalHaul}}</span></li>
                <li>抵押估价 <span>{{user.vehicleMortgageValuation}}</span></li>
            </ul>
            <div class="tablelist">
                <ul class="tablelistTitle">
                    <li><h5>审核资料</h5></li>
                    <li><h5>审核结果</h5></li>
                </ul>
                <div>
                    <ul class="child1">
                        <li>二代身份证</li>
                        <li>通过</li>
                    </ul>
                    <ul class="child2">
                        <li>驾驶证</li>
                        <li>通过</li>
                    </ul>
                    <ul class="child3">
                        <li>身份证验证图</li>
                        <li>通过</li>
                    </ul>
                    <ul class="child4">
                        <li>申请表</li>
                        <li>通过</li>
                    </ul>
                    <ul class="child5">
                        <li>通讯录</li>
                        <li>通过</li>
                    </ul>
                    <ul class="child6">
                        <li>行驶证验证图</li>
                        <li>通过</li>
                    </ul>
                    <ul class="child7">
                        <li>保单</li>
                        <li>通过</li>
                    </ul>
                    <ul class="child8">
                        <li>违章信息</li>
                        <li>通过</li>
                    </ul>
                    <ul class="child9">
                        <li>人车合照</li>
                        <li>通过</li>
                    </ul>
                    <ul class="child10">
                        <li>车辆外观前照</li>
                        <li>通过</li>
                    </ul>
                    <ul class="child11">
                        <li>车辆外观后照</li>
                        <li>通过</li>
                    </ul>
                    <ul class="child12">
                        <li>里程表照片</li>
                        <li>通过</li>
                    </ul>
                    <ul class="child13">
                        <li>车辆后备箱照片</li>
                        <li>通过</li>
                    </ul>
                    <ul class="child14">
                        <li>铭牌照片</li>
                        <li>通过</li>
                    </ul>
                </div>
            </div>
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
    name: 'detailProduct',
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
    created() {

    },
    activated: function() {
        this.productdata()
    },
    watch: {
      '$route' (to, from) {
          this.$router.go(0);
          window.location.reload()
      }
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
                    // 性别
                    $(".creditorSex").each(function (i) {
                        if (data.User.creditorSex != 1) {
                            $(".creditorSex").eq(i).text("男")
                        }else{
                            $(".creditorSex").eq(i).text("女")
                        }
                    })


                    // 判断asset数据是否存在
                    const pro = '<li style="color:#FFA303;">通过</li>'
                    if (data.asset.creditorIdCard) {
                        $('.child1 li:eq(1)').empty().append(pro)
                    }else{
                        $('.child1').empty();
                    }
                    if (data.asset.vehicleDrivingLicencePic) {
                        $('.child2 li:eq(1)').empty().append(pro)
                    }else{
                        $('.child2').empty();
                    }
                    if (data.asset.vehicleIdCardPic) {
                        $('.child3 li:eq(1)').empty().append(pro)
                    }else{
                        $('.child3').empty();
                    }
                    if (data.asset.vehicleApplyPic) {
                        $('.child4 li:eq(1)').empty().append(pro)
                    }else{
                        $('.child4').empty();
                    }
                    if (data.asset.vehicleReceiptPic) {
                        $('.child5 li:eq(1)').empty().append(pro)
                    }else{
                        $('.child5').empty();
                    }
                    if (data.asset.vehicleTravelLicensePic) {
                        $('.child6 li:eq(1)').empty().append(pro)
                    }else{
                        $('.child6').empty();
                    }
                    if (data.asset.vehicleWarrantyPic) {
                        $('.child7 li:eq(1)').empty().append(pro)
                    }else{
                        $('.child7').empty();
                    }
                    if (data.asset.vehicleWarrantyPic) {
                        $('.child8 li:eq(1)').empty().append(pro)
                    }else{
                        $('.child8').empty();
                    }
                    if (data.asset.vehiclePersonPic) {
                        $('.child9 li:eq(1)').empty().append(pro)
                    }else{
                        $('.child9').empty();
                    }
                    if (data.asset.vehicleAppearanceBeforePic) {
                        $('.child10 li:eq(1)').empty().append(pro)
                    }else{
                        $('.child10').empty();
                    }
                    if (data.asset.vehicleAppearanceAfterPic) {
                        $('.child11 li:eq(1)').empty().append(pro)
                    }else{
                        $('.child11').empty();
                    }
                    if (data.asset.vehicleOdometerPicc) {
                        $('.child12 li:eq(1)').empty().append(pro)
                    }else{
                        $('.child12').empty();
                    }
                    if (data.asset.vehicleTrunkPic) {
                        $('.child13 li:eq(1)').empty().append(pro)
                    }else{
                        $('.child13').empty();
                    }
                    if (data.asset.vehicleNameplatePic) {
                        $('.child14 li:eq(1)').empty().append(pro)
                    }else{
                        $('.child14').empty();
                    }
                }
          }).catch((err) => {
            console.log(err)
          })
        },
        // 说明
        info(){
            this.$router.push({path:'/page/touZiInfo'})
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
            h5{font-size: 0.8rem;border-bottom: 1px solid #eee;line-height: 2.2rem;}
            p{padding: 1rem 0.5rem 0 0.5rem;font-size: 0.6rem;color: #999}
            span{margin-right: 0.5rem;color: #FFA303;font-size: 0.7rem;display: inline-block;width: 100%;text-align: right;}
        }
        .list{
            margin-top: 0.5rem;
            background: #fff;
            border-radius: 3px;
            padding: 0.5rem 0.6rem;
            color: #333;
            border-radius: 5px;
            li{
                list-style: none;font-size: 0.7rem;padding: 0.6rem 0;color: #666;
                span{float: right;}
            }
            li:first-child{
                border-bottom: 1px solid #eee;
                font-size: 0.8rem;
                color: #333;
            }
        }
        .tablelist{
            margin-top: 0.5rem;background: #fff;border-radius: 3px;padding: 0.5rem 0.6rem;color: #333;border-radius: 5px;width: 100%;
            .tablelistTitle{
                display: flex;
                flex: 1;
                border-bottom: 1px solid #eee;
                font-size: 0.8rem;
                color: #333;
                padding: 0.6rem 0;
                li{
                    width: 50%;
                    text-align: center;
                }
            }
            div{
                ul{
                    font-size: 0.8rem;
                    font-weight: normal;
                    line-height: 2.2rem;
                    display: flex;
                    flex: 1;
                }
                li{
                    width: 50%;
                    text-align: center;
                    color: #999;
                    font-size: 0.7rem;
                    line-height: 2.2rem
                }
            }
            .yes{color: #FFA303}
            .going{color: #2B9AFF}
        }
    }
    .note{padding: 1rem 3rem;color: #999;font-size: 0.5rem;text-align: center;}
    // 说明
    .bg{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
        display: none;
        z-index: 1;
    }
    .xyContainer{
        z-index: 1;
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        height: 70%;
        background: #fff;
        border-radius: .6rem /* 25/40 */;
        overflow: scroll;
        // display: none;
        .title{
            background: #2B9AFF;
            border-radius: .6rem .6rem 0 0;
            color: #fff;
            text-align: center;
            padding-top: .6rem;
            padding-bottom: .5rem;
        }
        .content_box{
            padding: 0.8rem;
            font-size: .8rem;
            height: 70%;
        }
    }
}
</style>
