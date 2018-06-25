<template>
    <div class="page-view">
        <view-box ref="viewBox"
                  body-padding-top="46px"
                  :body-padding-bottom="isPaddingBottom">
            <keep-alive>
                <router-view class="router-view" />
            </keep-alive>
            <tabbar slot="bottom"
                    style="position:fixed"
                    v-if="!isShowTabbar">
                <tabbar-item link="/page/home"
                             :selected="$route.path === '/page/home'">
                    <span class="icon icon-home"
                          slot="icon"></span>
                    <span slot="label">首页</span>
                </tabbar-item>
                <tabbar-item link="/page/category"
                             :selected="$route.path === '/page/category'">
                    <span class="icon icon-category"
                          slot="icon"></span>
                    <span slot="label">理财</span>
                </tabbar-item>
                <tabbar-item link="/page/data"
                             :selected="$route.path === '/page/data'">
                    <span class="icon icon-cart"
                          slot="icon"></span>
                    <span slot="label">发现</span>
                </tabbar-item>
                <tabbar-item link="/page/asset"
                             :selected="$route.path === '/page/asset'">
                    <span class="icon icon-user"
                          slot="icon"></span>
                    <span slot="label">资产</span>
                </tabbar-item>
            </tabbar>
        </view-box>
    </div>
</template>

<script>
import {
    Tabbar,
    TabbarItem,
    ViewBox,
    Actionsheet,
    TransferDom
} from 'vux'
import { mapState } from 'vuex'
export default {
    name: 'page',
    directives: {
        TransferDom
    },
    data() {
        return {
            showMenu: false,
        }
    },
    created() {},
    computed: {
        ...mapState(['title']),
        leftOptions() {
            return {
                showBack: this.$route.path !== '/page/home'
            }
        },
        rightOptions() {
            return {
                showMore: true
            }
        },
        isShowTabbar() {

            if (/detail|ceshi|storeer|store_users|addgoods|storeInfo|shop|order|commodityData|pay|log|red|platform|message|income|recharge|principal|withdraw|billingDetails|service|aboutUs/.test(this.$route.path)) {
                return true
            }
            return false
        },
        isPaddingBottom() {
        //     if (/platform/.test(this.$route.path)) {
        //         return true
        //     }
        //     return false
        }
    },
    methods: {
        onClickMore() {
            this.showMenu = true
        }
    },
    components: {
        Tabbar,
        TabbarItem,
        ViewBox,
        Actionsheet,
        TransferDom
    }
}
</script>
<style type="text/css">
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{color: #2395FF!important;}
.weui-tabbar__icon{width: 1rem !important;height: 1rem!important}
</style>
<style scoped lang="less">
.page-view {
    height: 100%;
    .weui-tabbar__item {
        background: #fff;        
        padding-top: .8rem /* 20/40 */;
        padding-bottom: .3rem /* 10/40 */;
        .icon {
            width: 1rem;
            height: 1rem;
            display: inline-block;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            &.icon-home {
                background-image: url(~@/assets/toolbar/home.png);
            }
            &.icon-category {
                background-image: url(~@/assets/toolbar/category.png);
            }
            &.icon-cart {
                background-image: url(~@/assets/toolbar/cart.png);
            }
            &.icon-user {
                background-image: url(~@/assets/toolbar/my.png);
            }
        }
        &.weui-bar__item_on {
            .icon {
                &.icon-home {
                    background-image: url(~@/assets/toolbar/home@selected.png) !important;
                }
                &.icon-category {
                    background-image: url(~@/assets/toolbar/category@selected.png) !important;
                }
                &.icon-cart {
                    background-image: url(~@/assets/toolbar/cart@selected.png) !important;
                }
                &.icon-user {
                    background-image: url(~@/assets/toolbar/my@selected.png) !important;
                }
            }
        }
    }
}
/*针对iPhone X底部footer做适配*/
// @media only screen and (device-width: 375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3) {
//     .weui-tabbar{
//         padding-bottom:34px;
//     }
// }
</style>
