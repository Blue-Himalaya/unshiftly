const initialState = {
  view: 'login',
  isAuthenticated: '',
  admin: '',
}
const viewReducer = (state = initialState, action) => {
  console.log(action.type)
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
        admin: action.payload === 'manager',
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