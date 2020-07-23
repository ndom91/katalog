import React from 'react'
import Link from 'next/link'
import { Layout, Result, Button } from 'antd'
import Illustration from '../assets/svg/error1.svg'

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
            icon={<Illustration />}
            subTitle='You must be logged in to view this page'
            extra={[
              <Link href='/auth/signin'>
                <Button type='primary' key='login'>
                  Login
                </Button>
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
