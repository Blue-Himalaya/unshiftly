const initialState = {
  employeeData: [
    name: '',
    phone: '',
    birthday: '',
    startDate: '',
    password: '',
    roles: [
      '',
    ]
  ]
}
const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EMPLOYEES': {
      return [
        ...state, action.payload
      ]
    },
    case 'UPDATE_EMPLOYEES': {
      return [
        ...state, action.payload
      ]
    }
    default:
      return state
  }
};

export default employeeReducer;