import React, {Component} from 'react';
import {Layout} from 'antd';
import LiftNav from '../../components/left-nav';
import HeaderMain from '../../components/header-main';
import { getItem } from '../../utils/storage_tools';
import {reqValidateUserInfo} from '../../api/ajax';
const {Header, Content, Footer, Sider} = Layout;
export default class Admin extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({collapsed});
  };
  async componentWillMount() {
    //判断登录是否成功
    const user = getItem();
    if(user && user._id){

     const result = await reqValidateUserInfo(user._id);
     if (result) return;
    }
    this.props.history.replace('/login');
  }


  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <LiftNav collapsed={collapsed} onCollapse={this.onCollapse} />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, minHeight: 100 }}>
            <HeaderMain />
          </Header>
          <Content style={{ margin: '25px 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              欢迎使用硅谷后台管理系统
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer></Layout>
      </Layout>
    );
  }
}
