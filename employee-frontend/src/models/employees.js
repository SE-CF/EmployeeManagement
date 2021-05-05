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
  },

  effects: {
    *getAll(_, { call, put }) {
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
        'http://localhost:8080/employees/' + id
      )
      yield put({
        type: 'update',
        payload: {
          employees: [].concat(response),
        },
      })
    },
    *delEmployee(id, { call, put }) {
      yield call(request.delete, 'http://172.27.166.164:8080/employees/' + id)
      const response = yield call(
        request.get,
        'http://172.27.166.164:8080/employees'
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
