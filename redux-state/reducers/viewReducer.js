const viewReducer = (state = 'login', action) => {
  switch (action.type) {
    case 'GET_VIEW': {
      return {
        view: action.payload,
      }
    }
    default:
      return state
  }
}

export default viewReducer;