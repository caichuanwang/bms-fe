import React, { FC } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LoginParams } from '@/models/login';
import { useLogin } from '@/api';
import styles from './index.module.less';
import { ReactComponent as LogoSvg } from '@/assets/logo/logo.svg';
import { useDispatch } from 'react-redux';
import { setLogged } from '../../stores/user';
import { ILoginResult } from '../../api/type/login';

const initialValues: LoginParams = {
  user_name: 'admin',
  user_password: 'admin',
};

const LoginForm: FC = () => {
  const dispatch = useDispatch();
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const location = useLocation();

  const onFinished = async (form: LoginParams) => {
    const result: ILoginResult = await loginMutation.mutateAsync(form);

    if (result) {
      localStorage.setItem('token', result.data.token ?? '');
      localStorage.setItem('username', result.data.userName);
      localStorage.setItem('userId', result.data.userId);
      dispatch(setLogged(true));
      const from = (location.state as { from: string })?.from || {
        pathname: '/bookList',
      };
      navigate(from);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <Link to="/">
            <LogoSvg className={styles.logo} />
            <span className={styles.title}>图书管理项目</span>
          </Link>
        </div>
        <div className={styles.desc}>xx大学图书后台管理系统</div>
      </div>
      <div className={styles.main}>
        <Form<LoginParams> onFinish={onFinished} initialValues={initialValues}>
          <Form.Item
            name="user_name"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input size="large" placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="user_password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input type="password" size="large" placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              className={styles.mainLoginBtn}
              htmlType="submit"
              type="primary"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
