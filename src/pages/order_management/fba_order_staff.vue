<template>
<div>
    <fba-order :companyId="companyId" :staff-id="staffId"/>
</div>
</template>

<script>
    import fbaOrder from '../Global/fba_order';
    import router from "../../router";

    export default {
        components: {
            fbaOrder
        },
        data() {
            return {
                companyId:'',
                staffId:'',
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
