import { name } from '../../package.json';
import type { WebAppConfig } from './types';

//  基础后端服务前缀，需根据项目修改
const projectPathName = process.env.PROJECT_PATH_NAME || '/rain/';
const webAppName = process.env.WEBAPP_NAME || name;
const baseUrl = `${projectPathName}project-service`;

/**
 * 开发环境 应用配置文件
 * 如果增删，建议先修改类型声明文件，这样开发期间，使用时有更好的编码体验
 */
const webConfig: WebAppConfig = {
  /** 接口服务地址配置 */
  serviceSettings: {
    /** 基础后端服务 */
    apiBaseUrl: baseUrl,
    /** 文件服务 */
    fileServer: { url: `${baseUrl}/fileServer` },
    /** 运维 */
    ops: { url: `${projectPathName}ywpt` },
    /** 单点登录 */
    sso: { url: `${projectPathName}sso`, type: 'cas' },
  },
  /** 应用参数配置 */
  appSettings: {
    /** 项目部署路径 */
    projectPathName: projectPathName,
    /** 应用部署路径 */
    webAppName: webAppName,
    /** 应用id */
    webAppId: 'KFPT',
    /** 应用名称 */
    webAppTitle: 'Umi 4.x',
    /** 应用的 meta 标签 */
    webAppMetas: [{ name: 'keywords', content: 'Umi 4.x' }],
  },
};

export default webConfig;
