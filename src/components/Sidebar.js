import React, { useState } from 'react'
import Link from 'next/link'
import { Layout, Menu } from 'antd'
import styled from 'styled-components'
import KatalogLogo from '../assets/svg/katalog_full.svg'
import KatalogLogoSmall from '../assets/svg/katalog_icon.svg'
import {
  ShopOutlined,
  TagsOutlined,
  InboxOutlined,
  GlobalOutlined,
  ControlOutlined,
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
          <Link href='/'>Dashboard</Link>
        </Menu.Item>
        <SubMenu key='sub1' icon={<TagsOutlined />} title='Items'>
          <Menu.Item key='3'>
            <Link href='/items/add'>Add</Link>
          </Menu.Item>
          <Menu.Item key='4'>
            <Link href='/items/list'>List</Link>
          </Menu.Item>
          <Menu.Item key='5'>
            <Link href='/items/loader'>Import/Export</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key='sub2' icon={<InboxOutlined />} title='Locations'>
          <Menu.Item key='6'>
            <Link href='/locations/add'>Add</Link>
          </Menu.Item>
          <Menu.Item key='8'>
            <Link href='/locations/list'>List</Link>
          </Menu.Item>
          <Menu.Item key='9'>
            <Link href='/locations/loader'>Import/Export</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item icon={<GlobalOutlined />} key='10'>
          <Link href='/shipping'>Shipping</Link>
        </Menu.Item>
        <Menu.Item icon={<ControlOutlined />} key='11'>
          <Link href='/settings'>Settings</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Sidebar
