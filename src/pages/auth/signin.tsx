import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { Card, Form, Input, Button, Divider } from 'antd'
import { csrfToken, signin, getSession, getProviders } from 'next-auth/client'
import styled from 'styled-components'
import KatalogLogo from '../../assets/svg/katalog_full.svg'
import KatalogLogoSmall from '../../assets/svg/katalog_icon.svg'
import Pattern from '../../assets/svg/login_pattern.svg'
import { generateMedia } from 'styled-media-query'
import { GoogleOutlined } from '@ant-design/icons'

const customMedia = generateMedia({
  huge: '1440px',
  large: '1170px',
  medium: '600px',
  small: '450px',
})

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  transform: rotate(11deg) translate(-20%, -10%);
  position: fixed;
  top: 0px;
  left: 0px;
  width: 70%;
  height: 150%;
  background-color: #002140;
  z-index: 2;

  ${customMedia.lessThan('large')`
    left: -50px; 
  `}

  ${customMedia.lessThan('medium')`
    left: -100px; 
    width: 80%;
  `}
`

const Content = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  position: relative;
  z-index: 2;
  padding: 30px;
  text-align: center;
  font-weight: bold;
  ${customMedia.lessThan('medium')`
    justify-content: center;
  `}
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  width: 400px;
  margin-left: 15%;
  z-index: 3;
  font-size: 1.2rem;
  ${customMedia.lessThan('medium')`
    margin-left: 0px;
  `}
`
const StyledPattern = styled(Pattern)`
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: auto;

  ${customMedia.lessThan('medium')`
    height: 100%;
    width: auto;
  `}
`

type Props = {
  csrfToken: any
  session: any
  providers: { id: number; name: string; signinUrl: string }[]
}

export default ({ csrfToken, session, providers }: Props) => {
  const [form] = Form.useForm()
  const [isMobile, setIsMobile] = useState(false)
  if (typeof window !== 'undefined' && session) {
    Router.push('/')
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 600)
    }
  }, [])

  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <Wrapper></Wrapper>
      <Content>
        <CardWrapper>
          {isMobile ? (
            <KatalogLogoSmall
              width='96px'
              height='96px'
              style={{ height: '85px', position: 'absolute', top: '60px' }}
            />
          ) : (
            <KatalogLogo style={{ height: '85px', marginBottom: '20px' }} />
          )}
          <Card bordered={false} style={isMobile ? { marginTop: '120px' } : { width: '100%' }}>
            <Form
              form={form}
              name='login'
              hideRequiredMark
              initialValues={{
                remember: true,
              }}
              method='post'
              action='/api/auth/signin/email'
              onFinish={() => {
                signin('email', { email: form.getFieldValue('email') })
              }}
              style={{ fontSize: '1.2rem' }}
            >
              <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
              <Form.Item
                style={{ fontWeight: 100 }}
                colon={false}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name='email'
                id='email'
              >
                <Input placeholder='Email' size='large' />
              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType='submit' block size='large'>
                  Submit
                </Button>
              </Form.Item>
              {providers && <Divider style={{ padding: '0 20px' }} />}
              {providers &&
                Object.values(providers).map(provider => {
                  if (provider.name === 'Email') return null
                  return (
                    <Form.Item key={provider.name} style={{ marginBottom: 0 }}>
                      <a href={provider.signinUrl} onClick={e => e.preventDefault()}>
                        <Button
                          type='default'
                          block
                          onClick={() => signin(provider.id)}
                          size='large'
                        >
                          Sign in with{' '}
                          {provider.name === 'Google' ? <GoogleOutlined /> : provider.name}
                        </Button>
                      </a>
                    </Form.Item>
                  )
                })}
            </Form>
          </Card>
        </CardWrapper>
      </Content>
      <StyledPattern />
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await csrfToken(context),
      session: await getSession(context),
      providers: await getProviders(context),
    },
  }
}
