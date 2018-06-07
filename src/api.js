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
    'company_shop_delete':'/apis/v1807g/company_shop/delete',	//公司店铺


};
export default api;
