import React, { useEffect, FunctionComponent } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'next-auth/client'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import '../style/katalog.less'

console.log(process.env)

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  })
}

const App: FunctionComponent<AppProps> = props => {
  const { Component, pageProps } = props
  const { session } = pageProps
  const err = (props as any).err

  return (
    <>
      <Head>
        <title>Katalog | Home</title>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicons/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicons/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicons/favicon-16x16.png'
        />
        <link rel='manifest' href='/favicons/site.webmanifest' />
        <link
          rel='mask-icon'
          href='/favicons/safari-pinned-tab.svg'
          color='#e890c5'
        />
        <link rel='shortcut icon' href='/favicons/favicon.ico' />
        <meta name='msapplication-TileColor' content='#e890c5' />
        <meta
          name='msapplication-config'
          content='/favicons/browserconfig.xml'
        />
        <meta name='theme-color' content='#ffffff' />
        <link
          href='https://fonts.googleapis.com/css2?family=Fira+Sans:wght@200;300;400&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Provider session={session}>
        <Component {...pageProps} err={err} />
      </Provider>
    </>
  )
}

export default App
