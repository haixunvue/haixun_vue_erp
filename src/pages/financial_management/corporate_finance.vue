<!--
**************************************
*   名称：一个demo
*   作用：展示如何把页面嵌入框架
*   作者：
**************************************
-->
<template>
<div class="content">
  <h1>财务审批</h1>
  <div class="line"></div>
  <el-form ref="form" :model="form" label-width="90px" size="mini">
    <el-col :span="8">
    <el-form-item label="状态">
      <el-select v-model="form.status" placeholder="选择状态">
        <el-option label="已处理" value="shanghai"></el-option>
        <el-option label="未处理" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="选择公司">
      <el-select v-model="form.company" placeholder="选择状态">
        <el-option label="公司A" value="shanghai"></el-option>
        <el-option label="公司B" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="手机或单据" placeholder="选择手机或单据编号">
      <el-input v-model="form.active"></el-input>
    </el-form-item>
    </el-col>
    <!--<el-form-item class="inline">-->
      <!--<el-button type="primary" @click="onSubmit">搜索</el-button>-->
    <!--</el-form-item>-->
    <el-col :span="8">
    <el-form-item label="开始时间">
      <el-date-picker
        v-model="form.starTime"
        type="datetime"
        placeholder="选择开始日期时间"
        align="right"
        :picker-options="pickerOptions">
      </el-date-picker>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="结束时间">
      <el-date-picker
        v-model="form.endTime"
        type="datetime"
        placeholder="选择结束日期时间"
        align="right"
        :picker-options="pickerOptions">
      </el-date-picker>
    </el-form-item>
    </el-col>
    <el-form-item class="inline">
      <el-button type="primary" @click="onSubmit">搜索</el-button>
      <el-button type="primary" @click="onSubmit">重置</el-button>
    </el-form-item>
  </el-form>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    :default-sort = "{prop: 'right', order: 'descending'}"
    >
    <el-table-column
      prop="id"
      label="公司ID"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="admin"
      label="单据编号"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="right"
      label="电话"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="money"
      label="充值金额"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="rcmoney"
      label="凭证图片"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="rcmoney"
      label="备注"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="rcmoney"
      label="状态"
      sortable
      >
    </el-table-column>
    <el-table-column
      label="操作"
      width="90"
      >
      <template slot-scope="scope">
        <el-button type="primary" @click="showToggle(scope.row)" v-if="scope.row.flag" size="small">审核通过</el-button>
        <el-button type="info" @click="showToggle(scope.row)" v-else size="small">不予通过</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="rcmoney"
      label="操作员"
      sortable
    >
    </el-table-column>
    <el-table-column
      prop="rcmoney"
      label="日期"
      sortable
    >
    </el-table-column>
  </el-table>
</div>
</template>

<script>
    import router from "../../router";
    export default {
        data() {
          return {
            tableData: [{
              admin: 'admin1',
              name: '老刘',
              right: '超级管理',
              rcmoney: '2000.00',
              money: '1000.00',
              flag:true
            }, {
              admin: 'admin2',
              name: '老柴',
              right: 'vip1',
              rcmoney: '2000.00',
              money: '2000.00',
              flag:false
            }, {
              admin: 'admin3',
              name: '王小虎',
              right: 'vip2',
              rcmoney: '3000.00',
              money: '3000.00',
              flag:true
            }, {
              admin: 'admin4',
              name: '王小虎',
              right: 'vip3',
              rcmoney: '4000.00',
              money: '4000.00',
              flag:false
            }],
            form:{
              status:'',
              company:'',
              active:'',
              starTime:'',
              endTime:''
            },
            pickerOptions: {
              shortcuts: [{
                text: '今天',
                onClick(picker) {
                  picker.$emit('pick', new Date());
                }
              }, {
                text: '昨天',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24);
                  picker.$emit('pick', date);
                }
              }, {
                text: '一周前',
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', date);
                }
              }]
            },
          }
        },
        methods: {
          confirm() {
            console.log("充值确认");
          },
          showToggle:function(data){
            data.flag = !data.flag;
            // console.log(data.flag)
          }
        }
      }
</script>
<style scoped>
   .line{
      margin: 20px 0;
      border-top: 1px solid #dcdfe6;
    }
  .inline{
    display: inline-block;
  }
</style>
