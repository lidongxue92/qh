<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <div class="middle">
            <!--转让协议-->
            <div class="agreement">
                <div class="agreementTitle">用户产品转让协议</div>
                <div class="agreementMain">
                    <p>一、产品转让规则定义
                        <br />&nbsp;&nbsp;出借人通过平台购买产品，将直接获得借款人的债权。在满足《网络借贷风险和禁止行为提示书》相关规则的前提下，出借人可在付费转让期和自由期内的任意时刻申请债权转让；出借人可以通过启航金服转让其持有的债权。受让人可以根据自己的需求及利益诉求决定是否接受转让。</p>
                    <p>二、可转让期限
                        <br /> &nbsp;&nbsp;1、1天~90天为债权锁定期 锁定期间债权不可转让
                        <br /> &nbsp;&nbsp;2、90天~180天为债权付费转让区，付费转让区间出借人需支付2%转让手续费。
                        <br /> &nbsp;&nbsp;3、180天~债权到期日为债权自由转让期，自由转让区出借人可根据需要自由转让所持有的可转让债权。
                    </p>
                    <p>三、募集期
                        <br />&nbsp;&nbsp;自购买之日起，不超过20天</p>
                    <p>四、出借规则
                        <br />&nbsp;&nbsp;出借金额100元起，单笔出借上限500000元。</p>
                    <p>五、债权转让的风险警示
                        <br />&nbsp;&nbsp;如出借人需要进行债权转让的，平台可协助出借人自主发起与平台其他注册用户之间的债权转让，是否能够转让成功取决于其他用户的意向，转让不成功的，出借人需持有相应借款项目直至到期。</p>
                </div>
            </div>

        </div>

        <div class="bottom">
            <div class="btmMain">
                <h5><span class="img img2"></span><input @click="check" class="check" type="checkbox" checked="true" /> 我已阅读并同意<span>《启航金服债权转让协议》</span></h5>
                <span class="button" @click="Transferdetail(id)">下一步</span>
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
            isshow1:false
        }
    },
    created() {
    },
    methods: {
        Transferdetail(id) {
            if ($('.bottom .check').is(':checked')) {
                this.$router.push({path:"/page/Transferdetail",query: {id: this.$route.query.id}})
            }else{
                this.$vux.alert.show({
                      title: '',
                      content: "请确认勾选协议"
                  })
                  setTimeout(() => {
                      this.$vux.alert.hide()
                  }, 2000)
            }
        },
        check(){
            if ($('.bottom .check').is(':checked')) {
                $('.bottom .img').removeClass('img1').addClass('img2')
            }else{
                $('.bottom .img').removeClass('img2').addClass('img1')
            }
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
    background: #f6f6f6;height:100%;
    .middle{
        margin-top: 0.5rem;color: #999;background: #fff;padding:0.8rem;
        h5{text-align: center;color: #333;font-size: 0.9rem;font-weight: normal;}
        h6{font-size: 0.8rem;font-weight:normal;margin-top:0.5rem;img{width: 0.8rem;height: 0.8rem;margin-right: 0.6rem;}}
        p{font-size: 0.7rem;line-height: 1.5rem;margin-top: 0.5rem;}
    }
    .bottom{
        background: #f6f6f6;
        // position: absolute;
        // bottom: 0;
        // left: 0;
        font-size: 0.7rem;
        color: #999;
        width: 100%;
        padding-top: .5rem;
        .btmMain{
            width: 90%;
            margin: 0 auto;
            h5{
                position: relative;
                .img{position: absolute;width: 1.1rem;height: 1.1rem;left: 0;top: 0.2rem;display: inline-block;}
                .img1{background: url(~@/assets/img/noagree.png);background-size: 100%;background-repeat: no-repeat;}
                .img2{background: url(~@/assets/img/agree.png);background-size: 100%;background-repeat: no-repeat;}
                input{width: 1.1rem;height: 1.1rem;opacity: 0;position: relative;z-index: 11;}
                span{color: #2B9AFF}
            }
        }

        .button{
            border: 0;
            width: 100%;
            background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);
            height: 40px;
            text-align: center;
            color: #fff;
            font-size: 0.9rem;
            border-radius: 30px;
            line-height: 40px;
            position: relative;
            bottom: 0.8rem;
            display: inline-block;
            margin-top: 1.3rem;
        }
    }
    .agreementTitle{
        text-align: center;
    }
    .agreementMain{
        p{
            color: #333;
        }
    }
}
</style>
