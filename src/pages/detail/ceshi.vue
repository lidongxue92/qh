<template>
  <div class="vux-circle-demo">
    <div style='width:100px;height:100px;'>
      <x-circle
        :percent="percent"
        :stroke-width="6"
        :trail-width="6"
        :stroke-color="['#36D1DC', '#5B86E5']"
        trail-color="#ececec">
        <span style="color:#36D1DC">00.0{{time}}</span>
      </x-circle>
    </div>
  </div>
</template>

<script>
import { XCircle } from 'vux'

export default {
  components: {
    XCircle
  },
  data () {
    return {
      percent: 0,
      time:'6'
    }
  },
  methods: {
      timer() {
          const _this =this
          if (_this.time > 0) {
              _this.time--
              setTimeout(_this.timer, 1000)
              _this.percent = parseFloat(_this.percent)+17
              console.log()
          }
      }
    },
    activated() {
       this.timer()
    },
}
</script>

<style scoped>
.vux-circle-demo {
  padding-top: 20px;
  text-align: center;
}
.vux-circle-demo > div {
  margin: 0 auto;
}
</style>

