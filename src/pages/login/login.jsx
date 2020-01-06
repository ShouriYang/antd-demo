import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './login.less';
import logo from '../../assets/images/logo.png';
import { Form, Icon, Input, Button } from 'antd';
//登录的路由组件
class Login extends Component {
  state = {};
  static propTypes = {
    form: PropTypes.any
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>错误监控系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请输入您的用户名'
                  },
                  // { min: 4, message: '用户名最少为4位' },
                  // { max: 12, message: '用户名最多为12位' },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: '用户名必须必英文、数字或者下划线'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入你的密码' }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item className="log-in-button">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
            <Form.Item>
              <a className="login-form-forgot" href="">
                忘记密码
              </a>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
const WrapLogin = Form.create()(Login);
export default WrapLogin;
