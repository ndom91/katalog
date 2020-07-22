import React, { useState } from 'react'
import dynamic from 'next/dynamic'
// import QrReader from 'react-qr-reader'
import { message } from 'antd'

const QrReader = dynamic(() => import('react-qr-scanner'), {
  ssr: false,
})

const Scanner = () => {
  const [errorMsg, setErrorMsg] = useState('')
  const [result, setResult] = useState('')
  const QrSuccess = data => {
    console.log(data)
    message.success('Success')
  }
  const QrError = data => {
    console.log(data)
    if (typeof data === 'string') {
      setErrorMsg(data)
    }
    setResult(JSON.stringify(data))
    message.error('Error')
  }
  const chooseDevice = device => {
    console.log(device)
    setResult(device)
  }

  return (
    <>
      <QrReader
        delay={100}
        style={{ height: 240, width: 320 }}
        onError={QrError}
        onScan={QrSuccess}
        chooseDeviceId={chooseDevice}
      />
      {result}
    </>
  )
}

export default Scanner
