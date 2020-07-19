import React, { useState } from 'react'
import Wrapper from '../../components/Layout'
import { useSession } from 'next-auth/client'
import LoginRequired from '../../components/LoginRequired'
import { Row, Col, Card, PageHeader, Tabs, Button, Typography, message } from 'antd'
import { withApollo } from '../../../apollo/client'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

const { TabPane } = Tabs
const { Title } = Typography

const addLocationMutation = gql`
  mutation CreateLocationMutation(
    $desc: String
  ) {
    createOneLocation(
      data: {
        description: $desc
      }
    ) {
      id
      description
    }
  }
`

const LocationsAdd = () => {
  const [session, loading] = useSession()
  const [location, setLocation] = useState({})
  const [createLocation] = useMutation(addLocationMutation, {
    onCompleted: data => {
      console.log('completeAdd', data)
      message.success(`${data.createOneLocation.description} created`)
    },
  })

  const saveLocation = async () => {
    await createLocation({
      variables: {
        ...location,
      },
    })
  }
  return (
    <>
      {!session ? (
        <LoginRequired />
      ) : (
          <Wrapper>
            <PageHeader
              className='site-page-header-responsive'
              onBack={() => window.history.back()}
              title='Locations'
              subTitle='Add'
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
                      <Card title="Location Details" headStyle={{ fontSize: '1.5rem' }}>
                        <Form layout='vertical' form={form}>
                          <Form.Item label='Item Type' name='item-type' required>
                            <Input name='loc-description' value={location.desc}
                              onChange={event =>
                                setLocation({ ...location, desc: event.target.value })
                              } />
                          </Form.Item>
                        </Form>
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

export default LocationsAdd
