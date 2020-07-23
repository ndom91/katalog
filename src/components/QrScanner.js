import React from 'react'
import dynamic from 'next/dynamic'
import { message } from 'antd'

const QrReader = dynamic(() => import('react-qr-scanner'), {
  ssr: false,
})

const QrScanner = ({ cameraId, onSuccess, onError }) => {
  const selectCamera = () => {
    message.info(cameraId)
    return cameraId
  }

  return (
    <QrReader
      delay={300}
      style={{ height: 480, width: 320 }}
      onError={onError}
      onScan={onSuccess}
      facingMode='rear'
      chooseDeviceId={selectCamera}
    />
  )
}

export default QrScanner
