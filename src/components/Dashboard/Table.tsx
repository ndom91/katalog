import React, { Dispatch } from 'react'
import Link from 'next/link'
import { Table, Space, Popconfirm, message } from 'antd'
import { withApollo } from '../../../apollo/client'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import dayjs from 'dayjs'

type ItemType = {
  id: number
  title: string
  qty?: number
  description?: string
  type?: string
  date_added?: string
  updated_by?: string
}[]

type RecentsProps = {
  items: ItemType
  setItems: Dispatch<ItemType>
}

const deleteItemMutation = gql`
  mutation deleteItemMutation($itemId: Int!) {
    deleteOneItem(where: { id: $itemId }) {
      id
      title
    }
  }
`
const RecentsTable = ({ items, setItems }: RecentsProps) => {
  const [deleteItem] = useMutation(deleteItemMutation, {
    onCompleted: data => {
      const newItems = items.filter(item => item.id !== data.deleteOneItem.id)
      setItems(newItems)
      message.success('Item Deleted')
    },
  })
  const confirmDelete = async (id: number) => {
    await deleteItem({
      variables: {
        itemId: id,
      },
    })
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <>{text}</>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => <>{text}</>,
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
      render: (text: string) => <>{text}</>,
    },
    {
      title: 'Date Added',
      dataIndex: 'date_added',
      key: 'date_added',
      render: (text: string) => (
        <>{dayjs(text).format('DD.MM.YYYY HH:mm:ss')}</>
      ),
    },
    {
      title: 'Added By',
      dataIndex: 'updated_by',
      key: 'updated_by',
      render: (text: string) => <>{text}</>,
    },
    {
      title: 'Action',
      key: 'action',
      render: record => (
        <Space size='middle'>
          <Link href={`/items/${record.id}`}>
            <a>Edit</a>
          </Link>
          <Popconfirm
            title='Are you sure delete this item?'
            onConfirm={() => confirmDelete(record.id)}
            okText='Yes'
            cancelText='No'
          >
            <a href='#'>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ]
  return (
    <Table style={{ width: '100%' }} columns={columns} dataSource={items} />
  )
}

export default withApollo(RecentsTable)
