<template>
    <div class="container">
        <topComponent title='客服与反馈' :showLeft='false'>
            <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
        </topComponent>

        <div class="main">
            <p>请在此留下您的意见与反馈，我们的客服人员会及时解答，谢谢您对启航金服的支持！</p>
            <textarea maxlength="500" placeholder="请描述您遇到的问题和意见" class="shuRu" @click="addEventTest($event)"></textarea>
			<div class="limitNum"><span class="limitNum_word">0</span> / 500</div>

            <button>提交</button>
        </div>

    </div>
</template>

<script>
import topComponent from '../../components/common/top';
import $ from 'jquery';
import axios from 'axios';
export default {
    name:'service',
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
        },
        addEventTest(ev){
            addEventListener("keydown",function () {
                var num = $(".shuRu").val().length; //获取输入的字数，注意textarea是通过val()来获取的
                console.log(num);
                if (num <= 500) {
                    num = num;
                } //当字数小于50，数字不变
                else {
                    $(num).substr(0, 500)
                }
                $(".limitNum_word").html(num + 1) //把最后获取到的字数，显示出来
            });
        }
    }
}
</script>

<style lang="less" scoped>
.page-view{
    background: #f6f6f6 !important;
}
.container{
    width: 100%;
    height: auto;
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
    }
}
</style>