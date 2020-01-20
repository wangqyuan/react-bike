import React, {Component} from 'react';
import {Table,Card,Modal,Button,message} from 'antd';
import Utils from './../../utils/utils';
import axios from './../../axios/index'

class basicTable extends Component {
  state={
    dataSource2:[]
  }
  params = {
    page:1
  }
  componentWillMount() {
    this.setState({
      dataSource2: []
    })
    this.request();
  }

  // 查询请求
  request = () =>{
    axios.ajax({
      url:'/get/basicTable',
      data: {
        params: {
          page: this.params.page,
        }
      }
    }).then(res=> {
      res.result.list.map((item, index) => {
        item.key = index;
      })
      if(res.code == 0){
        this.setState({
          dataSource2:res.result.list,
          selectedRowKeys: [], // 清空表格复选框选中状态
          selectedRows: null, // 清空表格复选框选中数据
          pagination: Utils.pagination(res,(current)=>{
            this.params.page = current;
            this.request();
          })
        })
      }
    })
  }

  // “Mock-单选展示”的行点击事件
  onClick=(record,index)=>{
    let rowKey = []
    rowKey.push(record.id)
    Modal.info({
      title:'信息',
      content:`用户名：${record.name},用户key：${record.id}`
    })
    this.setState({
      selectedRowKeys: rowKey
    })
  }

  //“Mock-单选删除”的删除操作
  handleDelete=()=>{
    Modal.confirm({
      title:'删除提示',
      content: `您确定要删除这些数据吗？${this.state.selectedRowKeys.join(',')}`,
      onOk:()=>{
        message.success('删除成功');
        this.request();
      }
    })

  }
  render() {
    // 基础表格
    const dataSource = [
      {
        id: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        id: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ];
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        render: (record)=>{
          const obj ={
            1: "女",
            2: "男"
          }
          return obj[record]
        }
      },
    ];

    // Mock-单选展示
    const rowSelection = {
      type:'radio',
      selectedRowKeys: this.state.selectedRowKeys
    }

    // Mock-单选删除
    const { selectedRowKeys } = this.state;
    const rowCheckSelection = {
      type: 'checkbox',
      selectedRowKeys,
      onChange:(selectedRowKeys,selectedRows)=>{
        this.setState({
          selectedRowKeys,
          selectedRows
        })
      }
    }

    return (
      <div>
        {/*基础表格*/}
        <Card title="基础表格">
          <Table dataSource={dataSource} columns={columns} bordered/>
        </Card>

        {/*动态数据渲染表格-Mock*/}
        <Card title="动态数据渲染表格-Mock" style={{margin:'10px 0'}}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>

        {/*Mock-单选(显示行信息)*/}
        <Card title="Mock-单选" style={{margin:'10px 0'}}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            rowSelection={rowSelection}
            pagination={false}
            onRow={(record,index) => {
              return {
                onClick: () => {this.onClick(record,index)}, // 点击行
              };
            }}
          />
        </Card>

        {/*Mock-单选(删除)*/}
        <Card title="Mock-单选" style={{ margin: '10px 0' }}>
          <div style={{marginBottom:10}}>
            <Button onClick={this.handleDelete}>删除</Button>
          </div>
          <Table
            bordered
            rowSelection={rowCheckSelection}
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>

        {/*Mock-分页*/}
        <Card title="Mock-单选" style={{ margin: '10px 0' }}>
          <div style={{marginBottom:10}}>
            <Button onClick={this.handleDelete}>删除</Button>
          </div>
          <Table
            bordered
            rowSelection={rowCheckSelection}
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    );
  }
}

export default basicTable;
