<template>
<div>
    <product-management :companyId="companyId" :title="title"/>
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
                title:'公司产品'
            }
        },
        methods:{
          
        },
        created() {
           this.companyId = localStorage.getItem("owner_company_id")
          
        },

    }
</script>
