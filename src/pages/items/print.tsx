import React, { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import Router from 'next/router'
import Wrapper from '../../components/Layout'
import { useSession } from 'next-auth/client'
import { withApollo } from '../../../apollo/client'
import { useLazyQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import LoginRequired from '../../components/LoginRequired'
import {
  Skeleton,
  Carousel,
  Steps,
  Row,
  Col,
  Card,
  PageHeader,
  Button,
} from 'antd'
import { useReactToPrint } from 'react-to-print'
import PrintSelector from '../../components/PrintSelector'
import PrintLabel from '../../components/PrintLabel'
import './items.module.css'

const { Step } = Steps

const ItemQuery = gql`
  query ItemQuery($id: [Int!]) {
    items(where: { id: { in: $id } }) {
      id
      title
    }
  }
`

const ItemsLoader = () => {
  const pageRef = useRef()
  const carouselRef = useRef()
  const [selectedKeys, setSelectedKeys] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [toPrintItems, setToPrintItems] = useState([])
  const [getItems, { loading: loadingQuery, data }] = useLazyQuery(ItemQuery)
  const [session, loading] = useSession()
  const handlePrint = useReactToPrint({
    content: () => pageRef.current,
    documentTitle: 'Newtelco Katalog | Item Labels',
  })

  const fetchSelectedKeys = () => {
    getItems({ variables: { id: selectedKeys } })
  }

  useEffect(() => {
    if (!loadingQuery && data) {
      const returnItems = []
      for (let i = 0; i < data.items.length; i += 2) {
        const itemArr = []
        const item1 = data.items[i]
        itemArr.push({ id: item1.id, title: item1.title })
        if (data.items[i + 1]) {
          const item2 = data.items[i + 1]
          itemArr.push({ id: item2.id, title: item2.title })
        }
        returnItems.push(itemArr)
      }
      setToPrintItems(returnItems)
    }
  }, [data])

  return (
    <>
      {!loading && !session ? (
        <LoginRequired />
      ) : (
        <Wrapper>
          <Head>
            <title>Katalog | Item - Print</title>
          </Head>
          <PageHeader
            className='site-page-header-responsive'
            onBack={() => Router.back()}
            title='Item'
            subTitle='Import / Export'
          >
            <Steps
              type='navigation'
              size='small'
              current={currentStep}
              onChange={step => {
                //@ts-ignore
                carouselRef.current.slick.slickGoTo(step)
                setCurrentStep(step)
              }}
              className='site-navigation-steps'
            >
              <Step title='Select Items' />
              <Step title='Print Preview' />
            </Steps>
            <Carousel ref={carouselRef} dots={false} className='print-carousel'>
              <Card
                style={{ width: '100%' }}
                extra={
                  <Button
                    onClick={() => {
                      fetchSelectedKeys()
                      //@ts-ignore
                      carouselRef.current.slick.slickGoTo(1)
                      setCurrentStep(1)
                    }}
                  >
                    Next
                  </Button>
                }
              >
                <Row>
                  <Col span={24}>
                    <PrintSelector
                      setSelectedKeys={setSelectedKeys}
                      selection={selectedKeys}
                    />
                  </Col>
                </Row>
              </Card>
              <Card
                extra={[
                  <Button key='1' type='primary' onClick={handlePrint}>
                    Print
                  </Button>,
                ]}
              >
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <PageWrapper>
                      <Page>
                        <div
                          ref={pageRef}
                          style={{ height: '100%', width: '100%' }}
                        >
                          {loadingQuery ? (
                            <>
                              <Skeleton active avatar />
                              <Skeleton active avatar />
                              <Skeleton active avatar />
                            </>
                          ) : (
                            data &&
                            toPrintItems.map((itemArr, i) => (
                              <>
                                {(i + 1) % 13 === 0 && (
                                  <div
                                    style={{ pageBreakBefore: 'always' }}
                                    className='page-break'
                                  />
                                )}
                                <PrintRow>
                                  {itemArr.map(item => (
                                    <PrintLabel
                                      itemId={item.id}
                                      itemName={item.title}
                                    />
                                  ))}
                                </PrintRow>
                              </>
                            ))
                          )}
                        </div>
                      </Page>
                    </PageWrapper>
                  </Col>
                </Row>
              </Card>
            </Carousel>
          </PageHeader>
        </Wrapper>
      )}
    </>
  )
}

const PageWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  padding: 5% 3% 5% 3%;
  height: calc(55vw * 16 / 9);
`
const Page = styled.div`
  border: 1px solid #bcbcbc;
  width: 50vw;
  height: calc(50vw * 16 / 9);
  padding: 5% 3% 5% 3%;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: box-shadow 250ms ease-in-out;

  &:hover {
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.15);
  }

  @media all {
    .page-break {
      display: none;
    }
  }

  @media print {
    html,
    body {
      height: initial !important;
      overflow: initial !important;
      -webkit-print-color-adjust: exact;
    }
  }

  @media print {
    .page-break {
      margin-top: 4rem;
      display: block;
      page-break-before: always;
    }
  }

  @media page {
    size: auto;
    margin: 20mm;
  }
`
const PrintRow = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  height: auto;
  margin: 0 auto;
`

export default withApollo(ItemsLoader)
