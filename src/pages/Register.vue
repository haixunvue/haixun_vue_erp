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
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="称呼">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号">
            <el-input v-model="form.idcardnum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="QQ">
        <el-input v-model="form.qq"></el-input>
      </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="电话">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      
      
      
      
      
      
      <el-form-item label="身份">
        <el-radio v-model="form.status" label="staff" border>我是员工</el-radio>
        <el-radio v-model="form.status" label="boss" border>我是老板</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import router from "../router";
    import Qs from 'qs'; 

    export default {
        data() {
            return {
                form:{
                  username:"",
                  password:"",
                  nickname:'',
                  phone_number:'',
                  idcardnum:'', 
                  qq:'',
                  email:'',
                }
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
              //注册
              this.$http.post(this.api.register,this.form).then((res)=>{
                if(!res.is_success){
                  throw 'error';
                }
                //登录
               return this.$http.post(this.api.login,{
                  username:this.form.username,
                  password:this.form.password
                })

              }).then((res)=>{
                 console.log('login',res)
                 if(!res.is_success){
                  return;
                }
                localStorage.user_token = res.token;
                localStorage.user_id = res.value.id;
                this.setCookie("token",res.token,1/24);
                this.setCookie("user_id ",res.value.id,1/24);
                this.$message.success('注册成功,正在为您跳转');
                        router.push({
                        path:'/main'
                 })
              })
            }
        }
    }
</script>
<style scoped>
  .content{
    padding: 20px;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
</style>