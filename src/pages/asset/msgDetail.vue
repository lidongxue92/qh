<template>
    <div class="container">
        <topComponent title='消息详情' :showLeft='false'>
            <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
        </topComponent>
        <div class="xiaoXi">
            <p class="msgTitle">{{msg.msgTitle}}</p>
            <p class="content">
                <span>{{msg.sendTime.split(' ')[0]}}</span></br>
                <span>{{msg.msgText}}</span>
            </p>
        </div>
    </div>
</template>

<script>
import topComponent from '../../components/common/top';
import * as myPub from '@/assets/js/public.js'
import axios from 'axios'
import $ from 'jquery'
import Vue from 'vue'
export default {
    name:'msgDetail',
    components: {
        topComponent
    },
    data(){
        return{
            msg:''
        }
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        }//回退上一级页面并刷新
    },
    created() {},
    activated() {
        this.loadPageList()
    },
    methods:{
        goBack(){
            this.$router.back()
        },
        loadPageList(){
            const _this = this
            _this.$loading.show();
          const url = myPub.URL+`/msg/getMessageInfo` ;
          const params = new URLSearchParams();
          const msgTextId = this.$route.query.id
          params.append('token',sessionStorage.token);
          params.append('msgTextId',msgTextId);
          axios.post(url,params).then(response => {
            const data = response.data
            console.log(data)
            _this.$loading.hide();
            if (data.result == '400') {
                this.$vux.alert.show({
                    title: '',
                    content: data.resultMsg
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    this.$router.push({path:"/login",query: {redirect: 'your path'}})
                }, 3000)
            }
            if (data.result == '200') {
                this.msg = data
                console.log(this.msg)
            }
          }).catch((err) => {
            console.log(err)
          })
        },
    }
}
</script>

<style lang="less" scoped>
.container{
    width: 100%;
    height: 100%;
    background: #f6f6f6;
    .xiaoXi{
        width: 94%;
        margin: 0 auto;
        margin-top: 0.5rem;
        border-radius: 0 0 .2rem .2rem;
        
        p{
            width: 100%;
            line-height: 1.8em;
            box-sizing: border-box;    
            background: #fff;       
        }
        .msgTitle{
            margin: 0 auto;
            background: url("../../assets/img/msgBg1.png") top no-repeat;
            background-size: 100%;
            padding: .3rem .8rem;
            font-size: .9rem /* 28/40 */;
        }
        .content{
           font-size: .7rem /* 26/40 */;
            margin: 0 auto;
            background: url("../../assets/img/msgBg2.png") center repeat;
            background-size: 100%;
            padding: .3rem .8rem;
            border-radius: 0 0 .2rem .2rem;
            color: #999999;
        }
    }
}
    
</style>