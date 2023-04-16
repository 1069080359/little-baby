import { useState, useEffect } from 'react';
import { ConfigProvider, Spin } from 'antd';
import { useOutlet } from 'umi';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import PageHelmet from '@/components/page-helmet';
import { getWebAppConfig } from '@/utils';
import type { WebAppConfig } from '@/config/webapp-config/types';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const AppConfigLayout = () => {
  const outlet = useOutlet();
  const [webAppConfig, setWebAppConfig] = useState<WebAppConfig>();

  useEffect(() => {
    const loadWebConfig = () => {
      requestAnimationFrame(() => {
        const config = getWebAppConfig();
        if (config) {
          const { projectPathName, webAppName } = config.appSettings;
          const deployPath = `${projectPathName}${webAppName}`;
          setWebAppConfig(config);
          return;
        }
        loadWebConfig();
      });
    };

    loadWebConfig();
  }, []);

  if (!webAppConfig) {
    return <Spin />;
  }

  return (
    <ConfigProvider locale={zhCN}>
      <PageHelmet />
      {outlet}
    </ConfigProvider>
  );
};

export default AppConfigLayout;
