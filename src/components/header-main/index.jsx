import React, {Component} from 'react';
import MyButton from '../my-button';
import {getItem, removeItem} from '../../utils/storage_tools';
import {Modal} from 'antd';
import './index.less';
import {withRouter} from 'react-router-dom';
import dayjs from 'dayjs';
import {reqWeather} from '../../api/ajax';
import menuList from '../../config/menu-config'

const {confirm} = Modal;

class HeaderMain extends Component {
  state = {
    sysTime:Date.now(),
    weather: '晴',
    weatherImg: 'http://api.map.baidu.com/images/weather/day/qing.png'
  }

  //用户名
  componentWillMount() {
    this.username = getItem().username;
    this.title = this.getTitle(this.props);
  }


  async componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        sysTime:Date.now()
      })
    },1000);
    //发送请求
    const {promise,cancel} =reqWeather();
    this.cancel = cancel;
    const result = await promise;
    if(result) {
      this.setState(result)
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    //取消ajax请求
    this.cancel();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.title = this.getTitle(nextProps);
  }
  //登出
  logout = () => {
    confirm({
      title: '您确认要退出登录吗',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        //清除数据
        removeItem();
        //返回login页面
        this.props.history.replace('/login');
      }
    });
  }
  //获取title
  getTitle = (nextProps) => {
    const {pathname} = nextProps.location;
    for (let i = 0; i < menuList.length; i++) {
      const menu = menuList[i];
      if(menu.children){
        for (let j = 0; j < menu.children.length; j++) {
          const item = menu.children[j];
          if(item.key === pathname){
            return item.title;
          }

        }
      }else{
        if(menu.key === pathname){
          return menu.title;
        }
      }
    }
  }
  render() {
    const {sysTime,weather,weatherImg} = this.state;
    return <div>
      <div className="header-main-top">
        <span>欢迎 {this.username}</span>
        <MyButton onClick={this.logout}>退出</MyButton>
      </div>
      <div className="header-main-bottom">
        <span className="header-main-left">{this.title}</span>
        <div className="header-main-right">
          <span>{dayjs(sysTime).format('YYYY-MM-DD HH:mm:ss')}</span>
          <img src={weatherImg} alt="天气图片"/>
          <span>{weather}</span>
        </div>
      </div>
    </div>;
  }
}

export default withRouter(HeaderMain)