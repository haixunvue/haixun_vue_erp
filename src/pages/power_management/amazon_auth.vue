<template>
    <div class="content">
        <div class="top">
            <el-button type="primary" size="small" @click="addAuthorization">添加授权</el-button>
            <el-button type="text">查看授权帮助</el-button>
        </div>
        <div class="table">
            <el-table :data="tableData" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
              <el-table-column prop="id" label="店铺名称"></el-table-column>
              <el-table-column prop="name" label="授权国家"></el-table-column>
              <el-table-column prop="amount1" label="代理邮箱"></el-table-column>
              <el-table-column prop="amount2" label="授权时间"></el-table-column>
              <el-table-column prop="amount3" label="操作">
                  <template slot-scope="scope">
                      <el-button type="text" @click="editAuthorization">重新授权</el-button>
                      <el-button type="text"  @click="company_shop_delete">删除</el-button>
                  </template>
              </el-table-column>
            </el-table>
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
                amazion_account:'',
                siteIndex: '', 
                dialogVisible:false,
                site: site,  
                isAdd:true,          
                tableData: [{
                 id: 'jianggu',
                 name: '英国',
                 amount1: '249463571@qq.com',
                 amount2: '2017-06-06 19:40:01',
                 amount3: 10
               }, {
                 id: '12987123',
                 name: '德国',
                 amount1: '',
                 amount2: '',
                 amount3: 12
               }, {
                 id: '12987124',
                 name: '法国',
                 amount1: '',
                 amount2: '',
                 amount3: 9
               }, {
                 id: '12987125',
                 name: '意大利',
                 amount1: '',
                 amount2: '',
                 amount3: 17
               }, {
                 id: '12987126',
                 name: '西班牙',
                 amount1: '',
                 amount2: '',
                 amount3: 15
               }],
              
               
                input:'',
                title:'',
                
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
            //row横行 column竖行
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0 || columnIndex === 3 || columnIndex === 4) {
                    if (rowIndex % 5 === 0) {
                        return {
                            rowspan: 5,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                   }
                }
            },
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
            editAuthorization(){
                this.dialogVisible = true;
                this.title="修改Amazon权限";
                this.isAdd = false;
            },
          changeSite(){

          },
          amazon_re_authorize(){
          this.$http.post(this.api.amazon_re_authorize,{
            owner_company_id: this.owner_company_id,
            owner_user_id:this.owner_user_id,
            user_token:this.user_token,
            target_id:'', 
            user_id:this.user_id, 
            shop_name:this.shop_name,
            amazion_account:this.amazion_account, 
            account_id:this.account_id,
            access_key:this.access_key,
            secret_key:this.secret_key,
            region:this.siteIndex?this.site[Number(this.siteIndex)].value:'',                        
            }).then((res)=>{
                console.log('amazon_auth',res);
                if(res.is_success){
                    this.dialogVisible = false;
                }
    
            })
          },
          company_shop_list(){
            this.$http.post(this.api.company_shop_list,{
            user_token:this.user_token,
            user_id:this.user_id, 
            }).then((res)=>{
                console.log('company_shop_list',res);
   
            })
          },
          company_shop_delete(){
            this.$http.post(this.api.company_shop_delete,{
            user_token:this.user_token,
            user_id:this.user_id, 
            target_id:'this.target_id', 
            }).then((res)=>{
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
            amazion_account:this.amazion_account, 
            }).then((res)=>{
                console.log('amazon_auth',res);
                if(res.is_success){
                    this.dialogVisible = false;
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
