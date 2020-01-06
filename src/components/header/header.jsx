import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './index.less';
class Header extends Component {
  state = {};
  static propTypes = {
    location: PropTypes.any,
    history: PropTypes.any,
    menuList: PropTypes.array.isRequired
  };
  getTitle = () => {
    //得到当前请求路径
    const path = this.props.location.pathname;
    let title;
    this.props.menuList.forEach(item => {
      // console.log(path, item.key);
      if (path.indexOf(item.key) !== -1) {
        title = item.title;
      } else if (item.children) {
        // eslint-disable-next-line no-shadow
        const cItem = item.children.find(cItem => cItem.key === path);
        if (cItem) {
          title = cItem.title;
        }
      }
    });
    return title;
  };
  pushBack = () => {
    this.props.history.goBack();
  };
  render() {
    const title = this.getTitle();
    const pathArr = this.props.location.pathname.split('/');

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，admin</span>
          <a href="">退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <a onClick={this.pushBack}>
              {pathArr[pathArr.length - 1] === 'product' ? '' : '返回'}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
