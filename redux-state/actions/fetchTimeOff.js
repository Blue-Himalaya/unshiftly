const axios = require('axios');

export const fetchTimeOff = () => {
  return (dispatch) => {
    axios.get('/recurringTimeOff')
      .then((res) => {
        dispatch({
          type: 'GET_TIMEOFF',
          payload: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  }
};

export default fetchTimeOff;