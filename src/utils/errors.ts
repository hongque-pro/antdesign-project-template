const errors = {
    //commons
    system_error: "系统错误",
  
    //auth
    unauthorized: "客户端请求需要授权",
    error_uri: "请求地址不正确",
    invalid_request: "错误的请求格式",
    invalid_client: "客户端认证失败",
    invalid_grant: "用户名或密码错误",
    unauthorized_client: "客户端端授权失败",
    unsupported_grant_type: "不支持该授权类型",
    invalid_scope: "授权请求的范围无效",
    insufficient_scope: "授权的范围不足以完成该操作",
    invalid_token: "会话状态异常，请重试或重新登录",
    redirect_uri_mismatch: "请求缺少重定向地址",
    unsupported_response_type: "不支持的响应类型",
    access_denied: "你没有权限进行该操作",
    //...其他自定义错误自行补充
  };
export default errors;  