<!--
**************************************
*   名称：一个demo
*   作用：展示如何把页面嵌入框架
*   作者：
**************************************
-->
<template>
<div class="content">
  <h1>公司列表</h1>
  <div class="line"></div>
  <el-input placeholder="请输入" icon="search" v-model="search_text" class="search-input">  
  </el-input> 
  <el-table
    :data="company_list"
    border
    style="width: 100%"
    :default-sort = "{prop: 'name', order: 'descending'}"
    >
    <el-table-column
      fixed
      prop="name"
      label="ID"
      sortable
      width="130"
      size="mini"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="公司名"
      sortable
      width="130"
      >
    </el-table-column>
    <el-table-column
      prop="regmoney"
      label="注册资金/万(¥)"
      sortable
      width="140"
      >
    </el-table-column>
    <el-table-column
      prop="reg_address"
      label="注册地点"
      sortable
      width="110"
      >
    </el-table-column>
    <el-table-column
      prop="legalp"
      label="法人名称"
      sortable
      width="110"
      >
    </el-table-column>
    <el-table-column
      prop="range"
      label="经营范围"
      sortable
      width="110"
      >
    </el-table-column>
    <el-table-column
      prop="work_address"
      label="办公地址"
      sortable
      width="300"
      >
    </el-table-column>
    <el-table-column
      prop="tel"
      label="电话"
      sortable
      width="110"
      >
    </el-table-column>
    <el-table-column
      prop="dialogImageUrl"
      label="营业执照照片"
      sortable
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="125">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" @click="company_edit(scope.row.id)" size="small"></el-button>
        <el-button type="danger" icon="el-icon-delete" @click="company_del(scope.row.id)" size="small"></el-button>
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
    :total="totalItems">
  </el-pagination>
</div>
</template>

<script>
    import router from "../../router";
    import Qs from 'qs';

    export default {
        data() {
          return {
            company_list:[],
            search_text:'',
            totalCount:0,
            currentPage:1,
            pagesize:5,
          }
        },
        methods: {
          search: function(){
          this.currentPage = 1;
          this.company_list_paging()
      },
        clearSearch: function(){
          this.search_text=''
            this.company_list_paging()
          },
          handleSizeChange: function (size) {
                   this.currentPage = 1;
            this.pagesize = size;
            this.company_list_paging();         
          },
          handleCurrentChange: function(currentPage){
              this.currentPage = currentPage;
        this.company_list_paging();
          },
           company_list_paging(){
              let params = {
              user_token:this.user_token,
              user_id:this.user_id,
              page:this.currentPage-1,  //页码
              pageSize:this.pagesize,
            }
            if(this.search_text){
              params.search_text=this.search_text
            }
            this.$http.post(this.api.company_list_paging,params).then((res)=>{
              if(res.is_success){
                this.company_list = res.value.list;
                this.totalCount = res.value.totalCount;
              }else{
                this.company_list=[];
              }
            })
          },
   
          company_edit(company_id){
            router.push({
              path:'company_info',
              query: {
                 company_id: company_id
              }
            })
          },
          company_del(company_id) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.deleteCompany(company_id)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
          },
          deleteCompany(company_id){
             this.$http.post(this.api.company_delete,{
            user_token: this.user_token ,
            user_id: this.user_id ,
            target_id:company_id
          }).then((res)=>{
            //console.log(res);
            if(res.is_success){
              this.company_list_paging()
            }
          })
          },
        },
        mounted(){
       this.owner_company_id = localStorage.getItem("owner_company_id")
        this.owner_user_id = localStorage.getItem("owner_user_id")
        this.user_token = localStorage.getItem("user_token");
        this.user_id = localStorage.getItem("user_id");
          this.company_list_paging();
        },
       
      }
</script>
<style scoped>
    .line{
      margin: 20px 0;
      border-top: 1px solid #dcdfe6;
    }
</style>