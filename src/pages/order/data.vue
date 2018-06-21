<template>
	<div class="commodityData">
		<img src="">
		<p>暂未开放 敬请期待~</p>
	</div>
</template>
<script>
import storeNewdata from '../../components/store-new-user-data'
import staffNewdtata from '../../components/staff-invite-new-data'
import visitsalesNewdata from '../../components/visit-sales-this-week'
import weeksalescomparisonNewdata from '../../components/this-week-sales-comparison'
import sdayordersdata from '../../components/sdayorders'
import sdaystradingdata from '../../components/sdaystrading'
import { Swiper, SwiperItem,ButtonTab, ButtonTabItem, Divider } from 'vux'
export default {
  name:'commodityData',
  components: {
  	//店铺新增用户数据
  	storeNewdata,
  	// 员工邀新业绩排行
  	staffNewdtata,
  	//本周访问量销售量
  	visitsalesNewdata,
  	// 本周销量对比图
  	weeksalescomparisonNewdata,
  	//7日订单量
  	sdayordersdata,
  	// 7日交易量
  	sdaystradingdata
  },
  data() {
    return {
    	is_show1: true,
    };
  },
  methods:{
  	// 营销商品数据
  	commodityData(){
        this.$router.push({ path: '/page/commodityData' })
    },
    salesVolume1:function(){
        const _this = this;
        this.is_show1=true
        this.is_show2=false
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	           _this.isshow=false
	    },2000);
	}
  },

  mounted(){
  }
}
</script>
<style scoped lang="less">

.commodityData{
	background-color:#fff;
	img{width: 100%;min-height: 300px;}
	p{font-size: 1rem;text-align: center;}
}
</style>