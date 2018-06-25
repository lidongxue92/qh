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

// 侧栏
const AboutUs = r => require.ensure([], () => r(require('@/pages/slider/aboutUs')), 'aboutUs')
const Service = r => require.ensure([], () => r(require('@/pages/slider/service')), 'service')
const Address = r => require.ensure([], () => r(require('@/pages/slider/address')), 'address')
const CommonProblem = r => require.ensure([], () => r(require('@/pages/slider/commonProblem')), 'commonProblem')





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
            // {
            //     path: 'theme',
            //     name: 'theme',
            //     meta: {
            //         title: '主题'
            //     },
            //     component: Theme
            // },

            // {
            //     path: 'addGoods',
            //     name: 'addGoods',
            //     meta: {
            //         title: '添加商品',
            //         requireAuth: true
            //     },
            //     component: addGoods
            // },
            // {
            //     path: 'dyinvite',
            //     name: 'dyinvite',
            //     meta: {
            //         title: '店员邀新排行榜',
            //         requireAuth: true
            //     },
            //     component: Dyinvite
            // },
            // {
            //     path: 'cart',
            //     name: 'cart',
            //     meta: {
            //         title: '购物车',
            //         // requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            //     },
            //     component: Cart
            // },
            // {
            //     path: 'order',
            //     name: 'order',
            //     meta: {
            //         title: '订单',
            //         requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            //     },
            //     component: Order
            // },
            // {
            //     path: 'orderData',
            //     name: 'orderData',
            //     meta: {
            //         title: '店铺订单数据',
            //         requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            //     },
            //     component: OrderData
            // },
            // {
            //     path: 'commodityData',
            //     name: 'commodityData',
            //     meta: {
            //         title: '营销商品数据',
            //         requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            //     },
            //     component: CommodityData
            // },
            // {
            //     path: 'address',
            //     name: 'address',
            //     meta: {
            //         title: '地址',
            //         requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            //     },
            //     component: Address
            // },
            // {
            //     path: 'user',
            //     name: 'user',
            //     meta: {
            //         title: '我的',
            //         // requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            //     },
            //     component: User
            // },
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
                path: 'platform',
                name: 'platform',
                meta: {
                    title: '平台福利',
                    // requireAuth: true
                },
                component: Platform,
                
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
                path: 'assetdetail',
                name: 'assetdetail',
                meta: {
                    title: '产品详情',
                // requireAuth: true
                },
                component: AssetDetail
                
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
