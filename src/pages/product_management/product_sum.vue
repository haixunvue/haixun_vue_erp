<template>
<div>
    <product-management :company-id="companyId" :staff-id="staffId" :title="title"/>
</div>
</template>

<script>
    import productManagement from '../Global/product_management';
    import router from "../../router";

    export default {
        components: {
            productManagement
        },
        data() {
            return {
                companyId:'',
                staffId:'',
                title:'商品汇总'
            }
        },
        methods:{
          
        },
        created() {
           this.companyId = localStorage.getItem("owner_company_id")
           this.staffId = localStorage.getItem("user_id");
          
        },

    }
</script>
