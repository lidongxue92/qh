<template>
<div class="container">
    <topComponent title='模板' :showLeft='false'>
        <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
    </topComponent>
    
</div>
</template>

<script>
import topComponent from '../../components/common/top'
import axios from 'axios';
import * as myPub from '@/assets/js/public.js'
import $ from 'jquery'
export default {
    name:'recharge',
    components: {
        topComponent
    },
    data(){
        return{

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
    background: #f6f6f6;
    width: 100%;
    height: 100%;
}
</style>


