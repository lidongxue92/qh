<template>
    <div class="dyinvite">
        <!--切换按钮-->
        <ul class="dyinvite_title">
            <li class="active">今日</li>
            <li>7日</li>
            <li>30日</li>
            <li>自定义</li>
        </ul>
        <p class="tjdate">数据统计日期 2018/05/10</p>
        <ul class="dylist">
            <li class="dylist_title"><span>店员</span><label>引客数量</label></li>
            <!--店员排名列表循环体-->
             <li v-for="(item,index) in products" class="dylist_cont" ><span class="dylist_mc">{{item.mc}}</span><img :src="item.tx" alt="" class="dylist_tx"><span class="dylist_name">{{item.name}}</span><label class="dylist_num">{{item.num}}</label></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'dyinvite',
    data() {
        return {
            products:[{mc:'1',tx:'https://sfault-avatar.b0.upaiyun.com/397/104/3971048296-572b35995e21c_big64',name:'王浩',num:123},{mc:'2',tx:'https://sfault-avatar.b0.upaiyun.com/397/104/3971048296-572b35995e21c_big64',name:'八戒',num:233},{mc:'3',tx:'https://sfault-avatar.b0.upaiyun.com/397/104/3971048296-572b35995e21c_big64',name:'悟空',num:1213},{mc:'4',tx:'https://sfault-avatar.b0.upaiyun.com/397/104/3971048296-572b35995e21c_big64',name:'八戒',num:233},{mc:'5',tx:'https://sfault-avatar.b0.upaiyun.com/397/104/3971048296-572b35995e21c_big64',name:'八戒',num:233}]
        }
    },
    created() {
    },
    methods: {

    },

    components: {

    }
}
</script>

<style scoped lang="less">
.dyinvite{
    background:#f8f7f7;
    .dyinvite_title{
        list-style:none;
        height:auto;
        background-color:#ffffff;
        display:flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content:space-between;
        padding:15px 1% 0 1%;
        box-sizing:border-box;
        font-family:PingFangSC-Regular;
        font-size:1rem;
        color:#333333;
        letter-spacing:0;
        text-align:center;
        border-bottom:1px solid #f7f7f7;
        li{
            width:22%;
            height:100%;
            padding-bottom:15px;
            text-align:center;
        }
        .active{
            border-bottom:2px solid #f54321;
        }
    }
    .tjdate{
        font-family:PingFangSC-Regular;
        font-size:0.8rem;
        color:#777777;
        letter-spacing:0;
        text-align:left;
        box-sizing:border-box;
        padding:10px 0px 10px 20px;
    }
    .dylist{
        background-color:#ffffff;
        li{
            text-align:center;
            font-family:PingFangSC-Regular;
            font-size:1rem;
            color:#333333;
            letter-spacing:0;
            text-align:center;
            line-height:40px;
            span{
                display:inline-block;
                width:50%;
                height:100%;
            }
            label{
                display:inline-block;
                width:50%;
                height:100%;
                text-align:right;
                padding-right:20px;
                box-sizing:border-box;
            }
        }
        .dylist_title{
            height:40px;
            border-bottom:1px solid #eeeeee;
        }
        .dylist_cont{
            height:60px;
            display:flex;
            line-height:30px;
            padding:15px 20px;
            box-sizing:border-box;
            border-bottom:1px solid #eeeeee;
            .dylist_mc{
                width:15%;
                transform:rotate(5deg);
                font-family:PingFangSC-Regular;
                font-size:1rem;
                color:#777777;
                letter-spacing:0;
                text-align:left;
            }
            .dylist_tx{
                width:20%;
                width:30px;
                height:30px;
                border-radius:100%;
            }
            .dylist_name{
                width:30%;

            }
            .dylist_num{
                text-align:right;
                width:50%;
            }
        }
    }
}
</style>