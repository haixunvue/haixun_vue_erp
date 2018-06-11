<template>
<div>
    <fbm-order :companyId="companyId" :staff-id="staffId"/>
</div>
</template>

<script>
    import fbmOrder from '../Global/fbm_order';
    import router from "../../router";

    export default {
        components: {
            fbmOrder
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
