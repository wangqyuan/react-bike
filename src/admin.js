import React from 'react'
import { Row,Col } from 'antd';
import { connect } from 'react-redux'
import './style/common.less'
class Admin extends React.Component{

    render(){
        return (
          <div>
            admin
          </div>
        );
    }
}
export default connect()(Admin)