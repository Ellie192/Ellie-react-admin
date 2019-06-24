import React, {Component} from 'react';
import MyButton from '../my-button';
import {getItem, removeItem} from '../../utils/storage_tools';
import {Modal} from 'antd';
import './index.less';
import {withRouter} from 'react-router-dom';
import dayjs from 'dayjs';
import {reqWeather} from '../../api/ajax';

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
  }

  async componentDidMount() {
    setInterval(() => {
      this.setState({
        sysTime:Date.now()
      })
    },1000);
    //发送请求
    const result =await reqWeather();
    if(result) {
      this.setState(result)
    }
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

  render() {

    const {sysTime,weather,weatherImg} = this.state;
    return <div>
      <div className="header-main-top">
        <span>欢迎 {this.username}</span>
        <MyButton onClick={this.logout}>退出</MyButton>
      </div>
      <div className="header-main-bottom">
        <span className="header-main-left">用户管理</span>
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