<template>
    <div class="detail page">
        <top v-bind:title="title"></top>
        <div class="middle">
            <ul class="list">
                <li><input type="password" placeholder="请输入新密码" class="register_content_input" v-model="LUserPsd" @blur="checkLPsd"><span class="tishixiaoxi disappear">请输入新密码。</span></li>
                <li><input type="password" placeholder="请输入新密码" class="register_content_input" v-model="LUserPsd1" @blur="checkLPsd1"><span class="tishixiaoxi disappear">请输入新密码。</span></li>
            </ul>
            <p>密码长度为8~32位，须包含数字、字母、符号至少2种或以上元素</p>
            <button class="button" @click="sub">确认修改</button>
        </div>
    </div>
</template>

<script>
import { PopupPicker, Tab, TabItem, Swiper, SwiperItem,Qrcode, Divider,XDialog, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData,TransferDomDirective as TransferDom } from 'vux'
import { mapState, mapMutations, mapGetters } from 'vuex'
import * as myPub from '@/assets/js/public.js'
import $ from 'jquery'
import top from '../../components/common/top1'
export default {
    name: 'detail',
    directives: {
        TransferDom
    },
    data() {
        return {
            product: null,
            money:'1000',
            title:'登录密码修改',
            isshow:true,
            LUserPsd:'',
            LUserPsd1:''
        }
    },
    computed: {
    },
    mounted () {
    },
    created() {},
    activated() {
        // this.getALLProducts()
    },
    methods: {
        linkTodetail1() {
            this.$router.push({ path: '/page/detail1' })
        },
        // 验证登录密码
        checkLPsd(){
            if(this.LUserPsd == ''){
                $(".list span:eq(0)").text("请输入密码");
                $(".list span:eq(0)").removeClass("disappear")
            }else if(this.LUserPsd.search(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/) == 0){
                $(".list span:eq(0)").addClass("disappear")
                return true;
            }else{
                 $(".list span:eq(0)").removeClass("disappear");
                $(".list span:eq(0)").text("密码必须6-20位，包含字母与数字")
            }
        },
        checkLPsd1(){
            if(this.LUserPsd1 == ''){
                $(".list span:eq(1)").text("请输入密码");
                $(".list span:eq(1)").removeClass("disappear")
            }else if(this.LUserPsd == this.LUserPsd1){
                $(".list span:eq(1)").addClass("disappear")
                return true;
            }else{
                $(".list span:eq(1)").removeClass("disappear");
                $(".list span:eq(1)").text("两次密码必须一致")
            }
        },
        sub(){
            if (this.checkLPsd() == true && this.checkLPsd1() == true) {
                console.log("11")
            }
        }
    },
    components: {
        PopupPicker,
        Tab,
        TabItem,
        Swiper,
        SwiperItem,
        Qrcode,
        Divider,
        XDialog,
        Popup,
        Group,
        XSwitch,
        Popup,
        Group,
        Cell,
        XSwitch,
        Toast,
        XAddress,
        XButton,
        top
    }
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/center.less';
@import '~vux/src/styles/close.less';
.detail {
    background: #f7f7f7;height:100%;position: relative;
    .middle{
        margin-top: 1rem;
        .list{
            margin-top: 0.5rem;background: #fff;border-radius: 3px;color: #bdbdbd;
            li{
                list-style: none;font-size: 0.7rem;border-bottom: 1px solid #eee;padding: 0.8rem;position: relative;
                input{width: 100%;border: 0;color: #bdbdbd}
                .tishixiaoxi{position: absolute;right: 0.8rem;top: 0.8rem;color: #FFA303}
                .disappear{display: none;}
            }
            li:last-child{border-bottom: 0;}
        }
        p{padding: 0.5rem;font-size: 0.6rem;color: #999}
        .button{border: 0;width: 90%;margin-left: 5%;margin-top: 1rem;background: -webkit-linear-gradient(left, #2B9AFF, #2773FF);height: 40px;text-align: center;color: #fff;font-size: 0.9rem;border-radius: 30px;}
    }
}
</style>
