import React, { useState } from 'react'
import { RIEInput } from 'riek'
import Wrapper from '../../components/Layout'
import {
  Row,
  Col,
  Card,
  PageHeader,
  Tabs,
  Button,
  Typography,
  Form,
  Carousel,
} from 'antd'

const { TabPane } = Tabs
const { Title } = Typography

const ItemsList = () => {
  const [form] = Form.useForm()
  const [item, setItem] = useState({
    title: 'New Title',
    desc: '',
    qty: 0,
    price: 0.0,
    purchaseDate: '',
  })
  return (
    <Wrapper>
      <PageHeader
        className='site-page-header-responsive'
        onBack={() => window.history.back()}
        title='Item'
        subTitle='List'
        extra={[
          <Button key='1' type='primary'>
            Edit
          </Button>,
        ]}
      >
        <Tabs defaultActiveKey='1'>
          <TabPane tab='Details' key='1'>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card>
                  <Title level={3}>Item Details</Title>
                  <Form layout='vertical' form={form}>
                    <Form.Item label='Title'>
                      <RIEInput
                        className='rieInput'
                        classEditing='rieInput-editing'
                        value={item.title}
                        change={chg => setItem({ ...item, title: chg.title })}
                        validate={() => {
                          return true
                        }}
                        shouldRemainWhileInvalid={true}
                        propName='title'
                      />
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Title level={3}>Images</Title>
                  <Form.Item>
                    <Carousel autoplay>
                      <div>
                        <h3>1</h3>
                      </div>
                      <div>
                        <h3>2</h3>
                      </div>
                      <div>
                        <h3>3</h3>
                      </div>
                      <div>
                        <h3>4</h3>
                      </div>
                    </Carousel>
                  </Form.Item>
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
}

export default ItemsList
