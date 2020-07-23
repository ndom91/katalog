import React, { useEffect, useState } from 'react'
import QrScanner from './QrScanner'
import { Card, message, Select, Col, Row, Tabs } from 'antd'

const { TabPane } = Tabs
const { Option } = Select

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
      <Tabs
        type='card'
        animated
        onChange={key => (key === 2 ? setLoading(true) : setLoading(false))}
      >
        <TabPane tab='Scan' key='1'>
          <Card>
            <Row>
              <Col>
                {!loading && cameraId && devices.length > 0 && (
                  <QrScanner camera={cameraId} onSuccess={QrSuccess} onError={QrError} />
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
        <TabPane tab='Settings' key='2'>
          <Card>
            Please select a Camera
            <Select
              className='camera-select'
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
