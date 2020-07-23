import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
// import QrReader from 'react-qr-reader'
import { Card, message, Select, Col, Row, Tabs } from 'antd'

const { TabPane } = Tabs
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
          }
          setLoading(false)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [])

  const selectCamera = () => {
    message.info(cameraId)
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
      <Tabs type='card' animated>
        <TabPane tab='Scan' key='1'>
          <Card>
            <Row>
              <Col>
                {!loading && cameraId && devices.length > 0 && (
                  <QrReader
                    delay={300}
                    style={{ height: 480, width: 320 }}
                    onError={QrError}
                    onScan={QrSuccess}
                    facingMode='rear'
                    chooseDeviceId={selectCamera}
                  />
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <code>{result}</code>
              </Col>
            </Row>
          </Card>
        </TabPane>
        <TabPane tab='Select Camera' key='2'>
          <Card>
            <Select
              className='camera-select'
              placeholder='Select a Camera'
              style={{ minWidth: 200 }}
              onChange={value => {
                setResult(value.substr(0, 20))
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
          </Card>
        </TabPane>
      </Tabs>
    </>
  )
}

export default Scanner
