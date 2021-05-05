import axios from 'axios'

const employees = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    id: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    id: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]

export default {
  'GET /employees/': (_, response) => {
    let employees = []
    let url = 'http://localhost:8080/employees'
    axios.get(url).then((result) => {
      console.log(result.data)
      employees.concat(result.data['_embedded']['employees'])

      console.log(employees)
    })
    response.send(employees)
  },
  'GET /api/employees': (_, response) => {
    response.send(employees)
  },
}
