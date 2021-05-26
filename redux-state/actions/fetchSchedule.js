const axios = require('axios');
export const fetchSchedule = () => {
  return (dispatch) => {
    axios.get('/schedule')
      .then((res) => {
        dispatch({
          type: 'GET_SCHEDULE',
          payload: res.data,
        });
      })
      .catch((err) => {
        throw err;
      });
  };
};

export default fetchSchedule;