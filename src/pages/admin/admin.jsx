import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav/left-nav';
import menuList from '../../config/menuConfig';
import Header from '../../components/header/header';
import Home from '../../pages/home/home';
import Product from '../../pages/product/product';
const { Sider, Content } = Layout;

//管理的路由组件
class Admin extends Component {
  state = {};
  render() {
    return (
      <div>
        <Layout style={{ height: '100%' }}>
          <Sider>
            <LeftNav menuList={menuList} />
          </Sider>
          <Layout>
            <Header menuList={menuList}>head</Header>
            <Content
              style={{
                margin: '1rem 1rem 0 1rem',
                backgroundColor: '#fff',
                minHeight: 'auto'
              }}
            >
              <Switch>
                <Redirect from="/" exact to="/product" />
                <Route path="/home" component={Home} />
                <Route path="/product" component={Product} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Admin;
