<template>
    <div>
        <h1>公司员工</h1>
        <div class="line"></div>
        <tree :companyname="companyname" :setTree="setTree" :cid="cid" :ifnsary="ifnsary"></tree>
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
                companyname:'',
                setTree:[],
                cid:'',
                ifnsary:["1"]
            }
        },
        methods:{
           
          
        },
        mounted() {
            this.owner_company_id = localStorage.getItem("owner_company_id")
            this.owner_user_id = localStorage.getItem("owner_user_id")
            this.user_token = localStorage.getItem("user_token");
            this.user_id = localStorage.getItem("user_id");
        },

    }
</script>
<style scoped>
  .line{
    margin: 20px 0;
    border-top: 1px solid #dcdfe6;
  }

</style>