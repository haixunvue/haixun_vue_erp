<template>
  <div class="content">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="费用统计" name="first">
         <deductions-detail1 />
      </el-tab-pane>
      <el-tab-pane label="物流费用明细" name="second">
        <deductions-detail2 />
      </el-tab-pane>
      <el-tab-pane label="平台费用明细" name="third">
        <deductions-detail3 />
      </el-tab-pane>
    </el-tabs>
    <el-button type="primary" class="export-btn" size="mini">导出报表</el-button>
  </div>
</template>

<script>
  import router from "../../router";
  import deductionsDetail1 from './deductions_detail_1';
  import deductionsDetail2 from './deductions_detail_2';
  import deductionsDetail3 from './deductions_detail_3';

  export default {
     components: {
            deductionsDetail1,
            deductionsDetail2,
            deductionsDetail3,
    },
    data() {
      return {
        activeName:'first',
       
      }
    },
    methods: {
  
    },
    mounted() {

    }
  }
</script>
<style scoped>
  .search-result-text{
    font-size: 14px;
    color: #606266;
    padding: 0;
  }
  .content{
    position: relative;
  }

  .export-btn{
    position:absolute;
    right: 20px;
    top: 0;
  }

  .header{
    /*margin-bottom: 150px;*/
  }

  .middle{
    /*margin-bottom: 50px;*/
  }

  .middle-top{
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
  }
</style>
