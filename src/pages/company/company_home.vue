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
                  <span>{{companyInfo.company_short_name}}</span>
                  <input type="text">
                  <a @click="modification('company_short_name','z中国')">修改</a>
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
                  <span>{{companyInfo.company_address}}</span>
                  <a>添加</a>
                </div>
              </el-col>
            </el-row>

            <el-row >
              <el-col :span="3"><div class="grid-content bg-purple">联系电话</div></el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  <span>{{companyInfo.company_contact_number}}</span>
                  <a>添加</a>
                </div>
              </el-col>
            </el-row>

            <el-row >
              <el-col :span="3"><div class="grid-content bg-purple">企业域名</div></el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  <span>{{companyInfo.company_domain_name}}</span>
                  <a>添加</a>
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
                  <span>{{companyInfo.company_member}}/{{companyInfo.company_member_max}}</span><a>申请扩容</a>
                </div>
              </el-col>
            </el-row>

            <hr />

            <el-row >
              <el-col :span="3"><div class="grid-content bg-purple">发票抬头</div></el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  <span>{{companyInfo.company_invoice_title}}</span>
                  <a>添加</a> <em>为企业成员配置增值税发票抬头</em><i>!</i>
                </div>
              </el-col>
            </el-row>
            <hr />

            <el-row >
              <el-col :span="3"><div class="grid-content bg-purple">行业类型</div></el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  <span>{{companyInfo.company_industry_type}}</span>

                  <a>修改</a>
                </div>
              </el-col>
            </el-row>

            <el-row >
              <el-col :span="3"><div class="grid-content bg-purple">人员规模</div></el-col>
              <el-col :span="14">
                <div class="grid-content bg-purple-light">
                  <span>1-50人</span>
                  <a>修改</a>
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
            "company_corp_id":""
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
          var fromData = {
            user_token:localStorage.getItem('user_token'),
            user_id:localStorage.getItem('user_id'),
            target_company_id:localStorage.getItem('owner_company_id')
          };
          fromData[key] = value;
          this.$http.post(this.api.set_company_info,fromData).then((res)=>{
            //console.log(res);
            this.companyInfo = res.value;
          })
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
