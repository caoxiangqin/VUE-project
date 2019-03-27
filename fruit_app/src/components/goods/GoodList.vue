<template>
    <div class="app-goodList">
         <mt-header fixed title="商品详情"></mt-header>
        <div class="goods-item" v-for="(item,i) of list" :key="item.pid">
            <img :src="item.img_url" @click = "jumpInfo" :data-id="item.pid">
            <h4>{{item.title}}</h4>
            <div class="info">
                <span class="now">￥{{item.price | priceFilter}}</span>
            </div>
            <div class="sell">
                <span >热卖中</span>              
            </div>             
        </div>
        <mt-button type="primary" size="large" @click = "getMore">加载更多</mt-button>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                pno:0,
                pageSize:6,
                list:[]
            }
        },
        methods:{
            //当页面初始化完之后，获取商品的信息显示在页面中
            getGoodList(){
                this.pno++;
               var url = "http://127.0.0.1:3000/GoodList?pno="+this.pno+"&pageSize="+this.pageSize;
               http://127.0.0.1:3000/GoodList?pno=1&pageSize=7
               this.axios.get(url).then(result=>{
                   //console.log(result.data)
                   this.list = result.data.data;
                   //console.log(this.list)
               }) 
            },
            // 点击更过，获取更多的商品列表
            getMore(){
                this.pno++;
               var url = "http://127.0.0.1:3000/GoodList?pno="+this.pno+"&pageSize="+this.pageSize;
               http://127.0.0.1:3000/GoodList?pno=1&pageSize=7
               this.axios.get(url).then(result=>{
                   //console.log(result.data)
                   var rows=this.list.concat(result.data.data);
                   //console.log(this.list)
                   this.list = rows;
               }) 
            },
            //点击每个商品的信息跳转到相应的商品详情页显示当前的内容
            jumpInfo(e){
                var pid =e.target.dataset.id;
                this.$router.push("/GoodInfo?pid="+pid);
            }
        },
        created(){
            this.getGoodList()
        }
    }
</script>
<style >
   /* 外层父元素 */
  .app-goodList{
      display:flex;
      flex-wrap:wrap;
      justify-content:space-between;
      padding:4px;
      margin-bottom:50px;
  }  
  /* 商品项 */
 .app-goodList .goods-item{
     width:49%;
     border:1px solid #ccc;
     box-shadow:0 0 8px #ccc;
     margin:4px 0;
     padding:2px ;
     display:flex;
     flex-direction:column;
     min-height:230px;
     justify-content:space-between;
  }
  .app-goodList .goods-item img{
      width:100%;
  }
  .app-goodList .goods-item h4{
      font-size:18px;
  }
  /* 分页 */
  .app-goodList .goods-item .now{
      color:red;
      font-size:16px;
      font-weight:bold;
  } 
  /*加载更多的按钮*/
  .app-googList .mint-button{
      margin-bottom:20px;
  } 
  .app-goodList .mint-header {
	  background-color:#693;
      font-size:16px;
      font-weight:bolder;
     }
</style>