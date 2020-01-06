import React, { Component } from 'react';
import store from '../../mobx/productStore';
import { observer } from 'mobx-react';
import { Input } from 'antd';
import Create from './productCreate';
import Content from './productContent';
import './css/index.less';
const { Search } = Input;
@observer
class Product extends Component {
  state = {};
  onSearch = value => {
    store.searchProduct(value);
  };
  render() {
    return (
      <div className="product">
        <div className="product-header">
          <div className="product-header-input">
            <Search
              placeholder="查找产品"
              onSearch={this.onSearch}
              enterButton
            />
          </div>
          <div className="product-header-create">
            <Create />
          </div>
        </div>
        <div className="product-content">
          <Content />
        </div>
      </div>
    );
  }
}

export default Product;
