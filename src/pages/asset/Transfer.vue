<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <div class="middle">
            <div class="Datalist">
                <ul class="tab">
                    <li v-bind:class="{ active: is_show}" @click="Transferable">可转让列表</li>
                    <li v-bind:class="{ active: is_show2}" @click="Notransferable">已转让列表</li>
                </ul>
                <div class="nodata" v-if="isshow1">
                    <img src="~@/assets/img/no_data.png">
                    <p>您还没有<span v-if = 'isshow7'>已</span>转让的理财产品哦</p>
                    <p>赶紧去产品中心挑选吧~</p>
                    <button class="button" @click="category">去理财</button>
                </div>
                <ul class="list " v-if="isshow2">
                    <li v-for="(item,index) in Product" :key="index">
                        <h5>{{item.productName}}<span>到期时间 <b>{{item.dueDate}}</b></span><span class="id" style="position: absolute;opacity: 0;">{{item.productId}}</span></h5>
                        <p>
                            <span class="big">{{item.investMoney | numFilter}}</span>
                            <span>投资金额(元)</span>
                        </p>
                        <p>
                            <span class="color">{{item.exceptedYield | numFilter}}</span>
                            <span>预计到期收益</span>
                        </p>
                        <p>
                            <span class="button 1" @click="Agreement(item.productId)">转让</span>
                            <span class="button 2">转让中</span>
                            <span class="button 3">已转让</span>
                            <span class="status">{{item.status}}</span>
                        </p>
                        <span class="img1"></span>
                    </li>
                </ul>
            </div>
        </div>
        <p class="note"> 理财有风险，投资需谨慎 </p>
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
            Product: '',
            money:'1000',
            title:'债权转让',
            is_show:true,
            isshow1:false,
            isshow2:true,
            isshow3:false,
            isshow4:true,
            isshow5:false,
            isshow6:false,
            is_show2:false,
            isshow7:false
        }
    },
    mounted () {
        // 判断token
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
    created() {
        const id = this.$route.query.id
        console.log(id)
        if (id) {
            this.is_show2 = true
            this.is_show = false
        }
    },
    filters: {
        numFilter(value) {
            // 截取当前数据到小数点后三位
            let transformVal = Number(value).toFixed(4)
            let realVal = transformVal.substring(0, transformVal.length - 1);
            // let val = Math.floor(realVal*100)/100;

            var num = realVal + "";
            var number = num.split(".")[0];//整数位
            var len = num.split(".")[1];//小数
            console.log(len);
            if (len.length >= 3) {
                var newNum = len.substr(0,2);
                newNum = number + "." + newNum;
                console.log(newNum);
            }else{
                var newNum = Number(num);
            }
            return newNum;
        }
    },
    activated() {
        this.product('1,2','2','0')
    },
    methods: {
        // 点击转让
        Agreement(id){
            this.$router.push({path:"/page/TransferAgreement",query: {id: id}})
        },
        category(){
            this.$router.push({ path: '/category' })
        },
        Transferable(){
            const _this = this
            this.isshow3 = false
            this.is_show2 = false
            this.is_show = true
            this.isshow7 = false
            this.product('1,2','2','0')
        },
        Notransferable(){
            const _this = this;
            this.product('4,5','1','1');
            this.isshow3 = true;
            this.isshow7 = true
            this.is_show2 = true;
            this.is_show = false
        },
        product(status,cx,order){
            const _this = this
          _this.$loading.show();
          const url = myPub.URL+`/user/getUserAssetsList` ;
          const params = new URLSearchParams();
          params.append('curPage','1');
          params.append('pageSize','10');
          params.append('status',status);
          params.append('token',sessionStorage.token);
          params.append('productFullStatus','0,1');
          params.append('czlx',cx);
          params.append('orderType',order);
          params.append('clientType','ios');
          axios.post(url,params).then(response => {
              _this.$loading.hide();
              const data = response.data
              console.log(response.data)
              if (data.result == '400') {
                  this.$vux.alert.show({
                      title: '',
                      content: data.resultMsg
                  })
                  setTimeout(() => {
                      this.$vux.alert.hide()
                      this.$router.push({path:"/login",query: {redirect: 'your path'}})
                  }, 3000)
              }
              if (data.result == '200') {
                this.Product = data.Product
                if (data.Product.length <= 0){
                    this.isshow1 = true
                    this.isshow2 = false
                }else{
                    this.isshow1 = false
                    this.isshow2 = true
                }
                setTimeout(() => {
                    $(".status").each(function (i,n) {
                        if ($(".status").eq(i).text() == '4') {
                            $(".button").eq(i).text('转让中')
                            $(".1").css("display","none")
                            $(".2").css("display","inline-block")
                            $(".3").css("display","none")
                        }else if ($(".status").eq(i).text() == '5') {
                            $(".button").eq(i).text('已转让')
                            $(".1").css("display","none")
                            $(".2").css("display","none")
                            $(".3").css("display","inline-block")
                        }else if ($(".status").eq(i).text() == '1'){
                            $(".button").eq(i).text('转让')
                            $(".1").css("display","inline-block")
                            $(".2").css("display","none")
                            $(".3").css("display","none")
                        }
                    })
                  }, 300)
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
        top
    },
    watch: {
      '$route' (to, from) {
          this.$router.go(0);
          window.location.reload()
      }
    },
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/center.less';
@import '~vux/src/styles/close.less';
.detail {
    background: #f6f6f6;height:auto;
    .middle{
        margin-top: 0.5rem;
        background: #f6f6f6;height:100%;
        .nodata{
            text-align: center;min-height: 35rem;
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
                width: 100%;
                li{
                    margin-top: 0.5rem;background: #fff;position: relative;
                    h5{
                        font-size: 0.8rem;color: #666;height: 2.5rem;line-height: 2.5rem;font-weight: normal;padding: 0 0.8rem;border-bottom: 1px solid #eee;
                        span{float: right;color: #999;font-size: 0.6rem;b{color: #333;font-weight: normal;}}
                    }
                    p{
                        display: inline-block;width: 32%;text-align: center;padding: 1rem 0 0.5rem 0;position: relative;
                        span{display: inline-block;width: 100%;font-size: 0.6rem;color: #999}
                        .big{font-size: 0.9rem;color: #333;}
                        .color{font-size: 0.9rem;color: #FFA303}
                        .button{border: 0;width: 80%;margin-left: 10%;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);height: 30px;text-align: center;color: #fff;font-size: 0.9rem;border-radius: 30px;line-height: 30px;position: relative;bottom: 0.8rem;display: none;}
                        .status{position: absolute;opacity: 0;}
                    }
                    .tl{text-align: left;}
                    .tr{text-align: right;}
                    .tc{text-align: center;}
                }
            }
        }
    }
    .note{font-size: 0.8rem;text-align: center;color: #999}
}
</style>
