<template>
  <div style="margin-right:20px">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="充值记录" name="first">
        <cost-reconciliation1/>
      </el-tab-pane>
      <el-tab-pane label="自动报账" name="second">
        <cost-reconciliation2/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import router from "../../router";
  import costReconciliation1 from './cost_reconciliation_1';
  import costReconciliation2 from './cost_reconciliation_2';
  export default {
     components: {
            costReconciliation1,
            costReconciliation2
   },
    data() {
      return {
        activeName:'first',
        
      }
    },
    methods: {
    },
    mounted() {         
            console.log(moment().format('YYYYMMDDhhmmssSSS'))
     },
  }
</script>
<style scoped>
  a{
    text-decoration: none;
  }

  .header{
    /*height:90px;*/
    border-bottom: 1px solid #b8d0d6;
  }

  .header-top{
    margin-bottom: 20px;
  }

  .header-bottom-select{
    margin-right: 2%;
  }

  .header-right{
    width: 100%;
    height:80px;
    border-left: 1px solid #b8d0d6;
    text-align: center;
    line-height: 80px;
  }

  .table{
    margin-top: 10px;
  }

  .table-header{
    height:20px;
  }

  .table-table{
    margin-top: 20px;
  }

  .dialog-item{
    margin-bottom: 20px;
  }

  .dialog-left{
    margin-right: 50px;
  }

  .dialog-input{
    width:185px;
  }

  .el-upload__tip{
    color:red;
  }

</style>
