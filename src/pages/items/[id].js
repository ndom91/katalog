import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Wrapper from '../../components/Layout'
import ImageUpload from '../../components/Items/ImageUpload'
import LoginRequired from '../../components/LoginRequired'
import './items.module.css'
import { withApollo } from '../../../apollo/client'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
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
  Switch
} from 'antd'
import {
  ApiTwoTone,
  HomeTwoTone,
  SaveTwoTone,
  ContactsTwoTone,
  QuestionCircleOutlined
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Title, Link } = Typography
const { Option } = Select
const { Panel } = Collapse

const UpdateItemMutation = gql`
  mutation UpdateItemMutation(
    $id: Int!
    $title: String!
    $qty: Int
    $desc: String
    $location: Int
    $updated_by: String!
    $type:  String
    $serialNo:  String
    $inventarNr:  String
    $kontoNr:  String
    $date_updated:  DateTime 
    $ahk_date:  DateTime
    $ahk_wj_ende:  String
    $buchw_wj_ende:  String
    $n_afa_wj_ende:  String
    $sonder_abs_wj_ende:  String
    $nutzungsdauer:  String
    $afa_art:  String
    $afa_percent:  String
    $kost1:  Int
    $kost2:  Int
    $filiale:  String
    $lieferantNr:  String
    $anlag_lieferant:  String
    $ahk_wj_beginn:  String
    $buchwert_wj_beginn:  String
    $n_afa_wj_beginn:  String
    $sonder_abs_wj_beginn: String
    $sonder_abs_art:   String
    $sonder_abs_percent:   String
    $restbeguenstigung:  String
    $sonder_abs_verteil: Boolean
    $abgang:       DateTime
    $lebenslaufakte:       Boolean
    $bestelldatum:        DateTime
    $erl_afa_art:        String
    $herkunftsart:        String
    $wkn_isin:        String
    $erfassungsart:        String
  ) {
    updateOneItem(
      data: {
        title: $title
        qty: $qty
        description: $desc
        updated_by: $updated_by
        type:  $type
        serialNo:  $serialNo
        inventarNr:  $inventarNr
        kontoNr:  $kontoNr
        date_updated:  $date_updated
        ahk_date:  $ahk_date
        ahk_wj_ende:  $ahk_wj_ende
        buchw_wj_ende:  $buchw_wj_ende
        n_afa_wj_ende:  $n_afa_wj_ende
        sonder_abs_wj_ende:  $sonder_abs_wj_ende
        nutzungsdauer:  $nutzungsdauer
        afa_art:  $afa_art
        afa_percent:  $afa_percent
        kost1:  $kost1
        kost2:  $kost2
        filiale:  $filiale
        lieferantNr:  $lieferantNr
        anlag_lieferant:  $anlag_lieferant
        ahk_wj_beginn:  $ahk_wj_beginn
        buchwert_wj_beginn:  $buchwert_wj_beginn
        n_afa_wj_beginn:  $n_afa_wj_beginn
        sonder_abs_wj_beginn: $sonder_abs_wj_beginn
        sonder_abs_art:   $sonder_abs_art
        sonder_abs_percent:   $sonder_abs_percent
        restbeguenstigung:  $restbeguenstigung
        sonder_abs_verteil: $sonder_abs_verteil
        abgang:       $abgang
        lebenslaufakte:     $lebenslaufakte
        bestelldatum:        $bestelldatum
        erl_afa_art:        $erl_afa_art
        herkunftsart:        $herkunftsart
        wkn_isin:        $wkn_isin
        erfassungsart:        $erfassungsart
        location: {
          connect: { id: $location }
        }
      },
      where: {
        id: $id
      }
    ) {
      id
      title
    }
  }
`

const getItemQuery = gql`
  query getItem( $id: Int!){
    item (where: { id: $id }) {
      id                
      qty                
      title               
      description          
      type      
      serialNo   
      inventarNr  
      kontoNr      
      date_added    
      date_updated   
      updated_by       
      ahk_date          
      ahk_wj_ende     
      buchw_wj_ende      
      n_afa_wj_ende       
      sonder_abs_wj_ende   
      nutzungsdauer  
      afa_art         
      afa_percent      
      kost1             
      kost2              
      filiale             
      lieferantNr          
      anlag_lieferant 
      ahk_wj_beginn    
      buchwert_wj_beginn
      n_afa_wj_beginn    
      sonder_abs_wj_beginn 
      sonder_abs_art      
      sonder_abs_percent
      restbeguenstigung  
      sonder_abs_verteil  
      abgang               
      lebenslaufakte
      bestelldatum   
      erl_afa_art     
      herkunftsart     
      wkn_isin          
      erfassungsart      
      images {
        id 
        title 
        url
      }
      locationId          
    }
    allLocations {
      id
      description
    }
  }
`

const ItemEdit = () => {
  const router = useRouter()
  const { id } = router.query
  const [session] = useSession()
  const [form] = Form.useForm()
  const [item, setItem] = useState({})
  const [fibu, setFibu] = useState({})

  const { loading, data } = useQuery(getItemQuery, {
    variables: { id: parseInt(id) }
  })
  const [updateItem] = useMutation(UpdateItemMutation, {
    onCompleted: data => {
      console.log('completeAdd', data)
      message.success(`${data.updateOneItem.title} updated`)
    },
  })
  useEffect(() => {
    console.log(loading, data)
    if (data) {
      setItem({
        qty: data.item.qty,
        title: data.item.title,
        description: data.item.description,
        type: data.item.type,
        updated_by: data.item.updated_by,
        location: data.item.locationId,
      })
      setFibu({
        serialNo: data.item.serialNo,
        inventory: data.item.inventarNr,
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
    }
  }, [data])

  const saveItem = async () => {
    const date = new Date()
    const currentUser = session.user.email
    await updateItem({
      variables: {
        qty: item.qty,
        title: item.title,
        description: item.description,
        type: item.type,
        location: item.location,
        serialNo: fibu.serial,
        inventarNr: fibu.inventory,
        kontoNr: fibu.account,
        ahk_date: fibu.ahkDatum,
        ahk_wj_ende: fibu.ahkWjEnde.toString(),
        buchw_wj_ende: fibu.buchWjEnde,
        n_afa_wj_ende: fibu.nAfaWjEnde,
        sonder_abs_wj_ende: fibu.sAbschrWjEnde,
        nutzungsdauer: fibu.nutzungsDauer,
        afa_art: fibu.afaArt,
        afa_percent: fibu.afaPerc,
        kost1: fibu.kost1,
        kost2: fibu.kost2,
        filiale: fibu.filiale,
        lieferantNr: fibu.lieferant,
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
        updated_by: currentUser,
        id: parseInt(id)
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
              onBack={() => window.history.back()}
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
                      <Card title="Item" headStyle={{ fontSize: '1.5rem' }}>
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
                      <Card title="Images" headStyle={{ fontSize: '1.5rem' }}>
                        <ImageUpload />
                      </Card>
                      <Space
                        direction='vertical'
                        size='middle'
                        style={{ width: '100%' }}
                      >
                        <Card extra={<Link href="https://www.datev.de/dnlexom/client/app/index.html#/document/9211235" target="_blank">FiBu Help</Link>} title='Financial Details' headStyle={{ fontSize: '1.5rem' }}>
                          <Form layout='vertical' form={form}>
                            <Row>
                              <Col span={12}>
                                <Form.Item label='Purchase Price' style={{ position: 'relative' }}>
                                  <Tooltip title="AHK Wirtschaftsjahr-Ende">
                                    <a href="#API" style={{ margin: '0 8px', position: 'absolute', top: '-30px', right: '10px' }}>
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
                                <Form.Item label='Purchase Date' style={{ position: 'relative' }}>
                                  <Tooltip title="Bestelldatum">
                                    <a href="#API" style={{ position: 'absolute', top: '-30px', right: '10px' }}>
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
                                      setFibu({ ...fibu, inventory: event.target.value })
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
                                      setFibu({ ...fibu, account: event.target.value })
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
                                      setFibu({ ...fibu, serial: event.target.value })
                                    }
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                            {/* <Form.Item label='Asset Type' name='asset-type'>
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
                            </Form.Item> */}
                          </Form>
                          <Collapse ghost>
                            <Panel header='Stamm'>
                              <Form layout='horizontal' labelAlign='left' labelCol={{ span: 8 }} wrapperCol={{ push: 4, span: 12 }} colon={false}>
                                <Form.Item label='Kostenstelle 1'>
                                  <Input
                                    name='fibu-kost1'
                                    value={fibu.kost1}
                                    onChange={event =>
                                      setFibu({ ...fibu, kost1: event.target.value })
                                    }
                                  />
                                </Form.Item>
                                <Form.Item label='Kostenstelle 2'>
                                  <Input
                                    name='fibu-kost2'
                                    value={fibu.kost2}
                                    onChange={event =>
                                      setFibu({ ...fibu, kost2: event.target.value })
                                    }
                                  />
                                </Form.Item>
                                <Form.Item label='Filiale Nr.'>
                                  <Input
                                    name='fibu-filiale'
                                    value={fibu.filiale}
                                    onChange={event =>
                                      setFibu({ ...fibu, filiale: event.target.value })
                                    }
                                  />
                                </Form.Item>
                                <Form.Item label='Lieferanten Nr.'>
                                  <Input
                                    name='fibu-lieferant'
                                    value={fibu.lieferant}
                                    onChange={event =>
                                      setFibu({ ...fibu, lieferant: event.target.value })
                                    }
                                  />
                                </Form.Item>
                                <Form.Item label='ANLAG Lieferant'>
                                  <Input
                                    name='fibu-anlag-lieferant'
                                    value={fibu.anlagLieferant}
                                    onChange={event =>
                                      setFibu({ ...fibu, anlagLieferant: event.target.value })
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
                                      setFibu({ ...fibu, erlAfaArt: event.target.value })
                                    }
                                  />
                                </Form.Item>
                                <Form.Item label='Herkunftsart'>
                                  <Input
                                    name='fibu-herkunftsart'
                                    value={fibu.herkunftsart}
                                    onChange={event =>
                                      setFibu({ ...fibu, herkunftsart: event.target.value })
                                    }
                                  />
                                </Form.Item>
                                <Form.Item label='WKN/ISIN'>
                                  <Input
                                    name='fibu-wkn-isin'
                                    value={fibu.wknIsin}
                                    onChange={event =>
                                      setFibu({ ...fibu, wknIsin: event.target.value })
                                    }
                                  />
                                </Form.Item>
                                <Form.Item label='Erfassungsart'>
                                  <Input
                                    name='fibu-erfassungsart'
                                    value={fibu.erfassungsart}
                                    onChange={event =>
                                      setFibu({ ...fibu, erfassungsart: event.target.value })
                                    }
                                  />
                                </Form.Item>
                                <Form.Item label='Erfassungsart'>
                                  <Input
                                    name='fibu-erfassungsart'
                                    value={fibu.erfassungsart}
                                    onChange={event =>
                                      setFibu({ ...fibu, erfassungsart: event.target.value })
                                    }
                                  />
                                </Form.Item>
                              </Form>
                            </Panel>
                            <Panel header='Afa-Vorschau'>
                              <Form layout='horizontal' labelAlign='left' labelCol={{ span: 8 }} wrapperCol={{ push: 4, span: 12 }} colon={false}>
                                <Form.Item label='Buchwert Wj-Ende'>
                                  <Input
                                    name='fibu-buch-wj-ende'
                                    value={fibu.buchWjEnde}
                                    onChange={event =>
                                      setFibu({ ...fibu, buchWjEnde: event.target.value })
                                    }
                                  />
                                </Form.Item>
                                <Form.Item label='AHK Wj-Beginn'>
                                  <Input
                                    name='fibu-ahk-wj-beginn'
                                    value={fibu.ahkWjBeginn}
                                    onChange={event =>
                                      setFibu({ ...fibu, ahkWjBeginn: event.target.value })
                                    }
                                  />
                                </Form.Item>
                                <Form.Item label='Buchwert Wj-Beginn'>
                                  <Input
                                    name='fibu-buchw-wj-beginn'
                                    value={fibu.buchWjBeginn}
                                    onChange={event =>
                                      setFibu({ ...fibu, buchWjBeginn: event.target.value })
                                    }
                                  />
                                </Form.Item>
                                <Form.Item label='Buchwert Wj-Beginn'>
                                  <Input
                                    name='fibu-buchw-wj-beginn'
                                    value={fibu.buchWjBeginn}
                                    onChange={event =>
                                      setFibu({ ...fibu, buchWjBeginn: event.target.value })
                                    }
                                  />
                                </Form.Item>
                              </Form>
                            </Panel>
                            <Panel header='Abschreibung'>
                              <Form layout='horizontal' labelAlign='left' labelCol={{ span: 7 }} wrapperCol={{ push: 5, span: 12 }} colon={false}>
                                <Form.Item label='AHK-Datum'>
                                  <DatePicker
                                    name='fibu-ahk-datum'
                                    style={{ width: '100%' }}
                                    value={fibu.ahkDatum}
                                    onChange={event =>
                                      setFibu({ ...fibu, ahkDatum: event.target.value })
                                    }
                                  />
                                </Form.Item>
                                <Form.Item label='N-AfA Wj-Ende'>
                                  <Input
                                    name='fibu-n-afa-wj-ende'
                                    value={fibu.nAfaWjEnde}
                                    onChange={event =>
                                      setFibu({ ...fibu, nAfaWjEnde: event.target.value })
                                    }
                                  />
                                </Form.Item>
                                <Form.Item label='S-Abschr. Wj-Ende'>
                                  <Input
                                    name='fibu-s-abschr-wj-ende'
                                    value={fibu.sAbschrWjEnde}
                                    onChange={event =>
                                      setFibu({ ...fibu, sAbschrWjEnde: event.target.value })
                                    }
                                  />
                                </Form.Item>
                                <Form.Item label='Nutzungsdauer'>
                                  <Input
                                    name='fibu-nutzungsdauer'
                                    value={fibu.nutzungsDauer}
                                    onChange={event =>
                                      setFibu({ ...fibu, nutzungsDauer: event.target.value })
                                    }
                                  />
                                </Form.Item>
                                <Form.Item label='AfA-Art'>
                                  <Input
                                    name='fibu-afa-art'
                                    value={fibu.afaArt}
                                    onChange={event =>
                                      setFibu({ ...fibu, afaArt: event.target.value })
                                    }
                                  />
                                </Form.Item>
                                <Form.Item label='AfA-%'>
                                  <Input
                                    name='fibu-afa-perc'
                                    value={fibu.afaPerc}
                                    onChange={event =>
                                      setFibu({ ...fibu, afaPerc: event.target.value })
                                    }
                                  />
                                </Form.Item>
                                <Form.Item label='N-Afa Wj-Beginn'>
                                  <Input
                                    name='fibu-n-afa-wg-beginn'
                                    value={fibu.nAfaWjBeginn}
                                    onChange={event =>
                                      setFibu({ ...fibu, nAfaWjBeginn: event.target.value })
                                    }
                                  />
                                </Form.Item>
                              </Form>
                            </Panel>
                            <Panel header='Sonderabschreibung'>
                              <Form layout='horizontal' labelAlign='left' labelCol={{ span: 13 }} wrapperCol={{ push: 3, span: 8 }} colon={false}>
                                <Form.Item label='Sonderabschreibung Wj-Beginn'>
                                  <Input
                                    name='fibu-sonderabs-wj-beginn'
                                    value={fibu.sAbschrWjBeginn}
                                    onChange={event =>
                                      setFibu({ ...fibu, sAbschrWjBeginn: event.target.value })
                                    }
                                  />
                                </Form.Item>
                                <Form.Item label='Sonderabschreibung Art'>
                                  <Input
                                    name='fibu-sonderabs-art'
                                    value={fibu.sAbschrArt}
                                    onChange={event =>
                                      setFibu({ ...fibu, sAbschrArt: event.target.value })
                                    }
                                  />
                                </Form.Item>
                                <Form.Item label='Sonderabschreibung %'>
                                  <Input
                                    name='fibu-sonderabs-perc'
                                    value={fibu.sAbschrPerc}
                                    onChange={event =>
                                      setFibu({ ...fibu, sAbschrPerc: event.target.value })
                                    }
                                  />
                                </Form.Item>
                                <Form.Item label='Restbeguenstigung'>
                                  <Input
                                    name='fibu-restbeguenst'
                                    value={fibu.restbeg}
                                    onChange={event =>
                                      setFibu({ ...fibu, restbeg: event.target.value })
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
                            </Panel>
                            <Panel header='Bewegung'>
                              <Form layout='horizontal' labelAlign='left' labelCol={{ span: 7 }} wrapperCol={{ push: 5, span: 12 }} colon={false}>
                                <Form.Item label='Abgang'>
                                  <DatePicker
                                    name='fibu-abgang'
                                    style={{ width: '100%' }}
                                    value={fibu.abgang}
                                    onChange={event =>
                                      setFibu({ ...fibu, abgang: event.target.value })
                                    }
                                  />
                                </Form.Item>
                              </Form>
                            </Panel>
                          </Collapse>
                        </Card>
                      </Space>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
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

export default withApollo(ItemEdit)
