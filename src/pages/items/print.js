import React, { useRef } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import QRCode from 'qrcode.react'
import Router from 'next/router'
import Wrapper from '../../components/Layout'
import { useSession } from 'next-auth/client'
import LoginRequired from '../../components/LoginRequired'
import { Row, Col, Card, PageHeader, Button, Typography } from 'antd'
import ReactToPrint from 'react-to-print'
import PrintLabel from '../../components/PrintLabel'

const { Title } = Typography

const ItemsLoader = () => {
  const pageRef = useRef()
  const [session, loading] = useSession()
  return (
    <>
      {!session ? (
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
            extra={[
              <Button key='2'>Clear</Button>,
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
                <Card title='Print Labels'>
                  <PageWrapper ref={pageRef}>
                    <Page>
                      <PrintRow>
                        <PrintLabel
                          qrCode={<QRCode value='123' size={48} />}
                          companyName='Newtelco'
                          itemName='Dell 5580'
                        />
                        <PrintLabel
                          qrCode={<QRCode value='123' size={48} />}
                          companyName='Newtelco'
                          itemName='Dell 5580'
                        />
                      </PrintRow>
                      <PrintRow>
                        <PrintLabel
                          qrCode={<QRCode value='123' size={48} />}
                          companyName='Newtelco'
                          itemName='Dell 5580'
                        />
                        <PrintLabel
                          qrCode={<QRCode value='123' size={48} />}
                          companyName='Newtelco'
                          itemName='Dell 5580'
                        />
                      </PrintRow>
                      <PrintRow>
                        <PrintLabel
                          qrCode={<QRCode value='123' size={48} />}
                          companyName='Newtelco'
                          itemName='Dell 5580'
                        />
                        <PrintLabel
                          qrCode={<QRCode value='123' size={48} />}
                          companyName='Newtelco'
                          itemName='Dell 5580'
                        />
                      </PrintRow>
                      <PrintRow>
                        <PrintLabel
                          qrCode={<QRCode value='123' size={48} />}
                          companyName='Newtelco'
                          itemName='Dell 5580'
                        />
                        <PrintLabel
                          qrCode={<QRCode value='123' size={48} />}
                          companyName='Newtelco'
                          itemName='Dell 5580'
                        />
                      </PrintRow>
                    </Page>
                  </PageWrapper>
                </Card>
              </Col>
            </Row>
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
`
const PrintRow = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  height: ;
  margin: 0 auto;
`

export default ItemsLoader
