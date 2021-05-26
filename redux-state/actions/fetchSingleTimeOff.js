const axios = require('axios');
export const fetchSingleTimeOff = () => {
  return (dispatch) => {
    axios.get('/allSingleTimeOff')
      .then((res) => {
        dispatch({
          type: 'GET_SINGLE_TIMEOFF',
          payload: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  }
};

export default fetchSingleTimeOff;