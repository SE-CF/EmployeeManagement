import request from 'umi-request'

export default {
  namespace: 'employees',

  state: [],

  reducers: {
    select(state, { payload }) {
      const { id: targetId } = payload

      return state.filter((e) => e.id === targetId)
    },

    update(_, { payload }) {
      const { employees } = payload
      return employees
    },

    deleteEmployee(state, { payload }) {
      const { id: targetId } = payload

      return state.filter((e) => e.id !== targetId)
    },

    addEmployee(state, { payload }) {
      const { id: targetId } = payload

      return state.filter((e) => e.id !== targetId)
    },
  },

  effects: {
    *getAll(_, { call, put }) {
      console.log('here1')
      const response = yield call(
        request.get,
        'http://localhost:8080/employees'
      )

      yield put({
        type: 'update',
        payload: {
          employees: response['_embedded']['employees'],
        },
      })
    },
    *getEmployee(id, { call, put }) {
      const response = yield call(
        request.get,
        'http://localhost:8080/employees/3'
      )
      yield put({
        type: 'update',
        payload: {
          employees: [].concat(response),
        },
      })
    },
    *deleteEmployee(id, { call, put }) {
      console.log('http://localhost:8080/employees/'+id.payload.id)
      yield call(request.delete, 'http://localhost:8080/employees/'+id.payload.id)
      const response = yield call(
        request.get,
        'http://localhost:8080/employees'
      )

      yield put({
        type: 'update',
        payload: {
          employees: response['_embedded']['employees'],
        },
      })
    },

    *addEmployee(id, { call, put }) {
      var str={
        id:id.payload.id,
        name:id.payload.name,
        gender:id.payload.gender,
        birthdate:id.payload.birthdate,
        nativePlace:id.payload.nativePlace,
        department:id.payload.department
      }
      console.log(JSON.stringify(str))
      yield call(request.post, 'http://localhost:8080/employees/'+JSON.stringify(str))
      const response = yield call(
          request.get,
          'http://localhost:8080/employees'
      )

      yield put({
        type: 'update',
        payload: {
          employees: response['_embedded']['employees'],
        },
      })
    },
  },
}
