<template>
    <div class="detail page">
        <div class="product">
            <top v-bind:title="title"></top>
            <div class="left">
            <span class="rate">预计年化收益率</span>
                <span class="interest">{{baseAnnualYield}}<b>&ensp;%</b></span>
            </div>
            <!-- <p class="line">
                <span class="before">
                    <b class="after"></b>
                </span>
            </p>&emsp;<span class="Percentage">已售{{product.xmjd}}</span> -->
            <p class="note">
                <span class="left1">
                    剩余期限(天)
                    <b>{{product.daysLimit}}</b>
                </span>
                <span class="right1">
                    标的金额(元)
                    <b>{{product.openLimit}}</b>
                </span>
            </p>
        </div>
        <div class="middle">
            <!-- 项目介绍 -->
            <ul class="list">
                <li>预计到期收益 <span class="c-FFA303">{{product.progress | numFilter}}</span></li>
                <li>预计到期日 <span class="c-2B9AFF">{{product.dqr}}</span></li>
                <li>收益方式 <span class="type">{{product.yieldDistribType}}</span></li>
                <li>转让日期 <span>{{product.orderZrDate}}</span></li>
                <li>转让人 <span>{{product.alienator}}</span></li>
            </ul>
            <p class="big">投资{{product.period}}天  预计收益<span class="c-FFA303">{{product.progress | numFilter}}</span></p>
            <p>收益说明：本产品为用户转让产品，投资成功后即起息，产品到期还本付息，实际收益按照剩余持有天数计算</p>
            <ul class="list">
                <li @click="linkTodetail1(product.productId)">项目介绍 <span class="c-FFA303"><img src="~@/assets/img/right.png"></span></li>
            </ul>
        </div>
        <button class="button" @click="tost">立即投资</button>
        <div class="tost" v-if="isshow">
            <div class="vux-circle-demo" style="margin-top: 9rem;margin-left: 7rem;">
                <div style='width: 9.9rem;height:9.9rem;'>
                  <x-circle
                    :percent="percent"
                    :stroke-width="4"
                    :trail-width="1"
                    :stroke-color="['#36D1DC', '#5B86E5']"
                    trail-color="#ececec">
                    <span style="color:#2395FF;font-size: 2.3rem;">00.0{{time}}</span>
                  </x-circle>
                </div>
              </div>
              <button class="button bottom">确认支付</button>
        </div>
    </div>
</template>

<script>
import { PopupPicker, Tab, TabItem, Swiper,XCircle, SwiperItem,Qrcode, Divider,XDialog, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData,TransferDomDirective as TransferDom } from 'vux'
import { mapState, mapMutations, mapGetters } from 'vuex'
import * as myPub from '@/assets/js/public.js'
import axios from 'axios'
import top from '../../components/common/top1'
import $ from 'jquery'
export default {
    name: 'detail',
    directives: {
        TransferDom
    },
    data() {
        return {
            product: "",
            money:'1000',
            title:'启航新手礼',
            isshow:false,
            isshow3:false,
            isshow4:true,
            percent: 0,
            time:6,
            baseAnnualYield:''
        }
    },
    computed: {
    },
    mounted () {
    },
    created() {
    },
    activated() {
        this.productdata()
    },
    watch: {
      '$route' (to, from) {
          this.$router.go(0);
          window.location.reload()
      }
    },
    filters: {
        numFilter(value) {
            // 截取当前数据到小数点后三位
            let transformVal = Number(value).toFixed(3)
            let realVal = transformVal.substring(0, transformVal.length - 1)
            // num.toFixed(3)获取的是字符串
            return Number(realVal)
        }
    },
    methods: {
        linkTodetail1(id) {
            this.$router.push({ path: '/page/detailProduct',query: { id: id } })
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
            this.$router.push({ path: '/page/pay' })
            _this.time = '6'
            _this.percent = '0'
          }
      },
      tost(){
        this.isshow = true
        this.timer()
      },
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
                this.title = this.product.productName
                this.baseAnnualYield = Number(this.product.actAnnualYield);
                // umber(this.product.baseAnnualYield)+
                const jd = Math.round(this.product.xmjd)
                console.log(jd)
                $(".after").css("width",jd+'%')
                if (this.product.yieldDistribType == '1') {
                    $(".type").text('到期兑付本金收益')
                }
                if (this.product.yieldDistribType == '2') {
                    $(".type").text('先息后本')
                }
                if (this.product.yieldDistribType == '3') {
                    $(".type").text('等额本息')
                }
            }
          }).catch((err) => {
            console.log(err)
          })
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
        top,
        XCircle
    }
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/center.less';
@import '~vux/src/styles/close.less';
.detail {
    background: #f7f7f7;position: relative;height: auto;
    .product{
        background: url(~@/assets/img/bg.png);color: #fefefe;padding-bottom: 1rem;min-height: 13rem;
        h5{text-align: center;font-size: 1rem;line-height:2.5rem;font-weight: normal;margin-bottom: 1rem;}
        .left{
            display: inline-block;width: 100%;text-align: center;position: relative;text-align: center;margin-top: 1rem;
            .interest{
                font-size: 3rem;color: #fff;text-align: center;margin: 0;padding: 0;display: inline-block;text-align: center;margin-top: 0.6rem;
                b{font-weight: normal;position: relative;bottom: 0rem;font-size: 0.8rem;}
            }
            .rate{text-align: center;font-size: 0.5rem;position:relative;color: #7AAFFB;display: block;top: 1rem;}
        }
        .left:after{position: absolute;content: '';height: 70%;width: 1px;background: #7AAFFB;right: 0;top: 15%;}
        .line{width: 55%;position: relative;margin-left: 15%;margin-top: 1rem;font-size: 0.6rem;display: inline-block;}
        .Percentage{font-size: 0.6rem;display: inline-block;position: relative;top: 0.2rem;}
        .before{height: 0.1rem;width: 100%;background:#7AAFFB;position: absolute;left: 0;top: 0;}
        .after{position: absolute;width: 0;left: 0;top: 0;height: 0.1rem;background: #fefefe}
        .note{
            height:3.2rem;padding: 0 1rem;
            .left1{
                text-align: center;line-height: 2.2rem;font-size: 0.6rem;color:#7AAFFB;width: 40%;display: inline-block;float: left;position: relative;
                b{font-size: 0.8rem;color: #fefefe;font-weight: normal;display: block;position: relative;top: -1rem;}
            }
            .left1:after{content: '';width: 1px;height: 30%;position: absolute;right: -20%;top: 25%;background: #fff;}
            .right1{
                text-align: center;line-height: 2.2rem;font-size: 0.6rem;color:#7AAFFB;width: 40%;display: inline-block;float: right;
                b{font-size: 0.8rem;color: #fefefe;font-weight: normal;display: block;position: relative;top: -1rem;}
            }
        }
    }
    .middle{
        .list{
            margin-top: 0.5rem;background: #fff;border-radius: 3px;padding: 0.5rem;color: #666;
            li{
                list-style: none;font-size: 0.7rem;border-bottom: 1px solid #eee;padding: 0.5rem 0;
                span{float: right;color: #333;font-size: 0.7rem;img{width: 0.5rem}}
                .c-FFA303{color: #FFA303}
                .c-2B9AFF{color: #2B9AFF}
            }
            li:last-child{border-bottom: 0;}
        }
        .c-FFA303{color: #FFA303}
        .c-2B9AFF{color: #2B9AFF}
        p{padding: 0 0.5rem;color: #999;font-size: 0.7rem;}
        .big{color: #999;margin-bottom: 0.5rem;margin-top: 0.8rem;}
    }
    .button{border: 0;width: 90%;margin-left: 5%;margin-top: 1rem;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);height: 40px;text-align: center;color: #fff;font-size: 0.9rem;border-radius: 30px;}
    .tost{
        position: absolute;width: 100%;height: 100%;z-index: 11;background: #f6f6f6;top: 0;text-align: center;
        .bottom{background: #80BFFF;position: fixed;bottom:2rem;left: 0;}
    }
}
</style>
