import React, { useState } from 'react'
import Wrapper from '../../components/Layout'
import ImageUpload from '../../components/Items/ImageUpload'
import { RIEInput } from 'riek'
import './items.module.css'
import {
  Row,
  Col,
  Card,
  PageHeader,
  Tabs,
  Typography,
  Form,
  Input,
  Button,
  Radio,
  Slider,
  InputNumber,
  Select,
} from 'antd'
import {
  ApiTwoTone,
  HomeTwoTone,
  SaveTwoTone,
  ContactsTwoTone,
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Title } = Typography
const { Option } = Select

const ItemsAdd = () => {
  const [form] = Form.useForm()
  const [item, setItem] = useState({
    title: 'New Title',
    desc: '',
    qty: 0,
  })

  const updateTitle = title => {
    setItem({
      ...item,
      title: title.title,
    })
  }
  const updateQty = qty => {
    setItem({
      ...item,
      qty,
    })
  }
  const updateAsset = data => {
    console.log(data)
  }

  return (
    <Wrapper>
      <PageHeader
        className='site-page-header-responsive'
        onBack={() => window.history.back()}
        title='Item'
        subTitle='Create New'
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
                  <Form layout='vertical' form={form}>
                    <Form.Item label='Item Type' name='item-type'>
                      <Radio.Group className='itemType-wrapper'>
                        <Radio.Button className='itemType-radio' value='net'>
                          Network
                          <ApiTwoTone style={{ fontSize: '2rem' }} />
                        </Radio.Button>
                        <Radio.Button className='itemType-radio' value='int'>
                          Internal
                          <HomeTwoTone style={{ fontSize: '2rem' }} />
                        </Radio.Button>
                        <Radio.Button className='itemType-radio' value='cust'>
                          Customer
                          <ContactsTwoTone style={{ fontSize: '2rem' }} />
                        </Radio.Button>
                        <Radio.Button
                          className='itemType-radio'
                          value='storage'
                        >
                          Storage
                          <SaveTwoTone style={{ fontSize: '2rem' }} />
                        </Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item label='Asset Type' name='asset-type'>
                      <Select defaultValue='' onChange={updateAsset}>
                        <Option value='cash'>Cash +</Option>
                        <Option value='inventory'>Inventory</Option>
                        <Option value='investment'>Investment</Option>
                        <Option value='ppe'>Plant / Equipment</Option>
                        <Option value='vehicles'>Vehicle</Option>
                        <Option value='furniture'>Furniture</Option>
                        <Option value='patents'>Intangible</Option>
                        <Option value='stock'>Stock</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label='Title'>
                      <RIEInput
                        className='rieInput'
                        classEditing='rieInput-editing'
                        value={item.title}
                        change={updateTitle}
                        validate={() => {
                          return true
                        }}
                        shouldRemainWhileInvalid={true}
                        propName='title'
                      />
                    </Form.Item>
                    <Form.Item label='Quantity'>
                      <Row>
                        <Col span={18}>
                          <Slider
                            min={1}
                            max={20}
                            onChange={updateQty}
                            value={typeof item.qty === 'number' ? item.qty : 0}
                          />
                        </Col>
                        <Col span={4}>
                          <InputNumber
                            min={1}
                            style={{ margin: '0 16px' }}
                            value={item.qty}
                            onChange={updateQty}
                          />
                        </Col>
                      </Row>
                    </Form.Item>
                    <Form.Item label='Description'>
                      <Input placeholder='input placeholder' />
                    </Form.Item>
                    <Form.Item>
                      <Button type='primary'>Submit</Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Title level={3}>Images</Title>
                  <ImageUpload />
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

export default ItemsAdd
