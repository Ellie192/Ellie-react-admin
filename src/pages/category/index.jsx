import React, { Component } from 'react';
import { Card,Button,Icon,Table } from 'antd';
import  MyButton from '../../components/my-button';
import './index.less';
import {reqCategories} from '../../api/ajax'
export default class Category extends Component {
  state = {
    categories:[]
  }
  async componentDidMount(){
    const result =await reqCategories('0');
    if(result) {
      this.setState({categories:result})
    }
  }

  render() {
    const columns = [
      {
        title: '品类名称',
        dataIndex: 'name',

      },
      {
        title: '操作',
        dataIndex: 'money',
        className: 'category-operation',
        render: text => {
          return <div>
            <MyButton>{'修改名称'}</MyButton>
            <MyButton>{'查看其子品类'}</MyButton>
          </div>
          }
      }
    ];

   /* const data = [
      {
        key: '1',
        name: '手机',
        money: '修改名称',
      },
      {
        key: '2',
        name: '电视',
        money: '修改名称',
      },
      {
        key: '3',
        name: '平板',
        money: '修改名称',
      },
      {
        key: '4',
        name: '水杯',
        money: '修改名称',
      },
      {
        key: '5',
        name: '衣服',
        money: '修改名称',
      },
    ];*/

    return <Card title="一级分类列表" extra={<Button type='primary' ><Icon type="plus" />添加品类</Button>}>
        <Table
          columns={columns}
          dataSource={this.state.categories}
          bordered
          pagination={{
            showSizeChanger: true,
            defaultPageSize : 3,
            pageSizeOptions : ['3','6','9','12'],
            showQuickJumper : true,
          }}
          rowKey='_id' //表格行 key 的取值，可以是字符串或一个函数
        />
      </Card>

  }
}