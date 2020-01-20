import React, {Component} from 'react'
import {Row, Col} from "antd"
import './index.less'
import Util from '../../utils/utils'
import axios from '../../axios'

// import { connect } from 'react-redux'
class Header extends React.Component {
  componentWillMount() {
    this.setState({
      userName: '河畔一角'
    })
    setInterval(() => {
      let sysTime = Util.formateDate(new Date().getTime());
      this.setState({
        sysTime
      })
    }, 1000)
  }

  render() {
    return (
      <div className="header">
        <Row className="header-top">
          <Col>
            <span>欢迎，{this.state.userName}</span>
            <a href="#">退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span={4} className="breadcrumb-title">
            首页
          </Col>
          <Col span={20} className="weather">
            <span className="date">{this.state.sysTime}</span>
            <span>天气获取失败</span>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header