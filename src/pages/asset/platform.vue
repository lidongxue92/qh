<template>
    <topComponent title='平台福利' :showLeft='false'>
        <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
    </topComponent>
</template>

<script>
import topComponent from '../../components/common/top'
import axios from 'axios';
export default {
    name:'platform',
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
    
</style>


