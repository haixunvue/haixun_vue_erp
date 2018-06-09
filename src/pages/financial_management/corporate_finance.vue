<!--
**************************************
*   名称：一个demo
*   作用：展示如何把页面嵌入框架
*   作者：
**************************************
-->
<template>
<div class="content">
  <h1>财务审批</h1>
  <div class="line"></div>
  <el-form ref="form" :model="form" label-width="90px" size="mini">
    <el-col :span="8">
    <el-form-item label="状态">
      <el-select v-model="search_form.process_status" placeholder="选择状态">
        <el-option label="已处理" value="down"></el-option>
        <el-option label="未处理" value="none"></el-option>
      </el-select>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="选择公司">
      <el-select v-model="search_form.target_company_id" placeholder="选择公司">
          <el-option v-for="(item,index) in company_list" :key="index" :label="item.company_full_name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="手机或单据" placeholder="选择手机或单据编号">
      <el-input v-model="search_form.search_text"></el-input>
    </el-form-item>
    </el-col>
    <!--<el-form-item class="inline">-->
      <!--<el-button type="primary" @click="onSubmit">搜索</el-button>-->
    <!--</el-form-item>-->
    <el-col :span="8">
    <el-form-item label="开始时间">
      <el-date-picker
      v-model="search_form.datetime_start"
       @change="(val)=>{this.search_form.datetime_start=val}"
        type="datetime"
        value-format="yyyy-MM-dd hh:mm:ss"
        placeholder="选择开始日期时间"
        align="right"
        :picker-options="pickerOptions">
      </el-date-picker>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="结束时间">
      <el-date-picker
        v-model="search_form.datetime_end"
        @change="(val)=>{this.search_form.datetime_end=val}"
        type="datetime"
        value-format="yyyy-MM-dd hh:mm:ss"
        placeholder="选择结束日期时间"
        align="right"
        :picker-options="pickerOptions">
      </el-date-picker>
    </el-form-item>
    </el-col>
    <el-form-item class="inline">
      <el-button type="primary" @click="search">搜索</el-button>
      <el-button type="primary" @click="clearSearch">重置</el-button>
    </el-form-item>
  </el-form>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    :default-sort = "{prop: 'right', order: 'descending'}"
    >
    <el-table-column
      prop="id"
      label="公司ID"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="admin"
      label="单据编号"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="right"
      label="电话"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="money"
      label="充值金额"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="rcmoney"
      label="凭证图片"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="rcmoney"
      label="备注"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="rcmoney"
      label="状态"
      sortable
      >
    </el-table-column>
    <el-table-column
      label="操作"
      width="90"
      >
      <template slot-scope="scope">
        <el-button type="primary" @click="showToggle(scope.row)" v-if="scope.row.flag" size="small">审核通过</el-button>
        <el-button type="info" @click="showToggle(scope.row)" v-else size="small">不予通过</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="rcmoney"
      label="操作员"
      sortable
    >
    </el-table-column>
    <el-table-column
      prop="rcmoney"
      label="日期"
      sortable
    >
    </el-table-column>
  </el-table>
</div>
</template>

<script>
    import router from "../../router";
    export default {
        data() {
          return {
            company_list: [],
              list_data:[],
            totalCount:0,
            currentPage:1,
            pagesize:5,
            search_form:{
              process_status:'',
              target_company_id:'',
              search_text:'',
              datetime_start:'',
              datetime_end:'',
            },
            pickerOptions: {
              shortcuts: [{
                text: '今天',
                onClick(picker) {
                  picker.$emit('pick', new Date());
                }
              }, {
                text: '昨天',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24);
                  picker.$emit('pick', date);
                }
              }, {
                text: '一周前',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', date);
                }
              }]
            },
          }
        },
        methods: {
           handleSizeChange: function (size) {
            this.currentPage = 1;
            this.pagesize = size;
            this.company_money_recharge_list()
          },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
              this.company_money_recharge_list()
            },
          search() {
          this.currentPage = 1;
          console.log(this.search_form)
          this.company_money_recharge_list()
          },
         clearSearch: function(){
             this.search_form={
              process_status:'',
              target_company_id:'',
              search_text:'',
              datetime_start:'',
              datetime_end:'',
            }
          },
          get_company_list(){
            this.$http.post(this.api.get_company_list,{
              user_token:localStorage.getItem('user_token'),
              user_id:localStorage.getItem('user_id'),
            }).then((res)=>{
              //console.log(res);
              if(res.is_success){
                this.company_list = res.value;
              }
            })
          },
       company_money_recharge_list(){
        let params = {
            user_token:this.user_token,
            user_id:this.user_id,
            page:this.currentPage-1,  //页码
            pageSize:this.pagesize,
        }
        if(this.search_form.datetime_start){
            params.datetime_start=this.search_form.datetime_start;
        }
        if(this.search_form.datetime_end){
            params.datetime_end=this.search_form.datetime_end;
        }
        if(this.search_form.process_status){
            params.process_status=this.search_form.process_status;
        }
        if(this.search_form.target_company_id){
            params.target_company_id=this.search_form.target_company_id;
        }
        if(this.search_form.search_text){
            params.search_text=this.search_form.search_text;
        }


        this.$http.post(this.api.company_money_recharge,params).then((res)=>{
                console.log('list_data',res);
                if(res.is_success){
                    this.list_data = res.value.list;
                    this.totalCount = res.value.totalCount;
                }else{
                     this.list_data=[];
                }


            })
      },
        },
        mounted() {
            this.owner_company_id = localStorage.getItem("owner_company_id")
            this.owner_user_id = localStorage.getItem("owner_user_id")
            this.user_token = localStorage.getItem("user_token");
            this.user_id = localStorage.getItem("user_id");
            this.get_company_list();
            this.company_money_recharge_list();

        },
      }
</script>
<style scoped>
   .line{
      margin: 20px 0;
      border-top: 1px solid #dcdfe6;
    }
  .inline{
    display: inline-block;
  }
</style>
