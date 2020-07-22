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
  const [loading, setLoading] = useState(true)
  const [cameraId, setCameraId] = useState('')
  const [devices, setDevices] = useState([])

  useEffect(() => {
    if (navigator && navigator.mediaDevices) {
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
          if (cameras.length > 0) {
            setDevices(cameras)
            setCameraId(cameras[0].deviceId)
            setResult(JSON.stringify(cameras))
          }
          setLoading(false)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [])

  const selectCamera = () => {
    return cameraId
  }

  const QrSuccess = result => {
    setResult(result.decoded)
  }

  const QrError = data => {
    console.log(data)
    if (typeof data === 'string') {
      setErrorMsg(data)
    } else {
      setErrorMsg(JSON.stringify(data))
    }
    message.error('Error')
  }

  return (
    <>
      <Select
        style={{ width: 100 }}
        onChange={value => {
          setCameraId(value)
        }}
      >
        {devices &&
          devices.map((device, index) => (
            <Option key={device.deviceId} value={device.deviceId}>
              {device.label || `camera ${index}`}
            </Option>
          ))}
      </Select>
      {!loading && devices.length > 0 && (
        <QrReader
          delay={100}
          style={{ height: 240, width: 320 }}
          onError={QrError}
          onScan={QrSuccess}
          chooseDeviceId={selectCamera}
        />
      )}
      {result}
    </>
  )
}

export default Scanner
