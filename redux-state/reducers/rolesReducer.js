const rolesReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ROLES': {

      //REFORMAT THE ROLE-COLORS INTO A SINGLE OBJECT
      var colors = {}
      action.payload.map(role => {
        colors[role.role] = role.color
      })

      //SET MORE COLORS
      colors.none = 'rgba(255, 255, 255, 0)'
      colors.off = 'gray'
      return {
        roles: colors
      }
    }
    default:
      return state;
  }
}

export default rolesReducer