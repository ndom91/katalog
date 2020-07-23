import { UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Dropdown, Input, Layout, Menu } from 'antd'
import { signOut, useSession } from 'next-auth/client'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import GlobalStyle from '../style/global.js'
import Sidebar from './Sidebar'

const { Header, Content, Footer } = Layout
const { Search } = Input

const SearchBar = styled(Search)`
  margin-right: 20px;
  background-color: #fff;
  border: 1px solid #002140;
  .ant-input-search-icon::before {
    border-color: #002140;
  }
  input {
    background-color: #fff;
    color: #002140;
  }
  svg {
    fill: #002140;
  }
`

const Wrapper = ({ children }) => {
  const [session, loading] = useSession()
  const [isMobile, setIsMobile] = useState(false)
  const getInitials = string =>
    string
      .split(' ')
      .map(([firstLetter]) => firstLetter)
      .filter((_, index, array) => index === 0 || index === array.length - 1)
      .join('')
      .toUpperCase()

  let initials = 'NT'
  if (!loading && !session.user.image && session.user.name) {
    initials = getInitials(session.user.name)
  }
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
        <Header
          className='site-layout-background'
          style={{
            padding: '15px',
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
            background: '#002140',
          }}
        >
          <SearchBar
            placeholder=''
            onSearch={value => console.log(value)}
            style={{ width: '20rem' }}
          />
          <Dropdown
            css={`
              &:hover {
                cursor: pointer;
              }
            `}
            trigger='click'
            overlay={() => (
              <Menu>
                <Menu.Item key='1' icon={<UserOutlined />}>
                  <a
                    href={`/api/auth/signout`}
                    onClick={() => {
                      signOut()
                    }}
                  >
                    Sign out
                  </a>
                </Menu.Item>
              </Menu>
            )}
          >
            <Badge count={0}>
              <Avatar
                src={!loading && session.user.image ? session.user.image : ''}
                shape='square'
                style={{
                  color: '#3a64d5',
                  backgroundColor: '#002140',
                  border: '1px solid #fff',
                }}
              >
                {initials}
              </Avatar>
            </Badge>
          </Dropdown>
        </Header>
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
