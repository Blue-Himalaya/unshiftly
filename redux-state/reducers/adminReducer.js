const adminReducer = (state = false, action) => {
  switch (action.type) {
    case 'GET_ADMIN': {
      return {
        admin: action.payload,
      }
    }
    default:
      return state
  }
}

export default adminReducer;