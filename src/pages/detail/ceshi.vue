<template>
    <div>
        <!--@model自定义事件是在该dom在第一次出现在视口内时触发的方法-->
        <!--v-view-lazy='method' 或 v-view-lazy='(e)=>method(e,...arg)'-->
        <div  class="cnt" v-for="(v,i) in msg" :key="i" v-view-lazy @model="(e)=>getAjaxContent(e,v.msg)">
            loading...
        </div>
        <div  class="cnt" v-for="(v,i) in msg" :key="i" v-view-lazy @model="getAjaxContent()">
            loading...
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                msg:[{"a":'1'},{"a":'1'},{"a":'1'},{"a":'1'},{"a":'1'},{"a":'1'},{"a":'1'},{"a":'1'},{"a":'1'},]
            }
        },
        mounted(){
            
        },
        methods:{
            getAjaxContent(event,msg){
                event.innerText = msg
            },
        }
    }
</script>
