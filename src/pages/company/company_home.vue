<template>
    <div>
      <el-tabs :tab-position="tabPosition" style="height: 200px;">
        <el-tab-pane label="公司主页">
          <div class="company-home">

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
          tabPosition: 'top'
        };
      }
    }
</script>

<style scoped  lang="less">

</style>
