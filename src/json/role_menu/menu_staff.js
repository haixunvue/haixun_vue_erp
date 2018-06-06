export default  [
  {
    "routerName": "product_management",
    "name": "商品管理",
    "permission":"permission_product_manager",
    "icon": "",
    "list1": [
      {
        "routerName": "my_product",
        "name": "我的产品",
        "list2": [
          {
            "routerName": "pruduct_sum",
            "name": "商品总汇",
          },
          {
            "routerName": "pruduct_sync",
            "name": "待同步产品",
          },
          {
            "routerName": "product_add",
            "name": "创建新商品"
          },
          {
            "routerName": "product_recycle",
            "name": "产品回收站"
          }
        ]
      },
      {
        "routerName": "amazon_product",
        "name": "亚马逊商品",
        "list2": [
          {
            "routerName": "product_online",
            "name": "在线产品",
          },
          {
            "routerName": "product_unpublic",
            "name": "待发布产品",
          },
          {
            "routerName": "product_sale",
            "name": "产品跟卖"
          }
        ]
      },
      {
        "routerName": "product_share",
        "name": "产品分享",
      },
      {
        "routerName": "general_setting",
        "name": "通用设置",
      },
    ]
  },
  {
    "routerName": "order_management",
    "name": "订单管理",
    "permission":"permission_order_manager",
    "icon": "",
    "list1": [
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
        "routerName": "business_report",
        "name": "业绩报表",
      }
    ]
  },
  {
    "routerName": "staff_report",
    "name": "业绩报表",
    "permission":"",
    "icon": "",
    "list1": [
      {
        "routerName": "add_product",
        "name": "新增产品",
        "icon": "",
      },
      {
        "routerName": "store_performance",
        "name": "店铺业绩",
      }
    ]
  },
  {
    "routerName": "power_management",
    "name": "权限管理",
    "permission":"",
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
  },
  {
    "routerName": "user_center",
    "name": "用户中心",
    "permission":"",
    "icon": "",
    "list1": [
      {
        "routerName": "user_info",
        "name": "个人信息",
      },
      {
        "routerName": "asset_management",
        "name": "资产管理",
        "icon": "",
      },
    ]
  },
  {
    "routerName": "help_center",
    "permission":"",
    "name": "帮助"
  }
];

