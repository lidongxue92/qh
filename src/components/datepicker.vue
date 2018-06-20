<template>
  <div class="datepicker">
    <span class="datepicker_date">时间</span>
    <div class="datepicker_conter">
      <datetime v-model="value1"></datetime>
    </div>
    <div class="datepicker_border">
      <span></span>
    </div>
    <div class="datepicker_conter">
        <datetime v-model="value2"></datetime>
    </div>
    <span @click="asc" class="datepicker_btn">确定</span>
    <!-- 遮罩 -->
    <div class="date_bg"></div>
  </div>
</template>

<script>
import { Datetime, Group, XButton } from 'vux'
export default {
  components: {
    Datetime,
    Group,
    XButton
  },
  data () {
    return {
      value1: '起始时间',
      value2: '结束时间'
    }
  },
  methods: {
    asc(){
      console.log(this.value1)
      console.log(this.value2)
    }
  }
}
</script>

<style scoped lang="less">
.datepicker {
    background:#fffffffff;
    height:40px;
    padding:13px 5%;
    display:flex;
    flex-wrap: nowrap;
    border-top:1px solid #f7f7f7;
    .datepicker_date,.datepicker_btn{
      display:block;
      width:15%;
      height:100%;
      line-height:40px;
      font-family:PingFangSC-Regular;
      font-size:0.8rem;
      color:#333333;
      letter-spacing:0;
      text-align:center;
      margin-right:2%;
    }
    .datepicker_btn{
      width:16%;
      margin-right:0px;
      margin-left:2%;
      background:#f54321;
      border-radius:2px;
      color:#ffffff;
    }
    .datepicker_border{
        height:100%;
        line-height:32px;
        width:5%;
        text-align: center;
      span{
        display:inline-block;
        background-color:#333333;
        width:13px;
        height:1px;
      }
    }
    .datepicker_conter{
      width:30%;
      background:#f7f7f7;
      height:100%;
      border-radius:2px;
      box-sizing:border-box;
      font-family:PingFangSC-Regular;
      font-size:0.8rem;
      color:#999999;
      letter-spacing:0;
      text-align:center;
      line-height:40px;
    }
    .datepicker-top{
      width:100%;
      height:13px;
    }
    .date_bg{
      position: absolute;
      top:130px;
      left:0;
      width:100%;
      height:100%;
      background:#000000;
      opacity:.3;
      z-index:1;
    }
}
</style>