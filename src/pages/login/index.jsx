import React,{ Component } from 'react';

import {Form,Icon,Button,Input} from 'antd';

import logo from './logo.png';

import './index.less';

const Item = Form.Item;

class Login extends Component{
    validator = (rule,value,callback) => {
        console.log(rule,value);
        const name = rule.fullField === 'username' ? '用户名' : '密码';
        if(!value){
            callback(`${name}不能为空`)
        }else if(value.length < 5){
            callback(`${name}不得少于4位`)
        }else if(value.length > 15){
            callback(`${name}不得多于15位`)
        }else if(!/^[a-zA-Z_0-9]+$/.test(value)){
            callback(`${name}只能包含英文字母，数字，下划线`)
        }else(
            callback()
        )

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((error,values) => {
            if(!error){
                const {username,password} = values;
                console.log(username,password)
            }else{
                console.log('表单验证有误')
            }
        })

    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section className="login-content" >
                    <Form className="login-form" onSubmit={this.handleSubmit}>
                        <h2>用户登录</h2>
                        <Item>
                            {getFieldDecorator('username',{
                                rules:[
                                    {validator:this.validator}
                                ]
                            })(
                                <Input className="login-input" type="text" prefix={<Icon type="user" />} placeholder="username"/>
                            )}

                        </Item>
                        <Item>
                            {getFieldDecorator('password',{
                                rules:[
                                    {validator:this.validator}
                                ]
                            })(
                                <Input className="login-input" type="password"  prefix={<Icon type="lock" />} placeholder="password"/>
                            )}

                        </Item>
                        <Item>
                            <Button  htmlType="submit" className="login-btn" type="primary">登录</Button>
                        </Item>

                    </Form>
                </section>

            </div>
        )
    }
}
export default Form.create()(Login);