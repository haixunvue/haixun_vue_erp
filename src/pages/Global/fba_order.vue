<template>
<div class="content">
    <h1>FBA订单</h1>
    <div class="line"></div>
  <el-form :inline="true" label-width="80px">
        <el-form-item  v-if="!companyId" label="选择公司">
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
        <el-form-item  v-if="!staffId" label="选择员工">
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
         <el-form-item label="选择店铺">
              <el-select v-model="shop_selected_id" placeholder="选择店铺"  style="margin-bottom:5px" size="mini">
              <el-option
              v-for="(item,index) in shop_list"
              :key="index"
              :label="item.shop_name"
              :value="item.id">
            </el-option>
      </el-select>
             </el-form-item>
        <el-form-item v-if="false" label="选择国家">
         <el-select v-model="country_selected_id" placeholder="选择国家" size="mini">
              <el-option
                v-for="item in country_list"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="status_order_selected_id" placeholder="订单状态" size="mini">
             <el-option
                v-for="item in status_order_list"
                :key="item.value"
                :label="item.name"
                :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="datetime_start"
            size="mini"
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
            size="mini"
            @change=""
            type="datetime"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="选择结束日期时间"
            align="right"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="search_text" style="margin-right:0;width: 320px" placeholder="订单ID、订单号、产品SKU、国内运单、国际运单、国际追踪号" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left:5px" size="mini" class="search-btn" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left:5px" size="mini" class="search-btn" @click="clearSearch">重置</el-button>
        </el-form-item>
  </el-form>
    <div class="line" style="margin-bottom:5px"></div>
    <div class="search-result oh" style="margin-bottom:5px;margin-top:5px">
        <p class="search-result-text">符合条件的订单共有<span>{{totalCount}}</span>个</p>
        <el-button type="primary" size="mini" class="search-btn right">同步订单</el-button>
    </div>
    <div class="table">
        <el-table
            :data="order_list"
            border
            style="width: 100%;margin-bottom:20px"
            :default-sort = "{prop: 'right', order: 'descending'}"
            size="mini"
            >
            <el-table-column prop="name" label="订单ID/订单号">
                <template slot-scope="scope">
                  <div>
                    订单ID:{{ scope.row.id}}
                  </div>
                  <div>
                    订单号:{{ scope.row.order_num}}
                  </div>
                </template>
            </el-table-column>
            <el-table-column prop="pic" label="产品信息">
                <template slot-scope="scope">
                  <div class="left" style="width:45px;height:45px;background:#ccc;margin-right:20px">

                  </div>
                  <div class="left">
                   <div>
                    EUR 236.33
                   </div>
                   <div>
                     SKU: JIANGU001923beige
                   </div>
                  </div>
                </template>
            </el-table-column>
            <el-table-column prop="password" label="时间">
            </el-table-column>
            <el-table-column prop="tel" label="买家信息">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" @click="user_edit" size="mini"></el-button>
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
            :total="totalCount"
             style="clear:both;text-align:center">
        </el-pagination>
    </div>

    <!--弹窗区域-->
    <el-dialog title="订单详情" :visible.sync="dialogTableVisible">
        <div class="address-title">买家 > 收货地址</div>
        <div class="address-box clear">
            <div class="address-box-title clear">
                <el-button type="text" class="left">复制地址信息</el-button>
                <el-button type="text" class="right" v-if="isEdit" @click="isEdit=false">取消</el-button>
                <el-button type="text" class="right" v-if="isEdit">保存</el-button>
                <el-button type="text" class="right" v-else @click="isEdit=true">编辑</el-button>

            </div>
            <el-row :gutter="20" style="margin-bottom:10px">
                <el-col :span="8">
                    <div class="address-box-top">
                        国家:
                    </div>
                    <div class="address-box-bottom" v-if="isEdit">
                        <el-select v-model="countryValue" placeholder="请选择">
                            <el-option v-for="item in countryOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                          </el-select>
                    </div>
                    <div class="address-box-bottom" v-else>&nbsp;&nbsp;&nbsp;&nbsp;意大利</div>
                </el-col>
                <el-col :span="8">
                    <div class="address-box-top">
                        州/省:
                    </div>
                    <div class="address-box-bottom" v-if="isEdit">
                        <el-input v-model="provinceInput" placeholder="请输入内容"></el-input>
                    </div>
                    <div class="address-box-bottom" v-else>&nbsp;&nbsp;&nbsp;&nbsp;Frosinone</div>
                </el-col>
                <el-col :span="8">
                    <div class="address-box-top">
                        城市:
                    </div>
                    <div class="address-box-bottom" v-if="isEdit">
                        <el-input v-model="cityInput" placeholder="请输入内容"></el-input>
                    </div>
                    <div class="address-box-bottom" v-else>&nbsp;&nbsp;&nbsp;&nbsp;Frosinone</div>
                </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-bottom:10px">
                <el-col :span="8">
                    <div class="address-box-top">
                        地址1:
                    </div>
                    <div class="address-box-bottom" v-if="isEdit">
                        <el-input v-model="addressOneInput" placeholder="请输入内容"></el-input>
                    </div>
                    <div class="address-box-bottom" v-else>&nbsp;&nbsp;&nbsp;&nbsp;Via Cesare Battisti,19</div>
                </el-col>
                <el-col :span="8">
                    <div class="address-box-top">
                        地址2:
                    </div>
                    <div class="address-box-bottom" v-if="isEdit">
                        <el-input v-model="addressTwoInput" placeholder="请输入内容"></el-input>
                    </div>
                    <div class="address-box-bottom" v-else>&nbsp;&nbsp;&nbsp;&nbsp;Via Cesare Battisti,19</div>
                </el-col>
                <el-col :span="8">
                    <div class="address-box-top">
                        邮编:
                    </div>
                    <div class="address-box-bottom" v-if="isEdit">
                        <el-input v-model="zipInput" placeholder="请输入内容"></el-input>
                    </div>
                    <div class="address-box-bottom" v-else>&nbsp;&nbsp;&nbsp;&nbsp;03100</div>
                </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-bottom:10px">
                <el-col :span="8">
                    <div class="address-box-top">
                        收件人:
                    </div>
                    <div class="address-box-bottom" v-if="isEdit">
                        <el-input v-model="collectionInput" placeholder="请输入内容"></el-input>
                    </div>
                    <div class="address-box-bottom" v-else>&nbsp;&nbsp;&nbsp;&nbsp;Xin Guo</div>
                </el-col>
                <el-col :span="8">
                    <div class="address-box-top">
                        手机:
                    </div>
                    <div class="address-box-bottom" v-if="isEdit">
                        <el-input v-model="phoneInput" placeholder="请输入内容"></el-input>
                    </div>
                    <div class="address-box-bottom" v-else>&nbsp;&nbsp;&nbsp;&nbsp;18335298523</div>
                </el-col>
                <el-col :span="8">
                    <div class="address-box-top">
                        电话:
                    </div>
                    <div class="address-box-bottom" v-if="isEdit">
                        <el-input v-model="telInput" placeholder="请输入内容"></el-input>
                    </div>
                    <div class="address-box-bottom" v-else>&nbsp;&nbsp;&nbsp;&nbsp;400-810-8848</div>
                </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-bottom:10px">
                <el-col :span="8">
                    <div class="address-box-top">
                        邮箱:
                    </div>
                    <div class="address-box-bottom" v-if="isEdit">
                        <el-input v-model="emailInput" placeholder="请输入内容"></el-input>
                    </div>
                    <div class="address-box-bottom" v-else>&nbsp;&nbsp;&nbsp;&nbsp;gengxiao@qq.com</div>
                </el-col>
            </el-row>
        </div>
        <div class="address-title">买家 > 买家信息</div>
        <div class="address-box clear">
            <p>买家ID：123</p>
            <p>买家国家：中国</p>
            <p>买家名称：GG</p>
            <p>买家邮箱：249463571@qq.com</p>
        </div>
    </el-dialog>
</div>
</template>

<script>
    import router from "../../router";
     import site from '@/json/site';
    import ElRow from "element-ui/packages/row/src/row";
    const status_order_list = [{name:'全部',value:'all'},{name:'创建',value:'new'}, {name:'未确认',value:'pending'}, {name:'未发货',value:'unshipped'}, {name:'已发货',value:'shipped'}];






    export default {
      components: {ElRow},
      data() {
            return {
            company_list:[],
            company_selected_id:'',
            staff_list:[],
            staff_selected_id:'',
            shop_list:[],
            shop_selected_id:'',
            datetime_start:'',
            datetime_end:'',
            pagesize:5,//每页的数据条数
            currentPage:1,//默认开始页面
            totalCount:0,
            search_text:'',
            country_list:site,
            country_selected_id:'',
            status_order_list:status_order_list,
            status_order_selected_id:'',
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
        form:{
                  company: [],
                  infor1:'',
                  select1:'1',
                  infor2:'',
                  options: [{
                    value: '1',
                    label: '鞋子'
                  }, {
                    value: '2',
                    label: '帽子'
                  }, {
                    value: '3',
                    label: '衣服'
                  }, {
                    value: '4',
                    label: '裤子'
                  }],

                },
                input:'',
                employeesValue:'',
                employeesOptions:[
                    {
                      value: '员工一',
                      label: '员工一'
                    },{
                      value: '员工二',
                      label: '员工二'
                    },
                ],
                orderValue:'',
                orderOptions:[
                    {
                      value: '已取消',
                      label: '已取消'
                    },{
                      value: '所有订单',
                      label: '所有订单'
                    },{
                      value: '未发货',
                      label: '未发货'
                    },{
                      value: '等待中',
                      label: '等待中'
                    },{
                      value: '已发货',
                      label: '已发货'
                    },
                ],
                radio:3,
                timeValue:'',
                data: [
                    {
                        id: '0000000001',
                        order_num:'000-0000000-0000001',
                        name:'订单ID:1231423134订单号:4441-23891-32378',
                        username:'当地货币符号 价格(eg:EUR 236.3)sku:JIANGU001923beige',
                        password:'下单:2018-05-08 22:01:53',
                        tel:'Amazon>Italy>Jiangu>意大利>Xin Guo'
                    }
                ],
                currentPage:1,
                pagesize:5,
                totalItems:0,
                dialogTableVisible:false,
                countryValue:'',
                countryOptions:[
                    {
                      value: '意大利',
                      label: '意大利'
                    },{
                      value: '德国',
                      label: '德国'
                    },
                ],
                provinceInput:'',
                cityInput:'',
                addressOneInput:'',
                addressTwoInput:'',
                zipInput:'',
                collectionInput:'',
                phoneInput:'',
                telInput:'',
                emailInput:'',
                isEdit:false,

            }
        },
        methods: {
        search: function(){
          this.currentPage = 1;
           this.order_listall_paging();
          },
          clearSearch: function(){
                this.company_selected_id=''
                this.staff_selected_id=''
                this.datetime_start=''
                this.datetime_end=''
                this.search_text=''
                this.country_selected_id=''
                this.status_amazion_selected_id='';
                this.status_payment_selected_id='';
         },
      handleSizeChange:function(size) {
         this.currentPage = 1;
        this.pagesize = size;
         this.order_listall_paging();
      },
      handleCurrentChange:function(currentPage) {
        this.currentPage = currentPage;
         this.order_listall_paging();
      },
            user_edit:function(){
                this.dialogTableVisible = true;
            },
             onCompanyChange(){
              this.company_staff_list();
              this.order_listall_paging();
          },
           onStaffChange(){
                this.company_shop_list()
               this.order_listall_paging();
           },
            company_shop_list(){

            let params = {
              user_token:this.user_token,
              user_id:this.user_id,
              user_id:this.user_id,
              target_company_id:this.company_selected_id,
              page:0,  //页码
              pageSize:1000,
            }

             if(this.staff_selected_id){
                params.target_staff_id=this.staff_selected_id;
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
          order_listall_paging(){
            let params = {
              user_token:this.user_token,
              user_id:this.user_id,
              page:this.currentPage-1,  //页码
              pageSize:this.pagesize,
              order_amazion_type:'fba',
            }
            if(this.company_selected_id){
              params.target_company_id = this.company_selected_id
            }

            if(this.staff_selected_id){
              params.target_staff_id = this.staff_selected_id
            }
            if(this.shop_selected_id){
              params.order_shop_id = this.shop_selected_id
            }

            if(this.datetime_start){
                 params.order_create_datetime_start=this.datetime_start;
            }
            if(this.datetime_end){
                params.order_create__datetime_end=this.datetime_end;
            }
            if(this.search_text){
                params.search_text=this.search_text;
            }
            if(this.status_order_selected_id){
                params.status=this.status_order_selected_id;
            }
            if(this.country_selected_id){
                params.country=this.country_selected_id;
            }

            this.$http.post(this.api.order_listall_paging,params).then((res)=>{
              //console.log(res);
              if(res.is_success){
                    this.order_list = res.value.list;
                  this.totalCount = res.value.totalCount;
                }else{
                     this.order_list=[];
                }
            })
          },

        },
        created(){
            this.user_token = localStorage.getItem("user_token");
            this.user_id = localStorage.getItem("user_id");
            if(this.companyId){
              this.company_selected_id =this.companyId
            }else{
                this.get_company_list()
            }
            if(this.staffId){
              this.staff_selected_id =this.staffId

            }else{
              this.company_staff_list()
            }
             this.order_listall_paging();
        },
        props:{
         title:{
          default:'',
          type:String,
         },
         companyId:{
           default:'',
          type:String,
         },
         staffId:{
           default:'',
          type:String,
         },
      }
    }
</script>
<style scoped>
  .el-form-item{
    margin-bottom: 0;
  }
    .el-input{
        width:200px;
    }
    .clear:after {
        content: "";
        display: block;
        clear: both;
        vertical-align: hidden;
    }
    .select-employees{
        /*border-bottom: 2px solid #60aef8;
        padding-bottom: 15px;*/
    }

    .search{
        margin-top: 13px;
    }

    .search-radio{
        /*height:30px;
        width: 500px;
        line-height: 30px;
        padding-left: 15px;
        border:1px solid #969696;
        border-radius: 5px 0 0 5px;
        float: left;*/
    }

    .search-input{
        /*width:200px;
        height:30px;
        float:left;
        border:1px solid #969696;
        margin-left: -1px;
        border-radius: 0 5px 5px 0;
        padding:0 10px;
        text-align: center;*/
    }

    .search-btn{
        margin-left: 20px;
    }

    .screening{
        margin-top: 20px;
    }

    .select-screening{
        float:left;
    }

    .screening-block{
        float:left;
        margin-left: 20px;
    }

    .search-result{
        margin-top: 20px;
    }

    .search-result-text{
      font-size: 14px;
      color: #606266;
        width:230px;
        padding:5px 0px;
        /*border:1px solid #4a9deb;*/
        /*border-radius: 5px;*/
        float:left;
    }

    .search-result-text span{
        color:#F56C6C;
    }

    .table{
        /*margin-top:10px;*/
    }

    .address-title{
        height:40px;
        line-height: 40px;
        background-color: #61adf8;
        color:#fff;
        border-radius: 5px 5px 0 0;
        padding-left: 10px;
    }

    .address-box{
        width:93.9%;
        border:2px solid #61adf8;
        padding:0 20px;
        margin-bottom: 20px;
    }

    .address-box-bottom{
        margin-top: 10px;
    }

    .address-box p{
        height:50px;
        line-height: 50px;
    }
</style>
