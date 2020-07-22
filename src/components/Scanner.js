import React, { useState } from 'react'
import dynamic from 'next/dynamic'
// import QrReader from 'react-qr-reader'
import { message } from 'antd'

const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false,
})

const Scanner = () => {
  const [errorMsg, setErrorMsg] = useState('')
  const QrSuccess = data => {
    console.log(data)
    message.success('Error')
  }
  const QrError = data => {
    console.log(data)
    if (typeof data === 'string') {
      setErrorMsg(data)
    }
    message.success('Success')
  }

  return (
    <QrReader
      delay={100}
      style={{ height: 240, width: 320 }}
      onError={QrError}
      onScan={QrSuccess}
    />
  )
}

export default Scanner
