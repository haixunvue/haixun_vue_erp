<template>
  <div>
    <el-row>
      <el-col :span="6">
          <div class="expand">
            <div>
                <!-- <el-button @click="handleAddTop">添加顶级节点</el-button> -->
                <el-tree ref="expandMenuList" class="expand-tree"
                v-if="isLoadingTree"
                :data="setTree1"
                node-key="id"
                highlight-current
                :props="defaultProps"
                :expand-on-click-node="false"
                :render-content="renderContent"
                :default-expanded-keys="defaultExpandKeys"
                @node-click="handleNodeClick">
<span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.name }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            Append
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>

                </el-tree>
              </div>
          </div>
      </el-col>
      <el-col :span="18">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>关联账号:</span>
            <el-button style="padding: 3px 0;margin-right:20px" type="text">关联新账户</el-button>
          </div>
          <el-table
            :data="tableData"
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
                  v-for ="(item,index) in staffList"
                  v-if ="item.permission"
                  :name="index"
                  key="index",
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
  const Option1 = ['店铺1', '店铺2', '店铺3', '店铺4'];
  const Option2 = ['产品采集', '产品编辑', '产品跟卖', '产品上传','产品同步','产品分享'];
  const Option3 = ['接收订单', '处理订单'];
  const Option4 = ['财务管理'];
  export default{
    components: {ElRow},
    name: 'tree',
    data(){
      return{
        checkAll: false,
        checked1: ['店铺1', '店铺2', '店铺3', '店铺4'],
        checked2: ['产品采集', '产品编辑', '产品跟卖', '产品上传','产品同步','产品分享'],
        checked3: ['接收订单', '处理订单'],
        checked4: ['财务管理'],
        Option1: Option1,
        Option2: Option2,
        Option3: Option3,
        Option4: Option4,
        isIndeterminate: true,
        form: {
          name:''
        },
        maxexpandId: api.maxexpandId,//新增节点开始id
        non_maxexpandId: api.maxexpandId,//新增节点开始id(不更改)
        isLoadingTree: false,//是否加载节点树
        //setTree: api.treelist,//节点树数据
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        staffList:[],
        setTree1:[{
          name: '总部',
          children: [{
            id: 5,
            name: '二级 2-1',
            children: [{
              id: 55,
              name: '三级 2-1'
            }, {
              id: 66,
              name: '三级 2-2'
            }]
          }, {
            id: 6,
            name: '二级 2-2'
          }]
        }],
        defaultExpandKeys: [],//默认展开节点列表
        sf_name:'',
        sf_username:'',
        staff_id:'',
        suid:'',
        ifns:false,
        ifclick:false,
        tableData: [{
          status: '状态',
          name: '账号'
        }]
      }
    },
    props:{
      companyname:{
        type:String,
        required:true
      },
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
      // console.log(api)
      this.initExpand()
    },

    methods: {
      // handleCheckAllChange(val) {
      //   this.checkedCities = val ? cityOptions : [];
      //   this.isIndeterminate = false;
      // },
      handleCheckedCitiesChange(value) {
        this.$message.error("权限接口尚未完善")
        return
        // let checkedCount = value.length;
        // this.checkAll = checkedCount === this.cities.length;
        // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
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
        this.staffList=menu_staff;
        this.setTree.map((a) => {
          this.defaultExpandKeys.push(a.id)
        });
        this.isLoadingTree = true;
      },
      handleNodeClick(d,n,s){//点击节点
        // console.log(d)
        this.ifclick = true;
        d.isEdit = false;//放弃编辑状态
        this.sf_name = d.name;
        this.staff_id = d.id;
        if(this.ifnsary.indexOf(this.staff_id.toString()) >= 0){
          this.ifns = false;
        }else{
          this.ifns = true;
        }

        this.$http.post(this.api.company_set_infor+'('+this.cid+')',{
          ctree:JSON.stringify(this.setTree)
        }).then((res)=>{
        })
      },
      renderContent(h, { node, data, store }) {
        console.log('node:', node);
        console.log('data:', data);
        console.log('store:', store);
        let btnData = null;
        let btnTitle = '';
        if(data.name=='总部'){
          btnTitle = "添加新员工"
        }else{
           btnData = data;
           btnTitle = '删除';
        }
        return (<span class="custom-tree-node">
          <span>{data.name}</span>
        <span>
        <el-button size="mini" type="text" on-click={ () => this.treeBtnClick(btnData)}>{btnTitle}</el-button>
        </span>
        </span>);

      },
      // handleAddTop(){
      //   this.setTree.push({
      //     id: 0,
      //     name: '领导',
      //     pid: '',
      //     isEdit: false,
      //     children: []
      //   })
      // },
      handleAdd(s,d,n){//增加节点
        var tk = localStorage.getItem("token");
        var uid = localStorage.getItem("uid");

        // console.log(this.setTree);
        if(n.level >=2){
          this.$message.error("目前只支持两级！")
          return false;
        }

        this.$http.post('http://39.106.9.139/apis/restful/add/company_'+this.cid+'/staff',{
          staff_name:"",
          staff_info:"1"
        }).then((res)=>{
          console.log(res);
          //添加数据
          d.children.push({
            id: res.value.id,
            name: '员工',
            pid: d.id,
            isEdit: false,
            children: []
          });
          //展开节点
          if(!n.expanded){
            n.expanded = true;
          }
          //修改公司树
          this.$http.post(this.api.company_set_infor+'('+this.cid+')',{
            ctree:JSON.stringify(this.setTree)
          }).then((res)=>{
          })
        })
      },
      handleEdit(s,d,n){//编辑节点
        var tk = localStorage.getItem("token");

        //修改公司树
        this.$http.post(this.api.company_set_infor+'('+this.cid+')',{
          ctree:JSON.stringify(this.setTree)
        }).then((res)=>{
        })
      },
      handleDelete(s,d,n){//删除节点
        // console.log(s,d,n)
        let that = this;
        //有子级不删除
        if(d.children && d.children.length !== 0){
          this.$message.error("此节点有子级，不可删除！")
          return false;
        }else{
          //新增节点直接删除，否则要询问是否删除
          let delNode = () => {
            let list = n.parent.data.children || n.parent.data,//节点同级数据
              _index = 99999;//要删除的index
            /*if(!n.parent.data.children){//删除顶级节点，无children
              list = n.parent.data
            }*/
            list.map((c,i) => {
              if(d.id == c.id){
                _index = i;
              }
            })
            let k = list.splice(_index,1);
            //console.log(_index,k)
            this.$message.success("删除成功！")
          }
          let isDel = () => {
            that.$confirm("是否删除此节点？","提示",{
              confirmButtonText: "确认",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              delNode()
            }).catch(() => {
              return false;
            })
          }
          //判断是否新增
          d.id > this.non_maxexpandId ? delNode() : isDel()
        }
        //修改公司树
        this.$http.post(this.api.company_set_infor+'('+this.cid+')',{
          ctree:JSON.stringify(this.setTree)
        }).then((res)=>{
        })
      },
      handleEditPass(s,d,n){//编辑完成
        console.log(1)
        d.isEdit = false;
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
