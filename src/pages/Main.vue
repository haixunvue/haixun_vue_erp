<!--
**************************************
*   名称：加盟商管理盒子
*   作用：加盟商管理框架嵌入
*   作者：耿啸
**************************************
-->
<template>
    <div class="box">
        <el-container>
          <el-header class="header">
              <head-top></head-top>
          </el-header>
          <el-container>
            <el-aside width="220px">
                <!-- <aside-nav class="aside"></aside-nav> -->
                <left-Nav></left-Nav>
            </el-aside>
             <el-main>
                 <router-view v-if="isRouterAlive"></router-view>
            </el-main>
          </el-container>
        </el-container>
    </div>
</template>

<script>
    import leftNav from '../components/leftNav';
    import asideNav from '../components/asideNav';
    import headTop from '../components/headTop';
    import router from "../router";

    export default {
        components: {
            leftNav,
            // asideNav,
            headTop
        },
        created(){
             eventBus.$on('refreshView', this.refreshView)
        },
        beforeDestroy:function () {
            eventBus.$off('refreshView', this.refreshView)
        },
        methods: {
 
          refreshView(){
            console.log('main refreshView')
            this.isRouterAlive = false
            //在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM
            this.$nextTick(()=>{
                this.isRouterAlive = true
            })
            }
        },
        data() {
            return {
                isRouterAlive:true,
            }
        },
    }
</script>
<style scoped>
    .aside{
        /*width:225px;
        float: left;*/
    }
    .box{
        height: 100%;
    }
    .el-container{
        
        height: 100%;
    }
    .el-aside{
        background-color: #222222;
    }
    .header{
        /*height: 8vh;*/
        background-color: #222222;
    }
</style>