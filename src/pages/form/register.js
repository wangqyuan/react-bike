import React, {Component} from 'react';
import {Card,Form,Button,Input,Checkbox,Radio,Select,Switch,DatePicker,TimePicker,Upload,Icon,message, InputNumber} from 'antd'
import moment from 'moment';

class FormRegister extends Component {
  state={}
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    let userInfo = this.props.form.getFieldsValue();
    console.log(JSON.stringify(userInfo))
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol:{
        xs:24,
        sm:4
      },
      wrapperCol:{
        xs:24,
        sm:12
      }
    }
    const tailFormItemLayout = {
      wrapperCol:{
        xs:24,
        sm:{
          span:12,
          offset:4
        }
      }
    };
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div>Upload</div>
      </div>
    );
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayout} label="姓名">
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please input your 姓名',
              },
            ],
          })(<Input placeholder="Please input your 姓名" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="密码">
          {getFieldDecorator('nickname', {
            rules: [
              {

              },
            ],
          })(<Input placeholder="Please input your 密码" />)}
        </Form.Item>

        <Form.Item label="性别" {...formItemLayout} >
          {getFieldDecorator('sex', {
            initialValue: 'nan'
          })(
            <Radio.Group>
              <Radio value="nan">男</Radio>
              <Radio value="nv">女</Radio>
            </Radio.Group>,
          )}
        </Form.Item>

        <Form.Item label="是否记住密码" {...formItemLayout} >
          {getFieldDecorator('radio-group', {
            valuePropName:'checked',
            initialValue: true
          })(
            <Checkbox>记住密码</Checkbox>
          )}
        </Form.Item>

        <Form.Item label="年龄" {...formItemLayout} >
          {getFieldDecorator('input-number', { initialValue: 18 })(<InputNumber min={1} max={100} />)}
        </Form.Item>

        <Form.Item label="当前状态" hasFeedback {...formItemLayout} >
          {getFieldDecorator('select', {
            rules: [{ required: true, message: 'Please select your 当前状态!' }],
            initialValue: 'china'
          })(
            <Select placeholder="Please select a country">
              <Select.Option value="china">China</Select.Option>
              <Select.Option value="usa">U.S.A</Select.Option>
              <Select.Option value="2">2</Select.Option>
              <Select.Option value="3">3</Select.Option>
            </Select>,
          )}
        </Form.Item>

        <Form.Item label="爱好" {...formItemLayout}>
          {
            getFieldDecorator('interest', {
              initialValue: ['2','5']
            })(
              <Select mode="multiple">
                <Select.Option value="1">游泳</Select.Option>
                <Select.Option value="2">打篮球</Select.Option>
                <Select.Option value="3">踢足球</Select.Option>
                <Select.Option value="4">跑步</Select.Option>
                <Select.Option value="5">爬山</Select.Option>
                <Select.Option value="6">骑行</Select.Option>
                <Select.Option value="7">桌球</Select.Option>
                <Select.Option value="8">麦霸</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="是否已婚" {...formItemLayout}>
          {
            getFieldDecorator('isMarried', {
              valuePropName:'checked',
              initialValue: true
            })(
              <Switch/>
            )
          }
        </Form.Item>
        <Form.Item label="生日DatePicker[showTime]" {...formItemLayout}>
          {getFieldDecorator('date-time-picker', {
            initialValue:moment('2018-08-08')
          })(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
          )}
        </Form.Item>
        <Form.Item label="联系地址" {...formItemLayout}>
          {
            getFieldDecorator('address',{
              initialValue:'北京市海淀区奥林匹克公园'
            })(
              <Input.TextArea
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            )
          }
        </Form.Item>
        <Form.Item label="早起时间" {...formItemLayout}>
          {
            getFieldDecorator('time')(
              <TimePicker/>
            )
          }
        </Form.Item>
        <Form.Item label="头像" {...formItemLayout}>
          {
            getFieldDecorator('Upload')(
              <Upload
                listType="picture-card"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onChange={this.handleChange}
              >
                {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar"/> : uploadButton}
              </Upload>
            )
          }
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the <a href="">王乾元条款</a>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(FormRegister);