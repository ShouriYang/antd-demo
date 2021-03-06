import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Modal, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import CreateFrom from './components/productForm';
import store from '../../mobx/productStore';
import './css/productCreate.less';
@observer
class Create extends Component {
  state = {
    visible: false
  };
  static propTypes = {
    getFormValue: PropTypes.any
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    const formData = this.getFormValue;
    formData.validateFields(async (err, values) => {
      if (!err) {
        // eslint-disable-next-line no-param-reassign
        values.productCategory = values.productCategory.label;
        //添加创建人字段
        // eslint-disable-next-line no-param-reassign
        const code = await store.addProduct(values);
        if (code === 700) {
          console.log(store.searchValue);
          if (store.searchValue === '') {
            console.log('全部');
            await store.getProduct();
          } else {
            console.log('搜索');
            await store.searchProduct();
          }
          formData.resetFields();
          this.setState({ visible: false });
        } else {
          this.setState({ visible: true });
        }
      } else {
        this.setState({ visible: true });
      }
    });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button
          style={{ float: 'right' }}
          type="primary"
          onClick={this.showModal}
        >
          <Icon type="file-add" />
          创建产品
        </Button>
        <Modal
          visible={visible}
          title="新建产品"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          bodyStyle={{ paddingBottom: 0 }}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              提交
            </Button>
          ]}
        >
          <CreateFrom
            ref={getFormValue => {
              this.getFormValue = getFormValue;
            }}
          />
        </Modal>
      </div>
    );
  }
}

export default Create;
