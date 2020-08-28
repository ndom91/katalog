import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Wrapper from '../../components/Layout'
import { useSession } from 'next-auth/client'
import LoginRequired from '../../components/LoginRequired'
import {
  Row,
  Col,
  Card,
  PageHeader,
  Tabs,
  Button,
  Typography,
  Form,
  Input,
  message,
  Select,
  Tree,
} from 'antd'
import { withApollo } from '../../../apollo/client'
import { useQuery, useMutation, gql } from '@apollo/client'

const { TabPane } = Tabs
const { Title } = Typography
const { Option } = Select
const { DirectoryTree } = Tree

const addLocationMutation = gql`
  mutation CreateLocationMutation($description: String) {
    createOneLocation(data: { description: $description }) {
      id
      description
    }
  }
`
const getLocationsQuery = gql`
  query getAllLocation {
    allLocations {
      id
      description
    }
  }
`

const LocationsAdd = () => {
  const [form] = Form.useForm()
  const [session, loading] = useSession()
  const [location, setLocation] = useState({ description: '', parent: 0 })
  const [treeData, setTreeData] = useState({})
  const { data } = useQuery(getLocationsQuery)
  const [createLocation] = useMutation(addLocationMutation, {
    onCompleted: data => {
      message.success(`${data.createOneLocation.description} created`)
    },
  })

  useEffect(() => {
    let treeCounter = 0
    let data = []
    data.forEach(loc => {
      if (!loc.parent) {
        data.push({
          title: loc.description,
          key: `0-${treeCounter}`,
          children: [],
        })
        treeCounter++
      }
    })
    setTreeData(data)
  }, [data])

  const saveLocation = async () => {
    await createLocation({
      variables: {
        ...location,
      },
    })
  }
  return (
    <>
      {!loading && !session ? (
        <LoginRequired />
      ) : (
        <Wrapper>
          <Head>
            <title>Katalog | Location Add</title>
          </Head>
          <PageHeader
            className='site-page-header-responsive'
            onBack={() => Router.back()}
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
                    <Card title='Create New' headStyle={{ fontSize: '1.5rem' }}>
                      <Form layout='vertical' form={form}>
                        <Form.Item label='Name' name='item-type' required>
                          <Input
                            name='loc-description'
                            value={location.description}
                            onChange={event =>
                              setLocation({
                                ...location,
                                description: event.target.value,
                              })
                            }
                          />
                        </Form.Item>
                        <Form.Item label='Name' name='item-type' required>
                          <Select
                            showSearch
                            placeholder='Parent'
                            optionFilterProp='children'
                            onChange={value =>
                              setLocation({ ...location, parent: value })
                            }
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {data &&
                              data.allLocations.map(location => (
                                <Option value={location.id}>
                                  {location.description}
                                </Option>
                              ))}
                          </Select>
                        </Form.Item>
                      </Form>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title='Locations' headStyle={{ fontSize: '1.5rem' }}>
                      <DirectoryTree
                        multiple
                        defaultExpandAll
                        treeData={treeData}
                      />
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

export default withApollo(LocationsAdd)
