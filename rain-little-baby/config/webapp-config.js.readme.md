# 项目配置修改指南

可参考下方配置项类型声明及备注，修改配置的值。

```ts
/** 应用配置类型声明  */
export type WebAppConfig = {
  /** 接口服务地址配置 */
  serviceSettings: {
    /** 基础后端服务 */
    apiBaseUrl: string;
    /** 单点登录 */
    sso: {
      /** 服务地址 */
      url: string;
      /** 单点登录类型 */
      type: 'sso' | 'cas';
    };
    /** 运维 */
    ops: {
      /** 服务地址 */
      url: string;
    };
    /** 文件服务 */
    fileServer: {
      /** 服务地址 */
      url: string;
    };
  };
  /** 应用参数配置 */
  appSettings: {
    /** 项目部署路径 */
    projectPathName: string;
    /** 应用id */
    webAppId: string;
    /** 应用名称 */
    webAppTitle: string;
    /** 应用部署路径 */
    webAppName: string;
    /** 应用的 meta 标签 */
    webAppMetas?: { name: string; content: string }[];
    /**
     * 首页地址，如无权限或404页面，首页的跳转地址；
     * 如未配置，则不显示返回首页按钮 */
    homeUrl?: string;
  };
};

```

