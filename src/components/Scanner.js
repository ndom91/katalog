import React, { useState } from 'react'
import QrReader from 'react-qr-reader'
import { message } from 'antd'
import { showManifestErrorsAndExit } from 'nexus/dist/lib/plugin'

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
