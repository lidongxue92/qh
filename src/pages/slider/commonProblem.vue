<template>
<div class="container">
    <div id="topTitle">
        <topComponent title='常见问题' :showLeft='false'>
            <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
        </topComponent>
    </div>
    <div class="main">
        <div class="menu" >
            <div v-for="(item,index) in DisQuestion" :key="index" v-view-lazy class="qLi">
                <div class="questionTitle">
                    <span class="number">Q<b>{{index + 1}}</b></span>
                    <p>{{item.title}}</p>
                    <div><img :src="imgSrc" class="imgSrc"></div>
                </div>
                <div class="answer" v-show="isShow">
                    <p>{{item.content}}</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import topComponent from '../../components/common/top';
import $ from 'jquery';
import axios from 'axios';
import * as myPub from '../../assets/js/public.js'
export default {
    name:'commonProblem',
    components: {
        topComponent,
    },
    data(){
        return{
            index:0,
            DisQuestion:[],
            number:'',//总问题数
            isShow:false,
            imgSrc:"../static/img/right.png"
        }
    },
    created(){
        // 常见问题
            const url = myPub.URL+`/question/getQuestionList`;
            var params = new URLSearchParams();
            params.append('token',sessionStorage.getItem("token"));
            params.append('curPage',1);
            params.append('pageSize',10);

            axios.post(url,params).then(res => {
                // console.log(res);
                this.number = res.data.totalCount;
                if (res.data.result == 200) {
                    setTimeout(() => {
                        const url = myPub.URL+`/question/getQuestionList`;
                        var params = new URLSearchParams();
                        params.append('token',sessionStorage.getItem("token"));
                        params.append('curPage',1);
                        params.append('pageSize',this.number);

                        axios.post(url,params).then(res => {
                            console.log(res.data.DisQuestion);
                            this.DisQuestion = res.data.DisQuestion;
                            setTimeout(() => {
                                $(".questionTitle").each(function (i) {
                                $(".questionTitle").eq(i).click(function () {
                                    $(".answer").eq(i).slideToggle("fast",function (newImgSrc) {
                                        console.log();
                                        var newImgSrc = $(".imgSrc").eq(i).attr("src");
                                        newImgSrc == "../static/img/right.png" ? $(".imgSrc").eq(i).attr("src","../static/img/down.png") : $(".imgSrc").eq(i).attr("src","../static/img/right.png");
                                    });

                                });
                            }, 200);
                            })

                        }).catch((err) => {
                            console.log(err);
                        });
                    }, 300);
                }

            }).catch((err) => {
                console.log(err);
            });
    },
    methods:{
        goBack(){
            this.$router.back()
        },
    }
}
</script>


<style lang="less" scoped>
.el-collapse{
    border-top: none;
    border-bottom: none;
}
.container{
    width: 100%;
    height: 100%;
    background: #f6f6f6;
    #topTitle{
        position: relative;
        z-index: 1;
    }
    .main{
        background: #fff;
        margin-top: 0.5rem;
        padding-bottom: 1rem;
        width: 100%;

        .menu{
             width: 92%;
             margin: 0 auto;
             .qLi{
                 border-bottom: 1px solid #eee;
                 padding-top: .8rem;
                 padding-bottom: 0.8rem;
             }
            .questionTitle{
                display: flex;
                flex: 1;
                padding-top: 0.2rem;
                padding-bottom: 0.2rem;
                .number{
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
                    width: 79%;
                    line-height: 1.5rem;
                    font-size: .9rem;
                    padding-top: .3rem;
                }
                div{
                    padding-top: 0.5rem;
                    img{
                        width: 60%;
                    }
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
