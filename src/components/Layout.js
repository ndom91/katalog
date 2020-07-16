import React from 'react'
import styled from 'styled-components'
import { Layout, Input, Avatar, Badge } from 'antd'
import GlobalStyle from '../style/global.js'
import Sidebar from './Sidebar'

const { Header, Content, Footer } = Layout
const { Search } = Input

const SearchBar = styled(Search)`
  margin-right: 20px;
  background-color: #002140;
  border: 1px solid #fff;
  .ant-input-search-icon::before {
    border-color: #fff;
  }
  input {
    background-color: #002140;
    color: #fff;
  }
  svg {
    fill: #fff;
  }
`

const Wrapper = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>
      <GlobalStyle />
      <Sidebar />
      <Layout className='site-layout'>
        <Header
          className='site-layout-background'
          style={{
            padding: '15px',
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <SearchBar
            placeholder=''
            onSearch={value => console.log(value)}
            style={{ width: '20rem' }}
          />
          <Badge count={1}>
            <Avatar
              shape='square'
              style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
            >
              U
            </Avatar>
          </Badge>
        </Header>
        <Content style={{ margin: '0 16px' }}>
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
