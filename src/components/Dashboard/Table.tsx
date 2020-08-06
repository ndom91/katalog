import React, { useState, useRef, Dispatch } from 'react'
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { gql, useMutation } from '@apollo/client'
import { Button, Input, message, Popconfirm, Space, Table, Tag } from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link'

type ItemType = {
  id: number
  title: string
  status?: string
  qty?: number
  description?: string
  type?: string
  date_added?: string
  updated_by?: string
}[]

type RecentsProps = {
  items: ItemType
  setItems: Dispatch<ItemType>
  pagination: any
}

const deleteItemMutation = gql`
  mutation deleteItemMutation($itemId: Int!) {
    deleteOneItem(where: { id: $itemId }) {
      id
      title
    }
  }
`
const RecentsTable = ({
  items,
  setItems,
  pagination = false,
}: RecentsProps) => {
  const searchInput = useRef<HTMLInputElement>()
  const [searchText, setSearchText] = useState()
  const [searchedColumn, setSearchedColumn] = useState()
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
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current.select())
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <span>{text ? text.toString() : ''}</span>
      ) : (
        text
      ),
  })

  const handleReset = clearFilters => {
    clearFilters()
    setSearchText('')
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <>{text}</>,
      sorter: (a, b) => a.name - b.name,
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      responsive: ['sm', 'md', 'lg', 'xl'],
      sorter: (a, b) => {
        if (!a.status || !b.status) {
          return -1
        }
        return a.status.name - b.status.name
      },
      ...getColumnSearchProps('status'),
      render: status => (
        <Tag color={status ? status.color : 'grey'}>
          {status ? status.name : 'N/A'}
        </Tag>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
      responsive: ['md', 'lg', 'xl'],
      render: (text: string) => <>{text}</>,
      sorter: (a, b) => a.qty - b.qty,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      responsive: ['lg', 'xl'],
      render: (text: string) => <>{text}</>,
      ...getColumnSearchProps('description'),
      sorter: (a, b) => {
        if (!a.description || !b.description) {
          return -1
        }
        return a.description - b.description
      },
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      responsive: ['md', 'lg', 'xl'],
      render: text => <>{text && text.description ? text.description : ''}</>,
      sorter: (a, b) => {
        if (!a.location || !b.location) {
          return -1
        }
        return a.location.description - b.location.description
      },
    },
    {
      title: 'Date Added',
      dataIndex: 'date_added',
      key: 'date_added',
      responsive: ['lg', 'xl'],
      render: (text: string) => (
        <>{dayjs(text).format('DD.MM.YYYY HH:mm:ss')}</>
      ),
      sorter: (a, b) => a.date_added - b.date_added,
    },
    {
      title: 'Added By',
      dataIndex: 'updated_by',
      key: 'updated_by',
      responsive: ['lg', 'xl'],
      render: (text: string) => <>{text}</>,
      sorter: (a, b) => a.updated_by - b.updated_by,
    },
    {
      title: '',
      key: 'action',
      render: record => (
        <Space size='middle'>
          <Link href='/items/[id]' as={`/items/${record.id}`}>
            <Button
              type='primary'
              ghost
              style={{ width: '36px', height: '36px', padding: '0px' }}
            >
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
            <Button
              danger
              type='default'
              style={{ width: '36px', height: '36px', padding: '0px' }}
            >
              <DeleteOutlined style={{ fontSize: '1.0rem' }} />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]
  return (
    // @ts-ignore
    <Table
      style={{ width: '100%' }}
      columns={columns}
      dataSource={items}
      pagination={pagination}
    />
  )
}

export default RecentsTable
