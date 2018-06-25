<template>
    <div class="main">
        <topComponent title='关于我们' :showLeft='false'>
            <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
        </topComponent>

        <div class="txt">
            <h1>公司介绍</h1>
            <div>
                <p>启航金服是由途粒（上海）金融信息服务有限公司倾力打造的汽车金融理财平台，总部位于中国经济、金融中心——上海。启航金服以汽车金融业务为基础，践行监管政策“小额、分散”的要求，为投资者提供安全、稳健的理财服务，同时也为借款人提供高效、便捷的融资服务。</p>
                <p>启航金服始终将社会责任感植根于企业的战略发展目标，奉行“诚信至上，合作共赢”的企业精神，并在企业的日常经营管理中围绕“产品、风控、服务为本、行业自律”四大体系，组建了一支由金融、法律、电商等领域专业人才组成的风险控制团队，凭借大数据、云计算等先进的技术优势，以及车辆抵/质押+第三方担保的风控模式，严把公司风险控制大关，同时深挖客群资金需求和偿还能力给定，设计不同期限、不同利率的产品，为投资者匹配最适合的贷款、投资服务，打造更优质更安全的互联网金融服务平台。</p>
                <p>启航金服，将继续响应国家对金融行业稳步发展的政策号召，锐意创新、防范风险、趋利避害，从金融业健康发展全局出发，深耕整个汽车金融产业链，快速推动汽车金融服务行业朝着规范有序的方向发展，进一步推进金融行业的改革和创新，提高金融资源配置效率，为大众创业、万众创新发挥积极作用。</p>
            </div>

            <h1>平台介绍</h1>
            <div>
                <p>启航金服从金融业健康发展全局出发，深挖客群资金需求和偿还能力给定，为用户设计了多款不同期限、不同利率的产品，用户可以根据自己的实际所需，找到最合适的投融资产品或服务，提高金融资源的配置效率。</p>
            </div>
        </div>
        
    </div>

</template>

<script>
import topComponent from '../../components/common/top';
import $ from 'jquery';
import axios from 'axios';
export default {
    name:'aboutUs',
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
.main{
    width: 100%;
    height: auto;
    background: #f6f6f6;
    padding-bottom: 2.5rem;
    .txt{
        width: 92%;
        margin: 0 auto;
        h1{
            font-size: 1.1rem;
            margin: 1rem 0 .6rem;
        }
        p{
            text-indent: 2em;
            color: #666;
            font-size: .9rem;
        }
    }
}
</style>