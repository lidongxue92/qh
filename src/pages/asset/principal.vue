<template>
</template>

<script>
var echarts = require('echarts');
import $ from 'jquery';
import axios from 'axios';
export default {
    name: 'asset',
    data(){
　　  return {
        imgSrc:"../../../static/img/openEyes.png",
        totalMoney:1888800.01,
        numberChange: 10000.08,
        isShow: false,
        isshow1:false,
        isshow2:true,
        isshow3:false,
        isshow4:false,
        isshow5:false
　　  }
　　},
    methods:{
        goBack() {
            this.$router.back()
        },
        category(){
            this.$router.push({ path: '/page/category' })
        },
        assetdetail(){
            this.$router.push({ path: '/page/assetdetail' })
        },
        has(){
            $(".has").addClass('active')
            $(".going").removeClass('active')
            $(".had").removeClass('active')
        },
        going(){
            $(".going").addClass('active')
            $(".has").removeClass('active')
            $(".had").removeClass('active')
        },
        had(){
            $(".had").addClass('active')
            $(".has").removeClass('active')
            $(".going").removeClass('active')
        }
    },
    mounted() {
    }
}
</script>

<style scoped lang="less">
  h1,h2,h3,h4,h5,h6{
    font-weight: normal;
  }
  *{
    padding: 0;
    margin: 0;
  }
.asset{
    background: #f6f6f6;
    height: 100%;
    /*资产头部*/
    .assetTop{
        width: 100%;
        height: auto;
        background: url("../../assets/img/bg@2x.png") no-repeat;
        background-size: 100%;

        .title{
          padding: 1rem 0.8rem 0.5rem 0.8rem;
          margin: 0 auto;
          text-align: center;
          color: #fff;
          img{float: left;width: 0.6rem;height: 1rem;}
        }
        .assetTopMain{
          width: 85%;
          margin: 1.6rem /* 64/40 */ auto 0;
          h5{
            text-align: center;
            color: rgba(255, 255, 255, .7);
            font-size: .8rem;
            span{
              float: right;
              width: .8rem /* 30/40 */;
              img{
                width: 100%;
              }

            }
          }
          p{
            font-size: 1.5rem /* 60/40 */;
            text-align: center;
            color: #fff;
          }
        }
        .assetBottom{
            line-height:2rem;font-size: 0.6rem;color: #fff;padding: 0.8rem;height: 2rem;
            span{
                b{font-weight: normal;font-size: 0.8rem;}
            }
            .left{float: left;}
            .right{float: right;}
        }
    }
    .list{
        margin-top: 0.8rem;
        .tab{
            background: #fff;text-align: center;
            li{width: 32%;display: inline-block;line-height: 2.5rem;text-align: center;height: 2.5rem;font-size: 0.9rem;color: #999;}
            .active{color: #FFA303;border-bottom: 2px solid #FFA303}
        }
        .nodata{
            img{margin-top: 3rem;width: 4.2rem;height: 4.5rem;}
            p{font-size: 0.8rem;color: #999;line-height:1rem;margin-top: 0.5rem;}
            .button{width: 10rem;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);border: 0;border-radius: 30px;line-height: 2.2rem;height: 2.2rem;color: #fff;font-size: 0.9rem;margin-top: 1.2rem;}
        }
        .Data{
            .datalist{
                li{
                    margin-top: 0.5rem;background: #fff;position: relative;
                    h5{
                        padding: 0.8rem 1rem;color: #666;border-bottom:1px solid #eee;
                        span{float: right;color: #999;font-size: 0.5rem;}
                    }
                    p{
                        display: inline-block;width: 38%;padding: 0.8rem 1rem;color: #999;font-size: 0.6rem;
                        span{display: inline-block;width: 100%;}
                    }
                    img{position: absolute;right: 0.8rem;width: 5rem;height: 5rem;top: 1.5rem;}
                    .left{
                        .big{font-size: 1.25rem;color: #333;}
                    }
                    .right{
                        .color{font-size: 1.25rem;color: #FFA303}
                    }
                }
            }
        }
    }
}



</style>
