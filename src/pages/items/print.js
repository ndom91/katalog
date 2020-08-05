import React, { useState, useRef } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import QRCode from 'qrcode.react'
import Router from 'next/router'
import Wrapper from '../../components/Layout'
import { useSession } from 'next-auth/client'
import { withApollo } from '../../../apollo/client'
import LoginRequired from '../../components/LoginRequired'
import { Carousel, Steps, Row, Col, Card, PageHeader, Button } from 'antd'
import ReactToPrint from 'react-to-print'
import PrintSelector from '../../components/PrintSelector'
import PrintLabel from '../../components/PrintLabel'
import './items.module.css'

const { Step } = Steps

const ItemsLoader = () => {
  const pageRef = useRef()
  const carouselRef = useRef()
  const [selectedKeys, setSelectedKeys] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [session, loading] = useSession()

  const fetchSelectedKeys = () => {
    console.log(selectedKeys)
  }

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
                    <PrintSelector setSelectedKeys={setSelectedKeys} />
                  </Col>
                </Row>
              </Card>
              <Card
                extra={[
                  <ReactToPrint
                    trigger={() => (
                      <Button key='1' type='primary'>
                        Print
                      </Button>
                    )}
                    content={() => pageRef.current}
                  />,
                ]}
              >
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <PageWrapper ref={pageRef}>
                      <Page>
                        <PrintRow>
                          <PrintLabel
                            qrCode={<QRCode value='123' size={48} />}
                            itemId='123'
                            itemName='Dell 5580'
                          />
                          <PrintLabel
                            qrCode={<QRCode value='123' size={48} />}
                            itemId='123'
                            itemName='Dell 5580'
                          />
                        </PrintRow>
                        <PrintRow>
                          <PrintLabel
                            qrCode={<QRCode value='123' size={48} />}
                            itemId='123'
                            itemName='Dell 5580'
                          />
                          <PrintLabel
                            qrCode={<QRCode value='123' size={48} />}
                            itemId='123'
                            itemName='Dell 5580'
                          />
                        </PrintRow>
                        <PrintRow>
                          <PrintLabel
                            qrCode={<QRCode value='123' size={48} />}
                            itemId='123'
                            itemName='Dell 5580'
                          />
                          <PrintLabel
                            qrCode={<QRCode value='123' size={48} />}
                            itemId='123'
                            itemName='Dell 5580'
                          />
                        </PrintRow>
                        <PrintRow>
                          <PrintLabel
                            qrCode={<QRCode value='123' size={48} />}
                            itemId='123'
                            itemName='Dell 5580'
                          />
                          <PrintLabel
                            qrCode={<QRCode value='123' size={48} />}
                            itemId='123'
                            itemName='Dell 5580'
                          />
                        </PrintRow>
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
`
const PrintRow = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  height: ;
  margin: 0 auto;
`

export default withApollo(ItemsLoader)
