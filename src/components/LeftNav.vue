<template>
  <div class="tac">
    <el-row class="aside">
      <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#222222" text-color="#fff" active-text-color="#ffd04b" router>
        <template v-for="(item1, index1) in menuList">
          <template v-if="item1.list1 && item1.list1.length > 0">
            <el-submenu :index="item1.routerName" :default-active="$route.path" unique-opened="true">
              <template slot="title">
                <i :class="item1.icon"></i>
                <span>{{item1.name}}</span>
              </template>
              <template v-for="(item2, index2) in item1.list1">
                <template v-if="item2.list2 && item2.list2.length > 0">
                  <el-submenu :index="item2.routerName" :default-active="$route.path">
                    <template slot="title">{{item2.name}}</template>
                    <el-menu-item :index="item3.routerName" v-for="(item3,index3) in item2.list2" :key="index3">{{item3.name}}</el-menu-item>
                  </el-submenu>
                </template>
                <template v-else>
                  <el-menu-item :index="item2.routerName" :default-active="$route.path">{{item2.name}}</el-menu-item>
                </template>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item1.routerName" >{{item1.name}}</el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-row>
  </div>
</template>
<script>


  //以下是新菜单
  import menu_staff from '@/json/role_menu/menu_staff';
  import menu_boss from '@/json/role_menu/menu_boss';
  import menu_admin from '@/json/role_menu/menu_admin';




  export default {
    data() {
      return {
        menuList:[],
        total_menu:[],
        menutype:''
      }
    },
    created(){
      this.user_info = JSON.parse( localStorage.getItem("user_info"))
      eventBus.$on('updateMenu', this.onUpdateMenu)
    },
    beforeDestroy:function () {
    eventBus.$off('updateMenu', this.onUpdateMenu)
    },
    mounted(){
      if(localStorage.getItem("login_type")=='back'){
        this.total_menu=menu_admin//后台登录，显示后台菜单
      }else if(this.menutype){
        this.total_menu = this.menutype=='boss'?menu_boss:menu_staff;
      }
       this.update_menu();
       
    },
    methods: {
          update_menu(){
              console.log('total_menu',this.total_menu)
              let show_menu =this.total_menu.filter((item)=>{
                // if(!item.permission){
                //   return item;//权限为空说明可以显示该菜单
                // }
                // return this.user_info[item.permission]=="true";

                return true;
              })
              this.menuList = show_menu;
              console.log('show_menu', show_menu)
          },
          onUpdateMenu(e){
            console.log('onUpdateMenu', e)
            this.menutype = e.menutype
            if(e.menutype){
                this.total_menu = e.menutype=='boss'?menu_boss:menu_staff;           
            }else{
                this.total_menu=[]
            }
            
            this.update_menu();
            
          } 
    }

  }
  
</script>
<style scoped>
  .el-menu{
    border: none !important;
  }
</style>
