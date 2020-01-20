import React from 'react'
import MenuConfig from './../../config/menuConfig'
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom'
import './index.less'

class NavLeft extends React.Component{
  componentWillMount(){
    const menuTreeNode = this.renderMenu(MenuConfig);

    this.setState({
      menuTreeNode
    })
  }

  // 菜单渲染
  renderMenu =(data)=>{
    return data.map((item)=>{
      if(item.children){
        return (
          <Menu.SubMenu title={item.title} key={item.key}>
            { this.renderMenu(item.children)}
          </Menu.SubMenu>
        )
      }
      return <Menu.Item title={item.title} key={item.key}>
        <NavLink to={item.key}>{item.title}</NavLink>
      </Menu.Item>
    })
  }

  render(){

    return (
      <div className="nav-left">
        {/*<NavLink to="/home" onClick={this.homeHandleClick}>*/}
          <div className="logo">
            <img src="/assets/logo-ant.svg" alt=""/>
            <h1>Imooc MS</h1>
          </div>
        {/*</NavLink>*/}
        <Menu
          // onClick={this.handleClick}
          theme="dark"
        >
          { this.state.menuTreeNode }
        </Menu>
      </div>
    );
  }
}

export default NavLeft