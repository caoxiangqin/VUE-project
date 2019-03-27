<template>
    <div id="app-home">
        <!--顶部导航条-->
        <Header></Header>
        <!--轮播图-->
       <mt-swipe :auto="3000">
            <mt-swipe-item v-for="item in list" :key="item.id">
                <img :src="item.img_url"/>
            </mt-swipe-item>        
        </mt-swipe>
        <!--搜索输入框-->
        <div class="search">
            <input type="text" class="content" placeholder="请输入关键字">
            <button class="btn">搜索</button>
        </div>
        <!--九宫格-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/GoodList">
		                    <img src="../../img/menu9.png" >
		                    <div class="mui-media-body">商品</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/Login">
		                    <img src="../../img/menu2.png" >
		                    <div class="mui-media-body">登录</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/ShopCart">
		                    <img src="../../img/menu3.png" >
		                    <div class="mui-media-body">购物车</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/menu7.png" >
		                    <div class="mui-media-body">本地特产</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/menu5.png" >
		                    <div class="mui-media-body">搜索</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/menu6.png" >
		                    <div class="mui-media-body">更多</div></a></li>
		        </ul>        
        <!--大图概述-->
        <div class="bgImg">
            <img src="../../img/bg1.jpg" >
            <img src="../../img/bg2.jpg" >
        </div>
           
    </div>
</template>
<script>
import Header from "../home/Header.vue"
    export default {
        data(){
            return {
                list:[]
             }
        },
        components:{ Header },
        methods:{
            getImage(){
                var url="http://127.0.0.1:3000/imageList";
                this.axios.get(url).then(result=>{
                    //console.log(result.data);
                    this.list=result.data;
                })
            }
        },   
        created(){
            this.getImage()
        }
    }
</script>
<style >
    #app-home .mint-swipe {
        height:200px;
        margin-top:41px;
    }
    #app-home .mint-swipe img{
        width:400px;
        height:200px;
    }
     #app-home .mui-grid-9 img{
        width:60px;
        height:60px;
    }
    #app-home .mui-grid-view .mui-grid-9{
        background-color:#fff;
    }
    /*热搜索的制做*/
    #app-home .search .content{
        width:190px;
        height:33px;
        border:1px solid #faf;
        font-size:15px;
        
    }
    #app-home .search{
        margin:5px auto;
        text-align:center
    }
    #app-home .search .btn{
        background-color:red;
        color:white
    }
    #app-home .bgImg{
        display:flex;
        flex-direction:column;
        justify-content:space-between;
    }
</style>
