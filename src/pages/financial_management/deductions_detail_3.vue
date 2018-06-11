<template>
  <div >

        <div style="margin-bottom:5px">
          <el-select v-model="target_staff_id" placeholder="选择员工" size="mini" @change="target_staff_Change">
            <el-option
              v-for="(item,index) in staff_list"
              :key="index"
              :label="item.staff_name"
              :value="item.id">
            </el-option>
          </el-select>
            <el-select v-model="target_shop_id" placeholder="选择店铺" size="mini">
            <el-option
              v-for="(item,index) in shop_list"
              :key="index"
              :label="item.shop_name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-date-picker
                    v-model="datetime_start"
                    @change="(val)=>{this.datetime_start=val}"
                    type="datetime"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    placeholder="选择开始日期时间"
                    align="right"
                    size="mini"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                  <el-date-picker
                    v-model="datetime_end"
                     @change="(val)=>{this.datetime_end=val}"
                    type="datetime"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    placeholder="选择结束日期时间"
                    align="right"
                    size="mini"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
       </div>

        <div class="middle">
          <div class="middle-top">
            <span class="left search-result-text">仓库位置：</span>
            <el-checkbox :indeterminate="all_warehouse_location_isIndeterminate" v-model="all_warehouse_location" @change="all_warehouse_location_Change" class="left" style="margin-right:30px">全选</el-checkbox>
            <el-checkbox-group v-model="target_warehouse_location" @change="warehouse_location_Change" class="left">
              <el-checkbox v-for="(item,index) in Option2" :label="item.value" :key="index">{{item.name}}</el-checkbox>
            </el-checkbox-group>
                <el-button type="primary" size="mini" style="margin-left:20px" v-on:click="search">查询</el-button>
          <el-button type="primary" size="mini" style="margin-left:5px" v-on:click="clearSearch">重置</el-button>
          </div>

        </div>
        <div class="line"></div>
        <div class="bottom">
         <el-table
            :data="list_data"
            border
            style="width: 100%;margin-bottom:20px"
            :default-sort = "{prop: 'right', order: 'descending'}"
            fit
          >
            <el-table-column
              prop="_createTime"
              label="日期"
            >
            </el-table-column>
            <el-table-column
              prop="order_id"
              label="订单ID"
            >
            </el-table-column>
            <el-table-column
              prop="order_amount"
              label="订单金额"
            >
            </el-table-column>
            <el-table-column
              prop="refund_fee"
              label="退款费用"
            >
            </el-table-column>
            <el-table-column
              prop="platform_fees"
              label="平台费用"
            >
            </el-table-column>
            <!-- <el-table-column
              prop="status"
              label="物流总费用"
              >
            </el-table-column>
            <el-table-column
              prop="people"
              label="总计"
              >
            </el-table-column> -->
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
</template>

<script>
  import router from "../../router";

  const Option2 = [{name:'默认仓库',value:'none'}, {name:'FBA',value:'fba'}];

 export default {
    data() {
      return {
        datetime_start:'',
        datetime_end:'',
        target_warehouse_location:['none','fba'],
        all_warehouse_location:true,
        all_warehouse_location_isIndeterminate:false,
        list_data:[],
        totalCount:0,
        currentPage:1,
        pagesize:5,
        staff_list:[],
        target_staff_id:'',
        shop_list:[],
        target_shop_id:'',
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
        Optioned2: [],
        Option2: Option2,
        data_list:[],

      }
    },
    methods: {
      search: function(){
          this.currentPage = 1;
          this.cost_statistics_platform_paging()
      },
      clearSearch: function(){
       this.datetime_start=''
        this.datetime_end=''
        this.target_staff_id=''
        this.target_shop_id=''
        this.all_warehouse_location=false
        this.all_warehouse_location_Change(false)
      },
      target_staff_Change(value){
          console.log(value)
          this.company_shop_list()
      },
      all_warehouse_location_Change(value) {
        this.target_warehouse_location = value==true?['none','fba']:[];
        this.all_warehouse_location_isIndeterminate = false;
      },
      warehouse_location_Change(value){
        let checkedCount = value.length;
        this.all_warehouse_location = checkedCount == Option2.length;
        this.all_warehouse_location_isIndeterminate = checkedCount > 0 && checkedCount < Option2.length;

      },
      handleSizeChange: function (size) {
                   this.currentPage = 1;
            this.pagesize = size;
            this.cost_statistics_platform_paging();
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        this.cost_statistics_platform_paging();
      },
       company_staff_list(){
        //员工列表
        this.$http.post(this.api.company_staff_list,{
          user_query: `owner_company_id=='${this.owner_company_id}'`,
          user_token:this.user_token,
          user_id:this.user_id,
        }).then((res)=>{
          console.log('company_staff_list',res);
          if(res.is_success){
            this.staff_list=res.value
          }
        })
       },
       company_shop_list(){

            let params = {
              user_token:this.user_token,
              user_id:this.user_id,
              user_id:this.user_id,
              target_company_id:this.owner_company_id,
              page:0,  //页码
              pageSize:1000,
            }

             if(this.target_staff_id){
                params.target_staff_id=this.target_staff_id;
              }

            this.$http.post(this.api.company_shop_list_paging,params).then((res)=>{
                console.log('company_shop_list',res);
                if(res.is_success){
                    this.shop_list =  res.value.list;
                }else{
                     this.shop_list=[];
                }


            })
          },
       cost_statistics_platform_paging(){

            let params = {
              user_token:this.user_token,
              user_id:this.user_id,
              target_company_id:this.owner_company_id,
              page:this.currentPage-1,  //页码
              pageSize:this.pagesize,
            }
             if(this.datetime_start){
                 params.datetime_start=this.datetime_start;
                   }
            if(this.datetime_end){
                params.datetime_end=this.datetime_end;
            }
            if(this.target_staff_id){
                params.target_staff_id=this.target_staff_id;
            }
            if(this.target_shop_id){
                params.target_shop_id=this.target_shop_id;
            }

            if(this.target_warehouse_location&&this.target_warehouse_location.length>0){
                this.target_warehouse_location.map((item,index)=>{
                  params['warehouse_location_0'+index]=item
                })
            }

            this.$http.post(this.api.cost_statistics_platform_paging,params).then((res)=>{
                console.log('cost_statistics_platform_paging',res);
                 if(res.is_success){
                    this.data_list = res.value.list;
                  this.totalCount = res.value.totalCount;
                }else{
                     this.data_list=[];
                }


            })
          },
    },
    mounted() {
            this.owner_company_id = localStorage.getItem("owner_company_id")
            this.owner_user_id = localStorage.getItem("owner_user_id")
            this.user_token = localStorage.getItem("user_token");
            this.user_id = localStorage.getItem("user_id");
            this.company_staff_list();
            this.company_shop_list();
            this.cost_statistics_platform_paging();
    }
  }
</script>
<style scoped>
  .search-result-text{
    font-size: 14px;
    color: #606266;
    padding: 0;
  }
  .content{
    position: relative;
  }

  .export-btn{
    position:absolute;
    right: 20px;
    top: 0;
  }

  .header{
    /*margin-bottom: 150px;*/
  }

  .middle{
    /*margin-bottom: 50px;*/
  }

  .middle-top{
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
  }
</style>
