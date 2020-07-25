import React from 'react'
import styled from 'styled-components'
import { Typography, Row, Col } from 'antd'

const { Text } = Typography

const PrintLabel = ({ qrCode, itemId, itemName }) => {
  return (
    <LabelWrapper>
      <Row>
        <Col span={10}>
          <Row justify='center' align='middle' style={{ height: '100%' }}>
            {qrCode}
          </Row>
        </Col>
        <Col span={14}>
          <Row justify='space-between' align='middle' style={{ padding: '2px' }}>
            <Text string>{itemId}</Text>
            <img src='/images/nt.png' alt='Company Logo' width='32' height='32' />
          </Row>
          <Row justify='start' align='middle' style={{ padding: '2px' }}>
            <Text strong>{itemName}</Text>
          </Row>
        </Col>
      </Row>
    </LabelWrapper>
  )
}

const LabelWrapper = styled.div`
  padding: 8px;
  width: 47%;
  border: 1px solid rgba(0, 0, 0, 0.1);
`

export default PrintLabel
