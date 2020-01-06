import React, { Component } from 'react';
import { Input } from 'antd';
import store from '../../mobx/projectStore';
import { observer } from 'mobx-react';
import Create from './projectCreate';
import Content from './projectContent';
import './css/index.less';
const { Search } = Input;
@observer
class ProjectManage extends Component {
  state = {};
  onSearch = async value => {
    await store.searchProject(value);
  };
  render() {
    return (
      <div className="project">
        <div className="project-header">
          <div className="project-header-input">
            <Search
              placeholder="查找项目"
              onSearch={this.onSearch}
              enterButton
            />
          </div>
          <div className="project-header-create">
            <Create />
          </div>
        </div>
        <div className="project-content">
          <Content />
        </div>
      </div>
    );
  }
}

export default ProjectManage;
