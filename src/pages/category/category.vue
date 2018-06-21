<template>
    <div class="goods">
        <h5><span>我的</span><span style="float: right;">消息</span></h5>
        <ul class="tab">
            <li class="Conducttab active" @click="Conducttab">理财专区</li>
            <li class="Transfertab" @click="Transfertab">转让专区</li>
        </ul>
        <!-- 理财专区 -->
        <div class="Conduct" v-if='isshow'>
            <div class="top" v-for="(item,index) in datalist" v-if="index == 0">
                <h5>{{item.Title}}</h5>
                <p>{{item.Profit}}</p>
                <p>预计年化收益率</p>
                <p>{{item.Day}} &emsp; 理财期限</p>
                <button class="button">立即投资</button>
            </div>
            <div class="middle">
               <table>
                    <tbody v-for="(item,index) in datalist" @click="linktoDetail">
                        <tr>
                           <td>{{item.Title}}</td>
                           <td>{{item.Data}}</td>
                           <td>{{item.Label}}</td>
                       </tr>
                       <tr>
                           <td class="first">
                                <p>{{item.Profit}}</p>
                                <p>预计年化收益率</p>
                            </td>
                           <td>
                                <p>{{item.Day}}</p>
                                <p>理财期限</p>
                            </td>
                           <td>
                                <p>{{item.Quota}}</p>
                                <p>剩余额度</p>
                           </td>
                       </tr>
                    </tbody>
               </table>
           </div>
        </div>
        <!-- 转让专区 -->
        <div class="Transfer" v-if='isshow1'>
            <div class="middle">
               <table>
                    <tbody v-for="(item,index) in datalist" @click="linktoDetail()">
                        <tr>
                           <td>{{item.Title}}</td>
                           <td>{{item.Data}}</td>
                           <td>{{item.Label}}</td>
                       </tr>
                       <tr>
                           <td class="first">
                                <p>{{item.Profit}}</p>
                                <p>预计年化收益率</p>
                            </td>
                           <td>
                                <p>{{item.Day}}</p>
                                <p>理财期限</p>
                            </td>
                           <td>
                                <p>{{item.Quota}}</p>
                                <p>剩余额度</p>
                           </td>
                       </tr>
                    </tbody>
               </table>
           </div>
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
　　　　　　　　datalist:[
                    {Title:'热卖产品',Data:'',Label:'热卖',Profit:'12%',Day:'15天',Quota:'1000'},
                    {Title:'火爆产品',Data:'',Label:'',Profit:'10%+0.5%',Day:'30天',Quota:'3000'}
                ],
                isshow1:false,
                isshow:true
　　　　　　}
　　　　},
    created() {
    },
    computed: {
    },
    methods: {
        linktoDetail() {
            this.$router.push({ path: '/page/detail'})
        },
        // 理财专区
        Conducttab(){
            const _this = this
            _this.isshow = true
            _this.isshow1 = false
            $(".Conducttab").addClass('active')
            $(".Transfertab").removeClass('active')
            _this.$loading.show();//显示
            setTimeout(function(){  //模拟请求
                  _this.$loading.hide(); //隐藏
            },2000)
        },
        Transfertab(){
            const _this = this
            _this.isshow = false
            _this.isshow1 = true 
            $(".Transfertab").addClass('active')
            $(".Conducttab").removeClass('active')
            _this.$loading.show();//显示
            setTimeout(function(){  //模拟请求
                  _this.$loading.hide(); //隐藏
            },2000)
        }
    }
}
</script>

<style scoped lang="less">
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
.goods{
    h5{line-height: 30px;font-weight: normal;font-size: 0.8rem;border-bottom: 1px solid #eee;padding: 0 1rem;}
    .tab{
        li{display: inline-block;width: 49%;border-bottom: 1px solid #eee;text-align: center;line-height: 40px;height: 40px;}
        .active{background: #ed711f;color: #fff}
    }
    .top{
        text-align: center;padding: 1rem 0;border-bottom: 1px solid #eee;
        h5{font-size: 0.9rem;font-weight: normal;text-align: center;line-height: 30px;border-bottom: 0;}
        p{text-align: center;font-size: 0.8rem;line-height: 30px;}
        .button{display: inline-block;width: 30%;line-height: 30px;height: 30px;border: 0;border-radius: 5px;background: #ed711f;color: #fff;margin-top: 10px;}
    }
    .middle{
        margin-top: 10px;
        padding:0 1rem;
        table{
            border: 1px solid #eee;border-collapse: collapse;width:100%;
            td{
                border: 1px solid #eee;font-size: 0.8rem;padding: 1rem 0.5rem;width: 28%;text-align: center;
                p{text-align: center;}
            }
            .first{width: 42%;}
        }
    }
}
</style>
