//后台权限菜单

export default  [
  {
    "routerName": "account_management",
    "name": "账户管理",
    "permission":"permission_backstage_account",
    "icon": "",
    "list1": [
      {
        "routerName": "outside_user",
        "name": "外部用户",
      },
      {
        "routerName": "inside_user",
        "name": "内部用户",
      },
      {
        "routerName": "salesman_list",
        "name": "推销商列表",
      },

    ]
  },
  {
    "routerName": "global_management",
    "name": "全局管理",
    "permission":"permission_backstage_global",
    "icon": "",
    "list1": [
      {
        "routerName": "company_management",
        "name": "公司管理",
      },
      {
        "routerName": "staff_management",
        "name": "员工管理",
      },
      {
        "routerName": "product_management",
        "name": "商品管理",
      },
      {
        "routerName": "order_management",
        "name": "订单管理",
        "list2": [
          {
            "routerName": "fbm_order",
            "name": "FBM订单",
          },
          {
            "routerName": "fba_order",
            "name": "FBA订单",
          }
        ]
      },
      {
        "routerName": "business_management",
        "name": "业绩管理",
      },
      {
        "routerName": "shop_management",
        "name": "店铺管理",
      }
    ]
  },
  {
    "routerName": "financial_management",
    "name": "财务管理",
    "permission":"permission_backstage_finance",
    "icon": "",
    "list1": [
      {
        "routerName": "corporate_finance",
        "name": "财务审批",
        "icon": "",
      },
      {
        "routerName": "recordApproval",
        "name": "审批记录",
      },
      {
        "routerName": "deductions_detail_admin",
        "name": "扣款明细",
        "icon": "",
      },
      {
        "routerName": "business_report_admin",
        "name": "推销商店业绩",
      }
    ]
  },
  {
    "routerName": "logistics_management",
    "permission":"permission_backstage_logistics",
    "name": "物流管理",
    "icon": "",

  },
  {
    "routerName": "system_management",
    "name": "系统运维",
    "permission":"permission_backstage_system_maintenance",
    "icon": "",
    "list1": [
      {
        "routerName": "code_management",
        "name": "UPC/EAN码管理",
      },
      {
        "routerName": "category_management",
        "name": "分类维护",
        "list2": [
          {
            "routerName": "amazon_category",
            "name": "亚马逊分类维护",
          },
          {
            "routerName": "category_attribute",
            "name": "分类属性维护",
          },
          {
            "routerName": "change_info",
            "name": "变体信息维护"
          }
        ]
      },
      {
        "routerName": "service_info",
        "name": "服务器信息",
        "icon": "",
      },

    ]
  },
  {
    "routerName": "salesman_management",
    "name": "推销商管理",
    "permission":"",
    "icon": "",

  },

  {
    "routerName": "help_center",
    "permission":"",
    "name": "帮助"
  }
];

