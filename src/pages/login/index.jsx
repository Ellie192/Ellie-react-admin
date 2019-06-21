import React,{ Component } from 'react';
import { Form, Icon, Input, Button, } from 'antd';


import logo from './logo.png'

export default class Login extends Component{
    render(){
        const Item = Form.Item;
        return(
            <div>
                <header>
                    <img src={logo} alt="logo"/>
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section>
                    <Form>
                        <Item>
                            <Input prefix={<Icon type="user" />} placeholder='用户名'/>
                        </Item>
                        <Item>
                            <Input prefix={<Icon type="lock" />} placeholder='密码'/>
                        </Item>
                        <Item>
                            <Button type='primary'>登录</Button>
                        </Item>
                    </Form>
                </section>

            </div>
        )
    }
}
