<template>
<div class="content">
  <div class="title">
    <h3 class="">系统中UPC码现在还有150条,anc码还有6800条</h3>
  </div>
  <div class="line"></div>
  <p class="">添加新的upc编码，把准备好的upc编码粘贴到下面的文本框中，然后点击立即添加。系统已经添加过的数据会被忽略。</p>

  <div>
  <el-input class="add-code" :rows="12" type="textarea" v-model="form.desc"></el-input>
  <el-button class="btn-code" type="primary" @click="onSubmit">立即添加upc</el-button>
  </div>
  <div>
  <el-input class="add-code" :rows="12" type="textarea" v-model="form.desc"></el-input>
  <el-button class="btn-code" type="primary" @click="onSubmit">立即添加anc</el-button>
  </div>
</div>
</template>

<script>
    export default {
        data() {
          return {
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
        }
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
    /*.left{*/
      /*float: left;*/
    /*}*/
    .add-code{
      margin-top: 10px;
      width: 30%;
      display: block;
    }
    .btn-code{
      margin-bottom: 30px;
      margin-top: 10px;
      display: block;
    }
</style>
