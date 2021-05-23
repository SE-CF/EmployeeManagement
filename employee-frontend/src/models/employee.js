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
    *getEmployee(param, { call, put }) {
      // console.log(`http://localhost:8080/employees/${param.id}`)
      const response = yield call(
        request.get,
        `http://localhost:8080/employees/${param.id}`
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
