import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import styled from 'styled-components'
import KatalogLogo from '../assets/svg/katalog_full.svg'
import KatalogLogoSmall from '../assets/svg/katalog_icon.svg'
import {
  ShopOutlined,
  TagsOutlined,
  InboxOutlined,
  GlobalOutlined,
  SettingOutlined,
} from '@ant-design/icons'

const { Sider } = Layout
const { SubMenu } = Menu

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  margin: 16px;
`

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true)
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      theme='light'
    >
      <Logo>
        {collapsed ? (
          <KatalogLogoSmall style={{ height: '35px', fill: '#002140' }} />
        ) : (
          <KatalogLogo style={{ height: '35px', stroke: '#002140' }} />
        )}
      </Logo>
      <Menu theme='light' defaultSelectedKeys={['1']} mode='inline'>
        <Menu.Item icon={<ShopOutlined />} key='1'>
          Dashboard
        </Menu.Item>
        <SubMenu key='sub1' icon={<TagsOutlined />} title='Items'>
          <Menu.Item key='3'>Add</Menu.Item>
          <Menu.Item key='4'>List</Menu.Item>
          <Menu.Item key='5'>Import/Export</Menu.Item>
        </SubMenu>
        <SubMenu key='sub2' icon={<InboxOutlined />} title='Locations'>
          <Menu.Item key='6'>Add</Menu.Item>
          <Menu.Item key='8'>List</Menu.Item>
          <Menu.Item key='9'>Import/Export</Menu.Item>
        </SubMenu>
        <Menu.Item icon={<GlobalOutlined />} key='10'>
          Shipping
        </Menu.Item>
        <Menu.Item icon={<SettingOutlined />} key='11'>
          Settings
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Sidebar
