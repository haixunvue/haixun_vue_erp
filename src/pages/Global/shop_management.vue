<template>
<div class="content">
  <h1>店铺管理</h1>
  <div class="line"></div>
  <el-form :inline="true" label-width="80px" size="mini">
    <el-form-item>
      <el-select
        v-model="company_selected_id"
        placeholder="请选择公司"
        size="mini"
        v-on:change="onCompanyChange()">
        <el-option
          v-for ="item in company_list"
          :key="item.id"
          :label="item.company_full_name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-select
        v-model="staff_selected_id"
        placeholder="请选择公司员工"
        size="mini"
        v-on:change="onStaffChange()">
        <el-option
          v-for ="item in staff_list"
          :key="item.id"
          :label="item.staff_name"

          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-input placeholder="请输入" icon="search" v-model="search_text" class="search-input">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">搜索</el-button>
       <el-button type="primary" size="mini" style="margin-left:5px" v-on:click="clearSearch">重置</el-button>
    </el-form-item>
  </el-form>
  <el-table
    :data="shop_list"
    border
    style="width: 100%"
    :default-sort = "{prop: 'name', order: 'descending'}"
    >
    <el-table-column
      fixed
      prop="shop_name"
      label="店铺名"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="所属公司"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="regmoney"
      label="绑定员工数"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="reg_address"
      label="产品个数"
      sortable
      >
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="125">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" @click="shop_edit" size="small"></el-button>
        <el-button type="danger" icon="el-icon-delete" @click="shop_del" size="small"></el-button>
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
    import router from "../../router";
    import Qs from 'qs';

    export default {
        data() {
          return {
              company_list:[],
            company_selected_id:'',
            staff_list:[],
            staff_selected_id:'',
             search_text:'',
             totalCount:0,
            currentPage:1,
            pagesize:5,
            shop_list: [],
          }
        },
        methods: {
          search: function(){
          this.currentPage = 1;
          this.company_shop_list()
          },
          clearSearch: function(){
        this.company_selected_id=''
        this.staff_selected_id=''
        this.search_text=''
        this.company_shop_list(false)
         },
          handleSizeChange: function (size) {
              this.pagesize = size;
          },
          handleCurrentChange: function(currentPage){
              this.currentPage = currentPage;
          },
          currentChangePage(list) {
            // console.log("1")
            let from = (this.currentPage - 1) * this.pageSize;
            let to = this.currentPage * this.pageSize;

            for (; from < to; from++) {
              if (list[from]) {
                this.data2.push(list[from]);
              }
            }
          },
          company_edit(shopId) {
            router.push({
              path:'G_company_edit'
            })
          },
          shop_del(shopId) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.company_shop_delete(shopId)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          company_shop_delete(shopId){
            this.$http.post(this.api.company_shop_delete,{
            user_token:this.user_token,
            user_id:this.user_id,
            target_id:shopId,
            }).then((res)=>{
                if(res.is_success){
                    this.company_shop_list();
                }
                console.log('company_shop_list',res);

            })
          },
          onCompanyChange(){
              this.company_staff_list();
              this.company_shop_list()
          },
           onStaffChange(){
             this.company_shop_list()
           },
           company_staff_list(){
             let params = {
              user_token:this.user_token,
              user_id:this.user_id,
            }
            if(this.company_selected_id){
              params.user_query=`owner_company_id=='${this.company_selected_id}'`;
            }

            //员工列表
            this.$http.post(this.api.company_staff_list,params).then((res)=>{
              console.log('company_staff_list',res);
              if(res.is_success){
                this.staff_list=res.value
              }
            })
          },
          get_company_list(){
            this.$http.post(this.api.get_company_list,{
              user_token:this.user_token,
              user_id:this.user_id,
            }).then((res)=>{
              //console.log(res);
              if(res.is_success){
                this.company_list = res.value;
              }
            })
          },
          company_shop_list(){
            let params = {
              user_token:this.user_token,
              user_id:this.user_id,
              page:this.currentPage-1,  //页码
              pageSize:this.pagesize,
            }
            if(this.company_selected_id){
              params.target_company_id = this.company_selected_id
            }
            if(this.staff_selected_id){
              params.target_staff_id = this.staff_selected_id
            }

            this.$http.post(this.api.company_shop_list_paging,params).then((res)=>{
                console.log('company_shop_list',res);
                if(res.is_success){
                    this.shop_list = res.value.list;
                  this.totalCount = res.value.totalCount;
                }else{
                     this.shop_list=[];
                }


            })
          },
        },
        created(){
            this.user_token = localStorage.getItem("user_token");
            this.user_id = localStorage.getItem("user_id");
            this.get_company_list()
            this.company_staff_list()
            this.company_shop_list()
        },

      }
</script>
<style scoped>
    .line{
      margin: 20px 0;
      border-top: 1px solid #dcdfe6;
    }
</style>
