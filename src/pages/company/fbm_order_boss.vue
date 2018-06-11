<template>
<div>
    <fbm-order :companyId="companyId"/>
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
            }
        },
        methods:{
          
        },
        created() {
           this.companyId = localStorage.getItem("owner_company_id")
          
        },

    }
</script>
