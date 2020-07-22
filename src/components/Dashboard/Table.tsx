import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import TablePaginationConfig from 'antd/es/table/interface.d.ts'
import { gql, useMutation } from '@apollo/client'
import { Button, message, Popconfirm, Space, Table, Tag } from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { Dispatch } from 'react'

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
  pagination: false | TablePaginationConfig
}

const deleteItemMutation = gql`
  mutation deleteItemMutation($itemId: Int!) {
    deleteOneItem(where: { id: $itemId }) {
      id
      title
    }
  }
`
const RecentsTable = ({ items, setItems, pagination = false }: RecentsProps) => {
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status ? status.color : 'grey'}>{status ? status.name : 'N/A'}</Tag>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
      render: (text: string) => <>{text}</>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => <>{text}</>,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: text => <>{text.description}</>,
    },
    {
      title: 'Date Added',
      dataIndex: 'date_added',
      key: 'date_added',
      render: (text: string) => <>{dayjs(text).format('DD.MM.YYYY HH:mm:ss')}</>,
    },
    {
      title: 'Added By',
      dataIndex: 'updated_by',
      key: 'updated_by',
      render: (text: string) => <>{text}</>,
    },
    {
      title: '',
      key: 'action',
      render: record => (
        <Space size='middle'>
          <Link href='/items/[id]' as={`/items/${record.id}`}>
            <Button type='primary' ghost style={{ width: '36px', height: '36px', padding: '0px' }}>
              <EditOutlined style={{ fontSize: '1.0rem' }} />
            </Button>
          </Link>
          <Popconfirm
            title='Are you sure?'
            onConfirm={() => confirmDelete(record.id)}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            okText='Yes'
            cancelText='No'
          >
            <Button danger type='default' style={{ width: '36px', height: '36px', padding: '0px' }}>
              <DeleteOutlined style={{ fontSize: '1.0rem' }} />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]
  return (
    <Table style={{ width: '100%' }} columns={columns} dataSource={items} pagination={pagination} />
  )
}

export default RecentsTable
