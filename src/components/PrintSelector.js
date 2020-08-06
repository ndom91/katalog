import React, { useState } from 'react'
import difference from 'lodash/difference'
import { useQuery, gql } from '@apollo/client'
import { Skeleton, Card, Transfer, Table } from 'antd'

const ItemQuery = gql`
  query ItemQuery {
    items {
      id
      key: id
      title
      location {
        description
      }
    }
  }
`

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps} showSelectAll={false}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns

      const rowSelection = {
        getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter(item => !item.disabled)
            .map(({ key }) => key)
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys)
          onItemSelectAll(diffKeys, selected)
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected)
        },
        selectedRowKeys: listSelectedKeys,
      }

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size='small'
          style={{ pointerEvents: listDisabled ? 'none' : null }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return
              onItemSelect(key, !listSelectedKeys.includes(key))
            },
          })}
        />
      )
    }}
  </Transfer>
)

const leftTableColumns = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
  {
    dataIndex: 'location',
    title: 'Location',
    render: location => (
      <span>
        {location && location.description ? location.description : ''}
      </span>
    ),
  },
]
const rightTableColumns = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
]

const PrintSelector = ({ selection, setSelectedKeys }) => {
  const { loading, data } = useQuery(ItemQuery)
  const [targetKeys, setTargetKeys] = useState([])

  return (
    <>
      <Card bordered={false}>
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '45%', padding: '0 20px' }}>
              <Skeleton active paragraph={{ rows: 15 }} />
            </div>
            <div style={{ width: '45%', padding: '0 20px' }}>
              <Skeleton active paragraph={{ rows: 15 }} />
            </div>
          </div>
        )}
        {data && data.items && (
          <TableTransfer
            titles={['Available Items', 'Selected Items']}
            dataSource={data.items}
            showSearch
            style={{ width: '100%' }}
            targetKeys={targetKeys}
            onChange={nextKeys => {
              setTargetKeys(nextKeys)
              setSelectedKeys(nextKeys)
            }}
            filterOption={
              (inputValue, item) => item.title.indexOf(inputValue) !== -1
              // || item.type.indexOf(inputValue) !== -1 ||
              // item.location.description.indexOf(inputValue) !== -1
            }
            leftColumns={leftTableColumns}
            rightColumns={rightTableColumns}
          />
        )}
      </Card>
    </>
  )
}

export default PrintSelector
