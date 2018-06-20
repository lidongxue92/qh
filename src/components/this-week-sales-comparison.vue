<template>
      <div class="yhcharts" >
         <div id="zxChart" style="width:100%;height:215px;"></div>
      </div>
</template>
<script>

export default {
  name:'',
  components: {
  },
  data() {
    return {
    };
  },
  methods:{
    //本周商品销量对比图
    zx_display(){
            let echarts = require('echarts/lib/echarts')
            let chartBox=document.getElementsByClassName('yhcharts')[0]
            let myChart=document.getElementById('zxChart')
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
  },

  mounted(){
      this.zx_display()
  }
}
</script>
<style scoped lang="less">
    .charts{
      width:90%;
      margin:10px auto;
      height:215px;
      background:-webkit-gradient(linear, 0% 20%, 8% 100%,from(#e84f57), to(#eb8139));
    }
</style>