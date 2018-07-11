<template>
    <div id="app">
        <div v-transfer-dom>
            <loading v-model="isLoading"></loading>
        </div>
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>

<script>
import { Loading, TransferDom } from 'vux'
import { mapState } from 'vuex'
export default {
    name: 'app',
    data(){
        return{

        }
    },
    mounted() {
            var url = location.href;
			// alert(url)
			if (url == "http://test.qihangjf.com:29089/#/" || url == "test.qihangjf.com:29089") {
				if (!this.isMobile()) {
					location.href = "http://test.qihangjf.com:29082/"
				}
            }//测试
            //h5官网
            if (url == "http://h5.qihangjf.com:8080/#/" || url == "h5.qihangjf.com:8080/#/") {
				if (!this.isMobile()) {
					location.href = "https://www.qihangjf.com/"
				}
			}//生产
    },
    methods:{
        isMobile() {
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return flag;
        }
    },
    directives: {
        TransferDom
    },
    computed: {
        ...mapState({
            isLoading: state => state.isLoading
        })
    },
    components: {
        Loading,
        TransferDom,
    }
}
</script>
<style type="text/css">
    .weui-tab__panel{padding-bottom: 0!important;}
</style>
<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
html,
body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
}
#vux_view_box_body{
    padding-top:0 !important;
}
#app {
    height: 100%;
    // max-width:640px;
}
li{
    list-style: none;
}
*{
padding: 0;
margin: 0;
}
.vux-slider .vux-icon-dot {
    width: 8px !important;
    height: 8px !important;
    border-radius: 4px !important;
}
.detail .vux-cell-value {
    color: #ffffff !important;
}
.detail .vux-cell-box::before {
    display: none;
}
.detail .vux-cell-box .weui-cell__ft::after {
    display: none;
}
</style>
