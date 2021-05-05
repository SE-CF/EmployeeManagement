import { useEffect } from 'react'
import { Table, Column, Space } from 'antd'
import { connect } from 'dva'

function EmployeeList({ employees, dispatch }) {
  const { Column } = Table
  useEffect(() => {
    dispatch({
      type: 'employees/getAll',
    })
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Gender',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: 'Birth Date',
      dataIndex: 'birthDate',
      key: 'birthDate',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Native Place',
      dataIndex: 'nativePlace',
      key: 'nativePlace',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a> */}
          <a>Delete</a>
        </Space>
      ),
    },
  ]

  return (
    <Table dataSource={employees}>
      <h1>Employee List Page</h1>

      <Column title="ID" dataIndex="id" key="id" />
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Gender" dataIndex="sex" key="sex" />
      <Column title="Birth Date" dataIndex="birthDate" key="birthDate" />
      <Column title="Department" dataIndex="department" key="department" />
      <Column title="Native Place" dataIndex="nativePlace" key="nativePlace" />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <Space size="middle">
            {/* <a>Invite {record.lastName}</a> */}
            <a
              onClick={() =>
                dispatch({
                  type: 'employees/deleteEmployee',
                  payload: {
                    id: record.id,
                  },
                })
              }
            >
              Delete
            </a>
          </Space>
        )}
      />
    </Table>
  )
}

export default connect(({ employees }) => ({ employees }))(EmployeeList)
