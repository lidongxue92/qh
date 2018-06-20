<template>
    <div class="home">
        <!-- 临时新建进入商品详情的入口-->
        <div class="index_banner" >
            <swiper :list="demo02_list" style="width:85%;margin:0 auto;" :aspect-ratio="300/800" dots-position="center"></swiper>
            <div class="set" v-if="isshow">
                <a href="javascript:" @click="settlein()">注册</a>
            </div>
            <div class="list" v-if="isshow1">
                <p>公告</p>
                <ul>
                    <li><img src=""></li>
                    <li><img src=""></li>
                    <li><img src=""></li>
                </ul>
            </div>
        </div>
       <div class="middle">
           <h5>精品推荐</h5>
           <div>
               <table>
                   <tr>
                       <td>新手产品</td>
                       <td></td>
                       <td>热卖</td>
                   </tr>
                   <tr>
                       <td class="first">
                            <p>12%</p>
                            <p>预计年化收益率</p>
                        </td>
                       <td>
                            <p>15天</p>
                            <p>理财期限</p>
                        </td>
                       <td>
                            <p>11000</p>
                            <p>剩余额度</p>
                       </td>
                   </tr>
                    <tr>
                       <td>火爆产品</td>
                       <td></td>
                       <td></td>
                   </tr>
                   <tr>
                       <td class="first">
                            <p>10%+0.5%</p>
                            <p>预计年化收益率</p>
                        </td>
                       <td>
                            <p>30天</p>
                            <p>理财期限</p>
                        </td>
                       <td>
                            <p>3000</p>
                            <p>剩余额度</p>
                       </td>
                   </tr>
               </table>
           </div>
       </div>
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
            datalist:[],
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
    background: #fff;padding-bottom:10px;padding: 1rem;color: #333;
    .index_banner{
        width:100%;position: relative;background: #ffffff;
        .set{
            position: absolute;top: 40%;width: 80%;min-height: 100px;left: 10%;border: 1px solid #eeeeee;
            a{display: inline-block;width: 40%;height: 30px;background:#eeeeee;color: #999999;text-align: center;line-height: 30px;border-radius: 5px;position: relative;left: 30%;top:60px;}
        }
        .list{
            p{font-size: 0.8rem;}
            ul{
                li{
                    list-style: none;display:inline-block;width: 31%;border: 1px solid #eee;text-align: center;min-height: 60px;
                    img{width: 100%;}
                }
            }
        }
    }
    .middle{
        margin-top: 30px;
        h5{font-size: 0.9rem;padding-left: 10%;font-weight: normal;}
        div{
            border: 1px solid #eeeeee;padding: 5%;margin-top: 10px;
            table{
                border: 1px solid #eee;border-collapse: collapse;width:100%;
                td{
                    border: 1px solid #eee;font-size: 0.8rem;padding: 1rem 0.5rem;width: 28%;text-align: center;
                    p{text-align: center;}
                }
                .first{width: 42%;}
            }
        }
    }
}
</style>