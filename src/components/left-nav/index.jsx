import React, { Component } from 'react';
import logo from "../../assets/images/logo.png";
import { Menu,Icon } from "antd";
import { Link,withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import './index.less';
import menuList from '../../config/menu-config'

const {SubMenu} = Menu;
const Item =Menu.Item;
class LeftNav extends Component {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired
  };

  createMenu= (menu) => {
    return <Item key={menu.key}>
      <Link to={menu.key}>
        <Icon type={menu.icon}/>
        <span>{menu.title}</span>
      </Link>
    </Item>
};
  //渲染一次，只做一次，在渲染之前做
  componentWillMount() {
    const {pathname} = this.props.location;
    //生成菜单
    this.menus = menuList.map((menu) => {
      if(menu.children){
        //二级菜单
        return <SubMenu
          key={menu.key}
          title={
            <span>
                  <Icon type={menu.icon}/>
                  <span>{menu.title}</span>
                </span>
          }
        >
          {
            menu.children.map((item) => {
              if(item.key === pathname){
                //显示页面是二级菜单，需要展开其父级菜单
                this.openkey = menu.key;
              }

              return this.createMenu(item);
            })
          }
        </SubMenu>

      }else{
        //一级菜单
        return  this.createMenu(menu);
      }
    })
    this.selectedkey = pathname;
    }

  render() {
    const {pathname} = this.props.location;
    const { collapsed } = this.props;
    return (
      <div>
        <Link className="my-nav-logo" to='/home'>
          <img src={logo} alt="logo"/>
          <h1 style={{display: collapsed ? 'none' : 'block'}}>硅谷后台</h1>
        </Link>
        <Menu theme="dark" selectedKeys={[pathname]} defaultOpenKeys={[this.openkey]} mode="inline">
          {this.menus}
        </Menu>
      </div>
    );
  }
}
//withRouter是一个高阶组件，向非路由组件传递三大属性
export default withRouter(LeftNav);