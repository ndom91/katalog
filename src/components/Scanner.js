import React from 'react'
import QrReader from 'react-qr-scanner'
import { message } from 'antd'

const Scanner = () => {
  const QrSuccess = data => {
    console.log(data)
    message.success(data)
  }
  const QrError = data => {
    console.log(data)
    message.success(data)
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
