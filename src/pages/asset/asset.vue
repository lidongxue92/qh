<template>
  <div class="asset">
    <!-- 资产头部 -->
    <div class="assetTop">
      <div class="title">
        <div @click="zhezhaoShow"><span class="head"><img src="../../assets/img/icon_head@2x.png"></span></div>
        <div><h1>资产</h1></div>
        <div @click="linkToMsg"><span class="message"><img src="../../assets/img/icon_xiaoxi@2x.png"></span></div>
      </div>
      <div class="assetTopMain">
        <h5>总资产(元) <span @click="eyesTab"><img :src="imgSrc"></span></h5>
        <p class="totalMoney numberChange">{{asset.totalMoney | numFilter}}</p>
      </div>
      <div class="assetTopBottom">
        <div class="atbLeft">
          <h6>可用余额(元)</h6>
          <p class="numberChange avlBalance">{{asset.avlBalance}}</p>
        </div>
        <div class="atbRight">
          <h6>累计收益(元)</h6>
          <p class="numberChange lssy">{{asset.lssy | numFilter}}</p>
        </div>
      </div>
    </div>
    <div class="assetTop2">
      <router-link to=""></router-link>
      <p @click="linkToPlatfrom">平台福利></p>
      <p @click="linkToBiling">账单明细></p>
    </div>
    <!-- 资产头部 -->

    <!-- 充值提现 -->
    <div class="recharge">
      <div @click="linkToWithdraw"><p>提现</p></div>
      <div @click="linkToRecharge"><p class="withdraw">充值</p></div>

    </div>
    <!-- 充值提现 -->
    <div class="grayLine"></div>

    <!-- 主要内容 -->
    <div class="assetMain">
      <div class="assetMainLeft">
        <div id="charts">
          <div id="main" :style="{width:'100%',height:'14rem'}"></div>
          <div class="title">
            <h5 class="totalMoney numberChange">{{asset.totalMoney | numFilter}}</h5>
            <p>总资产(元)</p>
          </div>
        </div>

      </div>
      <div class="assetMainRight">
        <div class="moneyName1" @click="linkToPrincipal(asset.lczc)">
          <div>
            <b></b>
            <span>待收本金</span>
            <p class="numberChange lczc">{{asset.lczc}}</p>
          </div>
          <div class="nameImg1"><img src="../../assets/img/rightGray.png"></div>
        </div>

        <div class="moneyName2">
          <div>
            <b></b>
            <span>待收收益</span>
            <p class="numberChange dssy">{{asset.dssy | numFilter}}</p>
          </div>
        </div>

        <div class="moneyName3" @click="linkToIncome">
          <div>
            <b></b>
            <span>转让金额</span>
            <p class="numberChange zrje">{{asset.zrje}}</p>
          </div>
          <div class="nameImg1"><img src="../../assets/img/rightGray.png"></div>
        </div>

        <div class="moneyName4">
          <div>
            <b></b>
            <span>账户余额</span>
            <p class="numberChange avlBalance">{{asset.avlBalance}}</p>
          </div>
        </div>

        <div class="moneyName5">
          <div>
            <b></b>
            <span>冻结金额</span>
            <p class="numberChange">{{asset.frzBalance}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="zhezhao" @click="zhezhaoHide"></div>
    <div class="slider"><slider> </slider></div>

  </div>
</template>

<script>
var echarts = require('echarts');
import slider from '../../components/common/slider'
import * as myPub from '@/assets/js/public.js'
import axios from 'axios'
import $ from 'jquery'

export default {
    name: 'asset',
    components:{
        slider
    },
    data(){
    　　return {
            imgSrc:"../../../static/img/openEyes.png",
            totalMoney:0.00,
            numberChange: 0.00,
            asset:'{}',
            totalMoney:''
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
  filters: {
    numFilter(value) {
    // 截取当前数据到小数点后三位
    let transformVal = Number(value).toFixed(3)
    let realVal = transformVal.substring(0, transformVal.length - 1)
    // num.toFixed(3)获取的是字符串
    return Number(realVal)
    }
  },
   created() {
        this.token(),
        this.msg()
    },
    activated: function() {
        this.product()
    },
    methods:{
        eyesTab(){
            if (this.imgSrc == "../../../static/img/openEyes.png") {
                this.imgSrc = "../../../static/img/closeEyes.png";
                $(".numberChange").text("****")

            }else{
                this.imgSrc = "../../../static/img/openEyes.png";

                // 总额
                const totalMoney = this.toDecimal2(Math.floor((this.asset.totalMoney)*100)/100);
                $(".totalMoney").text(totalMoney);
                //可用余额
                const investMoney = this.toDecimal2(Math.floor((this.asset.investMoney)*100)/100);
                $(".investMoney").text(investMoney);

                //累计收益
                const lssy = this.toDecimal2(Math.floor((this.asset.lssy)*100)/100);
                $(".lssy").text(lssy);

                //待收本金
                const lczc =  this.toDecimal2(Math.floor((this.asset.lczc)*100)/100);
                $(".lczc").text(lczc);

                //待收收益
                const dssy = this.toDecimal2(Math.floor((this.asset.dssy)*100)/100);
                $(".dssy").text(dssy);
                //转让金额
                const zrje = this.toDecimal2(Math.floor((this.asset.zrje)*100)/100);
                $(".zrje").text(zrje);
                //账户余额
                const avlBalance = this.toDecimal2(Math.floor((this.asset.avlBalance)*100)/100);
                $(".avlBalance").text(avlBalance);
                //冻结金额
                const frzBalance = this.toDecimal2(Math.floor((this.asset.frzBalance)*100)/100);
                $(".frzBalance").text(frzBalance);

            }
        },
        zhezhaoShow(){
        $(".zhezhao").fadeIn(400);
        $(".slider").animate({left:"0"},400);
        },
        zhezhaoHide(){
        $(".zhezhao").fadeOut(400);
        $(".slider").animate({left:"-75%"},400);
        },

        linkToMsg(){
        this.$router.push({path:'/page/message'})
        },
        linkToPlatfrom(){
        this.$router.push({path:'/page/red'})
        },
        linkToBiling(){
        this.$router.push({path:'/page/billingDetails'})
        },
        linkToRecharge(){
        this.$router.push({path:'/page/recharge'})
        },
        linkToWithdraw(){
        this.$router.push({path:'/page/withdraw'})
        },
        linkToPrincipal(money){
        this.$router.push({path:'/page/principal' , query: { lczc : money}})
        },
        linkToIncome(){
        this.$router.push({path:'/page/Transfer'})
        },
        // 判断token
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
        // 数据
      product(){
        const _this = this
        _this.$loading.show();
        const url = myPub.URL+`/user/getAccountOverview` ;
        const params = new URLSearchParams();
        params.append('token',sessionStorage.token);
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
              this.asset = data.Account
              this.lczc = this.asset.lczc
            }

        }).catch((err) => {
            console.log(err)
        })
      },
      // 消息
      msg(){
        const _this = this
        const url = myPub.URL+`/msg/getMessageList` ;
        const params = new URLSearchParams();
        params.append('token',sessionStorage.token);
        params.append('pageSize','10');
        params.append('curPagel','1');
        axios.post(url,params).then(response => {
          const data = response.data
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
          if (data.unReadNum == '0') {
              $(".message img").attr("src",'../../assets/img/icon_xiaoxi@2x.png')
          }else{
              $(".message img").attr("src",'../../assets/img/Messages@2x.png')
          }
          console.log(data)
        }).catch((err) => {
          console.log(err)
        })
      },
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        }//回退上一级页面并刷新
    },
    mounted() {
        /*ECharts图表*/
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption({
                tooltip : { //提示框组件
                show:false,
                },
                color:['#41A8FF','#86C8FF','#FF8B13','#FFB971','#FF8A77'],  //手动设置每个图例的颜色
                series : [ //系列列表
                    {
                        // name:'设备状态',  //系列名称
                        type:'pie',   //类型 pie表示饼图
                        radius : ['56%', '70%'],  //饼图的半径,第一项是内半径,第二项是外半径,内半径为0就是真的饼,不是环形
                        hoverAnimation:false,
                        legendHoverLink:false,
                        itemStyle : {  //图形样式
                            normal : { //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                                label : {  //饼图图形上的文本标签
                                    show : false  //平常不显示
                                },
                                labelLine : {     //标签的视觉引导线样式
                                    show : false  //平常不显示
                                }
                            },
                            emphasis : {   //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                                label : {  //饼图图形上的文本标签
                                    show : false,
                                }
                            }
                        },
                        data:[
                            {value:80, name:'待收本金'},
                            {value:10, name:'待收收益'},
                            {value:30, name:'转让金额'},
                            {value:20, name:'账户余额'},
                            {value:25, name:'冻结金额'}
                        ]
                    }
                ]
        });
        /*ECharts图表*/
    }

}
</script>

<style scoped lang="less">
  h1,h2,h3,h4,h5,h6{
    font-weight: normal;
  }
  *{
    padding: 0;
    margin: 0;
  }
/*资产头部*/
  .assetTop{
    width: 100%;
    height: auto;
    background: url("../../assets/img/bg@2x.png") no-repeat;
    background-size: 100%;

    .title{
      padding-top: 1.7rem /* 67/40 */;
      width: 92%;
      margin: 0 auto;
      display: flex;
      flex: 1;
      div{
        width: 33.33%;
      }
      .head{
        float: left;
        width: 1.6rem /* 64/40 */;
        height: 1.6rem /* 64/40 */;
        img{
          width: 100%;
        }
      }
      h1{
        font-size: 1rem /* 40/40 */;
        color: #fff;
        text-align: center;
        font-weight: normal;
      }
      .message{
        float: right;
        width: 1.3rem /* 50/40 */;
        height: 1.3rem /* 50/40 */;
        img{
          width: 90%;
        }
      }
    }

    .assetTopMain{
      width: 85%;
      margin: 1.6rem /* 64/40 */ auto 0;
      h5{
        text-align: center;
        color: rgba(255, 255, 255, .7);
        font-size: .8rem;
        span{
          float: right;
          width: .8rem /* 30/40 */;
          img{
            width: 100%;
          }

        }
      }
      p{
        font-size: 1.5rem /* 60/40 */;
        text-align: center;
        color: #fff;
      }
    }

    .assetTopBottom{
      width: 85%;
      margin: .8rem auto 0;
      padding-bottom: .5rem;
      display: flex;
      flex: 1;
      .atbLeft,.atbRight{
        float: left;
        width: 50%;
        text-align: center;
      }
      .atbLeft{
        border-right: 1px solid rgba(255, 255, 255, .7);
      }
      h6{
        color: rgba(255, 255, 255, .7);
        font-size: .8rem;
      }
      p{
        color: #fff;
        font-size: 1rem;
      }
    }
  }
  .assetTop2{
      width: 100%;
      background: #35A2FC;
      display: flex;
      flex: 1;
      p{
        width: 50%;
        margin: .8rem /* 30/40 */ auto;
        text-align: center;
        color: rgba(255, 255, 255, .8);
      }
  }
/*资产头部*/

/*充值提现*/
  .recharge{
    width: 100%;
    background: #fff;
    display: flex;
    flex: 1;
    div{
      width: 50%;
      p{
        width: 80%;
        text-align: center;
        margin: .5rem auto;
        border: 1px solid #2395FF;
        color: #2395FF;
        border-radius: 2.5rem /* 100/40 */;
        padding-top: .7rem;
        padding-bottom: .7rem;
        font-size: 1rem;
      }
    }

    .withdraw{
      color: #fff;
      /*渐变*/
      background: #2B9AFF;
      background: -moz-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
      background: -webkit-gradient(linear, left, color-stop(0%, #2B9AFF), color-stop(100%, #2773FF));
      background: -webkit-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
      background: -o-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
      background: -ms-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
      background: linear-gradient(to right, #2B9AFF 0%, #2773FF 100%);
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2B9AFF', endColorstr='#2773FF', GradientType=0);

    }

  }
/*充值提现*/
.grayLine{
  width: 100%;
  height: 10px;
  background: #F6F6F6;
}
/*主要内容*/
  .assetMain{
    display: flex;
    flex: 1;
    padding-bottom: 50px;
    .assetMainLeft{
      width: 50%;

       #charts{
        width: 100%;
        margin-top: 2rem /* 100/40 */;
        position: relative;

      }
      .title{
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translateX(-50%);
        h5{
          text-align: center;
          color: #333;
          font-size: 1.1rem;
        }
        p{
          text-align: center;
          color: #666;
          font-size: .8rem;
        }
      }
    }

    .assetMainRight{
      width: 50%;

      b{
        display: inline-block;
        width: .4rem /* 15/40 */;
        height: .4rem /* 15/40 */;
        background: #41A8FF;
      }
      .moneyName2 b{
        background: #86C8FF;
      }
      .moneyName3 b{
        background:#FF8B13;
      }
      .moneyName4 b{
        background: #FFB971;
      }
      .moneyName5 b{
        background: #FF8A77;
      }
      .moneyName1{
        margin-top: 2rem;
      }
      .moneyName1,.moneyName2,.moneyName3,.moneyName4,.moneyName5{
        width: 100%;
        margin-bottom: .5rem /* 20/40 */;
        overflow: hidden;

        div:first-child{
          float: left;
        }

        span{
          color: #999;
          font-size: .8rem ;
        }
        p{
          font-size: 1rem;
          text-indent: .8em;
        }
        .nameImg1{
          float: right;
          margin-top: 10%;
          margin-right: 1rem;
          width: .5rem /* 20/40 */;
          img{
            width: 100%;
          }
        }
      }









    }
  }
/*主要内容*/

/*侧边栏*/
.zhezhao{
  background: rgba(0, 0, 0, .3);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 600;
  display: none;
}

</style>
