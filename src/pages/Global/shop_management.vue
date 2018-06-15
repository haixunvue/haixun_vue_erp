<template>
<div class="content">
  <h1>店铺管理</h1>
  <div class="line"></div>
  <el-form :inline="true" label-width="80px" size="mini">
    <el-form-item label="选择公司">
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
    <el-form-item v-if="false" label="选择员工">
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
    <el-form-item label="开始时间">
      <el-date-picker
        v-model="datetime_start"
        @change=""
        type="datetime"
        value-format="yyyy-MM-dd hh:mm:ss"
        placeholder="选择开始日期时间"
        align="right"
        :picker-options="pickerOptions">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="结束时间">
      <el-date-picker
        v-model="datetime_end"
        @change=""
        type="datetime"
        value-format="yyyy-MM-dd hh:mm:ss"
        placeholder="选择结束日期时间"
        align="right"
        :picker-options="pickerOptions">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-input placeholder="店铺名" icon="search" v-model="search_text" class="search-input">
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
      prop="id"
      label="公司ID"
      sortable
      >
    </el-table-column>
    <el-table-column
      fixed
      prop="shop_name"
      label="店铺名"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="region_name"
      label="授权国家"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="amazion_account"
      label="代理邮箱"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="_createTime"
      label="授权时间"
      sortable
      >
    </el-table-column>

    <el-table-column
      fixed="right"
      width="290">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit_shop_name(scope.row, scope.$index)" size="small">修改名字</el-button>
        <el-button type="success" @click="editAuthorization(scope.row, scope.$index)" size="small">重新授权</el-button>
        <el-button type="danger" @click="company_shop_delete_confirm(scope.row, scope.$index)" size="small">解除授权</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--弹框-->
  <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
    <div class="input"><span>店铺别名:</span><el-input v-model="shop_name" placeholder="请输入店铺别名" style="margin-top:5px"></el-input></div>
    <div class="site-box clear" v-if="isEdit">
      <div class="input"><span>Amazon账号:</span><el-input v-model="amazion_account" placeholder="请输入账号" style="margin-top:5px"></el-input></div>
      <div>
        <span>开户站:</span><br />
        <el-select v-model="siteIndex"  placeholder="请选择" style="margin-top:5px">
          <el-option v-for="(item ,index) in site" :key="index" :label="item.name" :value="index">
          </el-option>
        </el-select>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="isEdit?amazon_re_authorize():save_shop_name()">{{isEdit?'授 权':'修 改'}}</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
  </el-dialog>
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
    import site from '@/json/site';

    export default {
        data() {
          return {
            dialogVisible:false,
            siteIndex: '',
            isEdit:false,
            shop_name:'',
            title:'',
            site: site,
            company_list:[],
            company_selected_id:'',
            staff_list:[],
            staff_selected_id:'',
            search_text:'',
            totalCount:0,
            currentPage:1,
            pagesize:5,
            shop_list: [],
            datetime_start:'',
            datetime_end:'',
            pickerOptions: {
              shortcuts: [{
                text: '最近一周',
                onClick:(picker)=> {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                  this.datetime_end= moment(end).format('YYYY-MM-DD HH:mm:ss')
                  this.datetime_start= moment(start).format('YYYY-MM-DD HH:mm:ss')
                }
              }, {
                text: '最近一个月',
                onClick:(picker)=> {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                  this.datetime_end= moment(end).format('YYYY-MM-DD HH:mm:ss')
                  this.datetime_start= moment(start).format('YYYY-MM-DD HH:mm:ss')
                }
              }, {
                text: '最近三个月',
                onClick:(picker)=> {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                  this.datetime_end= moment(end).format('YYYY-MM-DD HH:mm:ss')
                  this.datetime_start= moment(start).format('YYYY-MM-DD HH:mm:ss')
                }
              }]
            },
          }
        },
        methods: {
          edit_shop_name(item,index){
            this.re_auth_data = item;
            this.shop_name=item.shop_name;
            this.dialogVisible = true;
            this.title="修改名字";
            this.isEdit = false;
          },
          editAuthorization(item,index){
            console.log(item)
            this.re_auth_data = item;
            this.shop_name=item.shop_name;
            this.amazion_account=item.amazion_account;
            this.siteIndex=this.findSiteIdx(item.region);
            this.dialogVisible = true;
            this.title="修改Amazon权限";
            this.isEdit = true;
          },
          save_shop_name(){
              if(!this.re_auth_data){
                  return;
              }
            this.$http.post(this.api.company_shop_set_infos,{
            user_token:this.user_token,
            user_id:this.user_id,
            owner_company_id: this.re_auth_data.owner_company_id,
            owner_user_id:this.re_auth_data.owner_user_id,
            target_id:this.re_auth_data.id,
            shop_name:this.shop_name,
            amazion_account:this.re_auth_data.amazion_account,
            account_id:this.re_auth_data.account_id,
            access_key:this.re_auth_data.access_key,
            secret_key:this.re_auth_data.secret_key,
            region:this.re_auth_data.region,
            region_name:this.re_auth_data.region_name,
            }).then((res)=>{
                if(res.is_success){
                    this.dialogVisible = false;
                    this.company_shop_list();
                }

            })
          },
          amazon_re_authorize(){
              if(!this.re_auth_data){
                  return;
              }
            this.$http.post(this.api.amazon_re_authorize,{
            user_token:this.user_token,
            user_id:this.user_id,
            owner_company_id: this.re_auth_data.owner_company_id,
            owner_user_id:this.re_auth_data.owner_user_id,
            target_id:this.re_auth_data.id,
            shop_name:this.shop_name,
            amazion_account:this.amazion_account,
            account_id:this.re_auth_data.account_id,
            access_key:this.re_auth_data.access_key,
            secret_key:this.re_auth_data.secret_key,
            region:this.siteIndex===''?'':this.site[Number(this.siteIndex)].value,
            region_name:this.siteIndex===''?'':this.site[Number(this.siteIndex)].name,
            }).then((res)=>{
                console.log('amazon_auth',res);
                if(res.is_success){
                    this.dialogVisible = false;
                    this.company_shop_list();
                }

            })
          },
             findSiteIdx(value){
                for(let i=0;i<site.length;i++){
                    if(site[i].value==value){return i;}
                }
                return '';
            },
          search: function(){
          this.currentPage = 1;
          this.company_shop_list()
          },
          clearSearch: function(){
        this.company_selected_id=''
        this.staff_selected_id=''
        this.search_text=''
        this.company_shop_list()
         },
          handleSizeChange: function (size) {
              this.currentPage = 1;
            this.pagesize = size;
            this.company_shop_list();
          },
          handleCurrentChange: function(currentPage){
              this.currentPage = currentPage;
            this.company_shop_list()
          },
      
           company_shop_delete_confirm(item,index) {
            this.$confirm('确定要删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.company_shop_delete(item,index)
            }).catch(() => {
            });
          },
          company_shop_delete(item,index){
            this.$http.post(this.api.company_shop_delete,{
            user_token:this.user_token,
            user_id:this.user_id,
            target_id:item.id,
            }).then((res)=>{
                if(res.is_success){
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.company_shop_list();
                }
                console.log('company_shop_list',res);

            })
          },
          onCompanyChange(){
              //this.company_staff_list();
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
            if(this.search_text){
              params.search_text=this.search_text
            }
            if(this.datetime_start){
              params.datetime_start=this.datetime_start
            }
            if(this.datetime_end){
              params.datetime_end=this.datetime_end
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
           // this.company_staff_list()
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
