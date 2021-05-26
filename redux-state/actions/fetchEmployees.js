const axios = require('axios');
export const fetchEmployees = () => {
  return (dispatch) => {
    axios.get('/allActiveEmployees')
      .then((res) => {
        dispatch({
          type: 'GET_EMPLOYEES',
          payload: res.data
        });
      })
      .catch((err) => {
        throw err;
      });
  };
};

export default fetchEmployees;