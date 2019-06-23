import React, { Component } from 'react';
import logo from "../../assets/images/logo.png";
import {Icon, Menu} from "antd";
import PropTypes from 'prop-types';
import './index.less';

const {SubMenu} = Menu;
const Item =Menu.Item;
export default class LeftNav extends Component {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired
  }
  render() {
    const { collapsed } = this.props;
    return (
      <div>
        <div className="my-nav-logo">
          <img src={logo} alt="logo"/>
          <h1 style={{display: collapsed ? 'none' : 'block'}}>硅谷后台</h1>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Item key="1">
            <Icon type="home"/>
            <span>首页</span>
          </Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                  <Icon type="appstore"/>
                  <span>商品</span>
                </span>
            }
          >
            <Item key="2">
              <Icon type="bars"/>
              <span>品类管理</span>
            </Item>
            <Item key="3">
              <Icon type="tool"/>
              <span>商品管理</span>
            </Item>
          </SubMenu>
          <Item key="4">
            <Icon type="user"/>
            <span>用户管理</span>
          </Item>
          <Item key="5">
            <Icon type="safety"/>
            <span>权限管理</span>
          </Item>
          <SubMenu
            key="sub2"
            title={
              <span>
                  <Icon type="area-chart"/>
                  <span>图形图表</span>
                </span>
            }
          >
            <Item key="6">
              <Icon type="bar-chart"/>
              <span>柱形图</span>
            </Item>
            <Item key="7">
              <Icon type="line-chart"/>
              <span>折线图</span>
            </Item>
            <Item key="8">
              <Icon type="pie-chart"/>
              <span>饼图</span>
            </Item>
          </SubMenu>

        </Menu>
      </div>
    );
  }
}