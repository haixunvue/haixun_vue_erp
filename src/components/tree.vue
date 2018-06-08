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
            <el-button style="padding: 3px 0;margin-right:20px" type="text">关联新账户</el-button>
          </div>
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
                <el-button @click="handleClick(scope.row)" type="text" size="small">取消关联</el-button>
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
              <el-input name="staff" v-model="form.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="部门">
              <el-input name="staff" v-model="form.department" disabled></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input name="staff" type="textarea" v-model="form.remarks" disabled></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="editStaff">编辑</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>员工权限</span>
          </div>
          <el-form ref="form" :model="form" label-width="80px">
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
        target_user_name:'',
        link_staff_list: [],

        form: {
          name:''
        },
        isLoadingTree: false,//是否加载节点树

        defaultExpandKeys: [],//默认展开节点列表      
        staff_id:'',
        suid:'',
        ifns:false,
        ifclick:false,
        
      }
    },
    props:{
      
      setTree:{
        type:Array,
        required:true
      },
      ifnsary:{
        type:Array,
        required:true
      },
      cid:{
        type:String,
        required:true
      }
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
      company_staff_list(){
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

      onSubmit() {
        var uid = localStorage.getItem("uid");
        var tk = localStorage.getItem("token");


        this.$http.post(this.api.user_list,{
          user_token:tk,
          user_query:"username=='"+this.form.name+"'"
        }).then((res)=>{
          this.suid = res.values[0].id;
          //判断是否存在用户
          if(res.values.length > 0){
            //判断该账户是不是员工
            if(res.values[0].status == "staff"){
              this.$http.post(this.api.link_list_user_to_company_staff,{
                user_token:tk,
                user_query:"user_id=='"+res.values[0].id+"'"
              }).then((res)=>{
                //判断是否已经被绑定
                if(res.values.length > 0){
                  this.$message.error("该用户已被其他公司绑定")
                }else{

                  if(this.staff_id){
                    //往link表里加信息
                    this.$http.post(this.api.link_company_staff_to_user,{
                      user_id:this.suid,
                      company_id:this.cid,
                      staff_id:this.staff_id
                    }).then((res)=>{
                      //往信息表里加信息
                      this.$http.post(this.api.message_company_staff_link,{
                        user_id:this.suid,
                        company_id:this.cid,
                        staff_id:this.staff_id,
                        status:"wait"
                      }).then((res)=>{
                        // this.ifnsary.push(this.staff_id);
                        this.$message.success('请求已经发出,等待该账户确认');
                        this.form.name = '';
                      })
                    })
                  }else{
                    this.$message.error("请点击要绑定的员工")
                  }
                }
              })

            }else{
              this.$message.error("该用户不是员工")
            }

          }else{
            this.$message.error("该用户不存在");
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
      handleNodeClick(data,n,s){//点击节点
        if(data.id){
          this.staff_selected = data;
          this.company_staff_get_infos();
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
        if(!this.staff_selected){
          return;
        }
        
        this.$http.post(this.api.company_staff_linker_add,{
          user_token:this.user_token,
          user_id:this.user_id,
           owner_company_id:this.owner_company_id,
          owner_user_id:this.owner_user_id,
          owner_staff_id:this.staff_selected.id,
          target_user_name:this.target_user_name,
          
        }).then((res)=>{
          console.log(res)
          this.company_staff_linker_list()
        })
      },
      company_staff_linker_list(){
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
      

      editStaff(){
        $(input[name='editStaff']).attr('disable',true)
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
</style>
