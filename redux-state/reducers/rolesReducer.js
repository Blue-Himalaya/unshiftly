const rolesReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ROLES': {

      //REFORMAT THE ROLE-COLORS INTO A SINGLE OBJECT
      var colors = {}
      action.payload.map(role => {
        colors[role.role] = role.color
      })

      //SET MORE COLORS
      colors.none = 'hsla(30, 0%, 100%, 0)'
      colors.off = 'hsl(26, 3%, 84%)'
      return {
        roles: colors
      }
    }
    default:
      return state;
  }
}

export default rolesReducer