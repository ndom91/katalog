import React from 'react'
import Wrapper from '../../components/Layout'
import {
  Row,
  Col,
  Card,
  PageHeader,
  Tabs,
  Button,
  Typography,
} from 'antd'

const { TabPane } = Tabs
const { Title } = Typography

const ItemsList = () => (
  <Wrapper>
    <PageHeader
      className='site-page-header-responsive'
      onBack={() => window.history.back()}
      title='Item'
      subTitle='List'
      extra={[
        <Button key='2'>Clear</Button>,
        <Button key='1' type='primary'>
          Save
        </Button>,
      ]}
    >
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Details' key='1'>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card>
                <Title level={3}>Item Details</Title>
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Title level={3}>Images</Title>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab='Location' key='2'>
          <Row>
            <Col span={24}>
              <Card>
                <Title level={3}>Assign Location</Title>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </PageHeader>
  </Wrapper>
)

export default ItemsList
