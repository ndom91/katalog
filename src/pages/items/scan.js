import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Wrapper from '../../components/Layout'
import { useSession } from 'next-auth/client'
import LoginRequired from '../../components/LoginRequired'
import Scanner from '../../components/Scanner'
import { withApollo } from '../../../apollo/client'
import { PageHeader } from 'antd'
import './items.module.css'

const ScanPage = () => {
  const [session, loading] = useSession()

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
