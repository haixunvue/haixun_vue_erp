<template>
    <div>
        <h1>公司员工</h1>
        <div class="line"></div>
        <tree :isGlobal="isGlobal" ></tree>
    </div>
</template>

<script>
    import tree from '../../components/tree';
    import router from "../../router";
    import Qs from 'qs';

    export default {
        components: {
            tree
        },
        data() {
            return {
                isGlobal:true,
            }
        },
        methods:{
           
          
        },
        mounted() {
          
        },

    }
</script>
<style scoped>
  .line{
    margin: 20px 0;
    border-top: 1px solid #dcdfe6;
  }

</style>