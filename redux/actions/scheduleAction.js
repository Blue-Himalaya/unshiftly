const axios = require('axios');
import store from '../store.js';

const getFullSchedule = () => {
  axios.get('/adminSchedule')
    .then((fullSchedule) => {
      store.dispatch({ type: 'GET_SCHEDULE', payload: fullSchedule.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getFullSchedule;