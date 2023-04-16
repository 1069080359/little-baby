import { Button, Result } from 'antd';
import { logout, getWebAppConfig } from '@/utils';
import type { FsFC } from '@/types';

const NoFoundPage: FsFC = () => {
  const webappConfig = getWebAppConfig();

  return (
    <Result
      status="404"
      title="404"
      style={{ width: '100%' }}
      subTitle="抱歉, 页面找不到了。"
      extra={
        <>
          {webappConfig.appSettings.homeUrl && (
            <Button type="primary" onClick={() => (window.location.href = webappConfig.appSettings.homeUrl!)}>
              返回首页
            </Button>
          )}
          <Button type="primary" onClick={() => logout('no-auth')}>
            退出
          </Button>
        </>
      }
    />
  );
};

export default NoFoundPage;
