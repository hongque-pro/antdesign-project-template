import { Space } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useModel } from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';
import AvatarDropdown from './AvatarDropdown';

export type SiderTheme = 'light' | 'dark';

function RightContent() {

  let className = `${styles.right}  ${styles.dark}`;

  return (
    <Space className={className}>
      {/* <span
        className={styles.action}
        onClick={() => {
          window.open('https://pro.ant.design/docs/getting-started');
        }}
      >
        <QuestionCircleOutlined />
      </span> */}
      <AvatarDropdown />
    </Space>
  );
}
export default RightContent;