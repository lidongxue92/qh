<template>
<div class="container">
    <div id="topTitle">
        <topComponent title='常见问题' :showLeft='false'>
            <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
        </topComponent>
    </div>
    <div class="main">
        <div class="menu" >
            <div v-for="(item,index) in DisQuestion" :key="index" v-view-lazy>
                <div class="questionTitle">
                    <span class="number">Q<b>{{index + 1}}</b></span>
                    <p>{{item.title}}</p>
                    <img src="../../../static/img/right.png" class="imgSrc">
                </div>
                <div class="answer" v-show="isShow">
                    <p>{{item.content}}</p>
                </div>
            </div>


            <!-- <el-collapse accordion>
                <el-collapse-item v-for="(item,index) in DisQuestion" :key="index" v-view-lazy>
                    <template slot="title">
                        <div class="questionTitle">
                        <span class="number">Q<b>{{index + 1}}</b></span>
                            <p>{{item.title}}</p>
                        </div>
                    </template>
                    <div class="answer">
                        <p>{{item.content}}</p>
                    </div>
                </el-collapse-item>
            </el-collapse> -->
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
            imgSrc:"../static/img/rightGray.png"
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
                                    $(".imgSrc").attr("src","../static/img/down.png");
                                    var src = $(".questionTitle:eq(i) img").attr("src");
                                    console.log(src);
                                    if (src == "../static/img/right.png") {
                                        src = "../static/img/down.png";
                                    }


                                    // if (this.imgSrc == "../static/img/rightGray.png") {
                                    //     this.imgSrc = "";
                                    //     this.isShow = true;
                                    // }else{
                                    //     this.imgSrc = "../static/img/rightGray.png";
                                    //     this.isShow = false;
                                    // }
                                });
                            }, 300);
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
    mounted(){
    },
    methods:{
        goBack(){
            this.$router.back()
        },
    }
}
</script>


<style>
.mint-loadmore{
    margin-top: -25px;
    background: #Fff;
}
.mint-loadmore-bottom{
    text-align: center;

}
.mint-loadmore-top{
    text-align: center;
    position: relative;
    z-index: -1;
}
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
                    width: 79%;
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
