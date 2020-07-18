import React from 'react'
import Link from 'next/link'
import { Layout, Result, Button } from 'antd'

const { Header, Content, Footer } = Layout

const LoginRequired = () => {
  return (
    <Layout className='layout' style={{ height: '100vh' }}>
      <Header>
        <div className='logo' />
      </Header>
      <Content
        style={{
          padding: '0 50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: '1',
        }}
      >
        <div className='site-layout-content' style={{ marginBottom: '100px' }}>
          <Result
            status='error'
            title='Error'
            subTitle='You must be logged in to view this page'
            extra={[
              <Link href='/auth/email-signin'>
                <a href='' alt=''>
                  <Button type='primary' key='login'>
                    Login
                  </Button>
                </a>
              </Link>,
              <Button onClick={() => window.location.reload()} key='tryagain'>
                Try Again
              </Button>,
            ]}
          ></Result>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Katalog 2020</Footer>
    </Layout>
  )
}

export default LoginRequired
