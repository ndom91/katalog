import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
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

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  margin: 16px;
`

const HomeIcon = () => (
  <svg
    width='18'
    height='18'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M10 12C9.44769 12 9 12.4477 9 13C9 13.5523 9.44769 14 10 14H14C14.5522 14 15 13.5523 15 13C15 12.4477 14.5522 12 14 12H10Z'
      fill='currentColor'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M4 2C2.34314 2 1 3.34314 1 5V19C1 20.6569 2.34314 22 4 22H20C21.6569 22 23 20.6569 23 19V5C23 3.34314 21.6569 2 20 2H4ZM20 4H4C3.44769 4 3 4.44769 3 5V8H21V5C21 4.44769 20.5522 4 20 4ZM3 19V10H21V19C21 19.5523 20.5522 20 20 20H4C3.44769 20 3 19.5523 3 19Z'
      fill='currentColor'
    />
  </svg>
)

const Wrapper = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>
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
        <Menu
          theme='light'
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode='inline'
        >
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
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className='site-layout-background'
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Katalog 2020</Footer>
      </Layout>
    </Layout>
  )
}

export default Wrapper
