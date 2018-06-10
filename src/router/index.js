import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import echarts from 'echarts';

Vue.use(Router);
Vue.prototype.$echarts = echarts

//require路由按需加载
const main = r => require.ensure([], () => r(require('../pages/Main')), 'main');
const login = r => require.ensure([], () => r(require('../pages/Login')), 'login');
const login_back = r => require.ensure([], () => r(require('../pages/Login_back')), 'login_back');
const registered = r => require.ensure([], () => r(require('../pages/Register')), 'registered');


//global
const G_user_list = r => require.ensure([], () => r(require('../pages/Global/User_list')), 'G_user_list');
const user_edit = r => require.ensure([], () => r(require('../pages/account_management/User_edit')), 'user_edit');
const G_company_list = r => require.ensure([], () => r(require('../pages/Global/Company_list')), 'G_company_list');
const G_company_edit = r => require.ensure([], () => r(require('../pages/Global/Company_edit')), 'G_company_edit');
const G_company_add = r => require.ensure([], () => r(require('../pages/Global/Company_add')), 'G_company_add');
const corporate_finance = r => require.ensure([], () => r(require('../pages/financial_management/corporate_finance')), 'corporate_finance');
const G_order_list = r => require.ensure([], () => r(require('../pages/Global/Order_list')), 'G_order_list');
const G_order_edit = r => require.ensure([], () => r(require('../pages/Global/Order_edit')), 'G_order_edit');
const G_warehouse = r => require.ensure([], () => r(require('../pages/Global/Warehouse')), 'G_warehouse');

//company
const amazon_auth = r => require.ensure([], () => r(require('../pages/power_management/amazon_auth')), 'amazon_auth');
const C_rechange = r => require.ensure([], () => r(require('../pages/company/Rechange')), 'C_rechange');
const C_Finance = r => require.ensure([], () => r(require('../pages/company/Finance')), 'C_Finance');
const staff_power = r => require.ensure([], () => r(require('../pages/power_management/staff_power')), 'staff_power');
const C_Creport = r => require.ensure([], () => r(require('../pages/company/Creport')), 'C_Creport');
const C_Preport = r => require.ensure([], () => r(require('../pages/company/Preport')), 'C_Preport');

const company_home = r => require.ensure([], () => r(require('../pages/company/company_home')), 'company_home');
const company_product = r => require.ensure([], () => r(require('../pages/company/company_product')), 'company_product');
const fbm_order = r => require.ensure([], () => r(require('../pages/company/fbm_order')), 'fbm_order');

//commodity
const Cd_product_list = r => require.ensure([], () => r(require('../pages/commodity/Product_list')), 'Cd_product_list');
const Cd_product_list1 = r => require.ensure([], () => r(require('../pages/commodity/Product_list1')), 'Cd_product_list1');
const Cd_product_list2 = r => require.ensure([], () => r(require('../pages/commodity/Product_list2')), 'Cd_product_list2');
const Cd_product_list3 = r => require.ensure([], () => r(require('../pages/commodity/Product_list3')), 'Cd_product_list3');
const Cd_product_list4 = r => require.ensure([], () => r(require('../pages/commodity/Product_list4')), 'Cd_product_list4');
const Cd_product_list5 = r => require.ensure([], () => r(require('../pages/commodity/Product_list5')), 'Cd_product_list5');
const Cd_product_edit = r => require.ensure([], () => r(require('../pages/commodity/Product_edit')), 'Cd_product_edit');
const Cd_product_add = r => require.ensure([], () => r(require('../pages/commodity/Product_add')), 'Cd_product_add');
const Cd_order_list = r => require.ensure([], () => r(require('../pages/commodity/Order_list')), 'Cd_order_list');
const Cd_order_list2 = r => require.ensure([], () => r(require('../pages/commodity/Order_list2')), 'Cd_order_list2');
const Cd_order_list_boss = r => require.ensure([], () => r(require('../pages/commodity/Order_list_boss')), 'Cd_order_list_boss');
const fba_order = r => require.ensure([], () => r(require('../pages/company/fba_order')), 'fba_order');
const Cd_order_edit = r => require.ensure([], () => r(require('../pages/commodity/Order_edit')), 'Cd_order_edit');
const Cd_order_add = r => require.ensure([], () => r(require('../pages/commodity/Order_add')), 'Cd_order_add');
const cost_reconciliation = r => require.ensure([], () => r(require('../pages/financial_management/cost_reconciliation')), 'cost_reconciliation');
const Cd_Creport2 = r => require.ensure([], () => r(require('../pages/commodity/Creport2')), 'Cd_Creport2');
const Cd_Preport = r => require.ensure([], () => r(require('../pages/commodity/Preport')), 'Cd_Preport');
const Cd_Preport2 = r => require.ensure([], () => r(require('../pages/commodity/Preport2')), 'Cd_Preport2');
const business_report = r => require.ensure([], () => r(require('../pages/financial_management/business_report')), 'business_report');
const deductions_detail = r => require.ensure([], () => r(require('../pages/financial_management/deductions_detail')), 'deductions_detail');
const Cd_User_edit = r => require.ensure([], () => r(require('../pages/commodity/User_edit')), 'Cd_User_edit');
const Cd_User_edit2 = r => require.ensure([], () => r(require('../pages/commodity/User_edit2')), 'Cd_User_edit2');
const Cd_User_edit3 = r => require.ensure([], () => r(require('../pages/commodity/User_edit3')), 'Cd_User_edit3');

//admin
const Cd_Logistics = r => require.ensure([], () => r(require('../pages/commodity/Logistics')), 'Cd_Logistics');
const salesman_list = r => require.ensure([], () => r(require('../pages/account_management/salesman_list')), 'salesman_list');
const Cd_product_list_admin = r => require.ensure([], () => r(require('../pages/commodity/Product_list_admin')), 'Cd_product_list_admin');
const outside_user = r => require.ensure([], () => r(require('../pages/account_management/outside_user')), 'outside_user');
const inside_user = r => require.ensure([], () => r(require('../pages/account_management/inside_user')), 'inside_user');
const G_company_list2 = r => require.ensure([], () => r(require('../pages/Global/Company_list2')), 'G_company_list2');
const recordApproval = r => require.ensure([], () => r(require('../pages/financial_management/recordApproval')), 'recordApproval');
const Cd_Preport3 = r => require.ensure([], () => r(require('../pages/commodity/Preport3')), 'Cd_Preport3');

//out
const Warehouse = r => require.ensure([], () => r(require('../pages/Warehouse')), 'Warehouse');
const Company_add = r => require.ensure([], () => r(require('../pages/Company_add')), 'Company_add');
const Message = r => require.ensure([], () => r(require('../pages/Message')), 'Message');

export default new Router({
    routes: [
        {
          path: '/',
          component: login, //登陆
        },
        {
          path: '/login_back',
          component: login_back, //后台登陆
        },
        {
            path: '/registered',
            component: registered, //注册
        },
        {
            path: '/main',
            component: main, //
            children: [
                {
                   path: 'G_user_list',
                   component: G_user_list,
                },{
                   path: 'user_edit',
                   component: user_edit,
                },{
                   path: 'G_company_list',
                   component: G_company_list,
                },{
                   path: 'G_company_edit',
                   component: G_company_edit,
                },{
                   path: 'G_company_add',
                   component: G_company_add,
                },{
                   path: 'corporate_finance',
                   component: corporate_finance,
                },{
                   path: 'G_order_list',
                   component: G_order_list,
                },{
                   path: 'G_order_edit',
                   component: G_order_edit,
                },{
                   path: 'G_warehouse',
                   component: G_warehouse,
                },{
                   path: 'amazon_auth',
                   component: amazon_auth,
                },{
                   path: 'C_rechange',
                   component: C_rechange,
                },{
                   path: 'C_Finance',
                   component: C_Finance,
                },{
                   path: 'staff_power',
                   component: staff_power,
                },{
                   path: 'C_Creport',
                   component: C_Creport,
                },{
                   path: 'C_Preport',
                   component: C_Preport,
                },
                //公司主页
                {
                  path: 'company_home',
                  component: company_home,
                },
                //公司产品
                {
                  path: 'company_product',
                  component: company_product,
                },
                //公司订单
                {
                  path: 'fbm_order',
                  component: fbm_order,
                },
                {
                   path: 'Cd_product_list',
                   component: Cd_product_list,
                },{
                   path: 'Cd_product_list1',
                   component: Cd_product_list1,
                },{
                   path: 'Cd_product_list2',
                   component: Cd_product_list2,
                },{
                   path: 'Cd_product_list3',
                   component: Cd_product_list3,
                },{
                   path: 'Cd_product_list4',
                   component: Cd_product_list4,
                },{
                   path: 'Cd_product_list5',
                   component: Cd_product_list5,
                },{
                   path: 'Cd_product_edit',
                   component: Cd_product_edit,
                },{
                   path: 'Cd_product_add',
                   component: Cd_product_add,
                },{
                   path: 'Cd_order_list',
                   component: Cd_order_list,
                },{
                   path: 'Cd_order_list2',
                   component: Cd_order_list2,
                },{
                   path: 'Cd_order_list_boss',
                   component: Cd_order_list_boss,
                },{
                   path: 'fba_order',
                   component: fba_order,
                },{
                   path: 'Cd_order_edit',
                   component: Cd_order_edit,
                },{
                   path: 'Cd_order_add',
                   component: Cd_order_add,
                },{
                   path: 'cost_reconciliation',
                   component: cost_reconciliation,
                },{
                   path: 'Cd_Creport2',
                   component: Cd_Creport2,
                },{
                   path: 'Cd_Preport',
                   component: Cd_Preport,
                },{
                   path: 'Cd_Preport2',
                   component: Cd_Preport2,
                },{
                   path: 'business_report',
                   component: business_report,
                },{
                   path: 'deductions_detail',
                   component: deductions_detail,
                },{
                   path: 'Cd_User_edit',
                   component: Cd_User_edit,
                },{
                   path: 'Cd_User_edit2',
                   component: Cd_User_edit2,
                },{
                   path: 'Cd_User_edit3',
                   component: Cd_User_edit3,
                },{
                   path: 'Warehouse',
                   component: Warehouse,
                },{
                   path: 'Company_add',
                   component: Company_add,
                },{
                   path: 'Message',
                   component: Message,
                },{
                   path: 'Cd_Logistics',
                   component: Cd_Logistics,
                },{
                   path: 'salesman_list',
                   component: salesman_list,
                },{
                   path: 'outside_user',
                   component: outside_user,
                },{
                   path: 'inside_user',
                   component: inside_user,
                },{
                   path: 'G_company_list2',
                   component: G_company_list2,
                },{
                   path: 'recordApproval',
                   component: recordApproval,
                },{
                   path: 'Cd_Preport3',
                   component: Cd_Preport3,
                }

            ]
        }
    ]
})
