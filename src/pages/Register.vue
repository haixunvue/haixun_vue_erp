<template>
  <div class="content">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="nickname">
            <el-input v-model="form.nickname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号" prop="idcardnum">
            <el-input v-model="form.idcardnum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="电话" prop="phone_number">
            <el-input v-model="form.phone_number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="QQ">
            <el-input v-model="form.qq_number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import router from "../router";
    import Qs from 'qs';

    export default {
        data() {
          var validatePhone = ( rule, value, callback ) => {
            if ( value === '' ) {
              callback( new Error( '请输入用户名' ) );
            } else {
              callback();
            }
          };
          var validatePass = ( rule, value, callback ) => {
            if ( value === '' ) {
              callback( new Error( '请输入密码' ) );
            } else {
              callback();
            }
          };
          var validateCode = ( rule, value, callback ) => {
            if ( value === '' ) {
              callback( new Error( '请输入昵称' ) );
            } else {
              callback();
            }
          };
          var validateCard = ( rule, value, callback ) => {
            let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if ( !value ) {
              return callback( new Error( '请填写身份证号' ) );
            }else if(!reg.test(value)){
              callback(new Error('请输入正确的身份证号'));
            }else {
              callback();
            }
          };
          var validateTel = ( rule, value, callback ) => {
            if ( value === '' ) {
              callback( new Error( '请输入手机号码' ) );
            } else if(!(/^1[0-9]\d{9}$/.test(value))){
              callback(new Error('请输入正确的手机号'));
            }  else {
              callback();
            }
          };
            return {
                form:{
                  username:"",
                  password:"",
                  nickname:'',
                  phone_number:'',
                  idcardnum:'',
                  qq_number:'',
                  email:'',
                },
              rules: {
                username: [
                  {required: true, validator: validatePhone, trigger: 'blur' }
                ],
                password: [
                  { required: true, validator: validatePass, trigger: 'blur' }
                ],
                nickname: [
                  { required: true, validator: validateCode, trigger: 'blur' }
                ],
                idcardnum: [
                  { required: true, validator: validateCard, trigger: 'blur' }
                ],
                phone_number: [
                  { required: true, validator: validateTel, trigger: 'blur' }
                ],
              },
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
            onSubmit(formName){
              this.$refs[ formName ].validate( async ( valid ) => {
                if ( valid ) {
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
                localStorage.setItem('user_token',res.token)
                localStorage.setItem('user_id',res.value.id)
                localStorage.setItem('login_type','front')//前台登录
                localStorage.setItem('user_info',JSON.stringify(res.value))

                this.setCookie("token",res.token,1/24);
                this.setCookie("user_id ",res.value.id,1/24);
                this.$message.success('注册成功,正在为您跳转');
                        router.push({
                        path:'/main/'
                 })
              })
                }
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
