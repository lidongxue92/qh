import Vue from 'vue';
import Router from 'vue-router';
import store from './../store';
import axios from 'axios';
import { platform } from 'os';

import Home from "../pages/home/home";
import Login from '../pages/login/login';
import Settlein from "../pages/login/settlein";
import Findpassword from "../pages/login/findpassword";
import Page from "../pages/page/page";
import Category from "../pages/category/category";
import Data from "../pages/order/data";
import Asset from '../pages/asset/asset';
import Ceshi from "../pages/detail/ceshi";
import Detail from "../pages/detail/detail";
import Detailto from "../pages/detail/detailto";
import DetailProduct from "../pages/detail/detailProduct";
import Pay from "../pages/detail/pay";
import Log from "../pages/detail/log";
import Red from "../pages/detail/red";
import TouZiInfo from "../pages/detail/touZiInfo";

// 资产相关页面

import Platform from "../pages/asset/platform";
import BillingDetails from "../pages/asset/billingDetails"
import Recharge from "../pages/asset/recharge"
import Withdraw from "../pages/asset/withdraw"
import Withdrawsuccess from "../pages/asset/withdrawsuccess"
import Principal from "../pages/asset/principal"
import Income from "../pages/asset/income"
import Message from "../pages/asset/message"
import MsgDetail from "../pages/asset/msgDetail"
import MsgDetail1 from "../pages/asset/msgDetail1"
import AssetDetail from "../pages/asset/assetdetail"
import Transfer from "../pages/asset/Transfer"
import TransferAgreement from "../pages/asset/TransferAgreement"
import Transferdetail from '../pages/asset/Transferdetail';
import Transfersuccess from '../pages/asset/Transfersuccess';
import Card from '../pages/asset/card';
import CardSuccess from '../pages/asset/cardSuccess';

// 侧栏
import AboutUs from '../pages/slider/aboutUs';
import Service from '../pages/slider/service';
import Address from '../pages/slider/address';
import CommonProblem from '../pages/slider/commonProblem';
import Invite from '../pages/slider/invite';
import Userset from '../pages/slider/userset';
import Security from '../pages/slider/security';
import Loginpassword from '../pages/slider/loginpassword';
import Nameset from '../pages/slider/nameset';
import Phone from '../pages/slider/phone';
import Changephone from '../pages/slider/changephone';
import FriendList from '../pages/slider/friendList';
import AccountHf from '../pages/slider/accountHf';
import YanzhengPhone from '../pages/slider/yanzhengPhone';
import BankCard from '../pages/slider/bankCard';
import BangCard from '../pages/slider/bangCard';
import RiskResult from '../pages/slider/riskResult';


Vue.use(Router)

export default new Router({
    // mode : "history",
    routes: [
        // 配置登录界面
        {
            path: '/login',
            name: 'login',
            meta: {
                title: '登录',
            },
            component: Login,
        },
        //配置注册界面
        {
            path: '/settlein',
            name: 'settlein',
            meta: {
                title: '注册',
            },
            component: Settlein
        },
        // 找回密码
        {
            path: '/findpassword',
            name: 'findpassword',
            component: Findpassword,
            meta: {
                title: '密码找回'
            }
        },
        // 配置首页
        {
            path: '/',
            name: 'home',
            meta: {
                title: '首页',
            },
            component: Home
        },
        // 配置理财
        {
            path: '/category',
            name: 'category',
            meta: {
                title: '理财',
            },
            component: Category
        },
        // 配置发现
        {
            path: '/data',
            name: 'data',
            meta: {
                title: '发现',
            },
            component: Data
        },
        // 配置资产
        {
            path: '/asset',
            name: 'asset',
            meta: {
                title: '我的资产',
            },
            component: Asset
        },
        //侧边菜单
        {
            path: '/page/aboutUs',
            name: 'aboutUs',
            meta: {
                title: '关于我们',
            },
            component: AboutUs
        },
        {
            path: '/page/userset',
            name: 'userset',
            meta: {
                title: '用户设置',
            },
            component: Userset
        },
        {
            path: '/page/security',
            name: 'security',
            meta: {
                title: '安全设置',
            },
            component: Security
        },
        {
            path: '/page/loginpassword',
            name: 'loginpassword',
            meta: {
                title: '登录密码设置',
            },
            component: Loginpassword
        },
        {
            path: '/page/nameset',
            name: 'nameset',
            meta: {
                title: '实名认证',
            },
            component: Nameset
        },
        {
            path: '/page/phone',
            name: 'phone',
            meta: {
                title: '手机号',
            },
            component: Phone
        },
        {
            path: '/page/changephone',
            name: 'changephone',
            meta: {
                title: '更改手机号',
            },
            component: Changephone
        },
        {
            path: '/page/service',
            name: 'service',
            meta: {
                title: '客服与反馈',
            },
            component: Service
        },
        {
            path: '/page/address',
            name: 'address',
            meta: {
                title: '联系地址',
            },
            component: Address
        },
        {
            path: '/page/commonProblem',
            name: 'commonProblem',
            meta: {
                title: '常见问题',

            },
            component: CommonProblem
        },
        {
            path: '/page/invite',
            name: 'invite',
            meta: {
                title: '邀请好友',
            },
            component: Invite

        },
        {
            path: '/page/friendList',
            name: 'friendList',
            meta: {
                title: '我的好友',
            },
            component: FriendList
        },
        {
            path: '/page/YanzhengPhone',
            name: 'yanzhengPhone',
            meta: {
                title: '手机号验证',
            },
            component: YanzhengPhone

        },
        {
            path: '/page/assetdetail',
            name: 'assetdetail',
            meta: {
                title: '产品详情',
                // requireAuth: true
            },
            component: AssetDetail

        },
        {
            path: '/page/accountHf',
            name: 'accountHf',
            meta: {
                title: '托管账户信息',
                // requireAuth: true
            },
            component: AccountHf,

        },
        {
            path: '/RiskResult',
            name: 'RiskResult',
            meta: {
                title: '风险测评结果',
                // requireAuth: true
            },
            component: RiskResult,

        },

        // 绑卡
        {
            path: '/page/card',
            name: 'card',
            meta: {
                title: '新卡绑定',
                // requireAuth: true
            },
            component: Card
        },

        {
            path: '/page/cardSuccess',
            name: 'cardSuccess',
            meta: {
                title: '绑定成功',
                // requireAuth: true
            },
            component: CardSuccess

        },

        {
            path: '/page/bankCard',
            name: 'bankCard',
            meta: {
                title: '银行卡',
                // requireAuth: true
            },
            component: BankCard

        },
        //用户绑卡
        {
            path: '/page/bangCard',
            name: 'bangCard',
            meta: {
                title: '取现绑卡',
                // requireAuth: true
            },
            component: BangCard

        },
        {
            path: '/RiskResult',
            name: 'RiskResult',
            meta: {
            title: '风险测评结果',
            // requireAuth: true
            },
            component: RiskResult,

            },

        // 活动页
        // {
        //     path: 'Cooperation',
        //     name: 'Cooperation',
        //     meta: {
        //         title: '战略合作',
        //         // requireAuth: true
        //     },
        //     component: Cooperation

        // },
        // {
        //     path: 'duanWu',
        //     name: 'duanWu',
        //     meta: {
        //         title: '端午粽情购',
        //         // requireAuth: true
        //     },
        //     component: DuanWu

        // },
        // {
        //     path: 'fengKong',
        //     name: 'fengKong',
        //     meta: {
        //         title: '风控',
        //         // requireAuth: true
        //     },
        //     component: FengKong

        // },
        // {
        //     path: 'risk',
        //     name: 'risk',
        //     meta: {
        //         title: '风险测评',
        //         // requireAuth: true
        //     },
        //     component: Risk
        // },
        // {
        //     path: 'TenHaoLi',
        //     name: 'TenHaoLi',
        //     meta: {
        //         title: '十大豪礼',
        //         // requireAuth: true
        //     },
        //     component: TenHaoLi
        // },
        // {
        //     path: 'tripleGifts',
        //     name: 'tripleGifts',
        //     meta: {
        //         title: '三重好礼',
        //         // requireAuth: true
        //     },
        //     component: TripleGifts
        // },
        // {
        //     path: 'yaoQing',
        //     name: 'yaoQing',
        //     meta: {
        //         title: '邀请',
        //         // requireAuth: true
        //     },
        //     component: YaoQing
        // },
        // {
        //     path: 'yingKe',
        //     name: 'yingKe',
        //     meta: {
        //         title: '坚守初心',
        //         // requireAuth: true
        //     },
        //     component: YingKe
        // },
        // {
        //     path: 'zhaocha',
        //     name: 'zhaocha',
        //     meta: {
        //         title: '找茬',
        //         // requireAuth: true
        //     },
        //     component: Zhaocha
        // },
        // {
        //     path: 'zhuCeSongLi',
        //     name: 'zhuCeSongLi',
        //     meta: {
        //         title: '注册送礼',
        //         // requireAuth: true
        //     },
        //     component: ZhuCeSongLi
        // }
        {
            path: '/page/message',
            name: 'message',
            meta: {
                title: '消息公告',
                // requireAuth: true
            },
            component: Message

        },
        {

            path: '/page/msgDetail',
            name: 'msgDetail',
            meta: {
                title: '消息详情',
                // requireAuth: true
            },
            component: MsgDetail
        },
        {
            path: '/page/msgDetail1',
            name: 'msgDetail1',
            meta: {
                title: '公告详情',
                // requireAuth: true
            },
            component: MsgDetail1
        },

        // 内页
        {
            path: '/page/detail',
            name: 'detail',
            meta: {
                title: '产品详情',
                // requireAuth: true
            },
            component: Detail
        },
        {
            path: '/page/ceshi',
            name: 'ceshi',
            meta: {
                title: '产品详情',
                // requireAuth: true
            },
            component: Ceshi
        },
        {
            path: '/page/detailto',
            name: 'detailto',
            meta: {
                title: '转让产品详情',
                // requireAuth: true
            },
            component: Detailto
        },
        {
            path: '/page/detailProduct',
            name: 'detailProduct',
            meta: {
                title: '产品详情介绍',
                // requireAuth: true
            },
            component: DetailProduct
        },
        {
            path: '/page/touZiInfo',
            name: 'touZiInfo',
            meta: {
                title: '投资风险说明',
                // requireAuth: true
            },
            component: TouZiInfo
        },

        {
            path: '/page/log',
            name: 'log',
            meta: {
                title: '投资记录',
            },
            component: Log
        },
        {
            path: '/page/pay',
            name: 'pay',
            meta: {
                title: '确认支付',
            },
            component: Pay
        },
        {
            path: '/page/red',
            name: 'red',
            meta: {
                title: '平台福利',
            },
            component: Red
        },
        {
            path: '/page/asset',
            name: 'asset',
            meta: {
                title: '资产',

            },
            component: Asset,
        },
        {
            path: '/page/billingDetails',
            name: 'billingDetails',
            meta: {
                title: '账单明细',
            },
            component: BillingDetails
        },
        {
            path: '/page/recharge',
            name: 'recharge',
            meta: {
                title: '充值',
            },
            component: Recharge
        },
        {
            path: '/page/withdraw',
            name: 'withdraw',
            meta: {
                title: '提现',
            },
            component: Withdraw
        },
        {
            path: '/page/withdrawsuccess',
            name: 'withdrawsuccess',
            meta: {
                title: '提现成功',
            },
            component: Withdrawsuccess
        },
        {
            path: '/page/principal',
            name: 'principal',
            meta: {
                title: '待收本金',
            },
            component: Principal
        },
        {
            path: '/page/income',
            name: 'income',
            meta: {
                title: '待收收益',
            },
            component: Income
        },

        {
            path: '/page/Transfer',
            name: 'Transfer',
            meta: {
                title: '债权转让',
            },
            component: Transfer

        },
        {
            path: '/page/TransferAgreement',
            name: 'TransferAgreement',
            meta: {
                title: '债权转让协议',
            },
            component: TransferAgreement

        },
        {
            path: '/page/Transferdetail',
            name: 'Transferdetail',
            meta: {
                title: '转让产品',
            },
            component: Transferdetail

        },
        {
            path: '/page/Transfersuccess',
            name: 'Transfersuccess',
            meta: {
                title: '转让成功',
            },
            component: Transfersuccess

        },
        {
            path: '/page/assetdetail',
            name: 'assetdetail',
            meta: {
                title: '产品详情',
            },
            component: AssetDetail

        },



    ]
})



//     { path: '*', component: Home }
// ]

// const router = new Router({
//     // mode:'history',
//     routes
// })

// export default router
