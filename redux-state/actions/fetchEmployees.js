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
        console.log(err);
      });
  };
};

export default fetchEmployees;