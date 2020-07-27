import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import Wrapper from '../../components/Layout'
import { useSession } from 'next-auth/client'
import LoginRequired from '../../components/LoginRequired'
import Scanner from '../../components/Scanner'
import { withApollo } from '../../../apollo/client'
import { Row, Col, Card, PageHeader, Tabs, Button, Typography } from 'antd'
import './items.module.css'

const { TabPane } = Tabs
const { Title } = Typography

const ScanPage = () => {
  const [session, loading] = useSession()
  const [cameraAvailable, setCameraAvailable] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      setCameraAvailable(true)
    }
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 600)
    }
  }, [])

  return (
    <>
      {!loading && !session ? (
        <LoginRequired />
      ) : (
        <Wrapper>
          <Head>
            <title>Katalog | Item - Scan</title>
          </Head>
          <PageHeader
            className='site-page-header-responsive'
            onBack={() => Router.back()}
            title='Item'
            subTitle='Scan'
          >
            <Scanner />
          </PageHeader>
        </Wrapper>
      )}
    </>
  )
}

export default withApollo(ScanPage)
