import { useEffect } from 'react'
import { connect } from 'dva'
import ReactJson from 'react-json-view'
import { Statistic, Row, Col, Button } from 'antd'

function Employee({
  employee,
  dispatch,
  match: {
    params: { id },
  },
}) {
  useEffect(() => {
    dispatch({
      type: 'employee/getEmployee',
      payload: {
        url: 'http://localhost:8000/employees/{id}',
      },
      id:id,
    })
  }, [])

  console.log({ employee })
  return (
    <div>
      <h1>Employee {id} 's Page</h1>
        <br/>
      <Row gutter={16}>
        <Col span={8}>
          <Statistic title="姓名" value={employee.name} />
        </Col>
      </Row>
      <br/>
      <Row gutter={16}>
        <Col span={8}>
          <Statistic title="部门" value={employee.department}/>
        </Col>
        <Col span={8}>
          <Statistic title="性别" value={employee.gender} />
        </Col>
      </Row>
      <br/>
      <Row gutter={16}>
        <Col span={8}>
          <Statistic title="出生日期" value={employee.birthDate} />
        </Col>
        <Col span={8}>
          <Statistic title="籍贯" value={employee.nativePlace} />
        </Col>
      </Row>
    </div>
  )
}

export default connect(({ employee }) => ({ employee }))(Employee)
