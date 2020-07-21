import React, { useRef, useState } from 'react'
import Router from 'next/router'
import { useSession } from 'next-auth/client'
import Wrapper from '../../components/Layout'
import ImageUpload from '../../components/Items/ImageUpload'
import LoginRequired from '../../components/LoginRequired'
import './items.module.css'
import { withApollo } from '../../../apollo/client'
import { useQuery, useMutation, gql } from '@apollo/client'
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
  message,
  Tooltip,
  Collapse,
  Switch,
  Carousel,
  Steps,
} from 'antd'
import {
  ApiTwoTone,
  HomeTwoTone,
  SaveTwoTone,
  ContactsTwoTone,
  QuestionCircleOutlined,
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Title, Link } = Typography
const { Option } = Select
const { Panel } = Collapse
const { Step } = Steps

const addItemMutation = gql`
  mutation CreateItemMutation(
    $title: String!
    $qty: Int
    $desc: String
    $type: String
    $location: Int
    $updated_by: String!
    $date_added: DateTime!
  ) {
    createOneItem(
      data: {
        title: $title
        qty: $qty
        type: $type
        description: $desc
        updated_by: $updated_by
        date_added: $date_added
        location: { connect: { id: $location } }
      }
    ) {
      id
      title
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

const ItemsAdd = () => {
  const [session] = useSession()
  const [form] = Form.useForm()
  const initialItem = {
    title: '',
    desc: '',
    type: '',
    qty: 0,
    location: '',
  }
  const [item, setItem] = useState(initialItem)
  const [fibu, setFibu] = useState({})
  const [fibuCurrentStep, setFibuCurrentStep] = useState(0)
  const carouselRef = useRef()

  const { data } = useQuery(getLocationsQuery)
  const [createItem] = useMutation(addItemMutation, {
    onCompleted: data => {
      message.success(`${data.createOneItem.title} created`)
    },
  })

  const saveItem = async () => {
    const date = new Date()
    const currentUser = session.user.email
    await createItem({
      variables: {
        ...item,
        date_added: date.toISOString(),
        updated_by: currentUser,
      },
    })
  }

  const clearForm = () => {
    setItem({})
    setFibu({})
  }

  return (
    <>
      {!session ? (
        <LoginRequired />
      ) : (
        <Wrapper>
          <PageHeader
            className='site-page-header-responsive'
            onBack={() => Router.back()}
            title='Item'
            subTitle='Create New'
            extra={[
              <>
                <Button key='2' onClick={() => setItem(initialItem)}>
                  Clear
                </Button>
                <Button key='1' type='primary' onClick={saveItem}>
                  Save
                </Button>
              </>,
            ]}
          >
            <Tabs defaultActiveKey='1'>
              <TabPane tab='Details' key='1'>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Card title='Item' headStyle={{ fontSize: '1.5rem' }}>
                      <Form layout='vertical' form={form}>
                        <Form.Item label='Item Type' name='item-type' required>
                          <Radio.Group
                            className='itemType-wrapper'
                            value={item.type}
                            onChange={event =>
                              setItem({ ...item, type: event.target.value })
                            }
                          >
                            <Radio.Button
                              className='itemType-radio'
                              value='net'
                            >
                              Network
                              <ApiTwoTone style={{ fontSize: '2rem' }} />
                            </Radio.Button>
                            <Radio.Button
                              className='itemType-radio'
                              value='int'
                            >
                              Internal
                              <HomeTwoTone style={{ fontSize: '2rem' }} />
                            </Radio.Button>
                            <Radio.Button
                              className='itemType-radio'
                              value='cust'
                            >
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
                            onChange={event =>
                              setItem({ ...item, title: event.target.value })
                            }
                          />
                        </Form.Item>
                        <Row>
                          <Col span={12}>
                            <Form.Item label='Quantity' required>
                              <InputNumber
                                min={1}
                                style={{ width: '95%' }}
                                value={item.qty}
                                onChange={qty => setItem({ ...item, qty })}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item label='Location'>
                              <Select
                                showSearch
                                placeholder='Select a location'
                                optionFilterProp='children'
                                onChange={value =>
                                  setItem({ ...item, location: value })
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
                          </Col>
                        </Row>
                        <Form.Item label='Description'>
                          <Input
                            placeholder=''
                            value={item.desc}
                            onChange={event =>
                              setItem({ ...item, desc: event.target.value })
                            }
                          />
                        </Form.Item>
                      </Form>
                    </Card>
                  </Col>
                  <Col span={12} gutter={[16, 16]}>
                    <Card title='Images' headStyle={{ fontSize: '1.5rem' }}>
                      <ImageUpload />
                    </Card>
                    <Space
                      direction='vertical'
                      size='middle'
                      style={{ width: '100%' }}
                    >
                      <Card
                        extra={
                          <Link
                            href='https://www.datev.de/dnlexom/client/app/index.html#/document/9211235'
                            target='_blank'
                          >
                            FiBu Help
                          </Link>
                        }
                        title='Financial Details'
                        headStyle={{ fontSize: '1.5rem' }}
                      >
                        <Form layout='vertical' form={form}>
                          <Row>
                            <Col span={12}>
                              <Form.Item
                                label='Purchase Price'
                                style={{ position: 'relative' }}
                              >
                                <Tooltip title='AHK Wirtschaftsjahr-Ende'>
                                  <a
                                    href='#API'
                                    style={{
                                      margin: '0 8px',
                                      position: 'absolute',
                                      top: '-30px',
                                      right: '10px',
                                    }}
                                  >
                                    <QuestionCircleOutlined />
                                  </a>
                                </Tooltip>
                                <Input.Group compact>
                                  <InputNumber
                                    defaultValue={1000}
                                    formatter={value =>
                                      `${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ','
                                      )
                                    }
                                    parser={value =>
                                      value.replace(/\$\s?|(,*)/g, '')
                                    }
                                    value={fibu.ahkWjEnde}
                                    onChange={price =>
                                      setFibu({ ...fibu, ahkWjEnde: price })
                                    }
                                    style={{ width: 'calc( 95% - 80px)' }}
                                  />
                                  <Select
                                    style={{ width: 80 }}
                                    defaultValue='EUR'
                                  >
                                    <Option value='EUR'>EUR</Option>
                                    <Option value='USD'>USD</Option>
                                  </Select>
                                </Input.Group>
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                label='Purchase Date'
                                style={{ position: 'relative' }}
                              >
                                <Tooltip title='Bestelldatum'>
                                  <a
                                    href='#API'
                                    style={{
                                      position: 'absolute',
                                      top: '-30px',
                                      right: '10px',
                                    }}
                                  >
                                    <QuestionCircleOutlined />
                                  </a>
                                </Tooltip>
                                <DatePicker
                                  style={{ width: '100%' }}
                                  onChange={date =>
                                    setFibu({ ...fibu, bestellDatum: date })
                                  }
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row justify='space-between'>
                            <Col span={7}>
                              <Form.Item label='Inventory Nr.'>
                                <Input
                                  name='fibu-inventory'
                                  value={fibu.inventory}
                                  onChange={event =>
                                    setFibu({
                                      ...fibu,
                                      inventory: event.target.value,
                                    })
                                  }
                                />
                              </Form.Item>
                            </Col>
                            <Col span={7}>
                              <Form.Item label='Account Nr.'>
                                <Input
                                  name='fibu-account'
                                  value={fibu.account}
                                  onChange={event =>
                                    setFibu({
                                      ...fibu,
                                      account: event.target.value,
                                    })
                                  }
                                />
                              </Form.Item>
                            </Col>
                            <Col span={7}>
                              <Form.Item label='Serial Nr.'>
                                <Input
                                  name='fibu-serial'
                                  value={fibu.serial}
                                  onChange={event =>
                                    setFibu({
                                      ...fibu,
                                      serial: event.target.value,
                                    })
                                  }
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Form>
                      </Card>
                    </Space>
                  </Col>
                </Row>
                <Card
                  title='Finance Continued'
                  style={{ width: '100%' }}
                  headStyle={{ fontSize: '1.5rem' }}
                  extra={
                    <Link
                      href='https://www.datev.de/dnlexom/client/app/index.html#/document/9211235'
                      target='_blank'
                    >
                      FiBu Help
                    </Link>
                  }
                >
                  <Steps
                    type='navigation'
                    size='small'
                    current={fibuCurrentStep}
                    onChange={step => {
                      carouselRef.current.slick.slickGoTo(step)
                      setFibuCurrentStep(step)
                    }}
                    className='site-navigation-steps'
                  >
                    <Step status='stamm' title='Stamm'></Step>
                    <Step status='afaVorschau' title='AfA-Vorschau'></Step>
                    <Step status='abschreibung' title='Abschreibung'></Step>
                    <Step
                      status='sonderabschreibung'
                      title='Sonderabschreibung'
                    ></Step>
                    <Step status='bewegung' title='Bewegung'></Step>
                  </Steps>
                  <Carousel
                    ref={carouselRef}
                    dots={false}
                    className='fibu-carousel'
                  >
                    <Form layout='vertical' labelAlign='left' colon={false}>
                      <Form.Item label='Kostenstelle 1'>
                        <Input
                          name='fibu-kost1'
                          value={fibu.kost1}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              kost1: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='Kostenstelle 2'>
                        <Input
                          name='fibu-kost2'
                          value={fibu.kost2}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              kost2: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='Filiale Nr.'>
                        <Input
                          name='fibu-filiale'
                          value={fibu.filiale}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              filiale: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='Lieferanten Nr.'>
                        <Input
                          name='fibu-lieferant'
                          value={fibu.lieferant}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              lieferant: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='ANLAG Lieferant'>
                        <Input
                          name='fibu-anlag-lieferant'
                          value={fibu.anlagLieferant}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              anlagLieferant: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='Lebenslaufakte'>
                        <Switch
                          name='fibu-lebenslaufakte'
                          checked={fibu.lebenslaufAkte}
                          onChange={value =>
                            setFibu({ ...fibu, lebenslaufAkte: value })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='Erlaeuterung zur AfA-Art'>
                        <Input
                          name='fibu-erl-afa-art'
                          value={fibu.erlAfaArt}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              erlAfaArt: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='Herkunftsart'>
                        <Input
                          name='fibu-herkunftsart'
                          value={fibu.herkunftsart}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              herkunftsart: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='WKN/ISIN'>
                        <Input
                          name='fibu-wkn-isin'
                          value={fibu.wknIsin}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              wknIsin: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='Erfassungsart'>
                        <Input
                          name='fibu-erfassungsart'
                          value={fibu.erfassungsart}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              erfassungsart: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='Erfassungsart'>
                        <Input
                          name='fibu-erfassungsart'
                          value={fibu.erfassungsart}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              erfassungsart: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </Form>
                    <Form layout='vertical' labelAlign='left' colon={false}>
                      <Form.Item label='Buchwert Wj-Ende'>
                        <Input
                          name='fibu-buch-wj-ende'
                          value={fibu.buchWjEnde}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              buchWjEnde: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='AHK Wj-Beginn'>
                        <Input
                          name='fibu-ahk-wj-beginn'
                          value={fibu.ahkWjBeginn}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              ahkWjBeginn: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='Buchwert Wj-Beginn'>
                        <Input
                          name='fibu-buchw-wj-beginn'
                          value={fibu.buchWjBeginn}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              buchWjBeginn: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='Buchwert Wj-Beginn'>
                        <Input
                          name='fibu-buchw-wj-beginn'
                          value={fibu.buchWjBeginn}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              buchWjBeginn: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </Form>
                    <Form layout='vertical' labelAlign='left' colon={false}>
                      <Form.Item label='AHK-Datum'>
                        <DatePicker
                          name='fibu-ahk-datum'
                          style={{ width: '100%' }}
                          value={fibu.ahkDatum}
                          onChange={date =>
                            setFibu({
                              ...fibu,
                              ahkDatum: date,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='N-AfA Wj-Ende'>
                        <Input
                          name='fibu-n-afa-wj-ende'
                          value={fibu.nAfaWjEnde}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              nAfaWjEnde: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='S-Abschr. Wj-Ende'>
                        <Input
                          name='fibu-s-abschr-wj-ende'
                          value={fibu.sAbschrWjEnde}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              sAbschrWjEnde: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='Nutzungsdauer'>
                        <Input
                          name='fibu-nutzungsdauer'
                          value={fibu.nutzungsDauer}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              nutzungsDauer: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='AfA-Art'>
                        <Input
                          name='fibu-afa-art'
                          value={fibu.afaArt}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              afaArt: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='AfA-%'>
                        <Input
                          name='fibu-afa-perc'
                          value={fibu.afaPerc}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              afaPerc: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='N-Afa Wj-Beginn'>
                        <Input
                          name='fibu-n-afa-wg-beginn'
                          value={fibu.nAfaWjBeginn}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              nAfaWjBeginn: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                    </Form>
                    <Form layout='vertical' labelAlign='left' colon={false}>
                      <Form.Item label='Sonderabschreibung Wj-Beginn'>
                        <Input
                          name='fibu-sonderabs-wj-beginn'
                          value={fibu.sAbschrWjBeginn}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              sAbschrWjBeginn: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='Sonderabschreibung Art'>
                        <Input
                          name='fibu-sonderabs-art'
                          value={fibu.sAbschrArt}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              sAbschrArt: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='Sonderabschreibung %'>
                        <Input
                          name='fibu-sonderabs-perc'
                          value={fibu.sAbschrPerc}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              sAbschrPerc: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='Restbeguenstigung'>
                        <Input
                          name='fibu-restbeguenst'
                          value={fibu.restbeg}
                          onChange={event =>
                            setFibu({
                              ...fibu,
                              restbeg: event.target.value,
                            })
                          }
                        />
                      </Form.Item>
                      <Form.Item label='Sonderabschreib Verteilung'>
                        <Switch
                          name='fibu-sonderabschr-verteil'
                          checked={fibu.sAbschrVerteil}
                          onChange={value =>
                            setFibu({ ...fibu, sAbschrVerteil: value })
                          }
                        />
                      </Form.Item>
                    </Form>
                    <Form layout='vertical' labelAlign='left' colon={false}>
                      <Form.Item label='Abgang'>
                        <DatePicker
                          name='fibu-abgang'
                          style={{ width: '100%' }}
                          value={fibu.abgang}
                          onChange={date =>
                            setFibu({
                              ...fibu,
                              abgang: date,
                            })
                          }
                        />
                      </Form.Item>
                    </Form>
                  </Carousel>
                </Card>
              </TabPane>
            </Tabs>
          </PageHeader>
        </Wrapper>
      )}
    </>
  )
}

export default withApollo(ItemsAdd)
