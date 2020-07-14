import React from 'react'
import { Layout, Breadcrumb } from 'antd'
import GlobalStyle from '../style/global.js'
import Sidebar from './Sidebar'

const { Header, Content, Footer } = Layout

const Wrapper = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>
      <GlobalStyle />
      <Sidebar />
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
