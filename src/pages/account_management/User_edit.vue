<template>
<div class="content">
  <template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="用户信息" name="first">
        <el-form class="user-info" label-width="80px">
          <h3>常规信息</h3>
          <el-form-item label="性别">
            <el-input v-model="sex"></el-input>
          </el-form-item>
          <el-form-item label="生日">
            <el-input v-model="birth"></el-input>
          </el-form-item>
          <el-form-item label="血型">
            <el-input v-model="blood"></el-input>
          </el-form-item>
          <el-form-item label="所在地">
            <el-input v-model="location"></el-input>
          </el-form-item>
          <h3>联系信息</h3>
          <el-form-item label="手机号码">
            <el-input v-model="phone_number"></el-input>
          </el-form-item>
          <el-form-item label="QQ号码">
            <el-input v-model="qq_number"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="account_set_infos">保存</el-button>
            <el-button @click="set_user_infos">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="用户权限" name="second">
        <el-form class="user-permission" label-position="top" :model="userPermission" label-width="80px">
          <el-form-item label="推广:">
             <el-checkbox-group  v-model="userPermission.popularize_permissionList_selected">
                <el-checkbox
                  v-for ="(item,index) in userPermission.popularize_permissionList"
                  v-if ="item.permission"
                  :key="index"
                  :label="item.permission">{{item.name}}
                </el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item label="后台管理:">

            <el-checkbox-group  v-model="userPermission.admin_permissionList_selected">
                <el-checkbox
                  v-for ="(item,index) in userPermission.admin_permissionList"
                  v-if ="item.permission"
                  :key="index"
                  :label="item.permission">{{item.name}}
                </el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item label="公司管理:">
            <el-checkbox-group  v-model="userPermission.boss_permissionList_selected">
                <el-checkbox
                  v-for ="(item,index) in userPermission.boss_permissionList"
                  v-if ="item.permission"
                  :key="index"
                  :label="item.permission">{{item.name}}
                </el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item label="通用:">
                <el-checkbox-group  v-model="userPermission.common_permissionList_selected">
                <el-checkbox
                  v-for ="(item,index) in userPermission.common_permissionList"
                  v-if ="item.permission"
                  :key="index"
                  :label="item.permission">{{item.name}}
                </el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="setUserPermission">保存</el-button>
            <el-button @click="set_selected_permission">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="用户资产(公司)" name="third">
        <el-input size="mini" v-model="search_text" style="width: 200px"></el-input>
        <el-button size="mini" @click="company_list_paging()">搜索</el-button>
        <el-button size="mini" @click="addCompany()">添加公司</el-button>
        <el-table
          :data="company_list"
          border
          style="width: 100%;margin-top: 20px"
          :default-sort = "{prop: 'right', order: 'descending'}"
        >
          <el-table-column
            prop="id"
            label="id"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="company_full_name"
            label="公司全称"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="legal_person"
            label="公司法人"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="company_contact_number"
            label="联系方式"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="registered_capital"
            label="公司资产"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            sortable
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="editCompany(scope.row.id)" size="small">详情</el-button>
              <el-button icon="el-icon-delete" @click="deleteCompany(scope.row.id)" size="small">删除</el-button>
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
      </el-tab-pane>
    </el-tabs>
  </template>
</div>
</template>

<script>
    import router from "../../router/index";
    import menu_boss from '@/json/role_menu/menu_boss';
    import menu_admin from '@/json/role_menu/menu_admin';
    const common_permission = [{permission:'permission_system_message_receiving',name:'系统消息接收'},{permission:'permission_voice_prompt',name:'语音提示'}]
    const popularize_permission = [{permission:'permission_popularize',name:'推广信息'},{permission:'permission_popularize_computer_manage',name:'推广公司管理'}]
    export default {
        data() {
          return {
            activeName:'first',
            totalCount:0,
            currentPage:1,
            pagesize:5,
            company_list: [],
            userInfo:null,
            sex:'',
              birth:'',
              blood:'',
              location:'',
              phone_number:'',
              qq_number:'',
              email:'',
            userPermission:{
              admin_permissionList:[],
              admin_permissionList_selected:[],
              boss_permissionList:[],
              boss_permissionList_selected:[],
              popularize_permissionList:popularize_permission,
              popularize_permissionList_selected:[],
              common_permissionList:common_permission,
              common_permissionList_selected:[],
            },
            search_text:''
          }
        },
        methods: {
          handleClick(tab, event) {

          },
          addCompany(){
            router.push({
              path:'/main/company_info',
              query: {
                 owner_user_id: this.id
              }
            })
          },
          editCompany(company_id){
            router.push({
              path:'/main/company_info',
              query: {
                 company_id: company_id
              }
            })
          },
          deleteCompany(company_id){
             this.$http.post(this.api.company_delete,{
            user_token: this.user_token ,
            user_id: this.user_id ,
            target_id:company_id
          }).then((res)=>{
            //console.log(res);
            if(res.is_success){
              this.company_list_paging()
            }
          })
          },
          handleSizeChange: function (size) {
            this.currentPage = 1;
            this.pagesize = size;
            this.company_list_paging()
          },
          handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
            this.company_list_paging()
          },
          account_get_infos(){
            let params={
              user_token:this.user_token,
              user_id:this.user_id,
              target_id:this.id,
            }
            this.$http.post(this.api.account_get_infos,params).then((res)=>{
              if(res.is_success){
                this.userInfo = res.value;

                this.set_user_infos()
                this.set_selected_permission()
              }
            })
          },
          set_user_infos(){
            if(!this.userInfo){
              return;
            }
                this.sex=this.userInfo.sex
                this.birth=this.userInfo.birth
                this.blood=this.userInfo.blood
                this.location=this.userInfo.location
                this.phone_number=this.userInfo.phone_number
                this.qq_number=this.userInfo.qq_number
                this.email=this.userInfo.email
          },
          account_set_infos(){
           let params={
               user_token:this.user_token,
              user_id:this.user_id,
              target_id:this.id,
              sex:this.sex,
              birth:this.birth,
              blood:this.blood,
              location:this.location,
              phone_number:this.phone_number,
              qq_number:this.qq_number,
              email:this.email,
            }
            console.log('setUserInfo',params)
            this.$http.post(this.api.account_set_infos,params).then((res)=>{
              if(res.is_success){
                 this.userInfo = res.value;
                 this.set_user_infos()
                this.set_selected_permission()
              }else{

              }
            })
          },
        setUserPermission(){
          let params={
            user_token:this.user_token,
            user_id:this.user_id,
            target_id:this.id,
          }
        this.userPermission.admin_permissionList.map(item=>{
            params[item.permission]= "false";
        })
        if(this.userPermission.admin_permissionList_selected.length>0){
           params['permission_backstage']= 'true'
          this.userPermission.admin_permissionList_selected.map(item=>{
            params[item]= "true";
          })
        }else{
          params['permission_backstage']= 'false'
        }

        //-----boss
        this.userPermission.boss_permissionList.map(item=>{
            params[item.permission]= "false";
        })
        if(this.userPermission.boss_permissionList_selected.length>0){
          params['permission_company']= 'true'
            this.userPermission.boss_permissionList_selected.map(item=>{
            params[item]= "true";
            })
        }else{
            params['permission_company']= 'false'
        }


        //-----
        this.userPermission.popularize_permissionList.map(item=>{
            params[item.permission]= "false";
        })

        this.userPermission.popularize_permissionList_selected.length>0&&this.userPermission.popularize_permissionList_selected.map(item=>{
            params[item]= "true";
        })
        //-----
        this.userPermission.common_permissionList.map(item=>{
            params[item.permission]= "false";
        })

        this.userPermission.common_permissionList_selected.length>0&&this.userPermission.common_permissionList_selected.map(item=>{
            params[item]= "true";
        })

        this.$http.post(this.api.account_set_infos,params).then((res)=>{
              console.log(res);
              if(res.is_success){

              }else{

              }
            })
        },
          init_permission(){
           this.userPermission.admin_permissionList=menu_admin.filter((item)=>{
              return item.permission;
           })
           this.userPermission.boss_permissionList=menu_boss.filter((item)=>{
              return item.permission;
           })
          },
          set_selected_permission(){
            if(!this.userInfo){
              return;
            }
            //后台管理  选中
          let admin_permissionList_selected= []
          this.userPermission.admin_permissionList.filter((item)=>{
            if(this.userInfo[item.permission]=='true'){
                admin_permissionList_selected.push(item.permission)
            }
          })
          this.userPermission.admin_permissionList_selected=admin_permissionList_selected;

          //公司管理  选中
          let boss_permissionList_selected= []
          this.userPermission.boss_permissionList.filter((item)=>{
            if(this.userInfo[item.permission]=='true'){
                boss_permissionList_selected.push(item.permission)
            }
          })
          this.userPermission.boss_permissionList_selected=boss_permissionList_selected;

           //推广管理  选中
          let popularize_permissionList_selected= []
          this.userPermission.popularize_permissionList.filter((item)=>{
            if(this.userInfo[item.permission]=='true'){
                popularize_permissionList_selected.push(item.permission)
            }
          })
          this.userPermission.popularize_permissionList_selected=popularize_permissionList_selected;


           //通用管理  选中
          let common_permissionList_selected= []
          this.userPermission.common_permissionList.filter((item)=>{
            if(this.userInfo[item.permission]=='true'){
                common_permissionList_selected.push(item.permission)
            }
          })
          this.userPermission.common_permissionList_selected=common_permissionList_selected;


          },
          company_list_paging(){
              let params = {
              user_token:this.user_token,
              user_id:this.user_id,
              page:this.currentPage-1,  //页码
              pageSize:this.pagesize,
              target_user_id:this.id,
            }
            if(this.search_text){
              params.search_text=this.search_text
            }
            this.$http.post(this.api.company_list_paging,params).then((res)=>{
              if(res.is_success){
                this.company_list = res.value.list;
                this.totalCount = res.value.totalCount;
              }else{
                this.company_list=[];
              }
            })
          }

        },
        mounted() {
            this.owner_company_id = localStorage.getItem("owner_company_id")
            this.owner_user_id = localStorage.getItem("owner_user_id")
            this.user_token = localStorage.getItem("user_token");
            this.user_id = localStorage.getItem("user_id");
            this.id= this.$route.query.id
            this.account_get_infos()
            this.init_permission()
            this.company_list_paging()
        },
      }
</script>
<style scoped>
  .user-info,.user-permission{
    width: 50%;
  }
  h3{
    margin-bottom: 20px;
    margin-left: 80px;
  }
  .el-form--label-top{
    font-weight: 600;
  }
  .user-permission .el-form-item{
    border-bottom: 1px #eee solid;
  }
  .user-permission .el-form-item:last-child{
    border-bottom: 0;
  }
</style>
