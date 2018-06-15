<!--
**************************************
*   名称：一个demo
*   作用：展示如何把页面嵌入框架
*   作者：
**************************************
-->
<template>
<div class="content">
  <h1>内部员工</h1>
  <div class="line"></div>
  <el-form :inline="true" label-width="80px" size="mini">
    <el-form-item>
      <el-input placeholder="请输入" icon="search" v-model="search_text" class="search-input">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSearch">搜索</el-button>
    </el-form-item>
  </el-form>
  <el-table
    :data="data"
    border
    style="width: 100%"
    :default-sort = "{prop: 'right', order: 'descending'}"
  >
    <el-table-column
      prop="username"
      label="姓名"
      sortable
    >
    </el-table-column>
    <el-table-column
      prop="idcardnum"
      label="身份账号"
      sortable
    >
    </el-table-column>
    <el-table-column
      prop="username"
      label="账号"
      sortable
    >
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码"
      sortable
    >
    </el-table-column>
    <el-table-column
      prop="qq_number"
      label="QQ"
      sortable
    >
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      sortable
    >
    </el-table-column>
    <el-table-column
      prop="phone_number"
      label="手机号码"
      sortable
    >
    </el-table-column>
    <el-table-column
      v-if="false"
      prop="idcardnum"
      label="资产信息"
      sortable
    >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="125">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" @click="user_edit(scope.row.id)" size="small"></el-button>
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
</div>
</template>

<script>
    import router from "../../router/index";
    import Qs from 'qs';

    export default {
        data() {
          return {
            data: [],
            search_text:'',
            totalCount:0,
            currentPage:1,
            pagesize:5,
          }
        },
        methods: {
          handleSizeChange: function (size) {
            this.currentPage = 1;
            this.pagesize = size;
            this.getuserlist();
          },
          handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
            this.getuserlist()
          },
          getuserlist(){
            let params = {
              user_token:this.user_token,
              user_id:this.user_id,
              page:this.currentPage-1,  //页码
              pageSize:this.pagesize,
              
            }
            if(this.search_text){
              params.search_text= this.search_text;
            }
            this.$http.post(this.api.account_staff_list_inside,params).then((res)=>{
              if(res.is_success){
                this.data = res.value.list;
                this.totalCount = res.value.totalCount;
              }else{
                this.list_data=[];
              }
            })
          },
            user_edit(id) {
        console.log(id)
        router.push({
          path:'user_edit',
          query: {
            id: id
          }
        })
      },
          user_del() {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          onSearch(){
            this.getuserlist();
          }
        },
        created(){
          this.owner_company_id = localStorage.getItem("owner_company_id")
          this.owner_user_id = localStorage.getItem("owner_user_id")
          this.user_token = localStorage.getItem("user_token");
          this.user_id = localStorage.getItem("user_id");
          this.getuserlist();
        },
      }
</script>
<style scoped>
   .line{
      margin: 20px 0;
      border-top: 1px solid #dcdfe6;
    }
</style>
