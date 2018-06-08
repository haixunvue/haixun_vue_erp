<template>
  <div>
        <div class="header">
          <el-row>
            <el-col :span="20">
              <div class="header-top">
                <el-date-picker v-model="value" type="datetimerange" range-separator="至" start-placeholder="制单开始日期" end-placeholder="制单结束日期" size="mini"></el-date-picker>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <div class="table-table">
            <el-table
              :data="data.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              border
              style="width: 100%;margin-bottom:20px"
              :default-sort = "{prop: 'right', order: 'descending'}"
              fit
            >
              <el-table-column
                prop="name"
                label="单据编号"
                sortable

              >
              </el-table-column>
              <el-table-column
                prop="username"
                label="会计期间"
                sortable

              >
              </el-table-column>
              <el-table-column
                prop="amountCollected"
                label="收款金额/¥"
                sortable

              >
              </el-table-column>
              <el-table-column
                prop="receivables"
                label="收款币别"
                sortable

              >
              </el-table-column>
              <el-table-column
                prop="account"
                label="收款帐户"
                sortable

              >
              </el-table-column>
              <el-table-column
                prop="amountCancellation"
                label="核销金额/¥"
                sortable

              >
              </el-table-column>
              <el-table-column
                prop="verificationCurrency"
                label="核销币别"
                sortable

              >
              </el-table-column>
              <el-table-column
                prop="balance"
                label="核销差额"
                sortable

              >
              </el-table-column>
              <el-table-column
                prop="data"
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
              :total="totalItems"
              style="clear:both;text-align:center">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
     
  </div>
</template>

<script>
  import router from "../../router";
  export default {
    data() {
      return {
        datetime_start:'',
        datetime_end:'',
        list_data:[],
        value:'',
        activeName:'first',
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }
        ],
        data: [
          {
            name:'货款',
            username:'通过审核',
            password:'FXE201805120004',
            tel:'交通银行（深圳）',
            idcardnum:'1200.00',
            status:'人民币',
            people:'KH041006',
            data:'2018-05-12 07:21:48',
            remarks:'费用预付'
          },
        ],
        totalItems:0,
        currentPage:1,
        pagesize:5,
        dialogTableVisible:false,
        radio:'1',
        input:'',
        fileList:[],
        dialogTitle:'',
        reimbursementType:''
      }
    },
    methods: {
      
      openWeb: function(){

      },
      handleSizeChange: function (size) {
        this.pagesize = size;
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
      },
      add: function(){
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
            page_count:this.pagesize,
        }
        if(this.datetime_start){
            params.datetime_start=this.datetime_start;
        }
        if(this.datetime_end){
            params.datetime_end=this.datetime_end;
        }
        
        this.$http.post(this.api.company_money_recharge,params).then((res)=>{
                console.log('list_data',res);
                if(res.is_success){
                    this.list_data = res.value;
                }else{
                     this.list_data=[];
                }


            })
      }

    },
     mounted() {
            this.owner_company_id = localStorage.getItem("owner_company_id")
            this.owner_user_id = localStorage.getItem("owner_user_id")
            this.user_token = localStorage.getItem("user_token");
            this.user_id = localStorage.getItem("user_id");
            this.company_money_recharge_list();
           
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

</style>
