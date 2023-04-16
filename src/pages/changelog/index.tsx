import { useState, useEffect } from 'react';
import Markdown from '@/components/Markdown';
import { getWebAppConfig } from '@/utils';
import './index.less';

const Changelog = () => {
  const [source, setSource] = useState<string>();
  const { appSettings } = getWebAppConfig();

  useEffect(() => {
    const { projectPathName, webAppName } = appSettings;
    fetch(`${projectPathName}${webAppName}/CHANGELOG.md`)
      .then(function (response) {
        return response.text();
      })
      .then((res) => {
        setSource(res);
      })
      .catch(() => undefined);
  }, [appSettings]);

  return (
    <div className="changelog">
      <span className="current-version">
        当前版本：<span className="version-number">v{WEBAPP_VERSION}</span>
      </span>
      {source && <Markdown source={source} />}
    </div>
  );
};
export default Changelog;
