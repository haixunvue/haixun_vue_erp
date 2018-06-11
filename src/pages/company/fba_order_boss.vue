<template>
<div>
    <fba-order :companyId="companyId"/>
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
            }
        },
        methods:{
          
        },
        created() {
           this.companyId = localStorage.getItem("owner_company_id")
          
        },

    }
</script>
