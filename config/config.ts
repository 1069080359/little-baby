import { defineConfig } from 'umi';
import { join } from 'path';
import theme from './theme';
import pkg from '../package.json';
import routes from './routes';
import { WebAppConfigJsName } from './constants';
import webAppConfig from './webapp-config';
import proxy from './proxy';
import type { IConfig } from '@umijs/preset-umi';

// 获取当前编译、构建相关的环境变量
const { projectPathName, webAppName } = webAppConfig.appSettings;
const { WEBAPP_ENV = 'prod' } = process.env;
const WEBAPP_VERSION: string = pkg.version;

// 路由地址类型
const historyType: 'browser' | 'hash' = 'hash';
// @ts-ignore
const isBrowserRouter = historyType === 'browser';
const isLocal = WEBAPP_ENV === 'local';
const deployPath = `${projectPathName}${webAppName}/`;

let base = '/';
let publicPath = './';
if (isBrowserRouter) {
  // 如使用 正常路由地址模式，则路由前缀和静态资源目录需要设置为应用实际部署的路径；
  // 如需调整部署路径，则需要重新打包；
  base = deployPath;
  publicPath = deployPath;
} else {
  // 如使用 hash地址模式，则路由前缀使用 / 和静态资源目录使用 ./ 即可；
  // 如需调整部署路径，则无需重新打包，修改 webapp-config.js 中的配置即可；
  base = '/';
  publicPath = './';
}

// 本地开发时, 默认使用 /
if (isLocal || process.env.NODE_ENV !== 'production') {
  publicPath = '/';
  base = '/';
}
const outputPath =
  deployPath.length > 1
    ? deployPath.split('/').filter(Boolean).join('-')
    : 'dist';

let devtool: IConfig['devtool'] = 'cheap-module-source-map';
if (WEBAPP_ENV === 'prod') {
  devtool = false;
} else if (WEBAPP_ENV === 'test') {
  devtool = 'eval';
} else if (WEBAPP_ENV === 'dev') {
  devtool = 'cheap-module-source-map';
}
export default defineConfig({
  outputPath,
  publicPath,
  devtool,
  base,
  hash: true,
  history: { type: historyType },
  routes,
  headScripts: [
    `\n/* version:${WEBAPP_VERSION} */\nvar scriptDom=document.createElement('script');scriptDom.src="${publicPath}config/${WebAppConfigJsName}?t="+Date.now();document.head.appendChild(scriptDom);`,
  ],
  alias: {
    '@/config': join(__dirname),
  },
  // 忽略 moment 的 locale 文件，用于减少尺寸。
  ignoreMomentLocale: true,
  /**
   * @name 静态文件目录
   * @doc https://umijs.org/docs/api/config#publicPath。
   */
  define: {
    WEBAPP_VERSION,
    WEBAPP_ENV,
  },
  proxy,
  antd: {},
  theme,
  npmClient: 'yarn',
  plugins: [
    require.resolve('@umijs/plugins/dist/antd'),
    './src/umi-plugin-reponesive',
  ],
  reponesive: {
    // 设计稿尺寸
    design: {
      width: 750,
      height: 1334,
    },
    // 最小尺寸，少于该尺寸，不再进行缩放适配
    // 跟进设计稿最小字体 宽高 与 页面最小字体计算页面最小宽高
    min: {
      width: 642, // 12 / 14 * 750
      height: 1143, // 12 / 14 * 1334
    },
    // 容差，小于 tolerance 配置的宽、高不会再适配
    tolerance: {
      width: 100,
      height: 160,
    },
    // 适配模式， both 兼顾宽、高进行适配，哪个缩放值小，使用哪个；width 只根据宽进行缩放适配
    mode: 'both',
    // 设计稿字体大小
    rootValue: 14,
    // 转换rem后，保存小数位
    unitPrecision: 2,
  },
});
