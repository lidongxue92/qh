<template>
    <div class="goods">
        <!-- 顶部数据 -->
        <div :class="{top: choosed1, top_selecct: choosed2}">
            <ul>
                <li>
                    <p>访问数(个)</p>
                    <p :class="{f16: choosed1, f16_selecct: choosed2}">1908</p>
                    <p :class="{f17: choosed1, f17_selecct: choosed2}">今日 <span>
                    <img src="~@/assets/icon/ys.png" v-if="choosed1" class="img_cate">
                    <img src="~@/assets/icon/xs.png" v-if="choosed2" class="img_cate">
                    </span>  <span :class="{f18: choosed1, f18_selecct: choosed2}">200</span>
                    </p>
                </li>
                <li>
                    <p>订单量(单)</p>
                    <p :class="{f16: choosed1, f16_selecct: choosed2}">1908</p>
                    <p :class="{f17: choosed1, f17_selecct: choosed2}">今日 <span>
                    <img src="~@/assets/icon/yx.png" v-if="choosed1" class="img_cate">
                    <img src="~@/assets/icon/xx.png" v-if="choosed2" class="img_cate">
                    </span>  <span :class="{f19: choosed1, f19_selecct: choosed2}">200</span>
                    </p>
                </li>
                <li>
                    <p>销售量(件)</p>
                    <p :class="{f16: choosed1, f16_selecct: choosed2}">1908</p>
                    <p :class="{f17: choosed1, f17_selecct: choosed2}">今日 <span>
                    <img src="~@/assets/icon/yx.png" v-if="choosed1" class="img_cate">
                    <img src="~@/assets/icon/xx.png" v-if="choosed2" class="img_cate">
                    </span>  <span :class="{f20: choosed1, f20_selecct: choosed2}">200</span>
                    </p>
                </li>
            </ul>
        </div>
        <!-- 中间数据 -->
        <div class="middle">
            <ul>
                <!-- <li v-for="(item,$index) in items" @click="selectStyle (item, $index) " :class="{'select':item.select,'unselect':!item.select}">{{item.select}}
    　　　　　　</li> -->
                <li v-on:click="selectStyle1" class="click1 select"><span>营销中（29）</span>
                </li>
                <li v-on:click="selectStyle" class="click2"><span>已下架（39）</span>
                </li>
            </ul>
        </div>
        <!-- 商品数据查询 -->
        <div class="nav-list">
            <ul>
                <li v-bind:class="{ select: is_show1}" @click="salesVolume1()">销量
                    <a href="javascript:" class="t">
                        <img src="~@/assets/icon/goods-down.png">
                    </a>
                    <a href="javascript:" class="d">
                        <img src="~@/assets/icon/goods-up.png">
                    </a>
                </li>
                <li v-bind:class="{ select: is_show2}" @click="salesVolume2()">订单量<span></span>
                </li>
                <li v-bind:class="{ select: is_show3}" @click="salesVolume3()">库存<span></span>
                </li>
                <li v-bind:class="{ select: is_show4}" @click="salesVolume4()">添加时间</li>
            </ul>
        </div>
        <!-- 商品列表 -->
        <div class="goods-list">
            <ul>
                <li v-for="(item,index) in datalist">
                    <div class="bb t">
                        <div class="goods-img">
                            <img src="~@/assets/img/category-goods.png">
                            <p>{{item.shihe}}</p>
                        </div>
                        <div class="goods clerfix">
                             <h5>{{item.title}}</h5>
                            <p><span class="price">{{item.price}}</span> <span class="y-charge">引客价</span> <span class="charge">{{item.trueprice}}</span>
                                <a href="javascript:">
                                    <img src="~@/assets/icon/goods-left.png">
                                </a>
                            </p>
                            <ul class="list fl">
                                <li>销量 <span>{{item.xiaoliang}}</span>
                                </li>
                                <li>库存 <span>{{item.kucun}}</span>
                                </li>
                            </ul>
                            <ul class="list fr">
                                <li>成交订单 <span>{{item.suc}}</span>
                                </li>
                                <li>添加时间 <span>{{item.ordertime}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="bottom">
                        <ul class="bottom_operating">
                            <li>
                                <p>
                                    <img src="~@/assets/icon/categroy-yl.png">
                                </p>
                                <p>商品预览</p>
                            </li>
                            <li>
                                <p>
                                    <img src="~@/assets/icon/categroy-yx.png">
                                </p>
                                <p>营销分析</p>
                            </li>
                            <li v-if="choosed2">
                                <p>
                                    <img src="~@/assets/icon/categroy-select.png">
                                </p>
                                <p>加入营销</p>
                            </li>
                            <li v-if="choosed1">
                                <p>
                                    <img src="~@/assets/icon/categroy-xj.png">
                                </p>
                                <p>商品下架</p>
                            </li>
                            <li class="select" v-if="choosed1">
                                <p>
                                    <img src="~@/assets/icon/categroy-tg.png">
                                </p>
                                <p>营销推广</p>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 添加商品 -->
        <div class="add-goods" v-on:click="linktoDetail">
            <img src="~@/assets/icon/goodsadd.png">
            <p>添加商品</p>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'
export default {
    name: 'category',
    data(){
　　　　　　return {
　　　　　　　　active: false,
　　　　　　　　items: [
　　　　　　　　　　{select:'营销中（29)'},
　　　　　　　　　　{select:'已下架（39)'},
　　　　　　　　],
            is_show1: true,
            is_show2: false,
            is_show3: false,
            is_show4: false,
            datalist:[{shihe:'适合20-30岁女性',img:'~@/assets/img/category-goods.png',ordertime:'2018/04/2',price:'￥199',trueprice:'￥268',xiaoliang:'1980',kucun:'880',title:"mac/麦可子弹头经典唇膏麦可子弹头经典唇膏",suc:'158'},{shihe:'适合20-30岁女性',img:'~@/assets/img/category-goods.png',ordertime:'2018/04/2',price:'￥199',trueprice:'￥268',xiaoliang:'1980',kucun:'880',title:"mac/麦可子弹头经典唇膏麦可子弹头经典唇膏",suc:'158'}],
            choosed1:true,
			choosed2:false
　　　　　　}
　　　　},
    created() {
        this.getCategory()
    },
    computed: {
        menuBanner() {
            return this.menu[this.currentIndex].img.url
        },
        categoryTitle() {
            return this.menu[this.currentIndex].name
        }
    },
    methods: {
        switchCategory(index, id) {
            this.currentIndex = index
            this.getProduct(id)
        },
        linktoDetail() {
            this.$router.push({ path: '/page/addgoods'})
        },
        getCategory() {
            this.$http
                .get(
                    'https://www.easy-mock.com/mock/5a4896ba62de717d44f2406e/api/v1/category/all'
                )
                .then(res => {
                    this.menu = res.data.data.category
                    this.getProduct(this.menu[0].id)
                })
        },
        getProduct(id) {
            this.$http
                .get(
                    'https://www.easy-mock.com/mock/5a4896ba62de717d44f2406e/api/v1/product/by_category',
                {
                    params: {
                        id: id
                    }
                }
                )
                .then(res => {
                    this.list = res.data.data.list
                })
        },
        salesVolume2:function(){
            const _this = this;
            this.is_show2=true
            this.is_show1=false
            this.is_show3=false
            this.is_show4=false
            _this.$loading.show();//显示
            setTimeout(function(){  //模拟请求
                  _this.$loading.hide(); //隐藏
            },2000);
        },
        salesVolume3:function(){
            const _this = this;
            this.is_show2=false
            this.is_show1=false
            this.is_show3=true
            this.is_show4=false
            _this.$loading.show();//显示
            setTimeout(function(){  //模拟请求
                  _this.$loading.hide(); //隐藏
            },2000);
        },
        salesVolume4:function(){
            const _this = this;
            this.is_show2=false
            this.is_show1=false
            this.is_show3=false
            this.is_show4=true
            _this.$loading.show();//显示
            setTimeout(function(){  //模拟请求
                  _this.$loading.hide(); //隐藏
            },2000);
        },
        salesVolume1:function(){
            const _this = this;
            this.is_show2=false
            this.is_show1=true
            this.is_show3=false
            this.is_show4=false
            _this.$loading.show();//显示
            setTimeout(function(){  //模拟请求
                  _this.$loading.hide(); //隐藏
            },2000);
        },
        selectStyle () {
            const _this = this;
            $(".click1").removeClass('select');
            $(".click2").addClass('select')
            _this.$loading.show();//显示
            setTimeout(function(){  //模拟请求
                  _this.$loading.hide(); //隐藏
                  _this.choosed1=false;
            	  _this.choosed2=true;
            },2000);
　　　　},
        selectStyle1 () {
            const _this = this;
            $(".click2").removeClass('select');
            $(".click1").addClass('select')
            _this.$loading.show();//显示
            setTimeout(function(){  //模拟请求
                  _this.$loading.hide(); //隐藏
                  _this.choosed1=true;
            	  _this.choosed2=false;
            },2000);

　　　　}
    }
}
</script>

<style scoped lang="less">
.category {
    height: 100%;
    display: flex;
    overflow: hidden;
    .category-menu {
        width: 75px;
        flex: 0 0 75px;
        height: 100%;
        .menu-item {
            height: 25px;
            padding: 10px 0;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-left: 3px solid #ffffff;
            &.active {
                color: #ab956d;
                border-color: #ab956d;
                font-size: 15px;
                // transform: scale(1.125);
                transition: all linear 0.3s;
            }
        }
    }
    .category-main {
        flex: 1;
        height: 100%;
        transition: all 500ms ease-in-out;
        .category-detail-box {
            overflow-y: auto;
            padding: 20px;
            height: 100%;
            box-sizing: border-box;
            -webkit-overflow-scrolling: touch;
            .category-top {
                .category-header {
                    img {
                        width: 100%;
                        vertical-align: top;
                        border-radius: 2px;
                    }
                }
                .category-title {
                    margin: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .text {
                        font-size: 12px;
                        color: #ab956d;
                        font-weight: normal;
                        &::before, &::after {
                            content:'';
                            display: inline-block;
                            position: relative;
                            top: -3px;
                            width: 35px;
                            height: 1px;
                            margin: 0 10px;
                            background-color: #979797;
                            transform: scaleY(0.5);
                        }
                    }
                }
            }
            .category-list {
                display: flex;
                flex-wrap: wrap;
                .category-goods-items {
                    width: 30%;
                    margin-right: 5%;
                    margin-bottom: 10px;
                    text-align: center;
                    &:nth-child(3n) {
                        margin-right: 0;
                    }
                    .goods-image {
                        width: 80%;
                        border-radius: 50%;
                    }
                    .goods-name {
                        color: #444452;
                        font-size: 12px;
                    }
                }
            }
        }
    }
}
.goods {
    font-family:'微软雅黑';
    background: #f8f8f8;
}
/*顶部背景 样式*/
 .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content:" ";
    clear: both;
    height: 0;
}
.clearfix {
    zoom:1;
}
.fl {
    float: left;
}
.fr {
    float: right;
}
.bb {
    border-bottom: 1px solid #dddddd;
}
.img_cate {
    vertical-align: text-bottom;
}
.goods {
    /*顶部样式*/
    .top {
        background: -webkit-linear-gradient(#ff795e, #ff7f40);
        /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#ff795e, #ff7f40);
        /*red Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#ff795e, #ff7f40);
        /* Firefox 3.6 - 15 */
        background: linear-gradient(#ff795e, #ff7f40);
        /* 标准的语法 */
        li {
            display: inline-block;
            width: 32%;
            text-align: center;
            margin-top: 30px;
            margin-bottom: 20px;
            p {
                color: #ffffff;
                font-size:0.8rem;
                line-height: 25px;
            }
        }
        margin-bottom:10px;
        .f16 {
            font-family:PingFangSC-Semibold;
            font-size:1rem!important;
            color:#ffffff;
            letter-spacing:0;
            text-align:center;
        }
        .f17 {
            font-family:PingFangSC-Regular;
            font-size:0.8rem;
            color:#ffffff;
            letter-spacing:0;
            text-align:center;
        }
        .f18, .f19, .f20 {
            font-family:PingFangSC-Regular;
            font-size:0.8rem;
            color:#ffffff;
            letter-spacing:0;
            text-align:center;
        }
    }
    .top_selecct {
        background-color: #ffffff;
        background-color: #ffffff;
        background-color: #ffffff;
        /* Safari 5.1 - 6.0 */
        /*red Opera 11.1 - 12.0 */
        /* Firefox 3.6 - 15 */
        /* 标准的语法 */
        li {
            display: inline-block;
            width: 32%;
            text-align: center;
            margin-top: 30px;
            margin-bottom: 20px;
            p {
                color: #000000;
                font-size:0.8rem;
                line-height: 25px;
            }
        }
        margin-bottom:10px;
        .f16_selecct {
            font-family:PingFangSC-Semibold;
            font-size:1rem!important;
            color:#f54321;
            letter-spacing:0;
            text-align:center;
        }
        .f17_selecct {
            font-family:PingFangSC-Regular;
            font-size:0.8rem;
            color:#999999;
            letter-spacing:0;
            text-align:center;
        }
        .f18_selecct, .f19_selecct, .f20_selecct {
            font-family:PingFangSC-Regular;
            font-size:0.8rem;
            letter-spacing:0;
            text-align:center;
        }
        .f18_selecct {
            color:#f54321;
        }
        .f19_selecct, .f20_selecct {
            color:#0bac27;
        }
    }
    /*中间样式*/
    .middle {
        line-height: 30px;
        border-bottom: 1px solid #d2d2d2;
        background: #ffffff;
        li {
            display: inline-block;
            width: 49%;
            text-align: center;
            padding: 1rem 0;
            span {
                color: #373737;
            }
        }
        .select span {
            color: #f64a29;
            border-bottom: 2px solid #f64a29;
            padding-bottom:1.2rem;
            font-weight: 500;
        }
    }
    /*商品数据查询*/
    .nav-list {
        background: #ffffff;
        .select {
            color: #f64a29;
        }
        li {
            width: 23%;
            display: inline-block;
            text-align: center;
            padding: 1rem 0;
            position: relative;
            font-size:0.9rem;
            a {
                position: absolute;
                margin-left: 0.5rem;
                img {
                    width: 0.6rem;
                }
            }
            .t {
                top: 1.3rem;
            }
            .d {
                bottom: 1.3rem;
            }
        }
    }
    /*商品列表*/
    .goods-list {
        li {
            background: #ffffff;
            margin-top: 0.8rem;
            .t {
                padding: 1.5rem 1rem 1rem 1.5rem;
            }
            .goods-img {
                position: relative;
                width:30%;
                display: inline-block;
                vertical-align:top;
                img {
                    width: 100%;
                }
                p {
                    position: absolute;
                    bottom: 0;
                    background: rgba(153, 153, 153, .7);
                    text-align: center;
                    line-height: 25px;
                    color: #ffffff;
                    font-size: 10px;
                    width: 100%;
                }
            }
            .goods {
                display: inline-block;
                margin-left:2%;
                width: 65%;
                background: #ffffff;
                h5 {
                    width: 95%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-weight: normal;
                    color: #333;
                }
                p {
                    margin-top: 10px;
                }
                .price {
                    color: #f54321;
                    font-size:1rem;
                    font-weight: 600;
                }
                .y-charge {
                    display: inline-block;
                    color:#f54321;
                    border: 1px solid #f54321;
                    padding: 0 3px;
                    font-size:0.6rem;
                    position: relative;
                    bottom: 0.1rem;
                }
                .charge {
                    color: #999999;
                    position: relative;
                    font-size: 0.7rem;
                }
                .charge:after {
                    content:'';
                    display: inline-block;
                    position: absolute;
                    width: 100%;
                    top: 50%;
                    height: 1px;
                    background: #dddddd;
                    left: 0;
                }
                .list {
                    display: inline-block;
                    li {
                        line-height: 25px;
                        padding: 0;
                        font-size: 0.7rem;
                        list-style: none;
                        color: #777;
                        margin-top: 0;
                    }
                }
                a {
                    float: right;
                    img {
                        width: 0.5rem;
                    }
                }
            }
        }
        /*商品列表底部数据*/
        .bottom {
            .bottom_operating {
                list-style:none;
                display:flex;
                flex-direction: row;
                white-space: nowrap;
                justify-content:space-between;
                li {
                    padding:14px 0;
                    img {
                        width:19px;
                        height:19px;
                    }
                    width:25%;
                    font-family:PingFangSC-Regular;
                    font-size:0.8rem;
                    color:#777777;
                    letter-spacing:0;
                    text-align:center;
                }
            }
        }
        /*添加商品*/
    }
    /*添加商品*/
    .add-goods {
        position: fixed;
        top: 60%;
        right: 1rem;
        width: 5rem;
        height:5rem;
        border-radius: 50%;
        background: #ff8134;
        text-align: center;
        z-index:11;
        img {
            margin-top: 1rem;
        }
        p {
            color: #ffffff;
            font-size: 0.9rem;
        }
    }
}
</style>
