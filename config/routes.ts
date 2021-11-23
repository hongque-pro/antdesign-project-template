export default [
  {
    path: '/',
    component: '@/layouts/DefaultLayout',
    routes: [
      {
        name: '首页',
        icon: 'home',
        path: '/home',
        component: './HomePage',
      },
      {
        name: '测试',
        icon: 'home',
        path: '/aaa',
        component: './Test',
      },
      {
        path: '/',
        hideInMenu: true,
        redirect: '/home',
      },
      { component: './404' },
    ],
  },
  { component: './404' },
];
