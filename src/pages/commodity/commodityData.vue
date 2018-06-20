<template>
	<div class="commodityData">
		<ul class="commodityData_title">
			<li>
				<span>访问量(次)</span></br><label>32908.00</label>
			</li>
			<li>
				<span>销售量(件)</span></br><label>32908.00</label>
			</li>
			<li>
				<span>销售金额(元)</span></br><label>32908.00</label>
			</li>
		</ul>

		<div class="data_display">

		    <div class="yx_display">
		    	<p class="yx_display_title">营销商品访问量/销售量<span>查看更多&ensp;<img src="~@/assets/icon/goods-left.png"></span></p>
		    	<ul class="yx_display_tab">
			    	<li class="oli frist" v-bind:class='{ li_select: is_show1}' v-on:click="salesVolume1()">7日</li>
			    	<li class="oli" v-bind:class='{ li_select: is_show2}' v-on:click="salesVolume2()">30日</li>
			    	<li class="oli last" v-bind:class='{ li_select: is_show3}' v-on:click="salesVolume3()">年度</li>
		    	</ul>
		      <p class="yx_display_ftitle">访问量( 单位：元 )/销售量( 单位：件 )</p>
	          <div class="charts" >
		     	<div id="myChart" style="width:100%;height:100%;"></div>
			  </div>
		    </div>

		     <div class="yh_display">
		    	<p class="yh_display_title">营销商品销量对比图<span>查看更多&ensp;<img src="~@/assets/icon/goods-left.png"></span></p>
		    	<ul class="yh_display_tab">
			    	<li class="oli frist" v-bind:class='{ li_select: is_show4}' v-on:click="salesVolume4()">7日</li>
			    	<li class="oli" v-bind:class='{ li_select: is_show5}' v-on:click="salesVolume5()">30日</li>
			    	<li class="oli last" v-bind:class='{ li_select: is_show6}' v-on:click="salesVolume6()">年度</li>
		    	</ul>
		      <p class="yh_display_ftitle">销售金额( 单位：元 )</p>
	          <div class="yhcharts" >
		     	 <div id="yhChart" style="width:100%;height:215px;"></div>
			  </div>
		    </div>

		 </div>
	</div>
</template>
<script>
import { Swiper, SwiperItem,ButtonTab, ButtonTabItem, Divider } from 'vux'
export default {
  name:'commodityData',
  components: {
  },
  data() {
    return {
    	is_show1:true,
    	is_show2:false,
    	is_show3:false,
    	is_show4:true,
    	is_show5:false,
    	is_show6:false
    };
  },
  methods:{
  	//这是营销商品访问量/销售量趋势图
	yx_display(){
		   var chart = document.getElementById("myChart");
               let echarts = require('echarts/lib/echarts');
               let mainChart = echarts.init(myChart);
                var option = {
                    title: {
                        text: ''
                    },
                    tooltip : {
                       // trigger: 'item'
                    },
                    // legend: {
                    //     data:['访问量','销售量']
                    // },
                    // toolbox: {
                    //     feature: {
                    //         saveAsImage: {}
                    //     }
                    // },
                    grid: {
                        left: '-8%',
                        right: '10%',
                        bottom: '10%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : ['1日', '2日', '3日', '4日', '5日', '6日', '7日'],
                             axisLine: {
			                    lineStyle: {
			                        type: 'solid',
			                        color: '#ffffff',//左边线的颜色
			                        width:'2'//坐标线的宽度
				                    }
				                },
				                axisLabel: {
				                    textStyle: {
				                        color: '#ffffff',//坐标值得具体的颜色
				                    }
				                },
				                axisTick:{
							        show:false/*隐藏刻度*/
							    }
			                }
                    ],
                    yAxis : [
                        {
		                   type: 'value',
					        axisLine: {
		                    lineStyle: {
			                        type: 'solid',
			                        color: 'transparent',//左边线的颜色
			                        width:'2'//坐标线的宽度
			                    }
			                },
                        }
                    ],
                    series : [
                        {
                            name:'访问量',
                            type:'line',
                            stack: '销量',
                            itemStyle : { normal: {label : {show: true,color:'#ffffff'}}},
                            data:[1270, 6382, 2091, 1034, 6382, 2091, 1034],
                            color:"#ffffff"
                        },
                        {
                            name:'销售量',
                            type:'line',
                            stack: '销量',
                            itemStyle : { normal: {label : {show: true,color:'#f7ff50'}}},
                            data:[2270, 3456, 5432, 3423, 12, 291, 134],
                            color:"#f7ff50"
                        }
                    ]
                };
                mainChart.setOption(option);
  	},

  	  	//这是营销订单趋势图
	yh_display(){
		    let echarts = require('echarts/lib/echarts')
		    let chartBox=document.getElementsByClassName('yhcharts')[0]
		    let myChart=document.getElementById('yhChart')
		    function resizeCharts() {//为调整图标尺寸的方法
		        myChart.style.width=chartBox.style.width+'px'
		        myChart.style.height=chartBox.style.height+'px'
		    }
		     let mainChart = echarts.init(myChart)// 基于准备好的dom，初始化echarts实例
		     var option = null;
		     var option={
		        tooltip:{
		            show:true
		        },
		        xAxis : [{
		                type : 'category',
		               data:['商品', '商品', '商品', '商品', '商品', '商品', '商品'],
		               axisLine: {
			                    lineStyle: {
			                        type: 'solid',
			                        color: '#ffffff',//左边线的颜色
				                    }
				        },
		                axisLabel:{
		                     textStyle:{
		                         color:"#ffffff"
		                     },
		                      interval:0,
                                    rotate:0
		                 }
		        }],
		        yAxis : [
		        {
		                   type: 'value',
					        axisLine: {
		                    lineStyle: {
			                        type: 'solid',
			                        color: 'transparent',//左边线的颜色
			                        width:'2'//坐标线的宽度
			                    }
			                },
                        }
		        ],
		        series : [
		            {
		                "name":"销量",
		                "type":"bar",
		                "data":[2270, 3456, 5432, 3423, 632, 291, 134],
		                itemStyle : { normal: {label : {show: true,color:'#ffffff',position:'top'}}},
		                 barWidth : 10,//柱图宽度
		                                         color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                              '#ffffff'
                            ];
                            return colorList[params.dataIndex]
                        },
		            }
		        ]

		    };
		    mainChart.setOption(option);
  	},
  	salesVolume1:function(){
        const _this = this;
        this.is_show1=true
        this.is_show2=false
        this.is_show3=false
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	    },2000);
	},
    salesVolume2:function(){
        const _this = this;
        this.is_show2=true
        this.is_show1=false
        this.is_show3=false
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	    },2000);
	},
	salesVolume3:function(){
        const _this = this;
        this.is_show2=false
        this.is_show1=false
        this.is_show3=true
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	    },2000);
	},salesVolume4:function(){
        const _this = this;
        this.is_show4=true
        this.is_show5=false
        this.is_show6=false
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	    },2000);
	},
	salesVolume5:function(){
        const _this = this;
        this.is_show4=false
        this.is_show5=true
        this.is_show6=false
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	    },2000);
	},
	salesVolume6:function(){
        const _this = this;
        this.is_show4=false
        this.is_show5=false
        this.is_show6=true
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	    },2000);
	}
  },
  mounted(){
	  	this.yx_display()
	  	this.yh_display()
  }
}
</script>
<style scoped lang="less">

.commodityData{
	background-color:#f8f7f7;
	.commodityData_title{
		list-style:none;
		display:flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content:space-between;
        background-color:#ffffff;
        padding:20px 0 12px 0;
        li{
        	text-align:center;
        	flex-grow:1;
        	span{
        		font-family:PingFangSC-Regular;
				font-size:0.9rem;
				color:#333333;
				letter-spacing:0;
        	}
        	label{
        		font-family:PingFangSC-Semibold;
				font-size:1.1rem;
				color:#f54321;
				letter-spacing:0;
				font-weight:600;
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
					font-size:0.8rem;
					color:#777777;
					letter-spacing:0;
					padding:5px 20px;
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
					font-size:0.8rem;
					color:#777777;
					letter-spacing:0;
					padding:5px 20px;
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