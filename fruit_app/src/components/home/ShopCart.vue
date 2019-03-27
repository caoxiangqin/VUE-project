<template>
   <div class="app-cart">
        <mt-header fixed title="我的购物车"></mt-header>
		<div class="main">	
			<div class="mui-card" id="card" v-for="(item,i) in cartList" :key="item.id">
				<div class="mui-card-content">
					<img :src="item.img_url" id="img">
					<div class="mui-card-content-inner" id="content">
						<h4>{{item.name}}</h4>
						<span>此商品为热卖的商品</span>
						<p class="price">￥{{item.price | priceFilter}}</p> 
						购买数量：
						<div class="mui-numbox" >
							<button class="mui-btn mui-btn-numbox-minus" type="button"  @click="reduce" :data-index ="i">-</button>
							<input class="mui-input-numbox"  v-model="item.count" />
							<button class="mui-btn mui-btn-numbox-plus" type="button"  @click="add"
							:data-index ="i">+</button>
						</div>
					</div>
				</div>
				<div class="mui-card-footer" id="footer">
					<input type="checkbox" :checked="item.cb" @click = "modifyItem" :data-index ="i" :data-id="item.id">
					<button class="btn" @click="deleteItem" :data-index ="i" :data-id="item.id">删除</button>
                小计:￥{{item.price*item.count | priceFilter}}
				</div>
			</div>
		</div>
		<div class="sum">
			<input type="checkbox" :checked="cbAll" @click = "slectAll">全选
			<button class="btn1" @click="removeItem">删除选中商品</button>
              合计:<span>￥{{total | priceFilter}}</span>  
		</div>
    </div> 
</template>
<script>
import { Toast } from 'mint-ui'
   export default {
       data(){
           return {
			   cartList:[],
			   cb : false,
			   cbAll : false
		   }
       },
	   methods:{
		   	//购物车中商品的数量的减法
			reduce(e){
				var index = e.target.dataset.index
				var count = this.cartList[index].count
				//console.log(count)
				if(count>1){
					count--	
					this.cartList[index].count = count
				}else{
					count = 1
					this.cartList[index].count = count
				}
			},
			//购物车中的商品数量加法
			add(e){
				var index = e.target.dataset.index
				var count = this.cartList[index].count
				count++
				this.cartList[index].count = count
			},


		//    当点击全选按钮的时候，所有商品选中，如果取消全选，所有商品取消
		   slectAll(e){
			  var cb = e.target.checked;
			  //console.log(cb)
			  this.cbAll = cb;
			  //console.log(this.cbAll)
			  for (var item of this.cartList){
				//   遍历购物车中每个商品，把每个商品的checked属性值改的和全选按钮的值一致
				  item.cb = cb;
			  }
		   },
		//    当商品中有一项没有被选中的全选按钮就不会被选中
			modifyItem(e){
				//获取当前事件的下标
				var idx = e.target.dataset.index;
				//console.log(idx)
				//获取当前元素的checked状态
				var checked = e.target.checked;
				//根据当前元素的状态修改当前元素属性的状态
				this.cartList[idx].cb = checked;
				//设置每个元素的checked的状态为true的计数
				var count = 0;
				//遍历购物车数组每个元素的checked的状态为true的就++
				for (var item of this.cartList){
					if(item.cb){
						count++;
					}	
				}
				//判断数组的长度和checked为true的比较如果相同，证明每个商品都是选中的状态
				//修改全选按钮的状态为true
				if(this.cartList.length==count){
						this.cbAll = true;
					}else{
						this.cbAll = false;
					}
			},
			// 删除选中的商品
			removeItem(){
				var html = '';
				for(var item of this.cartList){
					if(item.cb){
						html+=item.id+',';
					}
				}
				html = html.substring(0,html.length-1);
				var url = "http://127.0.0.1:3000/removeItem?ids="+html;
				this.axios.get(url).then(result=>{
					if(result.data.code==1){
						Toast("删除商品成功");
						this.loadCart();
					}else{
						Toast("删除商品失败")
					}
				})
			},
		//    页面加载的时候加载当前用户的购物车信息
		   loadCart(){
			  var url = "http://127.0.0.1:3000/CartList" ;
			  this.axios.get(url).then(result=>{
				  //console.log(result);
				  this.cartList=result.data.data;
				  for(var item of result.data.data){
					  item.cb =false
				  }
				 // console.log(this.cartList)
				  this.cartList=result.data.data;
				  this.$store.commit("updateCount",this.cartList.length);
			  })
		   },
		//    当点击按钮的时候，从购物车中删除当前的商品
		deleteItem(e){
			var id = e.target.dataset.id;
			//console.log(id);
			var idx = e.target.dataset.index;
			var url = "http://127.0.0.1:3000/delCartItem?id="+id;
			this.axios.get(url).then(result=>{
				if(result.data.code==1){
					Toast('删除成功');
					this.cartList.splice(idx,1);
				}else{
					Toast('删除失败')
				}
			})
		},
	
	   },
	   created(){
		   this.loadCart();
	   },
	   computed:{
		   total(){
			   var sum = 0;
			   for(var c of this.cartList){
					sum+=c.price*c.count;  
			   }
			   return sum
		   }
	   } 
   } 
</script>
<style>
   .app-cart .mint-header {
	  background-color:#693;
      font-size:16px;
      font-weight:bolder;
     }
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
	.main{
		margin-top:44px
	}
	.price{
		margin-top:10px;
		font-size:18px;
		color:red;
		font-style:italic;
		font-weight:bolder;
	}
	.btn{
		background-color:red;
		width:80px;
		color:white
	}
	.btn1{
		background-color:red;
		color:white;
		margin-left:45px;
	}
	#content h4{
		color:#693
	}
	#footer{
		font-size:18px;
		color:#693;
		font-weight:bolder;
	}
	.sum{
		position:fixed;
		bottom:51px;
		right:-5px;
		border:1px solid #aaa;
		width:100%;
		margin:0 5px;
		border-radius:3px;
		height:40px;
		line-height:40px;
	}
	.sum input{
		margin-left:10px;
	}
	.sum span{
		font-size:18px;
		color:#693;
		margin-left:10px;
		font-weight:bolder;
	}
	.main{
		margin-bottom:100px;
	}
</style>