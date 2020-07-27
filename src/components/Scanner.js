import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import ScannerModal from './ScannerModal'
import { Modal, Button, Card, message, Select, Col, Row, Tabs } from 'antd'
import { QrcodeOutlined } from '@ant-design/icons'

const QrReader = dynamic(() => import('react-qr-scanner'), {
  ssr: false,
})

const { TabPane } = Tabs
const { Option } = Select

export default class Scanner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMsg: '',
      result: '',
      loading: false,
      cameraId: '',
      devices: [],
      modalVisible: false,
      itemDetails: {
        type: '',
        title: '',
        id: 0,
      },
    }
  }

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
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    })
  }

  handleConfirm = () => {
    Router.push('/items/[id]', `/items/${this.state.itemDetails.id}`)
  }

  QrSuccess = raw => {
    const result = JSON.parse(raw)
    console.log(result)
    if (result.type === 'katalogItem') {
      this.setState({
        itemDetails: result,
        modalVisible: true,
      })
    }
  }

  QrError = data => {
    console.log(data)
    if (typeof data === 'string') {
      this.setState({
        errorMsg: data,
      })
    } else {
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
    const {
      result,
      loading,
      cameraId,
      devices,
      modalVisible,
      itemDetails,
    } = this.state

    return (
      <>
        <Col sm={24} md={12} xl={6}>
          <Card>
            <Row>
              <Select
                className='camera-select'
                placeholder='Select a Camera'
                style={{ width: '100%' }}
                onChange={value => {
                  this.setState({ cameraId: undefined }, () => {
                    this.setState({ cameraId: value })
                  })
                }}
              >
                {devices &&
                  devices.map((device, index) => (
                    <Option key={device.deviceId} value={device.deviceId}>
                      {device.label || `camera ${index}`}
                    </Option>
                  ))}
              </Select>
            </Row>
            <Row>
              {!loading && cameraId && devices.length > 0 && (
                <QrReader
                  delay={100}
                  style={{ height: 480, width: 320 }}
                  onError={this.QrError}
                  onScan={this.QrSuccess}
                  facingMode='rear'
                  chooseDeviceId={this.selectCamera}
                />
              )}
            </Row>
          </Card>
        </Col>
        <ScannerModal
          visible={modalVisible}
          handleConfirm={this.handleConfirm}
          toggleModal={this.toggleModal}
          itemDetails={itemDetails}
        />
      </>
    )
  }
}
