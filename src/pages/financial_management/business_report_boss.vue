<template>
<div>
    <subcomponent :companyId="companyId" :title="title"/>
</div>
</template>

<script>
    import subcomponent from '../financial_management/business_report_admin';
    import router from "../../router";

    export default {
        components: {
            subcomponent
        },
        data() {
            return {
                companyId:'',
                title:'业绩报表'
            }
        },
        methods:{
          
        },
        created() {
           this.companyId = localStorage.getItem("owner_company_id")
          
        },

    }
</script>
