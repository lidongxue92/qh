// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import http from './common/js/http'
import {hex_sha1} from './assets/js/sha1.js'
import * as myPub from '@/assets/js/public.js'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import Mint from 'mint-ui';
Vue.use(Mint);

import vView from 'vue-view-lazy'
Vue.use(vView,{
    error:'../../static/images/loading.png',
    loading:'../../static/images/loading.gif',
});

// vux 引入组件
import { AlertPlugin, ToastPlugin } from 'vux'
import WechatAuth from 'vue-wechat-auth'
import axios from 'axios'
import echarts from 'echarts'
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
// axios封装
Vue.use(http)
Vue.config.productionTip = false
// 解决点击延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)

import Loading from 'wc-loading'
import 'wc-loading/style.css'
Vue.use(Loading);

// 引入base64
let Base64 = require('js-base64').Base64;

router.beforeEach((to, from, next) => {
    // 设置标题
    document.title = to.meta.title
    //判断登录跳转
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (localStorage.login_static=='true') {
            next()
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next()
    }


//强制保留2位小数，如：2，会在2后面补上00.即2.00
Vue.prototype.toDecimal2 = function (x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
    console.log(s);
}


})


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
