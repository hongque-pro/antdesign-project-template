import { request } from "@/utils/request";
import { clientSession, LoginParam, makeSucceedResponseWithData, OAuth2RequestOptions, UserPrincipal } from "infra-sdk-core";
import { HttpResponse } from "infra-sdk-core/lib/request/types";
import { history } from 'umi';
import { stringify } from 'querystring';

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
    const { query = {}, search, pathname } = history.location;
    console.log(history.location);
    const { redirect } = query;
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
        const loginPaht = "/user/login";
        if (pathname === "/" && search === "") {
            history.replace(loginPaht);
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