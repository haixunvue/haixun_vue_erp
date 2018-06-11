<template>
<div>
    <subcomponent :companyId="companyId" :staffId="staffId" :title="title"/>
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
                staffId:'',
                title:'店铺业绩'
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
