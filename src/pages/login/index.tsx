import React from 'react';
import { Button } from 'antd';
import { history } from 'umi';
import { getWebAppConfig, localCache } from '@/utils';

const Login = () => {
  const webAppConfig = getWebAppConfig();

  const onSignIn = () => {
    localCache.setItem('tooken', 'yes');
    history.push('/');
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <pre style={{ width: '100%', height: '100%' }}>
        {JSON.stringify(webAppConfig, null, 2)}
      </pre>
      <Button type="primary" onClick={onSignIn}>
        登录
      </Button>
    </div>
  );
};

export default Login;
