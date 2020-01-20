import React, {Component} from 'react';
import {Table,Card,Modal,Button,message} from 'antd';
import axios from './../../axios/index'

class basicTable extends Component {
  state={
    dataSource2:[]
  }

  componentWillMount() {
    this.setState({
      dataSource2: []
    })
    this.request();
  }
  request = () =>{
    axios.ajax({
      url:'/get/basicTable',
      data: {
        params: {
          page: 1,
        }
      }
    }).then(response=> {
      if(response.code == 0){
        this.setState({
          dataSource2:response.result.list,
          selectedRowKeys: [],
          selectedRows: null
        })
      }
    })
  }
  onClick=(record,index)=>{
    let rowKey = []
    rowKey.push(record.key)
    Modal.info({
      title:'信息',
      content:`用户名：${record.name},用户key：${record.key}`
    })
    this.setState({
      selectedRowKeys: rowKey
    })
  }
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
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ];
    const columns = [
      {
        title: 'key',
        dataIndex: 'key',
        key: 'key',
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

    // Mock-单选1
    const rowSelection = {
      type:'radio',
      selectedRowKeys: this.state.selectedRowKeys
    }
    // Mock-单选2
    const rowCheckSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows
        })
      },
    };

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
      </div>
    );
  }
}

export default basicTable;
