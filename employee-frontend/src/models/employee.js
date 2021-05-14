import request from 'umi-request'

export default {
  namespace: 'employee',

  state: {},

  reducers: {
    update(_, { payload }) {
      const { employee } = payload
      return employee
    },
  },

  effects: {
    *getEmployee(id, { call, put }) {
      const response = yield call(
        request.get,
        `http://localhost:8080/employees/3`
      )
      yield put({
        type: 'update',
        payload: {
          employee: response,
        },
      })
    },
  },
}
