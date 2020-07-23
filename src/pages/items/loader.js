import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Wrapper from '../../components/Layout'
import { useSession } from 'next-auth/client'
import LoginRequired from '../../components/LoginRequired'
import { Row, Col, Card, PageHeader, Tabs, Button, Typography } from 'antd'

const { TabPane } = Tabs
const { Title } = Typography

const ItemsLoader = () => {
  const [session, loading] = useSession()
  return (
    <>
      {!session ? (
        <LoginRequired />
      ) : (
        <Wrapper>
          <Head>
            <title>Katalog | Item Import</title>
          </Head>
          <PageHeader
            className='site-page-header-responsive'
            onBack={() => Router.back()}
            title='Item'
            subTitle='Import / Export'
            extra={[
              <Button key='2'>Clear</Button>,
              <Button key='1' type='primary'>
                Import
              </Button>,
            ]}
          >
            <Tabs defaultActiveKey='1'>
              <TabPane tab='Import' key='1'>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Card>
                      <Title level={3}>Import Items</Title>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab='Export' key='2'>
                <Row>
                  <Col span={24}>
                    <Card>
                      <Title level={3}>Export Items Data</Title>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </PageHeader>
        </Wrapper>
      )}
    </>
  )
}

export default ItemsLoader
