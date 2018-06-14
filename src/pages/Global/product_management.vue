<template>
<div class="content">
  <h1>{{title}}</h1>
  <div class="line" ></div>
  <el-form :inline="true" ref="form" :model="form" label-width="80px" size="mini">
     <el-form-item v-if="!companyId" label="公司" >
      <el-select
        v-model="company_selected_id"
        placeholder="请选择公司"
        v-on:change="onCompanyChange()">
        <el-option
            v-for ="item in company_list"
            :key="item.id"
            :label="item.company_full_name"
            :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="!staffId" label="选择员工" >
      <el-select
        v-model="staff_selected_id"
        placeholder="请选择公司员工"
        v-on:change="onStaffChange()">
        <el-option
            v-for ="item in staff_list"
            :key="item.id"
            :label="item.staff_name"
            :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="分类" style="margin-bottom:5px">
      <el-select v-model="product_classify_selected" placeholder="请选择">
        <el-option
          v-for="(item,index) in product_classify"
          :key="index"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="店铺" style="margin-bottom:5px">
      <el-select
        v-model="value"
        placeholder="选择店铺"
        v-on:change="change(value)">
        <el-option
            v-for ="item in form.company"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item label="开始时间">
      <el-date-picker
        v-model="datetime_start"
        @change="(val)=>{this.datetime_start=val}"
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
        @change="(val)=>{this.datetime_end=val}"
        type="datetime"
        value-format="yyyy-MM-dd hh:mm:ss"
        placeholder="选择结束日期时间"
        align="right"
        :picker-options="pickerOptions">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="" style="margin-left: 80px">
      <el-input placeholder="标题、SKU" style="padding-right: 15px;" v-model="search_text" class="input-with-select"></el-input>
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary" v-on:click="search">搜索</el-button>
       <el-button type="primary" v-on:click="clearSearch">重置</el-button>
    </el-form-item>
    <!--<el-row  >-->
      <!--<el-col :span="9" style="margin-right:10px">-->
        <!--<el-input placeholder="请输入内容" v-model="form.infor1" class="input-with-select" >-->
          <!--<el-select v-model="form.select1" slot="prepend" placeholder="请选择" style="width:120px">-->
            <!--<el-option label="标题" value="1" ></el-option>-->
            <!--<el-option label="SKU" value="2"></el-option>-->
          <!--</el-select>-->
        <!--</el-input>-->
      <!--</el-col>-->
      <!--<el-col :span="2"  >-->
        <!--<el-button type="primary">搜索产品</el-button>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <div class="line"></div>
    <el-row>
      <el-col :span="24">
    <el-form-item label="审核状态" style="margin-bottom:5px">
      <el-radio-group v-model="status_audit_selected" @change="changeRadioValue()" size="mini">
        <el-radio v-for="(item,index) in status_audit_list" :key="index" :label="item.value" border>{{item.name}}</el-radio>
      </el-radio-group>
    </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
    <el-form-item label="上架状态" style="margin-bottom:5px">
      <el-radio-group v-model="status_shelf_selected" @change="changeRadioValue()" size="mini">
        <el-radio v-for="(item,index) in status_shelf_list" :key="index" :label="item.value" border>{{item.name}}</el-radio>
      </el-radio-group>
    </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
    <el-form-item label="产品类型">
      <el-radio-group v-model="product_type_selected" @change="changeRadioValue()" size="mini">
        <el-radio v-for="(item,index) in product_type_list" :key="index" :label="item.value" border>{{item.name}}</el-radio>
      </el-radio-group>
    </el-form-item>
    </el-col>
    </el-row>
  </el-form>

  <div class="line" style="margin-bottom:5px"></div>
  <div class="search-result oh" style="margin-bottom:5px">
      <p class="search-result-text">符合查询条件的产品有<span>{{totalCount}}</span>件</p>
      <div class="left ">
        <el-select v-model="product_status_selected" size="mini" slot="prepend" placeholder="请选择" style="width:120px;" @change="changeRadioValue()">
          <el-option
            v-for ="(item,index) in product_status_list"
            :key="index"
            :label="item.name"
            :value="item.value">
        </el-option>
        </el-select>
      </div>
      <div class="right ">
        <el-button type="text" @click="product_edit" size="mini">批量编辑</el-button>
      </div>
  </div>
  <el-table
      :data="product_list"
      border
      style="width: 100%"
      :default-sort = "{prop: 'order', order: 'descending'}"
      @selection-change="handleSelectionChange"
      size="mini"
      >
      <el-table-column
        fixed
        type="selection"
        width="35">
      </el-table-column>
      <el-table-column
        prop="id"
        label="产品ID"
        sortable
        width="120"
        >
      </el-table-column>
      <el-table-column
        prop="img"
        label="主图"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="标题"
        sortable
        width="120"
        >
      </el-table-column>
      <el-table-column
        prop="SKU"
        label="父SKU"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="SKU"
        label="SKU"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="SKU"
        label="价格(CNY)"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="SKU"
        label="库存"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="SKU"
        label="更新时间"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="SKU"
        label="操作员"
        sortable
        >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="75">
        <template slot-scope="scope">
          <!-- <el-button type="primary" icon="el-icon-edit" @click="product_edit" size="mini"></el-button> -->

          <el-button type="primary" @click="product_edit" size="mini">编辑</el-button>
          <!-- <el-button @click="product_del" type="text" style="color:#F56C6C" size="mini">删除</el-button> -->
        </template>
      </el-table-column>
  </el-table>
  <div class="search-result oh" >
      <p class="search-result-text">已选择<span> 0 </span>件产品</p>
      <div class="right ">
        <el-button type="text" @click="product_edit" size="mini">批量编辑</el-button>
      </div>
  </div>
  <div style="border-bottom:1px solid #ebeef5;clear:both;margin-bottom:20px"></div>
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

  <el-dialog title="批量编辑" :visible.sync="dialogTableVisible" width="60%">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="标题">
        <el-input placeholder="请输入内容" style="margin-bottom:5px">
          <template slot="prepend">开头添加</template>
        </el-input>
        <el-input placeholder="请输入内容" style="margin-bottom:5px">
          <template slot="prepend">结尾添加</template>
        </el-input>
        <el-row  class="mt10">
          <el-col :span="11">
            <el-input placeholder="请输入内容">
              <template slot="prepend">将标题中的</template>
            </el-input>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-input placeholder="请输入内容">
              <template slot="prepend">替换为</template>
            </el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <div class="line"></div>
      <el-form-item label="生成SKU">
        <el-input placeholder="请输入内容" style="margin-bottom:5px">
          <template slot="prepend">前缀</template>
        </el-input>
        <el-input placeholder="请输入内容" style="margin-bottom:5px">
          <template slot="prepend">后缀</template>
        </el-input>
        <div style="margin-bottom:5px">
          中间数字位数
          <el-select v-model="form.select1" placeholder="请选择">
            <el-option label="0" value="1" ></el-option>
            <el-option label="1" value="2"></el-option>

          </el-select>
        </div>
        <el-input placeholder="请输入内容" style="margin-bottom:5px">
          <template slot="prepend">起始数字</template>
        </el-input>
        <el-input placeholder="请输入内容" :disabled="true" style="margin-bottom:5px">
          <template slot="prepend">生成示例</template>
        </el-input>
      </el-form-item>
      <div class="line"></div>
      <el-form-item label="产品价格">
        <el-radio-group
          size="mini"
          v-on:change="change2(radio1)"
          style="margin-bottom:10px">
          <el-radio label="1" border>金额</el-radio>
          <el-radio label="2" border >比例</el-radio>
          <el-radio label="3" border >设置</el-radio>
        </el-radio-group>
        <div class="box1" v-show="box1">
          <!-- 金额: -->
          <el-input placeholder="请输入内容" >
            <template slot="prepend"> + </template>
          </el-input>
          <span style="color:#E6A23C">
            对价格进行加减操作
          </span>
        </div>
        <div class="box2" v-show="box2">
          <!-- 比例: -->
          <el-input placeholder="请输入内容" >
            <template slot="prepend"> x </template>
          </el-input>
          <span style="color:#E6A23C">
            对价格进行乘除操作
          </span>
        </div>
        <div class="box3" v-show="box3">
          <!-- 设置: -->
          <el-input placeholder="请输入内容" >
          </el-input>
          <span style="color:#E6A23C">
            将价格统一设置为一个值
          </span>
        </div>
      </el-form-item>
      <div class="line"></div>
      <el-form-item label="产品数量">
        <el-radio-group
          v-model="radio2"
          size="mini"
          v-on:change="change3(radio2)"
          style="margin-bottom:10px">
          <el-radio label="1" border>数量</el-radio>
          <el-radio label="2" border >设置</el-radio>
        </el-radio-group>
        <div class="box1" v-show="box2_1">
          <!-- 金额: -->
          <el-input placeholder="请输入内容" >
            <template slot="prepend"> + </template>
          </el-input>
          <span style="color:#E6A23C">
            对价格进行加减操作
          </span>
        </div>
        <div class="box2" v-show="box2_2">
          <!-- 比例: -->
          <el-input placeholder="请输入内容" >
          </el-input>
          <span style="color:#E6A23C">
            将库存统一设置为一个值
          </span>
        </div>
      </el-form-item>
      <div class="line"></div>
      <el-form-item label="品牌名称">
        <el-input placeholder="品牌名称" style="margin-bottom:5px">
        </el-input>
      </el-form-item>
      <el-form-item label="厂商名称">
        <el-input placeholder="厂商名称" style="margin-bottom:5px">
        </el-input>
      </el-form-item>
      <el-form-item label="产品关键词">
        <el-input placeholder="关键词" style="margin-bottom:5px">
        </el-input>
        <el-input placeholder="关键词" style="margin-bottom:5px">
        </el-input>
        <el-input placeholder="关键词" style="margin-bottom:5px">
        </el-input>
        <el-input placeholder="关键词" style="margin-bottom:5px">
        </el-input>
        <el-input placeholder="关键词">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogTableVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
    import router from "../../router";
    import product_status_list from '../../json/product_status';
    import status_audit_list from '../../json/product_status_audit';
    import status_shelf_list from '../../json/product_status_shelf';
    import product_type_list from '../../json/product_type';

    export default {
        data() {
          return {
            dialogTableVisible:false,
            company_list:[],
            company_selected_id:'',
            staff_list:[],
            staff_selected_id:'',
            product_classify:[],
            product_classify_selected:'',
            datetime_start:'',
            datetime_end:'',
            search_text:'',
            status_audit_list:status_audit_list,
            status_shelf_list:status_shelf_list,
            product_type_list:product_type_list,
            status_audit_selected:'all',
            status_shelf_selected:'all',
            product_type_selected:'all',
            product_status_list:product_status_list,
            product_status_selected:'',
            totalCount:0,
            currentPage:1,
            pagesize:5,
            product_list:[],
            pickerOptions: {
                shortcuts: [{
                  text: '最近一周',
                  onClick:(picker) =>{
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    this.datetime_end= moment(end).format('YYYY-MM-DD HH:mm:ss')
                    this.datetime_start= moment(start).format('YYYY-MM-DD HH:mm:ss')
                  }
                }, {
                  text: '最近一个月',
                  onClick:(picker)=>{
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
            }
          }
        },
        methods: {
          changeRadioValue(){
          this.currentPage = 1;
          this.product_listall_paging()
          },
          search: function(){
          this.currentPage = 1;
          this.product_listall_paging()
          },
          clearSearch: function(){
            this.datetime_start=''
            this.datetime_end=''
            this.company_selected_id=''
            this.staff_selected_id=''
            this.product_classify_selected=''
            this.search_text=''
          },
          current_change:function(currentPage){
            this.currentPage = currentPage;
          },
          showToggle(data){
            data.flag = !data.flag;
          },
          product_edit(data) {
            router.push({
              path:'Cd_product_list1'
            })
          },
          product_del() {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
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
          handleSelectionChange(val) {
            this.checked = val;
            console.log(this.checked)
          },
          onSubmit(){
            console.log("发布了")
          },
          handleSizeChange(size) {
            this.currentPage = 1;
            this.pagesize = size;
            this.product_listall_paging();
          },
          handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
             this.product_listall_paging();
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
          getinfor(){
            var tk = localStorage.getItem("token");
            var uid = localStorage.getItem("uid");

            if(localStorage.getItem("status") == "staff"){
              this.$http.post(this.api.link_list_company_staff_to_user,{
                user_token:tk,
                user_query:"user_id=='"+uid+"'"
              }).then((res)=>{
                // console.log(res)
                //获取员工用户的对应公司id
                this.cid = res.values[0].company_id;
                //获取员工用户的对应公司的对应员工id
                this.staffid = res.values[0].staff_id;
                //列出公司里的产品
                this.$http.post('/restful/list/company.'+this.cid+'/product',{
                  // user_token:tk,
                  user_query:"user_id=='"+uid+"'"
                }).then((res)=>{
                  // console.log(res);
                  this.data = res.values;
                  this.data2 = this.data.concat();
                  this.totalItems = res.values.length;
                })
              })
            }else{
              this.ifboos = true;
              this.$http.post(this.api.user_company_list,{
                user_token:tk,
                user_query:"user_id=='"+uid+"'"
              }).then((res)=>{
                // console.log(res);
                if(res.values.length > 0){
                  for(var i = 0;i < res.values.length;i++){
                    this.form.company.push({
                      "value":res.values[i].company_id,
                      "label":res.values[i].name
                    });
                  }
                  this.value = res.values[0].company_id;//下拉框显示公司名字
                  this.cid = res.values[0].company_id;//把当前公司id
                  // console.log(this.cid)
                  this.staffid = 1;//老板的员工id都是1?
                  //列出公司里的产品
                  this.$http.post('/restful/list/company.'+this.cid+'/product',{
                    // user_token:tk,

                  }).then((res)=>{
                    // console.log(res);
                    this.data = res.values;
                    this.data2 = this.data.concat();
                    this.totalItems = res.values.length;
                  })
                }
              })
            }

          },
          onCompanyChange(){
              this.company_staff_list();
          },
           onStaffChange(){
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
          product_classification_list(){
            this.$http.post(this.api.product_classification_list,{
              user_token:this.user_token,
              user_id:this.user_id,
            }).then((res)=>{
              //console.log(res);
              if(res.is_success){
                this.product_classify = res.value;
              }
            })
          },
          product_listall_paging(){
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

            if(this.datetime_start){
                 params.product_updata_datetime_start=this.datetime_start;
            }
            if(this.datetime_end){
                params.product_updata_datetime_end=this.datetime_end;
            }
            if(this.status_audit_selected&&this.status_audit_selected!='all'){
                params.status_audit=this.status_audit_selected;
            }
            if(this.status_shelf_selected&&this.status_shelf_selected!='all'){
                params.status_shelf=this.status_shelf_selected;
            }
            if(this.product_type_selected&&this.product_type_selected!='all'){
                params.product_type=this.product_type_selected;
            }
            if(this.search_text){
                params.search_text=this.search_text;
            }
            if(this.product_status_selected){
                params.status=this.product_status_selected;
            }

            this.$http.post(this.api.product_listall_paging,params).then((res)=>{
              //console.log(res);
              if(res.is_success){
                    this.product_list = res.value.list;
                  this.totalCount = res.value.totalCount;
                }else{
                     this.product_list=[];
                }
            })
          },

        },
        created(){
            this.user_token = localStorage.getItem("user_token");
            this.user_id = localStorage.getItem("user_id");
            this.product_classification_list()
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
            this.product_listall_paging();

        },
        props:{
         title:{
          default:'商品管理',
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
      },
      }
</script>
<style scoped>
 /* .line{
    margin: 20px 0;
    border-top: 1px solid #dcdfe6;
  }*/
  .sub_btn{
    margin-top: 20px;
  }
</style>
