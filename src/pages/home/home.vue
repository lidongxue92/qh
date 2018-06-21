<template>
    <div class="home">
        <!-- 临时新建进入商品详情的入口-->
        <div class="index_banner" >
            <swiper :list="demo02_list" style="width:85%;margin:0 auto;" :aspect-ratio="300/800" dots-position="center"></swiper>
            <!-- 新手 -->
            <div class="set" v-if="isshow">
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
            <div class="list" v-if="isshow1">
                <p>公告</p>
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
                <li v-for="(item,index) in datalist" :key="index">
                    <h5>{{item.Title}} <span>{{item.Data}}</span><img :src="item.img"></h5>
                    <div>
                        <p class="left">
                            <span class="Profit">{{item.Profit}}</span>
                            <span>历史年化收益率</span>
                        </p>
                        <p class="right">
                            <span class="day"><b>{{item.Day}}</b> 个月</span><span class="status">可加入</span>
                            <span class="Quota">剩余金额 <b>{{item.Quota}}</b></span>
                        </p>
                    </div>
                </li>
           </ul>
       </div>
       <p class="note">预期收益不代表对投资人实际收益的承诺 理财有风险，投资需谨慎 </p>
    </div>
</template>

<script>
import { Swiper, SwiperItem,ButtonTab, ButtonTabItem, Divider } from 'vux'
import products from '@/components/Products'
import * as myPub from '@/assets/js/public.js'
import axios from 'axios'
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
            datalist:[
                {Title:'热卖产品',Data:'新手福利高预期收益',Label:'热卖',Profit:'12%',Day:'3',Quota:'1000',img:'../../assets/img/icon_biao1@2x.png'},
                {Title:'火爆产品',Data:'热销火爆 高收益',Label:'',Profit:'10%+0.5%',Day:'2',Quota:'3000',img:'../../assets/img/icon_biao1@2x.png'}
            ],
            demo02_list: baseList,
            num:'',
            isshow:true,
            isshow1:false,
        }
    },
    created() {
        // this.getBanner()
        // this.getTheme()
        // this.getRecent()
        // this.indeData()
    },
    methods: {
        linkToDetail(id) {
            this.$router.push({ path: '/page/detail', query: { id: id } })
        },
        settlein(){
            this.$router.push({path:"/settlein"})
            
          },
        // 首页数据接口
        // indeData(){
        //   const _this = this
        //   const url ='http://public.weifenvip.com/index/Shop/index';
        //   const params = new URLSearchParams();
        //   params.append('token',localStorage.currentUser_token);
        //   params.append('open_id','oo1Fj0rhEG6wJ7UvjJUpR_97g3v0');
        //   axios.post(url,params).then(response => {
        //     const data = response.data.data
        //     this.num = data
        //     this.datalist = data.category_list
        //     console.log(data.category_list)
        //   }).catch((err) => {
        //     console.log(err)
        //   })
        // }
    },

    components: {
        Swiper,
        SwiperItem,
        products,
        ButtonTab,
        ButtonTabItem,
        Divider
    },
    //页面加载后执行
    // mounted(){
    //   console.log(num.)
    // }
}
</script>
<style type="text/css">
    .vux-slider{width: 100%!important}
</style>
<style scoped lang="less">
.home {
    background: #f7f7f7;padding-bottom:10px;color: #333;
    .index_banner{
        width:100%;position: relative;
        .set{
            position: relative;bottom: 20px;width: 90%;border-radius: 5px;margin-left: 5%;background: #fff;height: 150px;
            .left{
                display: inline-block;width:58%;font-size: 0.8rem;padding: 0 1rem;
                .res{font-size: 1rem;font-weight: 700;color: #333;}
                .new{font-size: 1rem;font-weight: 700;color: #FFA303;}
                .c-FF6332{color: #FF6332}
                .c-48BBFF{color: #48BBFF}
                .button{display: inline-block;width: 70%;line-height: 30px;color: #fff;height: 30px;font-size: 1rem;background: #2395FF;text-align: center;border-radius: 30px;margin-top: 10px;}
            }
            .right{
                display: inline-block;width: 30%;
                img{width: 100%;margin-top: 2rem;}
            }
        }
        .list{
            background: #fff;
            p{font-size: 0.8rem;padding: 0.5rem 1rem;}
            ul{
                li{
                    list-style: none;display:inline-block;width: 31%;text-align: center;
                    img{width:40%;}
                }
            }
        }
    }
    .middle{
        .productlist{
            li{
                background: #fff;margin-top: 10px;padding:1rem;
                h5{
                    border-bottom: 1px solid #eee;font-weight: normal;font-size: 1rem;
                    span{color: #999;margin-left: 10px;font-size: 0.7rem;}
                    img{float: right;}
                }
                .left{
                    display: inline-block;width: 49%;border-right: 1px solid #eee;margin-top: 1rem;text-align: center;font-size: 0.8rem;
                    .Profit{display: block;width: 100%;color: #FFA303;font-size: 1.5rem;font-weight: 600;text-align: center;}
                }
                .right{
                    display: inline-block;width: 49%;
                    .day{
                        font-size: 0.8rem;border-right: 1px solid #eee;padding: 0 0.8rem;
                        b{font-size: 1rem;font-weight: normal;}
                    }
                    .status{color: #FFA303;font-size: 0.8rem;padding:0 0.8rem;}
                    .Quota{
                        display: inline-block;width: 100%;font-size: 0.8rem;padding: 0 0.8rem;color: #999;
                        b{font-weight: normal;color: #333;font-size: 0.9rem;}
                    }
                }
            }
        }
    }
    .note{text-align: center;padding: 1rem 5rem;font-size: 0.7rem;color: #999;}
}
</style>