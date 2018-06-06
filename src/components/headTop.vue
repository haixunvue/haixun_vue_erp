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
        <el-submenu  class="user" index="2">
          <template slot="title">{{name}} - {{status}}</template>
          <el-menu-item index="2-1"  @click="Cd_User_edit3">修改密码</el-menu-item>
          <el-menu-item index="2-2" @click="goOut">安全退出</el-menu-item>
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
                role_list:[],
            }
        },
        methods:{

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

                   let role_list = []
                    res.value.companys.map((item)=>{
                            item.showName=item.company_short_name;
                            item.isBoss = true;
                            role_list.push(item)
                    })
                    res.value.staffs.map((item)=>{
                            item.showName=item.name;
                            item.isBoss = false;
                            role_list.push(item)
                    })
                    this.role_list = role_list;

               }) 
            },
            getName(){
              this.name = this.user_info.nickname;
                
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
        },
        mounted() {
            this.isFromBack = localStorage.getItem("login_type")=='back'//是否来自后台
            this.user_token = localStorage.getItem("user_token");
            this.user_id = localStorage.getItem("user_id");
            this.get_account_role();
            this.getName();
        }
    }
</script>
<style scoped>
    .user{
        float: right;
    }
</style>