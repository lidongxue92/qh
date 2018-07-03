<template>
<div class="container">
    <topComponent title='发现' :showLeft='false'></topComponent>
      <ul>
        <li >
          <a  class="res" @click="res">
            <img src="../../../static/img/tt4633.png" alt="" srcset="">
            <p>注册送礼</p>
         </a>
        </li>
         <li >
           <a class="ten" @click="ten">
            <img src="../../../static/img/tt46333.png" alt="" srcset="">
            <p>十大豪礼</p>
           </a>
        </li>
         <li >
           <a class="fen" @click="fen">
            <img src="../../../static/img/tt4642.png" alt="" srcset="">
            <p>风控</p>
         </a>
        </li>
        <li>
          <a class="yao" @click="yao">
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
    res(){
      const token = sessionStorage.token
      window.location.href='../active/zhuCeSongLi.html?token=' + token;
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
  height: 100%;
  background: #F6F6F6;
  padding-bottom: 1.3rem;

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