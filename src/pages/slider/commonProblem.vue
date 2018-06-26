<template>
    <div class="container">
        <topComponent title='常见问题' :showLeft='false'>
            <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
        </topComponent>
        <div class="main">
            <div class="menu">
                <el-collapse accordion>
                <el-collapse-item>
                    <template slot="title">
                        <div class="questionTitle">
                           <span class="number">Q<b>{{index + 1}}</b></span>
                            <p>我能申请多少金额？分多少期？</p>
                        </div>
                    </template>
                    <div class="answer">
                        <p>这里是回答内容，这里是回答内容这里是回答内容这里是回答内容这里是回答内容这里是回答内容。这里是回答内容这里是回答内容这里是回答内容</p>
                    </div>
                </el-collapse-item>

                <el-collapse-item>
                    <template slot="title">
                        <div class="questionTitle">
                            <span class="number">Q<b>{{index + 1}}</b></span>
                            <p>我能申请多少金额？分多少期？内容这里？分多少期？内容这里是回答内容这里是回答内容这里是回答内容</p>
                        </div>
                    </template>
                    <div class="answer">
                        <p>这里是回答内容，这里是回答内容这里是回答内容这里是回答内容这里是回答内容这里是回答内容。这里是回答内容这里是回答内容这里是回答内容</p>
                    </div>
                </el-collapse-item>

                <el-collapse-item>
                    <template slot="title">
                        <div class="questionTitle">
                            <span class="number">Q<b>{{index + 1}}</b></span>
                            <p>我能申请多少金额？分多少期？内容这里是回答内容这里是回答内容这里是回答内容我能申请多少金额？分多少期？内容这里是回答内容这里是回答内容这里是回答内容</p>
                        </div>
                    </template>
                    <div class="answer">
                        <p>这里是回答内容，这里是回答内容这里是回答内容这里是回答内容这回答内容这里是回答内容这里是回答内容这里是回答内容。这里是回答内容这里是回答内容这里是回答内容</p>
                    </div>
                </el-collapse-item>
            </el-collapse>
            </div>
            <ul>
                <!-- <li>
                    <div class="title" @click="answerShow">
                        <span class="number">Q<b>{{index + 1}}</b></span>
                        <span class="questionTitle">我能申请多少金额？分多少期？</span>
                        <div class="img"><img :src="imgSrc"></div>
                    </div>

                    <div class="answer" v-show="show">
                        <p>这里是回答内容，这里是回答内容这里是回答内容这里是回答内容这里是回答内容这里是回答内容。这里是回答内容这里是回答内容这里是回答内容</p>
                    </div>
                </li> -->
            </ul>
        </div>
    </div>
</template>

<script>
import topComponent from '../../components/common/top';
import $ from 'jquery';
import axios from 'axios';
export default {
    name:'commonProblem',
    components: {
        topComponent
    },
    data(){
        return{
            index:0,
        }
    },
    created() {

    },
    methods:{
        goBack(){
            this.$router.back()
        },
    }
}
</script>


<style>
.el-collapse-item__header{
    height: auto;
    line-height: 1em;
    padding-top: 1rem;
    padding-bottom: 1rem;
}
.el-collapse-item__arrow{
    line-height: 1em;
    padding-top: .8rem;
}
</style>

<style lang="less" scoped>
.el-collapse{
    border-top: none;
    border-bottom: none;
}
.container{
    width: 100%;
    height: 100%;
    background: #f6f6f6;
    
    .main{
        background: #fff;
        margin-top: 0.5rem;
        padding-bottom: 1rem;
        width: 100%;
        .menu{
             width: 92%;
             margin: 0 auto;
            .questionTitle{
                .number{
                    display: inline-block;
                    width: 12%;
                    line-height: 1.5em;
                    vertical-align: top;             
                    color: #2395FF;
                    font-size: 1.2rem;
                    b{
                        font-weight: normal;
                        font-size: .8rem;
                    }
                    
                }
                p{
                    display: inline-block;
                    width: 80%;
                    line-height: 1.5rem;
                    font-size: .9rem;
                    vertical-align:auto;
                    padding-top: .3rem;
                }
                        
            }
            .answer{
                width: 95%;
                margin: .9rem auto 0;
                color: #BDBDBD;
                font-size: 0.9rem;
                p{
                    text-align: justify;
                }
            }
        }
    }
}
</style>