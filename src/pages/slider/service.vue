<template>
    <div class="container">
        <topComponent title='客服与反馈' :showLeft='false'>
            <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
        </topComponent>

        <div class="main">
            <p>请在此留下您的意见与反馈，我们的客服人员会及时解答，谢谢您对启航金服的支持！</p>
            <textarea maxlength="500" placeholder="请描述您遇到的问题和意见" class="shuRu" @click="addEventTest($event)" v-model="content"></textarea>
			<div class="limitNum"><span class="limitNum_word">0</span> / 500</div>

            <button @click="submit">提交</button>

            <div id="bottom">
                <p class="tel">400-821-6328</p>
                <p>客服热线</p>

                <div class="pic">
                    <div>
                        <img src="../../assets/img/weiXinEwm.png">
                        <p>公众服务号</p>
                    </div>
                    <div>
                        <img src="../../assets/img/weiXinEwm.png">
                        <p>公众订阅号</p>
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
    name:'service',
    components: {
        topComponent
    },
    data(){
        return{
            content:""
        }
    },
    created() {
        this.content = "";
    },
    methods:{
        goBack(){
            this.$router.back()
        },
        addEventTest(ev){
            addEventListener("keyup",function () {
                var num = $(".shuRu").val().length; //获取输入的字数，注意textarea是通过val()来获取的
                // console.log(num);
                if (num <= 500) {
                    num = num;
                } //当字数小于50，数字不变
                else {
                    $(num).substr(0, 500)
                }
                $(".limitNum_word").html(num) //把最后获取到的字数，显示出来
            });
        },
        submit(){
            const url = myPub.URL+`/feed/feedback`;
            var params = new URLSearchParams();
            params.append('token',sessionStorage.getItem("token"));
            params.append('content',this.content);

            axios.post(url,params).then(res => {
                console.log(res.data);
                if (res.data.result == 200) {
                    this.$vux.alert.show({
                        content: res.data.resultMsg
                    });
                    setTimeout(() => {
                        this.$vux.alert.hide();
                        this.content = "";
                        $(".limitNum_word").html("0") //把最后获取到的字数，显示出来
                        this.$router.push({ path: '/'})
                    },3000);
                }else if (res.data.result == 300) {
                    this.$vux.alert.show({
                        content: res.data.resultMsg
                    })
                    setTimeout(() => {
                        this.$vux.alert.hide()
                    },3000)
                }else if (res.data.result == 301) {
                    this.$vux.alert.show({
                        content: res.data.resultMsg
                    })
                    setTimeout(() => {
                        this.$vux.alert.hide()
                    },3000)
                }else if (res.data.result == 302) {
                    this.$vux.alert.show({
                        content: res.data.resultMsg
                    })
                    setTimeout(() => {
                        this.$vux.alert.hide()
                    },3000)
                }


            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
</script>

<style lang="less" scoped>
.container{
    width: 100%;
    height: 100%;
    background: #f6f6f6;
    padding-bottom: 2.5rem /* 100/40 */;

    .main{
        width: 92%;
        margin: 0 auto;
        p{
            font-size: .8rem;
            color: #333;
            margin: 1.1rem auto;
        }
        textarea{
            width: 100%;
            height: 11rem;
            margin: 0 auto;
            border: 1px solid #CCCCCC;
            border-radius:4px;
            resize: none;
            outline: none;
            padding: .5rem;
            box-sizing: border-box;
        }
        .limitNum{
            float: right;
            font-size: .6rem /* 24/40 */;
            color: #999999;
        }
        button{
            background: #2B9AFF;
            width: 100%;
            border-radius: 40px;
            padding-top: .8rem;
            padding-bottom: .8rem;
            font-size: 1rem;
            margin-top: 1rem;
            border:none;
            outline: none;
            color: #fff;
        }

        #bottom{
            width: 100%;
            height: 16.3rem /* 651/40 */;
            background: url("../../assets/img/sliderBox/serviceBg.png") no-repeat;
            background-size: 100% 100%;
            p{
                color: #333;
                font-size: .7rem /* 26/40 */;
                text-align: center;
                margin: 0;
            }
            .tel{
                color: #FFA303;
                font-size: 1.3rem /* 50/40 */;
                padding-top: .6rem;
                margin: .5rem auto 0;
            }

            .pic{
                margin-top: 2.5rem;
                div{
                    width: 50%;
                    float: left;
                    text-align: center;
                }
            }
        }
    }
}
</style>
