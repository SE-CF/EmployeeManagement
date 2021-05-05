import { useEffect } from 'react'
import { connect } from 'dva'

function Employee({
  employee,
  dispatch,
  match: {
    params: { id },
  },
}) {
  useEffect(() => {
    dispatch({
      type: 'employees/getEmployee',
      payload: {
        id: id,
      },
    })
  }, [])

  return (
    <div>
      <h1>Employee {id} 's Page</h1>
      <div>
        <ul>{id}</ul>
      </div>
    </div>
  )
}

export default connect(({ employee }) => ({ employee }))(Employee)
