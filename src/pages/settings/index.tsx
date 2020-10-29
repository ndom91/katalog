import React, { useRef, useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { useSession } from 'next-auth/client'
import dayjs from 'dayjs'
import 'dayjs/locale/de'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { CSVReader } from 'react-papaparse'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import LoginRequired from '../../components/LoginRequired'
import Wrapper from '../../components/Layout'
import { withApollo } from '../../../apollo/client'
import {
  Button,
  Col,
  Card,
  PageHeader,
  Row,
  Skeleton,
  Tabs,
  Table,
  message,
} from 'antd'

const addItemMutation = gql`
  mutation CreateItemMutation(
    $title: String!
    $updated_by: String!
    $date_added: DateTime!
    $serialNo: String
    $inventarNr: String
    $kontoNr: String
    $date_updated: DateTime
    $ahk_date: DateTime
    $ahk_wj_ende: String
    $buchw_wj_ende: String
    $n_afa_wj_ende: String
    $sonder_abs_wj_ende: String
    $nutzungsdauer: String
    $afa_art: String
    $afa_percent: String
    $kost1: Int
    $kost2: Int
    $filiale: String
    $lieferantNr: String
    $anlag_lieferant: String
    $ahk_wj_beginn: String
    $buchwert_wj_beginn: String
    $n_afa_wj_beginn: String
    $sonder_abs_wj_beginn: String
    $sonder_abs_art: String
    $sonder_abs_percent: String
    $restbeguenstigung: String
    $sonder_abs_verteil: Boolean
    $abgang: DateTime
    $lebenslaufakte: Boolean
    $bestelldatum: DateTime
    $erl_afa_art: String
    $herkunftsart: String
    $wkn_isin: String
    $erfassungsart: String
  ) {
    createOneItem(
      data: {
        title: $title
        updated_by: $updated_by
        date_added: $date_added
        serialNo: $serialNo
        inventarNr: $inventarNr
        kontoNr: $kontoNr
        date_updated: $date_updated
        ahk_date: $ahk_date
        ahk_wj_ende: $ahk_wj_ende
        buchw_wj_ende: $buchw_wj_ende
        n_afa_wj_ende: $n_afa_wj_ende
        sonder_abs_wj_ende: $sonder_abs_wj_ende
        nutzungsdauer: $nutzungsdauer
        afa_art: $afa_art
        afa_percent: $afa_percent
        kost1: $kost1
        kost2: $kost2
        filiale: $filiale
        lieferantNr: $lieferantNr
        anlag_lieferant: $anlag_lieferant
        ahk_wj_beginn: $ahk_wj_beginn
        buchwert_wj_beginn: $buchwert_wj_beginn
        n_afa_wj_beginn: $n_afa_wj_beginn
        sonder_abs_wj_beginn: $sonder_abs_wj_beginn
        sonder_abs_art: $sonder_abs_art
        sonder_abs_percent: $sonder_abs_percent
        restbeguenstigung: $restbeguenstigung
        sonder_abs_verteil: $sonder_abs_verteil
        abgang: $abgang
        lebenslaufakte: $lebenslaufakte
        bestelldatum: $bestelldatum
        erl_afa_art: $erl_afa_art
        herkunftsart: $herkunftsart
        wkn_isin: $wkn_isin
        erfassungsart: $erfassungsart
      }
    ) {
      id
      title
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
    }
  }
`
import { DeleteOutlined } from '@ant-design/icons'

const { TabPane } = Tabs

const Settings = () => {
  dayjs.extend(customParseFormat)
  const buttonRef = useRef()
  const [session, loading] = useSession()
  const [uploaded, setUploaded] = useState(false)
  const [parseLoading, setParseLoading] = useState(false)
  const [csvData, setCsvData] = useState([])
  const [fields, setFields] = useState([])
  const [createItem, { loading: createLoading }] = useMutation(
    addItemMutation,
    {
      update(cache, { data }) {
        console.log(data)
        cache.modify({
          fields: {
            items(existingItems = []) {
              const newItemRef = cache.writeFragment({
                id: `Item:${data.createOneItem.id}`,
                data: data.createOneItem,
                fragment: gql`
                  fragment NewItem on Item {
                    id
                    title
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
                  }
                `,
              })
              console.log(newItemRef)
              return [...existingItems, newItemRef]
            },
          },
        })
      },
    }
  )

  const onDrop = data => {
    console.log(data)
    setParseLoading(true)
    if (data.length) {
      setUploaded(true)
      const rawFields = data[0].meta.fields.reduce((arr, val, i) => {
        arr[i] = { title: val, dataIndex: val, key: val, width: 120 }
        return arr
      }, [])
      setFields(rawFields)
      const rawData = data.reduce((arr, val, i) => {
        arr[i] = val.data
        return arr
      }, [])
      setCsvData(rawData)
    }
    setParseLoading(false)
  }
  const onComplete = (results, file) => {
    console.log(results, file)
  }
  const onError = (err, file, inputEl, reason) => {
    console.log(err, file, inputEl, reason)
  }
  const onRemove = data => {
    setCsvData([])
    console.log(data)
  }
  const handleOpenDialog = e => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      //@ts-ignore
      buttonRef.current.open(e)
    }
  }
  const handleRemoveFile = e => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      //@ts-ignore
      buttonRef.current.removeFile(e)
    }
  }
  const onImport = () => {
    const currentUser = session.user.email
    const date = new Date()
    const allItems = csvData.map((item, i) => {
      if (item.Konto === null) return null
      return createItem({
        variables: {
          title: item.Inventarbezeichnung ? item.Inventarbezeichnung : '',
          serialNo: item['Serial No.'],
          inventarNr: item.Inventar ? item.Inventar.toString() : '',
          kontoNr: item.Konto ? item.Konto.toString() : '',
          ahk_date: item['AHK-Datum']
            ? dayjs(item['AHK-Datum'], 'DD.MM.YYYY').locale('de').toISOString()
            : null,
          ahk_wj_ende: item['AHK Wj-Ende']
            ? item['AHK Wj-Ende'].toString()
            : '',
          buchw_wj_ende: item['Buchw. Wj-Ende']
            ? item['Buchw. Wj-Ende'].toString()
            : '',
          n_afa_wj_ende: item['N-Afa Wj-Ende']
            ? item['N-Afa Wj-Ende'].toString()
            : '',
          sonder_abs_wj_ende: item['S-Abschr. Wj-Ende']
            ? item['S-Abschr. Wj-Ende']
            : '',
          nutzungsdauer: item.ND,
          afa_art: item['AfA-Art'],
          afa_percent: item['AfA-%'] ? item['AfA-%'].toString() : '',
          kost1: parseInt(item.KOST1),
          kost2: parseInt(item.KOST2),
          filiale: item.Filiale,
          lieferantNr: item['Lieferanten-Nr.']
            ? item['Lieferanten-Nr.'].toString()
            : '',
          anlag_lieferant: item['ANLAG-Lieferant'],
          ahk_wj_beginn: item['AHK Wj-Beginn']
            ? item['AHK Wj-Beginn'].toString()
            : '',
          buchwert_wj_beginn: item['Buchw. Wj-Beginn']
            ? item['Buchw. Wj-Beginn'].toString()
            : '',
          n_afa_wj_beginn: item['N-AfA Wj-Beginn']
            ? item['N-AfA Wj-Beginn'].toString()
            : '',
          sonder_abs_wj_beginn: item['S-Abschr. Wj-Beginn']
            ? item['S-Abschr. Wj-Beginn'].toString()
            : '',
          sonder_abs_art: item['S-Abschr.Art'],
          sonder_abs_percent: item['S-Abschr.%'],
          restbeguenstigung: item['Restbegünst.'],
          sonder_abs_verteil: item['S-Abschr.Verteil.'],
          abgang: item.Abgang,
          lebenslaufakte: item.Lebenslaufakte === 'Ja' ? true : false,
          bestelldatum: item.Bestelldatum,
          erl_afa_art: item['Erl. AfA-Art'],
          herkunftsart: item.Herkunftsart,
          wkn_isin: item['WKN/ISIN'],
          erfassungsart: item.Erfassungsart,
          date_updated: date.toISOString(),
          updated_by: currentUser.split('@')[0],
          date_added: date.toISOString(),
        },
      })
    })
    Promise.all(allItems)
      .then(values =>
        message.success(`${values.length - 1} Items Imported Successfully!`)
      )
      .catch(err => console.error(err))
  }
  return (
    <>
      {!loading && !session ? (
        <LoginRequired />
      ) : (
        <Wrapper>
          <Head>
            <title>Katalog | Settings</title>
          </Head>
          <PageHeader
            className='site-page-header-responsive'
            onBack={() => Router.back()}
            title='Settings'
            subTitle='Options'
          >
            <Tabs defaultActiveKey='1'>
              <TabPane tab='Import' key='1'>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Card
                      title='Items'
                      extra={[
                        <a
                          href='/Katalog_Import_Template.csv'
                          target='_blank'
                          download
                        >
                          Download Template
                        </a>,
                      ]}
                    >
                      <CSVReader
                        ref={buttonRef}
                        onDrop={onDrop}
                        onError={onError}
                        addRemoveButton
                        config={{
                          header: true,
                          dynamicTyping: true,
                          complete: (results, file) =>
                            onComplete(results, file),
                        }}
                        removeButtonColor='#659cef'
                        progressBarColor='#002140'
                        onRemoveFile={onRemove}
                        style={{
                          margin: '0 auto',
                        }}
                      >
                        {({ file }) => (
                          <aside
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              width: '100%',
                              marginBottom: 10,
                            }}
                          >
                            <div
                              onClick={handleOpenDialog}
                              css={`
                                border: 1px dashed #ccc;
                                border-radius: 5px;
                                padding: 30px 80px;
                                margin-bottom: 20px;
                                &:hover {
                                  cursor: pointer;
                                }
                              `}
                            >
                              Click to choose or drop a file
                            </div>
                            {file && (
                              <div
                                style={{
                                  display: 'flex',
                                  width: '100%',
                                  maxWidth: '550px',
                                  justifyContent: 'center',
                                }}
                              >
                                <div
                                  style={{
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    borderStyle: 'dashed',
                                    borderColor: '#002140',
                                    height: 45,
                                    lineHeight: 2.5,
                                    marginTop: 5,
                                    marginBottom: 5,
                                    paddingLeft: 13,
                                    paddingTop: 3,
                                    width: '60%',
                                  }}
                                >
                                  {file && file.name}
                                </div>
                                <button
                                  style={{
                                    border: 0,
                                    background: 'transparent',
                                    marginLeft: 0,
                                    marginRight: 0,
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                  }}
                                  onClick={handleRemoveFile}
                                >
                                  <DeleteOutlined
                                    style={{ fontSize: '1.5rem' }}
                                    css={`
                                      color: #dc6268;
                                      &:hover {
                                        cursor: pointer;
                                      }
                                    `}
                                  />
                                </button>
                              </div>
                            )}
                          </aside>
                        )}
                      </CSVReader>
                    </Card>
                    {parseLoading && <Skeleton />}
                    {uploaded && (
                      <Card
                        title='Does this look correct?'
                        actions={[
                          <small>Preview - First 5 results only</small>,
                        ]}
                        extra={[
                          <Button
                            key='1'
                            onClick={() => onImport()}
                            type='primary'
                            loading={createLoading}
                          >
                            Import
                          </Button>,
                        ]}
                      >
                        <Table
                          columns={fields}
                          dataSource={csvData.slice(
                            0,
                            csvData.length - (csvData.length - 5)
                          )}
                          size='small'
                          scroll={{ x: 1500 }}
                          pagination={false}
                        />
                      </Card>
                    )}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab='Team' key='2'>
                <Row>
                  <Col span={24}>
                    <Card title='Members'>John Doe</Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab='Shipping' key='3'>
                <Row>
                  <Col span={24}>
                    <Card title='Providers'>UPS</Card>
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

export default withApollo(Settings)
