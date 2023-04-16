import { history } from 'umi';
import { WebAppConfigBrowserKey } from '@/config/constants';
import { localCache } from '@/utils';
import type { WebAppConfig } from '@/config/webapp-config/types';

export * from './local-storage';

let innerWebAppConfig: WebAppConfig;
/** 获取应用的配置，运行于浏览器中 */
export const getWebAppConfig = (): WebAppConfig => {
  if (!innerWebAppConfig) {
    innerWebAppConfig = (window as any)[WebAppConfigBrowserKey];
    if (innerWebAppConfig) {
      delete (window as any)[WebAppConfigBrowserKey];
    }
  }
  return innerWebAppConfig;
};

//退出登录
export const logout = async () => {
  console.log('调用退出登录接口以及清空本地存储');
  localCache.removeItem('tooken');
  history.push('/login');
};
