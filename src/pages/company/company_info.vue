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
  <el-form ref="form" :model="form" label-width="110px">
    <el-form-item label="公司ID">
      <el-input v-model="form.id"></el-input>
    </el-form-item>
    <el-form-item label="公司简称">
      <el-input v-model="form.company_short_name"></el-input>
    </el-form-item>
    <el-form-item label="企业全称">
      <el-input v-model="form.company_full_name"></el-input>
    </el-form-item>
    <el-form-item label="法人名称">
      <el-input v-model="form.cregmoney"></el-input>
    </el-form-item>
    <el-form-item label="办公地址">
      <el-input v-model="form.company_address"></el-input>
    </el-form-item>
    <!--<el-form-item label="经营范围">-->
      <!--<el-input v-model="form.crange"></el-input>-->
    <!--</el-form-item>-->
    <el-form-item label="电话">
      <el-input v-model="form.company_contact_number"></el-input>
    </el-form-item>
    <el-form-item label="平台费用提成">
      <el-input v-model="form.crange"></el-input>
    </el-form-item>
    <el-form-item label="员工数量限制">
      <el-input v-model="form.company_member_max"></el-input>
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
      <el-button type="primary" @click="onSubmit">提交</el-button>
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


            form: {
              cname: '',
              cregmoney:'',
              creg_address:'',
              clegalp:'',
              crange:'',
              cwork_address:'',
              ctel:'',
              dialogImageUrl: '',
              dialogVisible: false,
              cid:''
            }
          }
        },
        methods: {
          onSubmit() {
            var tk = localStorage.getItem("token");
            var uid = localStorage.getItem("uid");

            this.$http.post(this.api.company_add,{
              token:tk,
              user_id:uid,
              name:this.form.cname,
              regmoney:this.form.cregmoney,
              reg_address:this.form.creg_address,
              legalp:this.form.clegalp,
              range:this.form.crange,
              work_address:this.form.cwork_address,
              tel:this.form.ctel
            }).then((res)=>{
              this.cid = res.id;
              this.$http.post(this.api.user_add_company,{
                user_token:tk,
                user_id:uid,
                company_id:this.cid,
                name:this.form.cname,
                regmoney:this.form.cregmoney,
                reg_address:this.form.creg_address,
                legalp:this.form.clegalp,
                range:this.form.crange,
                work_address:this.form.cwork_address,
                tel:this.form.ctel
              }).then((res)=>{
                this.$message({
                  message: '公司添加成功',
                  type: 'success'
                });
                // router.push({
                //   path:'/main/C_staff'
                // })
                localStorage.clear();
                router.push({
                  path:'/'
                })
              })
            })

            // this.$http({
            //   url:'http://39.106.9.139/apis/restful/add/_company/company',
            //   method:'POST',
            //   headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            //   },
            //   data:Qs.stringify({
            //     token:tk,
            //     user_id:uid,
            //     name:this.form.cname,
            //     regmoney:this.form.cregmoney,
            //     reg_address:this.form.creg_address,
            //     legalp:this.form.clegalp,
            //     range:this.form.crange,
            //     work_address:this.form.cwork_address,
            //     tel:this.form.ctel
            //   })
            // }).then(
            //   res =>{
            //     // console.log(res);
            //     if(res.data.is_success){
            //       this.cid = res.data.id;

            //       this.$http({
            //         url:'http://39.106.9.139/apis/restful/add/_account/user_company',
            //         method:'POST',
            //         headers: {
            //           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            //         },
            //         data:Qs.stringify({
            //           user_token:tk,
            //           user_id:uid,
            //           company_id:this.cid,
            //           name:this.form.cname,
            //           regmoney:this.form.cregmoney,
            //           reg_address:this.form.creg_address,
            //           legalp:this.form.clegalp,
            //           range:this.form.crange,
            //           work_address:this.form.cwork_address,
            //           tel:this.form.ctel
            //         })
            //       }).then(
            //         res =>{
            //           // console.log(res);
            //           if(res.data.is_success){
            //             this.$message({
            //               message: '公司添加成功',
            //               type: 'success'
            //             });
            //             router.push({
            //               path:'/main/C_staff'
            //             })
            //           }
            //         })
            //     }else{
            //       this.$message.error(res.data.message);
            //     }


            //   })
          },
          handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          handlePictureCardPreview(file) {
            this.form.dialogImageUrl = file.url;
            this.form.dialogVisible = true;
          }
        },
      mounted() {
        this.owner_company_id = localStorage.getItem("owner_company_id")
        this.owner_user_id = localStorage.getItem("owner_user_id")
        this.user_token = localStorage.getItem("user_token");
        this.user_id = localStorage.getItem("user_id");
        this.id= this.$route.query.id
        if(this.id){this.title='编辑公司'}else{this.title='新增公司'}
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
