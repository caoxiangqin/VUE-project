import Vue from 'vue'
import App from './App.vue'
import router from './router'
//0:引入Vuex 
import Vuex from "vuex"
//0.1：注册Vuex组件
Vue.use(Vuex)
//0.2：创建store
var store = new Vuex.Store({
  state:{
    cartCount:sessionStorage.getItem("cartCount")  || 0  //共享数据：购物车中商品数量
  },
  mutations:{
    increment(state){
      //购物车中数量加1；点击商品详情【加入购物车】
      state.cartCount++;
    },
    //显示购物车列表时的方法
    updateCount(state,count){
      state.cartCount=count;
      sessionStorage.setItem("cartCount",count);
    }
  },
  getters:{
    //获取购物车数量的方法
    optCartCount:function(state){
      return state.cartCount;
    }
  }
})
//0.9:将store对象添加Vue实例成为一个属性
//1：引入了mint-ui样式文件
import'mint-ui/lib/style.css'

Vue.config.productionTip = false
// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
import './lib/mui/css/mui.css'
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'
//3.引入mint-ui 组件 Header
import {Header,Swipe,SwipeItem,Button} from "mint-ui"
//4.注册Header 组件
Vue.component(Header.name,Header);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Button.name,Button);
//5:引入axios库
import axios from "axios"
//6：配置跨域访问保存session
axios.defaults.withCredentials=true;
//7.将axios库配置Vue实例对象
Vue.prototype.axios=axios;
//7.1：加载第三方的模块qs
import qs from "qs";
//7.2：配置qs模块，qs成为Vue属性
Vue.prototype.qs = qs;



//8.main.js  创建日期过滤器
Vue.filter("datetimeFilter",function(val){    
    //8.1:创建日期对象
    var date= new Date(val);
    //8.2:获取年  月  日 时 分 秒
    var y=date.getFullYear();  
    var m=date.getMonth()+1;
    var d=date.getDate();
    var h=date.getHours();
    var mi=date.getMinutes();
    var s=date.getSeconds();
    //8.3:返回字符串  y-m-d  h:mi:s
    m<10&&(m="0"+m);
    d<10&&(d="0"+d);
    mi<10&&(mi="0"+mi);
    return `${y}-${m}-${d} ${h}:${mi}:${s}`
  });
  //9.创建一个日期的过滤器
  Vue.filter("dateFilter",function(val){
    var date=new Date(val);
    var y=date.getFullYear();
    var m=date.getMonth()+1;
    var d=date.getDate();
    m<10&&(m="0"+m);
    d<10&&(d="0"+d);
    return `${y}-${m}-${d}`;
  })
  //10.创建一个价格的过滤器
  Vue.filter("priceFilter",function(val){
    var val = Number(val)
    var price= val.toFixed(2)
    return price
  })
new Vue({            
  router,
  render: h => h(App),
  store
}).$mount('#app')

