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
            <span class="left search-result-text">店铺账号：</span>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="left" style="margin-right:30px">全选</el-checkbox>
            <el-checkbox-group v-model="Optioned1" @change="handleCheckedCitiesChange" class="left">
              <el-checkbox v-for="city in Option1" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="middle-top">
            <span class="left search-result-text">仓库位置：</span>
            <el-checkbox :indeterminate="all_warehouse_location_isIndeterminate" v-model="all_warehouse_location" @change="all_warehouse_location_Change" class="left" style="margin-right:30px">全选</el-checkbox>
            <el-checkbox-group v-model="target_warehouse_location" @change="warehouse_location_Change" class="left">
              <el-checkbox v-for="(item,index) in Option2" :label="item.value" :key="index">{{item.name}}</el-checkbox>
            </el-checkbox-group>
                <el-button type="primary" size="mini" style="margin-left:20px">查询</el-button>
          <el-button type="primary" size="mini" style="margin-left:5px">重置</el-button>
          </div>
          
        </div>
        <div class="line"></div>
        <div class="bottom">
          <el-table
            :data="data.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            border
            style="width: 100%;margin-bottom:20px"
            :default-sort = "{prop: 'right', order: 'descending'}"
            fit
          >
            <el-table-column
              prop="name"
              label="订单ID"
            >
            </el-table-column>
            <el-table-column
              prop="username"
              label="物流方式"
            >
            </el-table-column>
            <el-table-column
              prop="password"
              label="发货数量"
            >
            </el-table-column>
            <el-table-column
              prop="tel"
              label="称重重量"
            >
            </el-table-column>
            <el-table-column
              prop="idcardnum"
              label="材积"
            >
            </el-table-column>
            <el-table-column
              prop="status"
              label="结算重"
            >
            </el-table-column>
            <el-table-column
              prop="people"
              label="物流费用"
            >
            </el-table-column>
            <el-table-column
              prop="people"
              label="日期"
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
</template>

<script>
  import router from "../../router";

  const Option1 = ['全部', '店铺1', '店铺2', '店铺3'];
  const Option2 = [{name:'默认仓库',value:'none'}, {name:'FBA',value:'fba'}];
 
 export default {
    data() {
      return {
        datetime_start:'',
        datetime_end:'',
        target_warehouse_location:[],
        all_warehouse_location:false,
        all_warehouse_location_isIndeterminate:false,
        list_data:[],
        totalCount:0,
        currentPage:1,
        pagesize:5,
        staff_list:[],
        target_staff_id:'',
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

        activeName:'first',
        value:'',
        checkAll: false,
        Optioned1: ['全部'],
        Optioned2: [],
        Option1: Option1,
        Option2: Option2,
        isIndeterminate: true,
        data: [
          {
            name:'货款',
            username:'通过审核',
            password:'FXE201805120004',
            tel:'交通银行（深圳）',
            idcardnum:'1200.00',
            status:'人民币',
            people:'KH041006'
          },
        ],
      }
    },
    methods: {
      target_staff_Change(value){
          console.log(value)
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
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      handleSizeChange: function (size) {
        this.pagesize = size;
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
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
       }
    },
    mounted() {
            this.owner_company_id = localStorage.getItem("owner_company_id")
            this.target_company_full_name = localStorage.getItem("target_company_full_name")
            this.owner_user_id = localStorage.getItem("owner_user_id")
            this.user_token = localStorage.getItem("user_token");
            this.user_id = localStorage.getItem("user_id");
            this.company_staff_list();
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
