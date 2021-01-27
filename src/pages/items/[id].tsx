import React, { useRef, useEffect, useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import dayjs from 'dayjs'
import QRCode from 'qrcode.react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Wrapper from '../../components/Layout'
import ImageUpload from '../../components/Items/ImageUpload'
import LoginRequired from '../../components/LoginRequired'
import DatePicker from '../../components/DatePicker'
import { withApollo } from '../../../apollo/client'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { UpdateItemMutation, getItemQuery } from '../../lib/graphql'
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
  Tag,
  InputNumber,
  Select,
  Space,
  message,
  Tooltip,
  Switch,
  Steps,
  Carousel,
  Spin,
} from 'antd'
import {
  ApiTwoTone,
  HomeTwoTone,
  SaveTwoTone,
  ContactsTwoTone,
  QuestionCircleOutlined,
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Paragraph, Link, Text } = Typography
const { Option } = Select
const { Step } = Steps

const ItemEdit = () => {
  const router = useRouter()
  const { id } = router.query
  const [session, loading] = useSession()
  const [form] = Form.useForm()
  const [fibuCurrentStep, setFibuCurrentStep] = useState(0)
  const [item, setItem] = useState({
    id: 0,
    qty: 0,
    title: '',
    description: '',
    type: '',
    updated_by: '',
    location: '',
    status: '',
    purchase_price: 0.0,
  })
  const [fibu, setFibu] = useState({
    serialNo: '',
    inventory: '',
    currency: '',
    account: '',
    ahkDatum: '',
    ahkWjEnde: '',
    buchWjEnde: '',
    nAfaWjEnde: '',
    sAbschrWjEnde: '',
    nutzungsDauer: '',
    afaArt: '',
    afaPerc: '',
    kost1: 0,
    kost2: 0,
    filiale: '',
    lieferantNr: '',
    anlagLieferant: '',
    ahkWjBeginn: '',
    buchWjBeginn: '',
    nAfaWjBeginn: '',
    sAbschrWjBeginn: '',
    sAbschrArt: '',
    sAbschrPerc: '',
    restbeguenstigung: '',
    sAbschrVerteil: false,
    abgang: '',
    lebenslaufAkte: false,
    bestellDatum: '',
    erlAfaArt: '',
    herkunftsart: '',
    wknIsin: '',
    erfassungsart: '',
  })
  const [stepStatus, setStepStatus] = useState({
    stamm: 'wait',
    afaVorschau: 'wait',
    abschreibung: 'wait',
    sonder: 'wait',
    bewegung: 'wait',
  })
  const carouselRef = useRef<Carousel>(null)

  const { loading: loadingItem, data } = useQuery(getItemQuery, {
    variables: { id: typeof id === 'string' && parseInt(id) },
  })
  const [updateItem, { loading: loadingUpdate }] = useMutation(
    UpdateItemMutation,
    {
      onCompleted: data => {
        message.success(`${data.updateOneItem.title} updated`)
      },
    }
  )
  useEffect(() => {
    if (data && data.item) {
      setItem({
        id: typeof id === 'string' && parseInt(id),
        qty: data.item.qty,
        title: data.item.title,
        description: data.item.description,
        type: data.item.type,
        updated_by: data.item.updated_by,
        location: data.item.locationId,
        status: data.item.statusId,
        purchase_price: data.item.purchase_price,
      })
      setFibu({
        serialNo: data.item.serialNo,
        inventory: data.item.inventarNr,
        currency: data.item.currency,
        account: data.item.kontoNr,
        ahkDatum: data.item.ahk_date,
        ahkWjEnde: data.item.ahk_wj_ende,
        buchWjEnde: data.item.buchw_wj_ende,
        nAfaWjEnde: data.item.n_afa_wj_ende,
        sAbschrWjEnde: data.item.sonder_abs_wj_ende,
        nutzungsDauer: data.item.nutzungsdauer,
        afaArt: data.item.afa_art,
        afaPerc: data.item.afa_percent,
        kost1: data.item.kost1,
        kost2: data.item.kost2,
        filiale: data.item.filiale,
        lieferantNr: data.item.lieferantNr,
        anlagLieferant: data.item.anlag_lieferant,
        ahkWjBeginn: data.item.ahk_wj_beginn,
        buchWjBeginn: data.item.buchwert_wj_beginn,
        nAfaWjBeginn: data.item.n_afa_wj_beginn,
        sAbschrWjBeginn: data.item.sonder_abs_wj_beginn,
        sAbschrArt: data.item.sonder_abs_art,
        sAbschrPerc: data.item.sonder_abs_percent,
        restbeguenstigung: data.item.restbeguenstigung,
        sAbschrVerteil: data.item.sonder_abs_verteil,
        abgang: data.item.abgang,
        lebenslaufAkte: data.item.lebenslaufakte,
        bestellDatum: data.item.bestelldatum,
        erlAfaArt: data.item.erl_afa_art,
        herkunftsart: data.item.herkunftsart,
        wknIsin: data.item.wkn_isin,
        erfassungsart: data.item.erfassungsart,
      })
      // set images = data.item.images
    } else {
      data && message.warning('Item does not exist')
    }
  }, [data])

  const saveItem = async () => {
    if (item.status === null || item.qty === null || item.location === null) {
      message.warning('Required fields missing')
      return
    }
    const date = new Date()
    const currentUser = session.user.email
    await updateItem({
      variables: {
        qty: item.qty,
        title: item.title,
        description: item.description,
        type: item.type,
        purchase_price: item.purchase_price ? item.purchase_price : 0.0,
        status: item.status,
        location: item.location,
        currency: fibu.currency,
        serialNo: fibu.serialNo,
        inventarNr: fibu.inventory,
        kontoNr: fibu.account,
        ahk_date: fibu.ahkDatum,
        ahk_wj_ende: fibu.ahkWjEnde,
        buchw_wj_ende: fibu.buchWjEnde,
        n_afa_wj_ende: fibu.nAfaWjEnde,
        sonder_abs_wj_ende: fibu.sAbschrWjEnde,
        nutzungsdauer: fibu.nutzungsDauer,
        afa_art: fibu.afaArt,
        afa_percent: fibu.afaPerc,
        kost1: fibu.kost1,
        kost2: fibu.kost2,
        filiale: fibu.filiale,
        lieferantNr: fibu.lieferantNr,
        anlag_lieferant: fibu.anlagLieferant,
        ahk_wj_beginn: fibu.ahkWjBeginn,
        buchwert_wj_beginn: fibu.buchWjBeginn,
        n_afa_wj_beginn: fibu.nAfaWjBeginn,
        sonder_abs_wj_beginn: fibu.sAbschrWjBeginn,
        sonder_abs_art: fibu.sAbschrArt,
        sonder_abs_percent: fibu.sAbschrPerc,
        restbeguenstigung: fibu.restbeguenstigung,
        sonder_abs_verteil: fibu.sAbschrVerteil,
        abgang: fibu.abgang,
        lebenslaufakte: fibu.lebenslaufAkte,
        bestelldatum: fibu.bestellDatum,
        erl_afa_art: fibu.erlAfaArt,
        herkunftsart: fibu.herkunftsart,
        wkn_isin: fibu.wknIsin,
        erfassungsart: fibu.erfassungsart,
        date_updated: date.toISOString(),
        updated_by: currentUser.split('@')[0],
        // id: typeof id === 'string' && parseInt(id),
      },
    })
  }

  const clearForm = () => {
    setItem({
      id: 0,
      qty: 0,
      title: '',
      description: '',
      type: '',
      updated_by: '',
      location: '',
      status: '',
      purchase_price: 0.0,
    })
    setFibu({
      serialNo: '',
      inventory: '',
      currency: '',
      account: '',
      ahkDatum: '',
      ahkWjEnde: '',
      buchWjEnde: '',
      nAfaWjEnde: '',
      sAbschrWjEnde: '',
      nutzungsDauer: '',
      afaArt: '',
      afaPerc: '',
      kost1: 0,
      kost2: 0,
      filiale: '',
      lieferantNr: '',
      anlagLieferant: '',
      ahkWjBeginn: '',
      buchWjBeginn: '',
      nAfaWjBeginn: '',
      sAbschrWjBeginn: '',
      sAbschrArt: '',
      sAbschrPerc: '',
      restbeguenstigung: '',
      sAbschrVerteil: false,
      abgang: '',
      lebenslaufAkte: false,
      bestellDatum: '',
      erlAfaArt: '',
      herkunftsart: '',
      wknIsin: '',
      erfassungsart: '',
    })
  }

  return (
    <>
      {!loading && !session ? (
        <LoginRequired />
      ) : (
        <Wrapper>
          <Head>
            <title>Katalog | Item View</title>
          </Head>
          <Spin spinning={loading}>
            <PageHeader
              className='site-page-header-responsive'
              onBack={() => Router.back()}
              title='Item'
              subTitle='Edit'
              extra={[
                <>
                  <Button key='2' onClick={clearForm}>
                    Clear
                  </Button>
                  <Button
                    key='1'
                    type='primary'
                    onClick={saveItem}
                    loading={loadingUpdate}
                  >
                    Save
                  </Button>
                </>,
              ]}
            >
              <Row justify='space-between'>
                <Col span={8} style={{ padding: '10px 0px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                      style={{
                        display: 'flex',
                        lineHeight: '36px',
                        height: '36px',
                      }}
                    >
                      <Text strong style={{ marginRight: '5px' }}>
                        Title
                      </Text>
                      <Paragraph>{item.title}</Paragraph>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        lineHeight: '36px',
                        height: '36px',
                      }}
                    >
                      <Text strong style={{ marginRight: '5px' }}>
                        Quantity
                      </Text>
                      <Paragraph>{item.qty}</Paragraph>
                    </div>
                  </div>
                </Col>
                <Col span={8} style={{ padding: '10px 0px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                      style={{
                        display: 'flex',
                        lineHeight: '36px',
                        height: '36px',
                      }}
                    >
                      <Text strong style={{ marginRight: '5px' }}>
                        Status
                      </Text>
                      <Paragraph>
                        <Tag
                          style={{
                            padding: '3px 8px',
                            fontSize: '0.8rem',
                          }}
                        >
                          {item.status ? item.status : 'N/A'}
                        </Tag>
                      </Paragraph>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        lineHeight: '36px',
                        height: '36px',
                      }}
                    >
                      <Text strong style={{ marginRight: '5px' }}>
                        ID
                      </Text>
                      <Paragraph>{item.id}</Paragraph>
                    </div>
                  </div>
                </Col>
                <Col
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                  span={8}
                >
                  <QRCode
                    value={JSON.stringify({
                      id: item.id,
                      title: item.title,
                      type: 'katalogItem',
                    })}
                    style={{
                      padding: '10px',
                    }}
                    renderAs='svg'
                    size={128}
                  />
                </Col>
              </Row>
              <Tabs
                defaultActiveKey='1'
                tabBarExtraContent={
                  <span style={{ margin: '5px' }}>
                    <Spin spinning={loadingItem} />
                  </span>
                }
              >
                <TabPane tab='Details' key='1'>
                  <Row gutter={[16, 16]}>
                    <Col sm={24} lg={12}>
                      <Card
                        title='Item'
                        headStyle={{ fontSize: '1.5rem' }}
                        extra={
                          <Select
                            placeholder='Status'
                            value={item.status}
                            onChange={value =>
                              setItem({ ...item, status: value })
                            }
                            style={{ width: 120, height: 45 }}
                            bordered={false}
                            size='large'
                          >
                            {data &&
                              data.allStatuses.map(status => (
                                <Option key={status.id} value={status.id}>
                                  <Tag
                                    style={{
                                      padding: '8px',
                                      fontSize: '0.8rem',
                                    }}
                                  >
                                    {status.name}
                                  </Tag>
                                </Option>
                              ))}
                          </Select>
                        }
                      >
                        <Form layout='vertical' form={form}>
                          <Form.Item
                            label='Item Type'
                            name='item-type'
                            required
                          >
                            <Radio.Group
                              className='itemType-wrapper'
                              name='item-type'
                              value={item.type}
                              onChange={event =>
                                setItem({ ...item, type: event.target.value })
                              }
                            >
                              <Radio.Button
                                className='itemType-radio'
                                value='net'
                                checked={item.type === 'net'}
                              >
                                Network
                                <ApiTwoTone style={{ fontSize: '2rem' }} />
                              </Radio.Button>
                              <Radio.Button
                                className='itemType-radio'
                                value='int'
                                checked={item.type === 'int'}
                              >
                                Internal
                                <HomeTwoTone style={{ fontSize: '2rem' }} />
                              </Radio.Button>
                              <Radio.Button
                                className='itemType-radio'
                                value='cust'
                                checked={item.type === 'cust'}
                              >
                                Customer
                                <ContactsTwoTone style={{ fontSize: '2rem' }} />
                              </Radio.Button>
                              <Radio.Button
                                className='itemType-radio'
                                value='storage'
                                checked={item.type === 'storage'}
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
                            <Col sm={24} lg={12}>
                              <Form.Item label='Quantity' required>
                                <InputNumber
                                  min={1}
                                  style={{ width: '95%' }}
                                  value={item.qty}
                                  onChange={(qty: any) =>
                                    setItem({
                                      ...item,
                                      qty: qty,
                                    })
                                  }
                                />
                              </Form.Item>
                            </Col>
                            <Col sm={24} lg={12}>
                              <Form.Item label='Location' required>
                                <Select
                                  showSearch
                                  placeholder='Select a location'
                                  optionFilterProp='children'
                                  value={item.location}
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
                                      <Option
                                        key={location.id}
                                        value={location.id}
                                      >
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
                              value={item.description}
                              onChange={event =>
                                setItem({
                                  ...item,
                                  description: event.target.value,
                                })
                              }
                            />
                          </Form.Item>
                        </Form>
                      </Card>
                    </Col>
                    <Col sm={24} lg={12}>
                      <Card title='Images' headStyle={{ fontSize: '1.5rem' }}>
                        <ImageUpload />
                      </Card>
                      <Space
                        direction='vertical'
                        size='middle'
                        style={{ width: '100%' }}
                      ></Space>
                      <Card
                        title='Financial Details'
                        headStyle={{ fontSize: '1.5rem' }}
                      >
                        <Form layout='vertical' form={form}>
                          <Row>
                            <Col sm={24} lg={12}>
                              <Form.Item
                                label='Purchase Price'
                                style={{ position: 'relative' }}
                              >
                                <Input.Group compact>
                                  <InputNumber
                                    formatter={value =>
                                      `${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ','
                                      )
                                    }
                                    parser={value =>
                                      value.replace(/\$\s?|(,*)/g, '')
                                    }
                                    value={item.purchase_price}
                                    onChange={(price: any) => {
                                      setItem({
                                        ...item,
                                        purchase_price: price,
                                      })
                                    }}
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
                            <Col sm={24} lg={12}>
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
                                  value={dayjs(fibu.bestellDatum || undefined)}
                                  onChange={date =>
                                    setFibu({
                                      ...fibu,
                                      bestellDatum: date.toDate().toString(),
                                    })
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
                                  value={fibu.serialNo}
                                  onChange={event =>
                                    setFibu({
                                      ...fibu,
                                      serialNo: event.target.value,
                                    })
                                  }
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Form>
                      </Card>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}></Col>
                  </Row>
                </TabPane>
                <TabPane tab='Finance' key='2'>
                  <Card
                    title='Finance Continued'
                    style={{ width: '100%' }}
                    headStyle={{ fontSize: '1.5rem' }}
                    extra={
                      <Link
                        href='https://www.datev.de/dnlexom/client/app/index.html#/document/9211235'
                        target='_blank'
                      >
                        <a>FiBu Help</a>
                      </Link>
                    }
                  >
                    <Steps
                      type='navigation'
                      size='small'
                      current={fibuCurrentStep}
                      onChange={step => {
                        if (carouselRef.current !== null)
                          //@ts-ignore
                          carouselRef.current.slick.slickGoTo(step)
                        setFibuCurrentStep(step)
                      }}
                      className='site-navigation-steps'
                    >
                      <Step title='Stamm'></Step>
                      <Step title='AfA-Vorschau'></Step>
                      <Step title='Abschreibung'></Step>
                      <Step title='Sonderabschreibung'></Step>
                      <Step title='Bewegung'></Step>
                    </Steps>
                    <Carousel
                      ref={carouselRef}
                      dots={false}
                      className='fibu-carousel'
                    >
                      <Form layout='vertical' labelAlign='left' colon={false}>
                        <Row gutter={[128, 32]}>
                          <Col span={6}>
                            <Form.Item label='Kostenstelle 1'>
                              <Input
                                name='fibu-kost1'
                                value={fibu.kost1}
                                onChange={event =>
                                  setFibu({
                                    ...fibu,
                                    kost1: parseFloat(event.target.value),
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
                                    kost2: parseFloat(event.target.value),
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
                          </Col>
                          <Col span={6}>
                            <Form.Item label='Lieferanten Nr.'>
                              <Input
                                name='fibu-lieferant'
                                value={fibu.lieferantNr}
                                onChange={event =>
                                  setFibu({
                                    ...fibu,
                                    lieferantNr: event.target.value,
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
                                checked={!!fibu.lebenslaufAkte}
                                onChange={value =>
                                  setFibu({ ...fibu, lebenslaufAkte: value })
                                }
                              />
                            </Form.Item>
                          </Col>
                          <Col span={6}>
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
                          </Col>
                          <Col span={6}>
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
                          </Col>
                        </Row>
                      </Form>
                      <Form layout='vertical' labelAlign='left' colon={false}>
                        <Row gutter={[128, 32]}>
                          <Col span={6}>
                            <Form.Item label='AHK Wj-Ende'>
                              <Input
                                name='fibu-ahk-wj-ende'
                                value={fibu.ahkWjEnde}
                                onChange={event =>
                                  setFibu({
                                    ...fibu,
                                    ahkWjEnde: event.target.value,
                                  })
                                }
                              />
                            </Form.Item>
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
                          </Col>
                          <Col span={6}>
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
                          </Col>
                        </Row>
                      </Form>
                      <Form layout='vertical' labelAlign='left' colon={false}>
                        <Row gutter={[128, 32]}>
                          <Col span={6}>
                            <Form.Item label='AHK-Datum'>
                              <DatePicker
                                name='fibu-ahk-datum'
                                style={{ width: '100%' }}
                                value={dayjs(fibu.ahkDatum)}
                                onChange={date =>
                                  setFibu({
                                    ...fibu,
                                    ahkDatum: date.toDate().toString(),
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
                          </Col>
                          <Col span={6}>
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
                          </Col>
                          <Col span={6}>
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
                          </Col>
                        </Row>
                      </Form>
                      <Form layout='vertical' labelAlign='left' colon={false}>
                        <Row gutter={[128, 32]}>
                          <Col span={6}>
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
                          </Col>
                          <Col span={6}>
                            <Form.Item label='Restbeguenstigung'>
                              <Input
                                name='fibu-restbeguenst'
                                value={fibu.restbeguenstigung}
                                onChange={event =>
                                  setFibu({
                                    ...fibu,
                                    restbeguenstigung: event.target.value,
                                  })
                                }
                              />
                            </Form.Item>
                            <Form.Item label='Sonderabschreib Verteilung'>
                              <Switch
                                checked={fibu.sAbschrVerteil}
                                onChange={value =>
                                  setFibu({ ...fibu, sAbschrVerteil: value })
                                }
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form>
                      <Form layout='vertical' labelAlign='left' colon={false}>
                        <Row gutter={[128, 32]}>
                          <Col span={6}>
                            <Form.Item label='Abgang'>
                              <DatePicker
                                name='fibu-abgang'
                                style={{ width: '100%' }}
                                value={dayjs(fibu.abgang)}
                                onChange={date =>
                                  setFibu({
                                    ...fibu,
                                    abgang: date.toDate().toString(),
                                  })
                                }
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form>
                    </Carousel>
                  </Card>
                </TabPane>
              </Tabs>
            </PageHeader>
          </Spin>
        </Wrapper>
      )}
    </>
  )
}

export default withApollo(ItemEdit)
