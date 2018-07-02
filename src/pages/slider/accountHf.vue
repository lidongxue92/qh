<template>
<div class="container">
    <topComponent title='托管账户信息' :showLeft='false'>
        <span class="back" @click='goBack' slot="left"><img src="../../assets/img/left.png"></span>
    </topComponent>

    <div class="main">
        <div class="mainTop">
            <img src="../../assets/img/accountLogo.png">
            <span>汇付托管账户</span>
            <b>已开通</b>
        </div>
        <p>账户名称/编号<span>{{chinaPnrAcc}}</span></p>
        <p>开户人<span>{{userRealname}}</span></p>
    </div>

</div>
</template>

<script>
import topComponent from '../../components/common/top'
import $ from 'jquery';
import axios from 'axios';
import * as myPub from '../../assets/js/public.js'
export default {
    name:'accountHf',
    components: {
        topComponent
    },
    data(){
        return{
            chinaPnrAcc:"",
            userRealname: ""
        }
    },
    created() {
        const url = myPub.URL+`/user/getUserInfo` ;
        var params = new URLSearchParams();
        params.append('token',sessionStorage.getItem("token"));
        axios.post(url,params).then(res => {
            // console.log(res);
            this.userRealname = res.data.User.userRealname;
            this.chinaPnrAcc = res.data.User.chinaPnrAcc;
            if (res.data.result == 400) {
                this.$vux.alert.show({
                    title: '',
                    content: res.data.resultMsg
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    this.$router.push({path:"/login",query: {redirect: 'your path'}})
                }, 3000)
            }

        }).catch((err) => {
            console.log(err)
        })
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
        background: url("../../assets/img/accountBg.png") no-repeat;
        width: 92%;
        margin: 1rem auto 0;
        background-size: 100% 100%;
        color: #fff;
        padding: 1.1rem /* 44/40 */ .9rem /* 35/40 */;
        box-sizing: border-box;

        .mainTop{
            width: 100%;
            font-size: 1rem;
            vertical-align: middle;
            float: left;
            margin-bottom: 1rem;
            img{
                float: left;
                width: 2.5rem;
                margin-right: 0.8rem;
            }
            span{
                float: left;
                margin-top: .5rem;
            }
            b{
                float: right;
                margin-top: .5rem;
                font-weight: normal;
            }
            :active{
                content: "";
                clear: both;
                display: block;
            }
        }
        p{
            width: 100%;
            font-size: .9rem;
            line-height: 2em;
            span{
                float: right;
            }
        }
    }
}
</style>


