const employeeReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_EMPLOYEES': {
      return {
        employees: action.payload,
      }
    }
    default:
      return state
  }
};

export default employeeReducer;