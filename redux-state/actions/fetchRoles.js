const axios = require('axios')
export const fetchRoles = () => {
  return (dispatch) => {
    axios.get('/allRolesAndColors')
      .then((res) => {
        dispatch({
          type: 'GET_ROLES',
          payload: res.data
        })
      })
      .catch((error) => {
        throw error;
      });
  }
}

export default fetchRoles