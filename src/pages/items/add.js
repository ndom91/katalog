import React, { useState } from 'react'
import Wrapper from '../../components/Layout'
import ImageUpload from '../../components/Items/ImageUpload'
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
  DatePicker,
  Space,
  Collapse,
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
const { Panel } = Collapse

const ItemsAdd = () => {
  const [form] = Form.useForm()
  const [loc, setLoc] = useState({
    title: '',
  })
  const [item, setItem] = useState({
    company: '',
    title: '',
    desc: '',
    assetTag: '',
    serial: '',
    status: '',
    supplier: '',
    orderNr: '',
    notes: '',
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
                    <Form.Item label='Item Type' name='item-type' required>
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
                    <Form.Item label='Title' required>
                      <Input
                        value={item.title}
                        onChange={chg => setItem({ ...item, title: chg.title })}
                      />
                    </Form.Item>
                    <Form.Item label='Quantity' required>
                      <Row>
                        <Col span={18}>
                          <Slider
                            min={1}
                            max={20}
                            onChange={qty => setItem({ ...item, qty })}
                            value={typeof item.qty === 'number' ? item.qty : 0}
                          />
                        </Col>
                        <Col span={4}>
                          <InputNumber
                            min={1}
                            style={{ margin: '0 16px' }}
                            value={item.qty}
                            onChange={qty => setItem({ ...item, qty })}
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
              <Col span={12} gutter={[16, 16]}>
                <Space
                  direction='vertical'
                  size='middle'
                  style={{ width: '100%' }}
                >
                  <Card>
                    <Title level={3}>Financial Details</Title>
                    <Form layout='vertical' form={form}>
                      <Row>
                        <Col span={12}>
                          <Form.Item label='Purchase Price'>
                            <Input.Group compact>
                              <InputNumber
                                defaultValue={1000}
                                formatter={value =>
                                  `$ ${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ','
                                  )
                                }
                                parser={value =>
                                  value.replace(/\$\s?|(,*)/g, '')
                                }
                                value={item.price}
                                onChange={price => setItem({ ...item, price })}
                                addonBefore={<currencySuffix />}
                                style={{ width: 'calc( 95% - 80px)' }}
                              />
                              <Select style={{ width: 80 }} defaultValue='EUR'>
                                <Option value='EUR'>EUR</Option>
                                <Option value='USD'>USD</Option>
                              </Select>
                            </Input.Group>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label='Purchase Date'>
                            <DatePicker
                              style={{ width: '100%' }}
                              onChange={date =>
                                setItem({ ...item, purchaseDate: date })
                              }
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item label='Asset Type' name='asset-type'>
                        <Select
                          defaultValue=''
                          onChange={data => console.log(data)}
                        >
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
                    </Form>
                  </Card>
                  <Card>
                    <Title level={3}>Images</Title>
                    <ImageUpload />
                  </Card>
                </Space>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab='Location' key='2'>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card>
                  <Title level={3}>Select Location</Title>
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Title level={3}>Create New Location</Title>
                  <Form layout='vertical' form={form}>
                    <Form.Item label='Name' name='loc-name'>
                      <Input
                        value={loc.title}
                        onChange={chg => setLoc({ ...item, title: chg.title })}
                      />
                    </Form.Item>
                    <Form.Item label='Area' name='loc-area'>
                      <Select
                        defaultValue=''
                        onChange={data => console.log(data)}
                      >
                        <Option value='office'>Office</Option>
                        <Option value='itenos'>Itenos</Option>
                        <Option value='equinix'>Equinix</Option>
                      </Select>
                    </Form.Item>
                  </Form>
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
