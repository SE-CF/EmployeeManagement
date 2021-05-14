import { useEffect } from 'react'
import { connect } from 'dva'
import ReactJson from 'react-json-view'

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
        url: 'http://localhost:8000/employees/3',
      },
    })
  }, [])

  console.log({ employee })
  return (
    <div>
      <h1>Employee {id} 's Page</h1>
      <div>
        <ReactJson src={employee} />
      </div>
    </div>
  )
}

export default connect(({ employee }) => ({ employee }))(Employee)
