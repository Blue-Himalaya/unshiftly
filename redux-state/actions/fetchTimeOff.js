const axios = require('axios');

export const fetchTimeOff = () => {
  return (dispatch) => {
    axios.get('/allRecurringTimeOff')
      .then((res) => {
        dispatch({
          type: 'GET_TIMEOFF',
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export default fetchTimeOff;