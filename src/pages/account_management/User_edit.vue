<!--
**************************************
*   名称：一个demo
*   作用：展示如何把页面嵌入框架
*   作者：
**************************************
-->
<template>
<div class="content">
  <template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="用户信息" name="first">
        <el-form ref="userInfo" :model="userInfo" label-width="80px">
          <el-form-item label="性别">
            <el-input v-model="userInfo.sex"></el-input>
          </el-form-item>
          <el-form-item label="生日">
            <el-input v-model="userInfo.birth"></el-input>
          </el-form-item>
          <el-form-item label="血型">
            <el-input v-model="userInfo.blood"></el-input>
          </el-form-item>
          <el-form-item label="所在地">
            <el-input v-model="userInfo.location"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="userInfo.mobile"></el-input>
          </el-form-item>
          <el-form-item label="QQ号码">
            <el-input v-model="userInfo.qq"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userInfo.mail"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="用户权限" name="second">用户权限</el-tab-pane>
      <el-tab-pane label="用户资产(公司)" name="third">用户资产(公司)</el-tab-pane>
    </el-tabs>
  </template>
</div>
</template>

<script>
    import router from "../../router/index";
    export default {
        data() {
          return {
            activeName:'first',
            userInfo:{
              sex:'',
              birth:'',
              blood:'',
              location:'',
              mobile:'',
              qq:'',
              mail:'',
            },
            form: {
              name: '老刘',
              username:'admin1',
              right:'超级管理员',
              order:'20',
              money:1000.00
            }
          }
        },
        methods: {
          handleClick(tab, event) {
            console.log(tab, event);
          }
        }
      }
</script>
<style scoped>

</style>
