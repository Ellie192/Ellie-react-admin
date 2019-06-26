import React, {Component} from 'react';
import {Card, Button, Icon, Select, Input, Table} from 'antd';
import './index.less';
import {reqProducts} from '../../../api/ajax';
import MyButton from '../../../components/my-button'
const {Option} = Select;
export default class Index extends Component {
  state = {
    products:[]
  };
  async componentDidMount () {
    const result = await reqProducts(1,3);
      if(result){
        this.setState({
          products:result.list
        })
      }
  }
  //添加产品按钮
  showAddProduct = () => {
    this.props.history.push('/product/saveupdate');
  };

  render() {
    const {products} = this.state;
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
      },
      {
        title: '状态',
        dataIndex: '3',
        render: text => <div>
            <Button type='primary'>上架</Button>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>已下架</span>
          </div>
          ,
      },
      {
        title: '操作',
        dataIndex: '4',
        render: text => <div>
            <MyButton>详情</MyButton>
            <MyButton>修改</MyButton>
          </div>
          ,
      },
    ];


    return <Card title={<div>
      <Select defaultValue="0" className='select'>
        <Option value="0" key='0'>根据商品名称</Option>
        <Option value="1" key='1'>根据商品描述</Option>
      </Select>
      <Input placeholder="关键词" className='input'/>
      <Button type='primary'>搜索</Button>
    </div>
    }
                 extra={<Button type='primary' onClick={this.showAddProduct}><Icon type='plus'/>添加产品</Button>}>
      <Table
        columns={columns}
        dataSource={products}
        bordered
        rowKey='_id'
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['3', '6', '9', '12'],
          defaultPageSize: 3
        }}
      />
    </Card>

  }
}