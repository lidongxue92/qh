<template>
  <div class="top gradient">
    <span class="back" @click='goBack'><img src="~@/assets/img/left.png"></span>
    <h1>{{title}}</h1>
    <span class="right">{{righttitle}}</span>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        iSshow: true,
      }
    },
    methods: {
      goBack() {
        this.$router.back()
      }
    },
    props: ['title', 'righttitle'],
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
  color: #fff;position: relative;
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
    text-align: center;
    font-weight: normal;
  } 

  .back{
        float: left;
        width: .8rem;
        position: relative;
        left: 1rem;
        top: .4rem;
        cursor: pointer;
        img{
            width: 100%;cursor: pointer;
        }
    }
    .right{float: right;font-size: 0.8rem;color: #fff;position: absolute;right: 0.5rem;top: 0;}
}
</style>

