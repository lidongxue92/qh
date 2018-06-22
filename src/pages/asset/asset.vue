<template>
  <div class="asset">
    <div class="assetTop">
      <div class="title">
        <span><img src="../../assets/img/icon_head@2x.png"></span>
        <h1>资产</h1>
        <span><img src="../../assets/img/icon_xiaoxi@2x.png"></span>
        
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'asset',
  data(){
　　return {

　　　}
　},
}
</script>

<style scoped lang="less">
.assetTop{
  width: 100%;
  height: 11.9rem /* 475/40 */;
  background: url("../../assets/img/bg@2x.png") no-repeat;
  background-size: 100%;

  .title{
    display: flex;
    padding-top: 1.7rem /* 67/40 */;
    flex: 1;
    span{
      width: 1.6rem /* 64/40 */;
      height: 1.6rem /* 64/40 */;
      img{
        width: 100%;
      }
    }
  }
  h1{
    text-align: center;
    font-size: 1rem /* 40/40 */;
    
    color: #fff;
  }
}
</style>
