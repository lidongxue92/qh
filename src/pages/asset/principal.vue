<template>
    <div class="asset">
    <!-- 资产头部 -->
    <div class="assetTop">
      <div class="title">
        <img src="~@/assets/img/left.png">
        <span>理财详情</span>
      </div>
      <div class="assetTopMain">
        <h5>待收本息(元) <span><img :src="imgSrc"></span></h5>
        <p class="totalMoney numberChange">{{totalMoney}}</p>
      </div>
      <p class="assetBottom">
          <span class="left">投资本金(元) <b>100,000.00</b></span>
          <span class="right">我要转让 >></span>
      </p>
    </div>
    <!-- 标 -->
    <div class="list">
        <ul class="tab">
            <li class="has active" @click="has">持有中</li>
            <li class="going" @click="going">投标中</li>
            <li class="had" @click="had">已兑付</li>
        </ul>
        <div class="nodata" v-if="isshow1">
            <img src="~@/assets/img/no_data.png">
            <p>您还没有持有理财产品哦</p>
            <p>赶紧去产品中心挑选吧~</p>
            <button class="button" @click="category">去理财</button>
        </div>
        <div class="Data" v-if="isshow2">
            <ul class="datalist">
                <li @click="assetdetail">
                    <h5>产品名称 <span>2017.12.12</span></h5>
                    <p class="left">
                        <span class="big">10000</span>
                        <span>投资金额(元)</span>
                    </p>
                    <p class="right">
                        <span class="color">888.88</span>
                        <span>预计到期收益(元)</span>
                    </p>
                    <img v-if="isshow3" src="~@/assets/img/lost.png">
                    <img v-if="isshow4" src="~@/assets/img/lost.png">
                    <img v-if="isshow5" src="~@/assets/img/lost.png">
                </li>
                <li @click="assetdetail">
                    <h5>产品名称 <span>2017.12.12</span></h5>
                    <p class="left">
                        <span class="big">10000</span>
                        <span>投资金额(元)</span>
                    </p>
                    <p class="right">
                        <span class="color">888.88</span>
                        <span>预计到期收益(元)</span>
                    </p>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
import topComponent from '../../components/common/top'
import axios from 'axios';
export default {
    name:'principal',
    components: {
        topComponent
    },
    data(){
        return{
            isShowTabbar:false
        }
    },
    methods:{
        goBack(){
            this.$router.back()
        }
    }
}
</script>

<style lang="less" scoped>
    
</style>


