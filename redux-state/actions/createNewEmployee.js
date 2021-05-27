const axios = require('axios');

export const createNewEmployee = (name, phone, birthday, password, startDate, role) => {
  return (dispatch) => {
    axios.post('/employees', { name, phone, birthday, password, startDate, role })
    .then((res) => {
      dispatch({
        type: 'CREATE_EMPLOYEE',
        payload: res.data
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }
};

export default createNewEmployee;
