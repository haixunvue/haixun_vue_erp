<!--
**************************************
*   名称：一个demo
*   作用：展示如何把页面嵌入框架
*   作者：
**************************************
-->
<template>
  <div class="content">
    <h1>外部员工</h1>
    <div class="line"></div>
    <el-form :inline="true" label-width="80px" size="mini">
      <el-form-item>
        <el-input placeholder="请输入" icon="search" v-model="schfilter" class="search-input">
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
        prop="name"
        label="姓名"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="username"
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
        prop="tel"
        label="QQ"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="idcardnum"
        label="邮箱"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="idcardnum"
        label="手机号码"
        sortable
      >
      </el-table-column>
      <el-table-column
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
          <el-button type="primary" icon="el-icon-edit" @click="user_edit" size="small"></el-button>
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
        schfilter:"",
        data2:[],
        data3:[],
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
          permission_backstage:false,
          search_text:this.schfilter||''
        }
        this.$http.post(this.api.account_staff_list,params).then((res)=>{
          if(res.is_success){
            this.data = res.value.list;
            this.totalCount = res.value.totalCount;
          }else{
            this.list_data=[];
          }
        })
      },
      user_edit() {
        router.push({
          path:'user_edit'
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
        this.search_text=this.schfilter
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
  .el-pagination{
    position: absolute;
    bottom: 50px;
    right: 100px;
  }
</style>
