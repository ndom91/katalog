import React from 'react'
import Wrapper from '../components/Layout'
import RecentsTable from '../components/Dashboard/Table'
import { Row, Col, Statistic, Card, Breadcrumb } from 'antd'
import {
  BellOutlined,
  ShoppingOutlined,
  TableOutlined,
  TagOutlined,
} from '@ant-design/icons'

const Homepage = () => (
  <Wrapper
    breadcrumb={
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
    }
  >
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <Card>
          <Statistic
            title='Items'
            value={253}
            precision={0}
            valueStyle={{ color: '#3f8600' }}
            prefix={<TagOutlined />}
            suffix=''
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title='Locations'
            value={58}
            precision={0}
            valueStyle={{ color: '#3f8600' }}
            prefix={<TableOutlined />}
            suffix=''
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title='Active Shipments'
            value={6}
            precision={0}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ShoppingOutlined />}
            suffix=''
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title='Notifications'
            value={3}
            precision={0}
            valueStyle={{ color: '#3f8600' }}
            prefix={<BellOutlined />}
            suffix=''
          />
        </Card>
      </Col>
    </Row>
    <Row>
      <RecentsTable />
    </Row>
  </Wrapper>
)
export default Homepage
