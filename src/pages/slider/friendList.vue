<template>
    <div class="container">
        <topComponent title='好友列表' :showLeft='false'>
            <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
        </topComponent>

        <div class="main">
            <ul class="title">
                <li>注册时间</li>
                <li>手机号</li>
                <li>是否实名</li>
                <li>是否投资</li>
            </ul>
            <div class="data">
                <ul>
                    <li>2018.08.08</li>
                    <li>135****4111</li>
                    <li>是</li>
                    <li>否</li>
                </ul>
                <ul>
                    <li>2018.08.08</li>
                    <li>135****4111</li>
                    <li>是</li>
                    <li>否</li>
                </ul>
            </div>
        </div>
    </div>


</template>

<script>
import topComponent from '../../components/common/top';
import $ from 'jquery';
import axios from 'axios';
export default {
    name:'friendList',
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
    .main{
        text-align: center;
        .title{
            display: flex;
            flex: 1;
            padding: 1rem 0;
            background: #eee;
            color: #666;
            font-size: .8rem /* 26/40 */;
            margin-top: .5rem;

            li{
                width: 25%;
            }
        }
        .data{
            background: #fff;
            ul{
                display: flex;
                flex: 1;
                font-size: .8rem /* 26/40 */;
                color: #333;
                padding: 0 .5rem;
                box-sizing: border-box;
                li{
                    width: 25%;         
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    border-bottom: 1px solid #eee;
                    padding: 1rem 0;
                }
            }
        }
    }
}
</style>