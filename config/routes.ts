import type { UmiConfig } from './types';

/**
 * @name 应用路由的配置
 * @description 单页应用页面地址的跳转都是在浏览器端完成的，不会重新请求服务端获取 html，html 只在应用初始化时加载一次。
 * @description 所有页面由不同的组件构成，页面的切换其实就是不同组件的切换，你只需要在配置中把不同的路由路径和对应的组件关联上。
 * @doc https://umijs.org/docs/guides/routes
 */

export const menuRoutes: UmiConfig['routes'] = [
  {
    path: '/MenuItemOne',
    title: '菜单项一',
    component: './menu-item-one',
  },
  {
    path: '/MenuItemTwo',
    title: '菜单项二',
    component: './menu-item-two',
  },
  {
    path: '/MenuItemThree',
    title: '菜单项三',
    routes: [
      {
        path: '/MenuItemThree/ThreeChildOne',
        title: '三 - 一',
        component: './three-child-one',
      },
      {
        path: '/MenuItemThree/ThreeChildTwo',
        title: '三 - 二',
        component: './three-child-two',
      },
    ],
  },
];

const routes: UmiConfig['routes'] = [
  {
    path: '/',
    component: '@/layouts/app-config',
    routes: [
      {
        path: '/unauthorized',
        component: '@/pages/unauthorized',
        title: '未授权',
      },
      {
        path: '/changelog',
        component: '@/pages/changelog',
        title: '更新日志',
      },
      {
        path: '/login',
        title: '登录页',
        component: './login',
        /** 权限控制，如果登录成功则不会跳转到登陆页 */
        wrappers: ['@/layouts/login-auth'],
      },
      {
        path: '/',
        component: '@/layouts/home-auth',
        routes: [
          {
            path: '/',
            component: '@/layouts/frame-layout',
            routes: [{ path: '/', redirect: '/MenuItemOne' }, ...menuRoutes],
          },
        ],
      },
      { path: '/*', title: '404', component: './404' },
    ],
  },
];
const routes2: UmiConfig['routes'] = [
  {
    path: '/',
    component: '@/pages/home',
    title: 'baby',
  },
];

export default routes2;
