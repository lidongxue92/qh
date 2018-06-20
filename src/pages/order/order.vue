    <template>
    <div class="goods">
        <div class="nav-list">
            <ul class="nav-list">
                <li  v-bind:class="{ select: is_show1}" @click="salesVolume1()">全部
                </li>
                <li v-bind:class="{ select: is_show2}" @click="salesVolume2()">进行中<span></span></li>
                <li v-bind:class="{ select: is_show3}" @click="salesVolume3()">已完成<span></span></li>
                <li v-bind:class="{ select: is_show4}" @click="salesVolume4()">
                    已取消
                </li>
            </ul>
        </div>
        <!-- 没有订单 -->
        <div class="ordernone">
            <img src="~@/assets/icon/order.png">
            <p>店铺还没有相关的订单~</p>
        </div>
        <!-- 添加商品列表 -->
        <div class="goods-list">
            <ul>
                <li v-for="(item,index) in datalist">
                    <h5 class="clearfix"><span>订单编号:{{item.bianhao}}</span><span class="fr">{{item.zhuangai}}</span></h5>
                    <div class="bb t">
                        <div class="goods-img">
                            <img :src="item.img">
                        </div>
                        <div class="goods" v-on:click="linkToDetail(11)">
                            <h5>{{item.title}}</h5>
                            <p>下单时间：{{item.ordertime}}</p>
                            <P><span>{{item.price}}</span><span class="ml">数量:{{item.shu}}</span></P>
                        </div>
                    </div>
                    <ul class="list">
                        <li class="clearfix"><span class="fl">买家:{{item.username}}</span> <span class="fr">实付:<b>{{item.trueprice}}</b></span></li>
                        <li class="clearfix"><span class="fl">推广店长:{{item.shop}}</span> <span class="fr">推广店员:{{item.store}}</span></li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="bg"></div>
    </div>
</template>
<script>
import $ from 'jquery'
import { Radio, Group } from 'vux'


export default {
  components: {
    Radio,
    Group
  },
  data () {
    return {
      radio001: [ '适合20-30岁群体', '适合30-40岁群体' , '适合40-50岁群体', '适合50-60岁群体'],
       panelShow: false,
       show:true,
        is_show1: true,
        is_show2: false,
        is_show3: false,
        is_show4: false,
        datalist:[{bianhao:'201804241267899',zhuangai:'待支付',img:'~@/assets/img/category-goods.png',ordertime:'2018-01-10 11：10',price:'￥199',shu:'2',username:'用户昵称',trueprice:'￥268',shop:'用户昵称',store:'王富贵',title:"mac/麦可子弹头经典唇膏麦可子弹头经典唇膏"},{bianhao:'201804241267899',zhuangai:'待支付',img:'~@/assets/img/category-goods.png',ordertime:'2018-01-10 11：10',price:'￥199',shu:'2',username:'用户昵称',trueprice:'￥268',shop:'用户昵称',store:'王富贵',title:"mac/麦可子弹头经典唇膏麦可子弹头经典唇膏"}]
    }
  },
  methods: {
    change (value, label) {
        const _this = this;
        console.log('change:', value)
        $(".nav-list .list").hide();
        $(".bg").hide()
         _this.$loading.show();//显示
            setTimeout(function(){  //模拟请求
                  _this.$loading.hide(); //隐藏
            },2000);
    },
    greet: function () {
        $(".nav-list .list").show()
        $(".bg").show ()
        $(".nav-list").css("z-index",100);

    },
    linkToDetail(id) {
        this.$router.push({ path: '/page/detail', query: { id: id } })
    },
    showPanel() {
       this.panelShow = true;
       $(".bg").show()
    },
    hidepanel(){
        $(".bg").hide()
        this.show = false;
    },
    //销量接口请求
    salesVolume2:function(){
            const _this = this;
            this.is_show2=true
            this.is_show1=false
            this.is_show3=false
            this.is_show4=false
            _this.$loading.show();//显示
            setTimeout(function(){  //模拟请求
                  _this.$loading.hide(); //隐藏
            },2000);
        },
        salesVolume3:function(){
            const _this = this;
            this.is_show2=false
            this.is_show1=false
            this.is_show3=true
            this.is_show4=false
            _this.$loading.show();//显示
            setTimeout(function(){  //模拟请求
                  _this.$loading.hide(); //隐藏
            },2000);
        },
        salesVolume4:function(){
            const _this = this;
            this.is_show2=false
            this.is_show1=false
            this.is_show3=false
            this.is_show4=true
            _this.$loading.show();//显示
            setTimeout(function(){  //模拟请求
                  _this.$loading.hide(); //隐藏
            },2000);
        },
        salesVolume1:function(){
            const _this = this;
            this.is_show2=false
            this.is_show1=true
            this.is_show3=false
            this.is_show4=false
            _this.$loading.show();//显示
            setTimeout(function(){  //模拟请求
                  _this.$loading.hide(); //隐藏
            },2000);
        },
  }
}

</script>
<style type="text/css">
    .weui-icon-checked:before{color: #f54321!important;}
</style>
<style scoped lang="less">
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
.clearfix{
    zoom:1;
}

.f16{font-size: 0.8rem!important;}
.fr{float: right;}
.fl{float:left; }
.ml10{margin-left: 10px;}
.pb10{padding-bottom:10px;}
.bb{border-bottom: 1px solid #dddddd;}
/*商品数据查询*/
.goods {
        background: #f1f1f1;
        .bg{position: absolute;width: 100%;height: 100%;background: rgba(0,0,0,.5);z-index: 11;left: 0;top: 0;display: none;}
        .nav-list{background: #ffffff;position: relative;
                .select{color: #f64a29;border-bottom: 2px solid #f64a29}
                li{width: 23%;display: inline-block;text-align: center;padding: 1rem 0;position: relative;font-size: 0.9rem;
                    a{position: absolute;margin-left: 10px;img{width: 0.6rem;}}
                    .t{top: 1.3rem;};.d{bottom: 1.4rem;}.sx{width: 0.9rem;position: relative;top: 0.2rem;left: 0.2rem}
                }
            }
        }
        .ordernone{;display:none;background: #ffffff;margin-top: 1rem;text-align: center;color:#333;img{width: 7rem;margin-top: 4rem;}p{margin-top: 0.5rem;}}
/*添加商品列表*/
.goods-list{
    .t{padding: 1.5rem 1rem 1rem 1.5rem;}
    li{position: relative;background: #ffffff;margin-top: 1rem;h5{padding: 0 1.5rem;border-bottom: 1px solid #dddddd;line-height: 3rem;color: #333;font-weight: normal;.fr{font-weight: 600;}}}
    .bb{
        .goods-img{
        position: relative;width:30%;display: inline-block;vertical-align:top;border: 1px solid #dddddd;
        p{position: absolute;bottom: 0;background: rgba(153,153,153,.7);text-align: center;line-height: 25px;color: #ffffff;font-size: 10px;width: 100%;z-index: 1;}
        img{width: 100%}
        .mb{display: none;position: absolute;width: 100%;height: 100%;left: 0;top: 0;background: rgba(153,153,153,.7);span{display: inline-block;width:4rem;height:1.8rem;color: #ffffff;border: 1px solid #ffffff;transform: rotate(-30deg);margin-top: 1.5rem;margin-left: 0.7rem;text-align: center;line-height: 1.8rem;}}
        }
        .goods{
            display: inline-block;margin-left:2%;width: 65%;background: #ffffff;position: relative;
            h5{width: 95%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;font-weight: normal;font-size: 0.8rem;border: 0;padding: 0;line-height: 2rem;};
            p{margin-top: 10px;font-size: 0.8rem;color: #777;.ml{margin-left: 3rem;}}

        }
    }
    .list{padding:0 1.5rem;padding-bottom:1rem;li{list-style: none;font-size: 0.8rem;line-height: 1rem;margin-top: 0.5rem;span{b{font-weight: normal;color: #f54321}}} }
}

</style>
