<template>
    <div class="logo">
    <!-- 顶部数据 -->
          <h5>添加新店员</h5>
          <input class="input" placeholder="请输入店员姓名" v-model='name'/>
          <input class="input" placeholder="请输入店员手机号" v-model='mobile'/>
          <span v-on:click="shuju" class="button">保存</span>
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
              name:'',
              mobile:''

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
        storesuccess() {
            this.$router.push({ path: '/page/storesuccess'})
        },
        //添加店员信息
        shuju(){
          const url ='http://public.weifenvip.com/api/v1/shop/editshopkeeper';
          var params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);
          params.append('name',this.name);
          params.append('mobile',this.mobile);
          axios.post(url,params).then(response => {
            // const currentUser_token = response.data.data //获取token
            console.log(response)
            next('/page/storesuccess')
          }).catch((err) => {
            console.log(err)
          })
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
.logo{
  padding: 20px;h5{line-height: 30px;font-size: 1rem;font-weight: normal;}
  .input{width: 96%;background: #f7f7f7;line-height: 40px;border: 0;border-radius: 4px;padding-left: 4%;margin-top:20px; }
  .button{width: 100%;height: 40px;background: #fd5536;border-radius: 4px;color: #ffffff;display: inline-block;line-height: 40px;text-align: center;margin-top: 30px}
}
</style>
