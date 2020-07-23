import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Modal, Row, Col, Form, InputNumber, Button } from 'antd'
import { QrcodeOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { useQuery, useMutation, gql } from '@apollo/client'

const getItemQuery = gql`
  query getItem($id: Int!) {
    item(where: { id: $id }) {
      id
      qty
      title
      description
      type
      serialNo
      inventarNr
      kontoNr
      status {
        id
        name
      }
      statusId
      purchase_price
      currency
      date_added
      date_updated
      updated_by
      ahk_date
      ahk_wj_ende
      buchw_wj_ende
      n_afa_wj_ende
      sonder_abs_wj_ende
      nutzungsdauer
      afa_art
      afa_percent
      kost1
      kost2
      filiale
      lieferantNr
      anlag_lieferant
      ahk_wj_beginn
      buchwert_wj_beginn
      n_afa_wj_beginn
      sonder_abs_wj_beginn
      sonder_abs_art
      sonder_abs_percent
      restbeguenstigung
      sonder_abs_verteil
      abgang
      lebenslaufakte
      bestelldatum
      erl_afa_art
      herkunftsart
      wkn_isin
      erfassungsart
      images {
        id
        title
        url
      }
      locationId
    }
    allLocations {
      id
      description
    }
    allStatuses {
      id
      name
      color
    }
  }
`

const ScannerModal = ({ itemDetails, visible, handleConfirm, toggleModal }) => {
  const [requestQty, setRequestQty] = useState(1)
  const { loading, data, refetch } = useQuery(getItemQuery, {
    variables: { id: parseInt(itemDetails.id) },
  })

  useEffect(() => {
    refetch()
  }, [itemDetails])

  return (
    <Modal
      title='Basic Modal'
      visible={visible}
      onOk={handleConfirm}
      onCancel={toggleModal}
      centered
      cancelText='Close'
      okText='View Details'
      title={`${itemDetails.title} Identified`}
      okButtonProps={{ style: { width: '49%' } }}
      cancelButtonProps={{ style: { width: '49%' } }}
    >
      <Row>
        <Col span={6}>
          <QrcodeOutlined style={{ fontSize: '5rem' }} />
        </Col>
        <Col span={18}>
          <CheckoutWrapper>
            <p>
              <b>Checkout Item</b>
            </p>
            <Form>
              <Form.Item title='Quantity'>
                <InputNumber value={requestQty} min={0} max={data && data.qty} size='large' />
              </Form.Item>
              <Button type='text' onClick={() => setRequestQty(requestQty - 1)} size='large'>
                <MinusCircleOutlined
                  style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}
                />
              </Button>
              <Button type='text' onClick={() => setRequestQty(requestQty + 1)} size='large'>
                <PlusCircleOutlined style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }} />
              </Button>
            </Form>
            <small>{data && data.qty} available</small>
          </CheckoutWrapper>
        </Col>
      </Row>
    </Modal>
  )
}

export default ScannerModal

const CheckoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`
