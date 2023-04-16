import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Layout, Menu } from 'antd';
import { useOutlet, useLocation, history } from 'umi';
import { menuRoutes } from '@/config/routes';
import { logout } from '@/utils';
import type { MenuProps } from 'antd';
import type { RouteItem } from '@/config/types';
import type { MenuItem } from './types';
import './style.less';

const { Header, Content, Footer, Sider } = Layout;

const FrameLayout: React.FC = () => {
  const outlet = useOutlet();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const loopRoutes = (routes: RouteItem[]) => {
    const menuItems = routes.map((item) => {
      const i: MenuItem = {
        label: item.title,
        key: `${item.path}`,
        icon: item?.icon,
      };
      if (item?.routes) {
        i.children = [...loopRoutes(item.routes)];
      }
      return i;
    });
    return menuItems;
  };

  const onMenuClick: MenuProps['onClick'] = (item) => {
    const linkPath = item.key;
    setSelectedKeys([linkPath]);
    history.push(linkPath);
  };

  useEffect(() => {
    setSelectedKeys([menuRoutes.at(0).path]);
  }, []);

  return (
    <Layout className="frame-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          items={loopRoutes(menuRoutes)}
          selectedKeys={selectedKeys}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Button type="primary" onClick={logout}>
            登出
          </Button>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360, height: '100%' }}
          >
            {outlet}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>footer</Footer>
      </Layout>
    </Layout>
  );
};

export default FrameLayout;
