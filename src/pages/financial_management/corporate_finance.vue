<template>
<div class="content">
  <h1>财务审批</h1>
  <div class="line"></div>
  <el-form label-width="90px" size="mini">
    <el-col :span="24">
      <el-col :span="5">
        <el-form-item label="状态">
          <el-select v-model="search_form.process_status" placeholder="选择状态">
            <el-option label="已处理" value="down"></el-option>
            <el-option label="未处理" value="none"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="选择公司">
          <el-select v-model="search_form.target_company_id" placeholder="选择公司">
            <el-option v-for="(item,index) in company_list" :key="index" :label="item.company_full_name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="手机或单据" placeholder="选择手机或单据编号">
          <el-input v-model="search_form.search_text"></el-input>
        </el-form-item>
      </el-col>
    </el-col>
    <!--<el-form-item class="inline">-->
      <!--<el-button type="primary" @click="onSubmit">搜索</el-button>-->
    <!--</el-form-item>-->
    <el-col :span="5">
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
    <el-col :span="5">
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
    :data="list_data"
    border
    style="width: 100%"
    :default-sort = "{prop: 'right', order: 'descending'}"
    >
    <el-table-column
      prop="target_company_id"
      label="公司ID"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="recharge_num"
      label="单据编号"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="company_contact_number"
      label="电话"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="money_number"
      label="充值金额"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="rcmoney"
      label="凭证图片"
      sortable
      >
      <template slot-scope="scope">
        <img v-if="scope.row.proof_document" class="image-main" @click="handlePreview(scope.row.proof_document)" :src="scope.row.proof_document"/>
      </template>
    </el-table-column>
    <el-table-column
      prop="notes"
      label="备注"
      sortable
      >
    </el-table-column>
    <el-table-column
      label="状态"
      sortable
      >
        <template slot-scope="scope">
        <span v-if="scope.row.process_status=='down'">已处理</span>
        <span v-else>未处理</span>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="200"
      >
      <template slot-scope="scope">
        <span v-if="scope.row.process_status=='down'">
          <span v-if="scope.row.process_result=='pass'">审核通过</span>
          <span v-else> 不予通过</span>
        </span>
        <span v-else>
        <el-button type="primary" @click="examine_pass_confirm(scope.row.id)"  size="small">审核通过</el-button>
        <el-button type="info" @click="examine_nopass_confirm(scope.row.id)" size="small">不予通过</el-button>
      </span>
      </template>
    </el-table-column>
    <el-table-column
      prop="rcmoney"
      label="操作员"
      sortable
    >
    </el-table-column>
    <el-table-column
      prop="_createTime"
      label="日期"
      sortable
    >
    </el-table-column>
  </el-table>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[5, 20, 50, 100]"
    :page-size="pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalCount"
    style="clear:both;text-align:center">
  </el-pagination>
     <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
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
            dialogImageUrl: '',
            dialogVisible: false,
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
                    handlePreview(url) {
            this.dialogImageUrl = url;
            this.dialogVisible = true;
          },
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
      do_examine_pass(id){
           this.$http.post(this.api.examine_pass,{
            user_token:this.user_token,
            user_id:this.user_id,
            target_company_money_recharge_id:id,
           }).then((res)=>{
                console.log('list_data',res);
                if(res.is_success){
                    this.company_money_recharge_list();
                }


            })
     },
      examine_pass_confirm(id){
        this.$confirm('确定审核通过该记录吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
               this.do_examine_pass(id);
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });
            });
          },
          do_examine_nopass(id){
            this.$http.post(this.api.examine_nopass,{
            user_token:this.user_token,
            user_id:this.user_id,
            target_company_money_recharge_id:id,
           }).then((res)=>{
                console.log('list_data',res);
                if(res.is_success){
                    this.company_money_recharge_list();
                }
            })
          },
        examine_nopass_confirm(id){
        this.$confirm('确定审核不通过该记录吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.do_examine_nopass(id);
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }
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
   .image-main{
     width: 80px;
     height: 80px;
     display: block;
     margin: 0 auto;
     border: 1px solid #eee;
     border-radius: 2px;
   }
</style>
