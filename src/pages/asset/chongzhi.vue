<template>
    <div class="container">
        <topComponent title='充值' :showLeft='false'>
            <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
        </topComponent>

        <div class="czTop">

        </div>
    </div>
</template>

<script>
import topComponent from '../../components/common/top'
import $ from 'jQuery';
import axios from 'axios';
export default {
    name:'recharge',
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
.container{
    width: 100%;
    height: 100%;
    background: #f6f6f6;

    .czTop{
        
    }
}
</style>


