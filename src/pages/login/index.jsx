import React, {Component} from 'react';
import {Form, Icon, Input, Button} from 'antd';
import {login} from '../../api/ajax/index';


import logo from '../../assets/images/logo.png';
import './index.less';

const Item = Form.Item;

class Login extends Component {

  validator = (rule, value, callback) => {
    const name = rule.fullField === 'username' ? "username" : 'password';

    if (!value) {
      callback(`${name}不能为空`)
    } else if (value.length < 4) {
      callback(`${name}不得少于4位`)
    } else if (value.length > 15) {
      callback(`${name}不得多于15位`)
    } else if (!/^[a-zA-Z_0-9]+$/.test(value)) {
      callback(`${name}只能包含英文字母，数字，下划线`)
    } else {
      callback()
    }
  };

  login = (e) => {
    e.preventDefault();

    this.props.form.validateFields(async (error, values) => {
      if (!error) {
        const {username, password} = values;
        const result = await login(username, password);
        if(result){
          this.props.history.replace('/');
        }else{
          this.props.form.resetFields(['password'])
        }

      } else {
        console.log('登录表单验证有误')
      }
    })

  }

  render() {

    const {getFieldDecorator} = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-content">
          <Form className="login-form" onSubmit={this.login}>
            <h2>用户登录</h2>
            <Item>
              {
                getFieldDecorator('username', {
                  rules: [
                    /*{ required: true, message: '用户名不能为空' },
                    {min:4,message:'用户名不得少于四位'},
                    {max:15,message:'用户名不得多于十五位'},
                    {pattern:/^[a-zA-Z_0-9]+$/,message:'用户名只能包含英文字母，数字，下划线'}*/
                    {validator: this.validator}
                  ],
                })(
                  <Input className="login-input" prefix={<Icon type="user"/>} placeholder='用户名'/>
                )
              }

            </Item>
            <Item>
              {
                getFieldDecorator(
                  'password',
                  {
                    rules: [
                      /*{ required: true, message: '密码不能为空' },
                      {min:4,message:'密码不得少于六位'},
                      {max:15,message:'密码不得多于十五位'},
                      {pattern:/^[a-zA-Z_0-9]+$/,message:'密码只能包含英文字母，数字，下划线'}*/
                      {validator: this.validator}
                    ]
                  }
                )(
                  <Input className="login-input" prefix={<Icon type="lock"/>} placeholder='密码' type="password"/>
                )
              }
            </Item>

            <Item>
              <Button type='primary' htmlType="submit" className="login-btn">登录</Button>
            </Item>
          </Form>
        </section>

      </div>
    )
  }
}

export default Form.create({})(Login);
