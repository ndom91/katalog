import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import dayjs from 'dayjs'
import Router from 'next/router'
import { useSession } from 'next-auth/client'
import LoginRequired from '../../components/LoginRequired'
import Wrapper from '../../components/Layout'
import { CSVLink } from 'react-csv'
import RecentsTable from '../../components/Dashboard/Table.tsx'
import { Row, Col, Card, PageHeader, Button, Form } from 'antd'

import { withApollo } from '../../../apollo/client'
import { useQuery, gql } from '@apollo/client'

const ItemQuery = gql`
  query ItemQuery {
    items(orderBy: { date_added: desc }, last: 5) {
      id
      key: id
      title
      qty
      description
      type
      date_added
      updated_by
      location {
        description
      }
    }
    locations(first: 1) {
      total
    }
  }
`

const ItemsList = () => {
  const [form] = Form.useForm()
  const [session, loading] = useSession()
  const [items, setItems] = useState([])
  const { loading: loadingQuery, data, refetch } = useQuery(ItemQuery)
  useEffect(() => {
    data && setItems(data.items)
  }, [data])

  const exportData = data => {
    console.log(data)
  }

  return (
    <>
      {!loading && !session ? (
        <LoginRequired />
      ) : (
        <Wrapper>
          <Head>
            <title>Katalog | Item List</title>
          </Head>
          <PageHeader
            className='site-page-header-responsive'
            onBack={() => Router.back()}
            title='Item'
            subTitle='List'
            extra={[
              <>
                <CSVLink
                  filename={`katalogItems_${dayjs().format('DDMMYYYY')}.csv`}
                  data={items.flatMap(item => {
                    return {
                      name: item.title,
                      quantity: item.qty,
                      description: item.description,
                      type: item.type,
                      added: item.date_added,
                      updated: item.updated_by,
                      location: item.location.description,
                    }
                  })}
                >
                  <Button key='2' type='default'>
                    Export
                  </Button>
                </CSVLink>
                <Button
                  key='1'
                  type='primary'
                  loading={loadingQuery}
                  onClick={() => refetch()}
                >
                  Reload
                </Button>
              </>,
            ]}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card title='Overview' headStyle={{ fontSize: '1.5rem' }}>
                  <RecentsTable
                    items={items}
                    setItems={setItems}
                    pagination={true}
                  />
                </Card>
              </Col>
            </Row>
          </PageHeader>
        </Wrapper>
      )}
    </>
  )
}

export default withApollo(ItemsList)
