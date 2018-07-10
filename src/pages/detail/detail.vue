<template>
    <div class="detail page">
        <div class="product">
            <topComponent :title=title :showLeft='false'>
                <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
            </topComponent>
            <div class="left">
                <span class="interest" v-if='isshow5'>{{product.baseAnnualYield}}<b class="activeLilv">%+{{product.actAnnualYield}}%</b></span>
                <span class="interest" v-if='isshow6'>{{product.baseAnnualYield}}<b class="activeLilv">%</b>-<span>{{product.actAnnualYield}}</span><b>%</b></span>
                <span class="rate">预计年化收益率</span>
            </div>
            <div class="right">
                <p style="margin-top: 1rem;">理财期限&emsp;<span>{{product.period}}天</span></p>
                <p>开放额度&emsp;<span class="openLimit">{{product.openLimit}}万元</span></p>
                <span v-if="isshow3" style="font-size: 0.8rem;">募集期<b style="font-weight:normal;">{{product.raisePeriod}}</b>天&ensp;</span><span class="status">{{product.productType}}</span>
            </div>
            <p class="line">
                <span class="before">
                    <b class="after"></b>
                </span>
            </p>&emsp;<span class="Percentage">已售{{product.xmjd}}%</span>
            <p class="note">
                <span class="left1">剩余额度&emsp;<b class="residueMoney">{{product.residueMoney}}万元</b></span>
                <span class="right1">起投金额&emsp;<b>{{product.amountMin}}</b></span>
            </p>
        </div>
        <div class="middle">
            <!-- 购买金额 -->
            <div class="Amount">
                <h5>购买金额 <b class="Type" style="position: absolute;opacity: 0;">{{product.yieldDistribType}}</b></h5>
                <p>
                    <img class="leftimg" src="~@/assets/img/cont.png" @click="cont">
                    <input class="money" v-model= "money" v-on:input="changeVal()" @click="full"/>元
                    <img class="rightimg" src="~@/assets/img/add.png" @click="add">
                </p>
                <p class="word" @click="red(product.productId,product.period)">
                    <span class="fl">红包卡券</span><span class="fr usered"><b style="font-weight: normal;">{{totalCount}}个可用</b>&emsp;<img src="~@/assets/img/right.png"></span>
                </p>
                <p class="word">
                    <span class="fl">预期收益</span><span class="fr c-FFA303"><b class="rate1"></b>&ensp;元</span>
                </p>
                <p class="bottomimg" v-if="isshow4">
                    <span class="fl">
                        起息日
                        <b>{{product.qxr}}</b>
                    </span>
                    <span>
                        到期日
                        <b>{{product.dqr}}</b>
                    </span>
                    <span class="fr">
                        到帐日
                        <b>{{dzr}}</b>
                    </span>
                </p>
                <p v-if="isshow3" class="full"><img src="~@/assets/img/clock.png">&emsp;满标计息</p>
            </div>
            <!-- 项目介绍 -->
            <ul class="list">
                <li @click="linkTodetail1(product.productId)">项目介绍 <img src="~@/assets/img/right.png"></li>
                <li @click="log(product.productId)">投资记录 <img src="~@/assets/img/right.png"></li>
            </ul>
        </div>
        <div class="tzBg"><button class="button" @click="tost">立即投资</button></div>
        <div class="tost" v-if="isshow">
            <div class="vux-circle-demo" style="margin-top: 9rem;margin-left: 7rem;">
                <div style='width: 9.9rem;height:9.9rem;'>
                  <x-circle
                    :percent="percent"
                    :stroke-width="4"
                    :trail-width="1"
                    :stroke-color="['#36D1DC', '#5B86E5']"
                    trail-color="#ececec">
                    <span style="color:#2395FF;font-size: 2.3rem;">{{time}}s</span>
                  </x-circle>
                </div>
              </div>
              <button class="button bottom">确认支付</button>
        </div>
         <div class="toast">
          <span class="close" @click="close">&Chi;</span>
          <p style="margin-top: 1.2rem;">您还未开通托管账户 </p>
          <p>开通并充值后才可投资</p>
          <p style="color: #666;font-size: 0.8rem;">是否去开户</p>
          <span class="left" @click="leftclose">取消</span><span class="right" @click="rightclose">确定</span>
        </div>
        <div class="bg"></div>
         <!-- 开户 -->
        <div class="box" style="display:none;">
            <form  name="regSubmit" method="post" :action="ChinaPnrServer">
                 <input type='text' name='Version'  :value='Version'>
                 <input type='text' name='CmdId'  :value='CmdId'>
                 <input type='text' name='MerCustId' :value='MerCustId'>
                 <input type='text' name='RetUrl'  :value='RetUrl'>
                 <input type='text' name='BgRetUrl' :value='BgRetUrl'>
                 <input type='text' name='UsrId'  :value='UsrId'>
                 <input type='text' name='UsrMp' :value='UsrMp'>
                 <input type='text' name='PageType'  :value='PageType'>
                 <input type='text' name='ChkValue'  :value='ChkValue'>
                 <input type='text' name='MerPriv' :value='MerPriv'>
            </form>
        </div>
    </div>
</template>

<script>
import { PopupPicker, Tab, TabItem, Swiper,XCircle, SwiperItem,Qrcode, Divider,XDialog, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData,TransferDomDirective as TransferDom } from 'vux'
import { mapState, mapMutations, mapGetters } from 'vuex'
import topComponent from '../../components/common/top'
import * as myPub from '@/assets/js/public.js'
import axios from 'axios'
import $ from 'jquery'
export default {
    name: 'detail',
    directives: {
        TransferDom
    },
    data() {
        return {
            product: '',
            money:'',
            Money:'',
            title:'启航新手礼',
            isshow:false,
            isshow3:false,
            isshow4:true,
            percent: 0,
            time:6,
            id:'',
            day:'',
            free:'',
            dz:'',
            Annual:'',
            productType:'',
            actAnnualYield:'',
            residueMoney:'',
            amountIncrease:"",
            totalCount:'',
            dqr:'',
            dzr:'',
            isshow5:true,
            isshow6:false,


            // 三方开户数据
            ChinaPnrServer : "",
            Version : "",
            CmdId : "",
            MerCustId : "",
            RetUrl : "",
            BgRetUrl :"",
            MerPriv : "",
            UsrId : "",
            UsrMp : "",
            PageType : "",
            ChkValue : "",
        }
    },
    computed: {
    },
    mounted () {
    },
    created() {
        const dz = this.$route.query.dz
        this.dz = dz
        console.log(this.dz)
        this.productdata();
    },
    activated: function() {
        this.productdata()

        setTimeout(() => {
            this.welfare()
            this.Interest()
            setTimeout(() => {
                if (sessionStorage.redPacketMoney) {
                    console.log(sessionStorage.packetId+"红包")
                    $(".usered b").html(sessionStorage.redPacketMoney+'元红包')
                    $(".usered b").css('color','#FFA303')
                    const money = this.$route.query.money
                    this.money = money
                    this.Interest()
                }else if (sessionStorage.incrMoney) {
                    console.log(sessionStorage.incrId+"加息券")
                    const money = this.$route.query.money
                    $(".usered b").html(sessionStorage.incrMoney+'%加息券')
                    $(".usered b").css('color','#FFA303')
                    this.Interest()
                }
            }, 200)
        }, 300)
    },
    methods: {
        goBack(){
            if (this.$route.query.flag == "category") {
                this.$router.push({ path: '/category'})
            }else if (this.$route.query.flag == "index") {
                this.$router.push({ path: '/'})
            }else{
                this.$router.back();
            }
        },
        linkTodetail1(id) {
            this.$router.push({ path: '/page/detailProduct',query: { id: id } })
        },
        log(id) {
            this.$router.push({ path: '/page/log',query: { id: id } })
        },
        red(id,proPeriod) {
            const money = this.money;
            const flag = this.$route.query.flag;
            this.$router.push({ path: '/page/red', query: { id: id, proPeriod: proPeriod, money: money,flag:flag}})
        },
        rightclose(){
          $(".bg").css("display","none")
          $(".toast").css("display","none")
          this.go()
        },
        leftclose(){
          $(".bg").css("display","none")
          $(".toast").css("display","none")
        },
        close(){
          $(".bg").css("display","none")
          $(".toast").css("display","none")
        },
        add(){
            const _this = this
            const num = $(".money")
            const value = num.val()
            if (value > parseFloat(this.residueMoney)) {
                $(".rightimg").attr('src',"./static/img/add2.png");
                this.$vux.alert.show({
                    content: "投资金额已达最大值"
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    num.val(this.residueMoney)
                    this.money = this.residueMoney
                }, 1000)
            }else{
                this.money = (parseFloat(this.money)+parseFloat(this.amountIncrease))
                console.log (this.residueMoney)
                $(".leftimg").attr('src',"./static/img/add1.png")
                if (sessionStorage.redPacketMoney) {
                    $(".usered b").html(sessionStorage.redPacketMoney+'元红包')
                    this.Interest()
                }else if (sessionStorage.incrMoney) {
                    $(".usered b").html(sessionStorage.incrMoney+'%加息券')
                    this.Interest()
                }
                else{
                    this.welfare()
                    this.Interest()
                }
            }
        },
        cont(){
            const _this = this
            const num = $(".money")
            const value = num.val()
            if (value > parseFloat(this.Money)) {
                this.money = (parseFloat(this.money)-parseFloat(this.amountIncrease))
                if (this.money == this.Money) {
                    $(".leftimg").attr('src',"./static/img/cont.png");
                }else{
                    $(".leftimg").attr('src',"./static/img/add1.png")
                }
                if (sessionStorage.redPacketMoney) {
                    $(".usered b").html(sessionStorage.redPacketMoney+'元红包')
                    this.Interest()
                }else if (sessionStorage.incrMoney) {
                    $(".usered b").html(sessionStorage.incrMoney+'%加息券')
                    this.Interest()
                }
                else{
                    this.welfare()
                    this.Interest()
                }
                $(".rightimg").attr('src',"./static/img/add.png");
            }else{
                $(".leftimg").attr('src',"./static/img/cont.png");
            }
        },
        // 点击空
        full(){
            console.log(1)
            this.money = ''
        },
        // 输入框
        changeVal(){
            const num = $(".money")
            const value = num.val()
            if (value > parseFloat(this.residueMoney) && value.replace(/[^\d]/g, '') == 0) {
                $(".rightimg").attr('src',"./static/img/add2.png");
                this.$vux.alert.show({
                    content: "投资金额已达最大值"
                })
                setTimeout(() => {
                    num.val(this.residueMoney)
                    this.money = this.residueMoney
                    this.$vux.alert.hide()
                    $(".leftimg").attr('src',"./static/img/add1.png")
                }, 1000)
            }else if (value <= parseFloat(this.Money)) {
                $(".leftimg").attr('src',"./static/img/cont.png")
            }else if (value.replace(/[^\d]/g, '') == 0) {
                this.$vux.alert.show({
                    content: "只能输入数字,请重新输入"
                })
                setTimeout(() => {
                    num.val(this.money)
                    this.money = this.Money
                    this.$vux.alert.hide()
                    $(".leftimg").attr('src',"./static/img/cont.png")
                }, 2000)
                this.money = ''
                $(".usered b").html('0个可用')
            }else{
                console.log (this.residueMoney)
                $(".leftimg").attr('src',"./static/img/add1.png")
                if (sessionStorage.redPacketMoney) {
                    $(".usered b").html(sessionStorage.redPacketMoney+'元红包')
                    this.Interest()
                }else if (sessionStorage.incrMoney) {
                    $(".usered b").html(sessionStorage.incrMoney+'%加息券')
                    this.Interest()
                }
                else{
                    this.welfare()
                    this.Interest()
                }
            }
        },
        timer() {
          const _this =this
          if (_this.time > 0) {
              _this.time--
              setTimeout(_this.timer, 1000)
              _this.percent = parseFloat(_this.percent)+17
              console.log()
          }else{
            this.isshow = false
            const id = this.id
            const money = this.money
            this.$router.push({ path: '/page/pay' ,query: { id: id, money: money }})
            _this.time = '6'
            _this.percent = '0'
          }
      },
      // 计息
      Interest(){
            var newAddMoney = this.money;//金额
            var lilv = this.Annual / 100;//年利率
            if (sessionStorage.incrMoney) {
                var lilv = (Number(this.Annual)+Number(sessionStorage.incrMoney)) / 100;//年利率
            }
            //求取预期到期收益
            var month = parseInt(this.day / 30); // 总共整月数 (还款月数)
            var monthYuShu = this.day % 30; // 多余的天数
            var lilvMouth = Math.floor((lilv / 12) * 1000000) / 1000000; // 月利率
            var lilvDay = Math.floor((lilv / 365) * 1000000) / 1000000; // 日利率
            if ($(".Type").text() == '2') {
                var lilvMouth = Math.floor((lilv / 12)*1000000)/1000000; // 月利率
                var lilvDay = Math.floor((lilv / 365) * 1000000) / 1000000;; // 日利率
                var totalMonth = Math.floor((newAddMoney * lilvMouth * month) * 1000000) / 1000000; // 总月数的收益
                // 总收益 = 总月数的收益 + 剩余天数的收益;
                var total = this.toDecimal2(Math.floor(totalMonth * 100) / 100);
                $(".rate1").text(total)
            }
            if ($(".Type").text() == '3') {
                // 总月数的收益
                var totalMonth = 0;
                for (var i = 1; i <= month; i++) {
                    //收益计算公式 ：
                    var jssy = Math.floor((newAddMoney * lilvMouth * (Math.pow(1 + lilvMouth, month) - Math.pow(1 + lilvMouth, i - 1)) / (Math.pow(1 + lilvMouth, month) - 1)) * 1000000) / 1000000;
                    // 每个月的收益：
                var monthly = jssy;
                    totalMonth = totalMonth + monthly;
                }
                // console.log(totalMonth);
                // 剩余天数的收益
                var daily = Math.floor((newAddMoney * lilvDay * monthYuShu) * 100) / 100;
                var total = this.toDecimal2(Math.floor((totalMonth + daily)*100) / 100); // 预计到期收益
                // console.log(total);
                $(".rate1").text(total)
            }
            if ($(".Type").text() == '1') {
                if (this.productType == 19) {
                    var zrLilv = this.actAnnualYield / 100;
                    var total = (Math.floor((newAddMoney * zrLilv / 365 * this.day) * 100) / 100);
                    console.log(zrLilv);
                    $(".rate1").text(total)
                }else{
                    var total = this.toDecimal2(Math.floor((newAddMoney * lilv / 365 * this.day) * 100) / 100);
                    console.log(newAddMoney);
                    $(".rate1").text(total)
                }
            }
      },
      tost(){
            const num = $(".money")
            const value = num.val()
            if (value%this.Money === 0) {
                if (value < parseFloat(this.Money)) {
                    $(".rightimg").attr('src',"./static/img/add2.png");
                    this.$vux.alert.show({
                        content: "投资金额不能小于起投金额"
                    })
                    setTimeout(() => {
                        num.val(this.residueMoney)
                        this.money = this.Money
                        this.$vux.alert.hide()
                        $(".leftimg").attr('src',"./static/img/cont.png")
                        $(".rightimg").attr('src',"./static/img/add.png")
                    }, 1000)
                }else{
                    const _this = this
                    _this.$loading.show();
                    const url = myPub.URL+`/trade/buyProductByChinaPnr`;
                    const id = this.id
                    const orderMoney = this.money
                    var params = new URLSearchParams();
                    params.append('token',sessionStorage.getItem("token"));
                    params.append('productId',id);
                    params.append('clientType','h5');
                    params.append('orderMoney',orderMoney);
                    params.append('payType','1');
                    if (sessionStorage.packetId) {
                        params.append('packetId',sessionStorage.packetId);
                    }
                    if (sessionStorage.incrId) {
                        params.append('incrId',sessionStorage.incrId);
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
                        if(res.data.result == 200){
                            this.isshow = true
                            this.timer()
                        }
                        if(res.data.result == 302){
                            $(".toast").css("display","block")
                            $(".bg").css("display","block")
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }else{
                this.$vux.alert.show({
                    title: '',
                    content: '投资金额必须是起投金额的整数倍,请重新输入'
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    this.money = this.Money
                    $(".leftimg").attr('src',"./static/img/cont.png")
                    this.Interest()
                }, 3000)
            }
      },
      // 开户
      go(){
         const url = myPub.URL+`/chinaPnr/userRegister`;
            var params = new URLSearchParams();
            params.append('token',sessionStorage.getItem("token"));
            params.append('clientType','h5');
            axios.post(url,params).then(res => {
                console.log(res.data);
                if(res.data.result == 200){
                    this.ChinaPnrServer = res.data.chinaPnrServer;
                    this.Version = res.data.Version; //版本号
                    this.CmdId = res.data.CmdId; //消息信息
                    this.MerCustId = res.data.MerCustId; //商户客户号
                    this.RetUrl = res.data.RetUrl; //页面返回的URL //undefinded
                    this.BgRetUrl = res.data.BgRetUrl; //商户后台应答地址
                    this.MerPriv = res.data.MerPriv; //商户私有域 //undefinded
                    this.UsrId = res.data.UsrId; //用户号
                    this.UsrMp = res.data.UsrMp; //手机号
                    this.PageType = res.data.PageType; //页面类型
                    this.ChkValue = res.data.ChkValue; //签名
                    //提交from表单
                    console.log(this.Version)
                    setTimeout(() => {
                        document.regSubmit.submit();
                    }, 500)

                }
            }).catch((err) => {
                console.log(err);
            });
      },
      // 产品数据
      productdata(){
          const _this = this
          _this.$loading.show();
          const id = this.$route.query.id
          const url = myPub.URL+`/product/getProductDetail` ;
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
                this.product = data.ProductInfo
                this.title = data.ProductInfo.productName //产品名称
                this.money = data.ProductInfo.amountMin //最小投资额
                this.Money = data.ProductInfo.amountMin //最小投资额
                this.id = data.ProductInfo.productId //产品id
                this.day = data.ProductInfo.period //理财期限
                this.Annual = parseInt(data.ProductInfo.baseAnnualYield)+parseInt(data.ProductInfo.actAnnualYield) //年利率
                this.productType = data.ProductInfo.productType
                this.actAnnualYield = data.ProductInfo.actAnnualYield
                this.residueMoney = data.ProductInfo.residueMoney //剩余额度
                this.amountIncrease = data.ProductInfo.amountIncrease //起投额度
                const dqr = data.ProductInfo.dqr
                setTimeout(() => {
                    

                    var stringTime = dqr + " 10:21:12";
                    var timestamp2 = Date.parse(new Date(stringTime))+86400;
                    timestamp2 = timestamp2 / 1000;
                    console.log(stringTime + "的时间戳为：" + timestamp2);
                    function timestampToTime(timestamp) {
                        var date = new Date(timestamp2 * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                        const Y = date.getFullYear() + '-';
                        const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                        const D = (date.getDate() +1 < 10 ? '0'+(date.getDate()+1) : date.getDate()+1);
                        const h = date.getHours() + ':';
                        const m = date.getMinutes() + ':';
                        const s = date.getSeconds();
                        return Y+M+D;
                    }
                    this.dzr = timestampToTime();
                    console.log(timestampToTime());
                }, 600)

                if (this.product.openLimit != "") {
                    if (this.product.openLimit < 10000) {
                        $(".openLimit").text(this.product.openLimit + "元")
                    }else{
                        this.product.openLimit = this.product.openLimit/10000;
                    }
                    console.log(this.product.openLimit);
                };
                if (this.product.residueMoney != "") {
                    if (this.product.residueMoney < 10000) {
                        $(".residueMoney").text(this.product.residueMoney + "元")
                    }else{
                        this.product.residueMoney = this.product.residueMoney/10000;
                    }
                };

                if (this.actAnnualYield == 0 || this.actAnnualYield == "0") {
                    $(".activeLilv").text("%");
                };
                if (this.product.productType == '19') {
                    $(".status").text("可转让")
                    this.isshow6 = true
                    this.isshow5 = false
                }else if (this.product.productType == '22') {
                    $(".status").text("不可转让")
                    this.isshow6 = false
                    this.isshow5 = true
                }else if (this.product.productType == '3') {
                    $(".status").text("不可转让")
                    this.isshow6 = false
                    this.isshow5 = true
                }else if (this.product.productType == '18') {
                    $(".status").text("不可转让")
                    this.isshow6 = false
                    this.isshow5 = true
                }

                const jd = Math.round(this.product.xmjd)
                console.log(jd)
                $(".after").css("width",jd+'%');
                if (data.ProductInfo.interestType == '3') {
                    this.isshow3 = true
                    this.isshow4 = false
                }else{
                    this.isshow3 = false
                    this.isshow4 = true
                };
            }
          }).catch((err) => {
            console.log(err)
          })
        },
        // 红包福利
        welfare(){
            const url = myPub.URL+`/welfare/getAvailableWelfareCount`;
            const id = this.id
            const orderMoney = this.money
            const proPeriod = this.day
            console.log
            var params = new URLSearchParams();
            params.append('token',sessionStorage.getItem("token"));
            params.append('proPeriod',id);
            params.append('transMoney',orderMoney);
            params.append('type','1');
            axios.post(url,params).then(res => {
                console.log(res.data)
                const data = res.data
                this.free= data
                this.totalCount = this.free.totalCount
                console.log(this.free.totalCount)
                $(".usered b").html(this.totalCount+'个可用')
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    deactivated: function() {
        sessionStorage.removeItem("redPacketMoney");
        sessionStorage.removeItem("incrMoney");
        if (sessionStorage.packetId) {
            sessionStorage.removeItem("incrId");
        }else if (sessionStorage.incrId) {
            sessionStorage.removeItem("packetId");
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
        topComponent,
        XCircle
    },
    watch: {
      '$route' (to, from) {
          this.$router.go(0);
          window.location.reload()
      }
    },
}
</script>
<style>
.weui-tab__panel{
    background: #f6f6f6
}
</style>
<style scoped lang="less">
@import '~vux/src/styles/center.less';
@import '~vux/src/styles/close.less';
.detail {
    background: #f6f6f6;position: relative;height: auto;padding-bottom: 1.5rem;
    .product{
        background: url(~@/assets/img/bg.png);color: #fefefe;
        h5{text-align: center;font-size: 1rem;line-height:2.5rem;font-weight: normal;margin-bottom: 1rem;}
        .left{
            display: inline-block;width: 39%;text-align: center;position: relative;padding: 0 3%;text-align: right;min-height: 6rem;
            .interest{
                font-size: 3rem;color: #fff;text-align: center;margin: 0;padding: 0;display: inline-block;position: relative;width: 100%;text-align: right;
                b{font-weight: normal;position: relative;bottom: 0rem;font-size: 0.8rem;}
            }
            .rate{text-align: center;font-size: 0.5rem;position:relative;top: -0.7rem;color: #7AAFFB}
        }
        .left:after{position: absolute;content: '';height: 70%;width: 1px;background: #7AAFFB;right: 0;top: 15%;}
        .right{
            display: inline-block;width: 45%;padding: 0 3%;position: relative;min-height: 6rem;
            p{
                font-size: 0.6rem;color: #7AAFFB;line-height: 1.5rem;
                span{font-size: 0.8rem;color: #fff}
            }
            .status{display: inline-block;border-radius: 30px;border: 1px solid #eee;font-size: 0.5rem;padding: 0rem 0.5rem;}
        }
        .line{width: 55%;position: relative;margin-left: 15%;margin-top: 1rem;font-size: 0.6rem;display: inline-block;}
        .Percentage{font-size: 0.6rem;display: inline-block;position: relative;top: 0.2rem;}
        .before{height: 0.1rem;width: 100%;background:#7AAFFB;position: absolute;left: 0;top: 0;}
        .after{position: absolute;width: 0;left: 0;top: 0;height: 0.1rem;background: #fefefe}
        .note{
            background: #3F93FF;height:2.2rem;margin-top: 1rem;padding: 0 1rem;
            .left1{
                text-align: left;line-height: 2.2rem;font-size: 0.6rem;color:#7AAFFB;float: left;
                b{font-size: 0.8rem;color: #fefefe;font-weight: normal;}
            }
            .right1{
                text-align: left;line-height: 2.2rem;font-size: 0.6rem;color:#7AAFFB;float: right;
                b{font-size: 0.8rem;color: #fefefe;font-weight: normal;}
            }
        }
    }
    .middle{
        padding: 0 0.5rem 3.5rem;
        .Amount{
            margin-top: 0.5rem;background: #fff;border-radius: 3px;padding: 0.5rem;color: #333;
            h5{font-size: 0.8rem;font-weight: normal;position: relative;}
            p{
                padding:1rem;text-align: center;font-size: 0.6rem;
                .leftimg{width: 2.4rem;height: 2.4rem;float: left;}
                input{border: 0;text-align: center;font-size: 1.1rem;width: 26%;margin-top: 0.8rem;}
                .rightimg{width: 2.4rem;height: 2.4rem;float: right;}
            }
            .word{
                border-top: 1px solid #eee;flex: 1;padding:1rem 0 2rem 0;
                .fl{float: left;font-size: 0.8rem;}
                .fr{
                    float: right;color: #999;font-size:0.7rem;
                    img{width: 0.4rem;height: 0.7rem;}
                    b{font-size: 1.25rem;font-weight: normal;color: #FFA303}
                }
                .usered{
                    b{font-size: 0.8rem!important;color: #999}
                }
                .c-FFA303{color: #FFA303;position: relative;bottom: 0.3rem;}
            }
            .bottomimg{
                background: url(~@/assets/img/bottom.png);background-size: 100%;background-repeat: no-repeat;background-position: bottom;padding: 1rem 0;font-size: 0.6rem;border-top: 1px solid #eee;
                span{
                    display: inline-block;
                    b{display: block;font-weight: normal;font-size: 0.5rem;color: #999;}
                }
                .fl{float: left;text-align: left;}
                .fr{float: right;text-align: right;}
            }
            .full{
                text-align: left;border-top: 1px solid #eee;
                img{float: left;width: 1.4rem;height: 1.4rem;}
            }
        }
        .list{
            margin-top: 0.5rem;background: #fff;border-radius: 3px;padding: 0.5rem;color: #333;
            li{
                list-style: none;font-size: 0.8rem;border-bottom: 1px solid #eee;padding: 0.5rem 0;
                img{float: right;width: 0.4rem;height: 0.7rem;position: relative;top: 0.1rem;}
            }
            li:last-child{border-bottom: 0;}
        }
    }
    .tzBg{
        background: #f6f6f6;
        position: fixed;
        bottom: 0;
        width: 100%;
    }
    .button{
        border: 0;
        width: 90%;
        margin: .8rem 5%;
        background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);
        height: 40px;
        text-align: center;
        color: #fff;
        font-size: 0.9rem;
        border-radius: 30px;
    }
    .tost{
        position: absolute;width: 100%;height: 150%;z-index: 11;background: #f6f6f6;top: 0;text-align: center;
        .bottom{background: #80BFFF;position: fixed;bottom:2rem;left: 0;}
    }
    .bg{position: absolute;width: 100%;height: 100%;background: rgba(0,0,0,.5);top:0;left: 0;z-index: 11;display: none;}
    .toast{
      width: 60%;height: 8.3rem;border-radius: 5px;position: absolute;top: 40%;background: #fff;left: 20%;text-align: center;z-index: 111;overflow: hidden;display: none;
      .close{color: #ccc;position: absolute;right: 1rem;top: 0.5rem;}
      p{font-size: 0.8rem;color: #333;text-align: center;line-height: 1.3rem;color: #999}
      .left{color: #2B9AFF;font-size: 0.9rem;width: 49%;display: inline-block;text-align: center;line-height: 2.2rem;height: 2.2rem;float: left;margin-top: 1.1rem;border-top: 1px solid #eee;}
      .right{font-size: 0.9rem;width: 51%;display: inline-block;text-align: center;line-height: 2.2rem;height: 2.2rem;float: left;margin-top: 1.1rem;border-top: 1px solid #eee;color: #fff;background:#2B9AFF }
    }
}
</style>
