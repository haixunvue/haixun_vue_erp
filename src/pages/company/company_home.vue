<template>
    <div>
      <el-tabs :tab-position="tabPosition" style="height: 200px;">
        <el-tab-pane label="公司主页">
          <div class="company-home">
            <el-row >
              <el-col :span="3"><div class="grid-content bg-purple">企业logo</div></el-col>
              <el-col :span="14"><div class="grid-content bg-purple-light"><img :src="companyInfo.company_logo_img" width="200" height="70" alt=""></div></el-col>
            </el-row>

            <el-row >
              <el-col :span="3"><div class="grid-content bg-purple">企业简称</div></el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  <span v-if="states.company_short_name">{{companyInfo.company_short_name}}</span>
                  <input v-else v-model="companyInfo.company_short_name" type="text">
                  <a @click="modification('company_short_name',companyInfo.company_short_name)">
                    <sub v-if="states.company_short_name">{{companyInfo.company_short_name?'修改':'添加'}}</sub>
                    <sub v-else>保存</sub>
                  </a>
                </div>
              </el-col>
            </el-row>

            <el-row >
              <el-col :span="3"><div class="grid-content bg-purple">企业全称</div></el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  {{companyInfo.company_full_name}}
                </div>
              </el-col>
            </el-row>

            <hr />
            <el-row >
              <el-col :span="3"><div class="grid-content bg-purple">企业地址</div></el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  <span v-if="states.company_address">{{companyInfo.company_address}}</span>
                  <input v-else v-model="companyInfo.company_address" type="text">
                  <a @click="modification('company_address',companyInfo.company_address)">
                    <sub v-if="states.company_address">{{companyInfo.company_address?'修改':'添加'}}</sub>
                    <sub v-else>保存</sub>
                  </a>
                </div>
              </el-col>
            </el-row>

            <el-row >
              <el-col :span="3"><div class="grid-content bg-purple">联系电话</div></el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  <span v-if="states.company_contact_number">{{companyInfo.company_contact_number}}</span>
                  <input v-else v-model="companyInfo.company_contact_number" type="text">
                  <a @click="modification('company_contact_number',companyInfo.company_contact_number)">
                    <sub v-if="states.company_contact_number">{{companyInfo.company_contact_number?'修改':'添加'}}</sub>
                    <sub v-else>保存</sub>
                  </a>
                </div>
              </el-col>
            </el-row>

            <el-row >
              <el-col :span="3"><div class="grid-content bg-purple">企业域名</div></el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  <span v-if="states.company_domain_name">{{companyInfo.company_domain_name}}</span>
                  <input v-else v-model="companyInfo.company_domain_name" type="text">
                  <a @click="modification('company_domain_name',companyInfo.company_domain_name)">
                    <sub v-if="states.company_domain_name">{{companyInfo.company_domain_name?'修改':'添加'}}</sub>
                    <sub v-else>保存</sub>
                  </a>
                </div>
              </el-col>
            </el-row>
            <hr />

            <el-row >
              <el-col :span="3"><div class="grid-content bg-purple">企业成员</div></el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  <span>{{companyInfo.company_member}}</span>个成员
                </div>
              </el-col>
            </el-row>

            <el-row >
              <el-col :span="3"><div class="grid-content bg-purple">企业部门</div></el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  <span>{{companyInfo.company_department}}</span>个部门
                </div>
              </el-col>
            </el-row>

            <el-row >
              <el-col :span="3"><div class="grid-content bg-purple">已使用/人数上限</div></el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  <span v-if="states.company_member_max">{{companyInfo.company_member}}/{{companyInfo.company_member_max}}</span>
                  <input v-else v-model="companyInfo.company_member_max" type="text">
                  <a @click="modification('company_member_max',companyInfo.company_member_max)">
                    <sub v-if="states.company_member_max">{{companyInfo.company_member_max?'申请扩容':'申请扩容'}}</sub>
                    <sub v-else>申请扩容</sub>
                  </a>
                </div>
              </el-col>
            </el-row>

            <hr />

            <el-row >
              <el-col :span="3"><div class="grid-content bg-purple">发票抬头</div></el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  <span v-if="states.company_invoice_title">{{companyInfo.company_invoice_title}}</span>
                  <input v-else v-model="companyInfo.company_invoice_title" type="text">
                  <a @click="modification('company_invoice_title',companyInfo.company_invoice_title)">
                    <sub v-if="states.company_invoice_title">{{companyInfo.company_invoice_title?'修改':'添加'}}</sub>
                    <sub v-else>保存</sub>
                  </a>

                  <em>为企业成员配置增值税发票抬头</em><i>!</i>
                </div>
              </el-col>
            </el-row>
            <hr />

            <el-row >
              <el-col :span="3"><div class="grid-content bg-purple">行业类型</div></el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  <span v-if="states.company_industry_type">{{companyInfo.company_industry_type}}</span>
                  <input v-else v-model="companyInfo.company_industry_type" type="text">
                  <a @click="modification('company_industry_type',companyInfo.company_industry_type)">
                    <sub v-if="states.company_industry_type">{{companyInfo.company_industry_type?'修改':'添加'}}</sub>
                    <sub v-else>保存</sub>
                  </a>
                </div>
              </el-col>
            </el-row>

            <el-row >
              <el-col :span="3"><div class="grid-content bg-purple">人员规模</div></el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  <span v-if="states.company_staff_size">1-{{companyInfo.company_staff_size}}人</span>
                  <input v-else v-model="companyInfo.company_staff_size" type="text">
                  <a @click="modification('company_staff_size',companyInfo.company_staff_size)">
                    <sub v-if="states.company_staff_size">{{companyInfo.company_staff_size?'修改':'添加'}}</sub>
                    <sub v-else>保存</sub>
                  </a>
                </div>
              </el-col>
            </el-row>
            <hr />

            <el-row >
              <el-col :span="3"><div class="grid-content bg-purple">创建时间</div></el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  <span>{{companyInfo.company_create_time}}</span>
                </div>
              </el-col>
            </el-row>

            <el-row >
              <el-col :span="3"><div class="grid-content bg-purple">CorpID</div></el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  <span>{{companyInfo.company_corp_id}}</span>
                </div>
              </el-col>
            </el-row>

          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>

    export default {
      name: "company_home",
      data() {
        return {
          tabPosition: 'top',
          companyInfo:{
            "owner_user_id": "",
            "_enable_": "",
            "company_address": "",
            "company_contact_number": "",
            "company_domain_name": "",
            "company_full_name": "",
            "company_member_max": "",
            "company_short_name": "",
            "company_logo_img": "",
            "company_department":"",
            "company_member":"",
            "company_invoice_title":"",
            "company_industry_type":"",
            "company_create_time":"",
            "company_corp_id":"",
            "company_staff_size":"",
          },
          states:{
            text:'',
            company_short_name:true,
            company_address:true,
            company_contact_number:true,
            company_domain_name:true,
            company_invoice_title:true,
            company_industry_type:true,
            company_staff_size:true,
            company_member_max:true,
          }

        };
      },
      created(){
        this.getCompanyInfo();
      },
      mounted(){
        //console.log('公司获取信息',this.companyInfo);
      },
      methods:{
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
        modification(key,value){
          var _this = this;
          if(!this.states[key]){
            this.$confirm('是否保存?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              var fromData = {
                user_token:localStorage.getItem('user_token'),
                user_id:localStorage.getItem('user_id'),
                target_company_id:localStorage.getItem('owner_company_id')
              };
              fromData[key] = value;
              this.$http.post(this.api.set_company_info,fromData).then((res)=>{
                //console.log(res);
                this.companyInfo = res.value;
                this.$message({
                  type: 'success',
                  message: '保存成功!'
                });
                this.states[key] = !this.states[key];
              })
            }).catch(() => {
              this.companyInfo[key] = this.states.text;
              this.states.text='';
              this.states[key] = !this.states[key];
              this.$message({
                type: 'info',
                message: '已取消'
              });
            });
          }else {
            this.states[key] = !this.states[key];
            this.states.text= value;
          }
        }
      }
    }
</script>

<style scoped  lang="less">
  .company-home{
    padding-bottom: 30px;
    a{
      color: dodgerblue;
      margin: 0 5px;
      cursor: pointer;
      sub{
        font-style: normal;
        vertical-align: inherit;
        font-size: inherit;
      }
    }
    b{
      font-weight: normal;
    }
    em{
      font-style: normal;
      color: #999;
    }

    i{
      font-style: normal;
    }
    hr{
      margin: 15px 0;
      border-color: #ffffff;
    }
  }
  .el-row {
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    //background: #99a9bf;
  }
  .bg-purple {
    //background: #d3dce6;
  }
  .bg-purple-light {
    //background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    line-height: 36px;
  }
  .row-bg {
    //padding: 10px 0;
    //background-color: #f9fafc;
  }
</style>
