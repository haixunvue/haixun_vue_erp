<!--
**************************************
*   名称：一个demo
*   作用：展示如何把页面嵌入框架
*   作者：
**************************************
--> 
<template>
    <div class="content">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
             <el-button class="right" type="text" @click="go_login">去登录前台</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import router from "../router";

    export default {
        data() {
            return {
                form:{
                    username:'',
                    password:''
                },
                uid:''
            }
        },
        methods:{
          setCookie: function (cname, cvalue, exdays) {
              var d = new Date();
              d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
              var expires = "expires=" + d.toUTCString();
              console.info(cname + "=" + cvalue + "; " + expires);
              document.cookie = cname + "=" + cvalue + "; " + expires;
              console.info(document.cookie);
          },
          onSubmit(){
            localStorage.clear();
            this.$http.post(this.api.login,{
              username:this.form.username,
              password:this.form.password
            }).then((res)=>{

                if(res.value.permission_backstage!='true'){
                  this.$message.success('对不起，您没有权限登录');
                      
                  return;
                }
               
                localStorage.setItem('user_token',res.token)
                localStorage.setItem('user_id',res.value.id)
                localStorage.setItem('login_type','back')//后台登录
                localStorage.setItem('user_info',JSON.stringify(res.value))
      
                this.setCookie("token",res.token,1/24);
                this.setCookie("user_id ",res.value.id,1/24);

                this.$message.success('登录成功,正在为您跳转');
                        router.push({
                        path:'/main/'
                 }) 
              
              
            })
          },
          go_login(){
            router.push({
              path:'/'
            })
          }
        }
    }
</script>
<style scoped>
    .right{
      float: right;
      padding: 12px 20px;
    }
    .content{
      padding: 20px;
      border-radius: 4px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
</style>