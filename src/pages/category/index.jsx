import React, { Component } from 'react';
import { Card,Button,Icon,Table,Modal,message } from 'antd';
import  MyButton from '../../components/my-button';
import './index.less';
import { reqCategories,reqAddCategory,reqUpdateCategoryName } from '../../api/ajax';
import AddCategoryForm from './add-category-form';
import UpdateCategoryNameForm from './updateCategory-name'
export default class Category extends Component {
  state = {
    categories:[], //一级分类列表
    subCategories:[],//二级分类列表
    isShowSubCategories:false,//是否显示二级列表
    isShowAddCategory:false, //显示添加品类
    isShowUpdateCategoryName:false //显示修改分类名称
  }
  // 初始化临时保存分类数据（否则下面this.category.name会报错）
  category = {};

  componentDidMount(){
    this.fetchCategories('0')
  }

  fetchCategories = async (parentId) => {

    const result = await reqCategories(parentId);
    console.log(result)
    if(result) {
      if(parentId === '0'){
        this.setState({categories:result})
      }else{
        this.setState({
          subCategories:result,
          isShowSubCategories:true
        })
      }
    }
  }

  /*//显示添加品类
  showAddCategory = () => {
    this.setState({
      isShowAddCategory:true
    })
  };
  //隐藏添加品类
  hideAddCategory = ()=> {
    this.setState({
      isShowAddCategory:false
    })
  };*/
  /*
  * 添加品类
  * */
  addCategory = () => {
    //1、表单验证
    //2、收集表单数据
    const { form } = this.addCategoryForm.props;
    form.validateFields(async (err, values) => {
      if (!err) {
        // 校验通过
        const { parentId, categoryName } = values;
        // 3. 发送请求
        const result = await reqAddCategory(parentId, categoryName);

        if (result) {
          // 添加分类成功~
          message.success('添加分类成功~', 2);
          //清空表单数据
          form.resetFields(['parentId','categoryName']);

          //如果添加的是一级品类，就重新获取并展示数据
          //看似调用了两次，但是react会自动优化，在短时间内，调用多次，会自动优化为一次
          const {isShowSubCategories} = this.state;
          const options = {
            isShowAddCategory: false
          };
          if(parentId === '0'){
            options.categories = [...this.state.categories,result]
          }else if(isShowSubCategories && result.parentId === this.parentCategory._id){
            options.subCategories = [...this.state.subCategories,result]
          }
          this.setState(options)
        }
      }
    })

  };

  /*
  * 切换显示总调用
  * */
  toggleDisplay = (stateName,stateValue) => {
    return () => {
      this.setState({
        [stateName]:stateValue
      })
    }
  }

  hideUpdateCategoryName = () => {
    // 清空表单项的值
    this.updateCategoryNameForm.props.form.resetFields(['categoryName']);
    // 隐藏对话框
    this.setState({
      isShowUpdateCategoryName: false
    })
  };

  saveCategory = (category) => {
    return () => {
      // 保存要更新的分类数据
      this.category = category;
      // console.log(this);
      this.setState({
        isShowUpdateCategoryName: true
      })
    }
  };
  //显示其子品类
  showSubCategory = (category) => {
    return async () => {
      //请求二级分类数据
      this.parentCategory = category;
      this.fetchCategories(category._id)
    }
  }
  goBack = () => {
    this.setState({
      isShowSubCategories: false
    })
  }


  //更新分类名称
  updateCategoryName = () => {
    const { form } = this.updateCategoryNameForm.props;
    // 校验表单，收集数据
    form.validateFields(async (err, values) => {
      if (!err) {
        const { categoryName } = values;
        const categoryId = this.category._id;
        // 发送请求
        const result = await reqUpdateCategoryName(categoryId, categoryName);

        if (result) {
          const { parentId } = this.category;

          let categoryData = this.state.categories;
          let stateName = 'categories';


          if (parentId !== '0') {
            // 二级分类
            categoryData = this.state.subCategories;
            stateName = 'subCategories';
          }


          // 不想修改原数据
          const categories = categoryData.map((category) => {
            let { _id, name, parentId } = category;
            // 找到对应id的category，修改分类名称
            if (_id === categoryId) {
              name = categoryName;
              return {
                _id,
                name,
                parentId
              }
            }
            // 没有修改的数据直接返回
            return category
          });
          console.log(categories)
          // 清空表单项的值 隐藏对话框
          form.resetFields(['categoryName']);

          message.success('更新分类名称成功~', 2);

          this.setState({
            isShowUpdateCategoryName: false,
            [stateName]:categories
          })
        }
      }
    })

  };
  render() {
    const {
      categories,
      isShowAddCategory,
      isShowUpdateCategoryName,
      isShowSubCategories,
      subCategories
    } = this.state;
    const columns = [
      {
        title: '品类名称',
        dataIndex: 'name',

      },
      {
        title: '操作',
        // dataIndex: 'money',
        className: 'category-operation',
        //改变当列的显示
        render: category => {

          return <div>
            <MyButton onClick={this.saveCategory(category)}>{'修改名称'}</MyButton>
            {
              isShowSubCategories ? null : <MyButton onClick={this.showSubCategory(category)}>{'查看其子品类'}</MyButton>
            }
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

    return <Card title={isShowSubCategories ? <div><MyButton onClick={this.goBack}>一级分类</MyButton><Icon type="arrow-right"/>&nbsp;{this.parentCategory.name}</div> : "一级分类列表"}
                 extra={<Button type='primary' onClick={this.toggleDisplay('isShowAddCategory',true)}><Icon type="plus" />添加品类</Button>}>
        <Table
          columns={columns}
          dataSource={isShowSubCategories ? subCategories : categories}
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
        onCancel={this.toggleDisplay('isShowAddCategory',false)}
        okText='确认'
        cancelText='取消'
      >
        <AddCategoryForm categories={categories} wrappedComponentRef={(form) => this.addCategoryForm = form}/>
      </Modal>

      <Modal
        title='修改分类名称'
        visible={isShowUpdateCategoryName}
        onOk={this.updateCategoryName}
        onCancel={this.hideUpdateCategoryName}
        okText='确认'
        cancelText='取消'
        width={300}
      >
        <UpdateCategoryNameForm categoryName={this.category.name}  wrappedComponentRef={(form) => this.updateCategoryNameForm = form}/>
      </Modal>
      </Card>

  }
}