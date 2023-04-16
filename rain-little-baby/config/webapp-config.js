(function () {
  window.__WEBAPP_CONFIG__ = {
    serviceSettings: {
      apiBaseUrl: '/rain/project-service',
      fileServer: { url: '/rain/project-service/fileServer' },
      ops: { url: '/rain/ywpt' },
      sso: { url: '/rain/sso', type: 'cas' },
    },
    appSettings: {
      projectPathName: '/rain/',
      webAppName: 'little-baby',
      webAppId: 'KFPT',
      webAppTitle: 'Umi 4.x',
      webAppMetas: [{ name: 'keywords', content: 'Umi 4.x' }],
    },
  };
})();
