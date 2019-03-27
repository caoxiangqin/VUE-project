<template>
    <div class="app-GoodInfo">
        <!--轮播图模块-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper-box :list="rows"></swiper-box>
                </div>
            </div>
        </div>
        <!--商品信息-->
        <div class="mui-card">
            <div class="mui-card-header">{{list.name}}</div>
            <div class="mui-card-content">
                <img :src="list.img_url" id="img">
                <div class="mui-card-content-inner" id="content">
                    <p>￥{{list.price | priceFilter }}</p>
                    购买数量：
                    <div class="mui-numbox" >
                        <button class="mui-btn mui-btn-numbox-minus" type="button" @click="goodSub">-</button>
                        <input class="mui-input-numbox" type="number" value="1" v-model="count"/>
                        <button class="mui-btn mui-btn-numbox-plus" type="button" @click="goodAdd">+</button>
                    </div>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="danger" size="small" @click="addCart">加入购物车</mt-button>
            </div>
        </div>
         <div class="bgImg">
            <img src="../../img/bg1.jpg" >
            <img src="../../img/bg2.jpg" >
        </div>
    </div>
</template>
<script>
import swiperBox from "../sub/swiperBox.vue"
import { Toast } from "mint-ui"
    export default {
        data(){
            return {
                rows:[],//获取的轮播图照片
                list:{},  // 获取的当前商品的信息
                count:1,
            }
        },
        created(){
            this.getImg();
            this.findGoodInfo()
        },
        methods:{
            //点击加的按钮
            goodAdd(){
                this.count++;
            },
            //点击减号的时候
            goodSub(){
                if(this.count>1){
                     this.count--
                }else{
                   this.count=1
                }
            },
            // 获取商品详情的轮播图图片
            getImg(){
                var url = "http://127.0.0.1:3000/imageList"
                this.axios.get(url).then(result=>{
                    //console.log(result)
                    this.rows = result.data;
                })
            },
            // 获取商品列表穿过来的参数，并且根据传过来的参数获取这个商品的详情
            findGoodInfo(){
                var pid = this.$route.query.pid;
                //console.log(pid)
                var url = "http://127.0.0.1:3000/findProduct?pid="+pid;
                this.axios.get(url).then(result=>{
                   //console.log(result.data)
                    this.list = result.data[0];
                    //console.log(this.list)
                })
            },
             //加入购物车
            addCart(){
                var img = this.list.img_url;
                var name = this.list.name;
                var pid = this.$route.query.pid;
                var count = this.count;
                var price = this.list.price;
                var url = "http://127.0.0.1:3000/addCart?pid="+pid+"&count="+count+"&price="+price+"&img_url="+img+"&name="+name;
                //console.log(url)
                this.axios.get(url).then(result=>{
                    //console.log(result)
                    if(result.data.code==1){
                        Toast('加入购物车成功')
                    }else{
                        Toast("请登录")
                    }
                })
            }
        },
       
        components:{
            'swiper-box':swiperBox
        }

    }
</script>
<style>
    #img{
       width:30%;
       height:73%;
       position:absolute;
       top:14px;
       left:10px
   } 
    #content{
        top:10px;
        left:123px;
    }
    .mui-card-header{
        text-align:center
    }
    .app-GoodInfo .bgImg{
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        margin:0 5px;
    }
</style>