import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'
import axios from 'axios'
import { platform } from 'os';
const Login = r => require.ensure([], () => r(require('@/pages/login/login')), 'login')
const Settlein = r => require.ensure([], () => r(require('@/pages/login/settlein')), 'settlein')
const Findpassword = r => require.ensure([], () => r(require('@/pages/login/findpassword')), 'findpassword')
const Page = r => require.ensure([], () => r(require('@/pages/page/page')), 'page')
const Home = r => require.ensure([], () => r(require('@/pages/home/home')), 'home')
const Ceshi = r => require.ensure([], () => r(require('@/pages/detail/ceshi')), 'ceshi')
const data = r => require.ensure([], () => r(require('@/pages/order/data')), 'data')
const Category = r => require.ensure([], () => r(require('@/pages/category/category')), 'category')
const Detail = r => require.ensure([], () => r(require('@/pages/detail/detail')), 'detail')
const Detailto = r => require.ensure([], () => r(require('@/pages/detail/detailto')), 'detailto')
const DetailProduct = r => require.ensure([], () => r(require('@/pages/detail/detailProduct')), 'detailProduct')
const Pay = r => require.ensure([], () => r(require('@/pages/detail/pay')), 'pay')
const Log = r => require.ensure([], () => r(require('@/pages/detail/log')), 'log')
const Red = r => require.ensure([], () => r(require('@/pages/detail/red')), 'red')

// 资产相关页面
const Asset = r => require.ensure([], () => r(require('@/pages/asset/asset')), 'asset')
const Platform = r => require.ensure([], () => r(require('@/pages/asset/platform')), 'platform')
const BillingDetails = r => require.ensure([], () => r(require('@/pages/asset/billingDetails')), 'billingDetails')
const Recharge = r => require.ensure([], () => r(require('@/pages/asset/recharge')), 'recharge')
const Withdraw = r => require.ensure([], () => r(require('@/pages/asset/withdraw')), 'withdraw')
const Principal = r => require.ensure([], () => r(require('@/pages/asset/principal')), 'principal')
const Income = r => require.ensure([], () => r(require('@/pages/asset/income')), 'income')
const Message = r => require.ensure([], () => r(require('@/pages/asset/message')), 'message')
const AssetDetail = r => require.ensure([], () => r(require('@/pages/asset/assetdetail')), 'assetdetail')
const Transfer = r => require.ensure([], () => r(require('@/pages/asset/Transfer')), 'Transfer')
const TransferAgreement = r => require.ensure([], () => r(require('@/pages/asset/TransferAgreement')), 'TransferAgreement')
const Transferdetail = r => require.ensure([], () => r(require('@/pages/asset/Transferdetail')), 'Transferdetail')
const Transfersuccess = r => require.ensure([], () => r(require('@/pages/asset/Transfersuccess')), 'Transfersuccess')



// 侧栏
const AboutUs = r => require.ensure([], () => r(require('@/pages/slider/aboutUs')), 'aboutUs')
const Service = r => require.ensure([], () => r(require('@/pages/slider/service')), 'service')
const Address = r => require.ensure([], () => r(require('@/pages/slider/address')), 'address')
const CommonProblem = r => require.ensure([], () => r(require('@/pages/slider/commonProblem')), 'commonProblem')
const Invite = r => require.ensure([], () => r(require('@/pages/slider/invite')), 'invite')
const Userset = r => require.ensure([], () => r(require('@/pages/slider/userset')), 'userset')
const Security = r => require.ensure([], () => r(require('@/pages/slider/security')), 'security')
const Loginpassword = r => require.ensure([], () => r(require('@/pages/slider/loginpassword')), 'loginpassword')
const Nameset = r => require.ensure([], () => r(require('@/pages/slider/nameset')), 'nameset')
const Phone = r => require.ensure([], () => r(require('@/pages/slider/phone')), 'phone')
const Changephone = r => require.ensure([], () => r(require('@/pages/slider/changephone')), 'changephone')



// const Theme = r => require.ensure([], () => r(require('@/pages/theme/theme')), 'theme')
// const addGoods = r => require.ensure([], () => r(require('@/pages/category/addGoods')), 'addGoods')
// const Order = r => require.ensure([], () => r(require('@/pages/order/order')), 'order')
// const OrderData = r => require.ensure([], () => r(require('@/pages/order/orderData')), 'orderData')
// const Address = r => require.ensure([], () => r(require('@/pages/address/address')), 'address')
// const StoreInfo = r => require.ensure([], () => r(require('@/pages/stores/storeInfo')), 'storeInfo')
// const ShopCenter = r => require.ensure([], () => r(require('@/pages/stores/shopCenter')), 'shopCenter')
// const logo = r => require.ensure([], () => r(require('@/pages/stores/logo')), 'logo')
// const people = r => require.ensure([], () => r(require('@/pages/stores/people')), 'people')
// const shopinfo = r => require.ensure([], () => r(require('@/pages/stores/shopinfo')), 'shopinfo')
// const phone = r => require.ensure([], () => r(require('@/pages/stores/phone')), 'phone')
// const newphone = r => require.ensure([], () => r(require('@/pages/stores/newphone')), 'newphone')
// const phonesuccess = r => require.ensure([], () => r(require('@/pages/stores/phonesuccess')), 'phonesuccess')
// const storeer = r => require.ensure([], () => r(require('@/pages/stores/storeer')), 'storeer')
// const changestore = r => require.ensure([], () => r(require('@/pages/stores/changestore')), 'changestore')
// const changeshop = r => require.ensure([], () => r(require('@/pages/stores/changeshop')), 'changeshop')
// const changephone = r => require.ensure([], () => r(require('@/pages/stores/changephone')), 'changephone')
// const shop = r => require.ensure([], () => r(require('@/pages/stores/shop')), 'shop')
// const shopsuccess = r => require.ensure([], () => r(require('@/pages/stores/shopsuccess')), 'shopsuccess')
// const Dyinvite = r => require.ensure([], () => r(require('@/pages/invite/dyinvite')), 'dyinvite')
// const CommodityData = r => require.ensure([], () => r(require('@/pages/commodity/commodityData')), 'commodityData')
// const storesuccess = r => require.ensure([], () => r(require('@/pages/stores/storesuccess')), 'storesuccess')
// const Store_users = r => require.ensure([], () => r(require('@/pages/stores/store_users')), 'store_users')
// const newData = r => require.ensure([], () => r(require('@/pages/order/newData')), 'newData')



Vue.use(Router)

const routes = [
    {
        path: '/',
        redirect: '/page'
    },
    {
        path: '/page',
        component: Page,
        children: [
            {
                path: '',
                redirect: '/page/home'
            },
            {
                path: 'home',
                name: 'home',
                meta: {
                    title: '首页',
                    // auth: true // 如果此路由需要微信授权请设置为true,默认为false
                },
                component: Home
            },
            {
                path: 'ceshi',
                name: 'ceshi',
                meta: {
                    title: '测试'
                },
                component: Ceshi
            },
            {
                path: 'data',
                name: 'data',
                meta: {
                    title: '发现'
                },
                component: data
            },
            {
                path: 'category',
                name: 'category',
                meta: {
                    title: '产品',
                    // requireAuth: true
                },
                component: Category
            },
            {
                path: 'detail',
                name: 'detail',
                meta: {
                    title: '产品详情',
                    // requireAuth: true
                },
                component: Detail
            },
            {
                path: 'detailto',
                name: 'detailto',
                meta: {
                    title: '转让产品详情',
                    // requireAuth: true
                },
                component: Detailto
            },
            {
                path: 'detailProduct',
                name: 'detailProduct',
                meta: {
                    title: '产品详情介绍',
                    // requireAuth: true
                },
                component: DetailProduct
            },
            {
                path: 'log',
                name: 'log',
                meta: {
                    title: '日志',
                    // requireAuth: true
                },
                component: Log
            },
            {
                path: 'pay',
                name: 'pay',
                meta: {
                    title: '确认支付',
                    // requireAuth: true
                },
                component: Pay
            },
            {
                path: 'red',
                name: 'red',
                meta: {
                    title: '平台福利',
                    // requireAuth: true
                },
                component: Red
            },
            {
                path: 'asset',
                name: 'asset',
                meta: {
                    title: '资产',
                    // requireAuth: true
                },
                component: Asset,
            },
            {
                path: 'billingDetails',
                name: 'billingDetails',
                meta: {
                    title: '账单明细',
                    // requireAuth: true
                },
                component: BillingDetails
            }, 
            {
                path: 'recharge',
                name: 'recharge',
                meta: {
                    title: '充值',
                    // requireAuth: true
                },
                component: Recharge
            }, {
                path: 'withdraw',
                name: 'withdraw',
                meta: {
                    title: '提现',
                // requireAuth: true
                },
                component: Withdraw
            }, 
            {
                path: 'principal',
                name: 'principal',
                meta: {
                    title: '待收本金',
                // requireAuth: true
                },
                component: Principal
            }, 
            {
                path: 'income',
                name: 'income',
                meta: {
                    title: '待收收益',
                // requireAuth: true
                },
                component: Income
            },
            {
                path: 'message',
                name: 'message',
                meta: {
                    title: '消息公告',
                // requireAuth: true
                },
                component: Message
                
            },
            {
                path: 'Transfer',
                name: 'Transfer',
                meta: {
                    title: '债权转让',
                // requireAuth: true
                },
                component: Transfer
                
            },
            {
                path: 'TransferAgreement',
                name: 'TransferAgreement',
                meta: {
                    title: '债权转让协议',
                // requireAuth: true
                },
                component: TransferAgreement
                
            },
            {
                path: 'Transferdetail',
                name: 'Transferdetail',
                meta: {
                    title: '转让产品',
                // requireAuth: true
                },
                component: Transferdetail
                
            },
            {
                path: 'Transfersuccess',
                name: 'Transfersuccess',
                meta: {
                    title: '转让成功',
                // requireAuth: true
                },
                component: Transfersuccess
                
            },
            {
                path: 'assetdetail',
                name: 'assetdetail',
                meta: {
                    title: '产品详情',
                // requireAuth: true
                },
                component: AssetDetail
                
            },

            //侧边菜单
            {
                path: 'aboutUs',
                name: 'aboutUs',
                meta: {
                    title: '关于我们',
                    // requireAuth: true
                },
                component: AboutUs
            },
            {
                path: 'userset',
                name: 'userset',
                meta: {
                    title: '用户设置',
                    // requireAuth: true
                },
                component: Userset
            },
            {
                path: 'security',
                name: 'security',
                meta: {
                    title: '安全设置',
                    // requireAuth: true
                },
                component: Security
            },
            {
                path: 'loginpassword',
                name: 'loginpassword',
                meta: {
                    title: '登录密码设置',
                    // requireAuth: true
                },
                component: Loginpassword
            },
            {
                path: 'nameset',
                name: 'nameset',
                meta: {
                    title: '实名认证',
                    // requireAuth: true
                },
                component: Nameset
            },
            {
                path: 'phone',
                name: 'phone',
                meta: {
                    title: '手机号',
                    // requireAuth: true
                },
                component: Phone
            },
            {
                path: 'changephone',
                name: 'changephone',
                meta: {
                    title: '更改手机号',
                    // requireAuth: true
                },
                component: Changephone
            },
            {
                path: 'service',
                name: 'service',
                meta: {
                    title: '客服与反馈',
                    // requireAuth: true
                },
                component: Service

            },
            {
                path: 'address',
                name: 'address',
                meta: {
                    title: '联系地址',
                    // requireAuth: true
                },
                component: Address

            },
            {
                path: 'commonProblem',
                name: 'commonProblem',
                meta: {
                    title: '常见问题',
                    // requireAuth: true
                },
                component: CommonProblem

            },
            {
                path: 'invite',
                name: 'invite',
                meta: {
                    title: '邀请好友',
                    // requireAuth: true
                },
                component: Invite

            },
            // {
            //     path: 'storeInfo',
            //     name: 'storeInfo',
            //     meta: {
            //         title: '店铺信息',
            //         requireAuth: true
            //     },
            //     component: StoreInfo
            // },
            // {
            //     path: 'store_users',
            //     name: 'store_users',
            //     meta: {
            //         title: '店铺新增用户数据'
            //     },
            //     component: Store_users
            // },
            // {
            //     path: 'shopCenter',
            //     name: 'shopCenter',
            //     meta: {
            //         title: '店铺中心',
            //         // requireAuth: true
            //     },
            //     component: ShopCenter
            // },
            // {
            //     path: 'logo',
            //     name: 'logo',
            //     meta: {
            //         title: '品牌名称'
            //     },
            //     component: logo
            // },
            // ,
            // {
            //     path: 'people',
            //     name: 'people',
            //     meta: {
            //         title: '修改负责人'
            //     },
            //     component: people
            // },
            // {
            //     path: 'shopinfo',
            //     name: 'shopinfo',
            //     meta: {
            //         title: '店铺介绍'
            //     },
            //     component: shopinfo
            // },
            // {
            //     path: 'changephone',
            //     name: 'changephone',
            //     meta: {
            //         title: '修改手机号'
            //     },
            //     component: changephone
            // },
            // {
            //     path: 'phone',
            //     name: 'phone',
            //     meta: {
            //         title: '修改手机号'
            //     },
            //     component: phone
            // },
            // {
            //     path: 'newphone',
            //     name: 'newphone',
            //     meta: {
            //         title: '修改手机号'
            //     },
            //     component: newphone
            // }
            // ,
            // {
            //     path: 'phonesuccess',
            //     name: 'phonesuccess',
            //     meta: {
            //         title: '修改手机号成功'
            //     },
            //     component: phonesuccess
            // }
            // ,
            // {
            //     path: 'storeer',
            //     name: 'storeer',
            //     meta: {
            //         title: '店长管理'
            //     },
            //     component: storeer
            // }
            // ,
            // {
            //     path: 'changeshop',
            //     name: 'changeshop',
            //     meta: {
            //         title: '添加新店长'
            //     },
            //     component: changeshop
            // }
            // ,
            // {
            //     path: 'shop',
            //     name: 'shop',
            //     meta: {
            //         title: '店员管理'
            //     },
            //     component: shop
            // }
            // ,
            // {
            //     path: 'shopsuccess',
            //     name: 'shopsuccess',
            //     meta: {
            //         title: '店长添加成功'
            //     },
            //     component: shopsuccess
            // }
            // ,
            // {
            //     path: 'changestore',
            //     name: 'changestore',
            //     meta: {
            //         title: '更换店员'
            //     },
            //     component: changestore
            // }
            // ,
            // {
            //     path: 'storesuccess',
            //     name: 'storesuccess',
            //     meta: {
            //         title: '店员添加成功'
            //     },
            //     component: storesuccess
            // },
            // {
            //     path: 'newData',
            //     name: 'newData',
            //     meta: {
            //         title: '邀新数据'
            //     },
            //     component: newData
            // },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/settlein',
        name: 'settlein',
        component: Settlein,
        meta: {
            title: '注册'
        }
    },
    {
        path: '/findpassword',
        name: 'findpassword',
        component: Findpassword,
        meta: {
            title: '找回密码'
        }
    },
    { path: '*', component: Home }
]

const router = new Router({
    mode:'history',
    routes
})


// router.afterEach(function(to) {
//     setTimeout(() => {
//         store.commit('UPDATE_LOADING', false)
//     }, 300)
// })

export default router
