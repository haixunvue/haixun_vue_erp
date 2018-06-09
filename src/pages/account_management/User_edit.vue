<template>
<div class="content">
  <template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="用户信息" name="first">
        <el-form class="user-info" :ref="userInfo" :model="userInfo" label-width="80px">
          <h3>常规信息</h3>
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
          <h3>联系信息</h3>
          <el-form-item label="手机号码">
            <el-input v-model="userInfo.phone_number"></el-input>
          </el-form-item>
          <el-form-item label="QQ号码">
            <el-input v-model="userInfo.qq_number"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="setInfo(userInfo)">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="用户权限" name="second">
        <el-form class="user-permission" label-position="top" :model="userPermission" label-width="80px">
          <el-form-item label="推广:">
            <el-checkbox-group v-model="userPermission.generalize">
              <el-checkbox label="推广信息"></el-checkbox>
              <el-checkbox label="推广公司管理"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="后台管理:">
            <el-checkbox-group v-model="userPermission.bgManagement">
              <el-checkbox label="后台账号"></el-checkbox>
              <el-checkbox label="后台财务"></el-checkbox>
              <el-checkbox label="后台物流"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="公司管理:">
            <el-checkbox-group v-model="userPermission.cpManagement">
              <el-checkbox label="公司管理"></el-checkbox>
              <el-checkbox label="员工管理"></el-checkbox>
              <el-checkbox label="公司财务"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="通用:">
            <el-checkbox-group v-model="userPermission.general">
              <el-checkbox label="系统消息接收"></el-checkbox>
              <el-checkbox label="语音提示"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="用户资产(公司)" name="third">
        <el-input style="width: 200px"></el-input>
        <el-button>搜索</el-button>
        <el-button>添加公司</el-button>
        <el-table
          :data="data"
          border
          style="width: 100%"
          :default-sort = "{prop: 'right', order: 'descending'}"
        >
          <el-table-column
            prop="id"
            label="id"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="companyName"
            label="公司全称"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="companyPerson"
            label="公司法人"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="contact"
            label="联系方式"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="companyAssets"
            label="公司资产"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            sortable
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="125">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="user_edit" size="small">详情</el-button>
              <el-button icon="el-icon-edit" @click="user_edit" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 20, 50, 100]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </el-tab-pane>
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
            totalCount:0,
            currentPage:1,
            pagesize:5,
            data: [],
            userInfo:{
              sex:'',
              birth:'',
              blood:'',
              location:'',
              phone_number:'',
              qq_number:'',
              email:'',
            },
            userPermission:{
              generalize:[],
              bgManagement:[],
              cpManagement:[],
              general:[],
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

          },
          handleSizeChange: function (size) {
            this.currentPage = 1;
            this.pagesize = size;
          },
          handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
          },
          account_get_infos(){
            let params={
              user_token:this.user_token,
              user_id:this.user_id,
              target_id:this.id,
            }
            this.$http.post(this.api.account_get_infos,params).then((res)=>{
              if(res.is_success){
                this.userInfo = res.value;
              }else{
                this.userInfo={};
              }
            })
          },
          setInfo(userInfo){

            userInfo.user_token=this.user_token
            userInfo.user_id=this.user_id
            userInfo.target_id=this.id
            this.$http.post(this.api.account_set_infos,userInfo).then((res)=>{
              if(res.is_success){
                console.log(res);
              }else{

              }
            })
          }
        },
        mounted() {
            this.owner_company_id = localStorage.getItem("owner_company_id")
            this.owner_user_id = localStorage.getItem("owner_user_id")
            this.user_token = localStorage.getItem("user_token");
            this.user_id = localStorage.getItem("user_id");
            this.id= this.$route.query.id
          this.account_get_infos()
        },
      }
</script>
<style scoped>
  .user-info,.user-permission{
    width: 50%;
  }
  h3{
    margin-bottom: 20px;
    margin-left: 80px;
  }
  .el-form--label-top{
    font-weight: 600;
  }
  .user-permission .el-form-item{
    border-bottom: 1px #eee solid;
  }
  .user-permission .el-form-item:last-child{
    border-bottom: 0;
  }
</style>
