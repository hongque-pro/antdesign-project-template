import { useCallback } from 'react';
import ProLayout, {
  PageContainer,
} from '@ant-design/pro-layout';
import { Avatar } from 'antd';
import Constants from '@/utils/constants';
import type { Route } from '@ant-design/pro-layout/lib/typings';
import { Link } from 'umi';
import type { ComponentProperties } from '@/types/react';
import Footer from '@/components/Footer';
import logSvg from "@/assets/images/logo-white.svg";
import RightContent from '@/components/RightContent';

export default function HomeLayout(props: ComponentProperties) {

  const renderFooter = useCallback(() => {
    return (
      <Footer />
    );
  }, []);

  const routes = Constants.routes as Route[];

  const currentRoute = routes.find((r) => r.path === "/");

  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        headerTheme="dark"
        layout="mix"
        
        navTheme="light"
        title={`${Constants.project.shortName}管理后台`}
        waterMarkProps={{ content: Constants.project.shortName }}
        locale={false as any}
        route={currentRoute}
        logo={<Avatar src={logSvg} style={{ backgroundColor: "#fff" }} />}
        footerRender={renderFooter}
        menuHeaderRender={false}
        rightContentRender={() => (
          <div><RightContent /></div>
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
          pathname: location.pathname,
        }}
        headerContentRender={() => null}
        breadcrumbRender={(routes) => [
          {
            path: '/',
            breadcrumbName: '主页',
          },
          ...(routes || []),
        ]}
      >
        <PageContainer ghost={true} title={false} subTitle={false}>
          <div style={{padding: 8, backgroundColor:"#fff"}}>
            {props.children}
          </div>
        </PageContainer>
      </ProLayout>
    </div>
  );
}
