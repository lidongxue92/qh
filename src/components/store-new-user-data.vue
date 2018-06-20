<template>
      <div class="charts">
              <!-- 店铺新增用户数据 -->
          <div id="Chart" style="width:100%;height:100%;"></div>
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
    //店铺新增用户数据
    order_display(){
           let chart = document.getElementById("Chart");
               let echarts = require('echarts/lib/echarts');
               let mainChart = echarts.init(Chart);
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
                        }
                    ]
                };
                mainChart.setOption(option);
    },
  },

  mounted(){
      this.order_display()
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