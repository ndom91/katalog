import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
// import QrReader from 'react-qr-reader'
import { message, Select } from 'antd'

const { Option } = Select

const QrReader = dynamic(() => import('react-qr-scanner'), {
  ssr: false,
})

const Scanner = () => {
  const [errorMsg, setErrorMsg] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState('')
  const [cameraId, setCameraId] = useState('')
  const [devices, setDevices] = useState('')
  useEffect(() => {
    if (navigator) {
      navigator.mediaDevices
        .enumerateDevices()
        .then(cameras => {
          const videoSelect = []
          cameras.forEach(device => {
            if (device.kind === 'videoinput') {
              videoSelect.push(device)
            }
          })
          return videoSelect
        })
        .then(cameras => {
          setDevices(cameras)
          setLoading(false)
          setCameraId(cameras[0].deviceId)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [])

  const selectCamera = () => {
    return cameraId
  }
  const QrSuccess = data => {
    // console.log(data)
    // message.success('Success')
    setResult(JSON.stringify(data))
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
      <Select
        onChange={value => {
          setCameraId(value)
        }}
      >
        {devices &&
          devices.map(device => (
            <Option key={device.deviceId} value={device.deviceId}>
              {deviceInfo.label || `camera ${index}`}
            </Option>
          ))}
      </Select>
      <QrReader
        delay={100}
        gg
        style={{ height: 240, width: 320 }}
        onError={QrError}
        onScan={QrSuccess}
        chooseDeviceId={selectCamera}
      />
      {result}
    </>
  )
}

export default Scanner
