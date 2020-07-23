import React, { useEffect, useState } from 'react'
// import QrScanner from './QrScanner'
import dynamic from 'next/dynamic'
import { Card, message, Select, Col, Row, Tabs } from 'antd'
const QrReader = dynamic(() => import('react-qr-scanner'), {
  ssr: false,
})

const { TabPane } = Tabs
const { Option } = Select

// const Scanner = () => {
export default class Scanner extends React.Component {
  // const [errorMsg, setErrorMsg] = useState('')
  // const [result, setResult] = useState('')
  // const [loading, setLoading] = useState(true)
  // const [cameraId, setCameraId] = useState('')
  // const [devices, setDevices] = useState([])
  constructor(props) {
    super(props)
    this.state = {
      errorMsg: '',
      result: '',
      loading: false,
      cameraId: '',
      devices: [],
    }
  }

  // useEffect(() => {
  componentWillMount() {
    if (navigator && navigator.mediaDevices) {
      this.setState({
        loading: true,
      })
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
        .then(devices => {
          this.setState({
            cameraId: devices[0].deviceId,
            devices,
            loading: false,
          })
          // if (cameras.length > 0) {
          //   setDevices(cameras)
          //   setCameraId(cameras[0].deviceId)
          // }
          // setLoading(false)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
  // }, [])

  // useEffect(() => {
  //   setCameraId()
  // }, [cameraId])

  QrSuccess = result => {
    // setResult(result.decoded)
    this.setState({
      result,
    })
  }

  QrError = data => {
    console.log(data)
    if (typeof data === 'string') {
      // setErrorMsg(data)
      this.setState({
        errorMsg: data,
      })
    } else {
      // setErrorMsg(JSON.stringify(data))
      this.setState({
        errorMsg: JSON.stringify(data),
      })
    }
    message.error('Error')
  }

  selectCamera = () => {
    return this.state.cameraId
  }

  render() {
    const { result, loading, cameraId, devices } = this.state

    return (
      <>
        <Tabs type='card' animated>
          <TabPane tab='Scan' key='1'>
            <Card>
              <Row>
                <Col>
                  <Select
                    className='camera-select'
                    style={{ minWidth: 200 }}
                    onChange={value => {
                      this.setState({ cameraId: undefined }, () => {
                        this.setState({ cameraId: value })
                      })
                    }}
                    // onChange={value => {
                    //   setResult(value.substr(0, 20))
                    //   setCameraId(value)
                    // }}
                  >
                    {devices &&
                      devices.map((device, index) => (
                        <Option key={device.deviceId} value={device.deviceId}>
                          {device.label || `camera ${index}`}
                        </Option>
                      ))}
                  </Select>
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
          <TabPane tab='Settings' key='2'>
            <Card>Please select a Camera</Card>
          </TabPane>
        </Tabs>
      </>
    )
  }
}

// export default Scanner
