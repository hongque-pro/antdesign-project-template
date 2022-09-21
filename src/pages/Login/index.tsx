import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WechatOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import { parse } from 'querystring';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { ProFormCaptcha, ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-form';
import { history } from '@umijs/max';
import Footer from '@/components/Footer';
import styles from './index.less';
import { login } from '@/services/account';
import Constants from '@/utils/constants';
import { ApplicationError } from 'infra-sdk-core';

import logSvg from "@/assets/images/logo.svg";

type LoginInput = {
    username: string;
    password: string;
    type: "account"
}

const LoginMessage: React.FC<{
    content: string;
}> = ({ content }) => (
    <Alert
        style={{
            marginBottom: 24,
        }}
        message={content}
        type="error"
    />
);

const Login: React.FC = () => {
    const [loginError, setLoginError] = useState<ApplicationError>();
    const [type, setType] = useState<string>('account');


    const handleSubmit = async (values: LoginInput) => {
        setLoginError(undefined);
        try {
            // 登录
            const msg = await login(values.username, values.password);

            if (msg.response.ok) {
                const defaultLoginSuccessMessage = '登录成功！';
                message.success(defaultLoginSuccessMessage);
                /** 此方法会跳转到 redirect 参数所在的位置 */

                if (!history) return;

                const query = parse(history.location.search);
                const { redirect } = query as {
                    redirect: string;
                };
                
                history.replace(redirect || '/');
                return;
            }

            console.log(msg); // 如果失败去设置用户错误信息

            setLoginError(msg.data);
        } catch (error) {
            const defaultLoginFailureMessage = '登录失败，请重试！';
            message.error(defaultLoginFailureMessage);
        }
    };

    const accountView = (type ==="account" ? <>
     <ProFormText
        name="username"
        fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={styles.prefixIcon} />,
        }}
        placeholder={'用户名: admin or user'}
        rules={[
            {
                required: true,
                message: '用户名是必填项！',
            },
        ]}
    />
    <ProFormText.Password
        name="password"
        fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={styles.prefixIcon} />,
        }}
        placeholder={'密码: ant.design'}
        rules={[
            {
                required: true,
                message: '密码是必填项！',
            },
        ]}
    />
</> : null);

    const mobileView = ( type ==="mobile" ?
    <>
        <ProFormText
            fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={styles.prefixIcon} />,
            }}
            name="mobile"
            placeholder={'请输入手机号！'}
            rules={[
                {
                    required: true,
                    message: '手机号是必填项！',
                },
                {
                    pattern: /^1\d{10}$/,
                    message: '不合法的手机号！',
                },
            ]}
        />
        <ProFormCaptcha
            fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            captchaProps={{
                size: 'large',
            }}
            placeholder={'请输入验证码！'}
            captchaTextRender={(timing, count) => {
                if (timing) {
                    return `${count} ${'秒后重新获取'}`;
                }

                return '获取验证码';
            }}
            name="captcha"
            rules={[
                {
                    required: true,
                    message: '验证码是必填项！',
                },
            ]}
            onGetCaptcha={async (phone) => {
                // const result = await getFakeCaptcha({
                //   phone,
                // });

                // if (result === false) {
                //   return;
                // }

                message.success('获取验证码成功！验证码为：1234');
            }}
        />
    </> : null
);

    const items = [
        { label: '账户密码登录', key: 'account', children: accountView }, // 务必填写 key
        { label: '手机号登录', key: 'mobile', children: mobileView },
      ];

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <LoginForm
                    logo={<img alt="logo" src={logSvg} />}
                    title={Constants.project.name}
                    subTitle={Constants.project.slogan}
                    initialValues={{
                        autoLogin: true,
                    }}
                    actions={[
                        '其他登录方式 :',
                        <WechatOutlined key="WeiboCircleOutlined" className={styles.icon} />,
                    ]}
                    onFinish={async (values) => {
                        await handleSubmit(values as LoginInput);
                    }}
                >

                    <Tabs activeKey={type} onChange={setType} items={items} />
                    <div
                        style={{
                            marginBottom: 24,
                        }}
                    >
                        <ProFormCheckbox noStyle name="autoLogin">
                            自动登录
                        </ProFormCheckbox>
                        <a
                            style={{
                                float: 'right',
                            }}
                        >
                            忘记密码 ?
                        </a>
                    </div>
                </LoginForm>
            </div>
            <Footer showIcp={true} />
        </div>
    );
};

export default Login;
