const rolesReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ROLES': {
      return {
        roles: action.payload
      }
    }
    default:
      return state;
  }
}

export default rolesReducer