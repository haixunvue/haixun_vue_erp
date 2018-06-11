const api={
    'user_add':'/v1806/user/add',
    'user_infor_set':'/restful/set/_account/user',
    'user_list':'/restful/list/_account/user',
    'user_infor':'/restful/get/_account/user',
    'user_add_company':'/restful/add/_account/user_company',
    'company_add':'/restful/add/_company/company',
    'company_list':'/restful/list/_company/company',
    'company_set_infor':'/restful/set/_company/company',
    // 'company_add_staff':'/restful/set/_company/company',
    'user_company_list':'/restful/list/_account/user_company',
    'user_company_inforSet':'/restful/set/_account/user_company',
    'company_infor':'/restful/get/_company/company',
    'link_company_staff_to_user':'/restful/add/_linked/company_staff_to_user',
    'link_add_user_to_company_staff':'/restful/add/_linked/user_to_company_staff',
    'link_list_company_staff_to_user':'/restful/list/_linked/company_staff_to_user',
    'link_list_user_to_company_staff':'/restful/list/_linked/user_to_company_staff',
    'message_company_staff_link':'/restful/add/_message/company_staff_link',
    'message_list_company_staff_link':'/restful/list/_message/company_staff_link',
    'message_del_company_staff_link':'/restful/del/_message/company_staff_link',

    // 新接口 v1807g
    'register':'/apis/v1807g/account/add',//注册用户
    'login':'/apis/v1807g/account/login',
    'account_role':'/apis/v1807g/account_role/list',
    'amazon_auth':'/apis/v1807g/company_shop/add',	//公司店铺添加，亚马逊授权
    'amazon_re_authorize':'/apis/v1807g/company_shop/re_authorize',	//公司店铺添加，亚马逊授权
    'company_shop_list':'/apis/v1807g/company_shop/list',	//公司
    'company_shop_list_paging':'/apis/v1807g/company_shop/list/paging',	//公司
    'company_shop_delete':'/apis/v1807g/company_shop/delete',	//公司店铺
    'company_staff_list':'/apis/v1807g/company_staff/list',
    'link_list_user_to_company_staff':'/restful/list/_linked/user_to_company_staff',
    'company_money_recharge':'/apis/v1807g/company_money_recharge/listall/paging',
    'company_staff_add':'/apis/v1807g/company_staff/add',
    'company_staff_delete':'/apis/v1807g/company_staff/delete',
    'company_staff_get_infos':'/apis/v1807g/company_staff/get_infos',
    'company_staff_linker_list':'/apis/v1807g/company_staff_linker/list',
    'company_staff_linker_add':'/apis/v1807g/company_staff_linker/add',
    'company_money_recharge_channel_list':'/apis/v1807g/company_money_recharge_channel/list',
    'company_money_recharge_channel_list_paging':'/apis/v1807g/company_money_recharge_channel/list/paging',
    'company_staff_linker_delete':'/apis/v1807g/company_staff_linker/delete',
    'company_staff_set_infos':'/apis/v1807g/company_staff/set_infos',
    'company_money_recharge_add':'/apis/v1807g/company_money_recharge/add',
    'cost_statistics_logistics_paging':'/apis/v1807g/company_money_cost_statistics_logistics/listall/paging',
    'cost_statistics_paging':'/apis/v1807g/company_money_cost_statistics/listall/paging',
    'cost_statistics_platform_paging':'/apis/v1807g/company_money_cost_statistics_platform/listall/paging',
    'company_list_paging':'/apis/v1807g/company/list/paging',

    'account_staff_list':'/apis/v1807g/account/list/paging',
    'get_company_list':'/apis/v1807g/company/list',
    'account_get_infos':'/apis/v1807g/account/get_infos',
    'account_set_infos':'/apis/v1807g/account/set_infos',

    'company_add':'/apis/v1807g/company/add', //公司获取信息
    'company_delete':'/apis/v1807g/company/delete', //公司获取信息
    'get_company_info':'/apis/v1807/company/get_infos', //公司获取信息
    'set_company_info':'/apis/v1807/company/set_infos', //		 公司设置信息
    'product_list':'/apis/v1807g/product/list/paging',   // 产品列表
    'examine_pass':'/apis/v1807g/company_money_recharge/examine_pass',   // 产品列表
    'examine_nopass':'/apis/v1807g/company_money_recharge/examine_nopass',   // 产品列表

};
export default api;
