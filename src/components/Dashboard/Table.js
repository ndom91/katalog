import { Table, Tag, Space } from 'antd'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Quantity',
    dataIndex: 'qty',
    key: 'qty',
  },
  {
    title: 'Description',
    dataIndex: 'desc',
    key: 'desc',
  },
  {
    title: 'Location',
    dataIndex: 'loc',
    key: 'loc',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'per person') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size='middle'>
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
]

const data = [
  {
    key: '1',
    name: 'Samsung S20+',
    qty: 3,
    desc: 'Mobile Phone',
    loc: 'NT Lager - 277',
    tags: ['mobile', 'phone'],
  },
  {
    key: '2',
    name: 'Dell Vostro 5580',
    qty: 8,
    desc: 'Colleague Laptop',
    loc: 'Per Person',
    tags: ['laptop', 'per person'],
  },
  {
    key: '3',
    name: 'Iyama 27" Monitor',
    qty: 9,
    desc: '27" LCD Monitor',
    loc: 'Desk',
    tags: ['monitor', 'per person'],
  },
  {
    key: '4',
    name: 'Juniper ACX4000',
    qty: 3,
    desc: 'Network Router',
    loc: 'NT Lager - 129',
    tags: ['router', 'network'],
  },
]

const RecentsTable = ({ items }) => {
  console.log(items)
  return <Table style={{ width: '100%' }} columns={columns} dataSource={data} />
}

export default RecentsTable
