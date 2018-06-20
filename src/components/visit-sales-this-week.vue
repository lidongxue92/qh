<template>
    <div class="charts">
      <!-- 本周访问量销售量-->
      <div id="myChart" style="width:100%;height:100%;"></div>
    </div>
</template>
<script>

export default {
  name:'charts',
  components: {
  },
  data() {
    return {
    };
  },
  methods:{
  //这是本周商品访问量/销售量趋势图
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
  },

  mounted(){
      this.yx_display()
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