<template>
    <div class="home">
        <div class="index_banner" >
            <img @click="zhezhaoShow" class="imgright" src="../../assets/img/icon_head@2x.png">
            <swiper :list="demo02_list" style="width:85%;margin:0 auto;" :aspect-ratio="300/800" dots-position="center"></swiper>
            <span @click="linkToMsg" class="imgleft"><img class="img1" src="../../assets/img/icon_xiaoxi@2x.png"><img v-if="isshow3" class="img2" src="../../assets/img/yuan.png"></span>
            <!-- 新手 -->
            <div class="set" v-if="!isshow">
                <div class="left">
                    <p><span class="res">注册领取</span><span class="new">新手礼包</span></p>
                    <p><span class="c-FF6332">1588</span>元投资红包+<span class="c-48BBFF">2.88%</span>加息券</p>
                    <a href="javascript:" class="button" @click="settlein">立即注册</a>
                </div>
                <div class="right">
                    <img src="~@/assets/img/resimg.png">
                </div>
            </div>
            <!-- 非新手 -->
            <div class="list" v-if="isshow">
                <div id="box"><img src="~@/assets/img/icon_lab@2x.png" />
                    <ul id="con1" ref="con1" :class="{anim:animate==true}">
                        <li v-for='(item,index) in items' :key="index" @click="linkGongGao(item.title,item.content,item.date)">{{item.title}}</li>
                    </ul>
                </div>
                <ul>
                    <li @click="linkToInvite">
                        <img src="~@/assets/img/icon_you@2x.png">
                        <p>邀请好友</p>
                    </li>
                    <li @click="Dada">
                        <img src="~@/assets/img/icon_huo@2x.png">
                        <p>活动</p>
                    </li>
                    <li @click="linkToProblem">
                        <img src="~@/assets/img/icon_banz@2x.png">
                        <p>帮助中心</p>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 理财列表 -->
       <div class="middle">
           <ul class="productlist">
                <li v-for="(item,index) in newlist" @click="linkToDetail(item.productId,item.qcdz)" :key="index">
                    <h5><sapn class="prodecttitle">{{item.productName}}</sapn><span>新手福利高预期收益</span> <span class="img img1">新人专享</span></h5>
                    <div>
                        <p class="left">
                            <span class="Profit">{{item.baseAnnualYield}}<b>%+{{item.actAnnualYield}}%</b></span>
                            <span>历史年化收益率</span>
                        </p>
                        <p class="right">
                            <span class="day"><b>{{item.period}}</b> 天</span><span class="status">可加入</span>
                            <span class="Quota">剩余金额 <b>{{item.residueMoney}}元</b></span>
                        </p>
                    </div>
                </li>
                <li v-for="(item,index) in hotlist"  @click="linkToDetail(item.productId,item.qcdz)" :key="index">
                   <h5>{{item.productName}} <span>热销火爆 高收益</span><span class="img img2">热销产品</span></h5>
                    <div>
                        <p class="left">
                            <span class="Profit">{{item.baseAnnualYield}}<b>%+{{item.actAnnualYield}}%</b></span>
                            <span>历史年化收益率</span>
                        </p>
                        <p class="right">
                            <span class="day"><b>{{item.period}}</b> 天</span><span class="status">可加入</span>
                            <span class="Quota">剩余金额 <b>{{item.residueMoney}}元</b></span>
                        </p>
                    </div>
                </li>
                <li v-for="(item,index) in list"  @click="linkToDetail(item.productId,item.qcdz)" :key="index">
                   <h5>{{item.productName}} <span>热销火爆 高收益</span><span class="img img3">固收产品</span></h5>
                    <div>
                        <p class="left">
                            <span class="Profit">{{item.baseAnnualYield}}<b>%+{{item.actAnnualYield}}%</b></span>
                            <span>历史年化收益率</span>
                        </p>
                        <p class="right">
                            <span class="day"><b>{{item.period}}</b> 天</span><span class="status">可加入</span>
                            <span class="Quota">剩余金额 <b>{{item.residueMoney}}元</b></span>
                        </p>
                    </div>
                </li>
           </ul>
       </div>
       <p class="note">预期收益不代表对投资人实际收益的承诺 理财有风险，投资需谨慎 </p>
       <div class="zhezhao" @click="zhezhaoHide"></div>
        <div class="slider"><slider> </slider></div>
        <div class="page"><page></page></div>
    </div>
</template>
<style type="text/css">
    .vux-swiper{height: 11rem!important;}
</style>
<script>
import { Swiper, SwiperItem,ButtonTab, ButtonTabItem, Divider } from 'vux'
import slider from '../../components/common/slider'
import products from '@/components/Products'
import * as myPub from '@/assets/js/public.js'
import axios from 'axios'
import $ from 'jquery'
import page from '../../pages/page/page'
const baseList = [{
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/5.jpg', // 404
  title: '送你一次旅行',
  fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
}]

export default {
    name: 'Home',
    data() {
        return {
            imgList: [],
            themeList: [],
            recentList: [],
            newlist:'',
            hotlist:'',
            list:[],
            demo02_list:'[]',
            num:'',
            isshow:true,
            isshow1:false,
            isshow2:true,
            isshow3:false,

            animate:false,
              items:'',
              page: [1, 2, 3, 4, 5]
        }
    },
    created() {
        this.token();
        this.index_banner();
        this.index_product(),
        this.msg()
        this.Notice()
        if (this.isshow == true) {
            $(".middle").css("margin-top",'0')
        }
        setInterval(this.scroll,2500)
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        },//回退上一级页面并刷新
    },
    methods: {
        // 首页banner接口
        index_banner(){
          const _this = this
          const url = myPub.URL+`/front/getAdvList` ;
          const params = new URLSearchParams();
          params.append('adType',1);
          params.append('adPosition',1);
          params.append('adPort','pc');
          params.append('adCanal',0);
          axios.post(url,params).then(response => {
            const data = response.data
            console.log(data);
            // _this.demo02_list = data.Advertise.adImg;

          }).catch((err) => {
            console.log(err)
          })
        },
        linkToDetail(id,dz) {
            if (!sessionStorage.token) {
                this.$vux.alert.show({
                    title: '',
                    content: '请登录'
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    this.$router.push({path:"/login",query: {redirect: 'your path'}})
                }, 2000)
            }else{
                this.$router.push({ path: '/page/detail', query: { id: id,dz:dz } })
            }
        },
        linkToInvite(){
            this.$router.push({path:'/page/invite'})
        },
        Dada(){
            this.$router.push({path:'/data'})
        },
        linkToProblem(){
           this.$router.push({path:'/page/commonProblem'})
        },
        settlein(){
            this.$router.push({path:"/settlein"})
        },
        linkToMsg(){
            if (!sessionStorage.token) {
                this.$vux.alert.show({
                    title: '',
                    content: '请登录'
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    this.$router.push({path:"/login",query: {redirect: 'your path'}})
                }, 2000)
            }else{
                this.$router.push({path:'/page/message'})
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
        // 首页banner接口
        index_banner(){
          const _this = this
          const url = myPub.URL+`/front/getAdvList` ;
          const params = new URLSearchParams();
          params.append('adType','1');
          params.append('adPosition','1');
          params.append('adPort','PC');
          params.append('adCanal','0');
          axios.post(url,params).then(response => {
            const data = response.data
            var str = [];
            for (var i = 0; i < data.Advertise.length; i++) {
                 var obj = {
                     img: data.Advertise[i].adImg,
                     Url: data.Advertise[i].adLink,
                 };
                 str.push(obj);
             }
             this.demo02_list = str
            console.log(data)
          }).catch((err) => {
            console.log(err)
          })
        },
        // 产品推荐
        index_product(){
            const _this = this
            _this.$loading.show();
            const url = myPub.URL+`/index/getIndexPickProduct` ;
            const params = new URLSearchParams();
            params.append('clientType','h5');
            if (sessionStorage.token) {
                params.append('token',sessionStorage.token);
            }
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
                        this.$router.push({path:"/login",query: {redirect: 'your path'}})
                    }, 3000)
                }
                if (data.result == '200') {
                    _this.newlist = data.XsInfo
                    _this.hotlist = data.HotInfo
                    _this.list = data.GsInfo
                }

            }).catch((err) => {
                console.log(err)
            })
        },
        // 判断token
        token(){
            if (!sessionStorage.token) {
                this.isshow = false
            }else{
                this.isshow = true
            }
        },
        flushCom:function(){
　　　　　　this.$router.go(0);
　　　　},
        // 文字滚动
        scroll(){
          this.animate = true
          setTimeout(() => {
            this.items.push(this.items[0]);
            this.items.shift();
            this.animate= false;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
          },1500)
        },
        // 消息接口
        msg(){
          const _this = this
          const url = myPub.URL+`/msg/getMessageList` ;
          const params = new URLSearchParams();
          params.append('token',sessionStorage.token);
          params.append('pageSize','10');
          params.append('curPagel','1');
          axios.post(url,params).then(response => {
            const data = response.data
            if (data.unReadNum == '0') {
                this.isshow3 = false
            }else{
                this.isshow3 = true
            }
            console.log(data)
          }).catch((err) => {
            console.log(err)
          })
        },
        // 公告
        Notice(){
          const _this = this
          const url = myPub.URL+`/index/getInfoManageList` ;
          const params = new URLSearchParams();
          params.append('imType','2');
          axios.post(url,params).then(response => {
            const data = response.data
            this.items = data.InfoManage;

            console.log(data)
          }).catch((err) => {
            console.log(err)
          })
        },
        // 首页公告
        linkGongGao(title,content,data){
            sessionStorage.setItem("title",title);
            sessionStorage.setItem("content",content);
            sessionStorage.setItem("data",data);
            this.$router.push({path:'/page/msgDetail1'})
        },
    },
    mounted() {
        if (this.isshow == true) {
            $(".middle").css("margin-top",'0')
        }
    },
    components: {
        Swiper,
        SwiperItem,
        products,
        ButtonTab,
        ButtonTabItem,
        Divider,
        slider,
        page
    },
}
</script>
<style type="text/css">
    .vux-slider{width: 100%!important}
</style>
<style scoped lang="less">
.home {
    background: #f7f7f7;color: #333;height: 100%;
    .index_banner{
        width:100%;position: relative;
        .imgright{position: absolute;left: 1rem;top: 1rem;z-index: 11;width: 2rem;height: 2rem;}
        .imgleft{
            position: absolute;right: 1rem;top: 1rem;z-index: 11;width: 2rem;height: 2rem;display: inline-block;background: rgba(0,0,0,.5);border-radius: 50%;text-align:center;line-height:2rem;
            .img1{width: 0.8rem;height: 1rem}
            .img2{position: absolute;width:0.5rem;height: 0.5rem;right: 0.4rem;top: 0.3rem;}
        }
        .set{
            position: absolute;top: 9rem;width: 90%;border-radius: 5px;margin-left: 5%;background: #fff;padding: 1rem 0;
            .left{
                display: inline-block;width:57%;font-size: 0.6rem;padding: 0 1rem;
                .res{font-size: 0.8rem;font-weight: 700;color: #333;}
                .new{font-size: 0.8rem;font-weight: 700;color: #FFA303;}
                .c-FF6332{color: #FF6332}
                .c-48BBFF{color: #48BBFF}
                .button{display: inline-block;width: 70%;line-height: 30px;color: #fff;height: 30px;font-size: 1rem;background: #2395FF;text-align: center;border-radius: 30px;margin-top: 10px;}
            }
            .right{
                display: inline-block;
                width: 30%;
                img{
                    width: 100%;
                }
            }
        }
        .list{
            background: #fff;
            #box{
                font-size: 0.6rem;padding: 0.2rem 1rem;background: #F6F6F6;height: 1.3rem;color: #666;height:31px;
                line-height: 30px;
                overflow: hidden;
                transition: all 0.5s;
                .anim{
                    transition: all 1.5s;
                    margin-top: -34px;
                  }
                  #con1 li{
                    list-style: none;padding: 0;width: 100%;background: transparent;text-align: left;padding-left: 1.2rem;
                  }
                img{width: 1rem;height: 1rem;position: relative;top: 0.2rem;}
            }
            ul{
                li{
                    list-style: none;display:inline-block;width: 31%;text-align: center;background: #fff;padding: 1rem 0;
                    p{background: transparent;font-size: 0.7rem;}
                    img{width:2rem;height: 2rem;}
                }
            }
        }
    }
    .mt5{margin-top: 5rem;}
    .middle{
        margin-top: 7rem;
        .productlist{
            li{
                background: #fff;margin-top: 10px;padding:1rem;min-height: 8rem;
                h5{
                    border-bottom: 1px solid #eee;font-weight: normal;font-size: 0.8rem;height: 2.2rem;position: relative;
                    .prodecttitle{display: inline-block;max-width: 5.5rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;position: relative;top: 0.3rem;}
                    span{color: #999;margin-left: 10px;font-size: 0.6rem;}
                    .img{
                        float: right;
                        display: inline-block;
                        width: 5rem;
                        height:1.8rem;
                        color: #fff;
                        text-align: center;
                        line-height:1.8rem;font-size: 0.6rem;position: absolute;right:0rem;top:0rem;
                    }
                    .img1{background: url(~@/assets/img/icon_biao1@2x.png);background-size: 100% ;background-repeat: no-repeat;}
                    .img2{background: url(~@/assets/img/icon_biao2@2x.png);background-size: 100% ;background-repeat: no-repeat;}
                    .img3{background: url(~@/assets/img/icon_biao4@2x.png);background-size: 100% ;background-repeat: no-repeat;}
                }
                .left{
                    display: inline-block;width: 48%;border-right: 1px solid #eee;margin-top: 1rem;text-align: left;font-size: 0.6rem;color: #999;
                    .Profit{
                        display: block;width: 100%;color: #FFA303;font-size: 2rem;font-weight: 600;text-align: left;
                        b{font-size: 1rem;font-weight: normal;}
                    }
                }
                .right{
                    display: inline-block;width: 48%;
                    .day{
                        font-size: 0.6rem;border-right: 1px solid #eee;padding: 0 0.8rem;
                        b{font-size: 0.8rem;font-weight: normal;}
                    }
                    .status{color: #FFA303;font-size: 0.6rem;padding:0 0.8rem;}
                    .Quota{
                        display: inline-block;width: 100%;font-size: 0.6rem;padding: 0 0.8rem;color: #999;
                        b{font-weight: normal;color: #333;font-size: 0.9rem;}
                    }
                }
            }
        }
    }
    .note{text-align: center;padding: 1rem 5rem;font-size: 0.5rem;color: #999;margin-bottom: 4rem;background: #f7f7f7;}
    .zhezhao{background: rgba(0, 0, 0, .3);position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 600;display: none}
}
</style>
