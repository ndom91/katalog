import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import { signOut, useSession } from 'next-auth/client'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Dropdown, Input, Layout, Menu } from 'antd'
const { Header } = Layout
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

const AppHeader = () => {
  const [session, loading] = useSession()
  const [initials, setInitials] = useState('NT')
  const getInitials = string =>
    string
      .split(' ')
      .map(([firstLetter]) => firstLetter)
      .filter((_, index, array) => index === 0 || index === array.length - 1)
      .join('')
      .toUpperCase()

  useEffect(() => {
    if (session && !session.user.image && session.user.name) {
      setInitials(getInitials(session.user.name))
    }
  }, [])
  return (
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
          {session && session.user.image ? (
            <Avatar
              src={session.user.image}
              shape='square'
              style={{
                color: '#3a64d5',
                backgroundColor: '#002140',
                border: '1px solid #fff',
              }}
            />
          ) : (
            <Avatar
              shape='square'
              style={{
                color: '#3a64d5',
                backgroundColor: '#002140',
                border: '1px solid #fff',
              }}
            >
              {initials}
            </Avatar>
          )}
        </Badge>
      </Dropdown>
    </Header>
  )
}

export default AppHeader
