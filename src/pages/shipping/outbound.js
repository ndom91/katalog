import React from 'react'
import { useSession } from 'next-auth/client'
import LoginRequired from '../../components/LoginRequired'
import Wrapper from '../../components/Layout'
import { Row, Col, Card, PageHeader, Tabs, Button, Typography } from 'antd'

const { TabPane } = Tabs
const { Title } = Typography

const Shipping = () => {
  const [session, loading] = useSession()
  return (
    <>
      {!session ? (
        <LoginRequired />
      ) : (
          <Wrapper>
            <PageHeader
              className='site-page-header-responsive'
              onBack={() => window.history.back()}
              title='Shipping'
              subTitle='Details'
              extra={[
                <Button key='2'>Clear</Button>,
                <Button key='1' type='primary'>
                  Save
              </Button>,
              ]}
            >
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card title='New Outbound'>
                    Test
                    </Card>
                </Col>
                <Col span={12}>
                  <Card title='Open Shipments'>
                    Test
                    </Card>
                </Col>
              </Row>
            </PageHeader>
          </Wrapper>
        )}
    </>
  )
}

export default Shipping
