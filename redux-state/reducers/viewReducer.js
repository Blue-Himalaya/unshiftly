const initialState = {
  view: 'login',
  isAuthenticated: false,
}
const viewReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_VIEW': {
      return {
        ...state,
        view: action.payload,
      }
    }
    case 'IS_AUTHENTICATED': {
      return {
        view: 'calendar',
        isAuthenticated: true,
      }
    }
    case 'AUTH_REQUESTED': {
      return {
        ...state,
        isAuthenticated: 'requested',
      }
    }
    case 'AUTH_FAILED': {
      return {
        ...state,
        isAuthenticated: false,
      }
    }
    default:
      return state
  }
}

export default viewReducer;