// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import http from './common/js/http'
import {hex_sha1} from './assets/js/sha1.js'
import * as myPub from '@/assets/js/public.js'

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


// 微信授权插件初始化
// Vue.use(WechatAuth , {
//   router, // 路由实例对象
//   appid: 'wxb7146031bd5bbc93', // 您的微信appid
//   responseType: 'code',  // 返回类型，请填写code
//   scope: 'snsapi_userinfo', // 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）
//   getCodeCallback (code, next) {
//     console.log("此时拿到code")
//   	console.log(code)
//     localStorage.setItem('code',code);
//   	console.log(next)
//     // 用户同意授权后回调方法
//     // code：用户同意授权后，获得code值
//     // code说明： code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
//     // next： 无论access_token是否获取成功,一定要调用该方法
//     // next说明：next方法接收两个参数
//     // 参数1为通过code值请求后端获取到的access_token值，如果获取失败请填入空字符串''
//     // 参数2(非必填，默认获取access_token切换到当前路由对象)，指定切换对象 next('/') 或者 next({ path: '/' })
//     const url = 'http://public.weifenvip.com/index/Token/getToken'
//     const params = new URLSearchParams();
//     params.append('code',code);
//     axios.post(url,params).then(response => {
//       console.log('第一次向后台传输code')
//       console.log(response)
//       next('/page/home')
//     }).catch((err) => {
//         axios.post(url,params).then(response => {
//           console.log('第二次向后台传输code')
//           const openid = response.data.openid
//           localStorage.setItem('openid',openid);
//           next('/page/home')

//         })
//     })
//   }
// })
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

    // if (localStorage.currentUser_token == null || localStorage.currentUser_token == undefined) {
    //   const url ='http://public.weifenvip.com/index/Baseapi/getToken'; //获取token接口地址
    //   const params = new URLSearchParams();
    //   params.append('appid','wxedd78c056ac05c2b66dc6h84cb0285'); //接口传参
    //   axios.post(url,params).then(response => {
    //     const currentUser_token = response.data.data //获取token
    //     console.log(currentUser_token)
    //     localStorage.setItem('currentUser_token',currentUser_token);//本地存储token
    //     if (!currentUser_token) {
    //       const url ='http://public.weifenvip.com/index/Baseapi/auth';
    //       const date = new Date();
    //       const time1 = date.getTime();
    //       const sh = "wxedd78c056ac05c2b66dc6h84cb028560"+time1
    //       const sha = hex_sha1(sh)
    //       const params = new URLSearchParams();
    //       params.append('appid','wxedd78c056ac05c2b66dc6h84cb0285');
    //       params.append('time',time1);
    //       params.append('sign',sha);
    //       axios.post(url,params).then(response => {
    //           const currentUser_token = response.data.data //获取token
    //           console.log(currentUser_token)
    //           localStorage.setItem('currentUser_token',currentUser_token);//本地存储token
    //         }).catch((err) => {
    //           console.log(err)
    //         })
    //     }
    //   }).catch((err) => {
    //      console.log(err)
    //   })
    // }
})


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})