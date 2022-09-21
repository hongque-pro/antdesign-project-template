import { request } from "@/utils/request";
import { clientSession, isNullOrBlankString, LoginParam, makeSucceedResponseWithData, OAuth2RequestOptions, UserPrincipal } from "infra-sdk-core";
import { HttpResponse } from "infra-sdk-core/lib/request/types";
import { stringify,parse } from "query-string";
import { history, createHistory } from '@umijs/max';

export async function login(user: string, password: string, options?: OAuth2RequestOptions): Promise<HttpResponse<UserPrincipal>> {
    const param: LoginParam = {
        username: user,
        password,
        grant_type: "password"
    }

    //正式环境请打开:
    // const res = await request.login(param, options);
    // const { response, data } = res;
    // if(response.ok){
    //     clientSession.saveToken(data);
    //     console.log("data", data);
    //     return makeSucceedResponseWithData(clientSession.user);
    // }else{
    //     return res as any;
    // }
    //忽略登录
    return makeSucceedResponseWithData(clientSession.user);
}

export function loginOut() {
    clientSession.clearToken();
    redirectToLogin();
};


export function redirectToLogin() {
    if(!history)
    {
        createHistory({ type: "browser"});
    }
    const { location } = history;
    const { search, pathname } = location;
    const query = parse(location.search) || {};
    const { redirect } = query;
    const isLoginPage = location.pathname === '/user/login';
    console.log(`redicre from : ${location.pathname}, query: ${redirect}, isLoginPage: ${isLoginPage}`);
    // Note: There may be security issues, please note
    if (!isLoginPage && !redirect) {
        const loginPath = "/user/login";
        if (pathname === "/" && isNullOrBlankString(search)) {
            history.push(loginPath);
        } else {
            history.replace({
                pathname: '/user/login',
                search: stringify({
                    redirect: pathname + search,
                }),
            });
        }

    }
};