import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Wrapper from '../components/Layout'
import RecentsTable from '../components/Dashboard/Table'
import LoginRequired from '../components/LoginRequired'
import { Row, Col, Statistic, Card, Skeleton, Typography } from 'antd'
import {
  BellOutlined,
  ShoppingOutlined,
  TableOutlined,
  TagOutlined,
} from '@ant-design/icons'

import { withApollo } from '../../apollo/client'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

const { Title } = Typography

const ItemQuery = gql`
  query ItemQuery {
    items(orderBy: { date_added: asc }, last: 5) {
      id
      title
      qty
      description
      type
      date_added
      updated_by
    }
  }
`

const Homepage: React.FC = () => {
  const [session] = useSession()
  const { loading, error, data } = useQuery(ItemQuery)
  const [items, setItems] = useState([])

  useEffect(() => {
    data && setItems(data.items)
  }, [data])

  return (
    <>
      {!session ? (
        <LoginRequired />
      ) : (
        <Wrapper>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card>
                <Statistic
                  title='Items'
                  value={items.length}
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
            <Title level={3}>Recent Items</Title>
            {loading ? (
              <Skeleton loading={loading} active />
            ) : (
              <RecentsTable items={items} setItems={setItems} />
            )}
          </Row>
        </Wrapper>
      )}
    </>
  )
}
export default withApollo(Homepage)
