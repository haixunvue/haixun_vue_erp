<template>
    <div class="content">
        <div class="top">
            <el-button type="primary" size="small" @click="addAuthorization">添加授权</el-button>
            <el-button type="text">查看授权帮助</el-button>
        </div>
        <div class="table">
            <el-table :data="shop_list" border style="width: 100%; margin-top: 20px">
              <el-table-column prop="shop_name" label="店铺名称"></el-table-column>
              <el-table-column prop="region_name" label="授权国家"></el-table-column>
              <el-table-column prop="amazion_account" label="代理邮箱"></el-table-column>
              <el-table-column prop="_createTime" label="授权时间"></el-table-column>
              <el-table-column prop="amount3" label="操作">
                  <template slot-scope="scope">
                      <el-button type="text" @click="editAuthorization(scope.row, scope.$index)">重新授权</el-button>
                      <el-button type="text"  @click="company_shop_delete(scope.row, scope.$index)">删除</el-button>
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
            :total="totalCount">
          </el-pagination>
        </div>
        <div class="bottom">
            <div class="bottom-left left">说明！</div>
            <div class="bottom-right left">
                <p>1.多店铺授权，防关联;</p>
                <p>2.同一店铺不可重复授权;</p>
                <p>3.授权删除，不影响平台数据</p>
            </div>
        </div>

        <!--弹框-->
      <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
            <div class="input"><span>店铺别名:</span><el-input v-model="shop_name" placeholder="请输入店铺别名" style="margin-top:5px"></el-input></div>
            <div class="input"><span>Amazon账号:</span><el-input v-model="amazion_account" placeholder="请输入账号" style="margin-top:5px"></el-input></div>
            <div>
                <span>开户站:</span><br />
                <el-select v-model="siteIndex" @change="changeSite()" placeholder="请选择" style="margin-top:5px">
                    <el-option v-for="(item ,index) in site" :key="index" :label="item.name" :value="index">
                    </el-option>
                </el-select>
            </div>
            <el-button type="text" v-if="isAdd" @click="goSite()">去站点</el-button>
            <div class="site-box clear" v-if="isAdd">
                <div class="input">
                    <span class="input-label">Merchant ID:</span>
                    <el-input v-model="account_id" placeholder="卖家编号" style="margin-top:5px;width:400px"></el-input>
                </div>
                <div class="input">
                    <span class="input-label">AWS Access Key ID:</span>
                    <el-input v-model="access_key" placeholder="AWS访问键编号" style="margin-top:5px;width:400px"></el-input>
                </div>
                <div>
                    <span class="input-label">Secret Key:</span>
                    <el-input v-model="secret_key" placeholder="密钥" style="margin-top:5px;width:400px"></el-input>
                </div>
                <el-button type="text" class="right">如何获取上述信息？</el-button>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="isAdd?add_amazon_auth():amazon_re_authorize()">授 权</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import router from "../../router";
    import site from '@/json/site';

    export default {
        data() {
            return {
                shop_name:'',
                account_id:'',
                access_key:'',
                secret_key:'',
                region:'',
                region_name:'',
                amazion_account:'',
                siteIndex: '',
                dialogVisible:false,
                site: site,
                isAdd:true,
                shop_list:[],
                input:'',
                title:'',
                re_auth_data:'',
              totalCount:0,
              currentPage:1,
              pagesize:5,
            }
        },
          mounted() {
            this.owner_company_id = localStorage.getItem("owner_company_id")
            this.owner_user_id = localStorage.getItem("owner_user_id")
            this.user_token = localStorage.getItem("user_token");
            this.user_id = localStorage.getItem("user_id");
            this.company_shop_list();
        },
        methods:{

            addAuthorization(){
                this.shop_name='';
                this.account_id='';
                this.access_key='';
                this.secret_key='';
                this.region='';
                this.amazion_account='';
                this.siteIndex='';
                this.dialogVisible = true;
                this.title="添加Amazon权限";
                this.isAdd = true;
            },
            editAuthorization(item,index){
                console.log(item)
                this.re_auth_data = item;
                this.shop_name=item.shop_name;
                this.amazion_account=item.amazion_account;
                this.region=this.findSiteIdx(item.region);
                this.dialogVisible = true;
                this.title="修改Amazon权限";
                this.isAdd = false;
            },
             findSiteIdx(value){
                for(let i=0;i<site.length;i++){
                    if(site.value==value){return i;}
                }
                return '';
            },
          changeSite(){

          },
          amazon_re_authorize(){
              if(!this.re_auth_data){
                  return;
              }
          this.$http.post(this.api.amazon_re_authorize,{
            owner_company_id: this.owner_company_id,
            owner_user_id:this.owner_user_id,
            user_token:this.user_token,
            user_id:this.user_id,
            target_id:this.re_auth_data.id,
            shop_name:this.shop_name,
            amazion_account:this.amazion_account,
            account_id:this.re_auth_data.account_id,
            access_key:this.re_auth_data.access_key,
            secret_key:this.re_auth_data.secret_key,
            region:this.siteIndex?this.site[Number(this.siteIndex)].value:'',
            region_name:this.siteIndex?this.site[Number(this.siteIndex)].name:'',
            }).then((res)=>{
                console.log('amazon_auth',res);
                if(res.is_success){
                    this.dialogVisible = false;
                    this.company_shop_list();
                }

            })
          },
          handleSizeChange: function (size) {
            this.currentPage = 1;
            this.pagesize = size;
            this.company_shop_list();
          },
          handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
            this.company_shop_list()
          },
          company_shop_list(){
            this.$http.post(this.api.company_shop_list_paging,{
              user_token:this.user_token,
              user_id:this.user_id,
              target_company_id:this.owner_company_id,
              page:this.currentPage-1,  //页码
              pageSize:this.pagesize,
            }).then((res)=>{
                console.log('company_shop_list',res);
                if(res.is_success){
                    this.shop_list = res.value.list;
                  this.totalCount = res.value.totalCount;
                }else{
                     this.shop_list=[];
                }


            })
          },
          company_shop_delete(item,index){
            this.$http.post(this.api.company_shop_delete,{
            user_token:this.user_token,
            user_id:this.user_id,
            target_id:item.id,
            }).then((res)=>{
                if(res.is_success){
                    this.company_shop_list();
                }
                console.log('company_shop_list',res);

            })
          },
          add_amazon_auth(){

          this.$http.post(this.api.amazon_auth,{
            owner_company_id: this.owner_company_id,
            owner_user_id:this.owner_user_id,
            user_token:this.user_token,
            user_id:this.user_id,
            shop_name:this.shop_name,
            account_id:this.account_id,
            access_key:this.access_key,
            secret_key:this.secret_key,
            region:this.siteIndex?this.site[Number(this.siteIndex)].value:'',
            region_name:this.siteIndex?this.site[Number(this.siteIndex)].name:'',
            amazion_account:this.amazion_account,
            }).then((res)=>{
                console.log('amazon_auth',res);
                if(res.is_success){
                    this.dialogVisible = false;
                    this.company_shop_list();
                }


            })
          },
          goSite(){
              window.open(this.site[Number(this.siteIndex)].url)
          }
        }
    }
</script>
<style scoped>
    .content{
        padding: 0 20px;
    }

    .bottom{
        margin-top:30px;
    }

    .bottom-left{
        padding:2px 4px 2px 15px;
        background-color: #009997;
        margin-right: 20px;
        color:#fff;
    }

    .bottom-right p{
        margin-bottom: 10px;
        color:#979996;
    }

    .input{
        margin-bottom: 15px;
    }

    .site-box{
        width:100%;
        background-color: #ddd;
        border:1px solid #cdcdcd;
        border-radius: 5px;
        padding:10px 0 40px 0;
    }

    .input-label{
        display: inline-block;
        width:150px;
        text-align: right;
    }

</style>
