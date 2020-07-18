import React from 'react'
import Link from 'next/link'
import { Table, Tag, Space } from 'antd'
import dayjs from 'dayjs'

const columns = [
  {
    title: 'Name',
    dataIndex: 'title',
    key: 'title',
    render: text => <span>{text}</span>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: text => <span>{text}</span>,
  },
  {
    title: 'Quantity',
    dataIndex: 'qty',
    key: 'qty',
    render: text => <span>{text}</span>,
  },
  {
    title: 'Date Added',
    dataIndex: 'date_added',
    key: 'date_added',
    render: text => <>{dayjs(text).format('DD.MM.YYYY HH:mm:ss')}</>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size='middle'>
        <Link href={`/items/${record.id}`}>
          <a>Edit</a>
        </Link>
        <a>Delete</a>
      </Space>
    ),
  },
]

const RecentsTable: React.FC = ({ items }) => {
  console.log(items)
  return (
    <Table style={{ width: '100%' }} columns={columns} dataSource={items} />
  )
}

export default RecentsTable
