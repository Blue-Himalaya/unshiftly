const initialState = {
  view: 'login',
  isAuthenticated: '',
  user: '',
  admin: '',
}
const viewReducer = (state = initialState, action) => {
  // console.log(action.type)
  switch (action.type) {
    case 'GET_VIEW': {
      return {
        ...state,
        view: action.payload,
      }
    }
    case 'IS_AUTHENTICATED': {
      console.log(action.payload)
      return {
        view: 'calendar',
        isAuthenticated: true,
        user: action.payload.user,
        admin: action.payload.role === 'manager',
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
    case 'LOGGED_OUT': {
      return {
        view: 'login',
        isAuthenticated: '',
        user: '',
        admin: '',
      }
    }
    default:
      return state
  }
}

export default viewReducer;