import menu_register from './menu_register';
const menu = [
  {
    "routerName": "company_management",
    "name": "公司管理",
    "permission":"permission_company_manager",
    "icon": "",
    "list1": [
      {
        "routerName": "company_home",
        "name": "公司主页",
      },
      // {
      //   "routerName": "company_shop",
      //   "name": "公司店铺",
      // },
      {
        "routerName": "company_product",
        "name": "公司产品",
      },
      {
        "routerName": "company_order",
        "name": "公司订单",
        "list2": [
          {
            "routerName": "fbm_order_boss",
            "name": "FBM订单",
          },
          {
            "routerName": "fba_order_boss",
            "name": "FBA订单",
          }
        ]
      }
    ]
  },
  {
    "routerName": "financial_management",
    "name": "财务管理",
    "permission":"permission_company_finance_manager",
    "icon": "",
    "list1": [
      {
        "routerName": "corporate_finance",
        "name": "公司财务",
        "icon": "",
        "list2": [
          {
            "routerName": "cost_reconciliation",
            "name": "费用对账",
          },
          {
            "routerName": "deductions_detail",
            "name": "扣款明细",
          }
        ]
      },
      {
        "routerName": "business_report_boss",
        "name": "业绩报表",
      }
    ]
  },
  {
    "routerName": "power_management",
    "name": "权限管理",
    "permission": "permission_power_management",
    "icon": "",
    "list1": [
      {
        "routerName": "amazon_auth",
        "name": "亚马逊授权",
        "icon": "",
      },
      {
        "routerName": "staff_power",
        "name": "员工权限",
      }
    ]
  }
];

export default menu.concat(menu_register);

