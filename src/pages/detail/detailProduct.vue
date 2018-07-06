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

        <!-- 投资风险说明 -->
        <div class="bg"></div>
        <!-- 投资协议 -->
    <div class="xyContainer">
        <p class="title">出借风险提示及禁止行为说明书</p>
        <div class="content_box">
            <p class="text">尊敬的出借人：
                <br/> 您在做出接受网络借贷信息中介机构服务和出借决策之前，请仔细阅读本风险提示及禁止行为告知书，全面认识网络借贷的风险和特性，认真考虑本服务存在的各项风险因素，并充分考虑自身的投资风险意识、风险识别能力和风险承受能力，谨慎做出接受服务和出借的决策。同时，您须确认投出借资金来源的合法性，不得存在法律规定的禁止性行为。
            </p>

            <p class="text">
                <span>一、风险</span>
                <br/>
                <b>1.信用风险</b>
                <br/> 网络借贷信息中介机构不提供增信服务，不承担借贷违约风险。如借款人因经营不善、资金周转不灵或主观故意而出现无法或未能正常还款的情况，出借人需自行承担借贷风险，接受本息损失。
                <br/>
                <b>2.延期风险</b>
                <br/> 在借款到期日，借款人因自身原因无法按期足额还款，导致出借人的出借本金和利息无法按时回收。当借款人未按期足额还款时，启航金服将根据出借人的授权采用适当的方式代表出借人对借款人进行追索（包括但不限于仲裁和诉讼），无论采取哪种方式，在此过程中，出借人均有可能延期收到出借本金和利息。
                <br/>
                <b>3.交易失败的风险</b>
                <br/> 本次交易的促成需符合相关法律法规的规定和借款合同的约定，可能存在不能满足成立条件从而导致交易失败的风险。
                <br/>
                <b>4.操作风险</b>
                <br/> 1)不可预测或无法控制的系统故障、设备故障、通讯故障、停电等突发事故将有可能给出借人造成一定损失。因上述事故造成交易或交易数据中断，恢复交易时以事故发生前系统最终记录的交易数据为有效数据；
                <br/> 2)由于出借人密码失密、操作不当、决策失误、黑客攻击等原因可能会造成出借人损失；
                <br/> 3)网上交易热键操作完毕未及时退出，委托他人代理交易，或长期不关注账户变化等致使他人进行恶意操作均将可能造成出借人损失
                <br/>
                <b>5.经营风险</b>
                <br/> 网络借贷信息中介机构承诺将按照相关法律法规的规定进行运营及管理，但会存在因法律法规根据社会需求调整而无法保证符合相关法律和监管部门的要求的现象。如网络借贷信息中介机构无法继续经营网络借贷信息中介业务或发生重大业务调整，或财产状况发生重大变化，则可能会对出借人产生不利影响。
                <br/>
                <b>6.其他风险</b>
                <br/> 1)由于自然灾害、战争、法律法规或政策等无法避免或无法控制的因素的出现，将影响市场的正常运行，从而导致还款资金损失，甚至影响该借款的成立、运行、偿付等的正常进行；
                <br/> 2)因宏观经济形势或有关法律、法规及相关政策、规则发生变化，可能引起价格等方面的异常波动，出借人有可能遭受损失。 以上并不能揭示从事交易的全部风险及市场的全部情形。出借人在做出交易决策前，应通过启航金服公布的信息及其他相关公告了解拟操作交易的风险收益特征，并根据自身的交易目标、风险承受能力和债权状况等谨慎决策，并自行承担全部风险。</p>

            <p class="text">
                <span>二、禁止性行为</span>
                <br/> 根据《反洗钱法》规定，禁止洗钱、信用卡套现、虚假交易等行为。启航金服对有上述可疑行为的出借人发起的出借行为将终止服务并终止该账户的使用
            </p>

            <p class="text">
                <span>三、其他提示</span>
                <br/> 在您以网络点击方式点击确认本风险提示及禁止行为告知书时，您已仔细阅读本风险揭示书，并独立作出是否接受服务和出借的决定。您已知悉并理解出借的全部风险，并自愿承担由此带来的一切后果。
            </p>
        </div>
        <div class="xyBtn">我已了解</div>
    </div>

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
        this.token();
    },
    activated: function() {
        this.productdata()
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        }//回退上一级页面并刷新
    },
    methods: {
        token(){
            if (!sessionStorage.token) {
            this.$vux.alert.show({
                title: '',
                content: '请登录'
            })
            setTimeout(() => {
                this.$vux.alert.hide()
                this.$router.push({path:"/login",query: {redirect: 'your path'}})
            }, 2000)
            }
        },
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
        },
        // 说明
        info(){
            $(".bg").show()
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
    // 说明
    .bg{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
        display: none;
    }
    .xyContainer{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        background: #fff;
        border-radius: 50px;
    }
}
</style>
