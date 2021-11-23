import { useCallback } from 'react';
import ProLayout, {
  DefaultFooter,
  PageContainer,
  ProBreadcrumb,
} from '@ant-design/pro-layout';
import { Avatar } from 'antd';
import Constants from '@/utils/constants';
import type { Route } from '@ant-design/pro-layout/lib/typings';
import { Link } from 'umi';
import type { ComponentProperties } from '@/types/react';
import { useStores } from '@/models/global';
import { UserOutlined } from '@ant-design/icons';

export default function HomeLayout(props: ComponentProperties) {
  const { ui } = useStores();

  const renderFooter = useCallback(() => {
    return (
      <DefaultFooter
        links={[{ key: '1', title: '关于我们', href: 'www.alipay.com' }]}
        copyright="2021 百岁通出品."
      />
    );
  }, []);

  const routes = Constants.routes as Route[];

  const currentRoute = routes.find((r) => r.path?.startsWith('/'));

  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        waterMarkProps={{ content: Constants.project.shortName }}
        locale={false as any}
        route={currentRoute}
        footerRender={renderFooter}
        menuHeaderRender={(logoDom, titleDom) => (
          <Link to="/">
            {logoDom}
            {titleDom}
          </Link>
        )}
        rightContentRender={() => (
          <div>
            <Avatar style={{ flexShrink: 0 }} icon={<UserOutlined />} />
          </div>
        )}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (
            menuItemProps.isUrl ||
            menuItemProps.children ||
            !menuItemProps.path
          ) {
            return defaultDom;
          }
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        itemRender={(route, _, rs, paths) => {
          const first = rs.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        location={{
          pathname: ui.routePath,
        }}
        headerContentRender={() => <ProBreadcrumb />}
        breadcrumbRender={(r) => {
          return r;
        }}
      >
        <PageContainer content="欢迎使用" breadcrumbRender={false}>
          {props.children}
        </PageContainer>
      </ProLayout>
    </div>
  );
}
