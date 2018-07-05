<template>
<div class="container">
    <topComponent title='发现' :showLeft='false'></topComponent>
      <ul>
        <li >
          <a  class="res" @click="res">
            <img src="../../assets/img/find/zhuCeSongLi.png" alt="" srcset="">
            <p>注册送礼</p>
          </a>
        </li>
         <li >
         <a  class="fen" @click="fen">
            <img src="../../assets/img/find/fengKong.png" alt="" srcset="">
            <p>风控</p>
          </a>
        </li>
         <li >
         <a  class="yao" @click="yao">
            <img src="../../assets/img/find/yaoQing.png">
            <p>邀请好友</p>
          </a>
        </li>
        <li>
        <a  class="zhao" @click="zhao">
            <img src="../../assets/img/find/zhaoCha.png" >
			   <p>全民来找茬赢现金奖励</p>
      </a>
        </li>
        <li>
        <a  class="trip" @click="trip">
            <img src="../../assets/img/find/summer.png">
			       <p>缤纷夏日送清凉，好礼等您拿</p>
          </a>
        </li>
      </ul>
      <div class="page"><page></page></div>
  </div>
</template>
<script>
import topComponent from '../../components/common/top';
import page from '../../pages/page/page'

import { Swiper, SwiperItem,ButtonTab, ButtonTabItem, Divider } from 'vux'
export default {
  name:'find',
  components: {
    topComponent,
    ButtonTabItem,
    page
  },
  data() {
    return {
    	token:sessionStorage.token
    };
  },
  methods:{
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
    yao(){
      const token = sessionStorage.token
      window.location.href='../active/yaoQing.html?token=' + token;
    },
    fen(){
      const token = sessionStorage.token
      window.location.href='../active/fengKong.html?token=' + token;
    },
    ten(){
      const token = sessionStorage.token
      window.location.href='../active/TenHaoLi.html?token=' + token;
    },
    trip(){
      const token = sessionStorage.token
      window.location.href='../active/zhaocha?token=' + token;
    },
    zhao(){
      const token = sessionStorage.token
      window.location.href='../active/tripleGifts?token=' + token;
    }
  },

  mounted(){
    this.token()
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
