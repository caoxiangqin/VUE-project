<template>
<div class="app-login">
    <mt-header fixed title="用户登录"></mt-header>
    <div class="mui-card">
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <form>
                    用户名 <input type="text" name="uname" v-model="uname">
                    密  码 <input type="password" name="upwd" v-model="upwd">
                    <input type="button" value="登录" class="btn" @click="Login">
                </form>	
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { Toast } from 'mint-ui'
    export default {
        data(){
            return {
                uname:'',
                upwd:''
            }
        },
        methods:{
            Login(){
                var u = this.uname;
                var p = this.upwd;
                var reg=/^[a-z0-9]{3,12}$/i;
                if(!reg.test(u)){
                    Toast("用户名格式不正确");
                    return;
                }
                if(!reg.test(p)){
                    Toast("密码格式不正确");
                    return;
                }
                var url = "http://127.0.0.1:3000/Login?uname="+u+'&upwd='+p;
                this.axios.get(url).then(result=>{
                    if(result.data.code==1){
                        Toast("登录成功")
                        this.$router.push("/Home")
                    }else{
                        Toast("用户名和密码有误")
                    }
                })
            }
        }
    }
</script>
<style >
    header.mint-header {
	  background-color:#faf;
      font-size:16px;
      font-weight:bolder;
      margin-bottom:50px;
    }
    .app-login .mui-card{
      margin-top:100px;
      background:#ddd;  
    }
    .app-login .mui-card form{
        font-size:16px;
        font-weight:bold;
    }
    .app-login .mui-card .btn{
        margin-left:90px;
        width:120px;
        background:#693;
        font-size:15px;

    }
</style>