<template>
    <div class="logo">
    <!-- 顶部数据 -->
          <div class="ts">
              <img src="~@/assets/icon/pro.png">
              <p>添加新员工完成</p>
              <p class="x-word">请重新登录店长账号</p>
          </div>
          <div>
            <span v-on:click="shop" class="left">返回员工管理</span>
            <span v-on:click="changestore" class="right">继续添加</span>
          </div>
    </div>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'
export default {
    name: 'category',
    data(){
      return {
       show: true,
       count: '',
       timer: null,
      }
     },
    created() {
        this.getCategory()
    },
    computed: {
        menuBanner() {
            return this.menu[this.currentIndex].img.url
        },
        categoryTitle() {
            return this.menu[this.currentIndex].name
        }
    },
    methods: {
        switchCategory(index, id) {
            this.currentIndex = index
            this.getProduct(id)
        },
        shop() {
            this.$router.push({ path: '/page/shop'})
        },
        changestore() {
            this.$router.push({ path: '/page/changestore'})
        },
        getCode(){
         const TIME_COUNT = 60;
         if (!this.timer) {
           this.count = TIME_COUNT;
           this.show = false;
           this.timer = setInterval(() => {
           if (this.count > 0 && this.count <= TIME_COUNT) {
             this.count--;
            } else {
             this.show = true;
             clearInterval(this.timer);
             this.timer = null;
            }
           }, 1000)
          }
       }
    }
}
</script>

<style scoped lang="less">
/*顶部背景 样式*/
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
.fl{float: left;}
.fr{float: right;}
.logo{
  padding: 20px;h5{line-height: 30px;font-size: 1rem;font-weight: normal;}
  .ts{
    margin-top: 40px;
    text-align: center;
    img{width: 5rem;};
    .x-word{margin-top: 10px;font-size: 0.9rem;color: #999999}
  } 
    .left{width: 40%;height: 40px;border-radius: 4px;display: inline-block;line-height: 40px;text-align: center;margin-top: 30px;border:1px solid #fd5536;color: #fd5536;margin-left: 5%;}
    .right{background: #fd5536;color: #ffffff;width: 40%;height: 40px;border-radius: 4px;display: inline-block;line-height: 40px;text-align: center;margin-top: 30px;margin-left: 5%;}
}
</style>
