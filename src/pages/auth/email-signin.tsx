import React from 'react'
import Router from 'next/router'
import { Card, Form, Input, Button } from 'antd'
import { csrfToken, signin, getSession } from 'next-auth/client'
import styled from 'styled-components'
import KatalogLogo from '../../assets/svg/katalog_full.svg'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  transform: rotate(11deg) translate(-20%, -10%);
  position: fixed;
  top: 0px;
  left: 0px;
  width: 80%;
  height: 150%;
  background-color: #002140;
  z-index: 1;
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
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  width: 300px;
  margin-left: 15%;
`

export default ({ csrfToken, session }) => {
  const [form] = Form.useForm()
  if (typeof window !== 'undefined' && session) {
    Router.push('/')
  }

  return (
    <>
      <Wrapper></Wrapper>
      <Content>
        <CardWrapper>
          <KatalogLogo style={{ height: '85px', marginBottom: '20px' }} />
          <Card bordered={false} style={{ width: '100%' }}>
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
            >
              <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
              <Form.Item
                label='Email'
                style={{ fontWeight: 100 }}
                colon={false}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name='email'
                id='email'
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType='submit' block>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </CardWrapper>
      </Content>
    </>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await csrfToken(context),
      session: await getSession(context),
    },
  }
}
