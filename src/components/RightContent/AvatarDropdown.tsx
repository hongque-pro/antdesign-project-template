import { useStores } from "@/models/global";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import { clientSession } from "infra-sdk-core";
import { memo, useCallback } from "react";
import HeaderDropdown from "../HeaderDropdown";
import type { MenuInfo } from 'rc-menu/lib/interface';

import styles from './index.less';
import { loginOut } from "@/services/account";

function AccountDropdownFC() {

    const { user } = useStores();

    const onMenuClick = useCallback(
        (event: MenuInfo) => {
          const { key } = event;
          if (key === 'logout') {
            loginOut();
            return;
          }
        },
        [],
      );

    const menu = (
        <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
            <Menu.Item key="logout">
                <LogoutOutlined />
                退出
            </Menu.Item>
        </Menu>
    );

    return (
        <HeaderDropdown overlay={menu} placement="bottomLeft">
            <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} icon={<UserOutlined />} alt="avatar" />
                <span className={`${styles.name} anticon`}>{user.current?.userName ?? "游客"}</span>
            </span>
        </HeaderDropdown>
    );
}

const AvatarDropdown = memo(AccountDropdownFC);
export default AvatarDropdown;