<template>
    <topComponent title='账单明细' :showLeft='false'>
        <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
    </topComponent>
    
</template>

<script>
import topComponent from '../../components/common/top'

import axios from 'axios';
export default {
    name:'billingDetails',
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

</style>