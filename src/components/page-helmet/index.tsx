import { Helmet, useSelectedRoutes } from 'umi';
import { getWebAppConfig } from '@/utils';

/** 根据路由配置的title，修改页面的标题，格式{} */
const PageHelmet = () => {
  const webAppConfig = getWebAppConfig();
  const routes = useSelectedRoutes();
  const lastRoute = routes.at(-1);

  const { webAppTitle, webAppMetas = [] } = webAppConfig.appSettings;
  let pageTitle: string | undefined = '';
  const routeInfo = lastRoute?.route;
  if (routeInfo) {
    pageTitle = (routeInfo as any).title;
  }

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>
        {webAppTitle}
        {pageTitle ? `- ${pageTitle}` : ''}
      </title>
      {webAppMetas.map((meta) => (
        <meta key={meta.name} name={meta.name} content={meta.content} />
      ))}
    </Helmet>
  );
};

export default PageHelmet;
