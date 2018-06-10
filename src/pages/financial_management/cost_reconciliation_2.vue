<template>
  <div>

        <div class="header">
          <el-row>
            <el-col :span="20">
              <div class="header-top">
                <!--<el-date-picker v-model="value" type="datetimerange" range-separator="至" start-placeholder="制单开始日期" end-placeholder="制单结束日期" size="mini"></el-date-picker>-->
                <div class="start-date-time">
                  <span class="demonstration">开始时间：</span>
                  <el-date-picker
                    v-model="datetime_start"
                    size="mini"
                    @change="(val)=>{this.datetime_start=val}"
                    type="datetime"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    placeholder="选择开始日期时间"
                    align="right"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </div>
                <div class="end-date-time">
                  <span class="demonstration">结束时间：</span>
                  <el-date-picker
                    v-model="datetime_end"
                    size="mini"
                    @change="(val)=>{this.datetime_end=val}"
                    type="datetime"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    placeholder="选择结束日期时间"
                    align="right"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </div>
              </div>
              <div class="header-top">
                <el-select v-model="bank_card_number" placeholder="账户" size="mini" class="header-bottom-select">
                  <el-option v-for="(item,index) in options1" :key="index" :label="item.account_num" :value="item.account_num"></el-option>
                </el-select>
                <el-select v-model="process_status" placeholder="审核标识" size="mini" class="header-bottom-select">
                  <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-button type="primary" size="mini" v-on:click="search">查询</el-button>
                <el-button type="primary" size="mini"  v-on:click="clearSearch">重置</el-button>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="header-right">
                <el-button type="text" size="medium " @click="openWeb"><a href="http://down.takesend.com/track/huikuanzhanghao.php" target="_blank">汇款账号</a></el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <div class="table-header">
            <el-button type="primary" size="mini" @click="add">增加</el-button>
          </div>
          <div class="table-table">
            <el-table
              :data="list_data"
              border
              style="width: 100%;margin-bottom:20px"
              :default-sort = "{prop: 'right', order: 'descending'}"
              fit
            >
              <el-table-column
                prop="name"
                label="报账类型"
                sortable

              >
              </el-table-column>
              <el-table-column
                prop="process_status"
                label="是否审核"
                sortable
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.process_status=='none'">未处理</span>
                  <span v-else-if="scope.row.process_result=='pass'">审核通过</span>
                  <span v-else-if="scope.row.process_result=='nopass'">审核不通过</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="id"
                label="单据编号"
                sortable

              >
              </el-table-column>
              <el-table-column
                prop="bank_card_number_receive"
                label="收款帐户"
                sortable

              >
              </el-table-column>
              <el-table-column
                prop="money_number"
                label="报账金额"
                sortable

              >
              </el-table-column>
              <el-table-column
                prop="money_type"
                label="报账币别"
                sortable

              >
              </el-table-column>
              <el-table-column
                prop="people"
                label="制单人"
                sortable

              >
              </el-table-column>
              <el-table-column
                prop="_createTime"
                label="制单日期"
                sortable

              >
              </el-table-column>
              <el-table-column
                prop="notes"
                label="备注"
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
          </div>
        </div>

    <!--弹窗-->
    <el-dialog :title=dialogTitle :visible.sync="dialogTableVisible">
      <el-row class="dialog-item">
        <el-col :span="24">
          <span class="dialog-left">单据编号</span>
            {{addForm.recharge_num}}
        </el-col>
      </el-row>
      <el-row class="dialog-item">
        <el-col :span="12">
          <span class="dialog-left">收款帐户</span>
          <el-select v-model="addForm.bank_card_number_receive" placeholder="请选择" size="mini">
            <el-option v-for="(item,index) in options1" :key="index" :label="item.account_num" :value="item.account_num+','+item.title"></el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
            <span class="dialog-left">报账类型</span>
            <el-radio-group v-model="addForm.reimbursement_type">
            <el-radio  label="1">贷款</el-radio>
            <!--<el-radio v-model="radio" label="2">押金</el-radio>-->
            </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="dialog-item">
        <el-col :span="12">
          <span class="dialog-left">报账金额</span>
          <el-input v-model="addForm.money_number" placeholder="请输入内容" class="dialog-input" size="mini"></el-input>
        </el-col>
        <el-col :span="12">
          <span class="dialog-left">报账币别</span>
          <el-select v-model="addForm.money_type" placeholder="请选择" size="mini">
            <el-option  key="RMB" label="人民币" value="RMB"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="dialog-item">
        <el-col :span="12">
          <span class="dialog-left">报账银行</span>
          <el-input v-model="addForm.bank_name_payment" placeholder="请输入内容" class="dialog-input" size="mini"></el-input>
        </el-col>
        <el-col :span="12">
          <span class="dialog-left">银行账号</span>
          <el-input v-model="addForm.bank_card_number_payment" placeholder="请输入内容" class="dialog-input" size="mini"></el-input>
        </el-col>
      </el-row>
      <el-row class="dialog-item">
        <el-col :span="12">
          <span class="dialog-left">银行户名</span>
          <el-input v-model="addForm.bank_card_name_payment" placeholder="请输入内容" class="dialog-input" size="mini"></el-input>
        </el-col>
        <el-col :span="12">
          <span style="margin-right:25px">是否备注姓名</span>
          <el-radio-group v-model="addForm.is_notes_name">
          <el-radio  label="true">是</el-radio>
          <el-radio  label="false">否</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="dialog-item">
        <el-col :span="18">
          <span class="left" style="margin-right:55px">上传凭证</span>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="mini" type="primary" >点击上传</el-button>
            <div slot="tip" class="el-upload__tip">温馨提示:除工行，交行必须上传凭证以外，其他银行打款时必须备注客户名</div>
          </el-upload>

        </el-col>
      </el-row>
      <el-row class="dialog-item">
        <el-col :span="24">
          <span class="dialog-left left" style="margin-right:55px">备注</span>
          <el-input v-model="addForm.notes" type="textarea" :rows="4" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-button type="primary" @click="company_money_recharge_add">保 存</el-button>
        <el-button @click="dialogTableVisible = false">取 消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import router from "../../router";

  const  options2=[ {value:'none', label:'未审核'},
  {value:'down_pass', label:'审核通过'},
  {value:'down_nopass', label:'审核未通过'},]

  export default {
    data() {
      return {
        datetime_start:'',
        datetime_end:'',
        process_status:'',
        bank_card_number:'',
        list_data:[],
        options2:options2,
        options1: [],
        totalCount:0,
        currentPage:1,
        pagesize:5,
        addForm:{
              recharge_num:'',
              money_number:'',//				金钱
              notes:'',//						备注
              proof_document:'',//			证明文件
              bank_name_receive:'',//收款银行名称
              bank_card_number_receive:'',//  收款银行卡号
              bank_name_payment:'',//支付银行名称
              bank_card_number_payment:'',//支付银行卡号
              bank_card_name_payment:'',//支付银行卡户名
              reimbursement_type:'',//报账 类型
              money_type:'RMB',//				类型
              is_notes_name:'',//						备注姓名
        },

        companyInfo:null,

        dialogTableVisible:false,
        radio:'1',
        input:'',
        fileList:[],
        dialogTitle:'',
        pickerOptions1: {
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
      openWeb: function(){

      },
      company_money_recharge_channel_list: function(){
            this.$http.post(this.api.company_money_recharge_channel_list_paging,{
            user_token:this.user_token,
            user_id:this.user_id,
            page:0,  //页码
            pageSize:1000,
            }).then((res)=>{
                console.log('company_money_recharge_channel_list_paging',res);
                if(res.is_success){
                    this.options1 = res.value;
                }else{
                     this.options1=[];
                }


            })
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
      add: function(){
        this.addForm={
              recharge_num:moment().format('YYYYMMDDhhmmssSSS')+this.user_id,
              money_number:'',//				金钱
              notes:'',//						备注
              proof_document:'',//			证明文件
              bank_name_receive:'',//收款银行名称
              bank_card_number_receive:'',//  收款银行卡号
              bank_name_payment:'',//支付银行名称
              bank_card_number_payment:'',//支付银行卡号
              bank_card_name_payment:'',//支付银行卡户名
              reimbursement_type:'',//报账 类型
              money_type:'RMB',//				类型
              is_notes_name:'',//						备注姓名
        }


        this.dialogTableVisible = true
        this.dialogTitle="自助报账"
      },
      edit: function(){
        this.dialogTableVisible = true
        this.dialogTitle="修改/查看"
      },
      del: function(){
        this.$confirm('是否删除该条, 是否继续?', '提示', {
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
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      search() {
          this.currentPage = 1;
          this.company_money_recharge_list()
      },
      clearSearch: function(){
        this.datetime_start='';
        this.datetime_end='';
        this.process_status='';
        this.bank_card_number='';
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      company_money_recharge_list(){
      let params = {
            user_token:this.user_token,
            user_id:this.user_id,
            target_company_id: this.owner_company_id,   		//目标公司
            page:this.currentPage-1,  //页码
            pageSize:this.pagesize,
        }
        if(this.datetime_start){
            params.datetime_start=this.datetime_start;
        }
        if(this.datetime_end){
            params.datetime_end=this.datetime_end;
        }
        if(this.bank_card_number){
            params.bank_card_number=this.bank_card_number;
        }
        if(this.process_status){
            params.process_status=this.process_status;
        }

        this.$http.post(this.api.company_money_recharge,params).then((res)=>{
                if(res.is_success){
                    this.list_data = res.value.list;
                    this.totalCount = res.value.totalCount;
                }else{
                     this.list_data=[];
                }


            })
      },
      company_money_recharge_add(){
        if(!this.companyInfo){
          this.getCompanyInfo();
          return;
        }
        console.log(this.addForm)
        if(!this.addForm.bank_card_number_receive){
          return;
        }

        let  bank_name_receive_info=this.addForm.bank_card_number_receive.split(',');
        let params= {
              user_token:this.user_token,
              user_id:this.user_id,
              target_company_id: this.owner_company_id,   		//目标公司
              target_company_full_name: this.companyInfo.company_full_name,   		//目标公司
              recharge_num:this.addForm.recharge_num,
              money_number:this.addForm.money_number,//				金钱
              notes:this.addForm.notes,//						备注
              proof_document:this.addForm.proof_document,//			证明文件
              bank_name_receive:bank_name_receive_info[1],//收款银行名称
              bank_card_number_receive:bank_name_receive_info[0],//  收款银行卡号
              bank_name_payment:this.addForm.bank_name_payment,//支付银行名称
              bank_card_number_payment:this.addForm.bank_card_number_payment,//支付银行卡号
              bank_card_name_payment:this.addForm.bank_card_name_payment,//支付银行卡户名
              reimbursement_type:this.addForm.reimbursement_type,//报账 类型
              money_type:this.addForm.money_type,//				类型
              is_notes_name:this.addForm.is_notes_name,//						备注姓名
        }

          console.log(params)
          this.$http.post(this.api.company_money_recharge_add,params).then((res)=>{
                console.log('list_data',res);
                if(res.is_success){
                    this.company_money_recharge_list();
                    this.dialogTableVisible = false;
                }else{
                     this.list_data=[];
                }
            })
      },
      getCompanyInfo(){
          this.$http.post(this.api.get_company_info,{
            user_token:localStorage.getItem('user_token'),
            user_id:localStorage.getItem('user_id'),
            target_company_id:localStorage.getItem('owner_company_id')
          }).then((res)=>{
            //console.log(res);
            if(res.is_success){
              this.companyInfo = res.value;
              console.log(this.companyInfo);
            }
          })
        },

    },
     mounted() {
            this.owner_company_id = localStorage.getItem("owner_company_id")
            this.owner_user_id = localStorage.getItem("owner_user_id")
            this.user_token = localStorage.getItem("user_token");
            this.user_id = localStorage.getItem("user_id");
            this.company_money_recharge_list();
            this.company_money_recharge_channel_list();
            this.getCompanyInfo();
     },
  }
</script>
<style scoped>
  a{
    text-decoration: none;
  }

  .header{
    /*height:90px;*/
    border-bottom: 1px solid #b8d0d6;
  }

  .header-top{
    margin-bottom: 20px;
  }

  .header-bottom-select{
    margin-right: 2%;
  }

  .header-right{
    width: 100%;
    height:80px;
    border-left: 1px solid #b8d0d6;
    text-align: center;
    line-height: 80px;
  }

  .table{
    margin-top: 10px;
  }

  .table-header{
    height:20px;
  }

  .table-table{
    margin-top: 20px;
  }

  .dialog-item{
    margin-bottom: 20px;
  }

  .dialog-left{
    margin-right: 50px;
  }

  .dialog-input{
    width:185px;
  }

  .el-upload__tip{
    color:red;
  }
  .start-date-time{
    display: inline-block;
    font-size: 14px;
  }
  .end-date-time{
    display: inline-block;
    margin-left: 20px;
    font-size: 14px;
  }

</style>
