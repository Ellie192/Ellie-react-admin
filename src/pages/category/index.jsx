import React, { Component } from 'react';
import { Card,Button,Icon,Table,Modal,message } from 'antd';
import  MyButton from '../../components/my-button';
import './index.less';
import {reqCategories,reqAddCategory} from '../../api/ajax';
import AddCategoryForm from './add-category-form';
export default class Category extends Component {
  state = {
    categories:[],
    isShowAddCategory:false
  }
  async componentDidMount(){
    const result =await reqCategories('0');
    if(result) {
      this.setState({categories:result})
    }
  }
  //显示添加品类
  showAddCategory = () => {
    this.setState({
      isShowAddCategory:true
    })
  };
  //隐藏添加品类
  hideAddCategory = ()=> {
    this.setState({
      isShowAddCategory:true
    })
  };
  /*
  * 添加品类
  * */
  addCategory = () => {
    //1、表单验证
    //2、收集表单数据
    this.addCategoryForm.props.form.validateFields(async (err, values) => {
      if (!err) {
        // 校验通过
        console.log(values);
        const { parentId, categoryName } = values;
        const result = await reqAddCategory(parentId, categoryName);

        if (result) {
          // 添加分类成功~
          message.success('添加分类成功~', 2);
          //如果添加的是一级品类，就重新获取并展示数据
          if(parentId === '0'){
            this.setState({
              categories:[...this.state.categories,result]
            })
          }
          this.setState({
            isShowAddCategory: false
          })
        }
      }
    })
    // 3. 发送请求
  }

  render() {
    const { categories, isShowAddCategory } = this.state;
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

    return <Card title="一级分类列表" extra={<Button type='primary' onClick={this.showAddCategory}><Icon type="plus" />添加品类</Button>}>
        <Table
          columns={columns}
          dataSource={categories}
          bordered
          pagination={{
            showSizeChanger: true,
            defaultPageSize : 3,
            pageSizeOptions : ['3','6','9','12'],
            showQuickJumper : true,
          }}
          rowKey='_id' //表格行 key 的取值，可以是字符串或一个函数
        />
      <Modal
        title='添加分类'
        visible={isShowAddCategory}
        onOk={this.addCategory}
        onCancel={this.hideAddCategory}
        okText='确认'
        cancelText='取消'
      >
        <AddCategoryForm categories={categories} wrappedComponentRef={(form) => this.addCategoryForm = form}/>
      </Modal>
      </Card>

  }
}