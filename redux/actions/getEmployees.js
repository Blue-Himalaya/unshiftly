const axios = require('axios');
import store from '../store.js';

const getEmployees = () => {
  axios.get('/employees')
    .then((employee) => {
      store.dispatch({ type: 'GET_EMPLOYEES', payload: employee.data })
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getEmployees;