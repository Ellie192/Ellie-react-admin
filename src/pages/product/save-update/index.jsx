import React, { Component } from 'react';
import { Card,Form,Input,Icon,Cascader,Button,InputNumber} from 'antd';
import './index.less';
import { reqCategories } from '../../../api/ajax'
import RichTextEditor from './rich-text-editor'
const Item = Form.Item;

export default class SaveUpdate extends Component {

  state = {
    options:[]
  };
  goCategory = () => {
    console.log('goCategory')
  }
  async componentDidMount() {
    const result = await reqCategories("0");

    if(result) {
      this.setState({
        options:result.map((item) => {
          return{
            value:item._id,
            label:item.name,
            isLeaf:false
          }
        })
      })
    }
  };

//加载二级分类数据
  loadData = async selectedOptions => {
    //获取数组最后一项
    const targetOption = selectedOptions[selectedOptions.length - 1];
    //显示login图标
    targetOption.loading = true;
    //发送请求、请求二级分类数据
    const result = await reqCategories(targetOption.value);
    if(result){
      targetOption.loading = false;
      targetOption.children = result.map((item) => {
        return {
          label:item.name,
          value:item._id
        }
      });
      //更新状态
      this.setState({
        options: [...this.state.options],
      })
    }

  };

  addProduct = (e) => {
    e.preventDefault();

  };
  render() {


    const {options} = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4},
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };

    return <Card title={<div className="product-title" onClick={this.goCategory}><Icon type="arrow-left" className='arrow-icon'/><span>添加商品</span></div>}>
        <Form {...formItemLayout} onSubmit={this.addProduct}>
          <Item label='商品名称'>
            <Input placeholder="请输入商品名称" />
          </Item>
          <Item label='商品描述'>
            <Input placeholder="请输入商品描述" />
          </Item>
          <Item label='选择分类' wrapperCol={{span:8}}>
            <Cascader
              options={options}
              loadData={this.loadData}
              changeOnSelect
            />
          </Item>
          <Item label="商品价格">
            <InputNumber
              // 格式化，对输入的数据进行格式化
              formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/￥\s?|(,*)/g, '')}
              className="input-number"
            />
          </Item>
          <Item label="商品详情" wrapperCol={{span: 20}}>
            <RichTextEditor />
          </Item>
          <Item>
            <Button type="primary" className="add-product-btn" htmlType="submit">提交</Button>
          </Item>
        </Form>
      </Card>

  }
}