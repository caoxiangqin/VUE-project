import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Home from "./components/tabbar/Home.vue"
import GoodInfo from "./components/goods/GoodInfo.vue"
import GoodList from "./components/goods/GoodList.vue"
import Login from "./components/home/Login.vue"
import ShopCart from "./components/home/ShopCart.vue"
export default new Router({
  routes: [
    {path:'/',redirect:"/Home" },
    {path:"/Home",component:Home},
    {path:"/GoodInfo",component:GoodInfo},
    {path:"/GoodList",component:GoodList},
    {path:"/Login",component:Login},
    {path:"/ShopCart",component:ShopCart}
    
  ]
})

