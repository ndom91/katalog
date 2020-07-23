import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import dynamic from 'next/dynamic'
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
    Router.push(`/items/${itemDetails.id}`)
  }

  QrSuccess = raw => {
    const result = JSON.parse(raw)
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
    const { result, loading, cameraId, devices, modalVisible, itemDetails } = this.state

    return (
      <>
        <Col sm={24} md={12} xl={6}>
          <Card>
            <Row>
              <Select
                className='camera-select'
                style={{ minWidth: 200 }}
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
                  delay={200}
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
        <Modal
          title='Basic Modal'
          visible={modalVisible}
          onOk={this.handleConfirm}
          onCancel={this.toggleModal}
          centered
          cancelText='Close'
          okText='Open'
          title='Item Identified'
          okButtonProps={{ style: { width: '49%' } }}
          cancelButtonProps={{ style: { width: '49%' } }}
        >
          <Row>
            <Col span={6}>
              <QrcodeOutlined style={{ fontSize: '5rem' }} />
            </Col>
            <Col span={18}>
              <p>We have identified the following Item</p>
              <p>
                <b>{itemDetails.title}</b>
              </p>
              <p>Would you like to open it?</p>
            </Col>
          </Row>
        </Modal>
      </>
    )
  }
}
