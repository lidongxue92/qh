<template>
    <div class="home">
        <div class="index_banner" >
            <img @click="zhezhaoShow" class="imgright" src="../../assets/img/icon_head@2x.png">
            <swiper :list="demo02_list" style="width:85%;margin:0 auto;" :aspect-ratio="300/800" dots-position="center"></swiper>
            <span @click="linkToMsg" class="imgleft"><img  src="../../assets/img/icon_xiaoxi@2x.png"></span>
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
            <div class="list" v-if="!isshow1">
                <p><img src="~@/assets/img/icon_lab@2x.png" />&ensp;热烈庆祝道道理财隆重上线，百万福利派送中……</p>
                <ul>
                    <li>
                        <img src="~@/assets/img/icon_you@2x.png">
                        <p>邀请好友</p>
                    </li>
                    <li>
                        <img src="~@/assets/img/icon_huo@2x.png">
                        <p>xx活动</p>
                    </li>
                    <li>
                        <img src="~@/assets/img/icon_banz@2x.png">
                        <p>帮助中心</p>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 理财列表 -->
       <div class="middle">
           <ul class="productlist">
                <li v-for="(item,index) in newlist" @click="linkToDetail(item.productId)">
                   <h5>{{item.productName}}<span>新手福利高预期收益</span> <span class="img img1">新人专享</span></h5>
                    <div>
                        <p class="left">
                            <span class="Profit">{{item.annualYield}}<b v-if="isshow2"></b></span>
                            <span>历史年化收益率</span>
                        </p>
                        <p class="right">
                            <span class="day"><b>{{item.period}}</b> 个月</span><span class="status">可加入</span>
                            <span class="Quota">剩余金额 <b>{{item.residueMoney}}</b></span>
                        </p>
                    </div>
                </li>
                <li v-for="(item,index) in hotlist"  @click="linkToDetail(item.productId)">
                   <h5>{{item.Title}} <span>热销火爆 高收益</span><span class="img img2">热销产品</span></h5>
                    <div>
                        <p class="left">
                            <span class="Profit">{{item.annualYield}}<b v-if="isshow2"></b></span>
                            <span>历史年化收益率</span>
                        </p>
                        <p class="right">
                            <span class="day"><b>{{item.period}}</b> 个月</span><span class="status">可加入</span>
                            <span class="Quota">剩余金额 <b>{{item.residueMoney}}</b></span>
                        </p>
                    </div>
                </li>
                <li v-for="(item,index) in list"  @click="linkToDetail(item.productId)">
                   <h5>{{item.Title}} <span>热销火爆 高收益</span><span class="img img3">固收产品</span></h5>
                    <div>
                        <p class="left">
                            <span class="Profit">{{item.annualYield}}<b v-if="isshow2"></b></span>
                            <span>历史年化收益率</span>
                        </p>
                        <p class="right">
                            <span class="day"><b>{{item.period}}</b> 个月</span><span class="status">可加入</span>
                            <span class="Quota">剩余金额 <b>{{item.residueMoney}}</b></span>
                        </p>
                    </div>
                </li>
           </ul>
       </div>
       <p class="note">预期收益不代表对投资人实际收益的承诺 理财有风险，投资需谨慎 </p>
       <div class="zhezhao" @click="zhezhaoHide"></div>
        <div class="slider"><slider> </slider></div>
    </div>
</template>

<script>
import { Swiper, SwiperItem,ButtonTab, ButtonTabItem, Divider } from 'vux'
import slider from '../../components/common/slider'
import products from '@/components/Products'
import * as myPub from '@/assets/js/public.js'
import axios from 'axios'
import $ from 'jquery'
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
            list:'',
            demo02_list: baseList,
            num:'',
            isshow:true,
            isshow1:false,
            isshow2:true,
        }
    },
    created() {
        this.index_banner(),
        this.index_product()
    },
    activated: function() {
        this.index_banner(),
        this.index_product()
    },
    methods: {
        linkToDetail(id) {
            this.$router.push({ path: '/page/detail', query: { id: id } })
        },
        settlein(){
            this.$router.push({path:"/settlein"})
        },
        linkToMsg(){
          this.$router.push({path:'/page/message'})
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
          params.append('adPort','h5');
          params.append('adCanal','0');
          axios.post(url,params).then(response => {
            const data = response.data
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
                    _this.newlist = data.GsInfo
                    _this.hotlist = data.HotInfo
                    _this.list = data.XsInfo
                }

            }).catch((err) => {
                console.log(err)
            })
        }
    },
    components: {
        Swiper,
        SwiperItem,
        products,
        ButtonTab,
        ButtonTabItem,
        Divider,
        slider
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
        .imgleft{position: absolute;right: 1rem;top: 1rem;z-index: 11;width: 2rem;height: 2rem;display: inline-block;background: rgba(0,0,0,.5);border-radius: 50%;text-align:center;line-height:2rem;img{width: 0.8rem;height: 1rem}}
        .set{
            position: relative;bottom: 1rem;width: 90%;border-radius: 5px;margin-left: 5%;background: #fff;padding: 1rem 0;
            .left{
                display: inline-block;width:58%;font-size: 0.6rem;padding: 0 1rem;
                .res{font-size: 0.8rem;font-weight: 700;color: #333;}
                .new{font-size: 0.8rem;font-weight: 700;color: #FFA303;}
                .c-FF6332{color: #FF6332}
                .c-48BBFF{color: #48BBFF}
                .button{display: inline-block;width: 70%;line-height: 30px;color: #fff;height: 30px;font-size: 1rem;background: #2395FF;text-align: center;border-radius: 30px;margin-top: 10px;}
            }
            .right{
                display: inline-block;width: 30%;
                img{width: 100%;}
            }
        }
        .list{
            background: #fff;
            p{
                font-size: 0.6rem;padding: 0.2rem 1rem;background: #F6F6F6;height: 1.3rem;color: #666;
                img{width: 0.8rem;height: 0.7rem;}
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
    .middle{
        .productlist{
            li{
                background: #fff;margin-top: 10px;padding:1rem;
                h5{
                    border-bottom: 1px solid #eee;font-weight: normal;font-size: 0.8rem;height: 2.2rem;
                    span{color: #999;margin-left: 10px;font-size: 0.6rem;}
                    .img{
                        float: right;
                        display: inline-block;
                        width: 5rem;
                        height:1.8rem;
                        color: #fff;
                        text-align: center;
                        line-height:1.8rem;font-size: 0.6rem;
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