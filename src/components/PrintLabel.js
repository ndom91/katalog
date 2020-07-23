import React from 'react'
import styled from 'styled-components'
import { Typography, Row, Col } from 'antd'

const { Text } = Typography

const PrintLabel = ({ qrCode, companyName, itemName }) => {
  return (
    <LabelWrapper>
      <Row>
        <Col span={10}>
          <Row justify='center' align='middle' style={{ height: '100%' }}>
            {qrCode}
          </Row>
        </Col>
        <Col span={14}>
          <Row justify='end' align='top'>
            <img src='/images/nt.png' alt='Company Logo' width='32' height='32' />
          </Row>
          <Row justify='start' align='middle'>
            <Text string>{companyName}</Text>
          </Row>
          <Row justify='start' align='middle'>
            <Text strong>{itemName}</Text>
          </Row>
        </Col>
      </Row>
    </LabelWrapper>
  )
}

const LabelWrapper = styled.div`
  width: 47%;
`

export default PrintLabel
