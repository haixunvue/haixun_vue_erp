<template>
  <div>
    <el-row>
      <el-col :span="6">
        <div class="expand">
          <div>
            <!-- <el-button @click="handleAddTop">添加顶级节点</el-button> -->
            <el-tree ref="expandMenuList" class="expand-tree"
                     v-if="isLoadingTree"
                     :data="staff_list"
                     node-key="id"
                     highlight-current
                     :props="defaultProps"
                     :expand-on-click-node="false"
                     :render-content="renderContent"
                     :default-expanded-keys="defaultExpandKeys"
                     @node-click="handleNodeClick">
            </el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="18"  v-if ="staff_selected">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>关联账号:</span>
            <el-button style="padding: 3px 0;margin-right:20px" type="text" @click="showAddFormDialog">关联新账户</el-button>
          </div>
          <el-dialog width="30%" title="添加用户关联" :visible.sync="dialogAddFormVisible">
            <el-form  :model="addStaffLinker">
              <el-form-item label="用户名">
                <el-input class="formLabelWidth" v-model="addStaffLinker.name" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogAddFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="company_staff_linker_add">添 加</el-button>
            </div>
          </el-dialog>
          <el-table
            :data="link_staff_list"
            stripe
            style="width: 100%">
            <el-table-column
              prop="id"
              label="id"
              width="150">
            </el-table-column>
            <el-table-column
              prop="name"
              label="账号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="nikename"
              label="昵称"
              width="150">
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="联系方式"
              width="150">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              width="100">
            </el-table-column>
            <el-table-column
              width="100"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="company_staff_linker_delete(scope.row.id)" type="text" size="small">取消关联</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>员工属性</span>
          </div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="名称">
              <el-input name="staff" :class="input_disable" :disabled="!is_edit" v-model="staff_Info_form.staff_name"></el-input>
            </el-form-item>
            <el-form-item label="部门">
              <el-input name="staff" :class="input_disable" :disabled="!is_edit" v-model="staff_Info_form.staff_department"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input name="staff" :class="input_disable" :disabled="!is_edit" v-model="staff_Info_form.staff_notes"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="editStaff">{{staffEdit}}</el-button>
              <el-button v-if="is_edit" @click="cancelEdit">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>员工权限</span>
          </div>
          <el-form :model="form" label-width="80px">
            <el-form-item>
              <el-checkbox-group v-model="form.type">
                <el-checkbox
                  v-for ="(item,index) in menuList"
                  v-if ="item.permission"
                  :name="index"
                  :key="index"
                  :label="item.name">{{item.name}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>员工店铺分配</span>
          </div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item>
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="美食/餐厅线上活动" name="type">1</el-checkbox>
                <el-checkbox label="地推活动" name="type">2</el-checkbox>
                <el-checkbox label="线下主题活动" name="type">3</el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type">4</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<!-- VUE饿了么树形控件添加增删改功能按钮 -->
<script>
  import TreeRender from '@/components/tree_render'
  import api from '@/resource/api'
  import Qs from 'qs';
  import ElRow from "element-ui/packages/row/src/row";
  import menu_staff from '@/json/role_menu/menu_staff';
  export default{
    components: {ElRow},
    name: 'tree',
    data(){
      return{
        menuList:[],
        staff_list:[{staff_name: '总部',children:[]}],
        staff_selected:null,
        defaultProps: {
          children: 'children',
          label: 'staff_name'
        },
        link_staff_list: [],

        addStaffLinker: {
          name:''
        },
        staff_Info_form:{
          staff_department:"",
          staff_name:"",
          staff_notes:"",
        },
        selected_permission:'',
        form: {
          name:''
        },
        isLoadingTree: false,//是否加载节点树
        is_edit:false,
        input_disable:'input-disable',
        staffEdit:'编辑',
        defaultExpandKeys: [],//默认展开节点列表
        dialogAddFormVisible: false,
      }
    },
     props:{
      setTree:{
        type:Array,
        required:true
      },
    },

    mounted(){
      this.owner_company_id = localStorage.getItem("owner_company_id")
      this.owner_user_id = localStorage.getItem("owner_user_id")
      this.user_token = localStorage.getItem("user_token");
      this.user_id = localStorage.getItem("user_id");

      this.initExpand()
      this.company_staff_list();
    },

    methods: {
      showAddFormDialog(){
        this.addStaffLinker.name= '';
          this.dialogAddFormVisible = true
      },
      company_staff_list(){
        //员工列表
        this.$http.post(this.api.company_staff_list,{
          user_query: `owner_company_id=='${this.owner_company_id}'`,
          user_token:this.user_token,
          user_id:this.user_id,
        }).then((res)=>{
          console.log('company_staff_list',res);
          if(res.is_success){
            this.$set(this.staff_list[0], 'children', res.value)
            // this.staff_list.children=res.value
          }
        })
      },
      initExpand(){
        this.menuList=menu_staff;
        this.setTree.map((a) => {
          this.defaultExpandKeys.push(a.id)
        });
        this.isLoadingTree = true;
      },
      handleNodeClick(data,n,s){//点击员工节点
        if(data.id){
          this.staff_selected = data;
          this.staff_Info_form.staff_department= data.staff_department;
          this.staff_Info_form.staff_name= data.staff_name;
          this.staff_Info_form.staff_notes= data.staff_notes;

          //this.company_staff_get_infos();
          this.company_staff_linker_list();

        }else{
          this.staff_selected = null;
        }
        console.log("handleNodeClick",data)
      },
      renderContent(h, { node, data, store }) {
        let btnTitle = '';
        if(data.staff_name=='总部'){
          btnTitle = "添加新员工"
        }else{
          btnTitle = '删除';
        }
        return (<span class="custom-tree-node">
          <span>{data.staff_name}</span>
        <span>
        <el-button size="mini" type="text" on-click={ () => this.treeBtnClick(node, data, store )}>{btnTitle}</el-button>
        </span>
        </span>);

      },
      treeBtnClick(node, data, store){
        if(data.staff_name=='总部'){
          this.company_staff_add(node, data, store)

        }else{
          this.company_staff_delete(node, data, store)
        }
      },
      company_staff_add(node, data, store){
        //增加员工
        this.$http.post(this.api.company_staff_add,{
          owner_company_id:this.owner_company_id,
          owner_user_id:this.owner_user_id,
          user_token:this.user_token,
          user_id:this.user_id,
          staff_name:'新员工',//   			员工名称
          staff_department:'',// 		员工部门
          staff_notes:'',// 			员工备注

        }).then((res)=>{
          console.log('company_staff_list',res);
          if(res.is_success){
            data.children.push(res.value)
            this.$set(data, 'children', data.children)
            if(!node.expanded){
              node.expanded = true;
            }
            //this.company_staff_list()
          }


        })
      },

      company_staff_delete(node, data, store){
        //删除员工
        this.$http.post(this.api.company_staff_delete,{
          user_token:this.user_token,
          user_id:this.user_id,
          target_id:data.id,
        }).then((res)=>{
          console.log('company_staff_delete',res);
          if(res.is_success){
            if(!node.expanded){
              node.expanded = true;
            }
            this.company_staff_list()
          }

        })
      },
      company_staff_get_infos(){
        //获取员工信息
        if(!this.staff_selected){
          return;
        }

        this.$http.post(this.api.company_staff_get_infos,{
          user_token:this.user_token,
          user_id:this.user_id,
          target_id:this.staff_selected.id,
        }).then((res)=>{
          console.log(res)
        })
      },
      company_staff_linker_add(){
        //关联员工
        if(!this.staff_selected){
          return;
        }
        if(!this.addStaffLinker.name){
          return;
        }

        this.$http.post(this.api.company_staff_linker_add,{
          user_token:this.user_token,
          user_id:this.user_id,
           owner_company_id:this.owner_company_id,
          owner_user_id:this.owner_user_id,
          owner_staff_id:this.staff_selected.id,
          target_user_name:this.addStaffLinker.name,

        }).then((res)=>{
          console.log(res)
          if(res.is_success){
            this.dialogAddFormVisible = false;
            this.company_staff_linker_list()
          }

        })
      },
      company_staff_linker_delete(target_id){
        this.$http.post(this.api.company_staff_linker_delete,{
          user_token:this.user_token,
          user_id:this.user_id,
          target_id:target_id
         }).then((res)=>{
          console.log(res)
          if(res.is_success){
            this.company_staff_linker_list()
          }

        })
      },
      company_staff_linker_list(){
        //关联列表
        if(!this.staff_selected){
          return;
        }

        this.$http.post(this.api.company_staff_linker_list,{
          user_token:this.user_token,
          user_id:this.user_id,
          user_query:`owner_staff_id=="${this.staff_selected.id}"`,
        }).then((res)=>{
          if(res.is_success){
            this.link_staff_list=res.value
          }else{
            this.link_staff_list=[]
          }

          console.log(res)
        })
      },
      company_staff_set_infos(){
        let params={
          user_token:this.user_token,
          user_id:this.user_id,
          target_id:this.staff_selected.id,
        }
        for (var key in this.staff_selected){
          params[key] =this.staff_selected[key]
         }
        params.staff_department=this.staff_Info_form.staff_department;
        params.staff_name=this.staff_Info_form.staff_name;
        params.staff_notes=this.staff_Info_form.staff_notes;


        this.$http.post(this.api.company_staff_set_infos,params).then((res)=>{
          if(res.is_success){
            this.cancelEdit();
          }else{
          }
          console.log('res',res)
        })
      },
      editStaff(){
        if(this.is_edit){
           this.company_staff_set_infos();
        }else{
          this.is_edit=true;
           this.input_disable=''
          this.staffEdit='保存'
        }
      },
      cancelEdit(){
        this.is_edit=false
        this.input_disable='input-disable'
        this.staffEdit='编辑'

      }
    }

  }
</script>

<style>
  .search-result-text{
    font-size: 14px;
    color: #333;
    margin-bottom: 10px;
  }
  .line{
    margin: 20px 0;
    border-top: 1px solid #dcdfe6;
  }
  .expand{
    width:100%;
    height:100%;
    overflow:hidden;
  }
  .expand>div{
    height:85%;
    /*padding-top:20px;*/
    /*width:50%;*/
    /*margin:20px auto;*/
    max-width:400px;
    overflow-y:auto;
  }
  .expand>div::-webkit-scrollbar-track{
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    border-radius:5px;
  }
  .expand>div::-webkit-scrollbar-thumb{
    background-color:rgba(50, 65, 87, 0.5);
    outline:1px solid slategrey;
    border-radius:5px;
  }
  .expand>div::-webkit-scrollbar{
    width:10px;
  }
  .expand-tree{
    border:none;
    margin-top:10px;
  }
  .expand-tree .el-tree-node.is-current,
  .expand-tree .el-tree-node:hover{
    overflow:hidden;
  }
  .expand-tree .is-current>.el-tree-node__content .tree-btn,
  .expand-tree .el-tree-node__content:hover .tree-btn{
    display:inline-block;
  }
  .expand-tree .is-current>.el-tree-node__content .tree-label{
    font-weight:600;
    white-space:normal;
  }
  .formLabelWidth{
    width: 50%;
  }
  .input-disable.is-disabled input.el-input__inner{
    background: #fff;
    border: 0;
  }
  .input-disable.is-disabled textarea.el-textarea__inner{
    background: #fff;
    border: 0;
  }
</style>
