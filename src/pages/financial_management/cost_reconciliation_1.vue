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
                 <el-button type="primary" size="mini" v-on:click="search" >查询</el-button>
                <el-button type="primary" size="mini" v-on:click="clearSearch">重置</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <div class="table-table">
            <el-table
              :data="list_data"
              border
              style="width: 100%;margin-bottom:20px"
              :default-sort = "{prop: 'right', order: 'descending'}"
              fit
            >
              <el-table-column
                prop="id"
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
                prop="money_number"
                label="收款金额/¥"
                sortable

              >
              </el-table-column>
              <el-table-column
                prop="money_type"
                label="收款币别"
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
          </div>
        </div>

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
        totalCount:0,
        currentPage:1,
        pagesize:5,
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

      search: function(){
          this.currentPage = 1;
          this.company_money_recharge_list()
      },
      clearSearch: function(){
            this.datetime_start=''
        this.datetime_end=''
      },
      openWeb: function(){

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

      company_money_recharge_list(){
        let params = {
            user_token:this.user_token,
            user_id:this.user_id,
            target_company_id: this.owner_company_id,   		//目标公司
            page:this.currentPage-1,  //页码
            pageSize:this.pagesize,
            process_status:'down_pass'
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
                    this.list_data = res.value.list;
                    this.totalCount = res.value.totalCount;
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
    border-bottom: 1px solid #b8d0d6;
  }

  .header-top{
    margin-bottom: 20px;
  }

  .table{
    margin-top: 10px;
  }
  .table-table{
    margin-top: 20px;
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
  .el-button{
    margin-left: 10px;
  }
</style>
