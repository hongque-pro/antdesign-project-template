import { HomeOutlined } from '@ant-design/icons';
import type { MenuDataItem } from '@ant-design/pro-layout/lib/typings';
import { clientSession } from 'infra-sdk-core';
import React from 'react';
import Constants from './utils/constants';
import { redirectToLogin } from './services/account';
import Root from './root';
import { Route } from "@ant-design/pro-layout/lib/typings";


const menuIconMap: Record<string, React.ReactNode> = {
    home: <HomeOutlined />,
};

const loopMenuItem = (menus: MenuDataItem[]): Route[] =>
    menus.map(({ icon, routes, ...item }) => ({
        ...item,
        icon: icon ? menuIconMap[icon as string] : icon,
        routes: routes ? loopMenuItem(routes) : routes,
    }));

export function patchRoutes(args: any) {
    console.log(args);
    const { routes } = args;
    Constants.routes = loopMenuItem(routes);
}

export function rootContainer(container: React.ReactNode) {
    return React.createElement(
        Root,
        null,
        container,
    );
}

// export function onRouteChange(args: any) {
//     console.log("route", args);
// }


export function render(oldRender: () => void) {
    fetch('/api/auth').then(auth => {
        if (!clientSession.user.isAnonymous) { 
            oldRender() 
        }else {
            redirectToLogin();
            oldRender();
        }
    });
}
