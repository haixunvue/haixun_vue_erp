<!--
**************************************
*   名称：一个demo
*   作用：展示如何把页面嵌入框架
*   作者：
**************************************
-->
<template>

<div class="content">
  <div class="title">
    <h1 class="left">{{title}}</h1>
  </div>

  <div class="line"></div>
  <el-form  label-width="110px">
    <el-form-item label="公司ID">
      <el-input v-model="company_id"></el-input>
    </el-form-item>
    <el-form-item label="企业全称">
      <el-input v-model="company_full_name"></el-input>
    </el-form-item>
    <el-form-item label="公司简称">
      <el-input v-model="company_short_name"></el-input>
    </el-form-item>
    <el-form-item label="法人名称">
      <el-input v-model="legal_person"></el-input>
    </el-form-item>
    <el-form-item label="办公地址">
      <el-input v-model="company_address"></el-input>
    </el-form-item>
    <el-form-item label="经营范围">
      <el-input v-model="scope_operation"></el-input>
    </el-form-item>
    <el-form-item label="注册资金/万(¥)">
      <el-input v-model="registered_capital"></el-input>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="company_contact_number"></el-input>
    </el-form-item>
    <el-form-item label="公司网站">
      <el-input v-model="company_domain_name"></el-input>
    </el-form-item>
    <el-form-item label="平台费用提成">
      <el-input v-model="expense_account"></el-input>
    </el-form-item>
    <el-form-item label="员工数量限制">
      <el-input v-model="company_member_max"></el-input>
    </el-form-item>
    <!--<el-form-item label="营业执照照片">-->
      <!--<el-upload-->
        <!--action="https://jsonplaceholder.typicode.com/posts/"-->
        <!--list-type="picture-card"-->
        <!--:on-preview="handlePictureCardPreview"-->
        <!--:on-remove="handleRemove">-->
        <!--<i class="el-icon-plus"></i>-->
      <!--</el-upload>-->
      <!--<el-dialog :visible.sync="form.dialogVisible">-->
        <!--<img width="100%" :src="form.dialogImageUrl" alt="">-->
      <!--</el-dialog>-->
    <!--</el-form-item>-->
    <el-form-item>
      <el-button type="primary" @click="is_edit?editCompanyInfo():addCompany()">提交</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
    import Qs from 'qs';

    export default {
        data() {
          return {
            title:'',

            company_id: "",//公司ID
            company_full_name: "",		// 全称
            company_short_name: "",       //   简称
            legal_person: "",//法人名称
            company_address: "",	//		 公司地址
            scope_operation: "",//经营范围
            registered_capital: "",//注册资金/万(¥)
            company_contact_number: "",	// 公司联系
            company_domain_name: "",	// 公司网站
            company_member_max: "",		// 员工最大数量
            expense_account:'',
            is_edit:false,
          }
        },
        methods: {
          getCompanyInfo(){
            this.$http.post(this.api.get_company_info,{
            user_token: this.user_token ,
            user_id: this.user_id ,
            target_company_id:this.id
          }).then((res)=>{
            //console.log(res);
            if(res.is_success){
              this.companyInfo = res.value;
              this.setCompanyInfo();
              console.log(this.companyInfo);
            }
          })
        },
        setCompanyInfo(){
          if(!this.companyInfo){
            return;
          }
            this.company_id=this.companyInfo.id;//公司ID
            this.company_full_name=this.companyInfo.company_full_name;		// 全称
            this.company_short_name=this.companyInfo.company_short_name;       //   简称
            this.legal_person=this.companyInfo.legal_person;//法人名称
            this.company_address=this.companyInfo.company_address;	//		 公司地址
            this.scope_operation=this.companyInfo.scope_operation;//经营范围
            this.registered_capital=this.companyInfo.registered_capital;//注册资金/万(¥)
            this.company_contact_number=this.companyInfo.company_contact_number;	// 公司联系
            this.company_domain_name=this.companyInfo.company_domain_name;	// 公司网站
            this.company_member_max=this.companyInfo.company_member_max;		// 员工最大数量
            this.expense_account=this.companyInfo.expense_account;
        },
        editCompanyInfo(){

          this.$http.post(this.api.set_company_info,{
            user_token: this.user_token ,
            user_id: this.user_id ,
            target_company_id:this.id,
            company_full_name:this.company_full_name,		// 全称
            company_short_name:this.company_short_name,      //   简称
            legal_person:this.legal_person,//法人名称
            company_address:this.company_address,	//		 公司地址
            scope_operation:this.scope_operation,//经营范围
            registered_capital:this.registered_capital,//注册资金/万(¥)
            company_contact_number:this.company_contact_number,	// 公司联系
            company_domain_name:this.company_domain_name,	// 公司网站
            company_member_max:this.company_member_max,		// 员工最大数量
            expense_account:this.expense_account,
          }).then((res)=>{
            //console.log(res);
            if(res.is_success){
              this.companyInfo = res.value;
            }
          })
        },
        addCompany(){
            this.$http.post(this.api.company_add,{
            user_token: this.user_token ,
            user_id: this.user_id ,
            owner_user_id:this.id,
            company_full_name:this.company_full_name,		// 全称
            company_short_name:this.company_short_name,      //   简称
            legal_person:this.legal_person,//法人名称
            company_address:this.company_address,	//		 公司地址
            scope_operation:this.scope_operation,//经营范围
            registered_capital:this.registered_capital,//注册资金/万(¥)
            company_contact_number:this.company_contact_number,	// 公司联系
            company_domain_name:this.company_domain_name,	// 公司网站
            company_member_max:this.company_member_max,		// 员工最大数量
            expense_account:this.expense_account,
          }).then((res)=>{
            //console.log(res);
            if(res.is_success){
              this.companyInfo = res.value;
            }
          })
        },
          
        },
      mounted() {
        this.owner_company_id = localStorage.getItem("owner_company_id")
        this.owner_user_id = localStorage.getItem("owner_user_id")
        this.user_token = localStorage.getItem("user_token");
        this.user_id = localStorage.getItem("user_id");

        if(this.$route.query.company_id){
          this.is_edit= true;
          this.id =this.$route.query.company_id;
          this.title= '编辑公司'
          this.getCompanyInfo();
        }else{
          this.id =this.$route.query.owner_user_id;
          this.title= '新增公司'
          this.is_edit= false;
        }
        
      },
      }
</script>
<style scoped>
    .line{
      margin: 20px 0;
      border-top: 1px solid #dcdfe6;
    }
    .title{
      overflow: hidden;
    }
    .left{
      float: left;
    }
    .right{
      float: right;
    }
</style>
