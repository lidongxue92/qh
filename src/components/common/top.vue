<template>
  <div class="top gradient">
    <span class="back" @click='goBack' v-if='iSshow'>{{backTit}}</span>
    <slot name="left"></slot>
    <h1>{{title}}</h1>
    <slot name="right"></slot>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        backTit: '返回',
        iSshow: true
      }
    },
    methods: {
      goBack() {
        this.$router.back()
      }
    },
    props: ['title', 'back', 'showLeft'],
    mounted: function () {
      // 如果传递了back,则左侧返回文字显示的是传入的值
      if (this.$options.propsData.back !== undefined) this.backTit = this.$options.propsData.back;
      // 如果传递了showLeft(默认是true),则该值决定左侧是否显示
      if (this.$options.propsData.showLeft !== undefined) this.iSshow = this.$options.propsData.showLeft;
    }
  }
</script>
<style lang="less" scoped>
*{
  padding: 0;
  margin: 0;
}
.top{
  width: 100%;
  height: 2.8rem;
  line-height: 2.8rem;
  text-align: center;
  color: #fff;
/*渐变*/
    background: #2B9AFF;
    background: -moz-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
    background: -webkit-gradient(linear, left, color-stop(0%, #2B9AFF), color-stop(100%, #2773FF));
    background: -webkit-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
    background: -o-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
    background: -ms-linear-gradient(left, #2B9AFF 0%, #2773FF 100%);
    background: linear-gradient(to right, #2B9AFF 0%, #2773FF 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2B9AFF', endColorstr='#2773FF', GradientType=0);

  h1{
    font-size: 1rem;
  } 

  .back{
        float: left;
        width: .8rem;
        position: relative;
        left: 1rem;
        top: .4rem;
        img{
            width: 100%;
        }
    }
}
</style>

