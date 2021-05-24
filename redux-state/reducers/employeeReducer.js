const employeeReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_EMPLOYEES': {
      return {
        employees: 'employees',
      }
    }
    default:
      return state
  }
};

export default employeeReducer;