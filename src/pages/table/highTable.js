import React, {Component} from 'react';
import {Table,Card,Modal,Button,message,Badge } from 'antd';
import Utils from './../../utils/utils';
import axios from './../../axios/index'

class HighTable extends Component {
  componentWillMount() {
    this.request();
  }
  state={}
  params = {
    page:1
  }

  // 表格排序
  onChange = (pagination, filters, sorter, extra) => {
    console.log('params', sorter);
  }

  // 删除操作（表格装饰）
  handleDelete = (item)=>{
    let id = item.id;
    Modal.confirm({
      title:'确认',
      content:'您确认要删除此条数据吗？',
      onOk:()=>{
        message.success('删除成功');
        this.request();
      }
    })
  }
  // 查询请求（表格装饰）
  request = () =>{
    axios.ajax({
      url:'/get/basicTable',
      data: {
        params: {
          page: this.params.page,
        }
      }
    }).then(res=> {
      console.log(res);
      if(res.code == 0){
        this.setState({
          dataSource4:res.result.list,
        })
      }
    })
  }

  render() {
    // 表头固定
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        name: `Edward King ${i}`,
        age: i,
        address: `London, Park Lane no. ${i}`,
      });
    }
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: 150,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        width: 150,
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
    ];

    // 左右侧固定
    const columns2 = [
      {
        title: 'Full Name',
        width: 100,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
      },
      {
        title: 'Age',
        width: 100,
        dataIndex: 'age',
        key: 'age',
        fixed: 'left',
      },
      {
        title: 'Column 1',
        dataIndex: 'address',
        key: '1',
        width: 150,
      },
      {
        title: 'Column 2',
        dataIndex: 'address',
        key: '2',
        width: 150,
      },
      {
        title: 'Column 3',
        dataIndex: 'address',
        key: '3',
        width: 150,
      },
      {
        title: 'Column 4',
        dataIndex: 'address',
        key: '4',
        width: 150,
      },
      {
        title: 'Column 5',
        dataIndex: 'address',
        key: '5',
        width: 150,
      },
      {
        title: 'Column 6',
        dataIndex: 'address',
        key: '6',
        width: 150,
      },
      {
        title: 'Column 7',
        dataIndex: 'address',
        key: '7',
        width: 150,
      },
      { title: 'Column 8', dataIndex: 'address', key: '8',width: 150, },
      { title: 'Column 9', dataIndex: 'address', key: '9',width: 150, },
      { title: 'Column 10', dataIndex: 'address', key: '10',width: 150, },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <a>action</a>,
      },
    ];

    // 表格排序
    const columns3 = [
      {
        title: 'Name',
        dataIndex: 'name',
        width:400,
        filters: [
          {
            text: 'Joe',
            value: 'Joe',
          },
          {
            text: 'Jim',
            value: 'Jim',
          },
          {
            text: 'Submenu',
            value: 'Submenu',
            children: [
              {
                text: 'Green',
                value: 'Green',
              },
              {
                text: 'Black',
                value: 'Black',
              },
            ],
          },
        ],
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['ascend'],
      },
      {
        title: 'Age',
        dataIndex: 'age',
        width:200,
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        filters: [
          {
            text: 'London',
            value: 'London',
          },
          {
            text: 'New York',
            value: 'New York',
          },
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.address.indexOf(value) === 0,
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend'],
      },
    ]
    const data3 = [
      {
        key: '1',
        name: 'John Brown',
        age: 3,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 1,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 2,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '4',
        name: 'Jim Red',
        age: 3,
        address: 'London No. 2 Lake Park',
      },
    ];

    // 表格装饰
    const columns4 = [
      {
        title: '序号',
        dataIndex: '_index',
        render:(text, record, index) => index+1
      },
      {
        title: 'Name',
        dataIndex: 'name',
        width:400,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        width:200,
        render:(record)=>{
          let obj = {
            '1': <Badge status="success" text="成功"/>,
            '2': <Badge status="error" text="报错" />,
            '3': <Badge status="default" text="正常" />,
            '4': <Badge status="processing" text="进行中" />,
          }
          return obj[record]
        }
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
      {
        title: "操作",
        render:(record,text)=>{
          return <Button size="small" onClick={(item) => { this.handleDelete(text) }}>删除</Button>
        }
      }
    ]

    return (
      <div>
        {/*/!*表头固定*!/*/}
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} bordered/>,

        {/*/!*左右侧固定*!/*/}
        <Table columns={columns2} dataSource={data} scroll={{ x: 2000, y: 300 }} />,

        {/*排序*/}
        <Table columns={columns3} dataSource={data3}
               onChange={this.onChange} />

        {/*装饰*/}
        <Table columns={columns4} dataSource={this.state.dataSource4}/>
      </div>
    );
  }
}

export default HighTable;
