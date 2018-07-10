<template>
    <div class="detail page">
        <top :title="title"></top>
        <span class="titlenote" @click="notes">使用说明 </span>
        <ul class="tab">
            <li class="red active" @click="red">红包</li>
            <li class="add" @click="add">加息券</li>
        </ul>
        <div class="middle">
            <div class="nodata" v-if="isshow1">
                <img src="~@/assets/img/no_data.png">
                <p>亲，抱歉哦！您暂无可用红包或加息券</p>
                <p>快去小航的发现中心逛逛吧!</p>
                <button class="button" @click="data">去逛逛</button>
            </div>
            <!-- 红包 -->
            <div class="Data" v-if='isshow2'>
                <p class="no"  @click="Detail">不使用红包卡券</p>
                <ul class="list">
                    <!-- <li>
                        <p class="title">新手红包</p>
                        <p class="left">¥<b>1000</b></p>
                        <p class="right">
                            <span>使用条件：投资满10000元可使用</span>
                            <span>投资满10000元可使用</span>
                        </p>
                        <p class="note">有效期至：2017.12.12 00:00
                        <span class="button">立即使用</span></p>
                    </li> -->
                    <li v-for="(item,index) in product" @click="linkDetail1(item.welfareId,item.redPacketMoney)" :key="index">
                        <div class="clearfix">
                            <p class="title">{{item.redPacketName}}</p>
                            <p class="left">¥<b>{{item.redPacketMoney}}</b></p>
                            <p class="right">
                                <span>使用条件：投资满<b style="font-weight: normal;">{{item.investMoney}}</b>元可使用</span>
                                <span class="invest">投资满<b class="investMoney" style="font-weight: normal;">{{item.applyDays}}</b>天可使用</span>
                            </p>
                        </div>
                        <div class="note">有效期：
                            <span>{{item.startDate}}</span>
                            <p style="margin-left: 3.2rem;">{{item.endDate}}</p>
                            <span class="button"></span><span class="status">{{item.status}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 历史红包 -->
            <div class="historyData" v-if='isshow3'>
                <p class="no">历史红包</p>
                <ul class="list">
                   <!--  <li>
                        <p class="title">新手红包</p>
                        <p class="left">¥<b>1000</b></p>
                        <p class="right">
                            <span>使用条件：投资满10000元可使用</span>
                            <span>投资满10000元可使用</span>
                        </p>
                        <p class="note">有效期至：2017.12.12 00:00
                        <span class="button">已使用</span></p>
                    </li> -->
                   <li v-for="(item,index) in product" :key="index">
                        <div class="clearfix">
                            <p class="title">{{item.redPacketName}}</p>
                             <div class="center">
                                <p class="left">¥<b>{{item.redPacketMoney}}</b></p>
                                <p class="right">
                                    <span>使用条件：投资满<b style="font-weight: normal;">{{item.investMoney}}</b>元可使用</span>
                                    <span class="invest">投资满<b class="investMoney" style="font-weight: normal;">{{item.applyDays}}</b>天可使用</span>
                                </p>
                            </div>
                        </div>
                        <div class="note">有效期：
                            <span>{{item.startDate}}</span>
                            <p style="margin-left: 3.2rem;">{{item.endDate}}</p>
                            <span class="button"></span><span class="status">{{item.status}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 加息券 -->
            <div class="page" v-if="isshow5">
                <p class="no" @click="Detail">不使用红包卡券</p>
                <ul class="list">
                    <!-- <li>
                        <p class="title">新手红包</p>
                        <p class="left">¥<b>1000</b></p>
                        <p class="right">
                            <span>使用条件：投资满10000元可使用</span>
                            <span>投资满10000元可使用</span>
                        </p>
                        <p class="note">有效期至：2017.12.12 00:00
                        <span class="button"></span></p>
                    </li> -->
                    <li v-for="(item,index) in addpro" @click="linkDetail(item.welfareId,item.incrMoney)">
                        <div class="clearfix">
                            <p class="title">{{item.incrName}}</p>
                            <div class="center">
                                <p class="left"><b>{{item.incrMoney}}%</b></p>
                                <p class="right">
                                    <span>使用条件：投资满<b style="font-weight: normal;">{{item.incrMoney}}</b>元可使用</span>
                                    <span class="invest">投资满<b class="investMoney" style="font-weight: normal;">{{item.applyDays}}</b>天可使用</span>
                                </p>
                            </div>
                        </div>
                        <div class="note">有效期：
                            <span>{{item.startDate}}</span>
                            <p style="margin-left: 3.2rem;">{{item.endDate}}</p>
                            <span class="button"></span><span class="status">{{item.status}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 历史加息券 -->
            <div class="historypage" v-if="isshow6">
                <p class="no">历史加息券</p>
                <ul class="list">
                    <!-- <li>
                        <p class="title">新手红包</p>
                        <p class="left">¥<b>1000</b></p>
                        <p class="right">
                            <span>使用条件：投资满10000元可使用</span>
                            <span>投资满10000元可使用</span>
                        </p>
                        <p class="note">有效期至：2017.12.12 00:00
                        <span class="button">立即使用</span></p>
                    </li> -->
                     <li v-for="(item,index) in addpro" :key="index">
                        <div class="clearfix">
                            <p class="title">{{item.incrName}}</p>
                            <div class="center">
                                <p class="left"><b>{{item.incrMoney}}%</b></p>
                                <p class="right">
                                    <span>使用条件：投资满<b style="font-weight: normal;">{{item.incrMoney}}</b>元可使用</span>
                                    <span class="invest">投资满<b class="investMoney" style="font-weight: normal;">{{item.applyDays}}</b>天可使用</span>
                                </p>
                            </div>
                        </div>
                        <div class="note">有效期：
                            <span>{{item.startDate}}</span>
                            <p style="margin-left: 3.2rem;">{{item.endDate}}</p>
                            <span class="button"></span><span class="status">{{item.status}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <p class="notes" v-if='isshow2' @click="history">查看历史红包</p>
        <p class="notes" v-if='isshow5' @click="history1">查看历史加息券</p>
        <div class="bg"></div>
        <div class="toast">
            <h5>红包加息券使用说明<span @click="close">&Chi;</span></h5>
            <h6><span class="c-FFC62E"></span>红包使用说明</h6>
            <p>1. 红包领取后，红包金额将直接转入您的余额账户，可以进行投资或提现；</p>
            <p>2. 只有投资过（日日赚、新手标、转让标除外）的用户才能领取红包或参加抢红包活动；</p>
            <p>3. 请在收到红包领取提示后，在有效期内领取，否则红包将会作废。</p>
            <h6><span class="c-A1CB46"></span>加息券使用说明</h6>
            <p>1. 红包领取后，红包金额将直接转入您的余额账户，可以进行投资或提现；</p>
            <p>2. 只有投资过（日日赚、新手标、转让标除外）的用户才能领取红包或参加抢红包活动。</p>
            <button class="button" @click="close">我知道了</button>
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
            product: '',
            addpro:'',
            money:'1000',
            title:'平台福利',
            righttitle:'使用说明',
            isshow1:false,
            isshow2:true,
            isshow3:false,
            isshow4:false,
            isshow5:false,
            isshow6:false,
            id:'',
            isshow7:true
        }
    },
    computed: {
    },
    mounted () {
    },
    created() {},
    activated() {
        const status = '3'
        this.welfare(status)
    },
    methods: {
        data() {
            this.$router.push({ path: '/page/data' })
        },
        red(){
            const _this = this
            $(".red").addClass('active')
            $('.add').removeClass('active')
            this.isshow2 = true
            this.isshow3 = false
            this.isshow4 = false
            this.isshow5 = false
            this.isshow6 = false
            this.welfare('3')
        },
        add(){
            const _this = this
            $(".add").addClass('active')
            $('.red').removeClass('active')
            this.isshow2 = false
            this.isshow3 = false
            this.isshow4 = false
            this.isshow5 = true
            this.isshow6 = false,
            this.addwelfare('3')
        },
        close(){
            $(".bg").css('display',"none")
            $(".toast").css('display',"none");
            //页面禁止滚动（有效）
            $(".bg").bind('touchmove',function (e){
                e.preventDefault();
            });
        },
        notes(){
            $(".bg").css('display',"block")
            $(".toast").css('display',"block")
        },
        history(){
            const _this = this
            this.isshow2 = false
            this.isshow3 = true
            this.isshow4 = false
            this.isshow5 = false
            this.isshow6 = false
            this.welfare('2')
        },
        history1(){
            const _this = this
            this.isshow2 = false
            this.isshow3 = false
            this.isshow4 = false
            this.isshow5 = false
            this.isshow6 = true,
            this.addwelfare('1')
        },
        // 红包数据
        welfare(status){
            const _this = this
            _this.$loading.show();
            const url = myPub.URL+`/welfare/getMyRedPacketList`;
            const proPeriod = this.$route.query.proPeriod
            const transMoney = this.$route.query.money
            var params = new URLSearchParams();
            params.append('token',sessionStorage.getItem("token"));
            params.append('status',status);
            params.append('curPage','1');
            params.append('pageSize','50');
            if (proPeriod) {
                params.append('proPeriod',proPeriod);
                params.append('transMoney',transMoney);
            }
            axios.post(url,params).then(res => {
                console.log(res.data)
                const data = res.data
                _this.$loading.hide();
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
                if(res.data.result == '200'){
                    this.product = res.data.RedPacket
                    this.id = this.product.welfareId
                    setTimeout(() => {
                        $(".status").each(function (i,n) {
                            if ($(".status").eq(i).text() == '1') {
                                $(".button").eq(i).text('已到期')
                            }
                            if ($(".status").eq(i).text() == '2') {
                                $(".button").eq(i).text('未到期')
                            }
                            if ($(".status").eq(i).text() == '3') {
                                console.log(i)
                                $(".button").eq(i).text('立即使用')
                            }
                            if ($(".status").eq(i).text() == '4') {
                                $(".button").eq(i).text('已失效')
                            }
                            if ($(".status").eq(i).text() == '5') {
                                $(".button").eq(i).text('已下架')
                            }
                        })
                        $(".investMoney").each(function (b) {
                                console.log($(".investMoney").eq(b).text())
                                if ($(".investMoney").eq(b).text() == '0') {
                                    $(".invest").eq(b).css("opacity",'0')
                                }else{
                                    $(".invest").eq(b).css("opacity",'1')
                                }
                            })
                    }, 200)
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        addwelfare(status){
            const _this = this
            _this.$loading.show();
            const url = myPub.URL+`/welfare/getMyIncreaseList`;
            const proPeriod = this.$route.query.proPeriod
            const transMoney = this.$route.query.money
            var params = new URLSearchParams();
            params.append('token',sessionStorage.getItem("token"));
            params.append('status',status);
            params.append('curPage','1');
            params.append('pageSize','50');
             if (proPeriod) {
                params.append('proPeriod',proPeriod);
                params.append('transMoney',transMoney);
            }
            axios.post(url,params).then(res => {
                console.log(res.data)
                const data = res.data
                _this.$loading.hide();
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
                if(res.data.result == '200'){
                    this.addpro = res.data.Increase
                    this.id = this.addpro.welfareId
                    setTimeout(() => {
                        $(".status").each(function (i,n) {
                            if ($(".status").eq(i).text() == '1') {
                                $(".button").eq(i).text('已到期')
                            }
                            if ($(".status").eq(i).text() == '2') {
                                $(".button").eq(i).text('未到期')
                            }
                            if ($(".status").eq(i).text() == '3') {
                                $(".button").eq(i).text('立即使用')
                            }
                            if ($(".status").eq(i).text() == '4') {
                                $(".button").eq(i).text('已失效')
                            }
                            if ($(".status").eq(i).text() == '5') {
                                $(".button").eq(i).text('已下架')
                            }
                            $(".investMoney").each(function (b) {
                                if ($(".investMoney").eq(b).text() == '0') {
                                    $(".invest").eq(b).css("opacity",'0')
                                }else{
                                    $(".invest").eq(b).css("opacity",'1')
                                }
                            })
                        })
                    }, 200)
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        // 红包使用情况
        linkDetail1(packetId,redPacketMoney){
            const id = this.$route.query.id
            if (id) {
                sessionStorage.setItem("packetId",packetId);
                sessionStorage.setItem("redPacketMoney",redPacketMoney);
                this.$router.push({path:'/page/detail', query: { id: id }})
            }else{
                this.$router.push({path:'/category'})
            }
        },
        // 加息券使用情况
        linkDetail(incrId,incrMoney){
            const id = this.$route.query.id
            if (id) {
                sessionStorage.setItem("incrId",incrId);
                sessionStorage.setItem("incrMoney",incrMoney);
                this.$router.push({path:'/page/detail', query: { id: id }})
            }else{
                this.$router.push({path:'/category'})
            }
        },
        // 返回产品
        Detail(){
            const id = this.$route.query.id
            this.$router.push({path:'/page/detail', query: { id: id }})
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
.clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content:" ";
    clear: both;
    height: 0;
}
.clearfix {
    zoom:1;
}
.detail {
    background: #f7f7f7;
    height:auto;
    position: relative;
    .tab{
        background: #fff;margin-top: 1rem;
        li{list-style: none;width: 49%;text-align: center;font-size: 0.9rem;line-height: 2.5rem;height: 2.5rem;color: #999;display: inline-block;}
        .active{color: #FFA303;border-bottom: 2px solid #FFA303}
    }
    .middle{
        .nodata{
            text-align: center;
            img{margin-top: 3rem;width: 4.2rem;height: 4.5rem;}
            p{font-size: 0.8rem;color: #999;line-height:1rem;margin-top: 0.5rem;}
            .button{width: 10rem;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);border: 0;border-radius: 30px;line-height: 2.2rem;height: 2.2rem;color: #fff;font-size: 0.9rem;margin-top: 1.2rem;}
        }
        .Data{
            margin-top: 0.8rem;
            .no{background: #fff;font-size: 0.8rem;height: 2rem;line-height: 2rem;text-align: center;border-right: 5px;}
            .list{
                margin-top: 0.8rem;
                li{
                    background: url(~@/assets/img/red.png);list-style: none;height:7rem;background-size: 100%;padding:1.5rem 2rem;background-repeat:no-repeat;
                    .title{font-size: 0.8rem;color: #fff;height: 20px}
                    .left{
                        color: #fff;display: inline-block;width: 30%;position: relative;min-height: 3rem;
                        b{font-size: 1.6rem;color: #fff;}
                    }
                    .left:after{content: '';display: inline-block;position: absolute;width: 1px;height: 50%;background-color: #fff;top: 25%;right: 0;}
                    .right{
                        display: inline-block;width: 66%;min-height: 3rem;
                        span{display:inline-block; width: 100%;font-size: 0.6rem;color: #fff;padding-left: 0.8rem;}
                        .invest{opacity: 0}
                    }
                    .note{
                        font-size: 0.6rem;color: #333;padding: 0;margin-top:1.5rem;position: relative;display: block;position: relative;
                        .status{opacity: 0;position: absolute;}
                        .button{display: inline-block;float: right;width: 4.5rem;height: 1.4rem;border-radius: 30px;border: 1px solid #F0463D;color: #F0463D;text-align: center;line-height: 1.4rem;position: absolute;right: 1rem;top: 0;}
                    }
                }
                @media screen and (max-width: 320px) {
                    li{
                        padding: 1rem 1rem;
                        .left{
                            width: 23%;
                            b{font-size: 1rem;}
                        }
                        .right{width: 75%;}
                        .note{
                            font-size: 0.6rem;color: #333;padding: 0rem;margin-top:0.6rem;
                        }
                    }
                }
            }
        }
        .historyData{
            margin-top: 0.8rem;
            .no{background: #fff;font-size: 0.8rem;height: 2.5rem;line-height: 2.5rem;text-align: center;border-right: 5px;text-align: left;padding-left: 0.5rem;}
            .list{
                margin-top: 0.8rem;
                li{
                    background: url(~@/assets/img/historyred.png);list-style: none;height:7rem;background-size: 100%;padding:1.5rem 2rem;background-repeat:no-repeat;
                    .title{font-size: 0.8rem;color: #fff;height: 20px}
                    .left{
                        color: #fff;display: inline-block;width: 30%;position: relative;min-height: 3rem;
                        b{font-size: 1.6rem;color: #fff;}
                    }
                    .left:after{content: '';display: inline-block;position: absolute;width: 1px;height: 50%;background-color: #fff;top: 25%;right: 0;}
                    .right{
                        display: inline-block;width: 66%;min-height: 3rem;
                        span{display:inline-block; width: 100%;font-size: 0.6rem;color: #fff;padding-left: 0.8rem;}
                        .invest{opacity: 0}
                    }
                    .note{
                        font-size: 0.6rem;color: #333;padding: 0;margin-top:1.5rem;position: relative;display: block;position: relative;
                        .status{opacity: 0;position: absolute;}
                        .button{display: inline-block;float: right;width: 4.5rem;height: 1.4rem;border-radius: 30px;border: 1px solid #F0463D;color: #F0463D;text-align: center;line-height: 1.4rem;position: absolute;right: 1rem;top: 0;}
                    }
                }
                @media screen and (max-width: 320px) {
                    li{
                        padding: 1rem 1rem;
                        .left{
                            width: 23%;
                            b{font-size: 1rem;}
                        }
                        .right{width: 75%;}
                        .note{
                            font-size: 0.6rem;color: #333;padding: 0rem;margin-top:0.6rem;
                        }
                    }
                }
            }
        }
        .page{
            margin-top: 0.8rem;
            .no{background: #fff;font-size: 0.8rem;height: 2rem;line-height: 2rem;text-align: center;border-right: 5px;}
            .list{
                margin-top: 0.8rem;
                li{
                    background: url(~@/assets/img/pageadd.png);list-style: none;height:7rem;background-size: 100%;padding:1.5rem 2rem;background-repeat:no-repeat;
                    .title{font-size: 0.8rem;color: #fff;height: 20px}
                    .left{
                        color: #fff;display: inline-block;width: 30%;position: relative;min-height: 3rem;
                        b{font-size: 1.6rem;color: #fff;}
                    }
                    .left:after{content: '';display: inline-block;position: absolute;width: 1px;height: 50%;background-color: #fff;top: 25%;right: 0;}
                    .right{
                        display: inline-block;width: 66%;
                        .invest{opacity: 0}
                        span{display:inline-block; width: 100%;font-size: 0.6rem;color: #fff;padding-left: 0.8rem;}
                    }
                    .note{
                        font-size: 0.6rem;color: #333;padding: 0;margin-top:1.5rem;position: relative;display: block;position: relative;
                        .status{opacity: 0;position: absolute;}
                        .button{display: inline-block;float: right;width: 4.5rem;height: 1.4rem;border-radius: 30px;border: 1px solid #C79B5A;color: #C79B5A;text-align: center;line-height: 1.4rem;position: absolute;right: 1rem;top: 0;}
                    }
                }
                @media screen and (max-width: 320px) {
                    li{
                        padding: 1rem 1rem;
                        .left{
                            width: 23%;
                            b{font-size: 1rem;}
                        }
                        .right{width: 75%;}
                        .note{
                            font-size: 0.6rem;color: #333;padding: 0rem;margin-top:0.6rem;
                        }
                    }
                }
            }
        }
        .historypage{
            margin-top: 0.8rem;
            .no{background: #fff;font-size: 0.8rem;height: 2.5rem;line-height: 2.5rem;text-align: center;border-right: 5px;text-align: left;padding-left: 0.5rem;}
            .list{
                margin-top: 0.8rem;
                li{
                    background: url(~@/assets/img/historyred.png);list-style: none;height:7rem;background-size: 100%;padding:1.5rem 2rem;background-repeat:no-repeat;
                    .title{font-size: 0.8rem;color: #fff;height: 20px}
                    .left{
                        color: #fff;display: inline-block;width: 30%;position: relative;min-height: 3rem;
                        b{font-size: 1.6rem;color: #fff;}
                    }
                    .left:after{content: '';display: inline-block;position: absolute;width: 1px;height: 50%;background-color: #fff;top: 25%;right: 0;}
                    .right{
                        display: inline-block;width: 66%;
                        .invest{opacity: 0}
                        span{display:inline-block; width: 100%;font-size: 0.6rem;color: #fff;padding-left: 0.8rem;}
                    }
                    .note{
                        font-size: 0.6rem;color: #333;padding: 0;margin-top:1.5rem;position: relative;display: block;position: relative;
                        .status{opacity: 0;position: absolute;}
                        .button{display: inline-block;float: right;width: 4.5rem;height: 1.4rem;border-radius: 30px;border: 1px solid #999;color: #999;text-align: center;line-height: 1.4rem;position: absolute;right: 1rem;top: 0;}
                    }
                }
                @media screen and (max-width: 320px) {
                    li{
                        padding: 1rem 1rem;
                        .left{
                            width: 23%;
                            b{font-size: 1rem;}
                        }
                        .right{width: 75%;}
                        .note{
                            font-size: 0.6rem;color: #333;padding: 0rem;margin-top:0.6rem;
                        }
                    }
                }
            }
        }
    }
    .titlenote{position: absolute;top: 0.8rem;right: 0.5rem;color: #fff;font-size: 0.8rem;}
    .notes{font-size: 0.7rem;color: #FFA303;text-align: center;position:relative;top: 1rem;width: 100%;padding-bottom: 1rem;}
    /*.notes{
        font-size: 0.7rem;
        color: #FFA303;
        text-align: center;
        position:relative;
        top: 1rem;width: 100%;
        padding-bottom: 1rem;
        background: #f6f6f6;
    }*/
    .bg{
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        left: 0;
        top: 0;
        display: none;
    }
    .toast{
        position: absolute;
        width: 80%;
        margin-left: 10%;
        border-radius: 5px;
        // overflow: hidden;
        background: #f6f6f6;
        top: 10%;
        display: none;

        h5{font-size: 0.9rem;color: #fff;text-align: center;background: #2B9AFF;font-weight:normal;padding: 0.5rem 0.8rem;span{position: absolute;top: 0.2rem;right: 0.5rem;}}
        h6{
            font-weight: normal;font-size: 0.8rem;color: #333;padding: 0 0.8rem;margin-top: 1rem;
            .c-FFC62E{display: inline-block;width: 0.6rem;height: 0.6rem;background: #FFC62E;border-radius: 50%;margin-right: 0.5rem;}
            .c-A1CB46{display: inline-block;width: 0.6rem;height: 0.6rem;background: #A1CB46;border-radius: 50%;margin-right: 0.5rem;}
        }
        p{font-size: 0.7rem;color: #666;padding: 0 0.8rem;line-height: 1.5rem;}
        .button{border: 0;width: 70%;margin-left: 15%;margin-top: 1rem;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);height: 40px;text-align: center;color: #fff;font-size: 0.9rem;border-radius: 30px;margin-bottom: 1rem;}
    }
}
</style>
