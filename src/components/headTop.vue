<!--
**************************************
*  名称：页面头部
*  作用：页面头部
*  作者：
**************************************
-->
<template>
    <div>
      <el-menu

        class="el-menu-demo"
        mode="horizontal"

        background-color="#222"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">海逊ERP</el-menu-item>
        <el-menu-item index="2">
          <el-select size="mini" v-if="!isFromBack" v-model="roleValue" @change="changeValue()" placeholder="请选择">
            <el-option
              v-for="(item,index) in roleList"
              :value="index"
              :label="item._title"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-menu-item>
        <!-- <span class="demonstration" style="float:right;padding-top:10px;margin-right:1%">
           <el-dropdown trigger="click">
             <span class="el-dropdown-link" style="color:white">
               admin<i class="el-icon-caret-bottom el-icon--right"></i>
             </span>
             <el-dropdown-menu slot="dropdown">
               <el-dropdown-item>个人信息</el-dropdown-item>
               <el-dropdown-item>退出登录</el-dropdown-item>
             </el-dropdown-menu>
           </el-dropdown>
       </span> -->
       <!-- <span class="demonstration" style="float:right;padding-top:10px;margin-right:1%">

        <el-dropdown class="user" trigger="click">
          <template slot="title" class="el-dropdown-link">{{name}} - {{status}}</template>
          <el-dropdown-menu slot="dropdown">
            <el-menu-item  @click="Cd_User_edit3">修改密码</el-menu-item>
            <el-menu-item  @click="goOut">安全退出</el-menu-item>
          </el-dropdown-menu>
        </el-dropdown>
       </span> -->
        <div class="message"   index="3">
          <div v-if="voice_prompt">
            <i class="el-icon-warning"></i>
            <span>11</span>
          </div>
          <div v-if="system_message_receiving">
            <i class="el-icon-message"  ></i>
            <span>4</span>
          </div>
        </div>
        <el-submenu  class="user" index="4">
          <template slot="title">{{name}} {{status}}</template>
          <el-menu-item index="4-1"  @click="Cd_User_edit3">修改密码</el-menu-item>
          <el-menu-item index="4-2" @click="goOut">安全退出</el-menu-item>
        </el-submenu>

        <!-- <el-submenu index="2">

          <template slot="title">{{name}} - {{status}}</template>
            <span class="el-dropdown-link">
              {{name}} - {{status}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          <el-dropdown>
            <el-dropdown-menu slot="dropdown">
              <el-menu-item  @click="Cd_User_edit3">修改密码</el-menu-item>
              <el-menu-item  @click="goOut">安全退出</el-menu-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-submenu> -->
      </el-menu>
    </div>
</template>
<script>
    import router from "../router";
    import Qs from 'qs';

    export default {
        data() {
            return {
              name:'',
              status:'',
              roleList:[],
              roleValue:'',
              isFromBack:false,
              system_message_receiving:false,//消息
              voice_prompt:false,//语音提示
            }
        },
        methods:{
          changeValue(){
            let role_item = this.roleList[Number(this.roleValue)]
            this.updataIdInfo(role_item)
            this.updateMenu(role_item,true)
            
          },
             get_account_role(){
                this.$http.post(this.api.account_role,{
                  user_token:this.user_token,
                  target_user_id:this.user_id,
                  user_id:this.user_id
                }).then((res)=>{
                   console.log("get_account_role",res);
                   if(!res.is_success){
                     return;
                   }


                  if(res.value.length>0){

                    let roleValue=localStorage.getItem("roleValue_index");
                    console.log('roleValue1', roleValue)
                    if(!roleValue||isNaN(roleValue)||roleValue>=res.value.length){
                       this.roleValue=0;
                    }else{
                      this.roleValue=Number(roleValue);
                    }
                    this.updataIdInfo(res.value[this.roleValue])
                    this.updateMenu(res.value[this.roleValue]);
                   }

                    this.roleList = res.value;


                })
            },
            updataIdInfo(role){
              let isBoss = role._type=='boss';
              localStorage.setItem('owner_user_id',role.owner_user_id)
              localStorage.setItem('owner_company_id',isBoss?role.id:role.owner_company_id)
              localStorage.setItem('roleValue_index',this.roleValue)
              console.log( this.roleValue)
              console.log('owner_user_id',role.owner_user_id)
              console.log('owner_company_id:',isBoss?role.id:role.owner_company_id)
            },
            getName(){
              this.name = this.user_info.nickname;

            },
            updateMenu(role,fromSelect){
              console.log(role)
              eventBus.$emit('updateMenu', {role:role,fromSelect:fromSelect})
            },
            goOut(){
              localStorage.clear();
              router.push({
                path:'/'
              })
            },
            Cd_User_edit3(){
              router.push({
                path:'/main/Cd_User_edit3'
              })
            }
        },
        created(){
           this.user_info = JSON.parse( localStorage.getItem("user_info"))
           this.system_message_receiving= this.user_info.permission_system_message_receiving=='true'
           this.voice_prompt= this.user_info.permission_voice_prompt=='true'
        },
        mounted() {
            this.isFromBack = localStorage.getItem("login_type")=='back'//是否来自后台
            this.user_token = localStorage.getItem("user_token");
            this.user_id = localStorage.getItem("user_id");
            this.getName();
            if(!this.isFromBack){
                this.get_account_role();
            }


        }
    }
</script>
<style scoped>
    .message{
      position: absolute;
      right: 90px;
    }
    .message > div{
      height: 60px;
      display: inline-block;
      color: #fff;
      vertical-align: middle;
      line-height: 70px;
      position: relative;
      margin-right: 20px;
    }
    .message > div >i{
      border: 1px #666 solid;
      padding: 6px;
    }
    .message > div >span{
      position: absolute;
      top: 6px;
      right: -14px;
      background: red;
      height: 20px;
      line-height: 20px;
      border-radius: 4px;
      font-size: 12px;
      padding: 0 2px;
      min-width: 15px;
      text-align: center;
    }
    .el-menu-item i {
      color: #fff;
      padding: 5px;
      border: 1px #eee solid;
     }
    .user{
        float: right !important;
    }
</style>
