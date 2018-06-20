<template>
    <div class="logo">
    <!-- 顶部数据 -->
          <h5>店铺介绍</h5>
          <textarea class="input"></textarea>  
          <span class="button" v-on:click="description">保存</span>
    </div>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'
import axios from 'axios'
export default {
    name: 'category',
    data(){
　　　　　　return {
　　　　　　　　active: false,
　　　　　　}
　　　　},
    created() {
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
        linktoDetail(id) {
            this.$router.push({ path: '/page/addgoods'})
        },
        // 更改店铺介绍
        description(){
          const url ='http://public.weifenvip.com/index/Shop/editInfo';
          const description = $(".input").val();
          console.log(description)
          var params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);
          params.append('open_id','oo1Fj0rhEG6wJ7UvjJUpR_97g3v0');
          params.append('description',description);
          axios.post(url,params).then(response => {
            // const currentUser_token = response.data.data //获取token
            console.log(response)
          }).catch((err) => {
            console.log(err)
          })
        },
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
.logo{
  padding: 20px;h5{line-height: 30px;font-size: 1rem;font-weight: normal;}
  .input{width: 96%;background: #f7f7f7;line-height: 25px;border: 0;border-radius: 4px;padding-left: 4%;margin-top:10px;height: 200px;font-size: 1.1rem;color: #999999;padding: 10px 6px;}
  .button{width: 100%;height: 40px;background: #fd5536;border-radius: 4px;color: #ffffff;display: inline-block;line-height: 40px;text-align: center;margin-top: 30px}
}
</style>
