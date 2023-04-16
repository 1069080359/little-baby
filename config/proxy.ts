import webAppConfig from './webapp-config';
import type { UmiConfig } from './types';

const { NODE_ENV } = process.env;

/**
 * @name 代理配置
 * @description 可以让你的本地服务器代理到你的服务器上，这样你就可以访问服务器的数据了
 * @see 要注意以下 代理只能在本地开发时使用，build 之后就无法使用了。
 * @doc 代理介绍 https://umijs.org/docs/guides/proxy
 * @doc 代理配置 https://umijs.org/docs/api/config#proxy
 */
const proxy: UmiConfig['proxy'] = {};

// 本地调试，根据配置，自动生成代理
if (NODE_ENV !== 'production') {
  const defaultProxyBase = 'https://www.baidu.com';
  // 自动生成本地代理配置
  const serviceSettings: Record<string, any> = webAppConfig.serviceSettings;

  Object.keys(serviceSettings).forEach((service) => {
    const apiInfo = serviceSettings[service];
    let path: string = '';
    if (typeof apiInfo === 'string') {
      path = apiInfo;
    } else {
      path = apiInfo.url;
    }
    // 完整路径的服务不需要代理
    if (!path.includes('://')) {
      proxy[path] = {
        target: defaultProxyBase,
      };
    }
  });
}

export default proxy;
