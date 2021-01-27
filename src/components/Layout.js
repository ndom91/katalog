import { Layout } from 'antd'
import { useSession } from 'next-auth/client'
import React, { useState, useEffect } from 'react'
import GlobalStyle from '../style/global.js'
import Sidebar from './Sidebar'
import AppHeader from './Header'

const { Content, Footer } = Layout

const Wrapper = ({ children }) => {
  const [session] = useSession()
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 600)
    }
  }, [])

  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>
      <GlobalStyle />
      <Sidebar />
      <Layout className='site-layout'>
        <AppHeader />
        <Content style={{ margin: '0 16px' }}>
          <div
            className='site-layout-background'
            style={{ padding: isMobile ? 0 : 24, minHeight: 360 }}
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
