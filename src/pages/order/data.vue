<template>
	<div class="commodityData">
		<p class="title">店铺订单<span>查看更多&ensp;<img src="~@/assets/icon/goods-left.png"></span></p>
		<ul class="commodityData_title">
			  <li class="processing"><span class="processing_img"></span><label>全部</label></li>
		      <li class="carryout"><span class="carryout_img"></span><label>进行中</label></li>
		      <li class="cancel"><span class="cancel_img"></span><label>已完成</label></li>
		      <li class="aftersales"><span class="aftersales_img"></span><label>已取消</label></li>
		</ul>

		<div class="data_display">
			<div class="yx_display">
		    	<p class="yx_display_title">店铺用户数据<span v-on:click="store_users" >查看更多&ensp;<img src="~@/assets/icon/goods-left.png"></span></p>
		    	<ul class="yx_display_tab">
			    	<li class="oli frist" v-bind:class='{ li_select: is_show1}' v-on:click="salesVolume1">店铺新增用户数据</li>
			    	<li class="oli last" v-bind:class='{ li_select: is_show2}' v-on:click="salesVolume2">员工邀新业绩排行</li>
		    	</ul>
		      <p class="yx_display_ftitle">新增用户( 单位：人 )</p>
				<!-- 店铺新增用户数据 -->
              <storeNewdata v-if="!isshow"></storeNewdata>
              <!-- 员工邀新数据 -->
              <staffNewdtata v-if="isshow"></staffNewdtata>
		    </div>

		    <div class="yx_display">
		    	<p class="yx_display_title">营销商品数据<span v-on:click="commodityData">查看更多&ensp;<img src="~@/assets/icon/goods-left.png"></span></p>
		    	<ul class="yx_display_tab">
			    	<li class="oli frist" v-bind:class='{ li_select: is_show3}' v-on:click="salesVolume3">本周访问量/销售量</li>
			    	<li class="oli last" v-bind:class='{ li_select: is_show4}' v-on:click="salesVolume4">本周商品销量对比图</li>
		    	</ul>
		      <p class="yx_display_ftitle">访问量( 单位：元 )/销售量( 单位：件 )</p>
		      <!-- 本周访问量/销售量数据-->
		      <visitsalesNewdata  v-if="!isshow7"></visitsalesNewdata>
		      <weeksalescomparisonNewdata  v-if="isshow7"></weeksalescomparisonNewdata>
		    </div>
		     <div class="yh_display">
		    	<p class="yh_display_title">订单数据<span v-on:click="orderData">查看更多&ensp;<img src="~@/assets/icon/goods-left.png"></span></p>
		    	<ul class="yh_display_tab">
			    	<li class="oli frist" v-bind:class='{ li_select: is_show5}' v-on:click="salesVolume5()">7日订单量</li>
			    	<li class="oli last" v-bind:class='{ li_select: is_show6}' v-on:click="salesVolume6()">7日交易额</li>
		    	</ul>
		      <p class="yh_display_ftitle">销售金额( 单位：元 )</p>
		      <!-- 7日订单量 -->
		      <sdayordersdata v-if="!isshow8"></sdayordersdata>
		      <sdaystradingdata v-if="isshow8"></sdaystradingdata>
		    </div>

		 </div>
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
        is_show2: false,
        is_show3: true,
        is_show4: false,
        is_show5: true,
        is_show6: false,
        //店铺新增用户数据 和 员工邀新数据 组件切换条件
        isshow: false,
        // 本周访问量销售量 和 本周销量对比图 组件切换条件
        isshow7: false,
        // 7日订单量 和 7日交易额 组件切换条件
        isshow8: false
    };
  },
  methods:{
  	// 营销商品数据
  	commodityData(){
        this.$router.push({ path: '/page/commodityData' })
    },
    // 订单数据
    orderData(){
        this.$router.push({ path: '/page/orderData' })
    },
    // 店铺新增用户数据
    store_users(){
        this.$router.push({ path: '/page/store_users' })
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
	},
    salesVolume2:function(){
        const _this = this;
        this.is_show2=true
        this.is_show1=false
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	          _this.isshow=true
	    },2000);
	},
	salesVolume3:function(){
        const _this = this;
        this.is_show3=true
        this.is_show4=false
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	          _this.isshow7=false
	    },2000);
	},salesVolume4:function(){
        const _this = this;
        this.is_show3=false
        this.is_show4=true
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	         _this.isshow7=true
	    },2000);
	},
	salesVolume5:function(){
        const _this = this;
        this.is_show5=true
        this.is_show6=false
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	          _this.isshow8=false
	    },2000);
	},
	salesVolume6:function(){
        const _this = this;
        this.is_show5=false
        this.is_show6=true
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	         _this.isshow8=true
	    },2000);
	}
  },

  mounted(){
  }
}
</script>
<style scoped lang="less">

.commodityData{
	background-color:#f8f7f7;
	.title{width:100%;
		height:auto;
		box-sizing:border-box;
		padding:11px 15px;
		font-family:PingFangSC-Semibold;
		font-size:1rem;
		color:#333333;
		letter-spacing:0;
		text-align:left;
		font-weight:600;
		border-bottom:1px solid #eeeeee;
		background: #ffffff;
		span{float: right;font-size:0.9rem;font-weight:normal;color:#999999;img{width: 0.6rem;position: relative;top: 0.2rem;}}
	}
	.commodityData_title{
		background: #ffffff;
        width:100%;
        height:90px;
        list-style:none;
        /*border:1px solid red;*/
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content:space-between;
        li{
          flex-grow: 1;
          font-family:PingFangSC-Regular;
          font-size:0.8rem;
          color:#333333;
          letter-spacing:0;
          text-align:center;
          font-weight:500;
          span{
            display:block;
            width:30px;
            height:30px;
            /*border:1px solid red;*/
            margin:10px auto;
          }
          .processing_img{
              background:url(~@/assets/icon/dingdanq.png) no-repeat
                        right center;
              background-size:100% 100%;
            }
          .carryout_img{
              background:url(~@/assets/icon/dingdan j.png) no-repeat
                        right center;
              background-size:100% 100%;
            }
          .cancel_img{
              background:url(~@/assets/icon/dingdan w.png) no-repeat
                        right center;
              background-size:100% 100%;
          }
          .aftersales_img{
              background:url(~@/assets/icon/dingdanquxiao.png) no-repeat
                        right center;
              background-size:100% 100%;
          }
        }
      }
	/*数据展示*/
	.data_display{
	 	margin-top:10px;
	 	.yx_display{
	 		height:auto;
	 		background-color:#ffffff;
	 		padding-bottom:15px;
	 		.yx_display_title{
	 			width:100%;
	 			height:auto;
	 			box-sizing:border-box;
	 			padding:11px 15px;
	 			font-family:PingFangSC-Semibold;
				font-size:1rem;
				color:#333333;
				letter-spacing:0;
				text-align:left;
				font-weight:600;
				border:1px solid #eeeeee;
				span{float: right;font-size:0.9rem;font-weight:normal;color:#999999;img{width: 0.6rem;position: relative;top: 0.2rem;}}
	 		}
	 		.yx_display_ftitle{
	 			font-family:PingFangSC-Regular;
				font-size:0.8rem;
				color:#999999;
				letter-spacing:0;
				text-align:center;
				line-height:1.2rem;
	 		}
	 		.yx_display_tab{
	 			width:80%;
	 			margin:21px auto;
				list-style:none;
				display:flex;
		        flex-direction: row;
		        flex-wrap: nowrap;
		        justify-content:space-between;
		        background-color:#ffffff;
		        li{
		        	text-align:center;
		        	flex-grow:1;
		        	font-family:PingFangSC-Regular;
					font-size:0.7rem;
					color:#777777;
					letter-spacing:0;
					padding:0.3rem 0.5rem;
					border:1px solid #eeeeee;
		        }
		        .frist{
					border-top-left-radius:0.3rem;
					border-bottom-left-radius:0.3rem;
		        }
		        .last{
		        	border-top-right-radius:0.3rem;
					border-bottom-right-radius:0.3rem;
		        }
		        .li_select{
		        	border:1.5px solid #f54321;
		        	color: #f54321;
		        }
	 		}
	 	}
	 	.yh_display{
	 		margin-top:10px;
	 		padding-bottom:15px;
	 		height:auto;
	 		background-color:#ffffff;
	 		.yh_display_title{
	 			width:100%;
	 			height:auto;
	 			box-sizing:border-box;
	 			padding:11px 15px;
	 			font-family:PingFangSC-Semibold;
				font-size:1rem;
				color:#333333;
				letter-spacing:0;
				text-align:left;
				font-weight:600;
				border:1px solid #eeeeee;
				span{float: right;font-size:0.9rem;font-weight:normal;color:#999999;img{width: 0.6rem;position: relative;top: 0.2rem;}}
	 		}
	 		.yh_display_ftitle{
	 			font-family:PingFangSC-Regular;
				font-size:0.8rem;
				color:#999999;
				letter-spacing:0;
				text-align:center;
				line-height:1.2rem;
	 		}
	 		.yh_display_tab{
	 			width:70%;
	 			margin:21px auto;
				list-style:none;
				display:flex;
		        flex-direction: row;
		        flex-wrap: nowrap;
		        justify-content:space-between;
		        background-color:#ffffff;
		        li{
		        	text-align:center;
		        	flex-grow:1;
		        	font-family:PingFangSC-Regular;
					font-size:0.7rem;
					color:#777777;
					letter-spacing:0;
					padding:0.3rem 0.5rem;
					border:1px solid #eeeeee;
		        }
		        .frist{
					border-top-left-radius:0.3rem;
					border-bottom-left-radius:0.3rem;
		        }
		        .last{
		        	border-top-right-radius:0.3rem;
					border-bottom-right-radius:0.3rem;
		        }
		        .li_select{
		        	border:1.5px solid #f54321;
		        	color: #f54321;
		        }
	 		}
	 	}
	 	.charts{
	 		width:90%;
	 		margin:10px auto;
	 		height:215px;
	 		background:-webkit-gradient(linear, 0% 20%, 8% 100%,from(#e84f57), to(#eb8139));
	 	}
	 	.yhcharts{
	 		width:90%;
	 		margin:10px auto;
	 		height:215px;
	 		background:-webkit-gradient(linear, 0% 20%, 8% 100%,from(#e84f57), to(#eb8139));
	 	}
	}
}
</style>