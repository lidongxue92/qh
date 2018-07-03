<template>
<div class="container">
    <topComponent title='发现' :showLeft='false'></topComponent>
      <ul>
        <li >
            <img src="../../assets/img/find/zhuCeSongLi.png" alt="" srcset="">
            <p>注册送礼</p>
        </li>
         <li >
            <img src="../../assets/img/find/fengKong.png" alt="" srcset="">
            <p>风控</p>
        </li>
         <li >
            <img src="../../assets/img/find/yaoQing.png">
            <p>邀请好友</p>
        </li>
        <li>
            <img src="../../assets/img/find/zhaoCha.png" >
			<p>全民来找茬赢现金奖励</p>
        </li>
        <li>
            <img src="../../assets/img/find/summer.png">
			<p>缤纷夏日送清凉，好礼等您拿</p>
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
    	token:sessionStorage.token
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
  height: auto;
  background: #F6F6F6;
  padding-bottom: 1.3rem;
  ul{
        padding-bottom: 3rem;
  }

  li{
    list-style: none;
    width: 92%;
    margin: .6rem /* 25/40 */ auto;
    background: #fff;
    img{
      width: 100%;
    }
    p{
      color: #999;
      font-size: .8rem /* 30/40 */;
      padding: .6rem /* 25/40 */;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
