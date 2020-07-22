import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import Wrapper from '../../components/Layout'
import { useSession } from 'next-auth/client'
import LoginRequired from '../../components/LoginRequired'
// import loadable from '@loadable/component'
import Scanner from '../../components/Scanner'
import { Row, Col, Card, PageHeader, Tabs, Button, Typography } from 'antd'

const { TabPane } = Tabs
const { Title } = Typography
//  const Scanner = dynamic(() => import('../../components/Scanner'), { ssr: false })

const ItemsLoader = () => {
  const [session, loading] = useSession()
  const [cameraAvailable, setCameraAvailable] = useState(false)

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      setCameraAvailable(true)
    }
  }, [])

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
            subTitle='Scan'
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card title='Scan QR Code' headStyle={{ fontSize: '1.5rem' }}>
                  {cameraAvailable && <Scanner />}
                </Card>
              </Col>
            </Row>
          </PageHeader>
        </Wrapper>
      )}
    </>
  )
}

export default ItemsLoader
