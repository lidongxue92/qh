<template>
<div class="container">
    <topComponent title='发现' :showLeft='false'></topComponent>
      <ul>
        <li >
          <a :href="'http://test.qihangjf.com:29084/zhuCeSongLi.html?token=' + token">
            <img src="../../../static/img/tt4633.png" alt="" srcset="">
            <p>注册送礼</p>
         </a>
        </li>
         <li >
           <a :href="'http://test.qihangjf.com:29084/TenHaoLi.html?token=' + token">
            <img src="../../../static/img/tt46333.png" alt="" srcset="">
            <p>十大豪礼</p>
           </a>
        </li>
         <li >
           <a :href="'http://test.qihangjf.com:29084/fengKong.html?token=' + token">
            <img src="../../../static/img/tt4642.png" alt="" srcset="">
            <p>风控</p>
         </a>
        </li>
        <li>
          <a :href="'http://test.qihangjf.com:29084/yaoQing.html?token=' + token">
            <img src="../../../static/img/tt463.png">
            <p>邀请好友</p>
          </a>
        </li>
      </ul>
  </div>
</template>
<script>
import topComponent from '../../components/common/top';

import { Swiper, SwiperItem,ButtonTab, ButtonTabItem, Divider } from 'vux'
export default {
  name:'find',
  components: {
    topComponent,
    ButtonTabItem,
  },
  data() {
    return {
    	
    };
  },
  methods:{

  },

  mounted(){
  }
}
</script>
<style scoped lang="less">
*{
  padding: 0;
  margin: 0;
}
.container {
  width: 100%;
  height: 100%;
  background: #F6F6F6;

  li{
    list-style: none;
    width: 92%;
    margin: .5rem /* 20/40 */ auto;
    background: #fff;
    img{
      width: 100%;
    }
    p{
      color: #999;
      font-size: .7rem /* 28/40 */;
      padding: .6rem /* 25/40 */;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>