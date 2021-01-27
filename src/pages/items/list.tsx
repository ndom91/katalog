import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import dayjs from 'dayjs'
import Router from 'next/router'
import { useSession } from 'next-auth/client'
import LoginRequired from '../../components/LoginRequired'
import Wrapper from '../../components/Layout'
import { CSVLink } from 'react-csv'
import RecentsTable from '../../components/Dashboard/Table'
import { Row, Col, Card, PageHeader, Button } from 'antd'

import { withApollo } from '../../../apollo/client'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const ItemQuery = gql`
  query ItemQuery {
    items(orderBy: { date_added: desc }) {
      id
      key: id
      title
      qty
      description
      type
      date_added
      updated_by
      status {
        name
      }
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
  const [session, loading] = useSession()
  const [items, setItems] = useState([])
  const { loading: loadingQuery, data, refetch } = useQuery(ItemQuery)

  useEffect(() => {
    data && setItems(data.items)
    console.log(data)
  }, [data])

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
                      quantity: item.qty ? item.qty : 0,
                      description: item.description ? item.description : '',
                      type: item.type ? item.type : '',
                      added: item.date_added,
                      updated: item.updated_by,
                      location: item.location ? item.location.description : '',
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
